import React from 'react';
import Link from 'next/link';

const TopAppBar: React.FC = () => {
    return (
        <header className="bg-[#f9f9f9]/90 backdrop-blur-md fixed top-0 w-full h-20 z-50 border-b border-outline-variant/10">
            <div className="flex justify-between items-center px-6 w-full max-w-7xl mx-auto h-full">
                <Link href="/" className="flex items-center gap-3 active:scale-95 transition-all">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                    </div>
                    <h1 className="font-lexend text-xl font-extrabold text-primary tracking-tight">Yenpea Group Inc.</h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="font-bold text-on-surface hover:text-primary transition-colors">Home</Link>
                    <Link href="/search" className="font-bold text-on-surface hover:text-primary transition-colors">Search</Link>
                    <Link href="/order" className="font-bold text-on-surface hover:text-primary transition-colors">My Orders</Link>
                    <Link href="/find" className="font-bold text-on-surface hover:text-primary transition-colors">Find Pharmacy</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <a href="tel:0773678742" className="bg-primary/10 text-primary font-black px-6 py-3 rounded-2xl active:scale-95 transition-all flex items-center gap-2 text-sm uppercase tracking-wider">
                        <span className="material-symbols-outlined text-lg">call</span>
                        <span className="hidden sm:inline">Emergency Help</span>
                        <span className="sm:hidden">Call</span>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default TopAppBar;
