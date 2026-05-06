import Cursor from "@/components/portfolio/Cursor";
import Footer from "@/components/portfolio/Footer";
import Hero from "@/components/portfolio/Hero";
import Loader from "@/components/portfolio/Loader";
import CinematicProjects from "@/components/portfolio/CinematicProjects";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden text-foreground">
      <Loader />
      <Cursor />
      <main>
        <h1 className="sr-only">Ashok Thapa — Graphic Designer Portfolio</h1>
        <Hero />
        <CinematicProjects />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
