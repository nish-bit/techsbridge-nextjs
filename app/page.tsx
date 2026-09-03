import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { CostCalculator } from "@/components/sections/CostCalculator";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TechStack } from "@/components/sections/TechStack";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <About />
      <Services />
      <Pricing />
      <CostCalculator />
      <Portfolio />
      <Process />
      <WhyChooseUs />
      <TechStack />
      <Testimonials />
      <FAQ />
      <Contact />
      <FinalCTA />
    </main>
  );
}
