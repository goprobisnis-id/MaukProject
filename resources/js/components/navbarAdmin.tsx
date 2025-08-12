import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { Button } from "@headlessui/react";


export default function NavbarAdmin() {
  const handleLogout = () => router.post(route('logout'));
  const [activeTab, setActiveTab] = useState("");

  const navItems = [
    { id: "dashboard", label: "Dashboard", href: "/dashboard" },
    { id: "categories", label: "Categories", href: "/admin/kategori" },
    { id: "products", label: "Products", href: "/admin/produk" }
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
  const handleNavClick = (itemId) => {
    setActiveTab(itemId);
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-800 via-green-800 to-teal-800 backdrop-blur-lg shadow-2xl border-b border-green-600/30 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand Section */}
          <div className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-300">
              <div className="w-6 h-6 bg-white rounded-md shadow-inner flex items-center justify-center">
                <div className="w-3 h-3 bg-gradient-to-br from-emerald-500 to-green-700 rounded-full"></div>
              </div>
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-200 to-green-100 bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <p className="text-xs text-green-200/80 -mt-1">Management System</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2 bg-black/20 rounded-2xl p-2 backdrop-blur-sm">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-green-500/25"
                    : "text-green-100 hover:bg-green-700/50 hover:text-white"
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                )}
              </a>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <button className="relative p-3 text-green-200 hover:text-white transition-colors duration-200 hover:bg-green-700/50 rounded-xl group">
              <svg className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zm-10-8a6 6 0 1112 0v5h-12V9z" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3 bg-black/20 rounded-2xl p-2 hover:bg-black/30 transition-colors duration-200">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
              <span className="text-green-100 font-medium hidden sm:block">Admin</span>
            </div>

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:block">Logout</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex space-x-1 bg-black/20 rounded-2xl p-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => handleNavClick(item.id)}
              className={`flex-1 text-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg"
                  : "text-green-100 hover:bg-green-700/50"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Animated Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 animate-pulse"></div>
    </nav>
  );
}