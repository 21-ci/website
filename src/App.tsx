import { LocaleProvider } from "./context/LocaleContext";
import { DotField } from "./components/effects/DotField";
import { Navbar } from "./components/sections/Navbar";
import { Hero } from "./components/sections/Hero";
import { Features } from "./components/sections/Features";
import { Pricing } from "./components/sections/Pricing";
import { Competitors } from "./components/sections/Competitors";
import { OpenSource } from "./components/sections/OpenSource";
import { FounderContact } from "./components/sections/FounderContact";
import { Footer } from "./components/sections/Footer";
import { SectionDivider } from "./components/ui/SectionDivider";

export default function App() {
  return (
    <LocaleProvider>
      <div className="page-gradient relative min-h-screen">
        <DotField />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <SectionDivider />
            <Features />
            <SectionDivider />
            <Competitors />
            <SectionDivider />
            <Pricing />
            <SectionDivider />
            <OpenSource />
            <FounderContact />
          </main>
          <Footer />
        </div>
      </div>
    </LocaleProvider>
  );
}
