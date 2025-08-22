import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X, Loader2 } from 'lucide-react';

interface NotificationPopupProps {
  isOpen: boolean;
  type: 'loading' | 'success' | 'error';
  title: string;
  message?: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function NotificationPopup({
  isOpen,
  type,
  title,
  message,
  onClose,
  autoClose = true,
  duration = 3000
}: NotificationPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      
      if (autoClose && type !== 'loading') {
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            onClose?.();
          }, 300);
        }, duration);

        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [isOpen, autoClose, duration, type, onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'loading':
        return <Loader2 className="h-8 w-8 text-[#579D3E] animate-spin" />;
      case 'success':
        return <CheckCircle className="h-8 w-8 text-[#579D3E]" />;
      case 'error':
        return <AlertCircle className="h-8 w-8 text-red-500" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'loading':
        return 'bg-white border-[#579D3E]';
      case 'success':
        return 'bg-white border-[#579D3E]';
      case 'error':
        return 'bg-white border-red-500';
      default:
        return 'bg-white border-gray-300';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-50 ${
          isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={type !== 'loading' ? onClose : undefined}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div 
          className={`
            ${getBgColor()} 
            rounded-2xl shadow-2xl border-2 p-6 max-w-sm w-full mx-auto
            transform transition-all duration-300 ease-out
            ${isVisible 
              ? 'scale-100 opacity-100 translate-y-0' 
              : 'scale-95 opacity-0 translate-y-4'
            }
          `}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Icon */}
            <div className={`
              p-3 rounded-full 
              ${type === 'loading' ? 'bg-[#579D3E] bg-opacity-10' : ''}
              ${type === 'success' ? 'bg-[#579D3E] bg-opacity-10' : ''}
              ${type === 'error' ? 'bg-red-500 bg-opacity-10' : ''}
            `}>
              {getIcon()}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800">
              {title}
            </h3>

            {/* Message */}
            {message && (
              <p className="text-gray-600 text-sm">
                {message}
              </p>
            )}

            {/* Close Button (only for non-loading types) */}
            {type !== 'loading' && onClose && (
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-[#579D3E] text-white rounded-xl hover:bg-[#456F32] transition-colors duration-300 font-medium"
              >
                OK
              </button>
            )}
          </div>

          {/* Close X Button (only for non-loading types) */}
          {type !== 'loading' && onClose && (
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
