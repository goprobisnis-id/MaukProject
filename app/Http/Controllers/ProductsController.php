<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Produk;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductsController extends Controller
{
    public function index() {
        $products = Produk::with(['kategori', 'images', 'sizes', 'colors'])
            ->orderBy('created_at', 'desc')
            ->get();
            
        return Inertia::render('front/products', [
            'products' => $products
        ]);
    }
}
