"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="bg-[#f0f4f1] min-h-screen pb-32">
            {/* Admin Header */}
            <header className="bg-[#006546] text-white sticky top-0 z-50 px-6 py-4 shadow-lg">
                <div className="flex justify-between items-center max-w-md mx-auto w-full">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
                        <h1 className="font-lexend font-bold text-lg tracking-tight">Pharmacist Admin</h1>
                    </div>
                    <Link href="/" className="text-[10px] uppercase font-bold tracking-widest bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-all">
                        Exit
                    </Link>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-md mx-auto pt-6">
                {children}
            </main>

            {/* Admin Bottom Nav */}
            <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-outline-variant/20 px-6 pb-8 pt-3 z-50 shadow-[0_-8px_24px_rgba(0,0,0,0.05)]">
                <div className="flex justify-around items-center max-w-md mx-auto">
                    <Link 
                        href="/admin" 
                        className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
                            pathname === '/admin' ? 'text-[#006546] bg-[#d9e6da]/50' : 'text-on-surface-variant'
                        }`}
                    >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/admin' ? "'FILL' 1" : "'FILL' 0" }}>inventory</span>
                        <span className="text-[12px] font-bold">Orders</span>
                    </Link>
                    <Link 
                        href="/admin/medicines" 
                        className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
                            pathname === '/admin/medicines' ? 'text-[#006546] bg-[#d9e6da]/50' : 'text-on-surface-variant'
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
