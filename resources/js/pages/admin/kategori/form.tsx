import React, { useState, useEffect } from "react";
import NavbarAdmin from "@/components/navbarAdmin";
import NotificationPopup from "@/components/NotificationPopup";
import { useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Save, X, Upload, Image, Tag, ArrowLeft } from 'lucide-react';

interface Kategori {
    id?: number;
    nama: string;
    thumbnail: string | null;
    thumbnail_url: string | null
}

interface KategoriFormProps {
    kategori?: Kategori;
    mode: 'create' | 'edit';
    [key:string]: any;
}

export default function KategoriForm({ kategori, mode, ...props }: KategoriFormProps) {
    const [notification, setNotification] = useState<{
        type: 'loading' | 'success' | 'error';
        message: string;
    } | null>(null);

    const [isVisible, setIsVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(
        kategori?.thumbnail_url || null
    );

    const isEditMode = mode === 'edit';
    const formTitle = isEditMode ? 'Edit Kategori' : 'Tambah Kategori';

    // Animation trigger
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Initial form values - PERBAIKAN: Selalu include semua field yang dibutuhkan
    const initialValues = {
        nama: kategori?.nama ?? '',
        thumbnail: null as File | null,
        // Tambahan: include ID untuk edit mode
        ...(isEditMode && kategori?.id && { id: kategori.id }),
        // Tambahan: method spoofing untuk Laravel
        _method: isEditMode ? 'PUT' : 'POST'
    };

    const { data, setData, post, processing, errors, transform } = useForm(initialValues);

    // PERBAIKAN: Transform data sebelum dikirim
    transform((data) => {
        const formData = new FormData();
        
        // Selalu kirim nama (required field)
        formData.append('nama', data.nama || '');
        
        // Kirim thumbnail hanya jika ada file baru
        if (data.thumbnail instanceof File) {
            formData.append('thumbnail', data.thumbnail);
        }
        
        // Untuk edit mode, tambahkan method spoofing
        if (isEditMode) {
            formData.append('_method', 'PUT');
        }

        return formData;
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('thumbnail', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // PERBAIKAN: Validasi data sebelum kirim
        if (!data.nama.trim()) {
            setNotification({ 
                type: 'error', 
                message: 'Nama kategori harus diisi!' 
            });
            return;
        }

        setNotification({ 
            type: 'loading', 
            message: isEditMode ? 'Mengupdate kategori...' : 'Membuat kategori...' 
        });

        try {
            // PERBAIKAN: Gunakan POST untuk semua request dengan method spoofing
            const url = isEditMode ? `/admin/kategori/${kategori?.id}` : '/admin/kategori';
            
            post(url, {
                preserveScroll: true,
                forceFormData: true, // PENTING: Paksa gunakan FormData
                onSuccess: () => {
                    setNotification({ 
                        type: 'success', 
                        message: isEditMode ? 'Kategori berhasil diupdate!' : 'Kategori berhasil dibuat!'
                    });
                    setTimeout(() => {
                        router.visit('/admin/kategori');
                    }, 2000);
                },
                onError: (errors) => {
                    console.log('Form errors:', errors); // Debug log
                    setNotification({ 
                        type: 'error', 
                        message: isEditMode ? 'Gagal mengupdate kategori!' : 'Gagal membuat kategori!'
                    });
                },
                onBefore: () => {
                    // Debug: Log data yang akan dikirim
                    console.log('Data yang akan dikirim:', {
                        nama: data.nama,
                        thumbnail: data.thumbnail,
                        isEditMode,
                        kategoriId: kategori?.id
                    });
                }
            });
        } catch (error) {
            console.error('Submit error:', error); // Debug log
            setNotification({ 
                type: 'error', 
                message: 'Terjadi kesalahan sistem!' 
            });
        }
    };

    // PERBAIKAN: Reset preview saat cancel
    const handleCancel = () => {
        setPreviewImage(kategori?.thumbnail_url || null);
        setData('thumbnail', null);
        router.visit('/admin/kategori');
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
                                <Tag className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{formTitle}</h1>
                                <p className="text-sm sm:text-base text-gray-600 mt-1">
                                    {isEditMode ? 'Update informasi kategori' : 'Buat kategori baru untuk produk'}
                                </p>
                            </div>
                        </div>
                        
                        <Button
                            type="button"
                            onClick={() => router.visit('/admin/kategori')}
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 hover:border-gray-300 rounded-xl px-4 sm:px-6 py-2 sm:py-3 transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 text-sm sm:text-base w-full sm:w-auto justify-center"
                        >
                            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span>Kembali</span>
                        </Button>
                    </div>
                </div>

                {/* Debug Info - Hapus setelah testing */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-yellow-800">Debug Info:</h3>
                        <pre className="text-sm text-yellow-700 mt-2">
                            {JSON.stringify({
                                mode,
                                kategoriId: kategori?.id,
                                formData: {
                                    nama: data.nama,
                                    hasNewThumbnail: data.thumbnail instanceof File,
                                    thumbnailName: data.thumbnail?.name || 'No new file'
                                }
                            }, null, 2)}
                        </pre>
                    </div>
                )}

                {/* Form */}
                <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="p-4 sm:p-6 bg-gradient-to-r from-[#579D3E] to-[#4a8535]">
                        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2 sm:space-x-3">
                            <Tag className="h-5 w-5 sm:h-6 sm:w-6" />
                            <span>Informasi Kategori</span>
                        </h2>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
                        {/* Nama Kategori */}
                        <div>
                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
                                Nama Kategori
                            </label>
                            <input
                                type="text"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#579D3E] focus:border-[#579D3E] transition-colors duration-200"
                                placeholder="Masukkan nama kategori"
                                required
                            />
                            {errors.nama && (
                                <p className="mt-2 text-sm text-red-600">{errors.nama}</p>
                            )}
                        </div>

                        {/* Thumbnail Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Thumbnail Kategori
                                {isEditMode && (
                                    <span className="text-xs text-gray-500 ml-2">
                                        (Kosongkan jika tidak ingin mengubah)
                                    </span>
                                )}
                            </label>
                            
                            <div className="space-y-4">
                                {/* File Input */}
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="thumbnail"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="thumbnail"
                                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#579D3E] transition-colors duration-200 cursor-pointer group"
                                    >
                                        <div className="text-center">
                                            <Upload className="h-8 w-8 text-gray-400 group-hover:text-[#579D3E] mx-auto mb-2 transition-colors duration-200" />
                                            <p className="text-sm text-gray-600 group-hover:text-[#579D3E] transition-colors duration-200">
                                                {isEditMode ? 'Klik untuk ganti thumbnail' : 'Klik untuk upload thumbnail'}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                PNG, JPG hingga 2MB
                                            </p>
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
                                                <p className="text-sm font-medium text-gray-900">Preview Thumbnail</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {data.thumbnail instanceof File ? 'Thumbnail baru' : 'Thumbnail saat ini'}
                                                </p>
                                            </div>
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    setPreviewImage(isEditMode ? kategori?.thumbnail_url || null : null);
                                                    setData('thumbnail', null);
                                                }}
                                                className="bg-red-100 text-red-700 hover:bg-red-200 border border-red-200 hover:border-red-300 rounded-lg p-2 transition-all duration-200"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {errors.thumbnail && (
                                <p className="mt-2 text-sm text-red-600">{errors.thumbnail}</p>
                            )}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                            <Button
                                type="button"
                                onClick={handleCancel}
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