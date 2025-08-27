import { Button } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { Bell, Home, LogOut, Package, Settings, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NavbarAdmin() {
    const handleLogout = () => router.post(route('logout'));
    const [activeTab, setActiveTab] = useState('');

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: Home },
        { id: 'categories', label: 'Kategori', href: '/admin/kategori', icon: Settings },
        { id: 'products', label: 'Produk', href: '/admin/produk', icon: Package },
        { id: 'events', label: 'Event', href: '/admin/event', icon: Bell },
    ];

    // Function to determine active tab based on current URL
    const getActiveTabFromURL = () => {
        if (typeof window !== 'undefined') {
            const currentPath = window.location.pathname;

            if (currentPath === '/dashboard') {
                return 'dashboard';
            } else if (currentPath === '/admin/kategori') {
                return 'categories';
            } else if (currentPath === '/admin/produk') {
                return 'products';
            } else if (currentPath === '/admin/event') {
                return 'events';
            }
            // Fallback: check if path contains any of our routes
            if (currentPath.includes('/dashboard')) {
                return 'dashboard';
            } else if (currentPath.includes('/kategori')) {
                return 'categories';
            } else if (currentPath.includes('/produk')) {
                return 'products';
            } else if (currentPath.includes('/event')) {
                return 'events';
            }
        }

        return 'dashboard'; // default fallback
    };

    // Set active tab based on current URL when component mounts
    useEffect(() => {
        setActiveTab(getActiveTabFromURL());
    }, []);

    // Handle navigation click
    const handleNavClick = (itemId: string) => {
        setActiveTab(itemId);
    };

    return (
        <nav className="sticky top-0 z-50 border-b-2 border-[#579D3E] bg-white shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between sm:h-16">
                    {/* Logo/Brand Section */}
                    <div className="group flex items-center space-x-2 sm:space-x-3">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <img
                                src="/logo_mauk.png"
                                alt="MAK-PIN Logo"
                                className="h-8 w-8 rounded-full border-2 border-[#579D3E] transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10"
                            />
                            <div>
                                <h1 className="text-lg font-bold text-black sm:text-xl">
                                    Admin <span className="text-[#579D3E]">MAK-PIN</span>
                                </h1>
                                <p className="-mt-1 hidden text-xs text-gray-600 sm:block">Management Panel</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden items-center space-x-1 md:flex">
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`flex items-center space-x-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 sm:px-4 sm:text-base ${
                                        activeTab === item.id
                                            ? 'bg-[#579D3E] text-white shadow-lg'
                                            : 'hover:bg-opacity-10 text-gray-700 hover:bg-[#579D3E] hover:text-white'
                                    }`}
                                >
                                    <IconComponent className="h-4 w-4" />
                                    <span className="hidden lg:inline">{item.label}</span>
                                </a>
                            );
                        })}
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        {/* Notification Bell */}
                        <button className="hover:bg-opacity-10 relative rounded-xl p-1 text-gray-600 transition-colors duration-200 hover:bg-[#579D3E] hover:text-[#579D3E] sm:p-2">
                            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                            <div className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-red-500"></div>
                        </button>

                        {/* User Profile */}
                        <div className="hover:bg-opacity-10 flex items-center space-x-2 rounded-xl bg-gray-100 p-2 transition-colors duration-200 hover:bg-[#579D3E]">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#579D3E]">
                                <User className="h-4 w-4 text-white" />
                            </div>
                            <span className="hidden font-medium text-gray-700 sm:block">Admin</span>
                        </div>

                        {/* Logout Button */}
                        <Button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 rounded-xl bg-red-500 px-4 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-600"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:block">Keluar</span>
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="pb-3 md:hidden">
                    <div className="flex space-x-1 rounded-xl bg-gray-100 p-1">
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`flex flex-1 flex-col items-center rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300 ${
                                        activeTab === item.id
                                            ? 'bg-[#579D3E] text-white shadow-md'
                                            : 'hover:bg-opacity-10 text-gray-600 hover:bg-[#579D3E] hover:text-[#579D3E]'
                                    }`}
                                >
                                    <IconComponent className="mb-1 h-4 w-4" />
                                    {item.label}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}
