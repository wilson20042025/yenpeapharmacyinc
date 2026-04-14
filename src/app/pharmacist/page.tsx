import SubPageHeader from '@/components/SubPageHeader';
import MobileNav from '@/components/MobileNav';

export default function PharmacistPage() {
    return (
        <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center mx-auto overflow-x-hidden">
            <SubPageHeader title="Talk to Pharmacist" />
            
            <main className="pt-20 pb-32 px-6 max-w-md mx-auto space-y-8">
                {/* Welcome Message Section */}
                <section className="space-y-4">
                    <div className="w-16 h-16 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary-container mb-6">
                        <span className="material-symbols-outlined text-4xl" data-icon="medical_services" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                    </div>
                    <h2 className="text-3xl font-extrabold leading-tight text-on-surface tracking-tight">Our pharmacists are here to help you.</h2>
                    <p className="text-on-surface-variant leading-relaxed">Choose your preferred way to get expert medical advice directly from our certified pharmacy team in Liberia.</p>
                </section>

                {/* Primary Action Buttons */}
                <div className="space-y-4">
                    {/* WhatsApp Action */}
                    <a className="flex items-center gap-4 p-5 bg-primary rounded-xl text-on-primary active:scale-95 transition-transform duration-200 shadow-[0_12px_32px_rgba(0,101,70,0.08)]" href="#">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl" data-icon="chat">chat</span>
                        </div>
                        <div className="flex-grow">
                            <span className="block font-bold text-lg">Message on WhatsApp</span>
                            <span className="text-sm opacity-90">Quick response within 15 min</span>
                        </div>
                    </a>
                    {/* Call Action */}
                    <a className="flex items-center gap-4 p-5 bg-tertiary rounded-xl text-on-tertiary active:scale-95 transition-transform duration-200" href="#">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl" data-icon="call">call</span>
                        </div>
                        <div className="flex-grow">
                            <span className="block font-bold text-lg">Call Pharmacist</span>
                            <span className="text-sm opacity-90">Direct consultation</span>
                        </div>
                    </a>
                </div>

                {/* Low Bandwidth Form */}
                <section className="bg-surface-container-low p-6 rounded-2xl space-y-6">
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-on-surface">Leave a Message</h3>
                        <p className="text-sm text-on-surface-variant">We'll call you back as soon as possible.</p>
                    </div>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-on-surface-variant ml-1">Full Name</label>
                            <input className="w-full h-14 bg-surface-container-lowest border-0 rounded-xl px-4 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline-variant" placeholder="Enter your name" type="text" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-on-surface-variant ml-1">Phone Number</label>
                            <input className="w-full h-14 bg-surface-container-lowest border-0 rounded-xl px-4 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline-variant" placeholder="077 / 088 number" type="tel" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-on-surface-variant ml-1">Your Message</label>
                            <textarea className="w-full bg-surface-container-lowest border-0 rounded-xl p-4 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline-variant resize-none" placeholder="How can we help you today?" rows={4}></textarea>
                        </div>
                        <button className="w-full py-4 bg-primary-container text-on-primary-container font-bold text-lg rounded-xl active:scale-95 transition-all duration-300 shadow-sm mt-2" type="submit">
                            Send Message
                        </button>
                    </form>
                </section>

                {/* Visual Anchor */}
                <div className="relative w-full h-40 rounded-2xl overflow-hidden grayscale">
                    <img alt="Pharmacist working" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGg1MmGe0_09c_GUOsy15lbldVO8Y0YCDg2IVYaAheHbETWVrM-RHQIVExsMv7ZneoGGYgXyAUIao2SUNbs4Z3yyMHyxnoIPVndEntkTJ1sH0Ue1KRA-9RUfSDkU4WQA3IAnY4hBEbDvhyD76wBXLSgzA72S1Uk6GrugukAajBezfFdd05UxFNaDWNFgL4kXgU7htjmJUS4k4lHv1gnOj-7papuca28t-kQi9ahn5cQQmmGvl7bk0D0S6XrzTkqFfYtIGQ2a-Ogw0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
                </div>
            </main>

            <MobileNav activeTab="help" />
        </div>
    );
}
