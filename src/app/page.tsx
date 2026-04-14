import React from 'react';
import TopAppBar from '@/components/TopAppBar';
import HeroGreeting from '@/components/HeroGreeting';
import ActionGrid from '@/components/ActionGrid';
import HealthNeeds from '@/components/HealthNeeds';
import PopularMedicines from '@/components/PopularMedicines';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import MobileNav from '@/components/MobileNav';

export default function Home() {
  return (
    <>
      <TopAppBar />

      <main className="pt-20 pb-32 px-6 max-w-md md:max-w-4xl lg:max-w-6xl mx-auto space-y-10">
        <HeroGreeting />
        <ActionGrid />
        <HealthNeeds />
        <PopularMedicines />
      </main>

      <WhatsAppFAB />
      <MobileNav activeTab="home" />
    </>
  );
}
