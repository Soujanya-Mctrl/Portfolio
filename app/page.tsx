import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import ProjectsCarousel from "@/components/Projects";
import Qualifications from "@/components/Qualifications";
import Contact from "@/components/Contacts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      <main className="min-h-screen w-full bg-white dark:bg-black">
        <Hero />
        <About />
        <Skills />
        <ProjectsCarousel />
        <Qualifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
