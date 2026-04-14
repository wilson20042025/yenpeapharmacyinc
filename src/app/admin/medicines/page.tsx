"use client";

import React, { useState, useEffect } from 'react';
import { getMedicines, addMedicine, updateMedicine } from '@/lib/api';

type Medicine = {
    id: string; // Changed from number to string for Firestore IDs
    name: string;
    price: string;
    image: string;
    category: string;
    inStock: boolean;
    description: string;
    usage: string;
    sideEffects: string;
};

const categories = [
    { name: 'Malaria', slug: 'malaria' },
    { name: 'Fever', slug: 'fever' },
    { name: 'Pain Relief', slug: 'pain-relief' },
    { name: 'Cough', slug: 'cough' },
    { name: 'Infection', slug: 'infection' },
    { name: 'Stomach', slug: 'stomach' },
    { name: 'Vitamins', slug: 'vitamins' },
    { name: 'First Aid', slug: 'first-aid' }
];

export default function AdminMedicinesPage() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [showForm, setShowForm] = useState(false);
    const [editingMed, setEditingMed] = useState<Medicine | null>(null);
    const [formName, setFormName] = useState('');
    const [formPrice, setFormPrice] = useState('');
    const [formCategory, setFormCategory] = useState('malaria');
    const [formDescription, setFormDescription] = useState('');
    const [formUsage, setFormUsage] = useState('');
    const [formSideEffects, setFormSideEffects] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchMeds = async () => {
            try {
                const data = await getMedicines();
                setMedicines(data as Medicine[]);
            } catch (err) {
                console.error("Firebase fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMeds();
    }, []);

    const toggleStock = async (id: string) => {
        const med = medicines.find(m => m.id === id);
        if (!med) return;

        try {
            await updateMedicine(id, { inStock: !med.inStock });
            setMedicines(prev => prev.map(m => m.id === id ? { ...m, inStock: !med.inStock } : m));
        } catch (err) {
            alert("Failed to update stock in Firebase");
        }
    };

    const openEdit = (med: Medicine) => {
        setEditingMed(med);
        setFormName(med.name);
        setFormPrice(med.price);
        setFormCategory(med.category);
        setFormDescription(med.description || '');
        setFormUsage(med.usage || '');
        setFormSideEffects(med.sideEffects || '');
        setSelectedFile(null);
        setShowForm(true);
        setIsSuccess(false);
    };

    const openAdd = () => {
        setEditingMed(null);
        setFormName('');
        setFormPrice('');
        setFormCategory('malaria');
        setFormDescription('');
        setFormUsage('');
        setFormSideEffects('');
        setSelectedFile(null);
        setShowForm(true);
        setIsSuccess(false);
    };

    const saveMedicine = async () => {
        if (!formName || !formPrice || !formDescription || !formUsage || !formSideEffects) {
            alert("Please fill in all mandatory fields before saving.");
            return;
        }

        setIsSaving(true);

        try {
            let imageUrl = editingMed ? editingMed.image : "https://lh3.googleusercontent.com/aida-public/AB6AXuDAL60E-nnXq8QenCwHLNDn5DQQhvtfLsBhStaZV5l_S31jaw2Y3xL9G-41ss5W1k64ztResdDW-cX1i-KvHn06TgM0_a2bk-aspubOPgvJZqZtejDuqrCakhxd3ytvBPaGxyuqKJ6M2Nb7lyi3ZxH0Vv4NIeV94UGOmVHfvXMPa453SbLZnP5zxzCiMxIowB_xP_j8LPVxLnH1IY2PKiTgCsjpEARCvNjqf0T2_-g-5OjWkve2P_wTG8A2pmlUcOMJfKL8-szS-fk";

            if (selectedFile) {
                // Future: Add real Firebase Storage upload here
                imageUrl = URL.createObjectURL(selectedFile);
            }

            const medicineData = {
                name: formName,
                price: formPrice,
                category: formCategory,
                description: formDescription,
                usage: formUsage,
                sideEffects: formSideEffects,
                image: imageUrl,
                inStock: true
            };

            if (editingMed) {
                await updateMedicine(editingMed.id, medicineData);
                setMedicines(prev => prev.map(m => m.id === editingMed.id ? { ...m, ...medicineData } : m));
            } else {
                const docRef = await addMedicine(medicineData);
                setMedicines([{ id: docRef.id, ...medicineData }, ...medicines]);
            }

            setIsSuccess(true);
            setTimeout(() => {
                setShowForm(false);
                setIsSuccess(false);
            }, 800);
        } catch (err) {
            alert("Database error: " + (err as Error).message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="px-6 space-y-6 pb-20">
            <div className="flex justify-between items-end">
                <h2 className="text-2xl font-black text-on-background">Medicines</h2>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-xl text-xs font-black uppercase shadow-md active:scale-95 transition-all"
                >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add New
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 space-y-6 animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start sticky top-0 bg-white z-10 pb-2">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">{editingMed ? 'Edit Medicine' : 'Add New Medicine'}</p>
                                <h3 className="text-2xl font-black text-on-background">{editingMed ? 'Update Details' : 'New Inventory'}</h3>
                            </div>
                            <button onClick={() => setShowForm(false)} className="w-10 h-10 bg-surface-container-low rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-on-surface">close</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-on-surface-variant uppercase ml-2 flex items-center gap-1">
                                        Name <span className="text-error">*</span>
                                    </label>
                                    <input
                                        className="w-full h-14 px-5 rounded-2xl bg-surface-container-low border-transparent focus:ring-2 focus:ring-primary font-bold"
                                        placeholder="e.g. Paracetamol"
                                        value={formName}
                                        onChange={(e) => setFormName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-on-surface-variant uppercase ml-2 flex items-center gap-1">
                                        Price (L$) <span className="text-error">*</span>
                                    </label>
                                    <input
                                        className="w-full h-14 px-5 rounded-2xl bg-surface-container-low border-transparent focus:ring-2 focus:ring-primary font-bold"
                                        placeholder="0.00"
                                        type="number"
                                        value={formPrice}
                                        onChange={(e) => setFormPrice(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-on-surface-variant uppercase ml-2 flex items-center gap-1">
                                        Category <span className="text-error">*</span>
                                    </label>
                                    <select
                                        className="w-full h-14 px-5 rounded-2xl bg-surface-container-low border-transparent focus:ring-2 focus:ring-primary font-bold appearance-none"
                                        value={formCategory}
                                        onChange={(e) => setFormCategory(e.target.value)}
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-on-surface-variant uppercase ml-2">Product Photo</label>
                                    <label className="w-full h-14 flex items-center justify-center gap-3 rounded-2xl bg-secondary-container text-primary font-bold cursor-pointer hover:bg-primary hover:text-white transition-all text-sm">
                                        <span className="material-symbols-outlined">{selectedFile ? 'check_circle' : 'photo_camera'}</span>
                                        {selectedFile ? 'File Attached' : editingMed ? 'Change Photo' : 'Upload Photo'}
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)} />
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-on-surface-variant uppercase ml-2 flex items-center gap-1">
                                    Description <span className="text-error">*</span>
                                </label>
                                <textarea
                                    className="w-full h-24 p-5 rounded-2xl bg-surface-container-low border-transparent focus:ring-2 focus:ring-primary font-medium text-sm leading-relaxed resize-none"
                                    placeholder="Tell pharmacy customers about this medicine..."
                                    value={formDescription}
                                    onChange={(e) => setFormDescription(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-on-surface-variant uppercase ml-2 flex items-center gap-1">
                                    Usage Instructions <span className="text-error">*</span>
                                </label>
                                <textarea
                                    className="w-full h-20 p-5 rounded-2xl bg-surface-container-low border-transparent focus:ring-2 focus:ring-primary font-medium text-sm leading-relaxed resize-none"
                                    placeholder="How should they take it? (e.g. Twice daily)"
                                    value={formUsage}
                                    onChange={(e) => setFormUsage(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-on-surface-variant uppercase ml-2 flex items-center gap-1">
                                    Side Effects <span className="text-error">*</span>
                                </label>
                                <textarea
                                    className="w-full h-20 p-5 rounded-2xl bg-surface-container-low border-transparent focus:ring-2 focus:ring-primary font-medium text-sm leading-relaxed resize-none"
                                    placeholder="Any warnings or common side effects?"
                                    value={formSideEffects}
                                    onChange={(e) => setFormSideEffects(e.target.value)}
                                />
                            </div>
                        </div>

                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center py-4 animate-in zoom-in duration-300">
                                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-2 shadow-lg">
                                    <span className="material-symbols-outlined text-4xl">check</span>
                                </div>
                                <p className="font-black text-primary">Saved Successfully!</p>
                            </div>
                        ) : (
                            <button
                                onClick={saveMedicine}
                                disabled={isSaving}
                                className={`w-full py-5 rounded-[1.5rem] font-black text-lg shadow-xl active:scale-95 transition-all mt-4 flex items-center justify-center gap-2 ${isSaving ? 'bg-surface-dim text-on-surface-variant cursor-wait' : 'bg-primary text-white'
                                    }`}
                            >
                                {isSaving ? (
                                    <><div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>Processing...</>
                                ) : (
                                    editingMed ? 'Update Medicine' : 'Save to Inventory'
                                )}
                            </button>
                        )}
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {medicines.map((med) => (
                    <div key={med.id} className="bg-white p-5 rounded-[2rem] border border-outline-variant/10 shadow-sm flex gap-4 items-center transition-all group">
                        <div className="w-20 h-20 rounded-2xl bg-surface-container overflow-hidden flex-shrink-0 border border-outline-variant/10">
                            <img src={med.image} alt={med.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow space-y-1">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black uppercase text-primary tracking-[0.2em]">{med.category}</span>
                                <h4 className="font-black text-on-background text-[15px] leading-tight">{med.name}</h4>
                            </div>
                            <p className="text-sm font-black text-on-surface-variant opacity-60">L$ {med.price}</p>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                            <button onClick={() => toggleStock(med.id)} className={`relative w-11 h-6 rounded-full transition-colors duration-200 shadow-inner ${med.inStock ? 'bg-primary' : 'bg-surface-dim'}`}>
                                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 shadow-sm ${med.inStock ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                            <button onClick={() => openEdit(med)} className="w-10 h-10 bg-secondary-container text-primary rounded-xl flex items-center justify-center active:scale-95 transition-all">
                                <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-center text-[10px] text-on-surface-variant font-black uppercase tracking-widest pt-10 pb-20 opacity-40 italic">Inventory Management Interface</p>
        </div>
    );
}
