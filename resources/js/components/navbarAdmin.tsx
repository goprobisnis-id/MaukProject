import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { Button } from "@headlessui/react";
import { Package, Settings, Home, LogOut, Bell, User } from "lucide-react";

export default function NavbarAdmin() {
  const handleLogout = () => router.post(route('logout'));
  const [activeTab, setActiveTab] = useState("");

  const navItems = [
    { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: Home },
    { id: "categories", label: "Kategori", href: "/admin/kategori", icon: Settings },
    { id: "products", label: "Produk", href: "/admin/produk", icon: Package }
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
      }
      
      // Fallback: check if path contains any of our routes
      if (currentPath.includes('/dashboard')) {
        return 'dashboard';
      } else if (currentPath.includes('/kategori')) {
        return 'categories';
      } else if (currentPath.includes('/produk')) {
        return 'products';
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
    <nav className="bg-white shadow-lg border-b-2 border-[#579D3E] sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo/Brand Section */}
          <div className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src="/logo_mauk.png" 
                alt="MAK-PIN Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#579D3E] group-hover:scale-110 transition-transform duration-300"
              />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-black">
                  Admin <span className="text-[#579D3E]">MAK-PIN</span>
                </h1>
                <p className="text-xs text-gray-600 -mt-1 hidden sm:block">Management Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 text-sm sm:text-base ${
                    activeTab === item.id
                      ? "bg-[#579D3E] text-white shadow-lg"
                      : "text-gray-700 hover:bg-[#579D3E] hover:bg-opacity-10 hover:text-white"
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
            <button className="relative p-1 sm:p-2 text-gray-600 hover:text-[#579D3E] transition-colors duration-200 hover:bg-[#579D3E] hover:bg-opacity-10 rounded-xl">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-2 hover:bg-[#579D3E] hover:bg-opacity-10 transition-colors duration-200">
              <div className="w-8 h-8 bg-[#579D3E] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-700 font-medium hidden sm:block">Admin</span>
            </div>

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Keluar</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex-1 flex flex-col items-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                    activeTab === item.id
                      ? "bg-[#579D3E] text-white shadow-md"
                      : "text-gray-600 hover:bg-[#579D3E] hover:bg-opacity-10 hover:text-[#579D3E]"
                  }`}
                >
                  <IconComponent className="w-4 h-4 mb-1" />
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