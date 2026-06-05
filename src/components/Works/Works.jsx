'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Works.module.css';

const projects = [
  {
    id: 'aetherius',
    title: 'Glaucoma',
    category: 'Machine Learning',
    tagline: 'Detection of the stages of glaucoma',
    description: 'A hardware-accelerated 3D environment generating dynamic particle constellations synced to custom ambient audio frequencies. The platform uses WebGL vertex shaders to map audio amplitude to mathematical particle turbulence.',
    role: 'Lead Creative Technologist',
    tech: ['Python', 'LS-SVM', 'Model Training', 'Datasets'],
    image: '/project_aetherius.png',
    live: '#',
    code: '#',
  },
  {
    id: 'novaos',
    title: 'NOVA OS',
    category: 'ui-art',
    tagline: 'Futuristic Digital Dashboard Layout',
    description: 'A Web3 digital operating dashboard showcasing live cryptocurrency portfolios, transaction history, and wallet dynamics with sleek glowing vectors. Built with custom glassmorphism layers and responsive charts.',
    role: 'Front-end Architect & UX Designer',
    tech: ['Next.js', 'Chart.js', 'Vanilla CSS Modules', 'GSAP'],
    image: '/project_novaos.png',
    live: '#',
    code: '#',
  },
  {
    id: 'chronos',
    title: 'CHRONOS',
    category: '3d-interactive',
    tagline: 'Luxury Skeleton Watch Configurator',
    description: 'An interactive 3D configurator for premium skeleton watches. Allows customization of gears, straps, and bezel design with real-time ambient occlusion, metal reflections, and smooth mechanical rotations.',
    role: 'Three.js Developer & 3D Artist',
    tech: ['React Three Fiber', 'GLTF Loader', 'Three.js', 'Webpack'],
    image: '/project_chronos.png',
    live: '#',
    code: '#',
  },
  {
    id: 'solaria',
    title: 'SOLARIA AI',
    category: '3d-interactive',
    tagline: 'ML-Driven Celestial Gravity Simulator',
    description: 'An interactive orbital gravity simulation. Uses a neural network approximation model trained in PyTorch and compiled to TensorFlow.js to calculate and predict orbital trajectories at 120 FPS inside the WebGL context.',
    role: 'WebGL & ML Engineer',
    tech: ['Three.js', 'PyTorch', 'TensorFlow.js', 'GLSL Shaders'],
    image: '/project_solaria.png',
    live: '#',
    code: '#',
  },
  {
    id: 'lumina',
    title: 'LUMINA',
    category: 'ui-art',
    tagline: 'Sleek Minimal Portfolio Engine',
    description: 'A premium, blazing-fast portfolio template for creative agencies. Built with thin borders, clean visual grids, CSS custom variables, and optimized layout spacing to present visual imagery with editorial aesthetic.',
    role: 'UI Developer & Designer',
    tech: ['Next.js', 'CSS Modules', 'React Spring', 'Lighthouse Optimization'],
    image: '/project_lumina.png',
    live: '#',
    code: '#',
  },
  {
    id: 'vespera',
    title: 'VESPERA NLP',
    category: 'creative-code',
    tagline: 'Generative AI Node Storyteller',
    description: 'A generative text storytelling engine utilizing graph neural network visual node layouts. Integrates local Hugging Face LLM embeddings and NLP node triggers on a physics-driven canvas to compile dynamic paths.',
    role: 'Creative Engineer & NLP Developer',
    tech: ['Canvas API', 'PyTorch', 'Hugging Face', 'Matter.js'],
    image: '/project_aetherius.png', // Fallback to aetherius mockup
    live: '#',
    code: '#',
  },
];

const categories = [
  { id: 'all', label: 'All Works' },
  { id: 'creative-code', label: 'Creative Code' },
  { id: '3d-interactive', label: '3D & Interactive' },
  { id: 'ui-art', label: 'UI Art' },
];

export default function Works() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  // GSAP scroll trigger for projects grid fade-in
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
    }
    
    initGSAP();
    return () => ctx && ctx.revert();
  }, []);

  const openProject = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Lock scrolling
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = ''; // Restore scrolling
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
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={styles.grid}>
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
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
                  priority={project.id === 'aetherius'}
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
            
            {/* Close Button */}
            <button className={styles.closeBtn} onClick={closeProject} aria-label="Close details">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal Scrollable Container */}
            <div className={styles.modalScroll}>
              <div className={styles.modalGrid}>
                
                {/* Visual Hero */}
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

                {/* Details Meta & Content */}
                <div className={styles.modalDetails}>
                  <span className={styles.modalSub}>{selectedProject.category.replace('-', ' & ')}</span>
                  <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                  <p className={styles.modalTagline}>{selectedProject.tagline}</p>
                  
                  <div className={styles.modalDivider} />
                  
                  <div className={styles.metaInfo}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Role</span>
                      <span className={styles.metaValue}>{selectedProject.role}</span>
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
                    <a href={selectedProject.live} className={styles.modalCtaBtn}>
                      Launch Project
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.btnIcon}>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15,3 21,3 21,9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                    <a href={selectedProject.code} className={styles.modalSecBtn}>
                      Source Code
                    </a>
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
