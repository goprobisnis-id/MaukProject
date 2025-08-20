import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Link, usePage } from '@inertiajs/react';
import { Produk } from '@/types';

interface ProductsProps {
    products: Produk[];
    [key: string]: any;
}

export default function Products() {
    const { props } = usePage<ProductsProps>();
    const [products, setProducts] = useState<Produk[]>(props.products);
    const [filter, setFilter] = useState<'all' | 'terlaris' | 'terbaru'>('all');

    const handleFilterChange = (newFilter: 'all' | 'terlaris' | 'terbaru') => {
        setFilter(newFilter);
        
        let sortedProducts = [...props.products];
        
        if (newFilter === 'terlaris') {
            sortedProducts.sort((a, b) => b.jumlah_pembelian - a.jumlah_pembelian);
        } else if (newFilter === 'terbaru') {
            sortedProducts.sort((a, b) => {
                const dateA = new Date(a.created_at || '');
                const dateB = new Date(b.created_at || '');
                return dateB.getTime() - dateA.getTime();
            });
        }
        
        setProducts(sortedProducts);
    };

    return (
        <div className='min-h-screen bg-white'>
            <Navbar />
            
            {/* Header Section */}
            <div className="container mx-auto px-4 sm:px-6 py-6 lg:py-8">
                <div className="text-center mb-6 lg:mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-3 lg:mb-4">
                        Semua <span className="text-[#579D3E]">Produk</span>
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600">Jelajahi koleksi lengkap produk MAK-PIN</p>
                </div>

                {/* Filter Section */}
                <div className="flex justify-center mb-6 lg:mb-8">
                    <div className="bg-gray-100 rounded-full p-1 sm:p-2 flex gap-1 sm:gap-2 overflow-x-auto">
                        <button
                            onClick={() => handleFilterChange('all')}
                            className={`px-3 sm:px-6 py-2 rounded-full transition-all text-sm sm:text-base whitespace-nowrap ${
                                filter === 'all'
                                    ? 'bg-[#579D3E] text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Semua Produk
                        </button>
                        <button
                            onClick={() => handleFilterChange('terlaris')}
                            className={`px-3 sm:px-6 py-2 rounded-full transition-all text-sm sm:text-base whitespace-nowrap ${
                                filter === 'terlaris'
                                    ? 'bg-[#579D3E] text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Terlaris
                        </button>
                        <button
                            onClick={() => handleFilterChange('terbaru')}
                            className={`px-3 sm:px-6 py-2 rounded-full transition-all text-sm sm:text-base whitespace-nowrap ${
                                filter === 'terbaru'
                                    ? 'bg-[#579D3E] text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Terbaru
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                        {products.map((produk) => (
                            <div key={produk.id} className="w-full max-w-sm border-2 border-black rounded-2xl p-4 bg-white hover:shadow-xl hover:border-[#579D3E] transition-all duration-300 group">
                                <div className="aspect-square w-full mb-4 bg-gray-100 rounded-2xl overflow-hidden">
                                    <img 
                                        src={`/storage/${produk.first_image}`} 
                                        alt={produk.nama_produk} 
                                        className="w-full h-full object-cover p-4 group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                
                                <div className="text-center space-y-2">
                                    <h2 className="text-xl font-bold font-acme text-black group-hover:text-[#579D3E] transition-colors line-clamp-2">
                                        {produk.nama_produk}
                                    </h2>
                                    
                                    <p className="text-xl font-bold text-[#579D3E]">
                                        Rp {produk.harga.toLocaleString('id-ID')}
                                    </p>
                                    
                                    {produk.kategori && (
                                        <p className="text-sm text-gray-500">
                                            Kategori: {produk.kategori.nama}
                                        </p>
                                    )}
                                    
                                    <p className="text-sm text-gray-500">
                                        Terjual: {produk.jumlah_pembelian} item
                                    </p>
                                    
                                    <div className="space-y-3 pt-2">
                                        <Link 
                                            href="#" 
                                            className="block text-sm text-[#579D3E] hover:text-[#456F32] underline transition-colors font-medium"
                                        >
                                            Lihat Detail Produk
                                        </Link>
                                        
                                        <div className="flex gap-2 justify-center">
                                            {produk.link_shopee && (
                                                <a 
                                                    href={produk.link_shopee}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs bg-orange-500 text-white px-3 py-1 rounded-full hover:bg-orange-600 transition-colors shadow-sm"
                                                >
                                                    Shopee
                                                </a>
                                            )}
                                            {produk.link_tokped && (
                                                <a 
                                                    href={produk.link_tokped}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors shadow-sm"
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
                    <div className="text-center py-12">
                        <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">🛍️</div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">Belum Ada Produk</h3>
                        <p className="text-sm sm:text-base text-gray-500">Produk akan segera hadir!</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
