import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { PathwaysSection } from "@/components/site/pathways-section";
import { PhilosophySection } from "@/components/site/philosophy-section";
import { ServicesSection } from "@/components/site/services-section";
import { CorporateSection } from "@/components/site/corporate-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { ConsultationForm } from "@/components/site/consultation-form";
import { FaqSection } from "@/components/site/faq-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <PathwaysSection />
        <PhilosophySection />
        <ServicesSection />
        <CorporateSection />
        <TestimonialsSection />
        <ConsultationForm />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
