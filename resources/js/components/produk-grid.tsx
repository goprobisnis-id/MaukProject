import React from 'react';
import { Produk } from '@/types';  
import { usePage } from '@inertiajs/react'; 

export default function ProdukGrid() {
    const {props} = usePage<{produks: Produk[]}>();  
    const produks = props.produks;
  return (
    <div className="bg-gradient-to-b from-[#323232] via-[#4E4E4E] to-[#323232] py-12 lg:py-16 px-4 sm:px-8 mt-12 lg:mt-30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12">
          PRODUK PALING LARIS!
        </h2>
        
        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 px-4 sm:px-8">
          {produks.map((produk) => (
            <div 
              key={produk.id}
              className="relative group"
            >
              {/* Image Container */}
              <div className="h-40 sm:h-44 lg:h-48 bg-gray-100 overflow-hidden rounded-lg shadow-lg mx-2 sm:mx-4 lg:mx-6">
                <img 
                  src={`/storage/${produk.first_image}`}
                  alt={produk.nama_produk}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 sm:-bottom-8 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 bg-white rounded-lg shadow-xl p-3 sm:p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 text-center mb-1">
                  {produk.nama_produk}
                </h3>
                
                {/* Link Button */}
                <div className="text-center">
                  <a 
                    href={`/products/${produk.id}`}
                    className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors duration-200 text-xs sm:text-sm"
                  >
                    Lihat Produk
                    <svg 
                      className="ml-1 w-3 h-3 sm:w-4 sm:h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}