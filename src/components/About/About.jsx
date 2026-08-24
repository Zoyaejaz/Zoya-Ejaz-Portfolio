'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './About.module.css';

const skillData = {
  creative: [
    { name: 'Regression & Classification', level: 90 },
    { name: 'Feature Engineering', level: 95 },
    { name: 'Ensemble Learning', level: 85 },
    { name: 'SVM & Model Optimization', level: 88 },
  ],
  engineering: [
    { name: 'Exploratory Data Analysis', level: 95 },
    { name: 'Statistical Analysis', level: 92 },
    { name: 'Data Cleaning & Preprocessing', level: 90 },
    { name: 'Data Visualization', level: 85 },
  ],
  ml: [
    { name: 'Natural Language Processing', level: 80 },
    { name: 'Text Classification', level: 85 },
    { name: 'Neural Networks & CNNs', level: 75 },
    { name: 'LLM Fundamentals & Prompt Engineering', level: 70 },
  ],
  systems: [
    { name: 'Python, SQL & Java', level: 80 },
    { name: 'Pandas, NumPy & Scikit-learn', level: 85 },
    { name: 'Matplotlib & Seaborn', level: 78 },
    { name: 'MySQL, MongoDB & Git', level: 75 },
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
          { ref: yearsRef, target: 3, suffix: '+' },
          { ref: projectsRef, target: 20, suffix: '+' },
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
              I turn data into intelligent solutions. I build machine learning models,analyze complex datasets, and develop AI-powered applications that transform data into meaningful insights.
            </p>
          </div>
          
          <div className={styles.researchCard}>
            <div className={styles.researchBadge}>
              <span className={styles.researchDot} />
              Current Focus
            </div>
            <h3 className={styles.researchTitle}>Machine Learning &amp; AI</h3>
            <p className={styles.researchText}>
              Building predictive models and intelligent applications using machine learning, deep learning, NLP, and modern AI technologies. Exploring practical applications of AI to solve real-world problems.
            </p>
          </div>
        </div>

        <div className={styles.gridContainer}>
          {/* Left Column: Bio & Core Philosophy */}
          <div className={styles.gridCol}>
            <h3 className={styles.colTitle}>Philosophy</h3>
            <p className={styles.bioParagraph}>
              As an AI & ML Developer, I enjoy working at the intersection of data, algorithms, and intelligent systems. My approach combines strong data analysis, thoughtful feature engineering, and machine learning techniques to build solutions that are accurate, practical, and scalable.
            </p>
            <p className={styles.bioParagraph}>
              I believe good AI isn't just about building a model — it's about understanding the data, solving the right problem, and turning the results into something useful.
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
                MACHINE LEARNING
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'engineering' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('engineering')}
              >
                DATA SCIENCE
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'ml' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('ml')}
              >
                AI & NLP
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'systems' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('systems')}
              >
                TOOLS & TECHNOLOGIES
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
