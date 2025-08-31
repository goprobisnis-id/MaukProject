import React, { useState, useEffect } from "react";
import NavbarAdmin from "@/components/navbarAdmin";
import NotificationPopup from "@/components/NotificationPopup";
import { useForm, router, usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Button } from '@/components/ui/button';
import { Save, X, Upload, Image, Calendar, ArrowLeft, MapPin, FileText } from 'lucide-react';

interface Event {
    id?: number;
    nama_event: string;
    banner: string | null;
    tanggal: string;
    tempat: string;
    deskripsi: string;
    banner_url?: string;
    status: string;
}

interface PageProps extends InertiaPageProps {
    event?: Event;
    statusOptions?: string[];
}

export default function EventForm() {
    const { event, statusOptions = ['ongoing', 'coming soon', 'ended'] } = usePage<PageProps>().props;
    
    const [notification, setNotification] = useState<{
        type: 'loading' | 'success' | 'error';
        message: string;
    } | null>(null);

    const [isVisible, setIsVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(
        event?.banner_url || (event?.banner ? `/storage/${event.banner}` : null)
    );

    const isEditMode = !!event;
    const formTitle = isEditMode ? 'Edit Event' : 'Buat Event Baru';

    // Animation trigger
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Initial form values
    const initialValues = {
        nama_event: event?.nama_event ?? '',
        banner: null as File | null,
        existing_banner: event?.banner ?? '', // Menyimpan path banner yang sudah ada
        tanggal: event?.tanggal ?? '',
        tempat: event?.tempat ?? '',
        deskripsi: event?.deskripsi ?? '',
        status: event?.status ?? '',
        _method: isEditMode ? 'PUT' : 'POST',
    };

    const { data, setData, post, processing, errors } = useForm(initialValues);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('banner', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreviewImage(null);
        setData('banner', null);
        // Reset to original banner if in edit mode
        if (isEditMode && event?.banner_url) {
            setPreviewImage(event.banner_url);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setNotification({ 
            type: 'loading', 
            message: isEditMode ? 'Mengupdate event...' : 'Membuat event...' 
        });

        try {
            const url = isEditMode && event?.id 
                ? `/admin/events/${event.id}` 
                : '/admin/events';

            post(url, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    setNotification({ 
                        type: 'success', 
                        message: isEditMode ? 'Event berhasil diupdate!' : 'Event berhasil dibuat!' 
                    });
                    setTimeout(() => {
                        router.visit('/admin/events');
                    }, 2000);
                },
                onError: () => {
                    setNotification({ 
                        type: 'error', 
                        message: isEditMode ? 'Gagal mengupdate event!' : 'Gagal membuat event!' 
                    });
                }
            });
        } catch (error) {
            setNotification({ 
                type: 'error', 
                message: 'Terjadi kesalahan sistem!' 
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <NavbarAdmin />
            
            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                
                {/* Header */}
                <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="p-2 sm:p-3 bg-[#579D3E] rounded-xl shadow-lg">
                                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{formTitle}</h1>
                                <p className="text-sm sm:text-base text-gray-600 mt-1">
                                    {isEditMode ? 'Update informasi event' : 'Buat event baru untuk promosi dan acara'}
                                </p>
                            </div>
                        </div>
                        
                        <Button
                            type="button"
                            onClick={() => router.visit('/admin/events')}
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 hover:border-gray-300 rounded-xl px-4 sm:px-6 py-2 sm:py-3 transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 text-sm sm:text-base w-full sm:w-auto justify-center"
                        >
                            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span>Kembali</span>
                        </Button>
                    </div>
                </div>

                {/* Form */}
                <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="p-4 sm:p-6 bg-gradient-to-r from-[#579D3E] to-[#4a8535]">
                        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2 sm:space-x-3">
                            <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
                            <span>Informasi Event</span>
                        </h2>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
                        {/* Nama Event */}
                        <div>
                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
                                Nama Event
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Calendar className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={data.nama_event}
                                    onChange={(e) => setData('nama_event', e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#579D3E] focus:border-[#579D3E] transition-colors duration-200"
                                    placeholder="Masukkan nama event"
                                    required
                                />
                            </div>
                            {errors.nama_event && (
                                <p className="mt-2 text-sm text-red-600">{errors.nama_event}</p>
                            )}
                        </div>

                        {/* Banner Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Banner Event
                                {isEditMode && (
                                    <span className="text-xs text-gray-500 ml-2">
                                        (Opsional - biarkan kosong jika tidak ingin mengubah banner)
                                    </span>
                                )}
                            </label>
                            
                            <div className="space-y-4">
                                {/* File Input */}
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="banner"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        required={!isEditMode} // Hanya required pada create mode
                                    />
                                    <label
                                        htmlFor="banner"
                                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#579D3E] transition-colors duration-200 cursor-pointer group"
                                    >
                                        <div className="text-center">
                                            <Upload className="h-8 w-8 text-gray-400 group-hover:text-[#579D3E] mx-auto mb-2 transition-colors duration-200" />
                                            <p className="text-sm text-gray-600 group-hover:text-[#579D3E] transition-colors duration-200">
                                                {isEditMode 
                                                    ? 'Klik untuk mengubah banner event' 
                                                    : 'Klik untuk upload banner event'
                                                }
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                PNG, JPG hingga 2MB
                                            </p>
                                            {isEditMode && (
                                                <p className="text-xs text-blue-600 mt-1">
                                                    Banner saat ini akan tetap digunakan jika tidak diubah
                                                </p>
                                            )}
                                        </div>
                                    </label>
                                </div>

                                {/* Image Preview */}
                                {previewImage && (
                                    <div className="relative">
                                        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {data.banner ? 'Banner Baru' : 'Banner Saat Ini'}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {data.banner 
                                                        ? 'File baru akan mengganti banner yang ada' 
                                                        : isEditMode 
                                                            ? 'Banner yang sedang digunakan'
                                                            : 'Preview banner'
                                                    }
                                                </p>
                                                {isEditMode && !data.banner && (
                                                    <p className="text-xs text-blue-600 mt-1">
                                                        💡 Upload file baru untuk mengganti banner
                                                    </p>
                                                )}
                                            </div>
                                            <Button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="bg-red-100 text-red-700 hover:bg-red-200 border border-red-200 hover:border-red-300 rounded-lg p-2 transition-all duration-200"
                                                title={data.banner ? "Hapus file baru" : "Reset ke banner asli"}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {errors.banner && (
                                <p className="mt-2 text-sm text-red-600">{errors.banner}</p>
                            )}
                            
                            {/* Banner Info for Edit Mode */}
                            {isEditMode && event?.banner && !previewImage && (
                                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-blue-500 rounded-lg">
                                            <Image className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-blue-900">Banner Tersimpan</p>
                                            <p className="text-xs text-blue-700 mt-1">
                                                Event ini sudah memiliki banner. Upload file baru jika ingin menggantinya.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tanggal Event */}
                        <div>
                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
                                Tanggal Event
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Calendar className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="date"
                                    value={data.tanggal}
                                    onChange={(e) => setData('tanggal', e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#579D3E] focus:border-[#579D3E] transition-colors duration-200"
                                    required
                                />
                            </div>
                            {errors.tanggal && (
                                <p className="mt-2 text-sm text-red-600">{errors.tanggal}</p>
                            )}
                        </div>

                        {/* Tempat Event */}
                        <div>
                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
                                Tempat Event
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={data.tempat}
                                    onChange={(e) => setData('tempat', e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#579D3E] focus:border-[#579D3E] transition-colors duration-200"
                                    placeholder="Masukkan lokasi event"
                                    required
                                />
                            </div>
                            {errors.tempat && (
                                <p className="mt-2 text-sm text-red-600">{errors.tempat}</p>
                            )}
                        </div>

                        {/* Deskripsi Event */}
                        <div>
                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
                                Deskripsi Event
                            </label>
                            <div className="relative">
                                <div className="absolute top-3 left-3 pointer-events-none">
                                    <FileText className="h-5 w-5 text-gray-400" />
                                </div>
                                <textarea
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    rows={4}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#579D3E] focus:border-[#579D3E] transition-colors duration-200 resize-none"
                                    placeholder="Masukkan deskripsi lengkap event"
                                    required
                                />
                            </div>
                            {errors.deskripsi && (
                                <p className="mt-2 text-sm text-red-600">{errors.deskripsi}</p>
                            )}
                        </div>

                        {/* Status Event */}
                        <div>
                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
                                Status Event
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                {statusOptions.map((status) => {
                                    const getStatusConfig = (statusValue: string) => {
                                        switch (statusValue) {
                                            case 'ongoing':
                                                return {
                                                    label: 'Buka Pendaftaran',
                                                    color: 'bg-green-500',
                                                    bgColor: 'bg-green-50',
                                                    borderColor: 'border-green-200',
                                                    textColor: 'text-green-700',
                                                    icon: '✅'
                                                };
                                            case 'coming soon':
                                                return {
                                                    label: 'Segera Dibuka',
                                                    color: 'bg-blue-500',
                                                    bgColor: 'bg-blue-50',
                                                    borderColor: 'border-blue-200',
                                                    textColor: 'text-blue-700',
                                                    icon: '📅'
                                                };
                                            case 'ended':
                                                return {
                                                    label: 'Event Selesai',
                                                    color: 'bg-gray-500',
                                                    bgColor: 'bg-gray-50',
                                                    borderColor: 'border-gray-200',
                                                    textColor: 'text-gray-700',
                                                    icon: '🏁'
                                                };
                                            default:
                                                return {
                                                    label: status,
                                                    color: 'bg-gray-500',
                                                    bgColor: 'bg-gray-50',
                                                    borderColor: 'border-gray-200',
                                                    textColor: 'text-gray-700',
                                                    icon: '📝'
                                                };
                                        }
                                    };

                                    const config = getStatusConfig(status);
                                    const isSelected = data.status === status;

                                    return (
                                        <label
                                            key={status}
                                            className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 ${
                                                isSelected 
                                                    ? `${config.borderColor} ${config.bgColor} ring-2 ring-offset-2 ring-[#579D3E]` 
                                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="status"
                                                value={status}
                                                checked={data.status === status}
                                                onChange={(e) => setData('status', e.target.value)}
                                                className="sr-only"
                                            />
                                            
                                            {/* Radio Indicator */}
                                            <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mr-3 transition-all duration-200 ${
                                                isSelected 
                                                    ? `${config.color} border-transparent` 
                                                    : 'border-gray-300'
                                            }`}>
                                                {isSelected && (
                                                    <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                                                )}
                                            </div>
                                            
                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg">{config.icon}</span>
                                                    <span className={`font-medium text-sm ${
                                                        isSelected ? config.textColor : 'text-gray-700'
                                                    }`}>
                                                        {config.label}
                                                    </span>
                                                </div>
                                                <p className={`text-xs mt-1 ${
                                                    isSelected ? config.textColor.replace('700', '600') : 'text-gray-500'
                                                }`}>
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </p>
                                            </div>
                                            
                                            {/* Selected Indicator */}
                                            {isSelected && (
                                                <div className="absolute top-2 right-2">
                                                    <div className={`w-6 h-6 ${config.color} rounded-full flex items-center justify-center`}>
                                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </label>
                                    );
                                })}
                            </div>
                            {errors.status && (
                                <p className="mt-2 text-sm text-red-600">{errors.status}</p>
                            )}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                            <Button
                                type="button"
                                onClick={() => router.visit('/admin/events')}
                                className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 hover:border-gray-300 rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105"
                                disabled={processing}
                            >
                                Batal
                            </Button>
                            
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-[#579D3E] hover:bg-[#4a8535] text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                        <span>Menyimpan...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-5 w-5" />
                                        <span>{isEditMode ? 'Update' : 'Simpan'}</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Notification Popup */}
            <NotificationPopup
                isOpen={!!notification}
                type={notification?.type || 'loading'}
                title={notification?.message || ''}
                onClose={() => setNotification(null)}
            />
        </div>
    );
}
