<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\KatalogController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\KategoriProductController;

Route::get('/', [WelcomeController::class, 'index'])->name('home');
Route::get('/katalog', [KatalogController::class, 'index'])->name('katalog');
Route::get('/products', [ProductsController::class, 'index'])->name('products.index');
Route::get('/kategori/{id}', [KategoriProductController::class, 'show'])->name('kategori.show');
Route::get('/products/{id}', [KatalogController::class, 'showProduk'])->name('products.detail');
Route::get('/events', [EventController::class, 'userIndex'])->name('events.front');
Route::get('/events/{event}', [EventController::class, 'show'])->name('events.show');
Route::post('/events/{event}/register', [EventController::class, 'register'])->name('events.register');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Notification routes
    Route::get('api/notifications', [NotificationController::class, 'getNotifications'])->name('notifications.get');
    Route::post('api/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('api/notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.read-all');
    Route::delete('api/notifications/{id}', [NotificationController::class, 'deleteNotification'])->name('notifications.delete');

    Route::prefix('admin')->group(function() {
        Route::resource('kategori', KategoriController::class)->except('show');
        Route::resource('produk', ProdukController::class);
        Route::resource('events', EventController::class)->except('show'); 
        Route::get('events/{event}/registrations', [EventController::class, 'registrations'])->name('events.registrations');
        Route::resource('users', UserController::class)->only(['index', 'edit', 'update']);
    });
});
    // User event routes


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
