"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Simple check for demo
        if (email === 'admin@example.com' && password === 'password') {
            router.push('/admin');
        } else {
            setError('Invalid credentials');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl shadow-[#006546]/10 p-10 border border-[#006546]/5">
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-16 h-16 bg-[#006546] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#006546]/30">
                        <span className="material-symbols-outlined text-white text-3xl">admin_panel_settings</span>
                    </div>
                    <h1 className="font-lexend font-bold text-3xl text-[#006546] mb-2 font-display">Admin Portal</h1>
                    <p className="text-secondary-foreground/60 text-sm font-medium tracking-tight">Please sign in to manage your pharmacy</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 flex items-center gap-3">
                            <span className="material-symbols-outlined text-sm">error</span>
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[12px] font-bold text-[#006546] uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-14 bg-[#f8faf9] border-2 border-transparent rounded-2xl px-12 text-[15px] font-medium transition-all focus:border-[#006546] focus:bg-white focus:outline-none"
                                placeholder="name@pharmacy.com"
                                required
                            />
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-[#006546] transition-colors">mail</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[12px] font-bold text-[#006546] uppercase tracking-widest ml-1">Password</label>
                        <div className="relative group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-14 bg-[#f8faf9] border-2 border-transparent rounded-2xl px-12 text-[15px] font-medium transition-all focus:border-[#006546] focus:bg-white focus:outline-none"
                                placeholder="••••••••"
                                required
                            />
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-[#006546] transition-colors">lock</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-[#006546] text-white rounded-2xl font-bold text-base shadow-lg shadow-[#006546]/20 hover:shadow-[#006546]/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-8"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span>Access Dashboard</span>
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </>
                        )}
                    </button>
                    
                    <div className="pt-4 text-center">
                        <Link href="/" className="text-[11px] font-bold text-[#006546]/60 hover:text-[#006546] uppercase tracking-widest transition-colors">
                            Back to Store
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

import Link from 'next/link';
