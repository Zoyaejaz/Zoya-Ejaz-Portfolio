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
    description:
      'Developed an automated computer-aided diagnosis system for glaucoma that achieved 89.43% accuracy on the RIM-ONE r12 dataset, outperforming four state-of-the-art methods with 94.85% specificity. To combat dataset limitations and overfitting, I implemented geometric data augmentation to expand the dataset fourfold (to 2,020 images) and engineered over 504 advanced texture and shape features using GLCM, LBP, HOG, and Gabor filters. By optimizing feature selection via ANOVA and PCA, and leveraging an ensemble learning architecture (SVM, Random Forest, GBM), this project successfully culminated in a submitted IEEE research paper.',
    tech: ['Python', 'LS-SVM', 'Model Training', 'Datasets'],
    image: '/project/glaucoma.jpg',
    live: 'https://github.com/Zoyaejaz/Glaucoma',
    code: 'https://github.com/Zoyaejaz/Glaucoma',
  },

  {
    id: 'ML',
    title: 'Driver Drowsiness Detection',
    category: 'Machine Learning',
    tagline: 'Real-Time Driver Drowsiness Detection',
    description:
      'Developed a real-time Driver Drowsiness Detection system using Computer Vision to monitor facial landmarks and eye movements through a webcam. Leveraging Python, OpenCV, MediaPipe, and NumPy, I extracted facial and eye landmarks and calculated the Eye Aspect Ratio (EAR) to identify prolonged eye closure patterns. The system continuously analyzes driver alertness and triggers an instant audio warning when drowsiness is detected, providing a lightweight, CPU-friendly approach to improving road safety through AI.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
    image: '/project/driver.jpeg',
    live: 'https://github.com/Zoyaejaz/Driver-Drowsiness-Detection',
    code: 'https://github.com/Zoyaejaz/Driver-Drowsiness-Detection',
  },

  {
    id: 'ML',
    title: 'Air Canvas',
    category: 'Machine Learning',
    tagline: 'AI-Powered Air Canvas',
    description:
      'Developed an interactive Air Canvas application using Computer Vision that enables users to draw in the air through real-time hand gestures. Leveraging Python, OpenCV, MediaPipe, and NumPy, I implemented real-time hand landmark detection to track the index finger and translate its movements into digital drawings. The system supports gesture-based color selection, drawing modes, and canvas clearing, creating a touchless and intuitive human-computer interaction experience.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
    image: '/project/air.webp',
    live: 'https://github.com/Zoyaejaz/Air-Canvas',
    code: 'https://github.com/Zoyaejaz/Air-Canvas',
  },

  {
    id: 'DS',
    title: 'Heart Disease Prediction',
    category: 'Data Science',
    tagline:
      'Transforming raw medical data into predictive cardiovascular analytics.',
    description:
      'Conducted comprehensive Exploratory Data Analysis (EDA) on a heart disease dataset to uncover critical medical patterns, trends, and health risk factors. Utilizing Python (Pandas and NumPy), I handled data cleaning and preprocessing to ensure dataset integrity. I then leveraged Matplotlib and Seaborn to build interactive visualizations and perform deep correlation analyses between key physiological attributes—such as age, cholesterol levels, and blood pressure—and heart disease occurrence, translating complex medical data into actionable, data-driven predictive insights.',
    tech: ['Python', 'Data Cleaning', 'Data Visualization', 'EDA'],
    image: '/project/heart.png',
    live: 'https://github.com/Zoyaejaz/Heart-Disease-Prediction',
    code: 'https://github.com/Zoyaejaz/Heart-Disease-Prediction',
  },

  {
    id: 'AI',
    title: 'Twitter Sentiment Analysis',
    category: 'AI & NLP',
    tagline: 'Twitter Sentiment Analysis',
    description:
      'Developed an NLP-based Twitter Sentiment Analysis system to classify tweets and identify underlying user sentiment. Using Python and Natural Language Processing techniques, I performed text preprocessing, data cleaning, tokenization, and feature extraction with TF-IDF to transform unstructured tweets into meaningful numerical representations. I then trained and evaluated machine learning classification models to distinguish between positive, negative, and neutral sentiments, enabling automated analysis of large volumes of social media text.',
    tech: ['Python', 'NLP', 'TF-IDF', 'Scikit-Learn'],
    image: '/project/twitter.jpeg',
    live: 'https://github.com/Zoyaejaz/Twitter-Sentiment-analysis',
    code: 'https://github.com/Zoyaejaz/Twitter-Sentiment-analysis',
  },

  {
    id: 'AI',
    title: 'AI Learning Buddy',
    category: 'AI & NLP',
    tagline: 'AI Learning Buddy',
    description:
      "Developed an AI-powered learning assistant designed to provide personalized guidance for Machine Learning fundamentals through an interactive conversational interface. Built with Python, Streamlit, and Google's Gemini API, the application uses prompt engineering to create a consistent AI tutor persona that explains concepts, answers questions, and supports users throughout their learning journey. The application securely manages API credentials through backend secrets and is deployed on Streamlit Community Cloud for seamless, zero-setup access.",
    tech: [
      'Python',
      'Streamlit',
      'Google Gemini API',
      'Prompt Engineering',
    ],
    image: '/project/learn.jpeg',
    live: 'https://ai-learning-buddy-pj2zeytwfq7kv6c7siidsp.streamlit.app/',
    code: 'https://github.com/Zoyaejaz/ai-Learning-buddy',
  },

  {
    id: 'AI',
    title: 'Eco-Loop Building Agents',
    category: 'AI & NLP',
    tagline: 'AI-Powered Building Energy Optimization',
    description:
      'Developed an AI-driven closed-loop building energy control system that continuously analyzes simulated building sensor data and dynamically adjusts HVAC setpoints to optimize energy consumption while maintaining occupant comfort. The system integrates LLM-based agents, Model Context Protocol (MCP) tools, physics-based simulation, safety constraints, and telemetry to create an autonomous control loop. Using a simulated environment, the system achieved a recorded 7.2% reduction in energy consumption compared with a fixed-schedule baseline while significantly reducing comfort violations.',
    tech: [
      'Python',
      'LLM Agents',
      'MCP (Model Context Protocol)',
      'EnergyPlus / Simulation',
    ],
    image: '/project/eco.png',
    live: 'https://zoyaejaz.github.io/Eco-Loop-Building-Agents/',
    code: 'https://github.com/Zoyaejaz/Eco-Loop-Building-Agents',
  },
];

