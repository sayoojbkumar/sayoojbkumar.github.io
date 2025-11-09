import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Achievements } from "@/components/Achievements";
import { Speaking } from "@/components/Speaking";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Achievements />
      <Speaking />
      <Contact />
    </main>
  );
};

export default Index;
