<?php

namespace Database\Seeders;

use App\Models\Produk;
use App\Models\Kategori;
use App\Models\ProdukImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ProdukSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan direktori storage/app/public/produk_images ada
        if (!Storage::disk('public')->exists('produk_images')) {
            Storage::disk('public')->makeDirectory('produk_images');
        }

        $kategoris = Kategori::all();
        
        if ($kategoris->count() === 0) {
            $this->command->error('Tidak ada kategori yang ditemukan. Jalankan KategoriSeeder terlebih dahulu.');
            return;
        }

        // Data produk untuk setiap kategori (15 produk per kategori = 60 total)
        $produkData = [
            'Daur Ulang Plastik' => [
                'Tas Belanja dari Botol Plastik',
                'Pot Tanaman dari Plastik Bekas',
                'Tempat Pensil Botol Sampo',
                'Lampu Hias Botol Plastik',
                'Celengan dari Gallon Bekas',
                'Tempat Sampah Mini Plastik',
                'Vas Bunga Botol Plastik',
                'Tempat Alat Tulis Plastik',
                'Hiasan Dinding Tutup Botol',
                'Kursi Plastik Daur Ulang',
                'Rak Sepatu dari Botol',
                'Tempat Makan Burung Plastik',
                'Mainan Anak Botol Bekas',
                'Organizer Plastik Serbaguna',
                'Tempat Charger HP Plastik'
            ],
            'Daur Ulang Kertas' => [
                'Kotak Hadiah Kertas Koran',
                'Tempat Pensil Kertas Bekas',
                'Hiasan Dinding Paper Roll',
                'Bunga Kertas Koran',
                'Tas Belanja Kertas Majalah',
                'Tempat Tisu Kertas Bekas',
                'Lampu Meja Kertas Koran',
                'Pigura Foto Kertas Gulung',
                'Tempat Perhiasan Kertas',
                'Kotak Penyimpanan Kertas',
                'Hiasan Gantung Kertas Bekas',
                'Tempat Sampah Kertas Koran',
                'Origami Kertas Majalah',
                'Pembatas Buku Kertas Bekas',
                'Tempat Remote Kertas Gulung'
            ],
            'Daur Ulang Logam' => [
                'Tempat Pensil Kaleng Bekas',
                'Lampu Hias Kaleng Soda',
                'Pot Tanaman Kaleng Cat',
                'Tempat Lilin Kaleng Kecil',
                'Hiasan Dinding Tutup Kaleng',
                'Celengan Kaleng Susu',
                'Tempat Bumbu Kaleng Bekas',
                'Vas Bunga Kaleng Besar',
                'Tempat Alat Dapur Kaleng',
                'Hiasan Mobil Kaleng Bekas',
                'Tempat Charger Kaleng Kecil',
                'Rak Mini Kaleng Susun',
                'Tempat Kunci Kaleng Bekas',
                'Hiasan Taman Kaleng Cat',
                'Organizer Meja Kaleng Bekas'
            ],
            'Daur Ulang Kain' => [
                'Tas Tote Bag Kain Bekas',
                'Sarung Bantal Kain Perca',
                'Tempat Tisu Kain Flannel',
                'Boneka Kain Bekas',
                'Tempat HP Kain Jeans',
                'Hiasan Dinding Kain Perca',
                'Dompet Kain Bekas',
                'Tempat Kosmetik Kain',
                'Keset Kaki Kain Bekas',
                'Tempat Belanja Kain Goni',
                'Hiasan Mobil Kain Flannel',
                'Tempat Masker Kain Bekas',
                'Pembungkus Hadiah Kain',
                'Tempat Botol Minum Kain',
                'Organizer Kain Serbaguna'
            ]
        ];

        $produkCount = 0;
        foreach ($kategoris as $kategori) {
            $produkKategori = $produkData[$kategori->nama] ?? [];
            
            foreach ($produkKategori as $index => $namaProduk) {
                $produkCount++;
                
                $produk = Produk::create([
                    'nama_produk' => $namaProduk,
                    'harga' => rand(15000, 250000),
                    'kategori_id' => $kategori->id,
                    'first_image' => $this->createDummyProductImage($namaProduk, $produkCount),
                    'link_shopee' => 'https://shopee.co.id/search?keyword=' . urlencode($namaProduk),
                    'link_tokped' => 'https://www.tokopedia.com/search?st=product&q=' . urlencode($namaProduk),
                    'short_desc' => $this->generateShortDesc($namaProduk),
                    'long_desc' => $this->generateLongDesc($namaProduk),
                    'jumlah_pembelian' => rand(1, 150)
                ]);

                // Tambahkan 2-4 gambar tambahan untuk setiap produk
                $additionalImages = rand(2, 4);
                for ($i = 1; $i <= $additionalImages; $i++) {
                    ProdukImage::create([
                        'produk_id' => $produk->id,
                        'image' => $this->createDummyProductImage($namaProduk . " - View $i", $produkCount, $i)
                    ]);
                }
            }
        }

        $this->command->info("Berhasil membuat $produkCount produk dengan gambar tambahan.");
    }

    /**
     * Create a dummy product image
     */
    private function createDummyProductImage($productName, $index, $variation = 0)
    {
        $width = 400;
        $height = 400;
        
        // Create image
        $image = imagecreate($width, $height);
        
        // Random colors based on index
        $hue = ($index * 137.508) % 360; // Golden angle for color distribution
        $colors = $this->hslToRgb($hue, 30, 90);
        
        $background = imagecolorallocate($image, $colors[0], $colors[1], $colors[2]);
        $textColor = imagecolorallocate($image, 80, 80, 80);
        $borderColor = imagecolorallocate($image, 200, 200, 200);
        
        // Fill background
        imagefill($image, 0, 0, $background);
        
        // Add border
        imagerectangle($image, 0, 0, $width-1, $height-1, $borderColor);
        
        // Add product name
        $lines = explode(' ', $productName);
        $yPosition = $height / 2 - (count($lines) * 10);
        
        foreach ($lines as $line) {
            imagestring($image, 3, ($width - strlen($line) * 10) / 2, $yPosition, $line, $textColor);
            $yPosition += 20;
        }
        
        // Add price placeholder
        $priceText = 'Rp ' . number_format(rand(15000, 250000), 0, ',', '.');
        imagestring($image, 2, ($width - strlen($priceText) * 8) / 2, $height - 30, $priceText, $textColor);
        
        // Save to storage
        $filename = 'produk_' . $index . ($variation > 0 ? '_' . $variation : '') . '.jpg';
        $path = 'produk_images/' . $filename;
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

    /**
     * Convert HSL to RGB
     */
    private function hslToRgb($h, $s, $l)
    {
        $h /= 360;
        $s /= 100;
        $l /= 100;

        if ($s == 0) {
            $r = $g = $b = $l;
        } else {
            $hue2rgb = function($p, $q, $t) {
                if ($t < 0) $t += 1;
                if ($t > 1) $t -= 1;
                if ($t < 1/6) return $p + ($q - $p) * 6 * $t;
                if ($t < 1/2) return $q;
                if ($t < 2/3) return $p + ($q - $p) * (2/3 - $t) * 6;
                return $p;
            };

            $q = $l < 0.5 ? $l * (1 + $s) : $l + $s - $l * $s;
            $p = 2 * $l - $q;

            $r = $hue2rgb($p, $q, $h + 1/3);
            $g = $hue2rgb($p, $q, $h);
            $b = $hue2rgb($p, $q, $h - 1/3);
        }

        return [round($r * 255), round($g * 255), round($b * 255)];
    }

    /**
     * Generate short description
     */
    private function generateShortDesc($productName)
    {
        $descriptions = [
            'Produk ramah lingkungan hasil daur ulang sampah berkualitas tinggi.',
            'Dibuat dengan teknik upcycling inovatif dan desain menarik.',
            'Solusi kreatif mengurangi sampah dengan nilai ekonomis tinggi.',
            'Produk eco-friendly yang mendukung gaya hidup berkelanjutan.',
            'Hasil karya daur ulang yang fungsional dan bernilai estetis.'
        ];
        
        return $descriptions[array_rand($descriptions)];
    }

    /**
     * Generate long description
     */
    private function generateLongDesc($productName)
    {
        return "Produk $productName merupakan hasil inovasi daur ulang sampah yang mengubah limbah menjadi barang bernilai ekonomis tinggi. " .
               "Dibuat dengan teknik upcycling modern yang memperhatikan aspek kualitas, keamanan, dan estetika. Setiap produk melalui proses " .
               "pembersihan dan pengolahan yang higienis sehingga aman untuk digunakan dalam kehidupan sehari-hari. Dengan menggunakan produk ini, " .
               "Anda turut berkontribusi dalam mengurangi jumlah sampah dan mendukung ekonomi sirkular yang berkelanjutan. Desain yang kreatif " .
               "dan fungsional membuat produk ini tidak hanya ramah lingkungan tetapi juga menarik secara visual. Investasi terbaik untuk gaya " .
               "hidup eco-friendly yang mendukung kelestarian lingkungan untuk generasi mendatang.";
    }
}
