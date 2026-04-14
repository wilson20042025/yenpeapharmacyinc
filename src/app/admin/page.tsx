"use client";

import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '@/lib/api';

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
            await updateOrderStatus(orderId, newStatus);
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
            if (selectedOrder?.id === orderId) {
                setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
            }
        } catch (err) {
            console.error("Status update error:", err);
            alert("Failed to update status");
        }
    };

    if (loading) {
        return (
            <div className="p-8 text-center text-on-surface-variant font-medium">
                Loading orders...
            </div>
        );
    }

    return (
        <div className="bg-surface text-on-surface min-h-screen">
            <header className="p-6 md:p-10">
                <h1 className="text-3xl font-black text-on-surface-variant font-lexend">Manage Orders</h1>
                <p className="text-on-surface-variant font-medium text-sm mt-1">Review and fulfill customer requests.</p>
            </header>

            <main className="px-6 md:px-10 pb-20 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <div 
                            key={order.id} 
                            onClick={() => setSelectedOrder(order)}
                            className="bg-surface-container-low p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm space-y-4 hover:bg-surface-container-high transition-all cursor-pointer group"
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black uppercase text-primary tracking-widest">{order.id}</span>
                                    <h2 className="text-lg font-black text-on-surface">{order.customer}</h2>
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                                    order.status === 'Pending' ? 'bg-error-container text-on-error-container' :
                                    order.status === 'Confirmed' ? 'bg-primary-container text-on-primary-container' :
                                    order.status === 'Ready' ? 'bg-tertiary-container text-on-tertiary-container' :
                                    'bg-secondary-container text-on-secondary-container'
                                }`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
                                <span className="material-symbols-outlined text-lg">schedule</span>
                                <span>{order.time}</span>
                            </div>

                            <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                                <span className="text-primary font-black text-xl">{order.total}</span>
                                <div className="bg-primary text-on-primary p-2 rounded-xl group-hover:translate-x-1 transition-transform">
                                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Order Details Drawer Overlay */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-end justify-center">
                    <div 
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedOrder(null)}
                    ></div>
                    <div className="relative bg-surface p-8 pt-4 rounded-t-[3rem] w-full max-w-lg shadow-2xl animate-in slide-in-from-bottom-full duration-500">
                        <div className="w-12 h-1.5 bg-outline-variant rounded-full mx-auto mb-8 opacity-40"></div>
                        
                        <div className="space-y-8 max-h-[80vh] overflow-y-auto pb-10 pr-2">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <span className="text-xs font-black uppercase text-primary tracking-widest">{selectedOrder.id}</span>
                                    <h2 className="text-3xl font-black text-on-surface">{selectedOrder.customer}</h2>
                                    <p className="text-on-surface-variant font-bold text-lg">{selectedOrder.phone}</p>
                                </div>
                                <button 
                                    onClick={() => setSelectedOrder(null)}
                                    className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface active:scale-90 transition-all"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-black uppercase text-on-surface-variant tracking-widest flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">location_on</span>
                                    Delivery Location
                                </h3>
                                <p className="bg-surface-container-low p-6 rounded-3xl font-bold text-on-surface leading-normal">
                                    {selectedOrder.location}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-black uppercase text-on-surface-variant tracking-widest flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">medication</span>
                                    Items Ordered
                                </h3>
                                <div className="space-y-3">
                                    {selectedOrder.medicines.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/5">
                                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black">
                                                {index + 1}
                                            </div>
                                            <span className="font-bold text-on-surface">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-black uppercase text-on-surface-variant tracking-widest">Update Order Status</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {(['Pending', 'Confirmed', 'Ready', 'Delivered'] as OrderStatus[]).map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => updateStatus(selectedOrder.id, status)}
                                            className={`py-4 rounded-2xl font-black transition-all active:scale-95 border-2 ${
                                                selectedOrder.status === status ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container-low text-on-surface-variant border-transparent hover:border-outline-variant'
                                            }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-center">
                                <span className="text-on-surface-variant font-bold">Total Amount Due</span>
                                <span className="text-3xl font-black text-primary">{selectedOrder.total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
