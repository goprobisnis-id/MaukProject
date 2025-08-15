import React from 'react';

// Interface untuk Event (sementara statis)
interface Event {
  id: number;
  nama_event: string;
  tanggal: string;
  lokasi: string;
  deskripsi: string;
  gambar: string;
  link_pendaftaran?: string;
}

export default function EventGrid() {
    // Data event statis sementara
    const events: Event[] = [
        {
            id: 1,
            nama_event: "Workshop Digital Marketing",
            tanggal: "25 Agustus 2025",
            lokasi: "Jakarta",
            deskripsi: "Strategi digital marketing untuk bisnis",
            gambar: "slide1.jpg",
            link_pendaftaran: "#"
        },
        {
            id: 2,
            nama_event: "Seminar Entrepreneurship",
            tanggal: "10 September 2025",
            lokasi: "Balai Kartini",
            deskripsi: "Tips memulai bisnis dari nol",
            gambar: "slide2.png",
            link_pendaftaran: "#"
        },
        {
            id: 3,
            nama_event: "Training Social Media",
            tanggal: "15 September 2025",
            lokasi: "Grand Indonesia",
            deskripsi: "Maksimalkan media sosial bisnis",
            gambar: "e-commerce.png",
            link_pendaftaran: "#"
        }
    ];
  return (
    <div className="bg-gradient-to-b from-[#116821] via-[#1a8c2e] to-[#116821] py-16 px-8 mt-1">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          EVENT SEGERA BERLANGSUNG!
        </h2>
        
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-8">
          {events.map((event) => (
            <div 
              key={event.id}
              className="relative group"
            >
              {/* Image Container */}
              <div className="h-48 bg-gray-100 overflow-hidden rounded-lg shadow-lg mx-6">
                <img 
                  src={`/${event.gambar}`}
                  alt={event.nama_event}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 left-8 right-8 bg-white rounded-lg shadow-xl p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-base font-bold text-gray-800 text-center mb-1">
                  {event.nama_event}
                </h3>
                
                {/* Event Details */}
                <div className="text-center space-y-0.5 mb-2">
                  <p className="text-xs text-gray-600">
                    📅 {event.tanggal}
                  </p>
                  <p className="text-xs text-gray-600">
                    📍 {event.lokasi}
                  </p>
                </div>
                
                {/* Link Button */}
                <div className="text-center">
                  <a 
                    href={event.link_pendaftaran}
                    className="inline-flex items-center text-[#116821] font-semibold hover:text-[#0d4f19] transition-colors duration-200 text-xs"
                  >
                    Daftar Sekarang
                    <svg 
                      className="ml-1 w-3 h-3" 
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