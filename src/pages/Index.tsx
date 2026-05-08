import Cursor from "@/components/portfolio/Cursor";
import SidewaveLoader from "@/components/sidewave/Loader";
import SideMenu from "@/components/sidewave/SideMenu";
import {
  OriginSection,
  AboutSection,
  ServicesSection,
  UseCasesSection,
  ContactSection,
} from "@/components/sidewave/Sections";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-foreground">
      <SidewaveLoader />
      <Cursor />
      <SideMenu />
      <main>
        <h1 className="sr-only">Ashok Thapa — Graphic & Motion Designer</h1>
        <OriginSection />
        <AboutSection />
        <ServicesSection />
        <UseCasesSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
