<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\Kategori;
use App\Models\Notification;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // Basic Stats
        $totalProduk = Produk::count();
        $totalKategori = Kategori::count();
        $totalEvent = Event::count();
        $totalRegistrasi = EventRegistration::count();
        
        // Recent Activities
        $recentNotifications = Notification::recent()->limit(5)->get();
        $unreadNotifications = Notification::unread()->count();
        
        // Monthly stats for charts
        $monthlyProduk = $this->getMonthlyData(Produk::class);
        $monthlyEvent = $this->getMonthlyData(Event::class);
        $monthlyRegistrasi = $this->getMonthlyData(EventRegistration::class);
        
        // Event status distribution
        $eventStatusData = [
            'ongoing' => Event::where('status', 'ongoing')->count(),
            'coming_soon' => Event::where('status', 'coming soon')->count(),
            'ended' => Event::where('status', 'ended')->count(),
        ];
        
        // Popular products (top 5)
        $popularProducts = Produk::with('kategori')
            ->orderBy('jumlah_pembelian', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($produk) {
                return [
                    'nama' => $produk->nama_produk,
                    'kategori' => $produk->kategori->nama,
                    'penjualan' => $produk->jumlah_pembelian,
                    'harga' => $produk->harga
                ];
            });
        
        // Categories with product count
        $kategoriesData = Kategori::withCount('produks')
            ->get()
            ->map(function ($kategori) {
                return [
                    'nama' => $kategori->nama,
                    'jumlah_produk' => $kategori->produks_count
                ];
            });
        
        // Recent events with registration count
        $recentEvents = Event::withCount('registrations')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($event) {
                return [
                    'nama' => $event->nama_event,
                    'tanggal' => $event->tanggal,
                    'status' => $event->status,
                    'registrasi' => $event->registrations_count
                ];
            });
        
        // Revenue estimation (mock data - could be real if you have transaction data)
        $monthlyRevenue = $this->calculateMonthlyRevenue();
        
        return Inertia::render('dashboard', [
            'stats' => [
                'total_produk' => $totalProduk,
                'total_kategori' => $totalKategori,
                'total_event' => $totalEvent,
                'total_registrasi' => $totalRegistrasi,
                'unread_notifications' => $unreadNotifications
            ],
            'charts' => [
                'monthly_produk' => $monthlyProduk,
                'monthly_event' => $monthlyEvent,
                'monthly_registrasi' => $monthlyRegistrasi,
                'event_status' => $eventStatusData,
                'monthly_revenue' => $monthlyRevenue
            ],
            'data' => [
                'popular_products' => $popularProducts,
                'categories' => $kategoriesData,
                'recent_events' => $recentEvents,
                'recent_notifications' => $recentNotifications
            ]
        ]);
    }
    
    private function getMonthlyData($model)
    {
        $data = [];
        
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $count = $model::whereYear('created_at', $month->year)
                          ->whereMonth('created_at', $month->month)
                          ->count();
            
            $data[] = [
                'month' => $month->format('M Y'),
                'count' => $count
            ];
        }
        
        return $data;
    }
    
    private function calculateMonthlyRevenue()
    {
        // Mock revenue calculation based on popular products
        $data = [];
        
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            
            // Simulate revenue calculation
            $baseRevenue = rand(5000000, 15000000); // 5-15 juta rupiah
            
            $data[] = [
                'month' => $month->format('M Y'),
                'revenue' => $baseRevenue
            ];
        }
        
        return $data;
    }
}
