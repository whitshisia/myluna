import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  signOut,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp
} from '../firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      try {
        if (user) {
          setCurrentUser(user);
          await fetchUserData(user.uid);
          setAuthError(null);
        } else {
          setCurrentUser(null);
          setUserData(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setAuthError(error.message);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setAuthError(error.message);
    }
  };

  const signUp = async (email, password, displayName) => {
    try {
      setAuthError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName });
      await sendEmailVerification(user);

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        createdAt: serverTimestamp(),
        onboardingComplete: false,
        mode: 'menstruating',
        settings: {
          notifications: true,
          language: 'en',
          theme: 'light'
        }
      });

      toast.success('Account created! Please verify your email.');
      return { user, success: true };
    } catch (error) {
      setAuthError(error.message);
      toast.error(error.message);
      return { error: error.message, success: false };
    }
  };

  const signIn = async (email, password) => {
    try {
      setAuthError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        toast.warning('Please verify your email before logging in.');
        return { user, success: true, emailVerified: false };
      }

      toast.success('Welcome back!');
      return { user, success: true, emailVerified: true };
    } catch (error) {
      setAuthError(error.message);
      toast.error(error.message);
      return { error: error.message, success: false };
    }
  };

  const signInWithGoogle = async () => {
    try {
      setAuthError(null);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'User',
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
          onboardingComplete: false,
          mode: 'menstruating',
          settings: {
            notifications: true,
            language: 'en',
            theme: 'light'
          }
        });
        toast.success('Account created with Google!');
      } else {
        toast.success('Welcome back!');
      }

      return { user, success: true };
    } catch (error) {
      setAuthError(error.message);
      toast.error(error.message);
      return { error: error.message, success: false };
    }
  };

  const resetPassword = async (email) => {
    try {
      setAuthError(null);
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
      return { success: true };
    } catch (error) {
      setAuthError(error.message);
      toast.error(error.message);
      return { error: error.message, success: false };
    }
  };

  const logout = async () => {
    try {
      setAuthError(null);
      await signOut(auth);
      toast.success('Logged out successfully');
      return { success: true };
    } catch (error) {
      setAuthError(error.message);
      toast.error(error.message);
      return { error: error.message, success: false };
    }
  };

  const updateUserData = async (data) => {
    try {
      if (!currentUser) throw new Error('No user logged in');
      await updateDoc(doc(db, 'users', currentUser.uid), data);
      setUserData(prev => ({ ...prev, ...data }));
      toast.success('Profile updated!');
      return { success: true };
    } catch (error) {
      setAuthError(error.message);
      toast.error(error.message);
      return { error: error.message, success: false };
    }
  };

  const value = {
    currentUser,
    userData,
    loading,
    authError,
    signUp,
    signIn,
    signInWithGoogle,
    resetPassword,
    logout,
    updateUserData,
    fetchUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}