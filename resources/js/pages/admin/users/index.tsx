import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import NavbarAdmin from '@/components/navbarAdmin';
import NotificationPopup from '@/components/NotificationPopup';
import Pagination from '@/components/Pagination';
import { Link } from '@inertiajs/react';
import { Users, Edit, Mail, User, Shield, Clock } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

interface PaginationData {
  current_page: number;
  data: User[];
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

interface UserProps {
  users: PaginationData;
}

export default function UserIndex({ users }: UserProps) {
  const [notification, setNotification] = useState<{
    type: 'loading' | 'success' | 'error';
    message: string;
  } | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const verifiedUsers = users.data.filter(user => user.email_verified_at);
  const unverifiedUsers = users.data.filter(user => !user.email_verified_at);

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
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manajemen Pengguna</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Kelola akun pengguna sistem MAK-PIN</p>
              </div>
            </div>
          </div>
          
        </div>

        {/* Table Section */}
        <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="p-6 bg-gradient-to-r from-[#579D3E] to-[#4a8535]">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
              <Users className="h-6 w-6" />
              <span>Data Admin</span>
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-gray-700 font-semibold py-4 px-6 text-left">Nama</th>
                  <th className="text-gray-700 font-semibold py-4 px-6 text-left">Email</th>
                  <th className="text-gray-700 font-semibold py-4 px-6 text-left">Status</th>
                  <th className="text-gray-700 font-semibold py-4 px-6 text-left">Terdaftar</th>
                  <th className="text-gray-700 font-semibold py-4 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.data.map((user: User, index: number) => (
                  <tr 
                    key={user.id} 
                    className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#579D3E] rounded-full flex items-center justify-center shadow-md">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <span className="text-gray-900 font-medium block">{user.name}</span>
                          <span className="text-xs text-gray-500">ID: {user.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{user.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {user.email_verified_at ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          <Shield className="h-3 w-3 mr-1" />
                          Terverifikasi
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                          <Clock className="h-3 w-3 mr-1" />
                          Belum Verifikasi
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-600 text-sm">{formatDate(user.created_at)}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center">
                        <Link href={`/admin/users/${user.id}/edit`}>
                          <Button className="bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200 hover:border-blue-300 rounded-lg px-4 py-2 transition-all duration-200 hover:shadow-md">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty State */}
          {users.data.length === 0 && (
            <div className="text-center py-16">
              <div className="mb-6">
                <Users className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Belum ada pengguna</h3>
                <p className="text-gray-500 mb-6">Sistem belum memiliki pengguna terdaftar</p>
              </div>
            </div>
          )}

          {/* Pagination */}
          {users.last_page > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination data={users} />
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