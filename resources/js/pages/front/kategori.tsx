import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Kategori, Produk } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import React, { useState } from 'react';

interface KategoriProps {
    kategori: Kategori;
    products: Produk[];
    [key: string]: unknown;
}

export default function KategoriPage() {
    const { props } = usePage<KategoriProps>();
    const [products, setProducts] = useState<Produk[]>(props.products);
    const [filter, setFilter] = useState<'all' | 'terlaris' | 'terbaru'>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const applyFiltersAndSearch = (newFilter?: 'all' | 'terlaris' | 'terbaru', newSearchTerm?: string) => {
        const currentFilter = newFilter || filter;
        const currentSearchTerm = newSearchTerm !== undefined ? newSearchTerm : searchTerm;

        let sortedProducts = [...props.products];

        // Apply sorting filter
        if (currentFilter === 'terlaris') {
            sortedProducts.sort((a, b) => b.jumlah_pembelian - a.jumlah_pembelian);
        } else if (currentFilter === 'terbaru') {
            sortedProducts.sort((a, b) => {
                const dateA = new Date(a.created_at || '');
                const dateB = new Date(b.created_at || '');
                return dateB.getTime() - dateA.getTime();
            });
        }

        // Apply search filter
        if (currentSearchTerm.trim()) {
            sortedProducts = sortedProducts.filter((produk) => produk.nama_produk.toLowerCase().includes(currentSearchTerm.toLowerCase()));
        }

        setProducts(sortedProducts);
    };

    const handleFilterChange = (newFilter: 'all' | 'terlaris' | 'terbaru') => {
        setFilter(newFilter);
        applyFiltersAndSearch(newFilter);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        applyFiltersAndSearch(undefined, newSearchTerm);
    };

    const clearSearch = () => {
        setSearchTerm('');
        applyFiltersAndSearch(undefined, '');
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-3 sm:px-6 sm:py-4">
                <nav className="text-xs text-gray-600 sm:text-sm">
                    <Link href="/" className="hover:text-[#579D3E]">
                        Beranda
                    </Link>
                    <span className="mx-1 sm:mx-2">/</span>
                    <Link href="/katalog" className="hover:text-[#579D3E]">
                        Katalog
                    </Link>
                    <span className="mx-1 sm:mx-2">/</span>
                    <span className="font-medium text-gray-800">{props.kategori.nama}</span>
                </nav>
            </div>

            {/* Header Section */}
            <div className="container mx-auto px-4 py-6 sm:px-6 lg:py-8">
                <div className="mb-6 text-center lg:mb-8">
                    <div className="mb-4 flex items-center justify-center lg:mb-6">
                        <img
                            src={`/storage/${props.kategori.thumbnail}`}
                            alt={props.kategori.nama}
                            className="h-16 w-16 rounded-full border-4 border-[#579D3E] object-cover shadow-lg transition-transform duration-300 hover:scale-110 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                        />
                    </div>
                    <h1 className="mb-3 text-3xl font-bold text-black sm:text-4xl lg:mb-4 lg:text-5xl">
                        Kategori <span className="text-[#579D3E]">{props.kategori.nama}</span>
                    </h1>
                    <p className="mb-2 text-sm text-gray-600 sm:text-base lg:text-lg">
                        Temukan produk terbaik dalam kategori {props.kategori.nama.toLowerCase()}
                    </p>
                    <p className="text-xs text-gray-500 sm:text-sm">
                        {searchTerm ? `Ditemukan ${products.length} produk untuk "${searchTerm}"` : `Ditemukan ${products.length} produk`}
                    </p>
                </div>

                {/* Search Section */}
                <div className="mb-6 flex justify-center lg:mb-8">
                    <div className="relative w-full max-w-md">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari produk dalam kategori ini..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full rounded-full border-2 border-gray-200 py-3 pr-10 pl-10 text-sm transition-colors focus:border-[#579D3E] focus:outline-none sm:text-base"
                            />
                            {searchTerm && (
                                <button
                                    onClick={clearSearch}
                                    aria-label="Clear search"
                                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-gray-600"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="mb-6 flex justify-center lg:mb-8">
                    <div className="flex gap-1 overflow-x-auto rounded-full bg-gray-100 p-1 sm:gap-2 sm:p-2">
                        <button
                            onClick={() => handleFilterChange('all')}
                            className={`rounded-full px-3 py-2 text-sm whitespace-nowrap transition-all hover:scale-105 sm:px-6 sm:text-base ${
                                filter === 'all' ? 'bg-[#579D3E] text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Semua Produk
                        </button>
                        <button
                            onClick={() => handleFilterChange('terlaris')}
                            className={`rounded-full px-3 py-2 text-sm whitespace-nowrap transition-all hover:scale-105 sm:px-6 sm:text-base ${
                                filter === 'terlaris' ? 'bg-[#579D3E] text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Terlaris
                        </button>
                        <button
                            onClick={() => handleFilterChange('terbaru')}
                            className={`rounded-full px-3 py-2 text-sm whitespace-nowrap transition-all hover:scale-105 sm:px-6 sm:text-base ${
                                filter === 'terbaru' ? 'bg-[#579D3E] text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Terbaru
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="animate-fade-in mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((produk, index) => (
                            <div
                                key={produk.id}
                                className={`group animate-fade-in w-full max-w-sm cursor-pointer rounded-2xl border-2 border-black bg-white p-4 transition-all duration-300 hover:scale-105 hover:border-[#579D3E] hover:shadow-xl delay-[${index * 50}ms]`}
                                onClick={() => (window.location.href = `/products/${produk.id}`)}
                            >
                                <div className="mb-4 aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
                                    <img
                                        src={`/storage/${produk.first_image}`}
                                        alt={produk.nama_produk}
                                        className="h-full w-full object-cover p-4 transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>

                                <div className="space-y-2 text-center">
                                    <h2 className="line-clamp-2 font-acme text-xl font-bold text-black transition-colors group-hover:text-[#579D3E]">
                                        {produk.nama_produk}
                                    </h2>

                                    <p className="text-xl font-bold text-[#579D3E]">Rp {produk.harga.toLocaleString('id-ID')}</p>

                                    <p className="text-sm text-gray-500">Terjual: {produk.jumlah_pembelian} item</p>

                                    <div className="space-y-3 pt-2">
                                        <div className="flex justify-center gap-2">
                                            {produk.link_shopee && (
                                                <a
                                                    href={produk.link_shopee}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="rounded-full bg-orange-500 px-3 py-1 text-xs text-white shadow-sm transition-colors hover:bg-orange-600"
                                                >
                                                    Shopee
                                                </a>
                                            )}
                                            {produk.link_tokped && (
                                                <a
                                                    href={produk.link_tokped}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="rounded-full bg-green-500 px-3 py-1 text-xs text-white shadow-sm transition-colors hover:bg-green-600"
                                                >
                                                    Tokopedia
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Empty State */}
                {products.length === 0 && (
                    <div className="py-12 text-center lg:py-16">
                        {searchTerm ? (
                            <>
                                <div className="mb-4 text-6xl sm:text-7xl lg:mb-6 lg:text-8xl">�</div>
                                <h3 className="mb-3 text-2xl font-bold text-gray-700 sm:text-3xl lg:mb-4">Tidak ada hasil</h3>
                                <p className="mb-4 px-4 text-base text-gray-500 sm:text-lg lg:mb-6">
                                    Tidak ditemukan produk untuk "{searchTerm}" dalam kategori {props.kategori.nama}
                                </p>
                                <button
                                    onClick={clearSearch}
                                    className="mr-4 rounded-full bg-[#579D3E] px-6 py-2 text-white transition-colors hover:bg-[#456F32]"
                                >
                                    Hapus Pencarian
                                </button>
                                <Link
                                    href="/katalog"
                                    className="inline-block rounded-full border-2 border-gray-300 bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 sm:px-8 sm:py-3 sm:text-base"
                                >
                                    Kembali ke Katalog
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="mb-4 text-6xl sm:text-7xl lg:mb-6 lg:text-8xl">�📦</div>
                                <h3 className="mb-3 text-2xl font-bold text-gray-700 sm:text-3xl lg:mb-4">Belum Ada Produk</h3>
                                <nav className="my-4 flex justify-center gap-4">
                                    <Link href="/" className="text-blue-600 hover:underline">
                                        Home
                                    </Link>
                                    <Link href="/products" className="text-blue-600 hover:underline">
                                        Produk
                                    </Link>
                                    <Link href="/katalog" className="text-blue-600 hover:underline">
                                        Katalog
                                    </Link>
                                    <Link href="/dashboard" className="text-blue-600 hover:underline">
                                        Dashboard
                                    </Link>
                                    <Link href="/login" className="text-blue-600 hover:underline">
                                        Login
                                    </Link>
                                </nav>
                                <p className="mb-4 px-4 text-base text-gray-500 sm:text-lg lg:mb-6">
                                    Produk untuk kategori {props.kategori.nama} sedang dalam proses penambahan
                                </p>
                                <Link
                                    href="/katalog"
                                    className="inline-block rounded-full bg-[#579D3E] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#456F32] sm:px-8 sm:py-3 sm:text-base"
                                >
                                    Kembali ke Katalog
                                </Link>
                            </>
                        )}
                    </div>
                )}

                {/* Back to Catalog Button */}
                {products.length > 0 && (
                    <div className="mt-8 flex justify-center lg:mt-12">
                        <Link
                            href="/katalog"
                            className="rounded-full border-2 border-gray-300 bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 sm:px-8 sm:py-3 sm:text-base"
                        >
                            ← Kembali ke Katalog
                        </Link>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
