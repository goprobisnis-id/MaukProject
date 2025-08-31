import EventGrid from '@/components/event-grid';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import ProdukGrid from '@/components/produk-grid';
import Slidder from '@/components/slider';
import { usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function Welcome() {
    // Ambil events dari props Inertia
    const { props } = usePage();
    const events = props.events || [];
    // Restore animation state and section refs
    const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
        Object.values(sectionRefs.current).forEach((ref) => {
            if (ref) observer.observe(ref);
        });
        return () => observer.disconnect();
    }, []);

    const setSectionRef = (id: string) => (el: HTMLDivElement | null) => {
        sectionRefs.current[id] = el;
    };
    return (
        <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-[#ffffff] via-[#ffffff] to-[#f9fffa]">
            <Navbar />
            <Slidder />
            {/* About Section */}
            <div
                ref={setSectionRef('aboutSection')}
                id="aboutSection"
                className={`mt-8 sm:mt-12 lg:mt-16 flex w-full flex-col items-center justify-center gap-4 px-4 py-8 transition-all duration-1000 sm:px-8 lg:gap-6 lg:px-16 lg:py-12 ${
                    visibleSections.aboutSection ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
            >
                <img
                    src="/logo_mauk.png"
                    alt="logo mauk"
                    className={`mx-auto w-24 transition-all duration-1000 sm:w-32 lg:w-40 ${
                        visibleSections.aboutSection ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                    }`}
                />
                <p
                    className={`max-w-4xl text-center text-sm italic transition-all delay-[200ms] duration-1000 sm:text-base lg:text-lg ${
                        visibleSections.aboutSection ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                    }`}
                >
                    Tujuan <strong>Kreasi Limbah Mauk</strong> adalah untuk menjadi wajah utama dalam memasarkan produk-produk kreatif yang berasal
                    dari limbah, khususnya yang dihasilkan oleh masyarakat Desa Mauk.
                </p>
                <p
                    className={`max-w-4xl text-center text-sm italic transition-all delay-[400ms] duration-1000 sm:text-base lg:text-lg ${
                        visibleSections.aboutSection ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                    }`}
                >
                    Inisiatif ini bertujuan untuk mendorong semangat kewirausahaan (entrepreneurship) di kalangan warga desa, sekaligus menjadi sarana
                    promosi dan dokumentasi atas seluruh kegiatan pengolahan limbah menjadi kreasi yang bernilai guna dan ekonomis.
                </p>
                <p
                    className={`max-w-4xl text-center text-sm italic transition-all delay-[600ms] duration-1000 sm:text-base lg:text-lg ${
                        visibleSections.aboutSection ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                    }`}
                >
                    Dengan begitu, Kreasi Limbah Mauk tidak hanya berfokus pada aspek lingkungan, tetapi juga menjadi wadah pemberdayaan ekonomi dan
                    pengembangan potensi lokal desa.
                </p>
            </div>
            {/* E-Commerce Section */}
            <div
                ref={setSectionRef('ecommerceSection')}
                id="ecommerceSection"
                className={`mt-8 px-4 transition-all duration-1000 sm:px-8 lg:mt-16 ${
                    visibleSections.ecommerceSection ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
            >
                <div className="text-center mb-8 sm:mb-12">
                    <span className="text-2xl font-bold text-black italic sm:text-3xl lg:text-4xl">Catalog </span>
                    <span className="text-2xl font-bold text-[#579D3E] italic sm:text-3xl lg:text-4xl">MAK-PIN</span>
                    <p className="mt-2 text-center text-sm sm:text-base lg:text-lg">tersedia di beberapa e-commerce:</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-12 xl:gap-20">
                    {[
                        { src: '/images/shopee-logo.png', alt: 'Shopee' },
                        { src: '/images/tokopedia-logo.png', alt: 'Tokopedia' },
                        { src: '/images/bukalapak-logo.png', alt: 'Bukalapak' },
                    ].map((logo, i) => (
                        <img
                            key={logo.alt}
                            src={logo.src}
                            alt={logo.alt}
                            className={`h-10 sm:h-12 lg:h-14 w-auto object-contain transition-all duration-500 hover:scale-105 ${
                                visibleSections.ecommerceSection ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                            }`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        />
                    ))}
                </div>
            </div>
            {/* Product and Event Grids */}
            <div
                ref={setSectionRef('contentSection')}
                id="contentSection"
                className={`mt-8 transition-all duration-1000 lg:mt-12 ${
                    visibleSections.contentSection ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
            >
                {/* ProdukGrid fallback */}
                <div className="mb-8">
                    <ProdukGrid />
                </div>
                {/* EventGrid fallback */}
                <div className="mb-8">
                    <EventGrid events={Array.isArray(events) ? events : []} />
                </div>
                <Footer />
            </div>
        </div>
    );
}
