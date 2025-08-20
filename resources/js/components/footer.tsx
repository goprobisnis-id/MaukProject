import React from "react";
import { Link } from "@inertiajs/react";
import { InstagramIcon } from "lucide-react";
import { TwitterIcon } from "lucide-react";
import { YoutubeIcon } from "lucide-react";
import { FacebookIcon } from "lucide-react";

export default function Footer() {
    return (
        <div className="bg-[#263238] px-4 sm:px-8 lg:px-36 py-8 lg:py-12 mt-1">
            <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-0">
                {/* Left Section */}
                <div className="flex flex-col gap-4 lg:gap-6">
                    <img src="/logo_mauk_2.png" alt="Logo Mauk" className="w-20 sm:w-24" />
                    <p className="text-white text-xs sm:text-sm">
                        Copyright @2025 Kreasi Limbah Mauk <br/> 
                        All rights reserved
                    </p>
                    <div className="flex gap-3">
                        <Link href="https://www.instagram.com/">
                            <InstagramIcon className="w-4 h-4 text-white bg-gray-600 rounded-full p-1 box-content hover:bg-gray-500 transition-colors" />
                        </Link>
                        <Link href="https://twitter.com/">
                            <TwitterIcon className="w-4 h-4 text-white bg-gray-600 rounded-full p-1 box-content hover:bg-gray-500 transition-colors" />
                        </Link>
                        <Link href="https://www.youtube.com/">
                            <YoutubeIcon className="w-4 h-4 text-white bg-gray-600 rounded-full p-1 box-content hover:bg-gray-500 transition-colors" />
                        </Link>
                        <Link href="https://www.facebook.com/">
                            <FacebookIcon className="w-4 h-4 text-white bg-gray-600 rounded-full p-1 box-content hover:bg-gray-500 transition-colors" />
                        </Link>
                    </div>
                </div>    
                
                {/* Right Section */}
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 lg:gap-36">
                    {/* Support Links */}
                    <div className="flex flex-col text-white gap-2">
                        <p className="mb-2 font-bold text-base lg:text-lg">Support</p>
                        <p className="text-xs sm:text-sm hover:text-gray-300 cursor-pointer transition-colors">Help Center</p>
                        <p className="text-xs sm:text-sm hover:text-gray-300 cursor-pointer transition-colors">Terms of service</p>
                        <p className="text-xs sm:text-sm hover:text-gray-300 cursor-pointer transition-colors">Legal</p>
                        <p className="text-xs sm:text-sm hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</p>
                        <p className="text-xs sm:text-sm hover:text-gray-300 cursor-pointer transition-colors">Status</p>
                    </div>
                    
                    {/* Newsletter */}
                    <div className="flex flex-col text-white gap-4">
                        <p className="font-bold text-base lg:text-lg">Stay Up To Date</p>
                        <div className="relative">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="w-full sm:w-56 h-9 bg-gray-600 rounded-xl px-3 text-xs sm:text-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#579D3E] transition-all"
                            />
                            <svg 
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-300 cursor-pointer hover:text-white transition-colors"
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                                />
                            </svg>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
    )
}
