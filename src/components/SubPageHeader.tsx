import React from 'react';
import Link from 'next/link';

interface SubPageHeaderProps {
    title: string;
}

const SubPageHeader: React.FC<SubPageHeaderProps> = ({ title }) => {
    return (
        <header className="bg-[#f9f9f9] fixed top-0 w-full h-16 z-50 transition-colors">
            <div className="flex justify-between items-center px-6 w-full max-w-screen-xl mx-auto h-full">
                <div className="flex items-center gap-4">
                    <Link href="/" className="active:scale-95 transition-transform duration-200 text-emerald-900">
                        <span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
                    </Link>
                    <h1 className="font-['Lexend'] tracking-tight font-bold text-lg text-[#006546]">{title}</h1>
                </div>
            </div>
        </header>
    );
};

export default SubPageHeader;
