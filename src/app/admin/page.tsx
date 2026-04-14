"use client";

import React, { useState, useEffect } from 'react';
import { getOrders } from '@/lib/api';
import { supabase } from '@/lib/supabase';

type OrderStatus = 'Pending' | 'Confirmed' | 'Ready' | 'Delivered';

type Order = {
    id: string;
    customer: string;
    phone: string;
    location: string;
    medicines: string[];
    total: string;
    status: OrderStatus;
    time: string;
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data as Order[]);
            } catch (err) {
                console.error("Supabase fetch orders error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
        try {
            await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
            if (selectedOrder?.id === orderId) {
                setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
            }
        } catch (err) {
            alert("Failed to update status in Supabase");
        }
    };

    const statusColors: Record<OrderStatus, string> = {
        'Pending': 'bg-amber-100 text-amber-900 border-amber-200',
        'Confirmed': 'bg-blue-100 text-blue-900 border-blue-200',
        'Ready': 'bg-secondary-container text-primary border-primary/10',
        'Delivered': 'bg-primary/10 text-primary border-primary/20 opacity-60'
    };

    return (
        <div className="px-6 space-y-6">
            <div className="flex justify-between items-end">
                <h2 className="text-2xl font-black text-on-background">Orders</h2>
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{orders.length} Active</span>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {orders.map((order) => (
                    <div 
                        key={order.id} 
                        onClick={() => setSelectedOrder(order)}
                        className={`bg-white p-5 rounded-2xl border-2 transition-all active:scale-[0.98] ${
                            selectedOrder?.id === order.id ? 'border-primary' : 'border-transparent shadow-sm'
                        }`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-[10px] font-black text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-md uppercase">{order.id}</span>
                            <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase border ${statusColors[order.status]}`}>
                                {order.status}
                            </span>
                        </div>
                        <h3 className="text-lg font-black text-on-background">{order.customer}</h3>
                        <p className="text-on-surface-variant text-sm font-medium mb-3">{order.medicines.join(', ')}</p>
                        <div className="flex justify-between items-center pt-3 border-t border-outline-variant/10">
                            <span className="text-xs font-bold text-on-surface-variant">{order.time}</span>
                            <span className="text-primary font-black">{order.total}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Order Detail View (Modal-ish) */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 space-y-8 animate-in slide-in-from-bottom duration-300">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Order Details</p>
                                <h3 className="text-2xl font-black text-on-background">{selectedOrder.customer}</h3>
                                <p className="text-on-surface-variant font-bold">{selectedOrder.phone}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="w-10 h-10 bg-surface-container-low rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-on-surface">close</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-surface-container-low p-4 rounded-2xl space-y-2">
                                <p className="text-[10px] uppercase font-black text-on-surface-variant opacity-60">Delivery Location</p>
                                <p className="font-bold text-on-surface">{selectedOrder.location}</p>
                            </div>

                            <div className="bg-surface-container-low p-4 rounded-2xl space-y-2">
                                <p className="text-[10px] uppercase font-black text-on-surface-variant opacity-60">Status History</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <button 
                                        onClick={() => updateStatus(selectedOrder.id, 'Confirmed')}
                                        className={`py-3 rounded-xl text-xs font-black uppercase transition-all ${
                                            selectedOrder.status === 'Confirmed' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600'
                                        }`}
                                    >Confirm</button>
                                    <button 
                                        onClick={() => updateStatus(selectedOrder.id, 'Ready')}
                                        className={`py-3 rounded-xl text-xs font-black uppercase transition-all ${
                                            selectedOrder.status === 'Ready' ? 'bg-primary text-white' : 'bg-white text-primary border border-primary'
                                        }`}
                                    >Mark Ready</button>
                                    <button 
                                        onClick={() => updateStatus(selectedOrder.id, 'Delivered')}
                                        className={`py-3 rounded-xl text-xs font-black uppercase transition-all col-span-2 ${
                                            selectedOrder.status === 'Delivered' ? 'bg-secondary text-white' : 'bg-white text-secondary border border-secondary'
                                        }`}
                                    >Mark Delivered</button>
                                </div>
                            </div>
                        </div>

                        {/* Direct Communication Actions */}
                        <div className="grid grid-cols-2 gap-4">
                            <a 
                                href={`tel:${selectedOrder.phone}`}
                                className="flex items-center justify-center gap-3 bg-primary text-white py-5 rounded-2xl font-black shadow-lg"
                            >
                                <span className="material-symbols-outlined text-xl">call</span>
                                Call
                            </a>
                            <a 
                                href={`https://wa.me/231${selectedOrder.phone.slice(1)}?text=Hello ${selectedOrder.customer}, this is Yenpea Group Inc. regarding your order ${selectedOrder.id}.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-5 rounded-2xl font-black shadow-lg"
                            >
                                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
