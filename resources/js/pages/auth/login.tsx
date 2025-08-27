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
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8">
            <Head title="Log in" />

            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#579D3E] opacity-10 sm:-top-40 sm:-right-40 sm:h-80 sm:w-80"></div>
                <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#579D3E] opacity-10 sm:-bottom-40 sm:-left-40 sm:h-80 sm:w-80"></div>
            </div>

            <div
                className={`relative z-10 w-full max-w-sm transition-all duration-1000 sm:max-w-md ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
            >
                {/* Logo and Title */}
                <div className="mb-6 text-center sm:mb-8">
                    <div className="mb-4 p-2 sm:mb-6 sm:p-3">
                        <img
                            src="/logo_mauk.png"
                            alt="MAK-PIN Logo"
                            className="mx-auto h-16 w-16 rounded-3xl border-4 border-[#579D3E] p-2 shadow-lg sm:h-20 sm:w-20"
                        />
                    </div>
                    <h1 className="mb-2 text-2xl font-bold text-black sm:text-3xl">
                        Welcome to <span className="text-[#579D3E]">MAK-PIN</span>
                    </h1>
                    <p className="text-sm text-gray-600 sm:text-base">Masuk ke akun Anda untuk melanjutkan</p>
                </div>

                {/* Login Form */}
                <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-xl sm:p-8">
                    {status && (
                        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-center text-sm font-medium text-[#579D3E] sm:mb-6 sm:p-4">
                            {status}
                        </div>
                    )}

                    <form className="flex flex-col gap-4 sm:gap-6" onSubmit={submit}>
                        <div className="grid gap-4 sm:gap-6">
                            <div className="grid gap-2 sm:gap-3">
                                <Label htmlFor="email" className="text-sm font-medium text-black sm:text-base">
                                    Email Address
                                </Label>
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
                                    className="focus:ring-opacity-20 rounded-xl border-2 border-gray-300 px-3 py-2 text-sm transition-all duration-300 focus:border-[#579D3E] focus:ring-2 focus:ring-[#579D3E] sm:px-4 sm:py-3 sm:text-base"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2 sm:gap-3">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-sm font-medium text-black sm:text-base">
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={route('password.request')}
                                            className="text-sm text-[#579D3E] transition-colors hover:text-[#456F32]"
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
                                    className="focus:ring-opacity-20 rounded-xl border-2 border-gray-300 px-4 py-3 transition-all duration-300 focus:border-[#579D3E] focus:ring-2 focus:ring-[#579D3E]"
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
                                    className="border-2 border-gray-300 data-[state=checked]:border-[#579D3E] data-[state=checked]:bg-[#579D3E]"
                                />
                                <Label htmlFor="remember" className="text-gray-700">
                                    Ingat saya
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full rounded-xl border-2 border-[#579D3E] bg-[#579D3E] px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-[#456F32] hover:bg-[#456F32]"
                                tabIndex={4}
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Masuk
                            </Button>
                        </div>

                        <div className="text-center text-sm text-gray-600">
                            Belum punya akun?{' '}
                            <TextLink
                                href={route('register')}
                                tabIndex={5}
                                className="font-medium text-[#579D3E] transition-colors hover:text-[#456F32]"
                            >
                                Daftar sekarang
                            </TextLink>
                        </div>
                    </form>
                </div>

                {/* Footer tanpa navigasi */}
                <div className="mt-8 text-center text-sm text-gray-500">© 2025 MAK-PIN. All rights reserved.</div>
            </div>
        </div>
    );
}
