'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './About.module.css';

const skillData = {
  creative: [
    { name: 'WebGL & Three.js', level: 90 },
    { name: 'GSAP / Motion Design', level: 95 },
    { name: 'Creative Coding & Shaders', level: 85 },
    { name: 'UI / UX Art Direction', level: 88 },
  ],
  engineering: [
    { name: 'React / Next.js', level: 95 },
    { name: 'JavaScript / TypeScript', level: 92 },
    { name: 'CSS Architecture / SCSS', level: 90 },
    { name: 'Tailwind CSS', level: 85 },
  ],
  ml: [
    { name: 'Python & PyTorch', level: 80 },
    { name: 'Neural Graphics & Shaders', level: 85 },
    { name: 'Hugging Face / LLM APIs', level: 75 },
    { name: 'TensorFlow.js', level: 70 },
  ],
  systems: [
    { name: 'Node.js / Express', level: 80 },
    { name: 'REST APIs & GraphQL', level: 85 },
    { name: 'Git & CI/CD Pipelines', level: 78 },
    { name: 'SQL & NoSQL Databases', level: 75 },
  ],
};

export default function About() {
  const sectionRef = useRef(null);
  const yearsRef = useRef(null);
  const projectsRef = useRef(null);
  const awardsRef = useRef(null);

  const [activeTab, setActiveTab] = useState('creative');

  useEffect(() => {
    let gsap, ScrollTrigger, ctx;
    
    async function initGSAP() {
      const mod = await import('gsap');
      gsap = mod.gsap || mod.default;
      const triggerMod = await import('gsap/ScrollTrigger');
      ScrollTrigger = triggerMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Stats count-up animation
        const stats = [
          { ref: yearsRef, target: 5, suffix: '+' },
          { ref: projectsRef, target: 40, suffix: '+' },
          { ref: awardsRef, target: 12, suffix: '' },
        ];

        stats.forEach((stat) => {
          if (!stat.ref.current) return;
          const obj = { val: 0 };
          
          gsap.to(obj, {
            val: stat.target,
            scrollTrigger: {
              trigger: stat.ref.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              if (stat.ref.current) {
                stat.ref.current.textContent = Math.floor(obj.val) + stat.suffix;
              }
            },
          });
        });

        // Content reveal fade-in-up
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

        gsap.fromTo(`.${styles.statementGrid}`, 
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            scrollTrigger: {
              trigger: `.${styles.statementGrid}`,
              start: 'top 80%',
            },
          }
        );

        gsap.fromTo(`.${styles.gridCol}`, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.25,
            duration: 1.2,
            scrollTrigger: {
              trigger: `.${styles.gridContainer}`,
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
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.secNumber}>01</span>
          <span className={styles.secDivider} />
          <h2 className={styles.secTitle}>ABOUT ME</h2>
        </div>

        {/* Big Statement & Current Research Grid */}
        <div className={styles.statementGrid}>
          <div className={styles.introText}>
            <p className={styles.statement}>
              I bridge the gap between cinematic art direction and clean creative engineering. 
              Every pixel is a conscious design choice; every interaction is a moment of digital immersion.
            </p>
          </div>
          
          <div className={styles.researchCard}>
            <div className={styles.researchBadge}>
              <span className={styles.researchDot} />
              Current Focus
            </div>
            <h3 className={styles.researchTitle}>Creative AI &amp; Neural Graphics</h3>
            <p className={styles.researchText}>
              Investigating the intersection of deep learning and real-time graphics. Training custom models and deploying lightweight physics approximations directly in the browser via WebGL and TensorFlow.js.
            </p>
          </div>
        </div>

        <div className={styles.gridContainer}>
          {/* Left Column: Bio & Core Philosophy */}
          <div className={styles.gridCol}>
            <h3 className={styles.colTitle}>Philosophy</h3>
            <p className={styles.bioParagraph}>
              As a Creative Developer, I design and develop high-fidelity user interfaces that leverage the full potential of hardware-accelerated animations, shaders, and immersive motion. I believe web applications shouldn't just be utilities—they should be digital environments that captivate and respond to human curiosity.
            </p>
            <p className={styles.bioParagraph}>
              My workflow blends meticulous layout structures with dynamic layouts, ensuring pixel-perfect responsive execution and optimization across all screens.
            </p>

            {/* Quick Stat Items */}
            <div className={styles.statsContainer}>
              <div className={styles.statBox}>
                <span ref={yearsRef} className={styles.statNum}>3+</span>
                <span className={styles.statLabel}>Years Coding</span>
              </div>
              <div className={styles.statBox}>
                <span ref={projectsRef} className={styles.statNum}>20+</span>
                <span className={styles.statLabel}>Deployments</span>
              </div>
            </div>
          </div>

          {/* Right Column: Skills Matrix */}
          <div className={`${styles.gridCol} ${styles.skillsColumn}`}>
            <h3 className={styles.colTitle}>Expertise</h3>
            
            {/* Tab Selectors */}
            <div className={styles.tabs}>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'creative' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('creative')}
              >
                Creative
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'engineering' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('engineering')}
              >
                Engineering
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'ml' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('ml')}
              >
                Machine Learning
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'systems' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('systems')}
              >
                Backend &amp; Tools
              </button>
            </div>

            {/* Skill Bars */}
            <div className={styles.skillsGrid}>
              {skillData[activeTab].map((skill, index) => (
                <div key={skill.name} className={styles.skillRow}>
                  <div className={styles.skillMeta}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillPercent}>{skill.level}%</span>
                  </div>
                  <div className={styles.progressBarBg}>
                    <div 
                      key={`${activeTab}-${index}`} // Force re-render of bars to animate width transitions on tab change
                      className={styles.progressBarFill} 
                      style={{ 
                        '--target-width': `${skill.level}%`,
                        animationDelay: `${index * 0.08}s`
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
