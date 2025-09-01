import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Link, usePage } from '@inertiajs/react';
import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';

interface Event {
    id: number;
    nama_event: string;
    banner?: string;
    banner_url?: string;
    tanggal: string;
    tempat: string;
    deskripsi: string;
    status?: string;
    registrations_count?: number;
}

export default function EventIndex() {
    const { events } = usePage().props as unknown as { events: Event[] };
    
    // Filter events by status
    const ongoingEvents = events.filter((e) => e.status === 'ongoing');
    const comingSoonEvents = events.filter((e) => e.status === 'coming soon');
    const endedEvents = events.filter((e) => e.status === 'ended');

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusBadge = (status?: string) => {
        switch (status) {
            case 'ongoing':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Buka Pendaftaran</span>;
            case 'coming soon':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Segera Dibuka</span>;
            case 'ended':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Selesai</span>;
            default:
                return null;
        }
    };

    const EventCard = ({ event }: { event: Event }) => (
        <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100 hover:border-gray-200">
            {/* Banner Image */}
            <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-3xl">
                <img
                    src={event.banner_url || '/slide1.jpg'}
                    alt={event.nama_event}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                    {getStatusBadge(event.status)}
                </div>

                {/* Registration Count */}
                {event.registrations_count !== undefined && (
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 text-sm font-semibold text-gray-700 flex items-center gap-2 shadow-lg">
                        <Users className="w-4 h-4 text-gray-600" />
                        <span>{event.registrations_count}</span>
                    </div>
                )}

                {/* Overlay Title for Mobile */}
                <div className="absolute bottom-4 left-4 right-4 sm:hidden">
                    <h3 className="text-lg font-bold text-white line-clamp-2">
                        {event.nama_event}
                    </h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
                {/* Title - Hidden on mobile (shown in overlay) */}
                <h3 className="hidden sm:block text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                    {event.nama_event}
                </h3>

                {/* Event Info */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600 text-sm">
                        <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                            <Calendar className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium">{formatDate(event.tanggal)}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                        <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                            <MapPin className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium line-clamp-1">{event.tempat}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-3">
                    {event.deskripsi}
                </p>

                {/* Action Button */}
                <Link
                    href={route('events.show', event.id)}
                    className={`inline-flex items-center justify-center w-full px-6 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 group/btn transform hover:scale-105 ${
                        event.status === 'ongoing'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl hover:shadow-green-500/30'
                            : event.status === 'coming soon'
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-xl hover:shadow-blue-500/30'
                            : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                    }`}
                >
                    <span>
                        {event.status === 'ongoing' 
                            ? 'Daftar Sekarang' 
                            : event.status === 'coming soon'
                            ? 'Lihat Detail'
                            : 'Lihat Detail'
                        }
                    </span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Link>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
        </div>
    );

    return (
        <>
            <Navbar />
            
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-[#579D3E] via-[#4a8535] to-[#3d6e2a] text-white py-20 sm:py-24 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-8">
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-white">
                            Event <span className="text-yellow-300">MAUK</span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Temukan dan ikuti berbagai event menarik yang diselenggarakan oleh MAUK. 
                            Jangan lewatkan kesempatan untuk bergabung!
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="min-h-screen py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                    
                    {/* Section 1: Ongoing Events (Buka Pendaftaran) */}
                    <section className="relative">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 sm:p-12 border border-green-100">
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium mb-4">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                    Pendaftaran Dibuka
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                    Event Terbuka untuk Pendaftaran
                                </h2>
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    Daftar sekarang untuk mengikuti event-event menarik yang sedang membuka pendaftaran!
                                </p>
                            </div>

                            {ongoingEvents.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {ongoingEvents.map((event: Event) => (
                                        <EventCard key={event.id} event={event} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-2xl">📝</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Event</h3>
                                        <p className="text-gray-600">Tidak ada event yang membuka pendaftaran saat ini.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Section 2: Coming Soon Events */}
                    <section className="relative">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 sm:p-12 border border-blue-100">
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium mb-4">
                                    <Clock className="w-4 h-4" />
                                    Segera Dibuka
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                    Event yang Akan Segera Dibuka
                                </h2>
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    Bersiaplah! Event-event ini akan segera membuka pendaftaran dalam waktu dekat.
                                </p>
                            </div>

                            {comingSoonEvents.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {comingSoonEvents.map((event: Event) => (
                                        <EventCard key={event.id} event={event} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Clock className="w-8 h-8 text-blue-500" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Event</h3>
                                        <p className="text-gray-600">Tidak ada event yang akan segera dibuka.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Section 3: Ended Events */}
                    {endedEvents.length > 0 && (
                        <section className="relative">
                            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-3xl p-8 sm:p-12 border border-gray-200">
                                <div className="text-center mb-12">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-full text-sm font-medium mb-4">
                                        <span className="text-sm">🏁</span>
                                        Event Selesai
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                        Event yang Telah Selesai
                                    </h2>
                                    <p className="text-gray-600 max-w-2xl mx-auto">
                                        Lihat kembali event-event yang telah berhasil dilaksanakan sebelumnya.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {endedEvents.map((event: Event) => (
                                        <EventCard key={event.id} event={event} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
