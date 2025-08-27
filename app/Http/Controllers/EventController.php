<?php
namespace App\Http\Controllers;
use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Inertia\Inertia;
class EventController extends Controller
{
    // Admin: List all events
    public function index()
    {
        $events = Event::all();
        // dd($events);
        return Inertia::render('admin/events/index', [
            'events' => $events
        ]);
    }
    // Admin: Show create event form
    public function create()
    {
        return Inertia::render('admin/events/create');
    }
    // Admin: Store new event
    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_event' => 'required|string',
            'banner' => 'required|image',
            'tanggal' => 'required|date',
            'tempat' => 'required|string',
            'deskripsi' => 'required|string',
        ]);
        // Simpan banner
        $data['banner'] = $request->file('banner')->store('events', 'public');
        Event::create($data);
        return redirect()->route('admin.events.index')->with('success', 'Event berhasil dibuat');
    }
    // Admin: Show registrations for an event
    public function registrations(Event $event)
    {
        $registrations = $event->registrations;
        return Inertia::render('admin/events/registrations', compact('event', 'registrations'));
    }
    // User: List events
    public function userIndex()
    {
        $events = Event::all();
        return Inertia::render('events/index', compact('events'));
    }
    // User: Show event detail
    public function show(Event $event)
    {
        return Inertia::render('events/show', compact('event'));
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
    return redirect()->route('events.show', $event->getKey())->with('success', 'Registrasi berhasil!');
    }
}
