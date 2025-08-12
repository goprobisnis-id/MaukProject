<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\KategoriController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

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
