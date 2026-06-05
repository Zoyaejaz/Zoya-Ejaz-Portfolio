import VideoIntro from '../components/VideoIntro/VideoIntro';
import Navigation from '../components/Navigation/Navigation';
import About from '../components/About/About';
import Works from '../components/Works/Works';
import Experience from '../components/Experience/Experience';
import Certifications from '../components/Certifications/Certifications';
import Services from '../components/Services/Services';
import Contact from '../components/Contact/Contact';

export const metadata = {
  title: 'Zoya Ejaz — Creative Developer & Digital Architect',
  description: 'Cinematic portfolio — crafting immersive web experiences.',
};

export default function Home() {
  return (
    <main>
      <Navigation />
      
      <div id="home">
        <VideoIntro videoSrc="/hero.mp4" />
      </div>

      <hr className="sectionSeparator" />
      <About />
      
      <hr className="sectionSeparator" />
      <Works />
      
      <hr className="sectionSeparator" />
      <Experience />
      
      <hr className="sectionSeparator" />
      <Certifications />
      
      <hr className="sectionSeparator" />
      <Services />
      
      <hr className="sectionSeparator" />
      <Contact />
    </main>
  );
}
