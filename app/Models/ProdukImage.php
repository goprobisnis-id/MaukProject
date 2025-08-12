<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProdukImage extends Model
{
    protected $table = 'produk_images';
    protected $fillable = [
        'produk_id',
        'image',
    ];

    public function produk()
    {
        return $this->belongsTo(Produk::class);
    }
}
