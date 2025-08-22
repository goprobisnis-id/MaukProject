import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <Head title="Register" />
            
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-[#579D3E] opacity-10 rounded-full"></div>
                <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-[#579D3E] opacity-10 rounded-full"></div>
            </div>

            <div className={`relative z-10 w-full max-w-sm sm:max-w-md transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="mb-6">
                        <img 
                            src="/logo_mauk.png" 
                            alt="MAK-PIN Logo" 
                            className="w-20 h-20 mx-auto p-2 rounded-3xl border-4 border-[#579D3E] shadow-lg"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-black mb-2">
                        Bergabung dengan <span className="text-[#579D3E]">MAK-PIN</span>
                    </h1>
                    <p className="text-gray-600">Buat akun baru untuk memulai</p>
                </div>

                {/* Register Form */}
                <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8">
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="name" className="text-black font-medium">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={processing}
                                    placeholder="Nama lengkap Anda"
                                    className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-[#579D3E] focus:ring-2 focus:ring-[#579D3E] focus:ring-opacity-20 transition-all duration-300"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="email" className="text-black font-medium">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    disabled={processing}
                                    placeholder="email@example.com"
                                    className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-[#579D3E] focus:ring-2 focus:ring-[#579D3E] focus:ring-opacity-20 transition-all duration-300"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="password" className="text-black font-medium">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                    placeholder="Password"
                                    className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-[#579D3E] focus:ring-2 focus:ring-[#579D3E] focus:ring-opacity-20 transition-all duration-300"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="password_confirmation" className="text-black font-medium">Konfirmasi Password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    disabled={processing}
                                    placeholder="Konfirmasi password"
                                    className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-[#579D3E] focus:ring-2 focus:ring-[#579D3E] focus:ring-opacity-20 transition-all duration-300"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <Button 
                                type="submit" 
                                className="mt-4 w-full bg-[#579D3E] hover:bg-[#456F32] text-white font-bold py-3 px-6 rounded-xl border-2 border-[#579D3E] hover:border-[#456F32] transition-all duration-300 hover:scale-105 shadow-lg" 
                                tabIndex={5} 
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                Buat Akun
                            </Button>
                        </div>

                        <div className="text-center text-sm text-gray-600">
                            Sudah punya akun?{' '}
                            <TextLink 
                                href={route('login')} 
                                tabIndex={6}
                                className="text-[#579D3E] hover:text-[#456F32] font-medium transition-colors"
                            >
                                Masuk disini
                            </TextLink>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-sm text-gray-500">
                    © 2025 MAK-PIN. All rights reserved.
                </div>
            </div>
        </div>
    );
}
