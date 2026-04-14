import SubPageHeader from '@/components/SubPageHeader';
import MobileNav from '@/components/MobileNav';
import WhatsAppFAB from '@/components/WhatsAppFAB';

export default function UploadPage() {
    return (
        <div className="bg-surface text-on-background min-h-screen pb-32">
            <SubPageHeader title="Upload Prescription" />
            
            <main className="pt-20 px-6 max-w-md mx-auto space-y-8">
                {/* Header Section (Organic Editorialism) */}
                <header className="space-y-4">
                    <div className="w-16 h-16 bg-secondary-container rounded-xl flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-4xl" data-icon="description">description</span>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight text-on-surface">Upload your prescription</h2>
                        <p className="text-on-surface-variant text-lg">Take a photo or select a file of your doctor's note.</p>
                    </div>
                </header>

                {/* Main Action Card (Tonal Layering) */}
                <section className="bg-surface-container-lowest p-6 rounded-xl space-y-4 shadow-[0_12px_32px_rgba(0,101,70,0.06)]">
                    <button className="w-full h-16 flex items-center justify-center gap-4 bg-primary text-on-primary rounded-xl font-bold text-lg active:scale-[0.98] transition-all">
                        <span className="material-symbols-outlined" data-icon="photo_camera" style={{ fontVariationSettings: "'FILL' 1" }}>photo_camera</span>
                        Take Photo
                    </button>
                    <button className="w-full h-16 flex items-center justify-center gap-4 bg-secondary-container text-on-secondary-container rounded-xl font-bold text-lg active:scale-[0.98] transition-all">
                        <span className="material-symbols-outlined" data-icon="folder_open" style={{ fontVariationSettings: "'FILL' 1" }}>folder_open</span>
                        Select from Gallery
                    </button>
                </section>

                {/* Message Input */}
                <section className="space-y-3">
                    <label className="block font-semibold text-on-surface-variant ml-1">Instructions for pharmacist (Optional)</label>
                    <textarea 
                        className="w-full min-h-[120px] bg-surface-container-low border-0 focus:ring-2 focus:ring-primary rounded-xl p-4 text-on-surface text-lg placeholder:text-outline-variant resize-none" 
                        placeholder="e.g. Please include vitamins..."
                    ></textarea>
                </section>

                {/* Details Section (Low Bandwidth/Minimalist) */}
                <section className="grid grid-cols-1 gap-4">
                    <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded-xl">
                        <span className="material-symbols-outlined text-primary mt-1" data-icon="call">call</span>
                        <div>
                            <p className="font-bold text-on-surface">We will call you</p>
                            <p className="text-on-surface-variant">To confirm your order details</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded-xl">
                        <span className="material-symbols-outlined text-primary mt-1" data-icon="schedule">schedule</span>
                        <div>
                            <p className="font-bold text-on-surface">Delivery takes 1-2 hours</p>
                            <p className="text-on-surface-variant">Express delivery across Monrovia</p>
                        </div>
                    </div>
                </section>

                {/* Primary Action Button */}
                <section className="pt-4">
                    <button className="w-full bg-primary text-on-primary py-6 rounded-xl font-black text-xl tracking-wide shadow-lg active:scale-95 transition-all">
                        Submit Prescription
                    </button>
                </section>
            </main>

            <WhatsAppFAB />
            <MobileNav activeTab="order" />
        </div>
    );
}
