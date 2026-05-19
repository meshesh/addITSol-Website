import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import TrustMetrics from "@/components/site/TrustMetrics";
import Services from "@/components/site/Services";
import AgileTransformation from "@/components/site/AgileTransformation";
import PMOConsulting from "@/components/site/PMOConsulting";
import Resources from "@/components/site/Resources";
import WhyChooseUs from "@/components/site/WhyChooseUs";
import EngagementModels from "@/components/site/EngagementModels";
import ConsultationForm from "@/components/site/ConsultationForm";
import FinalCTA from "@/components/site/FinalCTA";
import Footer from "@/components/site/Footer";

export default function LandingPage() {
    return (
        <main data-testid="landing-page" className="bg-[#071120] text-white">
            <Navbar />
            <Hero />
            <TrustMetrics />
            <Services />
            <AgileTransformation />
            <PMOConsulting />
            <Resources />
            <WhyChooseUs />
            <EngagementModels />
            <ConsultationForm />
            <FinalCTA />
            <Footer />
        </main>
    );
}
