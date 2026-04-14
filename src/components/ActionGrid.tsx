import React from 'react';
import Link from 'next/link';

const ActionGrid: React.FC = () => {
    return (
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            <Link href="/order" className="flex flex-col items-center justify-center p-6 bg-primary text-white rounded-[2rem] shadow-lg active:scale-95 transition-all">
                <span className="material-symbols-outlined text-4xl mb-3" data-icon="shopping_basket">shopping_basket</span>
                <span className="font-bold text-center leading-tight">Order Medicine</span>
            </Link>
            <Link href="/upload" className="flex flex-col items-center justify-center p-6 bg-white border-2 border-primary-container text-primary rounded-[2rem] active:scale-95 transition-all">
                <span className="material-symbols-outlined text-4xl mb-3" data-icon="upload_file">upload_file</span>
                <span className="font-bold text-center leading-tight">Upload Prescription</span>
            </Link>
            <Link href="/pharmacist" className="flex flex-col items-center justify-center p-6 bg-white border-2 border-primary-container text-primary rounded-[2rem] active:scale-95 transition-all">
                <span className="material-symbols-outlined text-4xl mb-3" data-icon="chat">chat</span>
                <span className="font-bold text-center leading-tight">Talk to Pharmacist</span>
            </Link>
            <Link href="/find" className="flex flex-col items-center justify-center p-6 bg-white border-2 border-primary-container text-primary rounded-[2rem] active:scale-95 transition-all">
                <span className="material-symbols-outlined text-4xl mb-3" data-icon="location_on">location_on</span>
                <span className="font-bold text-center leading-tight">Find Pharmacy</span>
            </Link>
        </section>
    );
};

export default ActionGrid;
