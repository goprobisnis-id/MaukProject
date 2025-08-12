import React, { useRef } from "react";
import NavbarAdmin from "@/components/navbarAdmin";
import { useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Save, X, Upload, Image, Tag, Sparkles, ArrowLeft, FileImage, ShoppingBag, DollarSign, Link, FileText, Hash, Palette, Ruler } from 'lucide-react';

interface Kategori {
    id: number;
    nama: string;
}

interface ProdukImage {
    image: string;
}

interface ProdukSize {
    size: string;
}

interface ProdukColor {
    color_name: string;
    hex_code: string;
}

interface Produk {
    id?: number;
    nama_produk: string;
    harga: number;
    kategori_id: number;
    first_image: string | null;
    link_shopee?: string;
    link_tokped?: string;
    short_desc?: string;
    long_desc?: string;
    jumlah_pembelian: number;
    images?: ProdukImage[];
    sizes?: ProdukSize[];
    colors?: ProdukColor[];
}

interface ProdukFormProps {
    produk?: Produk;
    mode: 'create' | 'edit';
    kategoris: Kategori[];
    [key: string]: any;
}

interface ColorItem {
    color: string;
    hex: string;
}

// Interface untuk form data yang akan dikirim
interface FormData {
    nama_produk: string;
    harga: number;
    kategori_id: number;
    first_image: File | null;
    link_shopee: string;
    link_tokped: string;
    short_desc: string;
    long_desc: string;
    jumlah_pembelian: number;
    image: File[];
    size: string[];
    color: string[];
    hex_code: string[];
}

