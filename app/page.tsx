'use client';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import HeroSection from '@/components/HeroSection';
import BrowseEvents from '@/components/BrowseEvents';
import ImpactfulEventsBanner from '@/components/ImpactfulEventsBanner';
import PricingPlans from '@/components/PricingPlans';
export default function Home() { 
  return (
    <div>
      <Header/>
      <HeroSection/>
      <BrowseEvents/>
      <ImpactfulEventsBanner/>
      <PricingPlans/>
      <Footer/>
    </div>
  );
}