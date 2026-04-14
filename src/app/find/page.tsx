import React from 'react';
import SubPageHeader from '@/components/SubPageHeader';
import MobileNav from '@/components/MobileNav';
import WhatsAppFAB from '@/components/WhatsAppFAB';

export default function FindPharmacyPage() {
    return (
        <div className="bg-surface text-on-surface min-h-screen pb-32">
            <SubPageHeader title="Find Pharmacy" />
            
            <main className="pt-20 space-y-8 px-6">
                {/* Brand Header Section */}
                <section className="space-y-1">
                    <h2 className="text-2xl font-black text-primary leading-tight">Yenpea Group Inc.</h2>
                    <p className="text-on-surface-variant text-lg">Trusted pharmacy near you</p>
                </section>

                {/* Main Branch Section */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-on-surface">Main Branch</h3>
                        <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Active Now</span>
                    </div>

                    {/* Static Map Placeholder */}
                    <div className="relative w-full h-56 bg-surface-container rounded-3xl overflow-hidden shadow-sm">
                        <img 
                            className="w-full h-full object-cover" 
                            alt="Pharmacy Location Map"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQEixRfeYCy48o5w5fTSL0_HhcbdOuhqqgvBQgRks_Kq-OZwB1D7mRd18L7l8pzLzbCfXm1CXB4npcZ7WR50vIEMxyk0IuIp1l3LHvfxUWQmbIjL8esYn5HQowzcwyAhUJ6Tr0e4tAiTJr9DqJCzR87m_X9mkOHzP2LVPMvI_0emsnq49Ijx3Lzz8rzovx87Sz4IeLA92TKL2mo6rgIo7kQZSEg3Ubursd94TZw7IGG1cKMCWfN8EnvTiGO7JqnR28XE0Xsk4tb2Y" 
                        />
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-outline-variant/15 flex items-center gap-2 shadow-sm">
                            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                            <span className="text-xs font-bold text-on-surface">Paynesville, Monrovia</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-3xl font-black text-primary mb-2">Red Light Branch</h4>
                            <p className="text-on-surface-variant font-semibold flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">storefront</span>
                                Near Red Light Market
                            </p>
                        </div>

                        <div className="bg-surface-container-low rounded-2xl p-5 border-l-4 border-primary">
                            <p className="text-xs font-black text-primary mb-1 uppercase tracking-widest">Directions</p>
                            <p className="text-on-surface leading-relaxed font-medium">From Red Light, walk 2 minutes toward the main road, next to the Total Energies station.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-secondary-container/30 p-5 rounded-2xl">
                                <p className="text-[10px] uppercase font-black text-on-secondary-container tracking-widest mb-2 opacity-70">Opening Hours</p>
                                <p className="text-xs font-bold text-on-surface leading-tight">Mon–Sat: 8am – 8pm<br />Sunday: Closed</p>
                            </div>
                            <div className="bg-primary-container/10 p-5 rounded-2xl border border-primary/5">
                                <p className="text-[10px] uppercase font-black text-primary tracking-widest mb-2 opacity-70">Pickup Available</p>
                                <p className="text-xs font-bold text-on-surface leading-tight">Order online and pick up here</p>
                            </div>
                        </div>

                        {/* Action Buttons Cluster */}
                        <div className="space-y-4 pt-2">
                            <a className="flex items-center justify-center gap-3 bg-primary text-on-primary py-6 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all" href="tel:#">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                                Call Pharmacy
                            </a>
                            <div className="grid grid-cols-2 gap-4">
                                <a className="flex items-center justify-center gap-2 bg-secondary-container text-on-secondary-container py-5 rounded-2xl font-bold active:scale-95 transition-all text-sm" href="https://wa.me/231889143013?text=Hello Yenpea Group Inc., I am looking for your branch directions.">
                                    <span className="material-symbols-outlined text-lg">chat</span>
                                    WhatsApp
                                </a>
                                <a className="flex items-center justify-center gap-2 border-2 border-primary text-primary py-5 rounded-2xl font-bold active:scale-95 transition-all text-sm" href="#">
                                    <span className="material-symbols-outlined text-lg">directions</span>
                                    Directions
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <WhatsAppFAB />
            <MobileNav activeTab="home" />
        </div>
    );
}
