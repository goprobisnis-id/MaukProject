<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Kategori extends Model
{
    protected $fillable = [
        'nama',
        'thumbnail'
    ];

    protected $appends = [
        'thumbnail_url'
    ];

    public function produks() {
        return $this->hasMany(Produk::class);
    }

    public function getThumbnailUrlAttribute()
    {
        return $this->thumbnail ? asset('storage/' . $this->thumbnail) : null;
    }
}
