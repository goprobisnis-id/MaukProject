import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import NavbarAdmin from '@/components/navbarAdmin';
import NotificationPopup from '@/components/NotificationPopup';
import Pagination from '@/components/Pagination';
import { useForm, Link, usePage, router } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { PlusCircle, Edit, Trash2, Calendar, Users, MapPin, Image, Eye, Filter, X } from 'lucide-react';

type Event = {
    id: number;
    nama_event: string;
    banner: string;
    banner_url?: string;
    tanggal: string;
    tempat: string;
    deskripsi: string;
    registrations_count: number;
    status: string;
    created_at: string;
};

interface PaginationData {
    current_page: number;
    data: Event[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: any[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface PageProps extends InertiaPageProps {
    events: PaginationData;
    filters: {
        status?: string;
        date_start?: string;
        date_end?: string;
        registration_min?: string;
        registration_max?: string;
    };
    statusOptions: string[];
}

export default function EventAdminIndex() {
    const { events, filters = {}, statusOptions = [] } = usePage<PageProps>().props;
    
    const [notification, setNotification] = useState<{
        type: 'loading' | 'success' | 'error';
        message: string;
    } | null>(null);

    const [isVisible, setIsVisible] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [filterForm, setFilterForm] = useState({
        status: filters.status || '',
        date_start: filters.date_start || '',
        date_end: filters.date_end || '',
        registration_min: filters.registration_min || '',
        registration_max: filters.registration_max || ''
    });

    const { delete: destroy } = useForm();

    // Intersection Observer for animations
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Handle filter changes
    const handleFilterChange = (key: string, value: string) => {
        setFilterForm(prev => ({ ...prev, [key]: value }));
    };

    // Apply filters
    const applyFilters = () => {
        const params = Object.fromEntries(
            Object.entries(filterForm).filter(([_, value]) => value !== '')
        );
        router.get('/admin/events', params, { preserveState: true });
    };

    // Clear filters
    const clearFilters = () => {
        setFilterForm({
            status: '',
            date_start: '',
            date_end: '',
            registration_min: '',
            registration_max: ''
        });
        router.get('/admin/events', {}, { preserveState: true });
    };

    // Check if any filter is active
    const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');

    const handleDelete = async (id: number) => {
        if (confirm('Yakin ingin menghapus event ini?')) {
            setNotification({ type: 'loading', message: 'Menghapus event...' });
            
            try {
                destroy(`/admin/events/${id}`, {
                    onSuccess: () => {
                        setNotification({ type: 'success', message: 'Event berhasil dihapus!' });
                    },
                    onError: () => {
                        setNotification({ type: 'error', message: 'Gagal menghapus event!' });
                    }
                });
            } catch (error) {
                setNotification({ type: 'error', message: 'Terjadi kesalahan!' });
            }
        }
    };

    // Format date function
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Stats calculations
    const totalEvents = events.total;
    const totalRegistrations = events.data.reduce((sum: number, event: Event) => sum + event.registrations_count, 0);
    const upcomingEvents = events.data.filter((event: Event) => new Date(event.tanggal) > new Date()).length;

    // Status badge function
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'ongoing':
                return {
                    label: 'Buka Pendaftaran',
                    className: 'bg-green-100 text-green-800 border border-green-200',
                    icon: '✅'
                };
            case 'coming soon':
                return {
                    label: 'Segera Dibuka',
                    className: 'bg-blue-100 text-blue-800 border border-blue-200',
                    icon: '📅'
                };
            case 'ended':
                return {
                    label: 'Event Selesai',
                    className: 'bg-gray-100 text-gray-800 border border-gray-200',
                    icon: '🏁'
                };
            default:
                return {
                    label: status || 'Unknown',
                    className: 'bg-gray-100 text-gray-800 border border-gray-200',
                    icon: '📝'
                };
        }
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
                                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manajemen Event</h1>
                                <p className="text-sm sm:text-base text-gray-600 mt-1">Kelola event dan acara MAK-PIN</p>
                            </div>
                        </div>
                        
                        <Link href="/admin/events/create">
                            <Button className="bg-[#579D3E] hover:bg-[#4a8535] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 text-sm sm:text-base w-full sm:w-auto justify-center">
                                <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span>Buat Event Baru</span>
                            </Button>
                        </Link>
                    </div>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-6 mt-6 sm:mt-8">
                        <div className="bg-gradient-to-r from-[#579D3E] to-[#4a8535] p-3 sm:p-6 rounded-xl text-white shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-xs sm:text-sm mb-1">Total Event</p>
                                    <p className="text-xl sm:text-3xl font-bold">{totalEvents}</p>
                                </div>
                                <Calendar className="h-6 w-6 sm:h-10 sm:w-10 text-green-200" />
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 sm:p-6 rounded-xl text-white shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-xs sm:text-sm mb-1">Total Registrasi</p>
                                    <p className="text-xl sm:text-3xl font-bold">{totalRegistrations}</p>
                                </div>
                                <Users className="h-6 w-6 sm:h-10 sm:w-10 text-blue-200" />
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 sm:p-6 rounded-xl text-white shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100 text-xs sm:text-sm mb-1">Event Mendatang</p>
                                    <p className="text-xl sm:text-3xl font-bold">{upcomingEvents}</p>
                                </div>
                                <Calendar className="h-6 w-6 sm:h-10 sm:w-10 text-purple-200" />
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 sm:p-6 rounded-xl text-white shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-orange-100 text-xs sm:text-sm mb-1">Halaman</p>
                                    <p className="text-xl sm:text-3xl font-bold">{events.current_page} / {events.last_page}</p>
                                </div>
                                <div className="text-orange-200 text-lg font-bold">📄</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 mb-6 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <Filter className="h-5 w-5 text-[#579D3E]" />
                                <h3 className="text-lg font-semibold text-gray-900">Filter Event</h3>
                                {hasActiveFilters && (
                                    <span className="bg-[#579D3E] text-white text-xs px-2 py-1 rounded-full">
                                        Filter Aktif
                                    </span>
                                )}
                            </div>
                            <Button
                                onClick={() => setShowFilters(!showFilters)}
                                className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm"
                            >
                                {showFilters ? 'Sembunyikan' : 'Tampilkan'} Filter
                            </Button>
                        </div>

                        {showFilters && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {/* Status Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status Event
                                        </label>
                                        <select
                                            value={filterForm.status}
                                            onChange={(e) => handleFilterChange('status', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#579D3E] focus:border-transparent"
                                        >
                                            <option value="">Semua Status</option>
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>
                                                    {status === 'ongoing' ? 'Buka Pendaftaran' :
                                                     status === 'coming soon' ? 'Segera Dibuka' :
                                                     status === 'ended' ? 'Event Selesai' : status}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Date Start Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Mulai
                                        </label>
                                        <input
                                            type="date"
                                            value={filterForm.date_start}
                                            onChange={(e) => handleFilterChange('date_start', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#579D3E] focus:border-transparent"
                                        />
                                    </div>

                                    {/* Date End Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Akhir
                                        </label>
                                        <input
                                            type="date"
                                            value={filterForm.date_end}
                                            onChange={(e) => handleFilterChange('date_end', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#579D3E] focus:border-transparent"
                                        />
                                    </div>

                                    {/* Registration Min Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Min. Registrasi
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={filterForm.registration_min}
                                            onChange={(e) => handleFilterChange('registration_min', e.target.value)}
                                            placeholder="Minimal registrasi"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#579D3E] focus:border-transparent"
                                        />
                                    </div>

                                    {/* Registration Max Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Max. Registrasi
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={filterForm.registration_max}
                                            onChange={(e) => handleFilterChange('registration_max', e.target.value)}
                                            placeholder="Maksimal registrasi"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#579D3E] focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Filter Actions */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                                    <Button
                                        onClick={applyFilters}
                                        className="bg-[#579D3E] hover:bg-[#4a8535] text-white px-6 py-2 rounded-lg flex items-center space-x-2"
                                    >
                                        <Filter className="h-4 w-4" />
                                        <span>Terapkan Filter</span>
                                    </Button>
                                    <Button
                                        onClick={clearFilters}
                                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-2 rounded-lg flex items-center space-x-2"
                                    >
                                        <X className="h-4 w-4" />
                                        <span>Hapus Filter</span>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Table Section */}
                <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="p-6 bg-gradient-to-r from-[#579D3E] to-[#4a8535]">
                        <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                            <Calendar className="h-6 w-6" />
                            <span>Data Event</span>
                        </h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-gray-700 font-semibold py-4 px-6 text-left">Event</th>
                                    <th className="text-gray-700 font-semibold py-4 px-6 text-left">Banner</th>
                                    <th className="text-gray-700 font-semibold py-4 px-6 text-left">Tanggal</th>
                                    <th className="text-gray-700 font-semibold py-4 px-6 text-left">Tempat</th>
                                    <th className="text-gray-700 font-semibold py-4 px-6 text-center">Status</th>
                                    <th className="text-gray-700 font-semibold py-4 px-6 text-center">Registrasi</th>
                                    <th className="text-gray-700 font-semibold py-4 px-6 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.data.map((event: Event) => (
                                    <tr 
                                        key={event.id} 
                                        className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 group"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="flex items-start space-x-3">
                                                <Calendar className="h-5 w-5 text-[#579D3E] mt-1" />
                                                <div>
                                                    <h3 className="text-gray-900 font-medium">{event.nama_event}</h3>
                                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{event.deskripsi}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {event.banner_url ? (
                                                <img 
                                                    src={event.banner_url} 
                                                    alt={event.nama_event}
                                                    className='w-16 h-16 object-cover rounded-lg shadow-md border border-gray-200'
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                                                    <Image className="h-6 w-6 text-gray-400" />
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-900">{formatDate(event.tanggal)}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-2">
                                                <MapPin className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-900">{event.tempat}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            {(() => {
                                                const statusConfig = getStatusBadge(event.status);
                                                return (
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig.className}`}>
                                                        <span className="mr-1">{statusConfig.icon}</span>
                                                        {statusConfig.label}
                                                    </span>
                                                );
                                            })()}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <Users className="h-4 w-4 text-blue-500" />
                                                <span className="text-sm font-medium text-blue-600">{event.registrations_count}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex justify-center space-x-2">
                                                <Link href={`/admin/events/${event.id}/registrations`}>
                                                    <Button className="bg-green-100 text-green-700 hover:bg-green-200 border border-green-200 hover:border-green-300 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md text-xs">
                                                        <Eye className="h-3 w-3 mr-1" />
                                                        Registrasi
                                                    </Button>
                                                </Link>
                                                
                                                <Link href={`/admin/events/${event.id}/edit`}>
                                                    <Button className="bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200 hover:border-blue-300 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md text-xs">
                                                        <Edit className="h-3 w-3 mr-1" />
                                                        Edit
                                                    </Button>
                                                </Link>
                                                
                                                <Button 
                                                    onClick={() => handleDelete(event.id)}
                                                    className="bg-red-100 text-red-700 hover:bg-red-200 border border-red-200 hover:border-red-300 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md text-xs"
                                                >
                                                    <Trash2 className="h-3 w-3 mr-1" />
                                                    Hapus
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Empty State */}
                    {events.data.length === 0 && (
                        <div className="text-center py-16">
                            <div className="mb-6">
                                <Calendar className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Belum ada event</h3>
                                <p className="text-gray-500 mb-6">Mulai dengan menambahkan event pertama</p>
                                <Link href="/admin/events/create">
                                    <Button className="bg-[#579D3E] hover:bg-[#4a8535] text-white px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
                                        <PlusCircle className="mr-3 h-5 w-5" />
                                        Buat Event Pertama
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                    
                    {/* Pagination */}
                    {events.last_page > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                                <div className="text-sm text-gray-600">
                                    Menampilkan <span className="font-medium">{events.from}</span> sampai{' '}
                                    <span className="font-medium">{events.to}</span> dari{' '}
                                    <span className="font-medium">{events.total}</span> event
                                </div>
                                <Pagination data={events} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Notification Popup */}
            <NotificationPopup
                isOpen={!!notification}
                type={notification?.type || 'loading'}
                title={notification?.message || ''}
                onClose={() => setNotification(null)}
            />
        </div>
    );
}
