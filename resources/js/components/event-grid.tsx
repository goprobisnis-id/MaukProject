import React from 'react';
// Interface untuk Event (sementara statis)
interface Event {
    id: number;
    nama_event: string;
    tanggal: string;
    lokasi: string;
    deskripsi: string;
    banner: string;
    link_pendaftaran?: string;
}

interface EventGridProps {
    events: Event[];
}

export default function EventGrid({ events }: EventGridProps) {
    // Filter event segera berlangsung
    const today = new Date().toISOString().slice(0, 10);
    const upcomingEvents = Array.isArray(events) ? events.filter((e) => e.tanggal >= today) : [];
    const [showAll, setShowAll] = React.useState(false);
    const displayedEvents = showAll ? upcomingEvents : upcomingEvents.slice(0, 3);
    return (
        <div className="bg-gradient-to-b from-[#116821] via-[#1a8c2e] to-[#116821]">
            <div>
                <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl lg:mb-12 lg:text-4xl">EVENT SEGERA BERLANGSUNG!</h2>
                <div className="grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 sm:gap-12 sm:px-8 lg:grid-cols-3 lg:gap-16">
                    {displayedEvents.length > 0 ? (
                        displayedEvents.map((event) => (
                            <div key={event.id} className="group relative">
                                <div className="mx-2 h-40 overflow-hidden rounded-lg bg-gray-100 shadow-lg sm:mx-4 sm:h-44 lg:mx-6 lg:h-48">
                                    <img
                                        src={event.banner ? `/storage/${event.banner}` : '/logo_mauk.png'}
                                        alt={event.nama_event}
                                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                                <div className="absolute right-4 -bottom-5 left-4 translate-y-2 transform rounded-lg bg-white p-2 shadow-xl transition-transform duration-300 group-hover:translate-y-0 sm:right-6 sm:-bottom-6 sm:left-6 sm:p-3 lg:right-8 lg:left-8">
                                    <h3 className="mb-1 text-center text-sm font-bold text-gray-800 sm:text-base">{event.nama_event}</h3>
                                    <div className="mb-2 space-y-0.5 text-center">
                                        <p className="text-xs text-gray-600">📅 {event.tanggal}</p>
                                        <p className="text-xs text-gray-600">📍 {event.lokasi}</p>
                                    </div>
                                    <div className="text-center">
                                        <a
                                            href={event.link_pendaftaran}
                                            className="inline-flex items-center text-xs font-semibold text-[#116821] transition-colors duration-200 hover:text-[#0d4f19]"
                                        >
                                            Daftar Sekarang
                                            <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-white">Tidak ada event yang segera berlangsung.</p>
                    )}
                </div>
                {upcomingEvents.length > 3 && !showAll && (
                    <div className="mt-8 flex justify-center">
                        <button
                            className="rounded-full bg-white px-6 py-2 font-bold text-[#116821] shadow transition-colors hover:bg-gray-100"
                            onClick={() => setShowAll(true)}
                        >
                            Lihat Selengkapnya
                        </button>
                    </div>
                )}
                {upcomingEvents.length > 3 && showAll && (
                    <div className="mt-4 flex justify-center">
                        <button
                            className="rounded-full bg-white px-6 py-2 font-bold text-[#116821] shadow transition-colors hover:bg-gray-100"
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
