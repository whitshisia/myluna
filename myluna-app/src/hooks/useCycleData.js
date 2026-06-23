import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  db, 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  doc, 
  updateDoc,
  onSnapshot,
  serverTimestamp
} from '../firebase';
import { calculateCycleLength } from '../utils/cycleCalculations';

export function useCycleData() {
  const { currentUser } = useAuth();
  const [cycleData, setCycleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setCycleData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const cyclesRef = collection(db, 'cycles');
    const q = query(cyclesRef, where('userId', '==', currentUser.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cycles = [];
      snapshot.forEach((doc) => {
        cycles.push({ id: doc.id, ...doc.data() });
      });

      // Process cycle data
      const periodHistory = cycles
        .filter(c => c.type === 'period')
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

      const symptoms = cycles
        .filter(c => c.type === 'symptom')
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      const averageCycleLength = calculateCycleLength(periodHistory);

      setCycleData({
        periodHistory,
        symptoms,
        averageCycleLength,
        allCycles: cycles
      });
      setLoading(false);
    }, (error) => {
      console.error('Error fetching cycle data:', error);
      setError(error.message);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const addPeriod = async (periodData) => {
    try {
      if (!currentUser) throw new Error('User not authenticated');
      
      const docRef = await addDoc(collection(db, 'cycles'), {
        ...periodData,
        userId: currentUser.uid,
        type: 'period',
        createdAt: serverTimestamp()
      });

      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding period:', error);
      return { success: false, error: error.message };
    }
  };

  const addSymptom = async (symptomData) => {
    try {
      if (!currentUser) throw new Error('User not authenticated');
      
      const docRef = await addDoc(collection(db, 'cycles'), {
        ...symptomData,
        userId: currentUser.uid,
        type: 'symptom',
        createdAt: serverTimestamp()
      });

      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding symptom:', error);
      return { success: false, error: error.message };
    }
  };

  const updatePeriod = async (id, data) => {
    try {
      if (!currentUser) throw new Error('User not authenticated');
      
      await updateDoc(doc(db, 'cycles', id), {
        ...data,
        updatedAt: serverTimestamp()
      });

      return { success: true };
    } catch (error) {
      console.error('Error updating period:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    cycleData,
    loading,
    error,
    addPeriod,
    addSymptom,
    updatePeriod
  };
}