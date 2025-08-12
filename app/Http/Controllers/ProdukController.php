<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Produk;
use App\Models\Kategori;
use Illuminate\Http\Request;

class ProdukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produks = Produk::with('kategori')->get();
        return Inertia::render('admin/produk/index', [
            'produks' => $produks
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $kategoris = Kategori::select('id', 'nama')->get();
        return Inertia::render('admin/produk/form', [
            'mode' => 'create',
            'kategoris' => $kategoris
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            \DB::beginTransaction();
            
            // Uncomment ini untuk debug
            \Log::info('Request Data:', $request->all());
            
            $validated = $request->validate([
                'nama_produk' => 'required|string|max:255',
                'harga' => 'required|numeric',
                'kategori_id' => 'required|exists:kategoris,id',
                'first_image' => 'nullable|image',
                'link_shopee' => 'nullable|string',
                'link_tokped' => 'nullable|string',
                'short_desc' => 'nullable|string|max:500',
                'long_desc' => 'nullable|string',
                'jumlah_pembelian' => 'required|integer|min:0',
                'image.*' => 'nullable|image',
                'size.*' => 'nullable|string|max:50',
                'color.*' => 'nullable|string|max:50',
                'hex_code.*' => 'nullable|string',
            ]);

            // Simpan produk
            $produk = Produk::create($validated);

            // Log untuk debug
            \Log::info('Produk created:', $produk->toArray());

            // Proses file dan relasi lainnya
            if ($request->hasFile('first_image')) {
                $path = $request->file('first_image')->store('produk_images', 'public');
                $produk->update(['first_image' => $path]);
            }

            // Simpan gambar tambahan
            if ($request->hasFile('image')) {
                foreach ($request->file('image') as $image) {
                    $path = $image->store('produk_images', 'public');
                    $produk->images()->create([
                        'image' => $path
                    ]);
                }
            }

            // Simpan ukuran
            if ($request->has('size')) {
                foreach ($request->size as $size) {
                    if (!empty($size)) {
                        $produk->sizes()->create(['size' => $size]);
                    }
                }
            }

            // Simpan warna
            if ($request->has('color')) {
                foreach ($request->color as $index => $color) {
                    if (!empty($color)) {
                        $produk->colors()->create([
                            'color_name' => $color,
                            'hex_code' => $request->hex_code[$index] ?? null
                        ]);
                    }
                }
            }

            \DB::commit();
            return redirect()->route('produk.index')
                ->with('success', 'Produk berhasil ditambahkan');
                
        } catch (\Exception $e) {
            \DB::rollback();
            \Log::error('Error saving product: ' . $e->getMessage());
            return back()
                ->withInput()
                ->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Produk $produk)
    {
        $produk->load('kategori', 'images', 'sizes', 'colors');
        return Inertia::render('admin/produk/show', [
            'produk' => $produk
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Produk $produk)
    {
        $kategoris = Kategori::select('id', 'nama')->get();
        $produk->load('images', 'sizes', 'colors');
        return Inertia::render('admin/produk/form', [
            'produk' => $produk,
            'mode' => 'edit',
            'kategoris' => $kategoris
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Produk $produk)
    {
        $validated = $request->validate([
            'nama_produk' => 'required|string|max:255',
            'harga' => 'required|numeric',
            'kategori_id' => 'required|exists:kategoris,id',
            'first_image' => 'nullable|image',
            'link_shopee' => 'nullable|url',
            'link_tokped' => 'nullable|url',
            'short_desc' => 'nullable|string|max:500',
            'long_desc' => 'nullable|string',
            'jumlah_pembelian' => 'required|integer|min:0',
            'image.*' => 'nullable|image',
            'size.*' => 'nullable|string|max:50',
            'color.*' => 'nullable|string|max:50',
        ]);

        if ($request->hasFile('first_image')) {
            if ($produk->first_image) {
                // Hapus gambar lama jika ada
                \Storage::disk('public')->delete($produk->first_image);
            }
            $validated['first_image'] = $request->file('first_image')->store('produk_images', 'public');
        }

        if($request->hasFile('image')) {    
            // Simpan gambar baru
            foreach ($request->file('image') as $image) {
                $produk->images()->create([
                    'produk_id' => $produk->id,
                    'image' => $image->store('produk_images', 'public'),
                ]);
            }
        }

        if ($request->has('size')) {
            // Simpan ukuran baru
            foreach ($request->input('size') as $size) {
                $produk->sizes()->create([
                    'produk_id' => $produk->id,
                    'size' => $size,
                ]);
            }
        }

        if ($request->has('color')) {
            // Simpan warna baru
            foreach ($request->input('color') as $i => $color) {
                $produk->colors()->create([
                    'produk_id' => $produk->id,
                    'color_name' => $color,
                    'hex_code' => $request->hex_code[$i] ?? null, // Default hex code, can be changed later
                ]);
            }
        }

        $produk->update($validated);

        // Update images, sizes, and colors as needed...

        return redirect()->route('admin.produk.index')->with('success', 'Produk Berhasil Diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Produk $produk)
    {
        // Hapus gambar utama jika ada
        if ($produk->first_image) {
            \Storage::disk('public')->delete($produk->first_image);
        }

        // Hapus semua images terkait
        foreach ($produk->images as $image) {
            \Storage::disk('public')->delete($image->image);
            $image->delete();
        }

        // Hapus semua sizes terkait
        $produk->sizes()->delete();

        // Hapus semua colors terkait
        $produk->colors()->delete();

        $produk->delete();

        return redirect()->route('admin.produk.index')->with('success', 'Produk Berhasil Dihapus');
    }
}
