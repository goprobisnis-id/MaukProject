import { router, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

export default function EventShow() {
    const { event } = usePage().props as any;
    const [form, setForm] = useState({ nama: '', email: '', telepon: '' });
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('events.register', event.id), form, {
            onSuccess: () => setSuccess('Registrasi berhasil!'),
        });
    };

    return (
        <div className="mx-auto mt-8 max-w-2xl rounded-lg bg-white p-6 shadow-lg">
            <img
                src={event.banner ? `/storage/${event.banner}` : '/slide1.jpg'}
                alt={event.nama_event}
                className="mb-4 h-48 w-full rounded object-cover"
            />
            <h2 className="mb-2 text-center text-2xl font-bold">{event.nama_event}</h2>
            <p className="mb-1 text-center text-sm text-gray-600">📅 {event.tanggal}</p>
            <p className="mb-2 text-center text-sm text-gray-600">📍 {event.tempat}</p>
            <p className="mb-4 text-center text-xs text-gray-700">{event.deskripsi}</p>
            <form onSubmit={handleSubmit} className="space-y-3">
                <h3 className="mb-2 text-lg font-semibold">Formulir Registrasi</h3>
                <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    required
                    placeholder="Nama"
                    className="w-full rounded border px-3 py-2"
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    className="w-full rounded border px-3 py-2"
                />
                <input
                    type="text"
                    name="telepon"
                    value={form.telepon}
                    onChange={handleChange}
                    required
                    placeholder="Telepon"
                    className="w-full rounded border px-3 py-2"
                />
                <button type="submit" className="w-full rounded bg-green-600 py-2 font-bold text-white hover:bg-green-700">
                    Registrasi
                </button>
                {success && <div className="mt-2 text-center font-bold text-green-700">{success}</div>}
            </form>
        </div>
    );
}
