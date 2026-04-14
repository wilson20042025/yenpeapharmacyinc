"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SubPageHeader from '@/components/SubPageHeader';
import MobileNav from '@/components/MobileNav';

type Medicine = {
    id: string;
    name: string;
    price: string;
    category: string;
    image: string;
    description: string;
    usage: string;
    sideEffects: string;
    inStock: boolean;
};

const ActionButtons = ({ medicine }: { medicine: Medicine }) => (
    <>
        <a href="tel:+231889143013" className="flex items-center justify-between bg-white p-5 rounded-3xl border border-primary/10 shadow-sm active:bg-secondary-container transition-all">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                    <p className="font-black text-on-background text-sm">Ask our Pharmacist</p>
                    <p className="text-[10px] font-bold text-on-surface-variant italic">Professional advice over call</p>
                </div>
            </div>
            <span className="material-symbols-outlined text-primary">chevron_right</span>
        </a>

        <a
            href={`https://wa.me/231889143013?text=Hello Yenpea Group Inc., I have a question about ${medicine.name}. Specifically regarding its use for: ${medicine.description}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-white p-5 rounded-3xl border border-[#25D366]/20 shadow-sm active:bg-[#25D366]/10 transition-all"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#25D366] rounded-2xl flex items-center justify-center text-white">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                </div>
                <div>
                    <p className="font-black text-on-background text-sm font-lexend">Chat on WhatsApp</p>
                    <p className="text-[10px] font-bold text-on-surface-variant italic">Instant messaging</p>
                </div>
            </div>
            <span className="material-symbols-outlined text-[#25D366]">chevron_right</span>
        </a>
    </>
);

export default function MedicineDetailContent({ medicine }: { medicine: Medicine | null }) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);

    if (!medicine) {
        return (
            <div className="bg-surface min-h-screen">
                <SubPageHeader title="Not Found" />
                <div className="max-w-md mx-auto pt-32 px-6 text-center space-y-6">
                    <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mx-auto text-outline">
                        <span className="material-symbols-outlined text-4xl">inventory_2</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-on-background">Medicine Not Found</h2>
                        <p className="text-on-surface-variant font-medium mt-2">The medicine you are looking for might have been moved or removed from inventory.</p>
                    </div>
                    <button onClick={() => router.push('/')} className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all">
                        Back to Pharmacy
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-surface min-h-screen pb-32">
            <SubPageHeader title="Product Details" />

            <main className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto pt-20 px-6 space-y-8">
                <div className="md:grid md:grid-cols-2 md:gap-12 md:items-start lg:gap-20">
                    {/* Left Column: Image Area */}
                    <div className="space-y-8">
                        <div className="relative w-full aspect-square bg-white rounded-[3rem] shadow-sm overflow-hidden border border-outline-variant/5">
                            <img
                                src={medicine.image}
                                alt={medicine.name}
                                className="w-full h-full object-cover p-8"
                            />
                            {!medicine.inStock && (
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                                    <span className="bg-error text-white px-4 py-2 rounded-xl font-black uppercase text-xs">Out of Stock</span>
                                </div>
                            )}
                        </div>

                        {/* Communication Actions (Desktop) */}
                        <div className="hidden md:grid grid-cols-1 gap-4">
                            <ActionButtons medicine={medicine} />
                        </div>
                    </div>

                    {/* Right Column: Info Area */}
                    <div className="space-y-8 mt-8 md:mt-0">
                        {/* Header Information */}
                        <div className="space-y-2">
                            <p className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.2em]">{medicine.category}</p>
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-on-background leading-tight">{medicine.name}</h2>
                            <p className="text-xl md:text-3xl font-black text-primary">L$ {medicine.price}</p>
                        </div>

                        {/* Description & Details */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-on-surface-variant opacity-60">Description</h3>
                                <p className="text-on-surface font-medium leading-relaxed md:text-lg">{medicine.description}</p>
                            </div>

                            <div className="bg-secondary-container/30 p-6 md:p-8 rounded-[2rem] space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                                        <span className="material-symbols-outlined text-xl">medical_information</span>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] md:text-xs font-black uppercase text-primary mb-1">Usage Instructions</h4>
                                        <p className="text-xs md:text-sm font-bold text-on-surface-variant leading-relaxed">{medicine.usage}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-error shadow-sm flex-shrink-0">
                                        <span className="material-symbols-outlined text-xl">warning</span>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] md:text-xs font-black uppercase text-error mb-1">Possible Side Effects</h4>
                                        <p className="text-xs md:text-sm font-bold text-on-surface-variant leading-relaxed">{medicine.sideEffects}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Communication Actions (Mobile) */}
                        <div className="md:hidden grid grid-cols-1 gap-4">
                            <ActionButtons medicine={medicine} />
                        </div>
                    </div>
                </div>
            </main>

            {/* Fixed Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-outline-variant/10 px-6 pt-4 pb-10 z-[60] shadow-[0_-12px_40px_rgba(0,0,0,0.08)]">
                <div className="max-w-md md:max-w-lg mx-auto flex items-center gap-4">
                    <div className="flex items-center bg-surface-container-low rounded-2xl p-1 shrink-0">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 flex items-center justify-center text-primary active:scale-90 transition-all"
                        >
                            <span className="material-symbols-outlined">remove</span>
                        </button>
                        <span className="w-8 text-center font-black text-on-background">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-primary active:scale-90 transition-all"
                        >
                            <span className="material-symbols-outlined">add</span>
                        </button>
                    </div>
                    <button
                        disabled={!medicine.inStock}
                        onClick={() => router.push('/order')}
                        className={`flex-grow py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 ${medicine.inStock ? 'bg-primary text-white' : 'bg-surface-dim text-on-surface-variant'
                            }`}
                    >
                        <span className="material-symbols-outlined text-lg">shopping_cart</span>
                        {medicine.inStock ? 'Buy Medicine' : 'Out of Stock'}
                    </button>
                </div>
            </div>

            <MobileNav activeTab="home" />
        </div>
    );
}
