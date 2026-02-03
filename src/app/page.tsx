import { Hero } from '@/components/sections/Hero/Hero';
import { CaseStudies } from '@/components/sections/CaseStudies/CaseStudies';
import { TechStack } from '@/components/sections/TechStack/TechStack';
import { AIExpertise } from '@/components/sections/AIExpertise/AIExpertise';
import { Contact } from '@/components/sections/Contact/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <AIExpertise />
      <CaseStudies />
      <TechStack />
      <Contact />
    </>
  );
}
