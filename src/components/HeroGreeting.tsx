import React from 'react';

const HeroGreeting: React.FC = () => {
    return (
        <section className="mb-12 mt-8 md:text-left text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary leading-[1.1] tracking-tighter">
                Your Health, <br className="hidden md:block"/> Our Priority.
            </h2>
            <p className="text-on-surface-variant mt-6 text-lg md:text-xl font-medium max-w-2xl md:mx-0 mx-auto opacity-80">Welcome to Yenpea Group Inc. Your premium digital apothecary for quality medication and professional pharmacist support in Liberia.</p>
        </section>
    );
};

export default HeroGreeting;
