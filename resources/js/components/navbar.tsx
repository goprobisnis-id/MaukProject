
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [active, setActive] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const path = window.location.pathname;
            if (path === '/' || path === route('home')) {
                setActive('home');
            } else if (path.includes('katalog')) {
                setActive('katalog');
            } else if (path.includes('event')) {
                setActive('event');
            } else if (path.includes('products')) {
                setActive('katalog');
            } else if (path.includes('kategori')) {
                setActive('katalog');
            }
        }
    }, []);

    const handleHome = () => {
        setActive('home');
        setIsMenuOpen(false);
        router.visit(route('home'));
    };
    const handleCatalog = () => {
        setActive('katalog');
        setIsMenuOpen(false);
        router.visit(route('katalog'));
    };
    const handleEvent = () => {
        setActive('event');
        setIsMenuOpen(false);
        router.visit(route('event'));
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white shadow-xl sticky top-0 z-50">
            <div className="flex justify-between items-center px-4 sm:px-8 lg:px-24 h-16 sm:h-20 lg:h-24">
                {/* Logo */}
                <img src="/logo_mauk.png" alt="Logo Mauk" className="h-10 sm:h-12 lg:h-16"/>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-2 lg:space-x-4 mr-0 lg:mr-16">
                    <Button
                        variant="ghost"
                        onClick={handleHome}
                        className={`text-sm px-3 lg:px-4 py-4 lg:py-6 hover:bg-[#579D3E] hover:text-white transition-colors ${active === 'home' ? 'bg-[#579D3E] text-white shadow-xl' : ''}`}
                    >
                        Beranda
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={handleCatalog}
                        className={`text-sm px-3 lg:px-4 py-4 lg:py-6 hover:bg-[#579D3E] hover:text-white transition-colors ${active === 'katalog' ? 'bg-[#579D3E] text-white shadow-xl' : ''}`}
                    >
                        Katalog
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={handleEvent}
                        className={`text-sm px-3 lg:px-4 py-4 lg:py-6 hover:bg-[#579D3E] hover:text-white transition-colors ${active === 'event' ? 'bg-[#579D3E] text-white shadow-xl' : ''}`}
                    >
                        Event
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t shadow-lg">
                    <div className="px-4 py-2 space-y-1">
                        <Button
                            variant="ghost"
                            onClick={handleHome}
                            className={`w-full text-left justify-start text-sm px-4 py-3 hover:bg-[#579D3E] hover:text-white transition-colors ${active === 'home' ? 'bg-[#579D3E] text-white shadow-xl' : ''}`}
                        >
                            Beranda
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={handleCatalog}
                            className={`w-full text-left justify-start text-sm px-4 py-3 hover:bg-[#579D3E] hover:text-white transition-colors ${active === 'katalog' ? 'bg-[#579D3E] text-white shadow-xl' : ''}`}
                        >
                            Katalog
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={handleEvent}
                            className={`w-full text-left justify-start text-sm px-4 py-3 hover:bg-[#579D3E] hover:text-white transition-colors ${active === 'event' ? 'bg-[#579D3E] text-white shadow-xl' : ''}`}
                        >
                            Event
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
}