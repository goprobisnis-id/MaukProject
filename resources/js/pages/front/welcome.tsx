import Navbar from "@/components/navbar";
import Slidder from "@/components/slider";
import ProdukGrid from "@/components/produk-grid";
import EventGrid from "@/components/event-grid";
import Footer from "@/components/footer";

export default function Welcome() {
    return (
        <div className="flex flex-col gap-y-4 min-h-screen bg-white">
            <Navbar/>
            <Slidder/>
            
            {/* About Section */}
            <div className="flex flex-col justify-center items-center w-full px-4 sm:px-8 lg:px-50 py-8 lg:py-10 mt-8 lg:mt-28 gap-4 lg:gap-6 mx-auto">
                <img src="/logo_mauk.png" alt="logo mauk" className="mx-auto w-24 sm:w-32 lg:w-40" />
                <p className="text-center text-sm sm:text-base lg:text-lg italic max-w-4xl">
                    Tujuan <strong>Kreasi Limbah Mauk</strong> adalah untuk menjadi wajah utama dalam memasarkan produk-produk kreatif yang berasal dari limbah, khususnya yang dihasilkan oleh masyarakat Desa Mauk.
                </p>
                <p className="text-center text-sm sm:text-base lg:text-lg italic max-w-4xl">
                    Inisiatif ini bertujuan untuk mendorong semangat kewirausahaan (entrepreneurship) di kalangan warga desa, sekaligus menjadi sarana promosi dan dokumentasi atas seluruh kegiatan pengolahan limbah menjadi kreasi yang bernilai guna dan ekonomis.
                </p>
                <p className="text-center text-sm sm:text-base lg:text-lg italic max-w-4xl">
                    Dengan begitu, Kreasi Limbah Mauk tidak hanya berfokus pada aspek lingkungan, tetapi juga menjadi wadah pemberdayaan ekonomi dan pengembangan potensi lokal desa.
                </p>
            </div>
            
            {/* E-Commerce Section */}
            <div className="mt-8 lg:mt-20 px-4 sm:px-8">
                <div className="text-center">
                    <span className="text-black font-bold text-2xl sm:text-3xl lg:text-4xl italic">Catalog </span>
                    <span className="text-[#579D3E] font-bold text-2xl sm:text-3xl lg:text-4xl italic">MAK-PIN</span>
                    <p className="text-center text-sm sm:text-base lg:text-lg mt-2">tersedia di beberapa e-commerce:</p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-20 mt-6 lg:mt-10">
                    {[...Array(8)].map((_, i) => (
                        <img
                            key={i}
                            src="/e-commerce.png"
                            alt={`e-commerce logo ${i+1}`}
                            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain"
                        />
                    ))}
                </div>
                <p className="text-center text-xs sm:text-sm lg:text-md mt-4">*logo diatas hanya ilustrasi saja</p>
            </div>
            
            {/* Product and Event Grids */}
            <div className="mt-8 lg:mt-12">
                <ProdukGrid/>
                <EventGrid/>
                <Footer/>
            </div>
        </div>
    );
}   