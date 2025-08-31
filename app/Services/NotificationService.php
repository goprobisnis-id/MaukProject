<?php

namespace App\Services;

use App\Models\Notification;

class NotificationService
{
    public static function eventRegistration($eventName, $userName, $userEmail)
    {
        return Notification::createNotification(
            'event_registration',
            'Pendaftaran Event Baru',
            "Peserta baru {$userName} ({$userEmail}) telah mendaftar untuk event: {$eventName}",
            [
                'event_name' => $eventName,
                'user_name' => $userName,
                'user_email' => $userEmail
            ],
            'user-plus',
            'green'
        );
    }

    public static function kategoriAdded($kategoriName)
    {
        return Notification::createNotification(
            'kategori_added',
            'Kategori Baru Ditambahkan',
            "Kategori baru '{$kategoriName}' telah berhasil ditambahkan ke sistem",
            ['kategori_name' => $kategoriName],
            'folder-plus',
            'blue'
        );
    }

    public static function kategoriUpdated($kategoriName)
    {
        return Notification::createNotification(
            'kategori_updated',
            'Kategori Diperbarui',
            "Kategori '{$kategoriName}' telah berhasil diperbarui",
            ['kategori_name' => $kategoriName],
            'edit',
            'orange'
        );
    }

    public static function kategoriDeleted($kategoriName)
    {
        return Notification::createNotification(
            'kategori_deleted',
            'Kategori Dihapus',
            "Kategori '{$kategoriName}' telah dihapus dari sistem",
            ['kategori_name' => $kategoriName],
            'trash',
            'red'
        );
    }

    public static function produkAdded($produkName)
    {
        return Notification::createNotification(
            'produk_added',
            'Produk Baru Ditambahkan',
            "Produk baru '{$produkName}' telah berhasil ditambahkan ke katalog",
            ['produk_name' => $produkName],
            'package-plus',
            'purple'
        );
    }

    public static function produkUpdated($produkName)
    {
        return Notification::createNotification(
            'produk_updated',
            'Produk Diperbarui',
            "Produk '{$produkName}' telah berhasil diperbarui",
            ['produk_name' => $produkName],
            'edit',
            'orange'
        );
    }

    public static function produkDeleted($produkName)
    {
        return Notification::createNotification(
            'produk_deleted',
            'Produk Dihapus',
            "Produk '{$produkName}' telah dihapus dari katalog",
            ['produk_name' => $produkName],
            'trash',
            'red'
        );
    }

    public static function eventAdded($eventName)
    {
        return Notification::createNotification(
            'event_added',
            'Event Baru Ditambahkan',
            "Event baru '{$eventName}' telah berhasil ditambahkan",
            ['event_name' => $eventName],
            'calendar-plus',
            'indigo'
        );
    }

    public static function eventUpdated($eventName)
    {
        return Notification::createNotification(
            'event_updated',
            'Event Diperbarui',
            "Event '{$eventName}' telah berhasil diperbarui",
            ['event_name' => $eventName],
            'edit',
            'orange'
        );
    }

    public static function eventDeleted($eventName)
    {
        return Notification::createNotification(
            'event_deleted',
            'Event Dihapus',
            "Event '{$eventName}' telah dihapus dari sistem",
            ['event_name' => $eventName],
            'trash',
            'red'
        );
    }

    public static function getUnreadCount()
    {
        return Notification::unread()->count();
    }

    public static function getRecentNotifications($limit = 10)
    {
        return Notification::recent()->limit($limit)->get();
    }

    public static function markAllAsRead()
    {
        return Notification::unread()->update([
            'is_read' => true,
            'read_at' => now()
        ]);
    }
}
