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

    public function index(Request $request)
    {
        $query = Event::withCount('registrations');

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by date range
        if ($request->filled('date_start')) {
            $query->where('tanggal', '>=', $request->date_start);
        }
        if ($request->filled('date_end')) {
            $query->where('tanggal', '<=', $request->date_end);
        }

        // Filter by registration count
        if ($request->filled('registration_min')) {
            $query->has('registrations', '>=', $request->registration_min);
        }
        if ($request->filled('registration_max')) {
            $query->has('registrations', '<=', $request->registration_max);
        }

        // Sort
        $sortField = $request->input('sort_by', 'tanggal');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $events = $query->paginate(10)->withQueryString();
            
        return Inertia::render('admin/events/index', [
            'events' => $events,
            'filters' => $request->all(),
            'statusOptions' => $this->status_event
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
            'banner' => 'required|image|mimes:jpeg,png,jpg,gif',
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
            'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif',
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
        // Ambil maksimal 3 event untuk setiap status
        $ongoingEvents = Event::withCount('registrations')
            ->where('status', 'ongoing')
            ->orderBy('tanggal', 'asc')
            ->limit(3)
            ->get();
            
        $comingSoonEvents = Event::withCount('registrations')
            ->where('status', 'coming soon')
            ->orderBy('tanggal', 'asc')
            ->limit(3)
            ->get();
            
        $endedEvents = Event::withCount('registrations')
            ->where('status', 'ended')
            ->orderBy('tanggal', 'desc')
            ->limit(3)
            ->get();
            
        // Gabungkan semua events untuk kompatibilitas dengan frontend
        $events = $ongoingEvents->concat($comingSoonEvents)->concat($endedEvents);
        
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
 