import React, { useState } from 'react';

interface EventItem {
    id: number;
    nama: string;
    penyelenggara: string;
    photoUrl: string;
    tanggal: string;
    tempat: string;
    deskripsi: string;
    waktu: string;
    status: 'berlangsung' | 'akan datang' | 'sudah selesai';
}

const dummyEvents: EventItem[] = [
    {
        id: 1,
        nama: 'SEMINAR MEMBUAT IDE UNIK DAN COPY WRITING YANG BAIK',
        penyelenggara: 'MAK-PIN',
        photoUrl: '/images/event1.jpg',
        tanggal: '2025-04-04',
        tempat: 'Desa ABCDEFGH, Tangerang',
        deskripsi: 'Deskripsi event 1',
        waktu: '15.00 - 17.00 WIB',
        status: 'berlangsung',
    },
    {
        id: 2,
        nama: 'SEMINAR MEMBUAT IDE UNIK DAN COPY WRITING YANG BAIK',
        penyelenggara: 'MAK-PIN',
        photoUrl: '/images/event2.jpg',
        tanggal: '2025-04-04',
        tempat: 'Desa ABCDEFGH, Tangerang',
        deskripsi: 'Deskripsi event 2',
        waktu: '15.00 - 17.00 WIB',
        status: 'berlangsung',
    },
    {
        id: 3,
        nama: 'SEMINAR MEMBUAT IDE UNIK DAN COPY WRITING YANG BAIK',
        penyelenggara: 'MAK-PIN',
        photoUrl: '/images/event3.jpg',
        tanggal: '2025-04-20',
        tempat: 'Desa ABCDEFGH, Tangerang',
        deskripsi: 'Deskripsi event 3',
        waktu: '15.00 - 17.00 WIB',
        status: 'akan datang',
    },
    {
        id: 4,
        nama: 'SEMINAR MEMBUAT IDE UNIK DAN COPY WRITING YANG BAIK',
        penyelenggara: 'MAK-PIN',
        photoUrl: '/images/event4.jpg',
        tanggal: '2025-04-21',
        tempat: 'Desa ABCDEFGH, Tangerang',
        deskripsi: 'Deskripsi event 4',
        waktu: '15.00 - 17.00 WIB',
        status: 'akan datang',
    },
    {
        id: 5,
        nama: 'SEMINAR MEMBUAT IDE UNIK DAN COPY WRITING YANG BAIK',
        penyelenggara: 'MAK-PIN',
        photoUrl: '/images/event5.jpg',
        tanggal: '2025-04-20',
        tempat: 'Desa ABCDEFGH, Tangerang',
        deskripsi: 'Deskripsi event 5',
        waktu: '15.00 - 17.00 WIB',
        status: 'sudah selesai',
    },
    {
        id: 6,
        nama: 'SEMINAR MEMBUAT IDE UNIK DAN COPY WRITING YANG BAIK',
        penyelenggara: 'MAK-PIN',
        photoUrl: '/images/event6.jpg',
        tanggal: '2025-04-21',
        tempat: 'Desa ABCDEFGH, Tangerang',
        deskripsi: 'Deskripsi event 6',
        waktu: '15.00 - 17.00 WIB',
        status: 'sudah selesai',
    },
];

const statusColor: Record<string, string> = {
    berlangsung: 'bg-green-100 border-green-400',
    'akan datang': 'bg-yellow-100 border-yellow-400',
    'sudah selesai': 'bg-red-100 border-red-400',
};

const EventPage: React.FC = () => {
    const [selected, setSelected] = useState<EventItem | null>(null);

    return (
        <div className="flex h-auto flex-col items-center bg-white py-8">
            <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
                <header className="mb-6">
                    <h1 className="mb-2 text-center text-3xl font-bold text-green-900">
                        EVENT <span className="font-light">MAK-PIN</span>
                    </h1>
                    <div className="mb-2 flex justify-center gap-6">
                        <span className="flex items-center gap-2">
                            <span className="inline-block h-4 w-4 rounded-full bg-green-500"></span>berlangsung
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="inline-block h-4 w-4 rounded-full bg-yellow-400"></span>akan datang
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="inline-block h-4 w-4 rounded-full bg-red-500"></span>sudah selesai
                        </span>
                    </div>
                </header>
                {!selected ? (
                    <div className="space-y-8">
                        {dummyEvents.map((ev) => (
                            <div
                                key={ev.id}
                                className={`mb-4 cursor-pointer rounded-lg border-2 p-4 transition-all ${statusColor[ev.status]}`}
                                onClick={() => setSelected(ev)}
                            >
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <img src={ev.photoUrl} alt="banner" className="h-48 w-full rounded-lg object-cover md:w-1/3" />
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <div className="mb-2 text-lg font-bold">
                                                NAMA EVENT : <span className="font-black">{ev.nama}</span>
                                            </div>
                                            <div className="mb-1 flex items-center gap-2">
                                                <span className="text-gray-700">{ev.tempat}</span>
                                            </div>
                                            <div className="mb-1 flex items-center gap-2">
                                                <span className="text-gray-700">
                                                    {new Date(ev.tanggal).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="font-bold">{ev.waktu}</span>
                                            <span className="rounded border px-3 py-1 font-semibold">LANGSUNG DI TEMPAT</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={`rounded-lg border-2 p-6 ${statusColor[selected.status]}`}>
                        <button className="mb-4 pt-10 text-green-700 underline" onClick={() => setSelected(null)}>
                            &larr; Kembali ke daftar event
                        </button>
                        <div className="flex flex-col gap-6 md:flex-row">
                            <img src={selected.photoUrl} alt="banner" className="h-64 w-full rounded-lg object-cover md:w-1/3" />
                            <div className="flex flex-1 flex-col justify-between">
                                <div>
                                    <div className="mb-2 text-xl font-bold">
                                        NAMA EVENT : <span className="font-black">{selected.nama}</span>
                                    </div>
                                    <div className="mb-2">
                                        Penyelenggara: <span className="font-semibold">{selected.penyelenggara}</span>
                                    </div>
                                    <div className="mb-1 flex items-center gap-2">
                                        <span className="text-gray-700">{selected.tempat}</span>
                                    </div>
                                    <div className="mb-1 flex items-center gap-2">
                                        <span className="text-gray-700">
                                            {new Date(selected.tanggal).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <div className="mb-1 flex items-center gap-2">
                                        <span className="font-bold">{selected.waktu}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="mb-1 font-bold">Deskripsi Event:</div>
                                    <div className="text-gray-800">{selected.deskripsi}</div>
                                </div>
                                <div className="mt-4">
                                    <span className="rounded border px-3 py-1 font-semibold">LANGSUNG DI TEMPAT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <footer className="flex w-full max-w-4xl flex-col items-center justify-between rounded-lg bg-white p-6 text-black md:flex-row">
                <div>
                    {/* <div className="text-lg font-bold">MAK-PIN</div> */}
                    <div className="text-xs">Copyright &copy; 2025 Landify UI Kit. All rights reserved</div>
                </div>
            </footer>
        </div>
    );
};

export default EventPage;
