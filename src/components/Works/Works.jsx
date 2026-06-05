'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Works.module.css';

const projects = [
  {
    id: 'ML',
    title: 'Glaucoma',
    category: 'Machine Learning',
    tagline: 'Detection of the stages of glaucoma',
    description: 'Developed an automated computer-aided diagnosis system for glaucoma that achieved 89.43% accuracy on the RIM-ONE r12 dataset, outperforming four state-of-the-art methods with 94.85% specificity. To combat dataset limitations and overfitting, I implemented geometric data augmentation to expand the dataset fourfold (to 2,020 images) and engineered over 504 advanced texture and shape features using GLCM, LBP, HOG, and Gabor filters. By optimizing feature selection via ANOVA and PCA, and leveraging an ensemble learning architecture (SVM, Random Forest, GBM), this project successfully culminated in a submitted IEEE research paper.',
    tech: ['Python', 'LS-SVM', 'Model Training', 'Datasets'],
    image: '/project/glaucoma.jpg',
    live: 'https://github.com/Zoyaejaz/Glaucoma',
    code: 'https://github.com/Zoyaejaz/Glaucoma',
  },
  {
    id: 'ML', 
    title: 'Heart Disease Prediction',
    category: 'Machine Learning',
    tagline: 'Transforming raw medical data into predictive cardiovascular analytics.',
    description: 'Conducted comprehensive Exploratory Data Analysis (EDA) on a heart disease dataset to uncover critical medical patterns, trends, and health risk factors. Utilizing Python (Pandas and NumPy), I handled data cleaning and preprocessing to ensure dataset integrity. I then leveraged Matplotlib and Seaborn to build interactive visualizations and perform deep correlation analyses between key physiological attributes—such as age, cholesterol levels, and blood pressure—and heart disease occurrence, translating complex medical data into actionable, data-driven predictive insights.',
    tech: ['Python', 'Data Cleaning', 'Data Visualization', 'EDA'],
    image: '/project/heart.png',
    live: 'https://github.com/Zoyaejaz/Heart-Disease-Prediction',
    code: 'https://github.com/Zoyaejaz/Heart-Disease-Prediction',
  },
  {
    id: 'W-D',
    title: 'BoneSheet',
    category: 'Web Development',
    tagline: 'Google Sheets, stripped down to its powerful engineering bones',
    description: 'Engineered BoneSheets (Bonesheets), a lightweight, real-time collaborative spreadsheet application built for high-performance data grid interactions. Powered by Next.js and Zustand, the platform uses an optimistic UI state flow synchronized via debounced, targeted writes to Firebase Firestore to eliminate data contention and network lag. Key engineering milestones include a custom recursive descent parser with DAG-based formula dependency tracking for optimized re-evaluations, full grid virtualization to render thousands of cells efficiently, and seamless drag-and-drop cell/column manipulation.',
    role: 'Next.js Developer',
    tech: ['Firebase', 'Zustand', 'TypeScript', 'Next.js'],
    image: '/project/sheets.png',
    live: 'https://trademarkia-k6b5.vercel.app/',
    code: '#',
  },
  {
    id: 'W-D',
    title: 'SkillSwap',
    category: 'Web Development',
    tagline: 'An intergenerational skill-sharing platform bridging generational knowledge gaps through real-time collaboration and optimized matching.',
    description: 'Developed SkillSwap, a full-stack web application designed to foster intergenerational knowledge exchange by pairing users across different age groups for mutual mentoring. Built on the MERN stack, the platform utilizes highly optimized MongoDB search logic to improve user-matching efficiency. To cultivate active engagement, I integrated real-time communication tools that successfully facilitated over 40 concurrent, live skill swaps during the testing phase. Additionally, I architected and fine-tuned the backend infrastructure to handle high-concurrency traffic loads, ensuring system reliability and smooth performance for up to 500+ concurrent users.',
    role: 'WebGL & ML Engineer',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    image: '/project/skill.png',
    live: 'https://skillswap-lac-eight.vercel.app/',
    code: '#',
  },
  {
    id: 'W-D',
    title: 'Kabad Becho',
    category: 'Web Development',
    tagline: 'An on-demand waste collection and scrap management platform optimizing urban recycling through real-time logistics and AI automation.',
    description: 'Developed Kabad Becho (ScrapLink), a full-stack on-demand waste-management platform designed to bridge localized recycling gaps by seamlessly connecting households with neighborhood scrap vendors. Built using the MERN stack, the platform features an automated scheduling engine that drastically reduces pickup delays across daily routes. I engineered a scalable, high-reliability backend capable of processing over 1,000 live location streams simultaneously, giving users real-time GPS tracking for their scheduled pickups. To streamline client operations and onboarding, I integrated a Gemini-powered conversational assistant that automates user queries and delivers instantaneous, transparent scrap pricing estimates.',
    role: 'UI Developer & Designer',
    tech: ['MongoDB', 'WebSockets', 'React.js', 'Gemini API'],
    image: '/project/kabad.png',
    live: 'https://kabad-becho-proj-zeta.vercel.app/',
    code: '#',
  },
];

