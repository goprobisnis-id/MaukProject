<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\KatalogController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\KategoriProductController;

Route::get('/', [WelcomeController::class, 'index'])->name('home');
Route::get('/katalog', [KatalogController::class, 'index'])->name('katalog');
Route::get('/products', [ProductsController::class, 'index'])->name('products.index');
Route::get('/kategori/{id}', [KategoriProductController::class, 'show'])->name('kategori.show');
Route::get('/products/{id}', [KatalogController::class, 'showProduk'])->name('products.detail');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    

    Route::prefix('admin')->group(function() {
        Route::resource('kategori', KategoriController::class)->except('show');
        Route::resource('produk', ProdukController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
