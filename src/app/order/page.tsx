"use client";

import React, { useState } from 'react';
import SubPageHeader from '@/components/SubPageHeader';
import Link from 'next/link';

export default function OrderPage() {
    const [medicines, setMedicines] = useState([
        {
            id: 1,
            name: "Paracetamol 500mg",
            price: 450,
            quantity: 1,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAL60E-nnXq8QenCwHLNDn5DQQhvtfLsBhStaZV5l_S31jaw2Y3xL9G-41ss5W1k64ztResdDW-cX1i-KvHn06TgM0_a2bk-aspubOPgvJZqZtejDuqrCakhxd3ytvBPaGxyuqKJ6M2Nb7lyi3ZxH0Vv4NIeV94UGOmVHfvXMPa453SbLZnP5zxzCiMxIowB_xP_j8LPVxLnH1IY2PKiTgCsjpEARCvNjqf0T2_-g-5OjWkve2P_wTG8A2pmlUcOMJfKL8-szS-fk",
            inStock: true
        },
        {
            id: 2,
            name: "Artemether Tablets",
            price: 1200,
            quantity: 1,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkcAx5h0K3S-H_q1mDB3V1OA7_b2BUSjrNpq44FNLQMSk_Qflz1O_wX8tnQjf1fsII_FZDpQxy-P1ezv96FVrc264hvd2v_f8LgSuNkRSR94e5vdsmJF2nqt_56LEP7cXhoW44fBovB8QiN3FPfcNQxqp7viY0RChxpfEemaj89MexnZ4cUdTVXXU_pDbaqrjwjSmzU-eawGROBNyOGg49wtpHJgoE6oRiK_a4_TNlzzwJLNCOWwbOt_2hB345hgD7QkMMrSkA9HU",
            inStock: true
        }
    ]);

    const updateQuantity = (id: number, delta: number) => {
        setMedicines(prev => prev.map(med => 
            med.id === id ? { ...med, quantity: Math.max(1, med.quantity + delta) } : med
        ));
    };

    const removeItem = (id: number) => {
        setMedicines(prev => prev.filter(med => med.id !== id));
    };

    const totalPrice = medicines.reduce((sum, med) => sum + (med.price * med.quantity), 0);

    return (
        <div className="bg-surface text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
            <SubPageHeader title="Complete Order" />

            <main className="max-w-md mx-auto px-6 pt-20 pb-32 space-y-8">
                {/* Order Summary Section */}
                <section className="space-y-4">
                    <div className="flex justify-between items-end">
                        <h2 className="text-on-surface-variant font-bold text-lg">Order Summary</h2>
                        <span className="text-primary font-bold">{medicines.length} Item{medicines.length !== 1 ? 's' : ''}</span>
                    </div>
                    
                    <div className="space-y-4">
                        {medicines.length > 0 ? (
                            medicines.map((med) => (
                                <div key={med.id} className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/15 shadow-sm relative group">
                                    <button 
                                        onClick={() => removeItem(med.id)}
                                        className="absolute -top-2 -right-2 w-8 h-8 bg-error-container text-on-error-container rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all opacity-0 group-hover:opacity-100 md:opacity-100"
                                    >
                                        <span className="material-symbols-outlined text-sm">close</span>
                                    </button>

                                    <div className="flex gap-4">
                                        <div className="w-20 h-20 rounded-xl bg-surface-container overflow-hidden flex-shrink-0">
                                            <img alt={med.name} className="w-full h-full object-cover" src={med.image} />
                                        </div>
                                        <div className="flex-grow flex flex-col justify-between py-0.5">
                                            <div className="flex justify-between items-start gap-2">
                                                <p className="font-bold text-on-background text-[17px] leading-tight flex-grow">{med.name}</p>
                                                <p className="font-extrabold text-primary whitespace-nowrap">L$ {med.price * med.quantity}</p>
                                            </div>
                                            
                                            <div className="flex justify-between items-center mt-2">
                                                <div className="flex items-center bg-surface-container-low rounded-xl p-1 gap-1">
                                                    <button 
                                                        onClick={() => updateQuantity(med.id, -1)}
                                                        className="w-8 h-8 rounded-lg hover:bg-surface-container-high active:scale-95 transition-all text-on-surface flex items-center justify-center"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">remove</span>
                                                    </button>
                                                    <span className="w-8 text-center font-bold text-on-surface">{med.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(med.id, 1)}
                                                        className="w-8 h-8 rounded-lg hover:bg-surface-container-high active:scale-95 transition-all text-on-surface flex items-center justify-center"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">add</span>
                                                    </button>
                                                </div>
                                                <button 
                                                    onClick={() => removeItem(med.id)}
                                                    className="text-error text-sm font-bold flex items-center gap-1 p-2 md:hidden"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center space-y-4">
                                <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mx-auto text-outline">
                                    <span className="material-symbols-outlined text-4xl">shopping_cart_off</span>
                                </div>
                                <p className="text-on-surface-variant font-medium">Your order is empty</p>
                                <Link href="/" className="inline-block text-primary font-bold bg-secondary-container px-6 py-2 rounded-xl">
                                    Browse Medicines
                                </Link>
                            </div>
                        )}
                    </div>

                    {medicines.length > 0 && (
                        <div className="pt-2 px-1 flex justify-between items-center">
                            <span className="text-on-surface-variant font-medium">Total Price:</span>
                            <span className="text-2xl font-black text-primary tracking-tight">L$ {totalPrice}</span>
                        </div>
                    )}
                </section>

                {/* Customer Info Section */}
                <section className="space-y-4">
                    <h2 className="text-on-surface-variant font-bold text-lg">Customer Information</h2>
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-on-surface-variant text-sm font-medium ml-1">Name</label>
                            <input className="w-full h-14 px-4 rounded-2xl bg-surface-container-low border-transparent focus:border-primary focus:ring-0 text-on-background placeholder:text-outline transition-all" placeholder="Your full name" type="text" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-on-surface-variant text-sm font-medium ml-1">Phone Number</label>
                            <input className="w-full h-14 px-4 rounded-2xl bg-surface-container-low border-transparent focus:border-primary focus:ring-0 text-on-background placeholder:text-outline transition-all" placeholder="077 / 088..." type="tel" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-on-surface-variant text-sm font-medium ml-1">Location</label>
                            <textarea className="w-full p-4 rounded-2xl bg-surface-container-low border-transparent focus:border-primary focus:ring-0 text-on-background placeholder:text-outline transition-all resize-none" placeholder="e.g., Paynesville, near market" rows={2}></textarea>
                        </div>
                    </div>
                </section>

                {/* Delivery Option Section */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-on-surface-variant font-bold text-lg">Delivery Option</h2>
                        <span className="text-xs text-tertiary font-medium">Delivery fee may apply</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 border-primary bg-secondary-container text-primary transition-all active:scale-95">
                            <span className="material-symbols-outlined" data-icon="local_shipping">local_shipping</span>
                            <span className="font-bold text-sm">Delivery</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container transition-all active:scale-95">
                            <span className="material-symbols-outlined" data-icon="store">store</span>
                            <span className="font-bold text-sm">Pickup</span>
                        </button>
                    </div>
                </section>

                {/* Payment Method Section */}
                <section className="space-y-4">
                    <h2 className="text-on-surface-variant font-bold text-lg">Payment Method</h2>
                    <div className="space-y-3">
                        <label className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/15 cursor-pointer active:bg-secondary-container transition-colors group">
                            <input defaultChecked className="w-5 h-5 text-primary border-outline focus:ring-primary ring-offset-2" name="payment" type="radio" />
                            <div className="flex flex-col">
                                <span className="font-bold text-on-background">Cash on delivery</span>
                                <span className="text-xs text-on-surface-variant">Pay when you receive items</span>
                            </div>
                            <span className="material-symbols-outlined ml-auto text-on-surface-variant/40" data-icon="payments">payments</span>
                        </label>
                        <label className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/15 cursor-pointer active:bg-secondary-container transition-colors group">
                            <input className="w-5 h-5 text-primary border-outline focus:ring-primary ring-offset-2" name="payment" type="radio" />
                            <div className="flex flex-col">
                                <span className="font-bold text-on-background">Mobile Money</span>
                                <span className="text-xs text-on-surface-variant">MTN or Orange Money</span>
                            </div>
                            <span className="material-symbols-outlined ml-auto text-on-surface-variant/40" data-icon="account_balance_wallet">account_balance_wallet</span>
                        </label>
                    </div>
                </section>

                {/* Final Place Order Button (Fixed at bottom) */}
                <div className="fixed bottom-0 left-0 w-full z-50 px-6 py-6 bg-gradient-to-t from-surface via-surface to-transparent">
                    <div className="max-w-md mx-auto space-y-3">
                        <div className="text-center">
                            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Secure Pharmacy Checkout</p>
                        </div>
                        <button 
                            disabled={medicines.length === 0}
                            className="w-full h-16 bg-primary text-on-primary font-lexend font-extrabold text-xl rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                        >
                            Place Order (L$ {totalPrice})
                            <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
