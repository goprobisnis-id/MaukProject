import { router, usePage, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, ArrowLeft, CheckCircle, User, Mail, Phone, Info, AlertCircle } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface Event {
    id: number;
    nama_event: string;
    banner?: string;
    banner_url?: string;
    tanggal: string;
    tempat: string;
    deskripsi: string;
    status?: string;
    registrations_count?: number;
}

export default function EventShow() {
    const { event } = usePage().props as any;
    const [form, setForm] = useState({ nama: '', email: '', telepon: '' });
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        router.post(route('events.register', event.id), form, {
            onSuccess: () => {
                setSuccess('Registrasi berhasil!');
                setForm({ nama: '', email: '', telepon: '' });
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            full: date.toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            day: date.getDate().toString().padStart(2, '0'),
            month: date.toLocaleDateString('id-ID', { month: 'short' }),
            year: date.getFullYear()
        };
    };

    const getStatusInfo = (status?: string) => {
        switch (status) {
            case 'ongoing':
                return {
                    badge: <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        Pendaftaran Dibuka
                    </span>,
                    canRegister: true,
                    message: 'Pendaftaran sedang dibuka!'
                };
            case 'coming soon':
                return {
                    badge: <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        <Clock className="w-4 h-4 mr-2" />
                        Segera Dibuka
                    </span>,
                    canRegister: false,
                    message: 'Pendaftaran akan segera dibuka'
                };
            case 'ended':
                return {
                    badge: <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Telah Selesai
                    </span>,
                    canRegister: false,
                    message: 'Event telah selesai dilaksanakan'
                };
            default:
                return {
                    badge: null,
                    canRegister: true,
                    message: 'Registrasi tersedia'
                };
        }
    };

    const dateInfo = formatDate(event.tanggal);
    const statusInfo = getStatusInfo(event.status);
    const eventDate = new Date(event.tanggal);
    const today = new Date();
    const isUpcoming = eventDate >= today;

    return (
        <>
            <Navbar />
            
            <div className="bg-gray-50 min-h-screen">
                {/* Hero Section */}
                <div className="relative">
                    {/* Banner Image */}
                    <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                        <img
                            src={event.banner_url || '/slide1.jpg'}
                            alt={event.nama_event}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {/* Back Button */}
                        <div className="absolute top-6 left-6">
                            <Link
                                href={route('events.front')}
                                className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-gray-700 hover:bg-white transition-all duration-200 group"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                                Kembali
                            </Link>
                        </div>

                        {/* Event Title & Status */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                            <div className="max-w-4xl mx-auto">
                                <div className="mb-4">
                                    {statusInfo.badge}
                                </div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                    {event.nama_event}
                                </h1>
                                
                                {/* Quick Info */}
                                <div className="flex flex-wrap gap-6 text-white/90">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        <span className="font-medium">{dateInfo.full}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5" />
                                        <span className="font-medium">{event.tempat}</span>
                                    </div>
                                    {event.registrations_count !== undefined && (
                                        <div className="flex items-center gap-2">
                                            <Users className="w-5 h-5" />
                                            <span className="font-medium">{event.registrations_count} Terdaftar</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            
                            {/* Event Details */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-r from-[#579D3E] to-[#4a8535] rounded-xl flex items-center justify-center">
                                        <Info className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Tentang Event</h2>
                                </div>
                                
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {event.deskripsi}
                                    </p>
                                </div>
                            </div>

                            {/* Event Information Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                
                                {/* Date & Time */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex flex-col items-center justify-center text-white">
                                            <div className="text-xs font-medium">{dateInfo.month}</div>
                                            <div className="text-xl font-bold">{dateInfo.day}</div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Tanggal & Waktu</h3>
                                            <p className="text-gray-600">{dateInfo.full}</p>
                                            <p className="text-sm text-gray-500">{dateInfo.year}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                            <MapPin className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Lokasi</h3>
                                            <p className="text-gray-600">{event.tempat}</p>
                                            <p className="text-sm text-gray-500">Pastikan datang tepat waktu</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Participants */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                                            <Users className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Peserta Terdaftar</h3>
                                            <p className="text-2xl font-bold text-gray-900">{event.registrations_count || 0}</p>
                                            <p className="text-sm text-gray-500">orang telah mendaftar</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                                            <Clock className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Status Event</h3>
                                            <div className="mt-2">{statusInfo.badge}</div>
                                            <p className="text-sm text-gray-500 mt-1">{statusInfo.message}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Registration Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8">
                                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                        {statusInfo.canRegister ? 'Daftar Sekarang' : 'Informasi Registrasi'}
                                    </h3>

                                    {statusInfo.canRegister ? (
                                        <>
                                            {success && (
                                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                                                    <div className="flex items-center gap-3">
                                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                                        <span className="font-medium text-green-800">{success}</span>
                                                    </div>
                                                </div>
                                            )}

                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        <User className="w-4 h-4 inline mr-2" />
                                                        Nama Lengkap
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="nama"
                                                        value={form.nama}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="Masukkan nama lengkap"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#579D3E] focus:border-transparent transition-all duration-200"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        <Mail className="w-4 h-4 inline mr-2" />
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={form.email}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="nama@email.com"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#579D3E] focus:border-transparent transition-all duration-200"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        <Phone className="w-4 h-4 inline mr-2" />
                                                        Nomor Telepon
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="telepon"
                                                        value={form.telepon}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="08xxxxxxxxxx"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#579D3E] focus:border-transparent transition-all duration-200"
                                                    />
                                                </div>

                                                <button 
                                                    type="submit" 
                                                    disabled={isSubmitting}
                                                    className="w-full bg-gradient-to-r from-[#579D3E] to-[#4a8535] text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                            Mendaftar...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CheckCircle className="w-5 h-5" />
                                                            Daftar Event
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </>
                                    ) : (
                                        <div className="text-center p-6">
                                            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Registrasi Ditutup</h4>
                                            <p className="text-gray-600">{statusInfo.message}</p>
                                        </div>
                                    )}

                                    {/* Event Summary */}
                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        <h4 className="font-semibold text-gray-900 mb-4">Ringkasan Event</h4>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Tanggal:</span>
                                                <span className="font-medium">{dateInfo.full}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Lokasi:</span>
                                                <span className="font-medium">{event.tempat}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Peserta:</span>
                                                <span className="font-medium">{event.registrations_count || 0} orang</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Status:</span>
                                                <span className="font-medium">{event.status || 'Aktif'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
