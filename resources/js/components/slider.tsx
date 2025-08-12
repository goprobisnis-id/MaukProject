import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide} from 'swiper/react';

const slides = [
    {
        image: 'slide1.jpg',
        icon: 'icon icon-Settings',
        heading: '',
        title: '',
        highlight: '',
        description:
            '',
    },
    {
        image: 'slide2.png',
        heading: 'Desa Mauk',
        title: 'Kembangkan',
        highlight: 'Usaha Desa!',
        description:
            'Jelajahi peluang bisnis berbasis pertanian, UMKM desa, dan produk lokal. Investasi cerdas yang mendukung ekonomi pedesaan dan pembangunan berkelanjutan.',
        actions: [{ label: 'Mulai Investasi!', href: '/wirausaha', type: 'white'}]
    },
    {
        image: 'slide2.png',
        heading: 'Desa Mauk',
        title: 'Wujudkan Mimpi',
        highlight: 'Petani & UMKM!',
        description:
            'Hubungkan usaha kecil pedesaan dengan investor yang peduli pembangunan desa. Bersama memajukan ekonomi rakyat melalui kolaborasi yang menguntungkan semua pihak.',
        actions: [{ label: 'Cari Investor!', href: '/investors', type: 'white'}]
    }
]

export default function Slidder() {
    return (
        <div className="relative w-full">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                navigation
                pagination={{ clickable: true }}
                loop
                className="w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative flex h-[60vh] items-center justify-center text-white sm:h-[70vh] md:h-[80vh]">
                            <img src={slide.image} alt="Background" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                            <div className="container mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                                <div className="space-y-4">
                                    {slide.icon && (
                                        <div className="text-3xl sm:text-4xl">
                                            <i className={slide.icon}></i>
                                        </div>
                                    )}
                                    <div className="text-base font-semibold tracking-wide uppercase sm:text-lg">{slide.heading}</div>
                                    <div className="text-2xl font-bold sm:text-3xl text-green-600 md:text-5xl">
                                        {slide.title} {slide.highlight && <span className="text-green-400">{slide.highlight}</span>}
                                    </div> 
                                    <div className="pl-6 pr-6 text-2xl font-bold text-emerald-600 sm:text-base md:text-xl">{slide.description}</div>
                                    {slide.actions && (
                                        <div className="mt-6 flex flex-wrap justify-center gap-4">
                                            {slide.actions.map((action, idx) => (
                                                <a
                                                    key={idx}
                                                    href={action.href}
                                                    className={`rounded-md px-4 py-2 font-medium transition sm:px-6 sm:py-3 ${
                                                        action.type === 'white'
                                                            ? 'bg-white text-black hover:bg-gray-200'
                                                            : 'bg-green-500 text-white hover:bg-green-600'
                                                    }`}
                                                >
                                                    {action.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}