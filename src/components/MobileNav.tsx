import React from 'react';
import Link from 'next/link';

interface MobileNavProps {
    activeTab?: 'home' | 'search' | 'order' | 'help';
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab = 'home' }) => {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-4 bg-white/85 backdrop-blur-md rounded-t-[2rem] h-[80px] pb-safe shadow-[0_-12px_32px_rgba(0,101,70,0.08)]">
            <Link 
                href="/" 
                className={`flex flex-col items-center justify-center rounded-[1.5rem] px-6 py-2 active:scale-90 transition-all duration-300 ease-in-out ${
                    activeTab === 'home' ? 'bg-[#d9e6da] text-[#006546]' : 'text-[#3e4943]'
                }`}
            >
                <span className="material-symbols-outlined" data-icon="home" style={{ fontVariationSettings: activeTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}>home</span>
                <span className="font-['Lexend'] text-[12px] font-medium tracking-wide">Home</span>
            </Link>

            <Link 
                href="/search" 
                className={`flex flex-col items-center justify-center rounded-full px-4 py-2 active:scale-90 transition-all duration-300 ease-in-out ${
                    activeTab === 'search' ? 'bg-[#d9e6da] text-[#006546]' : 'text-[#3e4943] hover:bg-[#f3f3f4]'
                }`}
            >
                <span className="material-symbols-outlined" data-icon="search" style={{ fontVariationSettings: activeTab === 'search' ? "'FILL' 1" : "'FILL' 0" }}>search</span>
                <span className="font-['Lexend'] text-[12px] font-medium tracking-wide">Search</span>
            </Link>

            <Link 
                href="/order" 
                className={`flex flex-col items-center justify-center rounded-full px-4 py-2 active:scale-90 transition-all duration-300 ease-in-out ${
                    activeTab === 'order' ? 'bg-[#d9e6da] text-[#006546]' : 'text-[#3e4943] hover:bg-[#f3f3f4]'
                }`}
            >
                <span className="material-symbols-outlined" data-icon="receipt_long" style={{ fontVariationSettings: activeTab === 'order' ? "'FILL' 1" : "'FILL' 0" }}>receipt_long</span>
                <span className="font-['Lexend'] text-[12px] font-medium tracking-wide">Order</span>
            </Link>

            <Link 
                href="/pharmacist" 
                className={`flex flex-col items-center justify-center rounded-[1.5rem] px-6 py-2 active:scale-90 transition-all duration-300 ease-in-out ${
                    activeTab === 'help' ? 'bg-[#d9e6da] text-[#006546]' : 'text-[#3e4943] hover:bg-[#f3f3f4]'
                }`}
            >
                <span className="material-symbols-outlined" data-icon="medical_services" style={{ fontVariationSettings: activeTab === 'help' ? "'FILL' 1" : "'FILL' 0" }}>medical_services</span>
                <span className="font-['Lexend'] text-[12px] font-medium tracking-wide">Help</span>
            </Link>
        </nav>
    );
};

export default MobileNav;
