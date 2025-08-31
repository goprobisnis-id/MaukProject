import React from 'react';

// Interface untuk Event
interface Event {
    id: number;
    nama_event: string;
    tanggal: string;
    tempat: string;
    deskripsi: string;
    banner?: string;
    status?: string;
    registrations_count?: number;
}

interface EventGridProps {
    events: Event[];
}

export default function EventGrid({ events }: EventGridProps) {
    // Filter event dengan status ongoing (buka pendaftaran)
    const ongoingEvents = Array.isArray(events) ? events.filter((e) => e.status === 'ongoing') : [];
    const [showAll, setShowAll] = React.useState(false);
    const displayedEvents = showAll ? ongoingEvents : ongoingEvents.slice(0, 3);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-gradient-to-b from-[#579D3E] via-[#4a8535] to-[#579D3E] py-12 lg:py-16 px-4 sm:px-8 mt-12 lg:mt-30">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12">
                    EVENT SEGERA BERLANGSUNG!
                </h2>
                
                {/* Grid Container */}
                {displayedEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 px-4 sm:px-8">
                        {displayedEvents.map((event) => (
                            <div key={event.id} className="relative group">
                                {/* Image Container */}
                                <div className="h-40 sm:h-44 lg:h-48 bg-gray-100 overflow-hidden rounded-lg shadow-lg mx-2 sm:mx-4 lg:mx-6">
                                    <img
                                        src={event.banner ? `/storage/${event.banner}` : '/slide1.jpg'}
                                        alt={event.nama_event}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Floating Card */}
                                <div className="absolute -bottom-6 sm:-bottom-8 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 bg-white rounded-lg shadow-xl p-3 sm:p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-800 text-center mb-2">
                                        {event.nama_event}
                                    </h3>
                                    
                                    {/* Event Info */}
                                    <div className="mb-2 space-y-1 text-center">
                                        <p className="text-xs text-gray-600">📅 {formatDate(event.tanggal)}</p>
                                        <p className="text-xs text-gray-600">📍 {event.tempat}</p>
                                        {event.registrations_count !== undefined && (
                                            <p className="text-xs text-green-600 font-medium">👥 {event.registrations_count} terdaftar</p>
                                        )}
                                    </div>
                                    
                                    {/* Link Button */}
                                    <div className="text-center">
                                        <a
                                            href={`/events/${event.id}`}
                                            className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors duration-200 text-xs sm:text-sm"
                                        >
                                            Daftar Sekarang
                                            <svg className="ml-1 w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-white text-lg">Tidak ada event yang membuka pendaftaran saat ini.</p>
                )}

                {/* Show More/Less Buttons */}
                {ongoingEvents.length > 3 && !showAll && (
                    <div className="mt-12 flex justify-center">
                        <button
                            className="rounded-full bg-white px-6 py-2 sm:px-8 sm:py-3 font-bold text-[#579D3E] shadow-lg transition-all duration-200 hover:bg-green-50 hover:shadow-xl"
                            onClick={() => setShowAll(true)}
                        >
                            Lihat Selengkapnya
                        </button>
                    </div>
                )}
                {ongoingEvents.length > 3 && showAll && (
                    <div className="mt-8 flex justify-center">
                        <button
                            className="rounded-full bg-white/20 backdrop-blur-sm px-6 py-2 sm:px-8 sm:py-3 font-bold text-white border border-white/30 shadow transition-all duration-200 hover:bg-white/30"
                            onClick={() => setShowAll(false)}
                        >
                            Tampilkan Lebih Sedikit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
