import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import NavbarAdmin from '@/components/navbarAdmin';
import { Link, usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { ArrowLeft, Calendar, Users, Mail, Phone, User, MapPin } from 'lucide-react';

interface Event {
    id: number;
    nama_event: string;
    banner: string;
    tanggal: string;
    tempat: string;
    deskripsi: string;
}

interface Registration {
    id: number;
    nama: string;
    email: string;
    telepon: string;
    created_at: string;
}

interface PageProps extends InertiaPageProps {
    event: Event;
    registrations: Registration[];
}

export default function EventRegistrations() {
    const { event, registrations } = usePage<PageProps>().props;
    const [isVisible, setIsVisible] = useState(false);

    // Animation trigger
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Format date function
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <NavbarAdmin />
            
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                
                {/* Header Section */}
                <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="p-2 sm:p-3 bg-[#579D3E] rounded-xl shadow-lg">
                                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Registrasi Event</h1>
                                <p className="text-sm sm:text-base text-gray-600 mt-1">Data peserta yang mendaftar</p>
                            </div>
                        </div>
                        
                        <Link href="/admin/events">
                            <Button className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 hover:border-gray-300 rounded-xl px-4 sm:px-6 py-2 sm:py-3 transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 text-sm sm:text-base w-full sm:w-auto justify-center">
                                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span>Kembali ke Event</span>
                            </Button>
                        </Link>
                    </div>
                    
                    {/* Event Info */}
                    <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-[#579D3E] to-[#4a8535] rounded-xl">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                            {event.banner && (
                                <img 
                                    src={`/storage/${event.banner}`} 
                                    alt={event.nama_event}
                                    className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-lg border-2 border-white shadow-lg"
                                />
                            )}
                            <div className="flex-1 text-white">
                                <h2 className="text-xl lg:text-2xl font-bold mb-2">{event.nama_event}</h2>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-green-100">
                                        <Calendar className="h-4 w-4" />
                                        <span className="text-sm lg:text-base">{formatDate(event.tanggal)}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-green-100">
                                        <MapPin className="h-4 w-4" />
                                        <span className="text-sm lg:text-base">{event.tempat}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-green-100">
                                        <Users className="h-4 w-4" />
                                        <span className="text-sm lg:text-base">{registrations.length} peserta terdaftar</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="p-6 bg-gradient-to-r from-[#579D3E] to-[#4a8535]">
                        <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                            <Users className="h-6 w-6" />
                            <span>Data Peserta</span>
                        </h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-gray-700 font-semibold py-4 px-6 text-left">No</th>
                                    <th className="text-gray-700 font-semibold py-4 px-6 text-left">Nama Peserta</th>
                                    <th className="text-gray-700 font-semibold py-4 px-6 text-left">Email</th>
                                    <th className="text-gray-700 font-semibold py-4 px-6 text-left">Telepon</th>
                                    <th className="text-gray-700 font-semibold py-4 px-6 text-left">Waktu Daftar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.map((registration: Registration, index: number) => (
                                    <tr 
                                        key={registration.id} 
                                        className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 group"
                                    >
                                        <td className="py-4 px-6">
                                            <span className="text-gray-700 font-medium">{index + 1}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-[#579D3E] bg-opacity-10 rounded-lg">
                                                    <User className="h-4 w-4 text-[#579D3E]" />
                                                </div>
                                                <span className="text-gray-900 font-medium">{registration.nama}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-2">
                                                <Mail className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-900">{registration.email}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-2">
                                                <Phone className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-900">{registration.telepon}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-sm text-gray-600">{formatDateTime(registration.created_at)}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Empty State */}
                    {registrations.length === 0 && (
                        <div className="text-center py-16">
                            <div className="mb-6">
                                <Users className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Belum ada peserta</h3>
                                <p className="text-gray-500 mb-6">Belum ada yang mendaftar untuk event ini</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
