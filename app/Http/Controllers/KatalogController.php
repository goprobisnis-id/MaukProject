<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Produk;
use App\Models\Kategori;
use Illuminate\Http\Request;

class KatalogController extends Controller
{
    public function index() {
        $kategoris = Kategori::all();
        $newestProducts = Produk::orderBy('created_at', 'desc')->limit(3)->get();
        $terlarisProducts = Produk::orderBy('jumlah_pembelian', 'desc')->limit(3)->get();
        return Inertia::render('front/katalog', [
            'kategoris' => $kategoris,
            'newestProducts' => $newestProducts,
            'terlarisProducts' => $terlarisProducts
        ]);
    }

    public function showProduk($id) {
        $produk = Produk::findOrFail($id);
        $produk->load(['kategori', 'images', 'sizes', 'colors']);
        $relatedProducts = Produk::where('kategori_id', $produk->kategori_id)
            ->where('id', '!=', $produk->id)
            ->limit(3)
            ->get();

        return Inertia::render('front/product-detail', [
            'produk' => $produk,
            'relatedProducts' => $relatedProducts
        ]);
    }
}
