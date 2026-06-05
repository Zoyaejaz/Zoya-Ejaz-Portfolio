'use client';

import { useEffect, useRef } from 'react';
import styles from './Certifications.module.css';

const certificationsData = [
  {
    id: 1,
    title: 'AWS Cloud Practitioner Essentials Certification',
    issuer: 'Amazon Web Services',
    date: 'Feb 2026',
    credentialId: 'Cred ID: AWS-CP-9098-CV',
    file: '/certificates/AWS.pdf',
  },
  {
    id: 2,
    title: 'Applied Machine Learning in Python Certification',
    issuer: 'University of Michigan - Coursera',
    date: 'Oct 2025',
    credentialId: 'Cred ID: TJ-0498-8742',
    file: '/certificates/ML.pdf',
  },
  
  {
    id: 3,
    title: 'Data Analytics Job Simulation',
    issuer: 'Delloite - Forage',
    date: 'May 2025',
    credentialId: 'Cred ID: FEM-CC-3487-SH',
    file: '/certificates/Deloitte.pdf',
  },
  {
    id: 4,
    title: 'Solution Architecture Job Simulation',
    issuer: 'AWS - Forage',
    date: 'April 2025',
    credentialId: 'Cred ID: AWS-SA-1039-PR',
    file: '/certificates/AWS Forage.pdf',
  }
];

export default function Certifications() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let gsap, ScrollTrigger, ctx;
    async function initGSAP() {
      const mod = await import('gsap');
      gsap = mod.gsap || mod.default;
      const triggerMod = await import('gsap/ScrollTrigger');
      ScrollTrigger = triggerMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(`.${styles.header}`, 
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: `.${styles.header}`,
              start: 'top 80%',
            },
          }
        );

        gsap.fromTo(`.${styles.card}`, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1.2,
            scrollTrigger: {
              trigger: `.${styles.grid}`,
              start: 'top 75%',
            },
          }
        );
      }, sectionRef.current);
    }

    initGSAP();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className={styles.certifications}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.secNumber}>04</span>
          <span className={styles.secDivider} />
          <h2 className={styles.secTitle}>CERTIFICATIONS</h2>
        </div>

        {/* Certifications Grid */}
        <div className={styles.grid}>
          {certificationsData.map((cert) => (
            <div key={cert.id} className={styles.card}>
              
              {/* Card Header decoration */}
              <div className={styles.cardHeader}>
                <div className={styles.badgeIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <span className={styles.date}>{cert.date}</span>
              </div>

              {/* Title & Issuer */}
              <h3 className={styles.title}>{cert.title}</h3>
              <h4 className={styles.issuer}>{cert.issuer}</h4>
              
              
              <div className={styles.cardDivider} />

              {/* View Certificate CTA Button */}
              <a
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.verifyLink}
              >
                <span>View Certificate</span>
                <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12,5 19,12 12,19" />
                </svg>
              </a>

              {/* Glowing Background Overlay */}
              <div className={styles.cardGlow} />

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
