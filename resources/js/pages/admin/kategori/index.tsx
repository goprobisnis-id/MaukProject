import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import NavbarAdmin from '@/components/navbarAdmin';
import NotificationPopup from '@/components/NotificationPopup';
import Pagination from '@/components/Pagination';
import { useForm, Link } from '@inertiajs/react';
import { PlusCircle, Edit, Trash2, Package, Image, Grid } from 'lucide-react';

interface Kategori {
  id: number;
  nama: string;
  thumbnail: string;
}

interface PaginationData {
  current_page: number;
  data: Kategori[];
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

interface KategoriProps {
  kategoris: PaginationData;
}

export default function KategoriIndex({kategoris}: KategoriProps) {
  const [notification, setNotification] = useState<{
    type: 'loading' | 'success' | 'error';
    message: string;
  } | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  const {delete:destroy} = useForm();

  // Intersection Observer for animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus kategori ini?')){
      setNotification({ type: 'loading', message: 'Menghapus kategori...' });
      
      try {
        destroy(`/admin/kategori/${id}`, {
          onSuccess: () => {
            setNotification({ type: 'success', message: 'Kategori berhasil dihapus!' });
          },
          onError: () => {
            setNotification({ type: 'error', message: 'Gagal menghapus kategori!' });
          }
        });
      } catch (error) {
        setNotification({ type: 'error', message: 'Terjadi kesalahan!' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <NavbarAdmin/>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        {/* Header Section */}
        <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-[#579D3E] rounded-xl shadow-lg">
                <Grid className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manajemen Kategori</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Kelola kategori produk MAK-PIN</p>
              </div>
            </div>
            
            <Link href="/admin/kategori/create">
              <Button className="bg-[#579D3E] hover:bg-[#4a8535] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 text-sm sm:text-base w-full sm:w-auto justify-center">
                <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Tambah Kategori</span>
              </Button>
            </Link>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 mt-6 sm:mt-8">
            <div className="bg-gradient-to-r from-[#579D3E] to-[#4a8535] p-3 sm:p-6 rounded-xl text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-xs sm:text-sm mb-1">Total Kategori</p>
                  <p className="text-xl sm:text-3xl font-bold">{kategoris.total}</p>
                </div>
                <Package className="h-6 w-6 sm:h-10 sm:w-10 text-green-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 sm:p-6 rounded-xl text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-xs sm:text-sm mb-1">Dengan Thumbnail</p>
                  <p className="text-xl sm:text-3xl font-bold">
                    {kategoris.data.filter((k: Kategori) => k.thumbnail).length}
                  </p>
                </div>
                <Image className="h-10 w-10 text-blue-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm mb-1">Tanpa Thumbnail</p>
                  <p className="text-3xl font-bold">
                    {kategoris.data.filter((k: Kategori) => !k.thumbnail).length}
                  </p>
                </div>
                <Grid className="h-10 w-10 text-purple-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="p-6 bg-gradient-to-r from-[#579D3E] to-[#4a8535]">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
              <Grid className="h-6 w-6" />
              <span>Data Kategori</span>
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-gray-700 font-semibold py-4 px-6 text-left">Nama</th>
                  <th className="text-gray-700 font-semibold py-4 px-6 text-left">Thumbnail</th>
                  <th className="text-gray-700 font-semibold py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {kategoris.data.map((kategori: Kategori, index: number) => (
                  <tr 
                    key={kategori.id} 
                    className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <Package className="h-5 w-5 text-[#579D3E]" />
                        <span className="text-gray-900 font-medium">{kategori.nama}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {kategori.thumbnail ? (
                        <img 
                          src={`/storage/${kategori.thumbnail}`} 
                          alt={kategori.nama}
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
                        <Link href={`/admin/kategori/${kategori.id}/edit`}>
                          <Button className="bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200 hover:border-blue-300 rounded-lg px-4 py-2 transition-all duration-200 hover:shadow-md">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </Link>
                        
                        <Button 
                          onClick={() => handleDelete(kategori.id)}
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
          {kategoris.data.length === 0 && (
            <div className="text-center py-16">
              <div className="mb-6">
                <Grid className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Belum ada kategori</h3>
                <p className="text-gray-500 mb-6">Mulai dengan menambahkan kategori pertama</p>
                <Link href="/admin/kategori/create">
                  <Button className="bg-[#579D3E] hover:bg-[#4a8535] text-white px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
                    <PlusCircle className="mr-3 h-5 w-5" />
                    Tambah Kategori Pertama
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Pagination */}
          {kategoris.last_page > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination data={kategoris} />
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