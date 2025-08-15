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
        return Inertia::render('welcome', [
            'produks' => $produks
        ]);
    }
}