const categories = [
  { id: 'all', label: 'All Works' },
  { id: 'ML', label: 'Machine Learning' },
  { id: 'W-D', label: 'Web Development' },
  { id: 'AI', label: 'AI' }, // Handled conditionally in filtering logic below
];

export default function Works() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);

  // FIXED: Updated logical map matching condition so selecting 'AI' displays 'ML' projects
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => {
        const idMatch = p.id.trim() === activeFilter;
        const aiFallback = activeFilter === 'AI' && p.id.trim() === 'ML';
        return idMatch || aiFallback;
      });

  const handleFilterChange = (catId) => {
    setActiveFilter(catId);
    closeProject(); 
  };

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

        gsap.fromTo(`.${styles.filterBar}`, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: `.${styles.filterBar}`,
              start: 'top 80%',
            },
          }
        );

        gsap.fromTo(`.${styles.projectCard}`, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1.2,
            scrollTrigger: {
              trigger: `.${styles.grid}`,
              start: 'top 75%',
            },
          }
        );
      }, sectionRef.current);

      ScrollTrigger.refresh();
    }
    
    initGSAP();
    return () => ctx && ctx.revert();
  }, [activeFilter]);

  const openProject = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; 
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = ''; 
  };

  return (
    <section id="works" ref={sectionRef} className={styles.works}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.secNumber}>02</span>
          <span className={styles.secDivider} />
          <h2 className={styles.secTitle}>PORTFOLIO</h2>
        </div>

        {/* Filter Bar */}
        <div className={styles.filterBar}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${activeFilter === cat.id ? styles.filterBtnActive : ''}`}
              onClick={() => handleFilterChange(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={styles.grid}>
          {filteredProjects.map((project, index) => (
            <div 
              key={`${project.id}-${index}`} 
              className={styles.projectCard}
              onClick={() => openProject(project)}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={project.image}
                  alt={`${project.title} project mockup`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.image}
                  priority={project.id === 'ML' || project.id === 'W-D'} 
                />
                <div className={styles.cardHoverOverlay} />
              </div>
              
              <div className={styles.cardContent}>
                <span className={styles.projectCategory}>
                  {project.category.replace('-', ' & ')}
                </span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectTagline}>{project.tagline}</p>
                <div className={styles.viewLink}>
                  <span>Explore Case Study</span>
                  <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12,5 19,12 12,19" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Case Study Modal / Drawer ── */}
      {selectedProject && (
        <div className={styles.modalOverlay} onClick={closeProject} role="dialog" aria-modal="true">
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            
            <button className={styles.closeBtn} onClick={closeProject} aria-label="Close details">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className={styles.modalScroll}>
              <div className={styles.modalGrid}>
                
                <div className={styles.modalVisual}>
                  <div className={styles.modalImageWrap}>
                    <Image
                      src={selectedProject.image}
                      alt={`${selectedProject.title} detail`}
                      fill
                      sizes="(max-width: 992px) 100vw, 60vw"
                      className={styles.modalImage}
                    />
                  </div>
                </div>

                <div className={styles.modalDetails}>
                  <span className={styles.modalSub}>{selectedProject.category.replace('-', ' & ')}</span>
                  <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                  <p className={styles.modalTagline}>{selectedProject.tagline}</p>
                  
                  <div className={styles.modalDivider} />
                  
                  <div className={styles.metaInfo}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Role</span>
                      <span className={styles.metaValue}>{selectedProject.role || 'Developer'}</span>
                    </div>
                  </div>

                  <p className={styles.modalDesc}>{selectedProject.description}</p>

                  <h4 className={styles.techTitle}>Technologies Applied</h4>
                  <div className={styles.techTags}>
                    {selectedProject.tech.map((t) => (
                      <span key={t} className={styles.tag}>{t}</span>
                    ))}
                  </div>

                  <div className={styles.modalActions}>
                    {selectedProject.live && selectedProject.live !== '#' && (
                      <a href={selectedProject.live} className={styles.modalCtaBtn} target="_blank" rel="noopener noreferrer">
                        Launch Live
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.btnIcon}>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15,3 21,3 21,9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                    {selectedProject.code && selectedProject.code !== '#' && (
                      <a href={selectedProject.code} className={styles.modalCtaBtn} target="_blank" rel="noopener noreferrer">
                        View Source Code
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.btnIcon}>
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}