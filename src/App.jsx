import './App.css';
import TechBackground from './components/Background/TechBackground';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Stack from './components/Stack/Stack';
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <>
      {/* Animated background layer — fixed, behind everything */}
      <TechBackground />

      {/* Fixed navigation */}
      <Navbar />

      {/* Page content */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Stack />
        <Projects />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
