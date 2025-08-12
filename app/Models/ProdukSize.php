<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProdukSize extends Model
{
    protected $table = 'produk_sizes';
    protected $fillable = [
        'produk_id',
        'size',
    ];

    public function produk()
    {
        return $this->belongsTo(Produk::class);
    }
}
