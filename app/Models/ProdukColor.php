<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProdukColor extends Model
{
    protected $table = 'produk_colors';
    protected $fillable = [
        'produk_id',
        'color_name',
        'hex_code'
    ];

    public function produk()
    {
        return $this->belongsTo(Produk::class);
    }
}
