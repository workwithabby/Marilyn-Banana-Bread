import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import About from "@/components/About";
import Storage from "@/components/Storage";
import HowToOrder from "@/components/HowToOrder";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Menu />
        <About />
        <Storage />
        <HowToOrder />
      </main>
      <Footer />
    </>
  );
}
