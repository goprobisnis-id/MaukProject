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
        $produks = Produk::with('kategori')->paginate(10);
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
                'first_image' => 'required|image',
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
        try {
            \DB::beginTransaction();
            
            // Log untuk debug
            \Log::info('Update Request Data:', $request->all());
            \Log::info('Request method: ' . $request->method());
            \Log::info('Content Type: ' . $request->header('Content-Type'));
            
            // Coba ambil data dari input() juga
            \Log::info('Input Data:', $request->input());
            
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

            \Log::info('Validated Data:', $validated);

            // Update data produk utama
            $produk->update([
                'nama_produk' => $validated['nama_produk'],
                'harga' => $validated['harga'],
                'kategori_id' => $validated['kategori_id'],
                'link_shopee' => $validated['link_shopee'] ?? null,
                'link_tokped' => $validated['link_tokped'] ?? null,
                'short_desc' => $validated['short_desc'] ?? null,
                'long_desc' => $validated['long_desc'] ?? null,
                'jumlah_pembelian' => $validated['jumlah_pembelian'],
            ]);

            // Handle first image
            if ($request->hasFile('first_image')) {
                if ($produk->first_image) {
                    \Storage::disk('public')->delete($produk->first_image);
                }
                $path = $request->file('first_image')->store('produk_images', 'public');
                $produk->update(['first_image' => $path]);
            }

            // Handle additional images
            if ($request->hasFile('image')) {
                foreach ($request->file('image') as $image) {
                    $path = $image->store('produk_images', 'public');
                    $produk->images()->create([
                        'image' => $path
                    ]);
                }
            }

            // Handle sizes - hapus yang lama dan tambah yang baru
            if ($request->has('size')) {
                $produk->sizes()->delete(); // Hapus size yang lama
                $sizes = is_array($request->size) ? $request->size : [$request->size];
                foreach ($sizes as $size) {
                    if (!empty($size)) {
                        $produk->sizes()->create(['size' => $size]);
                    }
                }
            }

            // Handle colors - hapus yang lama dan tambah yang baru
            if ($request->has('color')) {
                $produk->colors()->delete(); // Hapus color yang lama
                $colors = is_array($request->color) ? $request->color : [$request->color];
                $hexCodes = is_array($request->hex_code) ? $request->hex_code : [$request->hex_code];
                
                foreach ($colors as $index => $color) {
                    if (!empty($color)) {
                        $produk->colors()->create([
                            'color_name' => $color,
                            'hex_code' => $hexCodes[$index] ?? null
                        ]);
                    }
                }
            }

            \DB::commit();
            return redirect()->route('produk.index')
                ->with('success', 'Produk berhasil diperbarui');
                
        } catch (\Illuminate\Validation\ValidationException $e) {
            \DB::rollback();
            \Log::error('Validation errors:', $e->errors());
            return back()
                ->withInput()
                ->withErrors($e->errors());
        } catch (\Exception $e) {
            \DB::rollback();
            \Log::error('Error updating product: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            return back()
                ->withInput()
                ->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
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

        return redirect()->route('produk.index')->with('success', 'Produk Berhasil Dihapus');
    }
}
