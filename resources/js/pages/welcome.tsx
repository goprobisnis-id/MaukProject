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
            <div className="flex flex-col justify-center items-center w-full px-50 py-10 mt-28 gap-6 mx-auto">
                <img src="/logo_mauk.png" alt="logo mauk" className="mx-auto w-40" />
                <p className="text-center text-lg italic">
                    Tujuan <strong>Kreasi Limbah Mauk</strong> adalah untuk menjadi wajah utama dalam memasarkan produk-produk kreatif yang berasal dari limbah, khususnya yang dihasilkan oleh masyarakat Desa Mauk.
                </p>
                <p className="text-center text-lg italic">
                    Inisiatif ini bertujuan untuk mendorong semangat kewirausahaan (entrepreneurship) di kalangan warga desa, sekaligus menjadi sarana promosi dan dokumentasi atas seluruh kegiatan pengolahan limbah menjadi kreasi yang bernilai guna dan ekonomis.
                </p>
                <p className="text-center text-lg italic">
                    Dengan begitu, Kreasi Limbah Mauk tidak hanya berfokus pada aspek lingkungan, tetapi juga menjadi wadah pemberdayaan ekonomi dan pengembangan potensi lokal desa.
                </p>
            </div>
            <div className="mt-20">
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
            <div>
            <ProdukGrid/>
            <EventGrid/>
            <Footer/>
            </div>
            
        </div>
    );
}   