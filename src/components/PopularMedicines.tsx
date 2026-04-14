import React from 'react';
import Link from 'next/link';
import { getMedicines } from '@/lib/api';

type Medicine = {
    id: string;
    name: string;
    category: string;
    price: string;
    image: string;
};

const PopularMedicines = async () => {
    let meds: Medicine[] = [];
    try {
        const data = await getMedicines();
        // Take only first 4 for popular section
        meds = data.slice(0, 4) as Medicine[];
    } catch (err) {
        console.error("Error fetching popular medicines:", err);
    }

    if (meds.length === 0) return null;

    return (
        <section className="mb-10">
            <h3 className="text-xl font-bold text-on-surface mb-6 font-lexend">Popular Medicines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {meds.map((med) => (
                    <Link 
                        key={med.id} 
                        href={`/medicine/${med.id}`}
                        className="bg-surface-container-lowest rounded-[1.5rem] p-4 flex items-center gap-4 border border-outline-variant/10 shadow-sm active:bg-secondary-container transition-all"
                    >
                        <div className="w-24 h-24 rounded-2xl bg-surface-container overflow-hidden shrink-0">
                            <img alt={med.name} className="w-full h-full object-cover" src={med.image} />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-black text-lg text-on-surface font-lexend">{med.name}</h4>
                            <p className="text-on-surface-variant text-sm mb-2 font-medium">{med.category}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-primary font-black text-lg font-lexend">L$ {med.price}</span>
                                <div className="bg-primary text-white p-2 rounded-xl">
                                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default PopularMedicines;
