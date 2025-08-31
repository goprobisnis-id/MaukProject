<?php
namespace App\Http\Controllers;
use App\Models\Event;
use App\Models\EventRegistration;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
class EventController extends Controller
{
    // Admin: List all events

    private $status_event = ['ongoing', 'coming soon', 'ended'];

    public function index()
    {
        $events = Event::withCount('registrations')
            ->orderBy('tanggal', 'desc')
            ->paginate(10); // Pagination 10 item per halaman
            
        return Inertia::render('admin/events/index', [
            'events' => $events
        ]);
    }
    
    // Admin: Show create event form
    public function create()
    {
        return Inertia::render('admin/events/form', [
            'statusOptions' => $this->status_event
        ]);
    }
    
    // Admin: Store new event
    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_event' => 'required|string|max:255',
            'banner' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'tanggal' => 'required|date',
            'tempat' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'status' => 'required|in:' . implode(',', $this->status_event),
        ]);

        // Simpan banner
        if ($request->hasFile('banner')) {
            $data['banner'] = $request->file('banner')->store('events', 'public');
        }

        $event = Event::create($data);
        
        // Create notification
        NotificationService::eventAdded($event->nama_event);
        
        return redirect()->route('events.index')->with('success', 'Event berhasil dibuat');
    }

    // Admin: Show edit event form
    public function edit(Event $event)
    {
        $eventData = [
            'id' => $event->id,
            'nama_event' => $event->nama_event,
            'banner' => $event->banner,
            'tanggal' => $event->tanggal,
            'tempat' => $event->tempat,
            'deskripsi' => $event->deskripsi,
            'banner_url' => $event->banner ? asset('storage/' . $event->banner) : null,
            'status' => $event->status
        ];
        
        return Inertia::render('admin/events/form', [
            'event' => $eventData,
            'statusOptions' => $this->status_event
        ]);
    }

    // Admin: Update event
    public function update(Request $request, Event $event)
    {
        $data = $request->validate([
            'nama_event' => 'required|string|max:255',
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'tanggal' => 'required|date',
            'tempat' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'status' => 'required|in:' . implode(',', $this->status_event)
        ]);

        // Hapus key banner dari data jika tidak ada file baru
        // Ini mencegah kolom banner diupdate dengan null
        if (!$request->hasFile('banner')) {
            unset($data['banner']);
        } else {
            // Update banner jika ada file baru
            // Hapus banner lama jika ada
            if ($event->banner && Storage::disk('public')->exists($event->banner)) {
                Storage::disk('public')->delete($event->banner);
            }
            $data['banner'] = $request->file('banner')->store('events', 'public');
        }

        $event->update($data);
        
        // Create notification
        NotificationService::eventUpdated($event->nama_event);
        
        return redirect()->route('events.index')->with('success', 'Event berhasil diupdate');
    }

    // Admin: Delete event
    public function destroy(Event $event)
    {
        $eventName = $event->nama_event;
        
        // Hapus banner jika ada
        if ($event->banner && Storage::disk('public')->exists($event->banner)) {
            Storage::disk('public')->delete($event->banner);
        }
        
        $event->delete();
        
        // Create notification
        NotificationService::eventDeleted($eventName);
        
        return redirect()->route('events.index')->with('success', 'Event berhasil dihapus');
    }

    // Admin: Show registrations for an event
    public function registrations(Event $event)
    {
        $registrations = $event->registrations()->orderBy('created_at', 'desc')->get();
        
        $eventData = [
            'id' => $event->id,
            'nama_event' => $event->nama_event,
            'banner' => $event->banner,
            'tanggal' => $event->tanggal,
            'tempat' => $event->tempat,
            'deskripsi' => $event->deskripsi,
            'status' => $event->status,
        ];
        
        return Inertia::render('admin/events/registrations', [
            'event' => $eventData,
            'registrations' => $registrations
        ]);
    }
    // User: List events
    public function userIndex()
    {
        $events = Event::withCount('registrations')
            ->orderBy('tanggal', 'desc')
            ->get();
        return Inertia::render('front/events/index', [
            'events' => $events
        ]);
    }
    // User: Show event detail
    public function show(Event $event)
    {
        $event->loadCount('registrations');
        
        return Inertia::render('front/events/show', [
            'event' => $event
        ]);
    }
    // User: Register for event
    public function register(Request $request, Event $event)
    {
    // Laravel route model binding ensures $event is an instance of Event or throws 404 automatically
        $data = $request->validate([
            'nama' => 'required|string',
            'email' => 'required|email',
            'telepon' => 'required|string',
        ]);
        $data['event_id'] = $event->getKey();
        EventRegistration::create($data);
        
        // Create notification for new registration
        NotificationService::eventRegistration($event->nama_event, $data['nama'], $data['email']);
        
        return redirect()->route('events.show', $event->getKey())->with('success', 'Registrasi berhasil!');
    }
}
