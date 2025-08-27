import Navbar from '@/components/navbar';
import { Produk } from '@/types';
import { usePage } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import React, { useState } from 'react';

interface ProductsProps {
    products: Produk[];
    [key: string]: unknown;
}

export default function Products() {
    const { props } = usePage<ProductsProps>();
    const [products, setProducts] = useState<Produk[]>(props.products);
    const [filter, setFilter] = useState<'all' | 'terlaris' | 'terbaru'>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    // Removed unused filteredProducts state

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
            sortedProducts = sortedProducts.filter(
                (produk) =>
                    produk.nama_produk.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
                    produk.kategori?.nama.toLowerCase().includes(currentSearchTerm.toLowerCase()),
            );
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

            {/* Header Section */}
            <div className="container mx-auto px-4 py-6 sm:px-6 lg:py-8">
                <div className="mb-6 text-center lg:mb-8">
                    <h1 className="mb-3 text-3xl font-bold text-black sm:text-4xl lg:mb-4 lg:text-5xl">
                        Semua <span className="text-[#579D3E]">Produk</span>
                    </h1>
                    <p className="text-sm text-gray-600 sm:text-base lg:text-lg">Jelajahi koleksi lengkap produk MAK-PIN</p>
                    {(searchTerm || products.length !== props.products.length) && (
                        <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                            {searchTerm ? `Ditemukan ${products.length} produk untuk "${searchTerm}"` : `Menampilkan ${products.length} produk`}
                        </p>
                    )}
                </div>

                {/* Search Section */}
                <div className="mb-6 flex justify-center lg:mb-8">
                    <div className="relative w-full max-w-md">
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari produk atau kategori..."
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
                <div id="productsGrid" className="mx-auto max-w-7xl">
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

                                    {produk.kategori && <p className="text-sm text-gray-500">Kategori: {produk.kategori.nama}</p>}

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
                    <div className="py-12 text-center">
                        {searchTerm ? (
                            <>
                                <div className="mb-4 text-4xl sm:text-5xl lg:text-6xl">🔍</div>
                                <h3 className="mb-2 text-xl font-bold text-gray-700 sm:text-2xl">Tidak ada hasil</h3>
                                <p className="mb-4 text-sm text-gray-500 sm:text-base">Tidak ditemukan produk untuk "{searchTerm}"</p>
                                <button
                                    onClick={clearSearch}
                                    className="rounded-full bg-[#579D3E] px-6 py-2 text-white transition-colors hover:bg-[#456F32]"
                                >
                                    Hapus Pencarian
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="mb-4 text-4xl sm:text-5xl lg:text-6xl">🛍️</div>
                                <h3 className="mb-2 text-xl font-bold text-gray-700 sm:text-2xl">Belum Ada Produk</h3>
                                <p className="text-sm text-gray-500 sm:text-base">Produk akan segera hadir!</p>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Navigasi antar halaman utama dan Footer kedua dihapus sesuai permintaan */}
        </div>
    );
}
