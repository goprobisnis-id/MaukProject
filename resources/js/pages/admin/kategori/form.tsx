import React from "react";
import NavbarAdmin from "@/components/navbarAdmin";
// Card components will be styled manually
import { useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Save, X, Upload, Image, Tag, Sparkles, ArrowLeft, FileImage } from 'lucide-react';

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

    const isEditMode = mode === 'edit';
    const formTitle = isEditMode ? 'Edit Kategori' : 'Tambah Kategori';

    // Initial form values
    const initialValues = {
        nama: kategori?.nama ?? '',
        thumbnail: null as File | null, // khusus untuk upload baru
    };

    const { data, setData, post, put, processing, errors } = useForm(initialValues);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode && kategori?.id) {
            put(`/admin/kategori/${kategori.id}`, {
                preserveScroll: true,
            });
        } else {
            post('/admin/kategori', {
                preserveScroll: true,
            });
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 animate-gradient-x">
            <NavbarAdmin />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Animated Header */}
                <div className="mb-8 animate-fade-in-up">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg animate-pulse-gentle">
                            <Tag className="h-8 w-8 text-white" />
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                                <Sparkles className="h-3 w-3 text-yellow-700" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                {formTitle}
                            </h1>
                            <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 animate-width-expand"></div>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-emerald-200 overflow-hidden animate-fade-in-up delay-200">
                    {/* Card Header */}
                    <div className="p-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 animate-shimmer"></div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
                            <Tag className="h-6 w-6 animate-spin-slow" />
                            Form Kategori
                        </h2>
                    </div>

                    <div className="p-8">
                        {/* Form Content */}
                        <div className="space-y-8">
                            {/* Nama Kategori Field */}
                            <div className="animate-slide-in-left delay-300">
                                <label 
                                    htmlFor="name" 
                                    className="block text-lg font-semibold text-emerald-800 mb-3 flex items-center gap-2"
                                >
                                    <Tag className="h-5 w-5 text-emerald-600" />
                                    Nama Kategori
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        required
                                        className="w-full px-6 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm group-hover:border-emerald-300 hover:shadow-lg"
                                        placeholder="Masukkan nama kategori..."
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                        <Tag className="h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors duration-300" />
                                    </div>
                                </div>
                                {errors.nama && (
                                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
                                        <span className="text-red-600 text-sm font-medium flex items-center gap-2">
                                            <X className="h-4 w-4" />
                                            {errors.nama}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Field */}
                            <div className="animate-slide-in-right delay-400">
                                <label 
                                    htmlFor="thumbnail" 
                                    className="block text-lg font-semibold text-emerald-800 mb-3 flex items-center gap-2"
                                >
                                    <Image className="h-5 w-5 text-emerald-600" />
                                    Thumbnail
                                </label>
                                
                                {/* File Upload Area */}
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="thumbnail"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setData('thumbnail', e.target.files[0]);
                                            }
                                        }}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="border-2 border-dashed border-emerald-300 rounded-xl p-8 text-center hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 group cursor-pointer bg-white/50 backdrop-blur-sm">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="relative">
                                                <div className="p-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300">
                                                    <Upload className="h-8 w-8 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                                                </div>
                                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                                                    <FileImage className="h-3 w-3 text-white" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-emerald-700 group-hover:text-emerald-800 transition-colors duration-300">
                                                    {data.thumbnail ? data.thumbnail.name : 'Pilih gambar thumbnail'}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    PNG, JPG, GIF hingga 10MB
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {errors.thumbnail && (
                                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
                                        <span className="text-red-600 text-sm font-medium flex items-center gap-2">
                                            <X className="h-4 w-4" />
                                            {errors.thumbnail}
                                        </span>
                                    </div>
                                )}

                                {/* Preview Existing Thumbnail */}
                                {isEditMode && kategori?.thumbnail_url && !data.thumbnail && (
                                    <div className="mt-4 animate-fade-in">
                                        <p className="text-sm font-medium text-emerald-700 mb-2">Thumbnail saat ini:</p>
                                        <div className="relative inline-block">
                                            <img 
                                                src={kategori.thumbnail_url} 
                                                alt="Current thumbnail" 
                                                className="w-24 h-24 object-cover rounded-xl shadow-lg border-2 border-emerald-200 hover:border-emerald-400 transition-colors duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Form Footer */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-emerald-200 animate-fade-in-up delay-500">
                            <Button 
                                type="submit" 
                                onClick={handleSubmit}
                                disabled={processing}
                                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                <div className="flex items-center justify-center gap-3">
                                    {processing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span className="font-semibold">Menyimpan...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                                            <span className="font-semibold">Simpan</span>
                                        </>
                                    )}
                                </div>
                            </Button>
                            
                            <Button
                                type="button"
                                onClick={() => router.visit('/admin/kategori')}
                                className="flex-1 sm:flex-none bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 border-2 border-gray-300 hover:border-gray-400 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                                    <span className="font-semibold">Batal</span>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes slide-in-left {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slide-in-right {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes width-expand {
                    from { width: 0; }
                    to { width: 100%; }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes pulse-gentle {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-gradient-x { animation: gradient-x 15s ease infinite; }
                .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
                .animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
                .animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }
                .animate-width-expand { animation: width-expand 1s ease-out; }
                .animate-fade-in { animation: fade-in 0.6s ease-out; }
                .animate-pulse-gentle { animation: pulse-gentle 2s ease-in-out infinite; }
                .animate-spin-slow { animation: spin-slow 3s linear infinite; }
                .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
                .animate-shake { animation: shake 0.5s ease-in-out; }
            `}</style>
        </div>
    );
}