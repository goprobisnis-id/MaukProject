import React from "react";
import { Link } from "@inertiajs/react";
import { InstagramIcon } from "lucide-react";
import { TwitterIcon } from "lucide-react";
import { YoutubeIcon } from "lucide-react";
import { FacebookIcon } from "lucide-react";

export default function Footer() {
    return (
        <div className="flex justify-between bg-[#263238] px-36 py-12 mt-1">
            <div className="grid gap-y-6">
                <img src="/logo_mauk_2.png" alt="Logo Mauk" className="w-24" />
                <p className="text-white text-xs">Copyright @2025 Kreasi Limbah Mauk <br/> All rights reserved</p>
                <div className="flex gap-x-3">
                    <Link href="https://www.instagram.com/">
                    <InstagramIcon className="w-4 h-4 text-white bg-gray-600 rounded-full p-1 box-content" />
                    </Link>
                    <Link href="https://twitter.com/">
                    <TwitterIcon className="w-4 h-4 text-white bg-gray-600 rounded-full p-1 box-content" />
                    </Link>
                    <Link href="https://www.youtube.com/">
                    <YoutubeIcon className="w-4 h-4 text-white bg-gray-600 rounded-full p-1 box-content" />
                    </Link>
                    <Link href="https://www.facebook.com/">
                    <FacebookIcon className="w-4 h-4 text-white bg-gray-600 rounded-full p-1 box-content" />
                    </Link>
                </div>
            </div>    
            <div className="flex gap-x-36">
                <div className="grid text-white gap-y-2">
                    <p className="mb-2 font-bold text-lg">Support</p>
                    <p className="text-xs">Help Center</p>
                    <p className="text-xs">Terms of service</p>
                    <p className="text-xs">Legal</p>
                    <p className="text-xs">Privacy Policy</p>
                    <p className="text-xs">Status</p>
                </div>
                <div className="flex flex-col text-white gap-y-2">
                    <p className="font-bold text-lg">Stay Up To Date</p>
                    <div className="relative">
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            className="w-56 h-9 bg-gray-600 rounded-xl px-3 text-xs text-white placeholder-gray-300"
                        />
                        <svg 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-300"
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
    )
}
