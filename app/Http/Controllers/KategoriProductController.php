<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Produk;
use App\Models\Kategori;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class KategoriProductController extends Controller
{
    public function show($id)
    {
        $kategori = Kategori::findOrFail($id);
        
        $products = Produk::with(['kategori', 'images', 'sizes', 'colors'])
            ->where('kategori_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();
            
        return Inertia::render('front/kategori', [
            'kategori' => $kategori,
            'products' => $products
        ]);
    }
}
