import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

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
        router.visit(route('events.index'));
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between px-4 sm:h-20 sm:px-8 lg:h-24 lg:px-24">
                {/* Logo */}
                <img src="/logo_mauk.png" alt="Logo Mauk" className="h-10 sm:h-12 lg:h-16" />

                {/* Desktop Menu */}
                <div className="mr-0 hidden space-x-2 md:flex lg:mr-16 lg:space-x-4">
                    <Button
                        variant="ghost"
                        onClick={handleHome}
                        className={`px-3 py-4 text-sm transition-colors hover:bg-[#579D3E] hover:text-white lg:px-4 lg:py-6 ${active === 'home' ? 'bg-[#579D3E] text-white shadow-xl' : ''}`}
                    >
                        Beranda
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={handleCatalog}
                        className={`px-3 py-4 text-sm transition-colors hover:bg-[#579D3E] hover:text-white lg:px-4 lg:py-6 ${active === 'katalog' ? 'bg-[#579D3E] text-white shadow-xl' : ''}`}
                    >
                        Katalog
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={handleEvent}
                        className={`px-3 py-4 text-sm transition-colors hover:bg-[#579D3E] hover:text-white lg:px-4 lg:py-6 ${active === 'event' ? 'bg-[#579D3E] text-white shadow-xl' : ''}`}
                    >
                        Event
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} className="rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden" aria-label="Toggle menu">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="border-t bg-white shadow-lg md:hidden">
                    <div className="space-y-1 px-4 py-2">
                        <Button
                            variant="ghost"
                            onClick={handleHome}
                            className={`w-full justify-start px-4 py-3 text-left text-sm transition-colors hover:bg-[#579D3E] hover:text-white ${active === 'home' ? 'bg-[#579D3E] text-white shadow-xl' : ''}`}
                        >
                            Beranda
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={handleCatalog}
                            className={`w-full justify-start px-4 py-3 text-left text-sm transition-colors hover:bg-[#579D3E] hover:text-white ${active === 'katalog' ? 'bg-[#579D3E] text-white shadow-xl' : ''}`}
                        >
                            Katalog
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={handleEvent}
                            className={`w-full justify-start px-4 py-3 text-left text-sm transition-colors hover:bg-[#579D3E] hover:text-white ${active === 'event' ? 'bg-[#579D3E] text-white shadow-xl' : ''}`}
                        >
                            Event
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
}
