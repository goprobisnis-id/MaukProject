import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {Produk} from "@/types";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

interface ProductDetailProps {
    produk: Produk;
    relatedProducts: Produk[];
}

export default function ProductDetail({ produk, relatedProducts }: ProductDetailProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const formatRupiah = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

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
        <div className="min-h-screen">
            <Navbar />
            {/* E Commerce yang tersedia */}
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

            <div className={`px-4 sm:px-8 lg:px-20 mt-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
                <Link href="/katalog">
                    <Button className="rounded-4xl border border-black text-black text-xl p-6 bg-white hover:bg-[#579D3E] hover:text-white">
                        Kembali
                    </Button>
                </Link>
            </div>
                    
            {/* Produk Detail */}
            <div 
                ref={setSectionRef('productDetail')}
                id="productDetail"
                className={`max-w-7xl mx-auto flex flex-col lg:flex-row px-4 sm:px-8 lg:px-10 py-8 lg:py-12 gap-6 lg:gap-8 transition-all duration-1000 ${
                    visibleSections.productDetail ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                {/* Thumbnail Images */}
                <div className="order-2 lg:order-1 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible max-w-full">
                    {produk.images? produk.images.map((image, index) =>
                    (<div 
                        key={image.id} 
                        className={`flex-shrink-0 transition-all duration-500 ${
                            visibleSections.productDetail ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                        }`}
                        style={{ transitionDelay: `${index * 150}ms` }}
                    >
                        <img src={`/storage/${image.image}`} alt={image.image} className="w-20 h-24 sm:w-24 sm:h-30 lg:w-32 lg:h-40 p-1 border border-black rounded-lg lg:rounded-2xl object-cover" />
                    </div>
                    )) : null}
                </div>
                
                {/* Main Image */}
                <div 
                    className={`order-1 lg:order-2 flex justify-center flex-1 transition-all duration-1000 ${
                        visibleSections.productDetail ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
                >
                    <img 
                        src={`/storage/${produk.first_image}`} 
                        alt={produk.nama_produk} 
                        className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto aspect-square p-2 border border-black rounded-2xl lg:rounded-3xl object-cover" 
                    />
                </div>
                
                {/* Product Info */}
                <div 
                    className={`order-3 w-full lg:max-w-md lg:flex-1 py-4 lg:py-8 lg:px-6 transition-all duration-1000 ${
                        visibleSections.productDetail ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                    }`}
                >
                    <h1 className="font-bold text-xl sm:text-2xl lg:text-4xl leading-tight mb-2">{produk.nama_produk}</h1>
                    <p className="font-bold text-lg sm:text-xl lg:text-2xl text-[#579D3E] mb-4">{formatRupiah(produk.harga)}</p>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">{produk.short_desc}</p>
                </div>
            </div>

            <div 
                ref={setSectionRef('ecommerce')}
                id="ecommerce"
                className={`max-w-4xl mx-auto flex flex-col items-center justify-center py-8 px-4 gap-6 transition-all duration-1000 ${
                    visibleSections.ecommerce ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <p className="text-center font-bold text-lg sm:text-xl lg:text-2xl">PRODUK INI<br/>TERSEDIA DI E-COMMERCE</p>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                    {/* Shopee Link */}
                    <a 
                        href={produk.link_shopee ?? ""} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center px-4 py-3 bg-white border-2 border-[#EE4D2D] rounded-lg hover:scale-105 transition-all duration-300 group ${
                            visibleSections.ecommerce ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                        }`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        <img 
                            src="/shopee-logo.svg" 
                            alt="Shopee Logo" 
                            className="w-28 sm:w-32 lg:w-36 object-contain"
                        />
                    </a>

                    {/* Tokopedia Link */}
                    <a 
                        href={produk.link_tokped ?? ""} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center bg-white border-2 border-[#42B549] rounded-lg px-4 py-3 hover:scale-105 transition-all duration-300 group ${
                            visibleSections.ecommerce ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                        }`}
                        style={{ transitionDelay: '400ms' }}
                    >
                        <img 
                            src="/tokopedia-logo.svg" 
                            alt= "Tokopedia Logo" 
                            className="w-28 sm:w-32 lg:w-36 object-contain"
                        />
                    </a>
                </div>
            </div>

            {/* DESKRIPSI SECTION */}
            <div 
                ref={setSectionRef('description')}
                id="description"
                className={`px-4 sm:px-8 lg:px-10 transition-all duration-1000 ${
                    visibleSections.description ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <p className="pt-4 pb-1 text-xl sm:text-2xl border-t-4 sm:border-t-8 lg:border-t-10 border-t-green-100 border-b border-b-black">Deskripsi Produk</p>
                <div className="pt-5 pb-10 text-base sm:text-lg border-b border-b-black">"{produk.long_desc}"</div>
            </div>

            {/* Related Products Section */}
            <div 
                ref={setSectionRef('relatedProducts')}
                id="relatedProducts"
                className={`px-4 sm:px-8 lg:px-10 pt-10 lg:pt-15 flex flex-col justify-center transition-all duration-1000 ${
                    visibleSections.relatedProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <p className="text-3xl sm:text-4xl lg:text-6xl mb-6 lg:mb-8 font-bold text-center underline decoration-2 lg:decoration-3 underline-offset-4 lg:underline-offset-6">PRODUK SEMACAMNYA</p>
                
                {relatedProducts && relatedProducts.length > 0 ? (
                    <>
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                                {relatedProducts.map((produk, index) => (   
                                    <div 
                                        key={produk.id} 
                                        className={`w-full max-w-sm border-2 border-black rounded-2xl p-4 bg-white hover:shadow-xl hover:border-[#579D3E] transition-all duration-300 cursor-pointer group hover:scale-105 ${
                                            visibleSections.relatedProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
                        </div>
                        <div className="flex justify-center mb-8 mt-6 lg:mt-12">
                            <Link 
                                href="/products" 
                                className={`text-sm sm:text-base lg:text-xl font-bold border border-black px-6 sm:px-12 lg:px-20 py-2 lg:py-6 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 ${
                                    visibleSections.relatedProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                                }`}
                                style={{ transitionDelay: '600ms' }}
                            >
                                View All
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className={`text-center py-8 lg:py-12 transition-all duration-1000 ${
                        visibleSections.relatedProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                        <div className="text-4xl sm:text-5xl lg:text-6xl mb-4">📦</div>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700 mb-2">Belum Ada Produk Terkait</h3>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-500 mb-4 px-4">
                            Saat ini belum ada produk serupa yang tersedia
                        </p>
                        <Link 
                            href="/products" 
                            className="inline-block text-sm sm:text-base lg:text-xl font-bold border border-black px-6 sm:px-8 lg:px-12 py-2 lg:py-3 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                        >
                            Lihat Semua Produk
                        </Link>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}