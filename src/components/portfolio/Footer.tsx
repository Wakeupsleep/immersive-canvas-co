import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-gradient-hero">
      <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-40">
        <p className="mb-6 text-[11px] tracking-[0.4em] text-accent">
          ⌖ LET'S COLLABORATE
        </p>
        <h2 className="max-w-4xl font-display text-5xl leading-[0.95] tracking-tight md:text-8xl">
          Ready for the
          <br />
          <span className="italic text-muted-foreground">Next Big Scene?</span>
        </h2>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">
          Available for freelance projects, retained partnerships, and ambitious
          brands ready to stand out.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-10 h-16 rounded-2xl px-10 text-base font-semibold"
        >
          <a href="mailto:ashokthapa.np@gmail.com?subject=New%20Project%20Inquiry&body=Hi%20Ashok%2C%0A%0AI%27d%20love%20to%20start%20a%20project%20with%20you.%0A%0A">
            Start a Project
            <ArrowUpRight className="ml-1 h-5 w-5" />
          </a>
        </Button>

        <div className="mt-24 flex flex-col gap-6 border-t border-border pt-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 Ashok Thapa. Crafted with intent.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-smooth hover:text-foreground">{"\n"}</a>
            <a href="#" className="transition-smooth hover:text-foreground">{"\n"}</a>
            <a
              href="mailto:ashokthapa.np@gmail.com"
              className="transition-smooth hover:text-foreground"
            >
              {"\n"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
