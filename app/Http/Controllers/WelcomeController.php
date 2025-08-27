<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Produk;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function index() {
        $produks = Produk::with(['kategori', 'images', 'sizes', 'colors'])
                         ->orderBy('jumlah_pembelian', 'desc')
                         ->limit(3)
                         ->get();

        // Ambil event yang tanggal >= hari ini (upcoming)
        $today = date('Y-m-d');
        $events = \App\Models\Event::where('tanggal', '>=', $today)
            ->orderBy('tanggal', 'asc')
            ->get();

        return Inertia::render('front/welcome', [
            'produks' => $produks,
            'events' => $events,
        ]);
    }
}
