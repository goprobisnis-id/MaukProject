import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import NavbarAdmin from '@/components/navbarAdmin';
import NotificationPopup from '@/components/NotificationPopup';
import { useForm, Link } from '@inertiajs/react';
import { User, Mail, Lock, Save, ArrowLeft, Eye, EyeOff, Shield } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

interface UserEditProps {
  user: User;
}

export default function UserEdit({ user }: UserEditProps) {
  const [notification, setNotification] = useState<{
    type: 'loading' | 'success' | 'error';
    message: string;
  } | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const { data, setData, put, processing, errors, reset } = useForm({
    name: user.name,
    email: user.email,
    password: '',
    password_confirmation: '',
  });

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setNotification({ type: 'loading', message: 'Memperbarui pengguna...' });

    put(`/admin/users/${user.id}`, {
      onSuccess: () => {
        setNotification({ type: 'success', message: 'Pengguna berhasil diperbarui!' });
        reset('password', 'password_confirmation');
      },
      onError: () => {
        setNotification({ type: 'error', message: 'Gagal memperbarui pengguna!' });
      }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <NavbarAdmin />
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        {/* Back Button */}
        <div className={`mb-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link href="/admin/users">
            <Button className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 hover:border-gray-300 rounded-lg px-4 py-2 transition-all duration-200 hover:shadow-md">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Daftar Pengguna
            </Button>
          </Link>
        </div>

        {/* Header Section */}
        <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8 mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-[#579D3E] rounded-xl shadow-lg">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Pengguna</h1>
              <p className="text-gray-600 mt-1">Perbarui informasi pengguna: {user.name}</p>
            </div>
          </div>

          {/* User Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2">Informasi Akun</h3>
              <div className="space-y-1 text-sm text-purple-700">
                <p>Terdaftar: {formatDate(user.created_at)}</p>
                <p>Diperbarui: {formatDate(user.updated_at)}</p>
                <p>ID Pengguna: #{user.id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="p-6 bg-gradient-to-r from-[#579D3E] to-[#4a8535]">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
              <User className="h-6 w-6" />
              <span>Form Edit Pengguna</span>
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 mr-2 text-[#579D3E]" />
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl shadow-sm transition-all duration-200 focus:ring-2 focus:ring-[#579D3E] focus:border-transparent ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Masukkan nama lengkap"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <span className="h-1 w-1 rounded-full bg-red-600 mr-2"></span>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 mr-2 text-[#579D3E]" />
                Email
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl shadow-sm transition-all duration-200 focus:ring-2 focus:ring-[#579D3E] focus:border-transparent ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Masukkan alamat email"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <span className="h-1 w-1 rounded-full bg-red-600 mr-2"></span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Lock className="h-4 w-4 mr-2 text-[#579D3E]" />
                Password Baru
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className={`w-full px-4 py-3 pr-12 border rounded-xl shadow-sm transition-all duration-200 focus:ring-2 focus:ring-[#579D3E] focus:border-transparent ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Masukkan password baru"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <span className="h-1 w-1 rounded-full bg-red-600 mr-2"></span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Password Confirmation Field */}
            <div>
              <label htmlFor="password_confirmation" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Lock className="h-4 w-4 mr-2 text-[#579D3E]" />
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showPasswordConfirmation ? 'text' : 'password'}
                  id="password_confirmation"
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl shadow-sm hover:border-gray-400 focus:ring-2 focus:ring-[#579D3E] focus:border-transparent transition-all duration-200"
                  placeholder="Konfirmasi password baru"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPasswordConfirmation ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <Button
                type="submit"
                disabled={processing}
                className="bg-[#579D3E] hover:bg-[#4a8535] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:transform-none"
              >
                <Save className="h-5 w-5" />
                <span>{processing ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
              </Button>
              
              <Link href="/admin/users">
                <Button
                  type="button"
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 hover:border-gray-300 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Batal</span>
                </Button>
              </Link>
            </div>
          </form>
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