import react from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Link, usePage } from '@inertiajs/react';
import { Kategori } from '@/types';
import { Produk } from '@/types';

interface KatalogProps {
    kategoris: Kategori[];
    newestProducts: Produk[];
    terlarisProducts: Produk[];
    [key: string]: any; // Index signature untuk kompatibilitas dengan PageProps
}

export default function Katalog() {
    const { props } = usePage<KatalogProps>();
    const kategoris = props.kategoris;
    const newestProducts = props.newestProducts;
    const terlarisProducts = props.terlarisProducts;
    return (
        <div className='min-h-screen'> 
            <Navbar/>
            {/* E-Commerce yang tersedia */}
            <div className="mt-5">
                <div className="text-center">
                    <span className="text-black font-bold text-4xl italic">Catalog </span>
                    <span className="text-[#579D3E] font-bold text-4xl italic">MAK-PIN</span>
                    <p className="text-center text-lg">tersedia di beberapa e-commerce:</p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-20 mt-10">
                {[...Array(8)].map((_, i) => (
                    <img
                        key={i}
                        src="/e-commerce.png"
                        alt={`e-commerce logo ${i+1}`}
                        className="w-16 h-16 object-contain"
                    />
                ))}
                </div>
                <p className="text-center text-md">*logo diatas hanya ilustrasi saja</p>
            </div>
            {/* Search Bar */}
            <div className='flex items-center gap-25 bg-gray-300 px-25 py-5'>
                <p className='text-xl'>On Sale</p>
                <p className='text-xl'>New Arrivals</p>
                <div>
                    <input 
                    type="text" 
                    placeholder="Search for products..."
                    className='rounded-4xl bg-white px-3 py-2 w-150'
                    />
                </div>
            </div>

            {/* Jenis Jenis Katalog */}
            <div className='bg-gray-200 px-10 py-10 mt-10 mx-15 rounded-4xl mb-10'>
                <div className="max-w-6xl mx-auto">
                    <h1 className='text-6xl font-black text-center text-black mb-12'>JENIS KATALOG TERSEDIA</h1>
                    
                    <div className='grid grid-cols-5 gap-8'>
                        {kategoris.map((kategori, index) => {
                            // Tentukan posisi dalam baris (0 atau 1 untuk setiap baris)
                            const positionInRow = index % 2;
                            // Tentukan nomor baris (0, 1, 2, ...)
                            const rowNumber = Math.floor(index / 2);
                            
                            // Logika bergantian dengan perbandingan 3:2 (lebih seimbang):
                            // Baris genap (0, 2, 4...): item pertama panjang (3 col), item kedua sedang (2 col)
                            // Baris ganjil (1, 3, 5...): item pertama sedang (2 col), item kedua panjang (3 col)
                            let colSpan;
                            if (rowNumber % 2 === 0) {
                                // Baris genap
                                colSpan = positionInRow === 0 ? 'col-span-3' : 'col-span-2';
                            } else {
                                // Baris ganjil
                                colSpan = positionInRow === 0 ? 'col-span-2' : 'col-span-3';
                            }
                            
                            return (
                                <div key={kategori.id} className={`bg-white h-70 rounded-3xl shadow-lg overflow-hidden flex ${colSpan}`}>
                                    <div className='flex-1 p-8 flex flex-col justify-center'>
                                        <p className='text-sm text-gray-600 mb-2'>Limbah</p>
                                        <h3 className='text-3xl font-bold text-black mb-1'>{kategori.nama}</h3>
                                    </div>
                                    <div className='flex-1'>
                                        <img 
                                            src={`/storage/${kategori.thumbnail}`} 
                                            alt={`Limbah ${kategori.nama}`} 
                                            className='w-full h-full rounded-4xl object-cover'
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* Produk Terbaru */}
            <div className='border border-t border-b border-1 px-3 flex flex-col'>
                <h1 className='text-6xl font-bold text-center mb-5 mt-10 underline decoration-3 underline-offset-6'>PRODUK TERBARU</h1>
                <div className='flex gap-3 mx-8'>
                    {newestProducts.map((produk) => (   
                        <div key={produk.id} className='border border-black border-2 p-2 rounded-2xl'>
                            <img src={`/storage/${produk.first_image}`} alt={produk.nama_produk} className='bg-gray-100 p-4 w-100 h-90 rounded-2xl' />
                            <h2 className='text-2xl text-center font-acme font-bold mt-4'>{produk.nama_produk}</h2>
                            <p className='font-bold text-2xl mb-15 text-center'>Rp {produk.harga.toLocaleString()}</p>
                            <div className='text-center'>
                                <Link href="#" className='text-sm underline'>Klik disini (Lihat Selengkapnya)</Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex items-center justify-center p-9'>
                    <Link href="#" className='text-xl font-bold border border-1 border-black px-20 rounded-4xl py-6'>View All</Link>
                </div>
            </div>

            {/* Produk Terlaris */}
            <div className='border border-t border-b border-1 px-3 flex flex-col'>
                <h1 className='text-6xl font-bold text-center mt-8 mb-5 underline decoration-3 underline-offset-6'>PRODUK TERLARIS</h1>
                <div className='flex gap-3 mx-8'>
                    {terlarisProducts.map((produk) => (   
                        <div key={produk.id} className='border border-black border-2 p-2 rounded-2xl'>
                            <img src={`/storage/${produk.first_image}`} alt={produk.nama_produk} className='bg-gray-100 p-4 w-100 h-90 rounded-2xl' />
                            <h2 className='text-2xl text-center font-acme font-bold mt-4'>{produk.nama_produk}</h2>
                            <p className='font-bold text-2xl mb-15 text-center'>Rp {produk.harga.toLocaleString()}</p>
                            <div className='text-center'>
                                <Link href="#" className='text-sm underline'>Klik disini (Lihat Selengkapnya)</Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex items-center justify-center p-9'>
                    <Link href="#" className='text-xl font-bold border border-1 border-black px-20 rounded-4xl py-6'>View All</Link>
                </div>
            </div>
            
            <Footer/>
        </div>
    );
}
