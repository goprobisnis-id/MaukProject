import NavbarAdmin from '@/components/navbarAdmin';
import { Head, usePage } from '@inertiajs/react';
import { 
    Package, 
    FolderOpen, 
    Calendar, 
    Users, 
    TrendingUp, 
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Bell
} from 'lucide-react';

interface DashboardProps {
    stats?: {
        total_produk: number;
        total_kategori: number;
        total_event: number;
        total_registrasi: number;
        unread_notifications: number;
    };
    charts?: {
        monthly_produk: Array<{ month: string; count: number }>;
        monthly_event: Array<{ month: string; count: number }>;
        monthly_registrasi: Array<{ month: string; count: number }>;
        event_status: { ongoing: number; coming_soon: number; ended: number };
        monthly_revenue: Array<{ month: string; revenue: number }>;
    };
    data?: {
        popular_products: Array<{ nama: string; kategori: string; penjualan: number; harga: number }>;
        categories: Array<{ nama: string; total_produk: number }>;
        recent_events: Array<{ nama: string; tanggal: string; status: string; registrasi: number }>;
        recent_notifications: Array<{ title: string; message: string; created_at: string }>;
    };
    [key: string]: any; // Untuk properti dinamis lainnya
}

export default function Dashboard() {
    const { props } = usePage<DashboardProps>();
    
    const formatRupiah = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }: any) => (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
                    {trend && (
                        <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                            <span className="ml-1">{trendValue}</span>
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-2xl ${color}`}>
                    <Icon className="h-8 w-8 text-white" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <NavbarAdmin />
            <Head title="Dashboard Admin" />
            
            <div className="p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
                        <p className="text-gray-600">Selamat datang kembali! Berikut adalah ringkasan aktivitas terbaru sistem MAUK.</p>
                    </div>

                    {/* Stats Cards - Hanya tampil jika ada data */}
                    {props.stats && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <StatCard
                                title="Total Produk"
                                value={props.stats.total_produk}
                                icon={Package}
                                trend="up"
                                trendValue="+12% dari bulan lalu"
                                color="bg-gradient-to-br from-purple-500 to-purple-600"
                            />
                            <StatCard
                                title="Total Kategori"
                                value={props.stats.total_kategori}
                                icon={FolderOpen}
                                trend="up"
                                trendValue="+8% dari bulan lalu"
                                color="bg-gradient-to-br from-blue-500 to-blue-600"
                            />
                            <StatCard
                                title="Total Event"
                                value={props.stats.total_event}
                                icon={Calendar}
                                trend="up"
                                trendValue="+25% dari bulan lalu"
                                color="bg-gradient-to-br from-green-500 to-green-600"
                            />
                            <StatCard
                                title="Total Registrasi"
                                value={props.stats.total_registrasi}
                                icon={Users}
                                trend="up"
                                trendValue="+18% dari bulan lalu"
                                color="bg-gradient-to-br from-orange-500 to-orange-600"
                            />
                        </div>
                    )}

                    {/* Quick Overview Cards - Hanya tampil jika ada data stats */}
                    {props.stats && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            {/* Revenue Overview */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Estimasi Revenue</h3>
                                    <TrendingUp className="h-5 w-5 text-green-500" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">
                                    {formatRupiah(props.stats.total_produk * 150000)}
                                </div>
                                <p className="text-sm text-gray-600">Estimasi bulan ini</p>
                                <div className="mt-4 bg-green-50 rounded-lg p-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Target: {formatRupiah(15000000)}</span>
                                        <span className="text-green-600 font-medium">
                                            {Math.min(100, Math.round((props.stats.total_produk * 150000 / 15000000) * 100))}%
                                        </span>
                                    </div>
                                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                                            style={{ width: `${Math.min(100, Math.round((props.stats.total_produk * 150000 / 15000000) * 100))}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Event Status - Hanya tampil jika ada data event */}
                            {props.charts?.event_status && (
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Event</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                                <span className="text-sm text-gray-600">Buka Pendaftaran</span>
                                            </div>
                                            <span className="font-semibold text-gray-900">{props.charts.event_status.ongoing}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                                <span className="text-sm text-gray-600">Segera Dibuka</span>
                                            </div>
                                            <span className="font-semibold text-gray-900">{props.charts.event_status.coming_soon}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
                                                <span className="text-sm text-gray-600">Selesai</span>
                                            </div>
                                            <span className="font-semibold text-gray-900">{props.charts.event_status.ended}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Activity Summary */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Aktivitas Hari Ini</h3>
                                    <Activity className="h-5 w-5 text-blue-500" />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Produk Ditambah</p>
                                            <p className="text-xs text-gray-600">Hari ini</p>
                                        </div>
                                        <div className="text-2xl font-bold text-blue-600">{props.stats ? Math.floor(props.stats.total_produk / 10) : 0}</div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Registrasi Baru</p>
                                            <p className="text-xs text-gray-600">Hari ini</p>
                                        </div>
                                        <div className="text-2xl font-bold text-green-600">{props.stats ? Math.floor(props.stats.total_registrasi / 5) : 0}</div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Notifikasi Baru</p>
                                            <p className="text-xs text-gray-600">Belum dibaca</p>
                                        </div>
                                        <div className="text-2xl font-bold text-purple-600">{props.stats ? props.stats.unread_notifications : 0}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Charts Section - Hanya tampil jika ada data monthly */}
                    {props.charts && (props.charts.monthly_produk.length > 0 || props.charts.monthly_event.length > 0) && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Monthly Products Chart */}
                            {props.charts.monthly_produk.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Grafik Produk Bulanan</h3>
                                    <div className="space-y-3">
                                        {props.charts.monthly_produk.map((item, index) => (
                                            <div key={index} className="flex items-center">
                                                <div className="w-12 text-sm text-gray-600">{item.month}</div>
                                                <div className="flex-1 bg-gray-200 rounded-full h-4 mx-3">
                                                    <div 
                                                        className="bg-purple-500 h-4 rounded-full transition-all duration-300"
                                                        style={{ width: `${Math.min(100, (item.count / Math.max(...props.charts!.monthly_produk.map(p => p.count))) * 100)}%` }}
                                                    ></div>
                                                </div>
                                                <div className="w-8 text-sm text-gray-900 font-medium">{item.count}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Monthly Events Chart */}
                            {props.charts.monthly_event.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Grafik Event Bulanan</h3>
                                    <div className="space-y-3">
                                        {props.charts.monthly_event.map((item, index) => (
                                            <div key={index} className="flex items-center">
                                                <div className="w-12 text-sm text-gray-600">{item.month}</div>
                                                <div className="flex-1 bg-gray-200 rounded-full h-4 mx-3">
                                                    <div 
                                                        className="bg-green-500 h-4 rounded-full transition-all duration-300"
                                                        style={{ width: `${Math.min(100, (item.count / Math.max(...props.charts!.monthly_event.map(e => e.count))) * 100)}%` }}
                                                    ></div>
                                                </div>
                                                <div className="w-8 text-sm text-gray-900 font-medium">{item.count}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Data Tables */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Popular Products - Hanya tampil jika ada data */}
                        {props.data?.popular_products && props.data.popular_products.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Produk Terpopuler</h3>
                                <div className="space-y-4">
                                    {props.data.popular_products.map((product, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                                    <Package className="h-5 w-5 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{product.nama}</p>
                                                    <p className="text-sm text-gray-600">{product.kategori}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-green-600">{product.penjualan} terjual</p>
                                                <p className="text-sm text-gray-600">{formatRupiah(product.harga)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recent Events - Hanya tampil jika ada data */}
                        {props.data?.recent_events && props.data.recent_events.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Terbaru</h3>
                                <div className="space-y-4">
                                    {props.data.recent_events.map((event, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                                    <Calendar className="h-5 w-5 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{event.nama}</p>
                                                    <p className="text-sm text-gray-600">{new Date(event.tanggal).toLocaleDateString('id-ID')}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                                    event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                                                    event.status === 'coming soon' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {event.status === 'ongoing' ? 'Buka' : 
                                                     event.status === 'coming soon' ? 'Segera' : 'Selesai'}
                                                </span>
                                                <p className="text-sm text-gray-600 mt-1">{event.registrasi} peserta</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Recent Notifications - Hanya tampil jika ada data */}
                    {props.data?.recent_notifications && props.data.recent_notifications.length > 0 && (
                        <div className="mt-6">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Notifikasi Terbaru</h3>
                                    <Bell className="h-5 w-5 text-blue-500" />
                                </div>
                                <div className="space-y-3">
                                    {props.data.recent_notifications.slice(0, 5).map((notification, index) => (
                                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                                <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {new Date(notification.created_at).toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Empty State - Jika tidak ada data sama sekali */}
                    {!props.stats && !props.data && !props.charts && (
                        <div className="text-center py-16">
                            <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
                                <Activity className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dashboard Masih Kosong</h3>
                                <p className="text-gray-600 mb-6">
                                    Belum ada data untuk ditampilkan. Mulai dengan menambahkan kategori, produk, atau event baru.
                                </p>
                                <div className="flex justify-center space-x-4">
                                    <a href="/admin/kategori/create" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        Tambah Kategori
                                    </a>
                                    <a href="/admin/produk/create" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                        Tambah Produk
                                    </a>
                                    <a href="/admin/event/create" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                        Tambah Event
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
