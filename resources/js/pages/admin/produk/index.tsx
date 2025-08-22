import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import NavbarAdmin from '@/components/navbarAdmin';
import NotificationPopup from '@/components/NotificationPopup';
import Pagination from '@/components/Pagination';
import { useForm, Link } from '@inertiajs/react';
import { PlusCircle, Edit, Trash2, Package, ShoppingCart, Tag, DollarSign, Image, Search } from 'lucide-react';

interface Produk {
  id: number;
  nama_produk: string;
  harga: number;
  first_image: string | null;
  kategori: { id: number; nama: string };
  jumlah_pembelian: number;
}

interface PaginationData {
  current_page: number;
  data: Produk[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface ProdukProps {
  produks: PaginationData;
}

export default function ProdukIndex({ produks }: ProdukProps) {
  const [notification, setNotification] = useState<{
    type: 'loading' | 'success' | 'error';
    message: string;
  } | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Produk[]>(produks.data);

  const { delete: destroy } = useForm();

  // Animation trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Search functionality
  useEffect(() => {
    const filtered = produks.data.filter(produk =>
      produk.nama_produk.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produk.kategori.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, produks.data]);

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus produk ini?')) {
      setNotification({ type: 'loading', message: 'Menghapus produk...' });
      
      try {
        destroy(`/admin/produk/${id}`, {
          onSuccess: () => {
            setNotification({ type: 'success', message: 'Produk berhasil dihapus!' });
          },
          onError: () => {
            setNotification({ type: 'error', message: 'Gagal menghapus produk!' });
          }
        });
      } catch (error) {
        setNotification({ type: 'error', message: 'Terjadi kesalahan!' });
      }
    }
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <NavbarAdmin />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        {/* Header Section */}
        <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-[#579D3E] rounded-xl shadow-lg">
                <Package className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manajemen Produk</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Kelola produk MAK-PIN</p>
              </div>
            </div>
            
            <Link href="/admin/produk/create">
              <Button className="bg-[#579D3E] hover:bg-[#4a8535] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 text-sm sm:text-base w-full sm:w-auto justify-center">
                <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Tambah Produk</span>
              </Button>
            </Link>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-6 sm:mt-8">
            <div className="bg-gradient-to-r from-[#579D3E] to-[#4a8535] p-3 sm:p-6 rounded-xl text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-xs sm:text-sm mb-1">Total Produk</p>
                  <p className="text-xl sm:text-3xl font-bold">{produks.total}</p>
                </div>
                <Package className="h-6 w-6 sm:h-10 sm:w-10 text-green-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 sm:p-6 rounded-xl text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-xs sm:text-sm mb-1">Dengan Gambar</p>
                  <p className="text-xl sm:text-3xl font-bold">
                    {produks.data.filter((p: Produk) => p.first_image).length}
                  </p>
                </div>
                <Image className="h-10 w-10 text-blue-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm mb-1">Kategori Unik</p>
                  <p className="text-3xl font-bold">
                    {new Set(produks.data.map((p: Produk) => p.kategori.id)).size}
                  </p>
                </div>
                <Tag className="h-10 w-10 text-purple-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm mb-1">Rata-rata Harga</p>
                  <p className="text-xl font-bold">
                    {produks.data.length > 0 ?
                      formatRupiah(produks.data.reduce((acc: number, p: Produk) => acc + p.harga, 0) / produks.data.length).replace('IDR', 'Rp').replace(',00', '')
                      : 'Rp 0'
                    }
                  </p>
                </div>
                <DollarSign className="h-10 w-10 text-orange-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="p-4 sm:p-6 bg-gradient-to-r from-[#579D3E] to-[#4a8535]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2 sm:space-x-3">
                <Package className="h-5 w-5 sm:h-6 sm:w-6" />
                <span>Data Produk</span>
              </h2>
              
              {/* Search Bar */}
              <div className="relative w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4 sm:h-5 sm:w-5" />
                  <input
                    type="text"
                    placeholder="Cari produk atau kategori..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-80 pl-10 pr-4 py-2 border-2 border-white/20 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:border-white focus:bg-white/20 transition-all text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-gray-700 font-semibold py-3 sm:py-4 px-3 sm:px-6 text-left text-sm sm:text-base">Nama Produk</th>
                  <th className="text-gray-700 font-semibold py-3 sm:py-4 px-3 sm:px-6 text-left text-sm sm:text-base">Kategori</th>
                  <th className="text-gray-700 font-semibold py-3 sm:py-4 px-3 sm:px-6 text-left text-sm sm:text-base">Harga</th>
                  <th className="text-gray-700 font-semibold py-3 sm:py-4 px-3 sm:px-6 text-left text-sm sm:text-base">Gambar</th>
                  <th className="text-gray-700 font-semibold py-3 sm:py-4 px-3 sm:px-6 text-center text-sm sm:text-base">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((produk: Produk, index: number) => (
                  <tr 
                    key={produk.id} 
                    className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 group"
                  >
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Package className="h-4 w-4 sm:h-5 sm:w-5 text-[#579D3E]" />
                        <div>
                          <span className="text-gray-900 font-medium block text-sm sm:text-base">{produk.nama_produk}</span>
                          <span className="text-xs text-gray-500">Pembelian: {produk.jumlah_pembelian}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Tag className="h-3 w-3 mr-1" />
                        {produk.kategori.nama}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-900 font-semibold">{formatRupiah(produk.harga)}</span>
                    </td>
                    <td className="py-4 px-6">
                      {produk.first_image ? (
                        <img 
                          src={`/storage/${produk.first_image}`} 
                          alt={produk.nama_produk}
                          className='w-16 h-16 object-cover rounded-lg shadow-md border border-gray-200'
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                          <Image className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center space-x-3">
                        <Link href={`/admin/produk/${produk.id}/edit`}>
                          <Button className="bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200 hover:border-blue-300 rounded-lg px-4 py-2 transition-all duration-200 hover:shadow-md">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </Link>
                        
                        <Button 
                          onClick={() => handleDelete(produk.id)}
                          className="bg-red-100 text-red-700 hover:bg-red-200 border border-red-200 hover:border-red-300 rounded-lg px-4 py-2 transition-all duration-200 hover:shadow-md"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty State */}
          {produks.data.length === 0 && (
            <div className="text-center py-16">
              <div className="mb-6">
                <Package className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Belum ada produk</h3>
                <p className="text-gray-500 mb-6">Mulai dengan menambahkan produk pertama</p>
                <Link href="/admin/produk/create">
                  <Button className="bg-[#579D3E] hover:bg-[#4a8535] text-white px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
                    <PlusCircle className="mr-3 h-5 w-5" />
                    Tambah Produk Pertama
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Pagination */}
          {produks.last_page > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination data={produks} />
            </div>
          )}
        </div>
      </div>

      {/* Notification Popup */}
      <NotificationPopup
        isOpen={!!notification}
        type={notification?.type || 'loading'}
        title={notification?.message || ''}
        onClose={() => setNotification(null)}
      />
    </div>
  );
}
