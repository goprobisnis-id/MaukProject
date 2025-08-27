import { Link } from '@inertiajs/react';

export default function AdminEventPage() {
    // Dummy data event, ganti dengan data dari backend
    const events = [
        { id: 1, name: 'Event 1', date: '2025-09-01' },
        { id: 2, name: 'Event 2', date: '2025-09-10' },
    ];

    return (
        <div className="container mx-auto py-8">
            <h1 className="mb-6 text-2xl font-bold">Manajemen Event</h1>
            <div className="mb-4">
                <Link href="/admin/event/create" className="rounded-lg bg-green-600 px-4 py-2 text-white shadow hover:bg-green-700">
                    + Tambah Event
                </Link>
            </div>
            <table className="min-w-full rounded-lg border bg-white shadow">
                <thead>
                    <tr>
                        <th className="border-b px-4 py-2">Nama Event</th>
                        <th className="border-b px-4 py-2">Tanggal</th>
                        <th className="border-b px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td className="border-b px-4 py-2">{event.name}</td>
                            <td className="border-b px-4 py-2">{event.date}</td>
                            <td className="border-b px-4 py-2">
                                <Link
                                    href={`/admin/event/edit/${event.id}`}
                                    className="mr-2 rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600"
                                >
                                    Edit
                                </Link>
                                <button
                                    className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                                    // onClick={() => handleDelete(event.id)}
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
