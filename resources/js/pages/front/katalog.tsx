import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Kategori, Produk } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

interface KatalogProps {
    kategoris: Kategori[];
    newestProducts: Produk[];
    terlarisProducts: Produk[];
    [key: string]: unknown; // Index signature untuk kompatibilitas dengan PageProps
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
                        setVisibleSections((prev) => ({
                            ...prev,
                            [entry.target.id]: true,
                        }));
                    }
                });
            },
            { threshold: 0.1 },
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
            {/* E-Commerce yang tersedia */}
            <div className={`mt-5 px-4 transition-all duration-1000 sm:px-8 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="text-center">
                    <span className="text-2xl font-bold text-black italic sm:text-3xl lg:text-4xl">Catalog </span>
                    <span className="text-2xl font-bold text-[#579D3E] italic sm:text-3xl lg:text-4xl">MAK-PIN</span>
                    <p className="mt-2 text-center text-sm sm:text-base lg:text-lg">tersedia di beberapa e-commerce:</p>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:mt-10 lg:gap-12 xl:gap-20">
                    <img
                        src="/images/shopee-logo.png"
                        alt="Shopee"
                        className="-mt-20 -mb-10 h-42 w-42 object-contain transition-all duration-500 hover:scale-110"
                    />
                    <img
                        src="/images/tokopedia-logo.png"
                        alt="Tokopedia"
                        className="-mt-20 -mb-10 h-42 w-42 object-contain transition-all duration-500 hover:scale-110"
                    />
                    <img
                        src="/images/bukalapak-logo.png"
                        alt="Bukalapak"
                        className="-mt-20 -mb-10 h-42 w-42 object-contain transition-all duration-500 hover:scale-110"
                    />
                </div>
            </div>
            {/* Search Bar */}
            <div
                className={`d-flex items-center justify-center gap-4 bg-gray-300 px-4 py-3 transition-all duration-1000 sm:flex-row sm:justify-start sm:gap-8 sm:px-8 sm:py-5 lg:gap-25 lg:px-25 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
            >
                <div className="flex w-full items-center justify-around">
                    <p className="text-lg sm:text-xl">On Sale</p>
                    <p className="text-lg sm:text-xl">New Arrivals</p>
                    <div className="relative w-full sm:w-64 lg:w-150">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full rounded-full bg-white px-4 py-2 pr-10 text-sm outline-2 outline-black transition-all duration-300 focus:ring-2 focus:ring-[#579D3E]"
                        />
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-5 w-5 text-gray-400"
                            >
                                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            {/* Jenis Jenis Katalog */}
            <div
                ref={setSectionRef('kategoriSection')}
                id="kategoriSection"
                className={`mx-4 mt-6 mb-6 rounded-2xl bg-gray-200 px-4 py-6 transition-all duration-1000 sm:mx-8 sm:px-6 lg:mx-15 lg:mt-10 lg:mb-10 lg:rounded-4xl lg:px-10 lg:py-10 ${visibleSections.kategoriSection ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
                <div className="mx-auto max-w-6xl">
                    <h1 className="text-center text-3xl font-black text-black sm:text-4xl lg:mb-12 lg:text-6xl">JENIS KATALOG TERSEDIA</h1>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {(() => {
                            const bgColors = [
                                'bg-green-100',
                                'bg-blue-100',
                                'bg-red-100',
                                'bg-purple-100',
                                'bg-pink-100',
                                'bg-lime-100',
                                'bg-cyan-100',
                                'bg-orange-100',
                            ];
                            return kategoris.map((kategori, index) => (
                                <Link
                                    key={kategori.id}
                                    href={`/kategori/${kategori.id}`}
                                    className={`group flex h-158 cursor-pointer flex-row items-center rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl sm:h-64 lg:h-72 ${bgColors[index % bgColors.length]} ${visibleSections.kategoriSection ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} delay-[${index * 150}ms]`}
                                >
                                    <div className="flex flex-1 flex-col justify-center p-3">
                                        <p className="text-xs text-gray-600 sm:text-sm lg:mb-2">Kategori</p>
                                        <h3 className="-mt-3 text-3xl font-bold text-black transition-colors group-hover:text-[#579D3E] lg:text-3xl">
                                            {kategori.nama}
                                        </h3>
                                        <p className="mt-1 text-xs text-[#579D3E] opacity-0 transition-opacity group-hover:opacity-100 sm:text-sm lg:mt-2">
                                            Klik untuk melihat produk →
                                        </p>
                                    </div>
                                    <div className="flex h-full flex-1 items-center justify-center">
                                        <img
                                            src={`/storage/${kategori.thumbnail}`}
                                            alt={`${kategori.nama}`}
                                            className="mx-auto h-100 w-80 rounded-2xl object-cover transition-transform duration-300 group-hover:scale-95 sm:h-48 sm:w-48 lg:h-56 lg:w-56"
                                        />
                                    </div>
                                </Link>
                            ));
                        })()}
                    </div>
                </div>
            </div>
            {/* Produk Terbaru */}
            <div
                ref={setSectionRef('newestProducts')}
                id="newestProducts"
                className={`border-t border-b border-gray-300 px-4 py-8 transition-all duration-1000 sm:px-6 lg:px-8 lg:py-12 ${visibleSections.newestProducts ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
                <div className="mx-auto max-w-7xl">
                    <h1 className="mb-8 text-center text-3xl font-bold underline decoration-2 underline-offset-4 sm:text-4xl lg:mb-12 lg:text-6xl lg:decoration-3 lg:underline-offset-6">
                        PRODUK TERBARU
                    </h1>
                    <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {newestProducts.map((produk, index) => (
                            <div
                                key={produk.id}
                                className={`group w-full max-w-sm cursor-pointer rounded-2xl border-2 border-black bg-white p-4 transition-all duration-300 hover:scale-105 hover:border-[#579D3E] hover:shadow-xl ${visibleSections.newestProducts ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} delay-[${index * 200}ms]`}
                                onClick={() => (window.location.href = `/products/${produk.id}`)}
                            >
                                <div className="mb-4 aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
                                    <img
                                        src={`/storage/${produk.first_image}`}
                                        alt={produk.nama_produk}
                                        className="h-full w-full object-cover p-4 transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="space-y-2 text-center">
                                    <h2 className="line-clamp-2 font-acme text-lg font-bold sm:text-xl lg:text-2xl">{produk.nama_produk}</h2>
                                    <p className="text-lg font-bold text-black sm:text-xl lg:text-2xl">Rp {produk.harga.toLocaleString()}</p>
                                    <p className="text-xs text-[#579D3E] transition-colors sm:text-sm">Klik untuk melihat detail produk</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-center lg:mt-12">
                        <Link
                            href="/products"
                            className="rounded-full border border-black px-8 py-3 text-base font-bold transition-colors hover:bg-gray-100 sm:px-12 sm:text-lg lg:rounded-full lg:px-20 lg:py-6 lg:text-xl"
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
                className={`border-t border-b border-gray-300 px-4 py-8 transition-all duration-1000 sm:px-6 lg:px-8 lg:py-12 ${visibleSections.terlarisProducts ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
                <div className="mx-auto max-w-7xl">
                    <h1 className="mb-8 text-center text-3xl font-bold underline decoration-2 underline-offset-4 sm:text-4xl lg:mb-12 lg:text-6xl lg:decoration-3 lg:underline-offset-6">
                        PRODUK TERLARIS
                    </h1>
                    <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {terlarisProducts.map((produk, index) => (
                            <div
                                key={produk.id}
                                className={`group w-full max-w-sm cursor-pointer rounded-2xl border-2 border-black bg-white p-4 transition-all duration-300 hover:scale-105 hover:border-[#579D3E] hover:shadow-xl ${visibleSections.terlarisProducts ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} delay-[${index * 200}ms]`}
                                onClick={() => (window.location.href = `/products/${produk.id}`)}
                            >
                                <div className="mb-4 aspect-square w-full overflow-hidden rounded-2xl bg-gray-100">
                                    <img
                                        src={`/storage/${produk.first_image}`}
                                        alt={produk.nama_produk}
                                        className="h-full w-full object-cover p-4 transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="space-y-2 text-center">
                                    <h2 className="line-clamp-2 font-acme text-lg font-bold sm:text-xl lg:text-2xl">{produk.nama_produk}</h2>
                                    <p className="text-lg font-bold text-black sm:text-xl lg:text-2xl">Rp {produk.harga.toLocaleString()}</p>
                                    <p className="text-xs text-[#579D3E] transition-colors sm:text-sm">Klik untuk melihat detail produk</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-center lg:mt-12">
                        <Link
                            href="/products"
                            className="rounded-full border border-black px-8 py-3 text-base font-bold transition-colors hover:bg-gray-100 sm:px-12 sm:text-lg lg:px-20 lg:py-6 lg:text-xl"
                        >
                            View All
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
