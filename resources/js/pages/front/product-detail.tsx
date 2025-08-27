import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Produk } from '@/types';
import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

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
            {/* <nav className="my-4 flex justify-center gap-4">
                <Link href="/" className="text-blue-600 hover:underline">
                    Home
                </Link>
                <Link href="/products" className="text-blue-600 hover:underline">
                    Produk
                </Link>
                <Link href="/kategori" className="text-blue-600 hover:underline">
                    Kategori
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
            </nav> */}
            {/* E Commerce yang tersedia */}
            <div className={`mt-5 px-4 transition-all duration-1000 sm:px-8 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="text-center">
                    <span className="text-2xl font-bold text-black italic sm:text-3xl lg:text-4xl">Catalog </span>
                    <span className="text-2xl font-bold text-[#579D3E] italic sm:text-3xl lg:text-4xl">MAK-PIN</span>
                    <p className="mt-2 text-center text-sm sm:text-base lg:text-lg">tersedia di beberapa e-commerce:</p>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:mt-10 lg:gap-12 xl:gap-20">
                    {[...Array(8)].map((_, i) => (
                        <img
                            key={i}
                            src="/e-commerce.png"
                            alt={`e-commerce logo ${i + 1}`}
                            className={`h-10 w-10 object-contain transition-all duration-500 hover:scale-110 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 ${
                                isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                            } delay-[${i * 100}ms]`}
                        />
                    ))}
                </div>
                <p className="lg:text-md mt-4 text-center text-xs sm:text-sm">*logo diatas hanya ilustrasi saja</p>
            </div>

            <div
                className={`mt-4 px-4 transition-all duration-1000 sm:px-8 lg:px-20 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
            >
                <Link href="/katalog">
                    <Button className="rounded-4xl border border-black bg-white p-6 text-xl text-black hover:bg-[#579D3E] hover:text-white">
                        Kembali
                    </Button>
                </Link>
            </div>

            {/* Produk Detail */}
            <div
                ref={setSectionRef('productDetail')}
                id="productDetail"
                className={`mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 transition-all duration-1000 sm:px-8 lg:flex-row lg:gap-8 lg:px-10 lg:py-12 ${
                    visibleSections.productDetail ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
            >
                {/* Thumbnail Images */}
                <div className="order-2 flex max-w-full gap-2 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
                    {produk.images
                        ? produk.images.map((image, index) => (
                              <div
                                  key={image.id}
                                  className={`flex-shrink-0 transition-all duration-500 ${
                                      visibleSections.productDetail ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                                  } delay-[${index * 150}ms]`}
                              >
                                  <img
                                      src={`/storage/${image.image}`}
                                      alt={image.image}
                                      className="h-24 w-20 rounded-lg border border-black object-cover p-1 sm:h-30 sm:w-24 lg:h-40 lg:w-32 lg:rounded-2xl"
                                  />
                              </div>
                          ))
                        : null}
                </div>

                {/* Main Image */}
                <div
                    className={`order-1 flex flex-1 justify-center transition-all duration-1000 lg:order-2 ${
                        visibleSections.productDetail ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                    }`}
                >
                    <img
                        src={`/storage/${produk.first_image}`}
                        alt={produk.nama_produk}
                        className="aspect-square h-auto w-full max-w-sm rounded-2xl border border-black object-cover p-2 sm:max-w-md lg:max-w-lg lg:rounded-3xl"
                    />
                </div>

                {/* Product Info */}
                <div
                    className={`order-3 w-full py-4 transition-all duration-1000 lg:max-w-md lg:flex-1 lg:px-6 lg:py-8 ${
                        visibleSections.productDetail ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                    }`}
                >
                    <h1 className="mb-2 text-xl leading-tight font-bold sm:text-2xl lg:text-4xl">{produk.nama_produk}</h1>
                    <p className="mb-4 text-lg font-bold text-[#579D3E] sm:text-xl lg:text-2xl">{formatRupiah(produk.harga)}</p>
                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base lg:text-lg">{produk.short_desc}</p>
                </div>
            </div>

            <div
                ref={setSectionRef('ecommerce')}
                id="ecommerce"
                className={`mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 px-4 py-8 transition-all duration-1000 ${
                    visibleSections.ecommerce ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
            >
                <p className="text-center text-lg font-bold sm:text-xl lg:text-2xl">
                    PRODUK INI
                    <br />
                    TERSEDIA DI E-COMMERCE
                </p>
                <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row">
                    {/* Shopee Link */}
                    <a
                        href={produk.link_shopee ?? ''}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center justify-center rounded-lg border-2 border-[#EE4D2D] bg-white px-4 py-3 transition-all duration-300 hover:scale-105 ${
                            visibleSections.ecommerce ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                        } delay-[200ms]`}
                    >
                        <img src="/shopee-logo.svg" alt="Shopee Logo" className="w-28 object-contain sm:w-32 lg:w-36" />
                    </a>

                    {/* Tokopedia Link */}
                    <a
                        href={produk.link_tokped ?? ''}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center justify-center rounded-lg border-2 border-[#42B549] bg-white px-4 py-3 transition-all duration-300 hover:scale-105 ${
                            visibleSections.ecommerce ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                        } delay-[400ms]`}
                    >
                        <img src="/tokopedia-logo.svg" alt="Tokopedia Logo" className="w-28 object-contain sm:w-32 lg:w-36" />
                    </a>
                </div>
            </div>

            {/* DESKRIPSI SECTION */}
            <div
                ref={setSectionRef('description')}
                id="description"
                className={`px-4 transition-all duration-1000 sm:px-8 lg:px-10 ${
                    visibleSections.description ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
            >
                <p className="border-t-4 border-b border-t-green-100 border-b-black pt-4 pb-1 text-xl sm:border-t-8 sm:text-2xl lg:border-t-10">
                    Deskripsi Produk
                </p>
                <div className="border-b border-b-black pt-5 pb-10 text-base sm:text-lg">"{produk.long_desc}"</div>
            </div>

            {/* Related Products Section */}
            <div
                ref={setSectionRef('relatedProducts')}
                id="relatedProducts"
                className={`flex flex-col justify-center px-4 pt-10 transition-all duration-1000 sm:px-8 lg:px-10 lg:pt-15 ${
                    visibleSections.relatedProducts ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
            >
                <p className="mb-6 text-center text-3xl font-bold underline decoration-2 underline-offset-4 sm:text-4xl lg:mb-8 lg:text-6xl lg:decoration-3 lg:underline-offset-6">
                    PRODUK SEMACAMNYA
                </p>

                {relatedProducts && relatedProducts.length > 0 ? (
                    <>
                        <div className="mx-auto max-w-7xl">
                            <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {relatedProducts.map((produk, index) => (
                                    <div
                                        key={produk.id}
                                        className={`group w-full max-w-sm cursor-pointer rounded-2xl border-2 border-black bg-white p-4 transition-all duration-300 hover:scale-105 hover:border-[#579D3E] hover:shadow-xl ${
                                            visibleSections.relatedProducts ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                        } delay-[${index * 200}ms]`}
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
                        </div>
                        <div className="mt-6 mb-8 flex justify-center lg:mt-12">
                            <Link
                                href="/products"
                                className={`rounded-full border border-black px-6 py-2 text-sm font-bold transition-all duration-300 hover:scale-105 hover:bg-gray-100 sm:px-12 sm:text-base lg:px-20 lg:py-6 lg:text-xl ${
                                    visibleSections.relatedProducts ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                                } delay-[600ms]`}
                            >
                                View All
                            </Link>
                        </div>
                    </>
                ) : (
                    <div
                        className={`py-8 text-center transition-all duration-1000 lg:py-12 ${
                            visibleSections.relatedProducts ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}
                    >
                        <div className="mb-4 text-4xl sm:text-5xl lg:text-6xl">📦</div>
                        <h3 className="mb-2 text-xl font-bold text-gray-700 sm:text-2xl lg:text-3xl">Belum Ada Produk Terkait</h3>
                        <p className="mb-4 px-4 text-sm text-gray-500 sm:text-base lg:text-lg">Saat ini belum ada produk serupa yang tersedia</p>
                        <Link
                            href="/products"
                            className="inline-block rounded-full border border-black px-6 py-2 text-sm font-bold transition-all duration-300 hover:scale-105 hover:bg-gray-100 sm:px-8 sm:text-base lg:px-12 lg:py-3 lg:text-xl"
                        >
                            Lihat Semua Produk
                        </Link>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
