import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <Head title="Log in" />
            
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-[#579D3E] opacity-10 rounded-full"></div>
                <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-[#579D3E] opacity-10 rounded-full"></div>
            </div>

            <div className={`relative z-10 w-full max-w-sm sm:max-w-md transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
                {/* Logo and Title */}
                <div className="text-center mb-6 sm:mb-8">
                    <div className="mb-4 sm:mb-6 p-2 sm:p-3">
                        <img 
                            src="/logo_mauk.png" 
                            alt="MAK-PIN Logo" 
                            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto p-2 rounded-3xl border-4 border-[#579D3E] shadow-lg"
                        />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                        Welcome to <span className="text-[#579D3E]">MAK-PIN</span>
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">Masuk ke akun Anda untuk melanjutkan</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-6 sm:p-8">
                    {status && (
                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 text-center text-sm font-medium text-[#579D3E] bg-green-50 border border-green-200 rounded-lg">
                            {status}
                        </div>
                    )}

                    <form className="flex flex-col gap-4 sm:gap-6" onSubmit={submit}>
                        <div className="grid gap-4 sm:gap-6">
                            <div className="grid gap-2 sm:gap-3">
                                <Label htmlFor="email" className="text-black font-medium text-sm sm:text-base">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@example.com"
                                    className="border-2 border-gray-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:border-[#579D3E] focus:ring-2 focus:ring-[#579D3E] focus:ring-opacity-20 transition-all duration-300 text-sm sm:text-base"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2 sm:gap-3">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-black font-medium text-sm sm:text-base">Password</Label>
                                    {canResetPassword && (
                                        <TextLink 
                                            href={route('password.request')} 
                                            className="text-sm text-[#579D3E] hover:text-[#456F32] transition-colors" 
                                            tabIndex={5}
                                        >
                                            Lupa password?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                    className="border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-[#579D3E] focus:ring-2 focus:ring-[#579D3E] focus:ring-opacity-20 transition-all duration-300"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onClick={() => setData('remember', !data.remember)}
                                    tabIndex={3}
                                    className="border-2 border-gray-300 data-[state=checked]:bg-[#579D3E] data-[state=checked]:border-[#579D3E]"
                                />
                                <Label htmlFor="remember" className="text-gray-700">Ingat saya</Label>
                            </div>

                            <Button 
                                type="submit" 
                                className="mt-4 w-full bg-[#579D3E] hover:bg-[#456F32] text-white font-bold py-3 px-6 rounded-xl border-2 border-[#579D3E] hover:border-[#456F32] transition-all duration-300 hover:scale-105 shadow-lg" 
                                tabIndex={4} 
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                Masuk
                            </Button>
                        </div>

                        <div className="text-center text-sm text-gray-600">
                            Belum punya akun?{' '}
                            <TextLink 
                                href={route('register')} 
                                tabIndex={5}
                                className="text-[#579D3E] hover:text-[#456F32] font-medium transition-colors"
                            >
                                Daftar sekarang
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
