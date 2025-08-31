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

    public function registrations()
    {
        return $this->hasMany(EventRegistration::class);
    }
}
