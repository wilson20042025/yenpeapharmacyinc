"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        // Initial session check
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            
            if (!session && pathname !== '/admin/login') {
                router.push('/admin/login');
            } else {
                setIsLoading(false);
            }
        };

        checkSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (!session && pathname !== '/admin/login') {
                router.push('/admin/login');
            }
            if (session && pathname === '/admin/login') {
                router.push('/admin');
            }
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [pathname, router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    // Don't protect the login page from itself
    const isLoginPage = pathname === '/admin/login';

    if (isLoading && !isLoginPage) {
        return (
            <div className="min-h-screen bg-[#f0f4f1] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-[#006546]/20 border-t-[#006546] rounded-full animate-spin"></div>
                    <span className="text-[#006546]/60 font-bold text-xs uppercase tracking-widest">Verifying Admin...</span>
                </div>
            </div>
        );
    }

    // Header component
    const Header = () => (
        <header className="bg-[#006546] text-white sticky top-0 z-50 px-6 py-4 shadow-lg">
            <div className="flex justify-between items-center max-w-md mx-auto w-full">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
                    <h1 className="font-lexend font-bold text-lg tracking-tight">Pharmacist Admin</h1>
                </div>
                <div className="flex items-center gap-3">
                    {session && (
                        <button 
                            onClick={handleSignOut}
                            className="text-[10px] uppercase font-bold tracking-widest bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-all flex items-center gap-1.5"
                        >
                            Sign Out
                        </button>
                    )}
                    <Link href="/" className="text-[10px] uppercase font-bold tracking-widest bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/20 transition-all border border-white/10">
                        Store
                    </Link>
                </div>
            </div>
        </header>
    );

    // If it's the login page, just render it (possibly with a minimal wrapper)
    if (isLoginPage) {
        return (
            <div className="bg-[#f0f4f1] min-h-screen">
                <header className="bg-[#006546] text-white px-6 py-4 shadow-lg">
                    <div className="flex justify-center items-center max-w-md mx-auto w-full">
                         <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
                            <h1 className="font-lexend font-bold text-lg tracking-tight">Admin Portal</h1>
                        </div>
                    </div>
                </header>
                <main className="max-w-md mx-auto py-12">
                    {children}
                </main>
            </div>
        );
    }

    return (
        <div className="bg-[#f0f4f1] min-h-screen pb-32">
            <Header />

            {/* Main Content Area */}
            <main className="max-w-md mx-auto pt-6 px-6">
                {children}
            </main>

            {/* Admin Bottom Nav */}
            <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-outline-variant/20 px-6 pb-8 pt-3 z-50 shadow-[0_-8px_24px_rgba(0,0,0,0.05)]">
                <div className="flex justify-around items-center max-w-md mx-auto">
                    <Link 
                        href="/admin" 
                        className={`flex flex-col items-center gap-1 p-2 px-4 rounded-2xl transition-all ${
                            pathname === '/admin' ? 'text-[#006546] bg-[#006546]/10' : 'text-on-surface-variant/60'
                        }`}
                    >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/admin' ? "'FILL' 1" : "'FILL' 0" }}>inventory</span>
                        <span className="text-[12px] font-bold">Orders</span>
                    </Link>
                    <Link 
                        href="/admin/medicines" 
                        className={`flex flex-col items-center gap-1 p-2 px-4 rounded-2xl transition-all ${
                            pathname === '/admin/medicines' ? 'text-[#006546] bg-[#006546]/10' : 'text-on-surface-variant/60'
                        }`}
                    >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/admin/medicines' ? "'FILL' 1" : "'FILL' 0" }}>pill</span>
                        <span className="text-[12px] font-bold">Stock</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
