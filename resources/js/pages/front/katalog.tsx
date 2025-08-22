import react, { useEffect, useRef, useState } from 'react';
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

    const [isVisible, setIsVisible] = useState(false);
    const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // Hook untuk animasi saat komponen dimount
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Hook untuk Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections(prev => ({
                            ...prev,
                            [entry.target.id]: true
                        }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        // Observe semua section
        Object.values(sectionRefs.current).forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const setSectionRef = (id: string) => (el: HTMLDivElement | null) => {
        sectionRefs.current[id] = el;
    };
    return (
        <div className='min-h-screen'> 
            <Navbar/>
            {/* E-Commerce yang tersedia */}
            <div 
                className={`mt-5 px-4 sm:px-8 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="text-center">
                    <span className="text-black font-bold text-2xl sm:text-3xl lg:text-4xl italic">Catalog </span>
                    <span className="text-[#579D3E] font-bold text-2xl sm:text-3xl lg:text-4xl italic">MAK-PIN</span>
                    <p className="text-center text-sm sm:text-base lg:text-lg mt-2">tersedia di beberapa e-commerce:</p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 lg:gap-12 xl:gap-20 mt-6 lg:mt-10">
                    {[...Array(8)].map((_, i) => (
                        <img
                            key={i}
                            src="/e-commerce.png"
                            alt={`e-commerce logo ${i+1}`}
                            className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain transition-all duration-500 hover:scale-110 ${
                                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                            }`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        />
                    ))}
                </div>
                <p className="text-center text-xs sm:text-sm lg:text-md mt-4">*logo diatas hanya ilustrasi saja</p>
            </div>
            {/* Search Bar */}
            <div 
                className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-8 lg:gap-25 bg-gray-300 px-4 sm:px-8 lg:px-25 py-3 sm:py-5 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
            >
                <p className='text-lg sm:text-xl'>On Sale</p>
                <p className='text-lg sm:text-xl'>New Arrivals</p>
                <div className="w-full sm:w-auto">
                    <input 
                        type="text" 
                        placeholder="Search for products..."
                        className='rounded-full bg-white px-3 py-2 w-full sm:w-64 lg:w-150 text-sm focus:outline-none focus:ring-2 focus:ring-[#579D3E] transition-all duration-300'
                    />
                </div>
            </div>

            {/* Jenis Jenis Katalog */}
            <div 
                ref={setSectionRef('kategoriSection')}
                id="kategoriSection"
                className={`bg-gray-200 px-4 sm:px-6 lg:px-10 py-6 lg:py-10 mt-6 lg:mt-10 mx-4 sm:mx-8 lg:mx-15 rounded-2xl lg:rounded-4xl mb-6 lg:mb-10 transition-all duration-1000 ${
                    visibleSections.kategoriSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="max-w-6xl mx-auto">
                    <h1 className='text-3xl sm:text-4xl lg:text-6xl font-black text-center text-black mb-8 lg:mb-12'>JENIS KATALOG TERSEDIA</h1>
                    
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-8'>
                        {kategoris.map((kategori, index) => {
                            // Untuk mobile dan tablet, semua kategori full width
                            // Untuk desktop, gunakan logika alternating 3:2
                            const positionInRow = index % 2;
                            const rowNumber = Math.floor(index / 2);
                            
                            let colSpan = 'col-span-1'; // Default untuk mobile/tablet
                            
                            // Hanya terapkan logika alternating pada desktop (lg dan atas)
                            const lgColSpan = rowNumber % 2 === 0 
                                ? (positionInRow === 0 ? 'lg:col-span-3' : 'lg:col-span-2')
                                : (positionInRow === 0 ? 'lg:col-span-2' : 'lg:col-span-3');
                            
                            return (
                                <Link 
                                    key={kategori.id} 
                                    href={`/kategori/${kategori.id}`}
                                    className={`bg-white h-48 sm:h-56 lg:h-70 rounded-2xl lg:rounded-3xl shadow-lg overflow-hidden flex ${colSpan} ${lgColSpan} hover:shadow-xl transition-all duration-500 group cursor-pointer hover:scale-105 ${
                                        visibleSections.kategoriSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                >
                                    <div className='flex-1 p-4 sm:p-6 lg:p-8 flex flex-col justify-center'>
                                        <p className='text-xs sm:text-sm text-gray-600 mb-1 lg:mb-2'>Kategori</p>
                                        <h3 className='text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-1 group-hover:text-[#579D3E] transition-colors'>{kategori.nama}</h3>
                                        <p className='text-xs sm:text-sm text-[#579D3E] mt-1 lg:mt-2 opacity-0 group-hover:opacity-100 transition-opacity'>Klik untuk melihat produk →</p>
                                    </div>
                                    <div className='flex-1'>
                                        <img 
                                            src={`/storage/${kategori.thumbnail}`} 
                                            alt={`${kategori.nama}`} 
                                            className='w-full h-full rounded-2xl lg:rounded-4xl object-cover group-hover:scale-105 transition-transform duration-300'
                                        />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* Produk Terbaru */}
            <div 
                ref={setSectionRef('newestProducts')}
                id="newestProducts"
                className={`border-t border-b border-gray-300 px-4 sm:px-6 lg:px-8 py-8 lg:py-12 transition-all duration-1000 ${
                    visibleSections.newestProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-center mb-8 lg:mb-12 underline decoration-2 lg:decoration-3 underline-offset-4 lg:underline-offset-6">
                        PRODUK TERBARU
                    </h1>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                        {newestProducts.map((produk, index) => (   
                            <div 
                                key={produk.id} 
                                className={`w-full max-w-sm border-2 border-black rounded-2xl p-4 bg-white hover:shadow-xl hover:border-[#579D3E] transition-all duration-300 cursor-pointer group hover:scale-105 ${
                                    visibleSections.newestProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                                onClick={() => window.location.href = `/products/${produk.id}`}
                            >
                                    <div className="aspect-square w-full mb-4 bg-gray-100 rounded-2xl overflow-hidden">
                                        <img 
                                            src={`/storage/${produk.first_image}`} 
                                            alt={produk.nama_produk} 
                                            className="w-full h-full object-cover p-4 group-hover:scale-105 transition-transform duration-300" 
                                        />
                                    </div>
                                    
                                    <div className="text-center space-y-2">
                                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold font-acme line-clamp-2">
                                            {produk.nama_produk}
                                        </h2>
                                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-black">
                                            Rp {produk.harga.toLocaleString()}
                                        </p>
                                        <p className="text-xs sm:text-sm text-[#579D3E] transition-colors">
                                            Klik untuk melihat detail produk
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                    
                    <div className="flex justify-center mt-8 lg:mt-12">
                        <Link 
                            href="/products" 
                            className="text-base sm:text-lg lg:text-xl font-bold border border-black px-8 sm:px-12 lg:px-20 py-3 lg:py-6 rounded-full lg:rounded-full hover:bg-gray-100 transition-colors"
                        >
                            View All
                        </Link>
                    </div>
                </div>
            </div>

            {/* Produk Terlaris */}
            <div 
                ref={setSectionRef('terlarisProducts')}
                id="terlarisProducts"
                className={`border-t border-b border-gray-300 px-4 sm:px-6 lg:px-8 py-8 lg:py-12 transition-all duration-1000 ${
                    visibleSections.terlarisProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-center mb-8 lg:mb-12 underline decoration-2 lg:decoration-3 underline-offset-4 lg:underline-offset-6">
                        PRODUK TERLARIS
                    </h1>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                        {terlarisProducts.map((produk, index) => (   
                            <div 
                                key={produk.id} 
                                className={`w-full max-w-sm border-2 border-black rounded-2xl p-4 bg-white hover:shadow-xl hover:border-[#579D3E] transition-all duration-300 cursor-pointer group hover:scale-105 ${
                                    visibleSections.terlarisProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                                onClick={() => window.location.href = `/products/${produk.id}`}
                            >
                                    <div className="aspect-square w-full mb-4 bg-gray-100 rounded-2xl overflow-hidden">
                                        <img 
                                            src={`/storage/${produk.first_image}`} 
                                            alt={produk.nama_produk} 
                                            className="w-full h-full object-cover p-4 group-hover:scale-105 transition-transform duration-300" 
                                        />
                                    </div>
                                    
                                    <div className="text-center space-y-2">
                                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold font-acme line-clamp-2">
                                            {produk.nama_produk}
                                        </h2>
                                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-black">
                                            Rp {produk.harga.toLocaleString()}
                                        </p>
                                        <p className="text-xs sm:text-sm text-[#579D3E] transition-colors">
                                            Klik untuk melihat detail produk
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                    
                    <div className="flex justify-center mt-8 lg:mt-12">
                        <Link 
                            href="/products" 
                            className="text-base sm:text-lg lg:text-xl font-bold border border-black px-8 sm:px-12 lg:px-20 py-3 lg:py-6 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            View All
                        </Link>
                    </div>
                </div>
            </div>
            
            <Footer/>
        </div>
    );
}
