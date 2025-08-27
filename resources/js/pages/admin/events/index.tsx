import { Link, usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

type Event = {
    id: number;
    nama_event: string;
    tanggal: string;
    tempat: string;
};

interface PageProps extends InertiaPageProps {
    events: Event[];
}

export default function EventAdminIndex() {
    const { events } = usePage<PageProps>().props;
    return (
        <div className="mx-auto mt-8 max-w-4xl rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-center text-2xl font-bold">Daftar Event</h2>
            <Link
                href={route('events.create')}
                className="mb-4 inline-block rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
            >
                + Buat Event Baru
            </Link>
            <table className="mt-4 w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2">Nama Event</th>
                        <th className="p-2">Tanggal</th>
                        <th className="p-2">Tempat</th>
                        <th className="p-2">Registrasi</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id} className="border-t">
                            <td className="p-2">{event.nama_event}</td>
                            <td className="p-2">{event.tanggal}</td>
                            <td className="p-2">{event.tempat}</td>
                            <td className="p-2">
                                <Link href={route('admin.events.registrations', event.id)} className="text-blue-600 hover:underline">
                                    Lihat Registrasi
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
