import { useState, useEffect } from 'react';

export function useNotifications() {
  const [permission, setPermission] = useState('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      console.log('Notifications not supported');
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  };

  const sendNotification = (title, options = {}) => {
    if (permission === 'granted') {
      try {
        new Notification(title, {
          icon: '/icons/icon-192.png',
          badge: '/icons/icon-192.png',
          ...options
        });
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    }
  };

  const schedulePeriodReminder = (periodStartDate) => {
    // Calculate when to send reminder (2 days before predicted period)
    const reminderDate = new Date(periodStartDate);
    reminderDate.setDate(reminderDate.getDate() - 2);
    
    return {
      date: reminderDate,
      title: '🌸 Your period is coming soon!',
      body: 'Get ready for your period starting in 2 days.'
    };
  };

  return {
    permission,
    requestPermission,
    sendNotification,
    schedulePeriodReminder
  };
}