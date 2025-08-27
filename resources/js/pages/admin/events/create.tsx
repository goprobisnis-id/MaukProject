import { router } from '@inertiajs/react';
import React, { useState } from 'react';

export default function CreateEvent() {
    const [form, setForm] = useState<{
        nama_event: string;
        banner: File | null;
        tanggal: string;
        tempat: string;
        deskripsi: string;
    }>({
        nama_event: '',
        banner: null,
        tanggal: '',
        tempat: '',
        deskripsi: '',
    });
    const [preview, setPreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        const { name, value } = target;
        if (name === 'banner' && 'files' in target && target.files && target.files[0]) {
            setForm({ ...form, banner: target.files[0] });
            setPreview(URL.createObjectURL(target.files[0]));
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (key === 'banner' && value instanceof File) {
                data.append(key, value);
            } else {
                data.append(key, value as string);
            }
        });
        router.post(route('admin.events.store'), data);
    };

    return (
        <div className="mx-auto mt-8 max-w-xl rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-center text-2xl font-bold">Buat Event Baru</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-1 block font-semibold">Nama Event</label>
                    <input
                        type="text"
                        name="nama_event"
                        value={form.nama_event}
                        onChange={handleChange}
                        required
                        className="w-full rounded border px-3 py-2"
                        placeholder="Nama Event"
                    />
                </div>
                <div>
                    <label className="mb-1 block font-semibold">Banner Promosi</label>
                    <input
                        type="file"
                        name="banner"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        className="w-full"
                        title="Upload Banner Event"
                    />
                    {preview && <img src={preview} alt="Preview" className="mt-2 h-32 rounded object-cover shadow" />}
                </div>
                <div>
                    <label className="mb-1 block font-semibold">Tanggal Event</label>
                    <input
                        type="date"
                        name="tanggal"
                        value={form.tanggal}
                        onChange={handleChange}
                        required
                        className="w-full rounded border px-3 py-2"
                        placeholder="Tanggal Event"
                    />
                </div>
                <div>
                    <label className="mb-1 block font-semibold">Tempat Event</label>
                    <input
                        type="text"
                        name="tempat"
                        value={form.tempat}
                        onChange={handleChange}
                        required
                        className="w-full rounded border px-3 py-2"
                        placeholder="Tempat Event"
                    />
                </div>
                <div>
                    <label className="mb-1 block font-semibold">Deskripsi Event</label>
                    <textarea
                        name="deskripsi"
                        value={form.deskripsi}
                        onChange={handleChange}
                        required
                        className="w-full rounded border px-3 py-2"
                        rows={4}
                        placeholder="Deskripsi Event"
                    />
                </div>
                <button type="submit" className="w-full rounded bg-blue-600 py-2 font-bold text-white hover:bg-blue-700">
                    Simpan Event
                </button>
            </form>
        </div>
    );
}
