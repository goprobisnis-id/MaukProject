<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Produk;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kategoris = Kategori::all();
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
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'thumbnail' => 'required|image'
        ]);

        if($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        Kategori::create($validated);

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
            'thumbnail' => 'required|image'
        ]);

        if($request->hasFile('thumbnail')) {
            if($kategori->thumbnail) {
                Storage::disl('public')->delete($kategori->thumbnail);
            } 
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails');
        } else {
            unset($validated['thumbnail']);
        }

        $kategori->update($validated);

        return redirect()->route('kategori.index')->with('success', 'Kategori Berhasil Diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kategori $kategori)
    {
        if($kategori->thumbnail) {
            Storage::disk('public')->delete($kategori->thumbnail);
        }

        $kategori->delete();

        return redirect()->route('kategori.index')->with('success', 'Kategori Berhasil Dihapus');
    }
}
