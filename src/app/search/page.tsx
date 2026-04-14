"use client";

import React, { useState, useEffect } from 'react';
import SubPageHeader from '@/components/SubPageHeader';
import MobileNav from '@/components/MobileNav';
import Link from 'next/link';
import { getMedicines } from '@/lib/api';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [medicines, setMedicines] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeds = async () => {
            try {
                const data = await getMedicines();
                setMedicines(data);
            } catch (err) {
                console.error("Search fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMeds();
    }, []);

    const filteredResults = medicines.filter(m =>
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.category.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="bg-surface text-on-surface min-h-screen pb-32">
            {/* Custom Search Header */}
            <header className="bg-[#f9f9f9] fixed top-0 w-full h-20 z-50 transition-colors border-b border-outline-variant/10">
                <div className="flex items-center gap-3 px-6 w-full max-w-screen-xl mx-auto h-full pt-2">
                    <Link href="/" className="active:scale-95 transition-transform duration-200 text-[#006546] flex-shrink-0">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </Link>

                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                            <span className="material-symbols-outlined text-xl">search</span>
                        </div>
                        <input
                            className="w-full h-12 pl-12 pr-10 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:ring-2 focus:ring-primary text-base placeholder:text-on-surface-variant/50 transition-all font-medium"
                            placeholder="Find medicine..."
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                className="absolute inset-y-0 right-3 flex items-center text-outline-variant hover:text-error transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-6 pt-24 space-y-12">
                {!query && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-10">
                        {/* Search by Health Need */}
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-on-surface mb-6">Search by Health Need</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                                {[
                                    { name: "Malaria", icon: "bug_report", slug: "malaria" },
                                    { name: "Fever", icon: "thermostat", slug: "fever" },
                                    { name: "Pain Relief", icon: "personal_injury", slug: "pain-relief" },
                                    { name: "Cough", icon: "air", slug: "cough" },
                                    { name: "Infection", icon: "vaccines", slug: "infection" },
                                    { name: "Stomach", icon: "gastroenterology", slug: "stomach" }
                                ].map((need) => (
                                    <Link
                                        key={need.name}
                                        href={`/needs/${need.slug}`}
                                        className="bg-surface-container-low p-6 rounded-[2rem] flex flex-col items-center text-center space-y-3 active:bg-secondary-container transition-all shadow-sm border border-outline-variant/5"
                                    >
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-white flex items-center justify-center text-primary shadow-sm overflow-hidden">
                                            {need.slug === 'malaria' ? (
                                                <img src="https://d.medicaldaily.com/en/full/290654/mosquito.jpg?w=736&f=916646ba21964a702bbb74eee14099df" alt="Malaria" className="w-full h-full object-cover" />
                                            ) : need.slug === 'fever' ? (
                                                <img src="https://img.freepik.com/premium-photo/parent-child-forehead-check-with-thermometer-fever-bedroom-wellness-assessment-covid-flu-black-person-kid-sick-home-with-care-allergy-inspection-with-tools-virus_590464-424450.jpg" alt="Fever" className="w-full h-full object-cover" />
                                            ) : need.slug === 'pain-relief' ? (
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCixucxLJtE4ZxEG0TmeJArqaQZhGYEpZvvQ&s" alt="Pain Relief" className="w-full h-full object-cover" />
                                            ) : need.slug === 'cough' ? (
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjk57LDQuACunQq-De2vrodMCYlyLaVQV9pg&s" alt="Cough" className="w-full h-full object-cover" />
                                            ) : need.slug === 'infection' ? (
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh0tV97gWcIQ_2ml3vWRdo1DLKWC0sg7Ws9Q&s" alt="Infection" className="w-full h-full object-cover" />
                                            ) : need.slug === 'stomach' ? (
                                                <img src="https://media.istockphoto.com/id/2164034292/photo/man-holding-stomach-in-discomfort-experiencing-abdominal-pain.jpg?s=612x612&w=0&k=20&c=yPBOLPVgziW5IwofzMz21PgwoE1bRlmg421YzWsBmoQ=" alt="Stomach" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="material-symbols-outlined text-3xl">{need.icon}</span>
                                            )}
                                        </div>
                                        <span className="font-black text-sm text-on-surface">{need.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Search Results Section - Only visible when typing */}
                {query && (
                    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl md:text-2xl font-black text-primary">Search Results</h2>
                            <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">{filteredResults.length} Results Found</span>
                        </div>

                        {loading ? (
                            <div className="py-24 flex flex-col items-center justify-center space-y-4">
                                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                <p className="text-sm font-bold text-on-surface-variant">Searching inventory...</p>
                            </div>
                        ) : filteredResults.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredResults.map((med) => (
                                    <div key={med.id} className="bg-surface-container-lowest p-5 rounded-2xl border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                                        <Link href={`/medicine/${med.id}`} className="absolute inset-0 z-0" aria-label={`View ${med.name} Details`} />
                                        <div className="flex justify-between items-start relative z-10 pointer-events-none">
                                            <div className="flex-grow pr-4">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[9px] font-black uppercase text-primary tracking-widest px-1.5 py-0.5 bg-primary/5 rounded">{med.category}</span>
                                                </div>
                                                <h3 className="text-lg font-black text-on-background leading-tight">{med.name}</h3>
                                                <p className="text-on-surface-variant text-[11px] mt-1 font-medium line-clamp-1">{med.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-black text-primary leading-none">L$ {med.price}</p>
                                                {!med.inStock && <p className="text-[10px] font-bold text-error mt-1">Out of Stock</p>}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between relative z-10">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${med.inStock ? 'bg-primary animate-pulse' : 'bg-outline-variant'}`}></span>
                                                <span className={`text-[11px] font-bold ${med.inStock ? 'text-primary' : 'text-outline-variant'} italic`}>
                                                    {med.inStock ? 'Available Now' : 'Currently Unavailable'}
                                                </span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={`/medicine/${med.id}`} className="px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-[11px] shadow-sm">View Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 bg-surface-container-low rounded-3xl text-center space-y-4">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-outline shadow-sm">
                                    <span className="material-symbols-outlined text-3xl">sentiment_dissatisfied</span>
                                </div>
                                <div>
                                    <p className="font-black text-on-surface text-lg">No matches found</p>
                                    <p className="text-on-surface-variant text-sm px-8">We might still have it! Ask our pharmacist directly via WhatsApp.</p>
                                </div>
                                <a
                                    href={`https://wa.me/231889143013?text=Hello Yenpea Group Inc., I am looking for a medicine called '${query}' but couldn't find it on the site.`}
                                    className="inline-block bg-primary text-on-primary px-8 py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-all text-sm"
                                >
                                    Ask on WhatsApp
                                </a>
                            </div>
                        )}
                    </section>
                )}

                {/* WhatsApp Fallback */}
                <section className="bg-primary text-on-primary p-8 rounded-[2.5rem] text-center space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                    <div className="space-y-1 relative z-10">
                        <h3 className="text-2xl font-black tracking-tight">Can't find it?</h3>
                        <p className="text-primary-fixed-dim text-sm font-medium">Ask our pharmacist directly on WhatsApp.</p>
                    </div>
                    <div className="space-y-4 relative z-10">
                        <button className="w-full bg-white text-primary flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                            Ask on WhatsApp
                        </button>
                    </div>
                </section>
            </main>

            <MobileNav activeTab="search" />
        </div>
    );
}
