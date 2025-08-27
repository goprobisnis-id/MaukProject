import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Link, usePage } from '@inertiajs/react';

interface Event {
    id: number;
    nama_event: string;
    banner?: string;
    tanggal: string;
    tempat: string;
    deskripsi: string;
}

export default function EventIndex() {
    const { events } = usePage().props as unknown as { events: Event[] };
    const today = new Date().toISOString().slice(0, 10);
    const upcomingEvents = events.filter((e) => e.tanggal >= today);
    const pastEvents = events.filter((e) => e.tanggal < today);
    return (
        <>
            <Navbar />
            <div className="mx-auto mt-8 max-w-5xl rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-center text-2xl font-bold">Event Segera Berlangsung</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {upcomingEvents.length > 0 ? (
                        upcomingEvents.map((event: Event) => (
                            <div key={event.id} className="flex flex-col items-center rounded-lg bg-gray-50 p-4 shadow">
                                <img
                                    src={event.banner ? `/storage/${event.banner}` : '/slide1.jpg'}
                                    alt={event.nama_event}
                                    className="mb-2 h-40 w-full rounded object-cover"
                                />
                                <h3 className="mb-1 text-lg font-bold">{event.nama_event}</h3>
                                <p className="mb-1 text-sm text-gray-600">📅 {event.tanggal}</p>
                                <p className="mb-2 text-sm text-gray-600">📍 {event.tempat}</p>
                                <p className="mb-2 text-center text-xs text-gray-700">{event.deskripsi}</p>
                                <Link
                                    href={route('events.show', event.id)}
                                    className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                                >
                                    Detail & Registrasi
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-gray-500">Tidak ada event yang segera berlangsung.</p>
                    )}
                </div>
            </div>
            <div className="mx-auto mt-8 max-w-5xl rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-center text-2xl font-bold">Event Sudah Berlangsung</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {pastEvents.length > 0 ? (
                        pastEvents.map((event: Event) => (
                            <div key={event.id} className="flex flex-col items-center rounded-lg bg-gray-50 p-4 shadow">
                                <img
                                    src={event.banner ? `/storage/${event.banner}` : '/slide1.jpg'}
                                    alt={event.nama_event}
                                    className="mb-2 h-40 w-full rounded object-cover"
                                />
                                <h3 className="mb-1 text-lg font-bold">{event.nama_event}</h3>
                                <p className="mb-1 text-sm text-gray-600">📅 {event.tanggal}</p>
                                <p className="mb-2 text-sm text-gray-600">📍 {event.tempat}</p>
                                <p className="mb-2 text-center text-xs text-gray-700">{event.deskripsi}</p>
                                <Link
                                    href={route('events.show', event.id)}
                                    className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
                                >
                                    Detail & Registrasi
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-gray-500">Tidak ada event yang sudah berlangsung.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
