import React, { useState } from 'react';

interface EventFormProps {
    initialData?: Partial<EventData>;
    onSubmit: (data: EventData) => void;
}

export interface EventData {
    nama: string;
    penyelenggara: string;
    photo: File | null;
    tanggal: string;
    tempat: string;
    deskripsi: string;
}

const EventForm: React.FC<EventFormProps> = ({ initialData = {}, onSubmit }) => {
    const [form, setForm] = useState<EventData>({
        nama: initialData.nama || '',
        penyelenggara: initialData.penyelenggara || '',
        photo: null,
        tanggal: initialData.tanggal || '',
        tempat: initialData.tempat || '',
        deskripsi: initialData.deskripsi || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, photo: e.target.files ? e.target.files[0] : null }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label>Nama Event</label>
                <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    className="input"
                    required
                    placeholder="Nama Event"
                    title="Nama Event"
                />
            </div>
            <div>
                <label>Penyelenggara Event</label>
                <input
                    type="text"
                    name="penyelenggara"
                    value={form.penyelenggara}
                    onChange={handleChange}
                    className="input"
                    required
                    placeholder="Penyelenggara Event"
                    title="Penyelenggara Event"
                />
            </div>
            <div>
                <label>Banner Event</label>
                <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="input"
                    placeholder="Upload Banner"
                    title="Upload Banner"
                />
            </div>
            <div>
                <label>Tanggal Event</label>
                <input
                    type="date"
                    name="tanggal"
                    value={form.tanggal}
                    onChange={handleChange}
                    className="input"
                    required
                    placeholder="Tanggal Event"
                    title="Tanggal Event"
                />
            </div>
            <div>
                <label>Tempat Event</label>
                <input
                    type="text"
                    name="tempat"
                    value={form.tempat}
                    onChange={handleChange}
                    className="input"
                    required
                    placeholder="Tempat Event"
                    title="Tempat Event"
                />
            </div>
            <div>
                <label>Deskripsi Event</label>
                <textarea
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleChange}
                    className="input"
                    required
                    placeholder="Deskripsi Event"
                    title="Deskripsi Event"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Simpan
            </button>
        </form>
    );
};

export default EventForm;
