<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    protected $fillable = [
        'nama_produk',
        'harga',
        'first_image',
        'link_shopee',
        'link_tokped',
        'short_desc',
        'long_desc',
        'jumlah_pembelian',
        'kategori_id',
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }

    public function colors()
    {
        return $this->hasMany(ProdukColor::class);
    }

    public function images()
    {
        return $this->hasMany(ProdukImage::class);
    }

    public function sizes()
    {
        return $this->hasMany(ProdukSize::class);
    }
}
