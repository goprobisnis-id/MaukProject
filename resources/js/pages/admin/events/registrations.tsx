import { usePage } from '@inertiajs/react';

export default function EventRegistrations() {
    const { event, registrations } = usePage().props as any;
    return (
        <div className="mx-auto mt-8 max-w-3xl rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-center text-2xl font-bold">Registrasi Event: {event.nama_event}</h2>
            <table className="mt-4 w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2">Nama</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Telepon</th>
                        <th className="p-2">Waktu Registrasi</th>
                    </tr>
                </thead>
                <tbody>
                    {registrations.map((reg: any) => (
                        <tr key={reg.id} className="border-t">
                            <td className="p-2">{reg.nama}</td>
                            <td className="p-2">{reg.email}</td>
                            <td className="p-2">{reg.telepon}</td>
                            <td className="p-2">{reg.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
