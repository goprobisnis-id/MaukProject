import React, { useState } from 'react';
import EventForm, { EventData } from './EventForm';

interface EventItem extends EventData {
    id: number;
    photoUrl?: string;
}

const initialEvents: EventItem[] = [];

const EventDashboard: React.FC = () => {
    const [events, setEvents] = useState<EventItem[]>(initialEvents);
    const [editing, setEditing] = useState<EventItem | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleCreate = (data: EventData) => {
        const newEvent: EventItem = {
            ...data,
            id: Date.now(),
            photoUrl: data.photo ? URL.createObjectURL(data.photo) : undefined,
        };
        setEvents([...events, newEvent]);
        setShowForm(false);
    };

    const handleEdit = (event: EventItem) => {
        setEditing(event);
        setShowForm(true);
    };

    const handleUpdate = (data: EventData) => {
        if (!editing) return;
        setEvents(
            events.map((ev) =>
                ev.id === editing.id
                    ? {
                          ...ev,
                          ...data,
                          photoUrl: data.photo ? URL.createObjectURL(data.photo) : editing.photoUrl,
                      }
                    : ev,
            ),
        );
        setEditing(null);
        setShowForm(false);
    };

    const handleDelete = (id: number) => {
        setEvents(events.filter((ev) => ev.id !== id));
    };

    return (
        <div className="min-h-screen bg-white p-4">
            <h2 className="mb-4 text-xl font-bold">Manajemen Event</h2>
            {!showForm && (
                <button
                    className="btn btn-success mb-4"
                    onClick={() => {
                        setEditing(null);
                        setShowForm(true);
                    }}
                >
                    Buat Event Baru
                </button>
            )}
            {showForm && <EventForm initialData={editing || undefined} onSubmit={editing ? handleUpdate : handleCreate} />}
            <div className="mt-6">
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th>Banner</th>
                            <th>Nama</th>
                            <th>Penyelenggara</th>
                            <th>Tanggal</th>
                            <th>Tempat</th>
                            <th>Deskripsi</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((ev) => (
                            <tr key={ev.id}>
                                <td>{ev.photoUrl && <img src={ev.photoUrl} alt="banner" className="h-16" />}</td>
                                <td>{ev.nama}</td>
                                <td>{ev.penyelenggara}</td>
                                <td>{ev.tanggal}</td>
                                <td>{ev.tempat}</td>
                                <td>{ev.deskripsi}</td>
                                <td>
                                    <button className="btn btn-warning mr-2" onClick={() => handleEdit(ev)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(ev.id)}>
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EventDashboard;
