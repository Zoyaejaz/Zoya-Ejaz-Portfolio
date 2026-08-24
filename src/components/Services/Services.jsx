'use client';

import { useEffect, useRef } from 'react';
import styles from './Services.module.css';

const servicesData = [
  {
    id: 'creative',
    num: '01',
    title: 'Machine Learning',
    description: 'Building data-driven machine learning solutions that transform raw data into accurate predictions, meaningful patterns, and actionable insights.',
    deliverables: ['Regression & Classification Models', 'Feature Engineering & Selection', 'Ensemble Learning & SVM', 'Model Evaluation & Optimization'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.cardIcon}>
        <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
        <line x1="12" y1="22" x2="12" y2="15.5" />
        <polyline points="22,8.5 12,15.5 2,8.5" />
        <polyline points="12,2 12,15.5" />
      </svg>
    )
  },
  {
    id: 'design',
    num: '02',
    title: 'Data Science & Analytics',
    description: 'Exploring complex datasets through statistical analysis, visualization, and experimentation to uncover insights that support better decisions.',
    deliverables: ['Exploratory Data Analysis', 'Statistical Analysis & Hypothesis Testing', 'Data Cleaning & Preprocessing', 'Data Visualization & Insights'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.cardIcon}>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    )
  },
  {
    id: 'architecture',
    num: '03',
    title: 'AI & Intelligent Systems',
    description: 'Developing intelligent applications using modern AI techniques, NLP, deep learning, and emerging LLM technologies.',
    deliverables: ['NLP & Text Classification', 'Neural Networks & CNNs', 'LLMs & Prompt Engineering', 'AI-Powered Applications'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.cardIcon}>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  }
];

export default function Services() {
  const sectionRef = useRef(null);

  // GSAP scroll trigger for grid items stagger fade-in
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
            stagger: 0.2,
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
    <section id="services" ref={sectionRef} className={styles.services}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.secNumber}>04</span>
          <span className={styles.secDivider} />
          <h2 className={styles.secTitle}>SERVICES</h2>
        </div>

        {/* Services Grid */}
        <div className={styles.grid}>
          {servicesData.map((service) => (
            <div key={service.id} className={styles.card}>
              
              {/* Card Header */}
              <div className={styles.cardHeader}>
                <span className={styles.serviceNum}>{service.num}</span>
                {service.icon}
              </div>

              {/* Title & Description */}
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
              
              <div className={styles.cardDivider} />

              {/* Deliverables List */}
              <ul className={styles.deliverablesList}>
                {service.deliverables.map((item, index) => (
                  <li key={index} className={styles.deliverableItem}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.checkIcon}>
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Decorative Glow Ring */}
              <div className={styles.cardGlow} />

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
