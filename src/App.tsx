import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import WhyChooseUs from './sections/WhyChooseUs';
import Departments from './sections/Departments';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Departments />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
