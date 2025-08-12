import React from 'react';
import { X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'success' | 'error' | 'warning';
    title: string;
    message: string;
    details?: string[];
}

export default function Modal({ isOpen, onClose, type, title, message, details }: ModalProps) {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="h-12 w-12 text-green-500" />;
            case 'error':
                return <XCircle className="h-12 w-12 text-red-500" />;
            case 'warning':
                return <AlertCircle className="h-12 w-12 text-yellow-500" />;
            default:
                return <AlertCircle className="h-12 w-12 text-blue-500" />;
        }
    };

    const getColorClasses = () => {
        switch (type) {
            case 'success':
                return {
                    bg: 'bg-green-50',
                    border: 'border-green-200',
                    text: 'text-green-800',
                    button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                };
            case 'error':
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    text: 'text-red-800',
                    button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-50',
                    border: 'border-yellow-200',
                    text: 'text-yellow-800',
                    button: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                };
            default:
                return {
                    bg: 'bg-blue-50',
                    border: 'border-blue-200',
                    text: 'text-blue-800',
                    button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                };
        }
    };

    const colors = getColorClasses();

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in"
                onClick={onClose}
            ></div>
            
            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className={`relative bg-white rounded-2xl shadow-2xl border-2 ${colors.border} max-w-md w-full mx-auto animate-scale-in`}>
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    {/* Content */}
                    <div className="p-8">
                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div className={`p-3 rounded-full ${colors.bg} animate-bounce-gentle`}>
                                {getIcon()}
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className={`text-2xl font-bold text-center mb-4 ${colors.text}`}>
                            {title}
                        </h3>

                        {/* Message */}
                        <p className="text-gray-700 text-center mb-6 text-lg leading-relaxed">
                            {message}
                        </p>

                        {/* Details */}
                        {details && details.length > 0 && (
                            <div className={`${colors.bg} border ${colors.border} rounded-xl p-4 mb-6`}>
                                <h4 className={`font-semibold ${colors.text} mb-2`}>Detail Error:</h4>
                                <ul className="space-y-1">
                                    {details.map((detail, index) => (
                                        <li key={index} className={`text-sm ${colors.text} flex items-start`}>
                                            <span className="mr-2">•</span>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Action Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={onClose}
                                className={`px-8 py-3 ${colors.button} text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 shadow-lg`}
                            >
                                {type === 'success' ? 'Lanjutkan' : 'Tutup'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
