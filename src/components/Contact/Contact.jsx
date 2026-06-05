'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);
  
  // Form States
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error

  // Input Focus States for floating labels
  const [focusedInput, setFocusedInput] = useState({ name: false, email: false, subject: false, message: false });

  // GSAP scroll trigger for contact section
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

        gsap.fromTo(`.${styles.formCol}`, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            scrollTrigger: {
              trigger: `.${styles.grid}`,
              start: 'top 75%',
            },
          }
        );

        gsap.fromTo(`.${styles.infoCol}`, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('zejaz6806@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFocus = (field) => {
    setFocusedInput(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field, val) => {
    setFocusedInput(prev => ({ ...prev, [field]: val !== '' }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
        setFocusedInput({ name: false, email: false, subject: false, message: false });
      } else {
        const data = await response.json();
        console.error('SMTP API Submission Error:', data.error || response.statusText);
        setFormStatus('error');
      }
    } catch (err) {
      console.error('Contact form submission network error:', err);
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" ref={sectionRef} className={styles.contact}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.secNumber}>05</span>
          <span className={styles.secDivider} />
          <h2 className={styles.secTitle}>CONTACT</h2>
        </div>

        <div className={styles.grid}>
          {/* Left Column: Get in touch meta */}
          <div className={styles.infoCol}>
            <h3 className={styles.headline}>LET'S BUILD SOMETHING CINEMATIC.</h3>
            
            <p className={styles.subtext}>
              Currently accepting creative collaborations, interactive commissions, and full-time contracts for 2026. Have a project that needs a digital spark? Let's connect.
            </p>

            {/* Interactive Email Copier */}
            <div className={styles.emailWrapper}>
              <span className={styles.emailLabel}>Inquiries</span>
              <button 
                className={styles.emailBtn} 
                onClick={handleCopyEmail}
                title="Click to copy email address"
              >
                <span className={styles.emailValue}>zejaz6806@gmail.com</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.copyIcon}>
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                
                {/* Tooltip confirmation */}
                <span className={`${styles.tooltip} ${copied ? styles.tooltipVisible : ''}`}>
                  Copied!
                </span>
              </button>
            </div>

            {/* Quick Links */}
            <div className={styles.linksContainer}>
              <div className={styles.linkItem}>
                <span className={styles.linkTitle}>Location</span>
                <span className={styles.linkDetail}>Available Worldwide</span>
              </div>
              <div className={styles.linkItem}>
                <span className={styles.linkTitle}>Zone</span>
                <span className={styles.linkDetail}>IST (UTC+5:30)</span>
              </div>
            </div>

            {/* Social Links */}
            <div className={styles.socials}>
              <a href="https://www.linkedin.com/in/zoyaejaz/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LN</a>
              <a href="https://github.com/Zoyaejaz" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>GH</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>TW</a>
              <a href="https://drive.google.com/file/d/1ceq4pTABoii57hR-j9oTAH9lKf48dJij/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>CV</a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              
              {formStatus === 'success' ? (
                /* Success Message Layout */
                <div className={styles.successState}>
                  <div className={styles.successCheck}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  </div>
                  <h4 className={styles.successTitle}>Transmission Received</h4>
                  <p className={styles.successDesc}>
                    Thank you for reaching out. I will review your message and connect with you shortly.
                  </p>
                  <button 
                    className={styles.resetBtn} 
                    onClick={() => setFormStatus('idle')}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* Inquiry Form */
                <form onSubmit={handleSubmit} className={styles.form}>
                  
                  {/* Name Input */}
                  <div className={`${styles.inputGroup} ${focusedInput.name ? styles.groupFocused : ''}`}>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={(e) => handleBlur('name', e.target.value)}
                      className={styles.input}
                    />
                    <label htmlFor="name" className={styles.label}>Your Name</label>
                  </div>

                  {/* Email Input */}
                  <div className={`${styles.inputGroup} ${focusedInput.email ? styles.groupFocused : ''}`}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={(e) => handleBlur('email', e.target.value)}
                      className={styles.input}
                    />
                    <label htmlFor="email" className={styles.label}>Email Address</label>
                  </div>

                  {/* Subject Input */}
                  <div className={`${styles.inputGroup} ${focusedInput.subject ? styles.groupFocused : ''}`}>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formState.subject}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('subject')}
                      onBlur={(e) => handleBlur('subject', e.target.value)}
                      className={styles.input}
                    />
                    <label htmlFor="subject" className={styles.label}>Subject</label>
                  </div>

                  {/* Message Input */}
                  <div className={`${styles.inputGroup} ${styles.areaGroup} ${focusedInput.message ? styles.groupFocused : ''}`}>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="5"
                      value={formState.message}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={(e) => handleBlur('message', e.target.value)}
                      className={styles.textarea}
                    />
                    <label htmlFor="message" className={styles.label}>Project Details</label>
                  </div>

                  {/* Submit CTA Button */}
                  <button 
                    type="submit" 
                    disabled={formStatus === 'sending'}
                    className={styles.submitBtn}
                  >
                    {formStatus === 'sending' ? (
                      <span className={styles.loader}>Sending...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <svg className={styles.submitArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12,5 19,12 12,19" />
                        </svg>
                      </>
                    )}
                  </button>

                  {formStatus === 'error' && (
                    <p className={styles.errorMessage}>
                      Transmission failed. Please verify credentials or email directly to zejaz6806@gmail.com
                    </p>
                  )}

                </form>
              )}

            </div>
          </div>
        </div>

        {/* Footer info at the base of contact */}
        <footer className={styles.footer}>
          <div className={styles.footerDivider} />
          <div className={styles.footerRow}>
            <p className={styles.copyright}>
              © 2026 ZOYA EJAZ. All rights reserved.
            </p>
            <p className={styles.credits}>
              Designed &amp; Coded with Passion
            </p>
          </div>
        </footer>

      </div>
    </section>
  );
}
