<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Services\NotificationService;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getNotifications()
    {
        $notifications = NotificationService::getRecentNotifications(10);
        $unreadCount = NotificationService::getUnreadCount();
        
        return response()->json([
            'notifications' => $notifications,
            'unread_count' => $unreadCount
        ]);
    }
    
    public function markAsRead($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->markAsRead();
        
        return response()->json(['success' => true]);
    }
    
    public function markAllAsRead()
    {
        NotificationService::markAllAsRead();
        
        return response()->json(['success' => true]);
    }
    
    public function deleteNotification($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->delete();
        
        return response()->json(['success' => true]);
    }
}
