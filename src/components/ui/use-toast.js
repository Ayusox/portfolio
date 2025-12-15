import { useState, useCallback } from 'react';

// Toast implementation with visual notifications
let toastId = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = 'default', duration = 4000, className = '' }) => {
    const id = ++toastId;
    const newToast = { id, title, description, variant, className };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after specified duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
    
    // Create and show visual toast
    showVisualToast(newToast, duration);
  }, []);

  const showVisualToast = (toast, duration) => {
    // Find the contact section to position toast relative to it
    const contactSection = document.getElementById('contact');
    const formContainer = contactSection?.querySelector('form')?.parentElement;
    
    // Create toast element
    const toastEl = document.createElement('div');
    
    if (formContainer) {
      // Position relative to form container
      toastEl.className = `absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-50 max-w-sm w-full bg-white border rounded-lg shadow-lg p-4 transition-all duration-300 opacity-0 scale-95 mb-4 ${toast.className}`;
      formContainer.style.position = 'relative';
      formContainer.appendChild(toastEl);
    } else {
      // Fallback to fixed position but lower on screen
      toastEl.className = `fixed bottom-20 right-4 z-50 max-w-sm w-full bg-white border rounded-lg shadow-lg p-4 transform transition-all duration-300 translate-x-full ${toast.className}`;
      document.body.appendChild(toastEl);
    }
    
    toastEl.innerHTML = `
      <div class="flex items-start">
        <div class="flex-1">
          <h4 class="font-semibold text-sm mb-1">${toast.title}</h4>
          <p class="text-sm opacity-90">${toast.description}</p>
        </div>
        <button class="ml-2 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    `;
    
    // Animate in
    setTimeout(() => {
      if (formContainer) {
        toastEl.style.opacity = '1';
        toastEl.style.transform = 'translateX(-50%) translateY(-100%) scale(1)';
      } else {
        toastEl.style.transform = 'translateX(0)';
      }
    }, 10);
    
    // Auto remove
    setTimeout(() => {
      if (toastEl.parentElement) {
        if (formContainer) {
          toastEl.style.opacity = '0';
          toastEl.style.transform = 'translateX(-50%) translateY(-100%) scale(0.95)';
        } else {
          toastEl.style.transform = 'translateX(100%)';
        }
        setTimeout(() => {
          if (toastEl.parentElement) {
            toastEl.remove();
          }
        }, 300);
      }
    }, duration - 300);
  };

  return { toast, toasts };
};