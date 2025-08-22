<?php

namespace Database\Seeders;

use App\Models\Kategori;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class KategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan direktori storage/app/public/thumbnails ada
        if (!Storage::disk('public')->exists('thumbnails')) {
            Storage::disk('public')->makeDirectory('thumbnails');
        }

        $kategoris = [
            [
                'nama' => 'Daur Ulang Plastik',
                'thumbnail' => $this->createDummyImage('daur-ulang-plastik.jpg', 'Daur Ulang Plastik')
            ],
            [
                'nama' => 'Daur Ulang Kertas',
                'thumbnail' => $this->createDummyImage('daur-ulang-kertas.jpg', 'Daur Ulang Kertas')
            ],
            [
                'nama' => 'Daur Ulang Logam',
                'thumbnail' => $this->createDummyImage('daur-ulang-logam.jpg', 'Daur Ulang Logam')
            ],
            [
                'nama' => 'Daur Ulang Kain',
                'thumbnail' => $this->createDummyImage('daur-ulang-kain.jpg', 'Daur Ulang Kain')
            ],
        ];

        foreach ($kategoris as $kategori) {
            Kategori::create($kategori);
        }
    }

    /**
     * Create a dummy image for testing
     */
    private function createDummyImage($filename, $text)
    {
        // Create a simple colored rectangle as placeholder
        $width = 300;
        $height = 200;
        
        // Create image
        $image = imagecreate($width, $height);
        
        // Colors
        $background = imagecolorallocate($image, 240, 240, 240);
        $textColor = imagecolorallocate($image, 100, 100, 100);
        $borderColor = imagecolorallocate($image, 200, 200, 200);
        
        // Fill background
        imagefill($image, 0, 0, $background);
        
        // Add border
        imagerectangle($image, 0, 0, $width-1, $height-1, $borderColor);
        
        // Add text using imagestring (built-in font)
        imagestring($image, 3, ($width - strlen($text) * 10) / 2, ($height - 15) / 2, $text, $textColor);
        
        // Save to storage
        $path = 'thumbnails/' . $filename;
        $fullPath = storage_path('app/public/' . $path);
        
        // Create directory if it doesn't exist
        $directory = dirname($fullPath);
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }
        
        imagejpeg($image, $fullPath, 90);
        imagedestroy($image);
        
        return $path;
    }
}
