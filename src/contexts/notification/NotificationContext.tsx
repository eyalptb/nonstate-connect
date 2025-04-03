
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner'; // Import directly from the sonner package
import { useTranslation } from '@/contexts/translation/TranslationContext';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  autoClose?: boolean;
  duration?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  dismissNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { t } = useTranslation(['common']);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification = { ...notification, id };
    
    setNotifications((prev) => [...prev, newNotification]);
    
    // Also display using Sonner toast
    const { type, title, message, autoClose = true, duration = 5000 } = notification;
    
    toast[type] ? toast[type](title, { 
      id,
      description: message, 
      duration: autoClose ? duration : Infinity 
    }) : toast(title, { 
      id,
      description: message, 
      duration: autoClose ? duration : Infinity 
    });
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter(notification => notification.id !== id));
    toast.dismiss(id);
  };

  // Clear notifications on language change
  const { currentLanguage } = useTranslation();
  useEffect(() => {
    // Keep notifications but re-display them with new language
  }, [currentLanguage]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        dismissNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  
  return context;
};

export default NotificationContext;
