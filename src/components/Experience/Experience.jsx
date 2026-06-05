'use client';

import { useEffect, useRef } from 'react';
import styles from './Experience.module.css';

export default function Experience() {
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
        // Entrance animations
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

        gsap.fromTo(`.${styles.cardLeft}`, 
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            scrollTrigger: {
              trigger: `.${styles.grid}`,
              start: 'top 75%',
            },
          }
        );

        gsap.fromTo(`.${styles.cardRight}`, 
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
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
    <section id="experience" ref={sectionRef} className={styles.experience}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.secNumber}>03</span>
          <span className={styles.secDivider} />
          <h2 className={styles.secTitle}>EXPERIENCE</h2>
        </div>

        {/* Re-designed Grid for Single Experience */}
        <div className={styles.grid}>
          
          {/* Left Side: Role Meta & Metrics */}
          <div className={styles.cardLeft}>
            <span className={styles.period}>2025 — 2026</span>
            <h3 className={styles.roleTitle}>Frontend Developer Intern</h3>
            <h4 className={styles.companyName}>Mittal Alliance Industries Private Limited</h4>
            
            <p className={styles.summary}>
              Structuring high-performance WebGL modules, custom Next.js architectures, and fluid canvas animations for clients and digital agencies worldwide. Collaborating at the intersection of UX art direction and frontend engineering.
            </p>

            {/* Visual Client Metrics */}
            <div className={styles.metricsGrid}>
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>10+</span>
                <span className={styles.metricLabel}>Immersive Sites Built</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>+80%</span>
                <span className={styles.metricLabel}>Good Feedback</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricValue}>+50%</span>
                <span className={styles.metricLabel}>Session Retention Lift</span>
              </div>
            </div>
          </div>

          {/* Right Side: Key Achievements & Tech Stack */}
          <div className={styles.cardRight}>
            <h4 className={styles.colSub}>Core Deliverables &amp; Impact</h4>
            
            <ul className={styles.bulletList}>
              <li className={styles.bulletItem}>
                <span className={styles.bulletDot} />
                <p>Crafted 15+ responsive frontend applications using React.js, Next.js, and Tailwind CSS.Designed and prototyped 15+ pages and components in Figma for development handoff.</p>
              </li>
              <li className={styles.bulletItem}>
                <span className={styles.bulletDot} />
                <p>Engineered responsive modular page structures in Next.js and React.js, integrating headless databases (Sanity, Contentful) to provide client configuration controls.</p>
              </li>
              <li className={styles.bulletItem}>
                <span className={styles.bulletDot} />
                <p>Built complex timelines, kinetic scroll-based triggers, and fluid simulation overlays using GSAP and high-performance HTML5 Canvas APIs.</p>
              </li>
              <li className={styles.bulletItem}>
                <span className={styles.bulletDot} />
                <p>Standardized semantically sound HTML5 markup layouts, schema integrations, and accessibility checkpoints, boosting search visibility scores.</p>
              </li>
            </ul>

            <div className={styles.divider} />

            <h4 className={styles.techTitle}>Key Environments Utilised</h4>
            <div className={styles.techTags}>
              <span className={styles.tag}>Next.js</span>
              <span className={styles.tag}>React.js</span>
              <span className={styles.tag}>Tailwind CSS</span>
              <span className={styles.tag}>GSAP Motion</span>
              <span className={styles.tag}>Node.js &amp; GraphQL</span>
              <span className={styles.tag}>Git CI/CD</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
