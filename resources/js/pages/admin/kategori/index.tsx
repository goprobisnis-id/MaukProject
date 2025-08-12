import React from 'react';
// Table components will be styled manually
import { Button } from '@/components/ui/button';
import NavbarAdmin from '@/components/navbarAdmin';
import { useForm, Link } from '@inertiajs/react';
import { PlusCircle, Edit, Trash2, Grid3x3, Image, Sparkles, Tag } from 'lucide-react';

interface Kategori {
  id: number;
  nama: string;
  thumbnail: string;
}

interface KategoriProps {
  kategoris: Kategori[];
}

export default function KategoriIndex({kategoris}: KategoriProps) {

  const {delete:destroy} = useForm();

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus kategori ini?')){
            destroy(`/admin/kategori/${id}`);
        }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 animate-gradient-x">
      <NavbarAdmin/>
      
      {/* Animated Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-emerald-200 p-8 mb-8 transform animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <div className="animate-slide-in-left">
              <div className="flex items-center gap-4 mb-3">
                <div className="relative p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg animate-pulse-gentle">
                  <Grid3x3 className="h-8 w-8 text-white" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                    <Sparkles className="h-3 w-3 text-yellow-700" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Welcome to the Kategori Index Page
                  </h1>
                  <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 animate-width-expand"></div>
                </div>
              </div>
              <p className="text-gray-600 text-lg animate-fade-in delay-300">
                This is where you can manage categories.
              </p>
            </div>
            
            <div className="animate-slide-in-right">
              <Link href="/admin/kategori/create" className="inline-flex items-center group">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group">
                  <div className="flex items-center gap-3">
                    <PlusCircle className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500"/>
                    <span className="font-semibold">Tambah Kategori</span>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Animated Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 p-6 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up delay-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm mb-1">Total Kategori</p>
                  <p className="text-3xl font-bold animate-number-count">{kategoris.length}</p>
                </div>
                <div className="relative">
                  <Grid3x3 className="h-10 w-10 text-emerald-200 animate-float" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 p-6 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up delay-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm mb-1">Dengan Thumbnail</p>
                  <p className="text-3xl font-bold animate-number-count">
                    {kategoris.filter(k => k.thumbnail).length}
                  </p>
                </div>
                <div className="relative">
                  <Image className="h-10 w-10 text-teal-200 animate-float delay-100" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 p-6 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up delay-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm mb-1">Tanpa Thumbnail</p>
                  <p className="text-3xl font-bold animate-number-count">
                    {kategoris.filter(k => !k.thumbnail).length}
                  </p>
                </div>
                <div className="relative">
                  <Tag className="h-10 w-10 text-emerald-200 animate-float delay-200" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Table Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-emerald-200 overflow-hidden animate-fade-in-up delay-400">
          <div className="p-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 animate-shimmer"></div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
              <Grid3x3 className="h-6 w-6 animate-spin-slow" />
              Data Kategori
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
                  <th className="text-emerald-800 font-bold py-6 px-6 text-left text-lg">ID</th>
                  <th className="text-emerald-800 font-bold py-6 px-6 text-left text-lg">Name</th>
                  <th className="text-emerald-800 font-bold py-6 px-6 text-left text-lg">Thumbnail</th>
                  <th className="text-emerald-800 font-bold py-6 px-6 text-center text-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {kategoris.map((kategori, index) => (
                  <tr 
                    key={kategori.id} 
                    className="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 border-b border-emerald-100 group animate-fade-in-up"
                    style={{animationDelay: `${500 + index * 100}ms`}}
                  >
                    <td className="font-bold text-emerald-700 py-6 px-6">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                        <span className="text-emerald-700 font-bold">{kategori.id}</span>
                      </div>
                    </td>
                    <td className="font-semibold text-gray-800 py-6 px-6">
                      <div className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300">
                        <Tag className="h-5 w-5 text-emerald-600 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-lg">{kategori.nama}</span>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      {kategori.thumbnail ? (
                        <div className="flex justify-start">
                          <div className="relative group-hover:scale-110 transition-transform duration-300">
                            <img 
                              src={`/storage/${kategori.thumbnail}`} 
                              alt={kategori.nama}
                              className='w-20 h-20 object-cover rounded-2xl shadow-lg border-3 border-emerald-200 group-hover:border-emerald-400 transition-all duration-300'
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-start">
                          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl border-3 border-gray-300 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Image className="h-8 w-8 text-gray-400 group-hover:text-gray-500 transition-colors duration-300" />
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex justify-center gap-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        <Link href={`/admin/kategori/${kategori.id}/edit`}>
                          <Button 
                          onClick={() => console.log(`Edit ${kategori.id}`)}
                          className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 hover:from-emerald-200 hover:to-teal-200 border-2 border-emerald-200 hover:border-emerald-300 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group/button"
                          >
                            <Edit className="h-4 w-4 mr-2 group-hover/button:rotate-12 transition-transform duration-300" />
                            Edit
                          </Button>
                        </Link>
                        
                        <Button 
                          onClick={() => handleDelete(kategori.id)}
                          className="bg-gradient-to-r from-red-100 to-pink-100 text-red-700 hover:from-red-200 hover:to-pink-200 border-2 border-red-200 hover:border-red-300 rounded-xl px-4 py-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group/button"
                        >
                          <Trash2 className="h-4 w-4 mr-2 group-hover/button:rotate-12 transition-transform duration-300" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Animated Empty State */}
          {kategoris.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className="relative mb-6">
                <Grid3x3 className="h-20 w-20 text-emerald-300 mx-auto animate-float" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-emerald-500 animate-ping" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Belum ada kategori</h3>
              <p className="text-gray-500 mb-6 text-lg">Mulai dengan menambahkan kategori pertama Anda</p>
              <Link href="/admin/kategori/create">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                  <PlusCircle className="mr-3 h-5 w-5" />
                  Tambah Kategori Pertama
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes width-expand {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes number-count {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-gradient-x { animation: gradient-x 15s ease infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }
        .animate-width-expand { animation: width-expand 1s ease-out; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
        .animate-number-count { animation: number-count 0.8s ease-out; }
      `}</style>
    </div>
  );
}