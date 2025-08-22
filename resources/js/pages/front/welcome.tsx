import Navbar from "@/components/navbar";
import Slidder from "@/components/slider";
import ProdukGrid from "@/components/produk-grid";
import EventGrid from "@/components/event-grid";
import Footer from "@/components/footer";
import { useEffect, useRef, useState } from "react";

export default function Welcome() {
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
        <div className="flex flex-col gap-y-4 min-h-screen bg-white">
            <Navbar/>
            <Slidder/>
            
            {/* About Section */}
            <div 
                ref={setSectionRef('aboutSection')}
                id="aboutSection"
                className={`flex flex-col justify-center items-center w-full px-4 sm:px-8 lg:px-50 py-8 lg:py-10 mt-8 lg:mt-28 gap-4 lg:gap-6 mx-auto transition-all duration-1000 ${
                    visibleSections.aboutSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <img 
                    src="/logo_mauk.png" 
                    alt="logo mauk" 
                    className={`mx-auto w-24 sm:w-32 lg:w-40 transition-all duration-1000 ${
                        visibleSections.aboutSection ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}
                />
                <p 
                    className={`text-center text-sm sm:text-base lg:text-lg italic max-w-4xl transition-all duration-1000 ${
                        visibleSections.aboutSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}
                    style={{ transitionDelay: '200ms' }}
                >
                    Tujuan <strong>Kreasi Limbah Mauk</strong> adalah untuk menjadi wajah utama dalam memasarkan produk-produk kreatif yang berasal dari limbah, khususnya yang dihasilkan oleh masyarakat Desa Mauk.
                </p>
                <p 
                    className={`text-center text-sm sm:text-base lg:text-lg italic max-w-4xl transition-all duration-1000 ${
                        visibleSections.aboutSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}
                    style={{ transitionDelay: '400ms' }}
                >
                    Inisiatif ini bertujuan untuk mendorong semangat kewirausahaan (entrepreneurship) di kalangan warga desa, sekaligus menjadi sarana promosi dan dokumentasi atas seluruh kegiatan pengolahan limbah menjadi kreasi yang bernilai guna dan ekonomis.
                </p>
                <p 
                    className={`text-center text-sm sm:text-base lg:text-lg italic max-w-4xl transition-all duration-1000 ${
                        visibleSections.aboutSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}
                    style={{ transitionDelay: '600ms' }}
                >
                    Dengan begitu, Kreasi Limbah Mauk tidak hanya berfokus pada aspek lingkungan, tetapi juga menjadi wadah pemberdayaan ekonomi dan pengembangan potensi lokal desa.
                </p>
            </div>
            
            {/* E-Commerce Section */}
            <div 
                ref={setSectionRef('ecommerceSection')}
                id="ecommerceSection"
                className={`mt-8 lg:mt-20 px-4 sm:px-8 transition-all duration-1000 ${
                    visibleSections.ecommerceSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
                                visibleSections.ecommerceSection ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                            }`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        />
                    ))}
                </div>
                <p className="text-center text-xs sm:text-sm lg:text-md mt-4">*logo diatas hanya ilustrasi saja</p>
            </div>
            
            {/* Product and Event Grids */}
            <div 
                ref={setSectionRef('contentSection')}
                id="contentSection"
                className={`mt-8 lg:mt-12 transition-all duration-1000 ${
                    visibleSections.contentSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <ProdukGrid/>
                <EventGrid/>
                <Footer/>
            </div>
        </div>
    );
}   