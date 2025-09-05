import { Button } from '@headlessui/react';
import { router, Link } from '@inertiajs/react';
import { Bell, Home, LogOut, Package, Settings, User, X, Check, CheckCheck, Trash, Users, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {usePage} from '@inertiajs/react';

interface Notification {
    id: number;
    type: string;
    title: string;
    message: string;
    icon: string;
    color: string;
    is_read: boolean;
    created_at: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface PageProps {
    auth: {
        user: User | null;
    };
    [key: string]: any;
}

export default function NavbarAdmin() {
    const { auth } = usePage<PageProps>().props;
    const handleLogout = () => router.post(route('logout'));
    const [activeTab, setActiveTab] = useState('');
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: Home },
        { id: 'categories', label: 'Kategori', href: '/admin/kategori', icon: Settings },
        { id: 'products', label: 'Produk', href: '/admin/produk', icon: Package },
        { id: 'events', label: 'Event', href: '/admin/events', icon: Bell },
    ];

    // Function to determine active tab based on current URL
    const getActiveTabFromURL = () => {
        if (typeof window !== 'undefined') {
            const currentPath = window.location.pathname;

            if (currentPath === '/dashboard') {
                return 'dashboard';
            } else if (currentPath === '/admin/kategori' || currentPath.includes('/kategori')) {
                return 'categories';
            } else if (currentPath === '/admin/produk' || currentPath.includes('/produk')) {
                return 'products';
            } else if (currentPath === '/admin/events' || currentPath.includes('/events')) {
                return 'events';
            } else if (currentPath === '/admin/users' || currentPath.includes('/users')) {
                return 'users';
            }
        }

        return 'dashboard'; // default fallback
    };

    // Fetch notifications
    const fetchNotifications = async () => {
        try {
            const response = await axios.get('/api/notifications');
            setNotifications(response.data.notifications);
            setUnreadCount(response.data.unread_count);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    // Mark notification as read
    const markAsRead = async (id: number) => {
        try {
            await axios.post(`/api/notifications/${id}/read`);
            setNotifications(prev => 
                prev.map(notif => 
                    notif.id === id ? { ...notif, is_read: true } : notif
                )
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    // Mark all as read
    const markAllAsRead = async () => {
        try {
            await axios.post('/api/notifications/read-all');
            setNotifications(prev => 
                prev.map(notif => ({ ...notif, is_read: true }))
            );
            setUnreadCount(0);
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    // Delete notification
    const deleteNotification = async (id: number) => {
        try {
            await axios.delete(`/api/notifications/${id}`);
            setNotifications(prev => prev.filter(notif => notif.id !== id));
            setUnreadCount(prev => {
                const notif = notifications.find(n => n.id === id);
                return notif && !notif.is_read ? Math.max(0, prev - 1) : prev;
            });
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    // Get icon component based on icon name
    const getIconComponent = (iconName: string) => {
        const iconMap: Record<string, any> = {
            'bell': Bell,
            'user-plus': User,
            'folder-plus': Package,
            'package-plus': Package,
            'calendar-plus': Bell,
            'edit': Settings,
            'trash': Trash,
        };
        return iconMap[iconName] || Bell;
    };

    // Get color classes based on color name
    const getColorClasses = (color: string) => {
        const colorMap: Record<string, string> = {
            'green': 'bg-green-100 text-green-800 border-green-200',
            'blue': 'bg-blue-100 text-blue-800 border-blue-200',
            'purple': 'bg-purple-100 text-purple-800 border-purple-200',
            'orange': 'bg-orange-100 text-orange-800 border-orange-200',
            'red': 'bg-red-100 text-red-800 border-red-200',
            'indigo': 'bg-indigo-100 text-indigo-800 border-indigo-200',
        };
        return colorMap[color] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    // Set active tab based on current URL when component mounts
    useEffect(() => {
        setActiveTab(getActiveTabFromURL());
        fetchNotifications();
        
        // Auto refresh notifications every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    // Handle navigation click
    const handleNavClick = (itemId: string) => {
        setActiveTab(itemId);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (!target.closest('.notification-dropdown')) {
                setShowNotifications(false);
            }
            if (!target.closest('.user-menu-dropdown')) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                                <Link
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
                                </Link>
                            );
                        })}
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        {/* Notification Bell */}
                        <div className="relative notification-dropdown">
                            <button 
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="hover:bg-opacity-10 relative rounded-xl p-1 text-gray-600 transition-colors duration-200 hover:bg-[#579D3E] hover:text-white sm:p-2"
                            >
                                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                                {unreadCount > 0 && (
                                    <div className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-xs text-white font-bold animate-pulse">
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </div>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden">
                                    {/* Header */}
                                    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-900">Notifikasi</h3>
                                        <div className="flex items-center space-x-2">
                                            {unreadCount > 0 && (
                                                <button
                                                    onClick={markAllAsRead}
                                                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                                                >
                                                    <CheckCheck className="h-3 w-3" />
                                                    <span>Tandai semua</span>
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setShowNotifications(false)}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Notifications List */}
                                    <div className="max-h-64 overflow-y-auto">
                                        {notifications.length > 0 ? (
                                            notifications.map((notification) => {
                                                const IconComponent = getIconComponent(notification.icon);
                                                return (
                                                    <div
                                                        key={notification.id}
                                                        className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer group ${
                                                            !notification.is_read ? 'bg-blue-50' : ''
                                                        }`}
                                                        onClick={() => !notification.is_read && markAsRead(notification.id)}
                                                    >
                                                        <div className="flex items-start space-x-3">
                                                            <div className={`p-1.5 rounded-lg ${getColorClasses(notification.color)}`}>
                                                                <IconComponent className="h-4 w-4" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                                    {notification.title}
                                                                </p>
                                                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                                    {notification.message}
                                                                </p>
                                                                <p className="text-xs text-gray-400 mt-1">
                                                                    {new Date(notification.created_at).toLocaleString('id-ID')}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                {!notification.is_read && (
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            markAsRead(notification.id);
                                                                        }}
                                                                        className="opacity-0 group-hover:opacity-100 text-blue-600 hover:text-blue-800"
                                                                        title="Tandai sudah dibaca"
                                                                    >
                                                                        <Check className="h-3 w-3" />
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        deleteNotification(notification.id);
                                                                    }}
                                                                    className="opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-800"
                                                                    title="Hapus notifikasi"
                                                                >
                                                                    <Trash className="h-3 w-3" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="px-4 py-8 text-center text-gray-500">
                                                <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                                <p className="text-sm">Tidak ada notifikasi</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Profile with Dropdown */}
                        <div className="relative user-menu-dropdown">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="hover:bg-opacity-10 flex items-center space-x-2 rounded-xl bg-gray-100 p-2 transition-colors duration-200 hover:bg-[#579D3E]"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#579D3E]">
                                    <User className="h-4 w-4 text-white" />
                                </div>
                                <span className="hidden font-medium text-gray-700 sm:block">{auth.user?.name}</span>
                                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                            </button>

                            {/* User Menu Dropdown */}
                            {showUserMenu && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                                    <div className="py-2">
                                        <Link
                                            href="/admin/users"
                                            onClick={() => {
                                                handleNavClick('users');
                                                setShowUserMenu(false);
                                            }}
                                            className={`flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${
                                                activeTab === 'users' ? 'bg-[#579D3E] bg-opacity-10 text-[#579D3E] font-medium' : ''
                                            }`}
                                        >
                                            <Users className="h-4 w-4" />
                                            <span>Manajemen User</span>
                                        </Link>
                                        
                                        <div className="border-t border-gray-100 my-1"></div>
                                        
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setShowUserMenu(false);
                                            }}
                                            className="flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Keluar</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="pb-3 md:hidden">
                    <div className="flex space-x-1 rounded-xl bg-gray-100 p-1">
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <Link
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
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}