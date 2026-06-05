'use client';

import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Services', href: '#services' },
  
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Check if page is scrolled
      setIsScrolled(window.scrollY > 50);

      // Simple active section check based on scroll bounds
      const scrollPosition = window.scrollY + 200; // Offset for header height
      const sections = navLinks.map(link => link.href.substring(1));
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial run

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const offset = 80; // Header height offset
      const targetPosition = targetElement.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* ── Scroll Progress Bar ── */}
      <div 
        className={styles.progressBar} 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          {/* Logo / Name */}
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className={styles.logo}>
            ZE<span className={styles.logoDot}>.</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className={styles.desktopNav}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`${styles.navLink} ${
                  activeSection === link.href.substring(1) ? styles.active : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact CTA Button (Desktop) */}
          <div className={styles.ctaWrap}>
            <a 
              href="#contact" 
              onClick={(e) => handleLinkClick(e, '#contact')} 
              className={styles.ctaButton}
            >
              Let's Connect
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`${styles.burger} ${mobileMenuOpen ? styles.burgerActive : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.drawerOpen : ''}`}>
        <nav className={styles.mobileNav}>
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`${styles.mobileNavLink} ${
                activeSection === link.href.substring(1) ? styles.mobileActive : ''
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className={styles.mobileCta}
            style={{ transitionDelay: `${navLinks.length * 0.1}s` }}
          >
            Let's Connect
          </a>
        </nav>
      </div>
    </>
  );
}
