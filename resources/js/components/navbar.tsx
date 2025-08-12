
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [active, setActive] = useState('home');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const path = window.location.pathname;
            if (path === '/' || path === route('home')) {
                setActive('home');
            } else if (path.includes('catalog')) {
                setActive('catalog');
            } else if (path.includes('event')) {
                setActive('event');
            }
        }
    }, []);

    const handleHome = () => {
        setActive('home');
        router.visit(route('home'));
    };
    const handleCatalog = () => {
        setActive('catalog');
        router.visit(route('catalog'));
    };
    const handleEvent = () => {
        setActive('event');
        router.visit(route('event'));
    };

    return (
        <nav className="bg-white shadow-xl">
            <div className="flex justify-between items-center px-36 h-30">
                <img src="/logo_mauk.png" alt="Logo Mauk" className="h-16"/>
                <div className="flex space-x-4 mr-16">
                    <Button
                        variant="ghost"
                        onClick={handleHome}
                        className={`text-lg p-7 hover:bg-[#579D3E] ${active === 'home' ? 'bg-[#579D3E] text-black' : ''}`}
                    >
                        Beranda
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={handleCatalog}
                        className={`text-lg p-7 hover:bg-[#579D3E] ${active === 'catalog' ? 'bg-[#579D3E] text-black' : ''}`}
                    >
                        Katalog
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={handleEvent}
                        className={`text-lg p-7 hover:bg-[#579D3E] ${active === 'event' ? 'bg-[#579D3E] text-black' : ''}`}
                    >
                        Event
                    </Button>
                </div>
            </div>
        </nav>
    );
}