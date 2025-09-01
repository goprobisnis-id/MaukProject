<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Event extends Model
{
    use HasFactory;
    protected $fillable = [
        'nama_event',
        'banner',
        'tanggal',
        'tempat',
        'deskripsi',
        'status'
    ];

    protected $appends = ['banner_url'];

    public function registrations()
    {
        return $this->hasMany(EventRegistration::class);
    }

    public function getBannerUrlAttribute()
    {
        return $this->banner ? asset('storage/' . $this->banner) : null;
    }
}
