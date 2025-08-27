import NavbarAdmin from '@/components/navbarAdmin';
import { Head } from '@inertiajs/react';

// interface Event {
//     id: number;
//     nama_event: string;
//     tanggal: string;
//     lokasi: string;
//     deskripsi: string;
//     banner: string;
//     link_pendaftaran?: string;
// }

export default function Dashboard() {
    // const { events = [] } = usePage().props as { events?: Event[] };
    return (
        <div>
            <NavbarAdmin />
            <Head title="Dashboard" />
        </div>
    );
}
