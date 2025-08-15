
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
            } else if (path.includes('katalog')) {
                setActive('katalog');
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
        setActive('katalog');
        router.visit(route('katalog'));
    };
    const handleEvent = () => {
        setActive('event');
        router.visit(route('event'));
    };

    return (
        <nav className="bg-white shadow-xl">
            <div className="flex justify-between items-center px-24 h-24">
                <img src="/logo_mauk.png" alt="Logo Mauk" className="h-16"/>
                <div className="flex space-x-4 mr-16">
                    <Button
                        variant="ghost"
                        onClick={handleHome}
                        className={`text-sm px-4 py-6 hover:bg-[#579D3E] ${active === 'home' ? 'bg-[#579D3E] text-black shadow-xl' : ''}`}
                    >
                        Beranda
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={handleCatalog}
                        className={`text-sm px-4 py-6 hover:bg-[#579D3E] ${active === 'katalog' ? 'bg-[#579D3E] text-black shadow-xl' : ''}`}
                    >
                        Katalog
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={handleEvent}
                        className={`text-sm px-4 py-6 hover:bg-[#579D3E] ${active === 'event' ? 'bg-[#579D3E] text-black shadow-xl' : ''}`}
                    >
                        Event
                    </Button>
                </div>
            </div>
        </nav>
    );
}