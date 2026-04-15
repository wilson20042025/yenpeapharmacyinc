"use client";

import React, { useState } from 'react';
import SubPageHeader from '@/components/SubPageHeader';
import MobileNav from '@/components/MobileNav';
import Link from 'next/link';

type Medication = {
    _id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    prescription?: boolean;
};

type CategoryInfo = {
    title: string;
    icon: string;
    description: string;
    image: string;
};

export default function NeedContent({ 
    medicines: initialMedicines, 
    categoryInfo, 
    slug 
}: { 
    medicines: Medication[], 
    categoryInfo: CategoryInfo,
    slug: string
}) {
    const [medicines] = useState<Medication[]>(initialMedicines);

    return (
        <div className="bg-surface text-on-surface min-h-screen pb-32">
            <SubPageHeader title={categoryInfo.title} />

            <main className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-6 pt-20 space-y-12">
                <section className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-8 p-8 md:p-12 bg-white rounded-[2.5rem] shadow-sm border border-outline-variant/10 text-center md:text-left transition-all">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-secondary-container flex items-center justify-center rounded-[2rem] overflow-hidden shrink-0">
                        {slug === 'malaria' ? (
                            <img src="https://d.medicaldaily.com/en/full/290654/mosquito.jpg?w=736&f=916646ba21964a702bbb74eee14099df" alt="Malaria" className="w-full h-full object-cover" />
                        ) : slug === 'fever' ? (
                            <img src="https://img.freepik.com/premium-photo/parent-child-forehead-check-with-thermometer-fever-bedroom-wellness-assessment-covid-flu-black-person-kid-sick-home-with-care-allergy-inspection-with-tools-virus_590464-424450.jpg" alt="Fever" className="w-full h-full object-cover" />
                        ) : slug === 'pain-relief' ? (
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCixucxLJtE4ZxEG0TmeJArqaQZhGYEpZvvQ&s" alt="Pain Relief" className="w-full h-full object-cover" />
                        ) : slug === 'cough' ? (
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjk57LDQuACunQq-De2vrodMCYlyLaVQV9pg&s" alt="Cough" className="w-full h-full object-cover" />
                        ) : slug === 'infection' ? (
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh0tV97gWcIQ_2ml3vWRdo1DLKWC0sg7Ws9Q&s" alt="Infection" className="w-full h-full object-cover" />
                        ) : slug === 'stomach' ? (
                            <img src="https://media.istockphoto.com/id/2164034292/photo/man-holding-stomach-in-discomfort-experiencing-abdominal-pain.jpg?s=612x612&w=0&k=20&c=yPBOLPVgziW5IwofzMz21PgwoE1bRlmg421YzWsBmoQ=" alt="Stomach" className="w-full h-full object-cover" />
                        ) : (
                            <span className="material-symbols-outlined text-primary text-4xl">{categoryInfo.icon}</span>
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-4xl font-black text-primary">{categoryInfo.title}</h2>
                        <p className="text-on-surface-variant md:text-lg font-medium mt-2 leading-relaxed max-w-xl">{categoryInfo.description}</p>
                    </div>
                </section>

                <section className="space-y-6">
                    <h3 className="text-xl md:text-2xl font-black text-on-surface font-lexend">Available Medications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {medicines.length > 0 ? medicines.map((med) => (
                            <div key={med._id} className="bg-white p-5 rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                                {med.prescription && (
                                    <div className="absolute top-0 right-0 bg-error-container text-on-error-container text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-tighter">
                                        Prescription Required
                                    </div>
                                )}
                                <div className="flex gap-4 relative">
                                    <Link
                                        href={`/medicine/${med._id}`}
                                        className="absolute inset-0 z-10"
                                        aria-label={`View details for ${med.name}`}
                                    ></Link>
                                    <div className="w-24 h-24 rounded-2xl bg-surface-container overflow-hidden flex-shrink-0 shadow-inner relative z-0">
                                        <img alt={med.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={med.image} />
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between relative z-0">
                                        <div>
                                            <div className="flex justify-between items-start pt-1">
                                                <h4 className="font-black text-on-surface text-lg leading-tight w-[70%]">{med.name}</h4>
                                                <span className="font-black text-primary text-lg">L$ {med.price}</span>
                                            </div>
                                            <p className="text-on-surface-variant text-sm mt-1 font-medium leading-snug line-clamp-2">{med.description}</p>
                                        </div>
                                        <div className="mt-4 flex gap-2">
                                            <Link href="/order" className="flex-grow bg-primary text-on-primary py-3 rounded-xl font-bold text-sm text-center active:scale-95 transition-all shadow-md">
                                                Order Now
                                            </Link>
                                            <a href="#" className="flex items-center justify-center bg-secondary-container text-on-secondary-container px-4 rounded-xl active:scale-95 transition-all">
                                                <span className="material-symbols-outlined text-xl">chat</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="py-12 bg-surface-container-low rounded-3xl text-center">
                                <p className="text-on-surface-variant font-medium">No results found in this category.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Additional Guidance Section */}
                <section className="bg-primary text-on-primary p-8 rounded-[2.5rem] text-center space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                    <div className="space-y-1 relative z-10">
                        <h3 className="text-2xl font-black tracking-tight underline decoration-white/20 underline-offset-8">Still unsure?</h3>
                        <p className="text-primary-fixed-dim text-sm font-medium mt-4 px-4">Our licensed pharmacists are online and ready to help you find the right dosage.</p>
                    </div>
                    <div className="space-y-4 relative z-10">
                        <button className="w-full bg-white text-primary flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                            Quick Consultation
                        </button>
                    </div>
                </section>
            </main>

            <MobileNav activeTab="home" />
        </div>
    );
}