export default function ProdukForm({ produk, mode, kategoris }: ProdukFormProps) {
    const isEditMode = mode === 'edit';
    const formTitle = isEditMode ? 'Edit Produk' : 'Tambah Produk';

    // Menggunakan interface FormData untuk typing yang tepat
    const { data, setData, post, put, processing, errors } = useForm<FormData>({
        nama_produk: produk?.nama_produk ?? '',
        harga: produk?.harga ?? 0,
        kategori_id: produk?.kategori_id ?? kategoris[0]?.id ?? 0,
        first_image: null,
        link_shopee: produk?.link_shopee ?? '',
        link_tokped: produk?.link_tokped ?? '',
        short_desc: produk?.short_desc ?? '',
        long_desc: produk?.long_desc ?? '',
        jumlah_pembelian: produk?.jumlah_pembelian ?? 0,
        image: [],
        size: produk?.sizes?.map((s: ProdukSize) => s.size) ?? [],
        color: produk?.colors?.map((c: ProdukColor) => c.color_name) ?? [],
        hex_code: produk?.colors?.map((c: ProdukColor) => c.hex_code) ?? [],
    });

    const imageInputRef = useRef<HTMLInputElement>(null);
    const [sizes, setSizes] = React.useState<string[]>(produk?.sizes?.map((s: ProdukSize) => s.size) ?? ['']);
    const [colors, setColors] = React.useState<ColorItem[]>(
        produk?.colors?.map((c: ProdukColor) => ({ color: c.color_name, hex: c.hex_code })) ?? [{ color: '', hex: '' }]
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode && produk?.id) {
            put(`/admin/produk/${produk.id}`, {
                preserveScroll: true,
                forceFormData: true,
            });
        } else {
            post('/admin/produk', {
                preserveScroll: true,
                forceFormData: true,
            });
        }
    };

    const addSizeField = () => {
        setSizes([...sizes, '']);
    };

    const removeSizeField = (index: number) => {
        const newSizes = sizes.filter((_: string, idx: number) => idx !== index);
        setSizes(newSizes);
        setData('size', newSizes);
    };

    const addColorField = () => {
        setColors([...colors, { color: '', hex: '' }]);
    };

    const removeColorField = (index: number) => {
        const newColors = colors.filter((_: ColorItem, idx: number) => idx !== index);
        setColors(newColors);
        setData('color', newColors.map((c: ColorItem) => c.color));
        setData('hex_code', newColors.map((c: ColorItem) => c.hex));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 animate-gradient-x">
            <NavbarAdmin />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Animated Header */}
                <div className="mb-8 animate-fade-in-up">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg animate-pulse-gentle">
                            <ShoppingBag className="h-8 w-8 text-white" />
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
                            <ShoppingBag className="h-6 w-6 animate-spin-slow" />
                            Form Produk
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="p-8">
                            {/* Form Content */}
                            <div className="space-y-8">
                                {/* Nama Produk Field */}
                                <div className="animate-slide-in-left delay-300">
                                    <label 
                                        htmlFor="nama_produk" 
                                        className="block text-lg font-semibold text-emerald-800 mb-3 flex items-center gap-2"
                                    >
                                        <Tag className="h-5 w-5 text-emerald-600" />
                                        Nama Produk
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            id="nama_produk"
                                            value={data.nama_produk}
                                            onChange={e => setData('nama_produk', e.target.value)}
                                            required
                                            className="w-full px-6 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm group-hover:border-emerald-300 hover:shadow-lg"
                                            placeholder="Masukkan nama produk..."
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                            <Tag className="h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors duration-300" />
                                        </div>
                                    </div>
                                    {errors.nama_produk && (
                                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
                                            <span className="text-red-600 text-sm font-medium flex items-center gap-2">
                                                <X className="h-4 w-4" />
                                                {errors.nama_produk}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Harga Field */}
                                <div className="animate-slide-in-right delay-400">
                                    <label 
                                        htmlFor="harga" 
                                        className="block text-lg font-semibold text-emerald-800 mb-3 flex items-center gap-2"
                                    >
                                        <DollarSign className="h-5 w-5 text-emerald-600" />
                                        Harga
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="number"
                                            id="harga"
                                            value={data.harga}
                                            onChange={e => setData('harga', Number(e.target.value))}
                                            required
                                            className="w-full px-6 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm group-hover:border-emerald-300 hover:shadow-lg"
                                            placeholder="0"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                            <DollarSign className="h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors duration-300" />
                                        </div>
                                    </div>
                                    {errors.harga && (
                                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
                                            <span className="text-red-600 text-sm font-medium flex items-center gap-2">
                                                <X className="h-4 w-4" />
                                                {errors.harga}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Kategori Field */}
                                <div className="animate-slide-in-left delay-500">
                                    <label 
                                        htmlFor="kategori_id" 
                                        className="block text-lg font-semibold text-emerald-800 mb-3 flex items-center gap-2"
                                    >
                                        <Tag className="h-5 w-5 text-emerald-600" />
                                        Kategori
                                    </label>
                                    <div className="relative group">
                                        <select
                                            id="kategori_id"
                                            value={data.kategori_id}
                                            onChange={e => setData('kategori_id', Number(e.target.value))}
                                            required
                                            className="w-full px-6 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm group-hover:border-emerald-300 hover:shadow-lg"
                                        >
                                            {kategoris.map((kat: Kategori) => (
                                                <option key={kat.id} value={kat.id}>{kat.nama}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.kategori_id && (
                                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
                                            <span className="text-red-600 text-sm font-medium flex items-center gap-2">
                                                <X className="h-4 w-4" />
                                                {errors.kategori_id}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Gambar Utama Field */}
                                <div className="animate-slide-in-right delay-600">
                                    <label 
                                        htmlFor="first_image" 
                                        className="block text-lg font-semibold text-emerald-800 mb-3 flex items-center gap-2"
                                    >
                                        <Image className="h-5 w-5 text-emerald-600" />
                                        Gambar Utama
                                    </label>
                                    
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="first_image"
                                            accept="image/*"
                                            onChange={e => setData('first_image', e.target.files?.[0] ?? null)}
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
                                                        {data.first_image ? data.first_image.name : 'Pilih gambar utama'}
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        PNG, JPG, GIF hingga 10MB
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {errors.first_image && (
                                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
                                            <span className="text-red-600 text-sm font-medium flex items-center gap-2">
                                                <X className="h-4 w-4" />
                                                {errors.first_image}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Gambar Lain Field */}
                                <div className="animate-slide-in-left delay-700">
                                    <label 
                                        htmlFor="image" 
                                        className="block text-lg font-semibold text-emerald-800 mb-3 flex items-center gap-2"
                                    >
                                        <Image className="h-5 w-5 text-emerald-600" />
                                        Gambar Lain (bisa lebih dari satu)
                                    </label>
                                    
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="image"
                                            accept="image/*"
                                            multiple
                                            ref={imageInputRef}
                                            onChange={e => setData('image', e.target.files ? Array.from(e.target.files) : [])}
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
                                                        {data.image.length > 0 ? `${data.image.length} file dipilih` : 'Pilih gambar tambahan'}
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        PNG, JPG, GIF hingga 10MB (multiple)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {errors.image && (
                                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
                                            <span className="text-red-600 text-sm font-medium flex items-center gap-2">
                                                <X className="h-4 w-4" />
                                                {errors.image}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Link Shopee Field */}
                                <div className="animate-slide-in-right delay-800">
                                    <label 
                                        htmlFor="link_shopee" 
                                        className="block text-lg font-semibold text-emerald-800 mb-3 flex items-center gap-2"
                                    >
                                        <Link className="h-5 w-5 text-emerald-600" />
                                        Link Shopee
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            id="link_shopee"
                                            value={data.link_shopee}
                                            onChange={e => setData('link_shopee', e.target.value)}
                                            className="w-full px-6 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm group-hover:border-emerald-300 hover:shadow-lg"
                                            placeholder="https://shopee.co.id/..."
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                            <Link className="h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors duration-300" />
                                        </div>
                                    </div>
                                    {errors.link_shopee && (
                                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
                                            <span className="text-red-600 text-sm font-medium flex items-center gap-2">
                                                <X className="h-4 w-4" />
                                                {errors.link_shopee}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Link Tokopedia Field */}
                                <div className="animate-slide-in-left delay-900">
                                    <label 
                                        htmlFor="link_tokped" 
                                        className="block text-lg font-semibold text-emerald-800 mb-3 flex items-center gap-2"
                                    >
                                        <Link className="h-5 w-5 text-emerald-600" />
                                        Link Tokopedia
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            id="link_tokped"
                                            value={data.link_tokped}
                                            onChange={e => setData('link_tokped', e.target.value)}
                                            className="w-full px-6 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm group-hover:border-emerald-300 hover:shadow-lg"
                                            placeholder="https://tokopedia.com/..."
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                            <Link className="h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors duration-300" />
                                        </div>
                                    </div>
                                    {errors.link_tokped && (
                                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
                                            <span className="text-red-600 text-sm font-medium flex items-center gap-2">
                                                <X className="h-4 w-4" />
                                                {errors.link_tokped}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Deskripsi Singkat Field */}
                                <div className="animate-slide-in-right delay-1000">
                                    <label 
                                        htmlFor="short_desc" 
                                        className="block text-lg font-semibold text-emerald-800 mb-3 flex items-center gap-2"
                                    >
                                        <FileText className="h-5 w-5 text-emerald-600" />
                                        Deskripsi Singkat
                                    </label>
                                    <div className="relative group">
                                        <textarea
                                            id="short_desc"
                                            value={data.short_desc}
                                            onChange={e => setData('short_desc', e.target.value)}
                                            maxLength={500}
                                            className="w-full px-6 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm group-hover:border-emerald-300 hover:shadow-lg h-24 resize-none"
                                            placeholder="Masukkan deskripsi singkat produk..."
                                        />
                                        <div className="absolute top-4 right-4">
                                            <FileText className="h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors duration-300" />
                                        </div>
                                    </div>
                                    {errors.short_desc && (
                                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
                                            <span className="text-red-600 text-sm font-medium flex items-center gap-2">
                                                <X className="h-4 w-4" />
                                                {errors.short_desc}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Deskripsi Lengkap Field */}
                                <div className="animate-slide-in-left delay-1100">
                                    <label 
                                        htmlFor="long_desc" 
                                        className="block text-lg font-semibold text-emerald-800 mb-3 flex items-center gap-2"
                                    >
                                        <FileText className="h-5 w-5 text-emerald-600" />
                                        Deskripsi Lengkap
                                    </label>
                                    <div className="relative group">
                                        <textarea
                                            id="long_desc"
                                            value={data.long_desc}
                                            onChange={e => setData('long_desc', e.target.value)}
                                            className="w-full px-6 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm group-hover:border-emerald-300 hover:shadow-lg h-32 resize-none"
                                            placeholder="Masukkan deskripsi lengkap produk..."
                                        />
                                        <div className="absolute top-4 right-4">
                                            <FileText className="h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors duration-300" />
                                        </div>
                                    </div>
                                    {errors.long_desc && (
                                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
                                            <span className="text-red-600 text-sm font-medium flex items-center gap-2">
                                                <X className="h-4 w-4" />
                                                {errors.long_desc}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Jumlah Pembelian Field */}
                                <div className="animate-slide-in-right delay-1200">
                                    <label 
                                        htmlFor="jumlah_pembelian" 
                                        className="block text-lg font-semibold text-emerald-800 mb-3 flex items-center gap-2"
                                    >
                                        <Hash className="h-5 w-5 text-emerald-600" />
                                        Jumlah Pembelian
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="number"
                                            id="jumlah_pembelian"
                                            value={data.jumlah_pembelian}
                                            onChange={e => setData('jumlah_pembelian', Number(e.target.value))}
                                            required
                                            className="w-full px-6 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm group-hover:border-emerald-300 hover:shadow-lg"
                                            placeholder="0"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                            <Hash className="h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors duration-300" />
                                        </div>
                                    </div>
                                    {errors.jumlah_pembelian && (
                                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
                                            <span className="text-red-600 text-sm font-medium flex items-center gap-2">
                                                <X className="h-4 w-4" />
                                                {errors.jumlah_pembelian}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Size Field */}
                                <div className="animate-slide-in-left delay-1300">
                                    <label className="block text-lg font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                                        <Ruler className="h-5 w-5 text-emerald-600" />
                                        Ukuran (Size)
                                    </label>
                                    <div className="space-y-4">
                                        {sizes.map((size: string, idx: number) => (
                                            <div key={idx} className="flex gap-3 items-center group">
                                                <div className="flex-1 relative">
                                                    <input
                                                        type="text"
                                                        value={size}
                                                        onChange={e => {
                                                            const newSizes = [...sizes];
                                                            newSizes[idx] = e.target.value;
                                                            setSizes(newSizes);
                                                            setData('size', newSizes);
                                                        }}
                                                        placeholder="Masukkan ukuran"
                                                        className="w-full px-6 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm group-hover:border-emerald-300 hover:shadow-lg"
                                                    />
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                        <Ruler className="h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors duration-300" />
                                                    </div>
                                                </div>
                                                <Button 
                                                    type="button" 
                                                    onClick={() => removeSizeField(idx)}
                                                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                                                >
                                                    <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button 
                                            type="button" 
                                            onClick={addSizeField}
                                            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Ruler className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                                                <span className="font-semibold">Tambah Ukuran</span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>

                                {/* Color Field */}
                                <div className="animate-slide-in-right delay-1400">
                                    <label className="block text-lg font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                                        <Palette className="h-5 w-5 text-emerald-600" />
                                        Warna dan Kode Hex
                                    </label>
                                    <div className="space-y-4">
                                        {colors.map((item: ColorItem, idx: number) => (
                                            <div key={idx} className="flex gap-3 items-center group">
                                                <div className="flex-1 relative">
                                                    <input
                                                        type="text"
                                                        value={item.color}
                                                        onChange={e => {
                                                            const newColors = [...colors];
                                                            newColors[idx].color = e.target.value;
                                                            setColors(newColors);
                                                            setData('color', newColors.map((c: ColorItem) => c.color));
                                                        }}
                                                        placeholder="Nama warna"
                                                        className="w-full px-6 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm group-hover:border-emerald-300 hover:shadow-lg"
                                                    />
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                        <Palette className="h-5 w-5 text-emerald-400 group-focus-within:text-emerald-600 transition-colors duration-300" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 relative">
                                                    <input
                                                        type="text"
                                                        value={item.hex}
                                                        onChange={e => {
                                                            const newColors = [...colors];
                                                            newColors[idx].hex = e.target.value;
                                                            setColors(newColors);
                                                            setData('hex_code', newColors.map((c: ColorItem) => c.hex));
                                                        }}
                                                        placeholder="#RRGGBB"
                                                        className="w-full px-6 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm group-hover:border-emerald-300 hover:shadow-lg"
                                                    />
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                        {item.hex && (
                                                            <div 
                                                                className="w-6 h-6 rounded-full border-2 border-white shadow-lg" 
                                                                style={{ backgroundColor: item.hex }}
                                                            ></div>
                                                        )}
                                                    </div>
                                                </div>
                                                <Button 
                                                    type="button" 
                                                    onClick={() => removeColorField(idx)}
                                                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                                                >
                                                    <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button 
                                            type="button" 
                                            onClick={addColorField}
                                            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Palette className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                                                <span className="font-semibold">Tambah Warna</span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Form Footer */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-emerald-200 animate-fade-in-up delay-1500">
                                <Button 
                                    type="submit" 
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
                                    onClick={() => router.visit('/admin/produk')}
                                    className="flex-1 sm:flex-none bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 border-2 border-gray-300 hover:border-gray-400 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                                        <span className="font-semibold">Batal</span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </form>
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