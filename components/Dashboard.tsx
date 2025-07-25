import BrowseEvents from "./BrowseEvents";
import HeroSection from "./HeroSection";
import ImpactfulEventsBanner from "./ImpactfulEventsBanner";
import PricingPlans from "./PricingPlans";
import Footer from "./ui/Footer";


export default function Dashboard() {
  return (
    <>
      <HeroSection/>
      <BrowseEvents/>
      <ImpactfulEventsBanner/>
      <PricingPlans/>
      <Footer/>
    </>
  );
}