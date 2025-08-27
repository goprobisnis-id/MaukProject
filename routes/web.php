<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\KatalogController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\KategoriProductController;
use App\Http\Controllers\EventController;

Route::get('/', [WelcomeController::class, 'index'])->name('home');
Route::get('/katalog', [KatalogController::class, 'index'])->name('katalog');
Route::get('/products', [ProductsController::class, 'index'])->name('products.index');
Route::get('/kategori/{id}', [KategoriProductController::class, 'show'])->name('kategori.show');
Route::get('/products/{id}', [KatalogController::class, 'showProduk'])->name('products.detail');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $events = \App\Models\Event::all();
        return Inertia::render('dashboard', compact('events'));
    })->name('dashboard');
    

    Route::prefix('admin')->group(function() {
        Route::resource('kategori', KategoriController::class)->except('show');
        Route::resource('produk', ProdukController::class);
        Route::resource('events', EventController::class)->except('show')->names('admin.events');
        Route::get('events/{event}/registrations', [EventController::class, 'registrations'])->name('admin.events.registrations');
    });
});
    // User event routes
    Route::get('/events', [EventController::class, 'userIndex'])->name('events.index');
    Route::get('/events/{event}', [EventController::class, 'show'])->name('events.show');
    Route::post('/events/{event}/register', [EventController::class, 'register'])->name('events.register');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