const categories = [
  { id: 'all', label: 'All Works' },
  { id: 'ML', label: 'Machine Learning' },
  { id: 'DS', label: 'Data Science' },
  { id: 'AI', label: 'AI & NLP' },
];

export default function Works() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);

  /*
   * FILTERING LOGIC
   *
   * All  -> shows every project
   * ML   -> shows only projects with id === 'ML'
   * DS   -> shows only projects with id === 'DS'
   * AI   -> shows only projects with id === 'AI'
   */
  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.id === activeFilter);

  const handleFilterChange = (categoryId) => {
    setActiveFilter(categoryId);
    closeProject();
  };

  useEffect(() => {
    let gsap;
    let ScrollTrigger;
    let ctx;

    async function initGSAP() {
      const mod = await import('gsap');
      gsap = mod.gsap || mod.default;

      const triggerMod = await import('gsap/ScrollTrigger');
      ScrollTrigger = triggerMod.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          `.${styles.header}`,
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

        gsap.fromTo(
          `.${styles.filterBar}`,
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

        gsap.fromTo(
          `.${styles.projectCard}`,
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

    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
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
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.filterBtn} ${
                activeFilter === category.id
                  ? styles.filterBtnActive
                  : ''
              }`}
              onClick={() => handleFilterChange(category.id)}
            >
              {category.label}
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
                  priority={project.id === 'ML' || project.id === 'DS'}
                />

                <div className={styles.cardHoverOverlay} />
              </div>

              <div className={styles.cardContent}>
                <span className={styles.projectCategory}>
                  {project.category}
                </span>

                <h3 className={styles.projectTitle}>
                  {project.title}
                </h3>

                <p className={styles.projectTagline}>
                  {project.tagline}
                </p>

                <div className={styles.viewLink}>
                  <span>Explore Case Study</span>

                  <svg
                    className={styles.arrowIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12,5 19,12 12,19" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div
          className={styles.modalOverlay}
          onClick={closeProject}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={closeProject}
              aria-label="Close details"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className={styles.modalScroll}>
              <div className={styles.modalGrid}>

                {/* Project Image */}
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

                {/* Project Details */}
                <div className={styles.modalDetails}>
                  <span className={styles.modalSub}>
                    {selectedProject.category}
                  </span>

                  <h3 className={styles.modalTitle}>
                    {selectedProject.title}
                  </h3>

                  <p className={styles.modalTagline}>
                    {selectedProject.tagline}
                  </p>

                  <div className={styles.modalDivider} />

                  <div className={styles.metaInfo}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Role</span>

                      <span className={styles.metaValue}>
                        {selectedProject.role || 'Developer'}
                      </span>
                    </div>
                  </div>

                  <p className={styles.modalDesc}>
                    {selectedProject.description}
                  </p>

                  <h4 className={styles.techTitle}>
                    Technologies Applied
                  </h4>

                  <div className={styles.techTags}>
                    {selectedProject.tech.map((technology) => (
                      <span
                        key={technology}
                        className={styles.tag}
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className={styles.modalActions}>
                    {selectedProject.live &&
                      selectedProject.live !== '#' && (
                        <a
                          href={selectedProject.live}
                          className={styles.modalCtaBtn}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Launch Live

                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={styles.btnIcon}
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15,3 21,3 21,9" />
                            <line
                              x1="10"
                              y1="14"
                              x2="21"
                              y2="3"
                            />
                          </svg>
                        </a>
                      )}

                    {selectedProject.code &&
                      selectedProject.code !== '#' && (
                        <a
                          href={selectedProject.code}
                          className={styles.modalCtaBtn}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Source Code

                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={styles.btnIcon}
                          >
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

