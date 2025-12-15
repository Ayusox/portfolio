import { useState, useCallback } from 'react';

// Simple toast implementation
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = 'default' }) => {
    const id = Date.now();
    const newToast = { id, title, description, variant };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
    
    // For now, just log to console
    console.log(`Toast: ${title} - ${description}`);
  }, []);

  return { toast, toasts };
};