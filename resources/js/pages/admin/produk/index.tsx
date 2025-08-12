import React from 'react';
// Table components will be styled manually
import { Button } from '@/components/ui/button';
import NavbarAdmin from '@/components/navbarAdmin';
import { useForm, Link } from '@inertiajs/react';
import { PlusCircle, Edit, Trash2, Package, ShoppingCart, Tag, DollarSign } from 'lucide-react';

interface Produk {
  id: number;
  nama_produk: string;
  harga: number;
  first_image: string | null;
  kategori: { id: number; nama: string };
  jumlah_pembelian: number;
}

interface ProdukProps {
  produks: Produk[];
}

export default function ProdukIndex({ produks }: ProdukProps) {
  const { delete: destroy } = useForm();

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus produk ini?')) {
      destroy(`/admin/produk/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <NavbarAdmin />
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Package className="h-6 w-6 text-emerald-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Daftar Produk</h1>
              </div>
              <p className="text-gray-600 text-lg">Kelola data produk di sini.</p>
            </div>
            
            <Link href="/admin/produk/create" className="inline-flex items-center">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <PlusCircle className="mr-2 h-5 w-5" />
                Tambah Produk
              </Button>
            </Link>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Total Produk</p>
                  <p className="text-2xl font-bold">{produks.length}</p>
                </div>
                <Package className="h-8 w-8 text-emerald-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm">Total Penjualan</p>
                  <p className="text-2xl font-bold">
                    {produks.reduce((sum, produk) => sum + produk.jumlah_pembelian, 0)}
                  </p>
                </div>
                <ShoppingCart className="h-8 w-8 text-teal-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Rata-rata Harga</p>
                  <p className="text-2xl font-bold">
                    {produks.length > 0 
                      ? Math.round(produks.reduce((sum, produk) => sum + produk.harga, 0) / produks.length).toLocaleString('id-ID')
                      : 0
                    }
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-emerald-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-500">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Package className="h-5 w-5" />
              Data Produk
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-emerald-50 border-b-2 border-emerald-200">
                  <th className="text-emerald-800 font-semibold py-4 px-4 text-left">ID</th>
                  <th className="text-emerald-800 font-semibold py-4 px-4 text-left">Nama Produk</th>
                  <th className="text-emerald-800 font-semibold py-4 px-4 text-left">Kategori</th>
                  <th className="text-emerald-800 font-semibold py-4 px-4 text-left">Harga</th>
                  <th className="text-emerald-800 font-semibold py-4 px-4 text-left">Jumlah Pembelian</th>
                  <th className="text-emerald-800 font-semibold py-4 px-4 text-left">Gambar Utama</th>
                  <th className="text-emerald-800 font-semibold py-4 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {produks.map((produk) => (
                  <tr key={produk.id} className="hover:bg-emerald-50 transition-colors duration-200 border-b border-emerald-100">
                    <td className="font-medium text-emerald-700 py-4 px-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-lg">
                        {produk.id}
                      </div>
                    </td>
                    <td className="font-medium text-gray-800 py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-emerald-600" />
                        {produk.nama_produk}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-emerald-600" />
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                          {produk.kategori?.nama ?? '-'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 font-semibold text-emerald-700">
                        <DollarSign className="h-4 w-4" />
                        {produk.harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4 text-emerald-600" />
                        <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                          {produk.jumlah_pembelian}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {produk.first_image ? (
                        <div className="flex justify-center">
                          <img
                            src={`/storage/${produk.first_image}`}
                            alt={produk.nama_produk}
                            className="w-16 h-16 object-cover rounded-xl shadow-md border-2 border-emerald-100 hover:border-emerald-300 transition-colors"
                          />
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-xl border-2 border-gray-200 flex items-center justify-center">
                            <Package className="h-6 w-6 text-gray-400" />
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center gap-2">
                        <Link href={`/admin/produk/${produk.id}/edit`}>
                          <Button 
                            variant="secondary" 
                            size="sm"
                            className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-200 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(produk.id)}
                          className="bg-red-100 text-red-700 hover:bg-red-200 border border-red-200 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {produks.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada produk</h3>
              <p className="text-gray-500 mb-4">Mulai dengan menambahkan produk pertama Anda</p>
              <Link href="/admin/produk/create">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Tambah Produk Pertama
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}