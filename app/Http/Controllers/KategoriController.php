<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Produk;
use App\Models\Kategori;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kategoris = Kategori::paginate(5);
        return Inertia::render('admin/kategori/index', [
            'kategoris' => $kategoris
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/kategori/form', [
            'mode' => 'create'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Debug: Log incoming request
        \Log::info('Store kategori request:', [
            'has_file' => $request->hasFile('thumbnail'),
            'file_info' => $request->hasFile('thumbnail') ? [
                'name' => $request->file('thumbnail')->getClientOriginalName(),
                'size' => $request->file('thumbnail')->getSize(),
                'mime' => $request->file('thumbnail')->getMimeType()
            ] : null,
            'nama' => $request->input('nama')
        ]);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif'
        ]);

        if($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $validated['thumbnail'] = $path;
            
            // Debug: Log storage result
            \Log::info('File stored at:', ['path' => $path]);
        }

        $kategori = Kategori::create($validated);
        
        // Debug: Log created kategori
        \Log::info('Kategori created:', [
            'id' => $kategori->id,
            'nama' => $kategori->nama,
            'thumbnail' => $kategori->thumbnail,
            'thumbnail_url' => $kategori->thumbnail_url
        ]);
        
        // Create notification
        NotificationService::kategoriAdded($kategori->nama);

        return redirect()->route('kategori.index')->with('success','Kategori Berhasil Ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Kategori $kategori)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kategori $kategori)
    {
        return Inertia::render('admin/kategori/form', [
            'kategori' => $kategori,
            'mode' => 'edit'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kategori $kategori)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if($request->hasFile('thumbnail')) {
            // Delete old thumbnail if exists
            if($kategori->thumbnail) {
                Storage::disk('public')->delete($kategori->thumbnail);
            } 
            // Store new thumbnail with same disk specification
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        } else {
            // Keep existing thumbnail
            unset($validated['thumbnail']);
        }

        $kategori->update($validated);
        
        // Create notification
        NotificationService::kategoriUpdated($kategori->nama);

        return redirect()->route('kategori.index')->with('success', 'Kategori Berhasil Diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kategori $kategori)
    {
        $kategoriName = $kategori->nama;
        
        if($kategori->thumbnail) {
            Storage::disk('public')->delete($kategori->thumbnail);
        }

        $kategori->delete();
        
        // Create notification
        NotificationService::kategoriDeleted($kategoriName);

        return redirect()->route('kategori.index')->with('success', 'Kategori Berhasil Dihapus');
    }
}
