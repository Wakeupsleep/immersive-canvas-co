import Cursor from "@/components/portfolio/Cursor";
import Footer from "@/components/portfolio/Footer";
import Hero from "@/components/portfolio/Hero";
import Loader from "@/components/portfolio/Loader";
import Marquee from "@/components/portfolio/Marquee";
import Projects from "@/components/portfolio/Projects";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Loader />
      <Cursor />
      <main>
        <h1 className="sr-only">Ashok Thapa — Graphic Designer Portfolio</h1>
        <Hero />
        <Marquee />
        <Projects />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
