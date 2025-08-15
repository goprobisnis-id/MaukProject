import react from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function Katalog() {
    return (
        <div className='min-h-screen'>
            <Navbar/>
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
            <Footer/>
        </div>
    );
}
