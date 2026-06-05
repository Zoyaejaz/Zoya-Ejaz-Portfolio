'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './VideoIntro.module.css';

const CinematicLayer = dynamic(
  () => import('../CinematicLayer/CinematicLayer'),
  { ssr: false }
);

export default function VideoIntro({ videoSrc = '/hero.mp4' }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const contentRef = useRef(null);
  const taglineRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const roleRef = useRef(null);
  const scrollHintRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-hide sound hint after 4s
  useEffect(() => {
    const t = setTimeout(() => setShowSoundHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    let gsap, ctx;
    async function runAnimations() {
      const mod = await import('gsap');
      gsap = mod.gsap || mod.default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Initial states
        gsap.set([taglineRef.current, firstNameRef.current, lastNameRef.current, roleRef.current, scrollHintRef.current], {
          opacity: 0,
          y: 30,
        });
        gsap.set(contentRef.current, { opacity: 0 });

        // Master timeline
        const tl = gsap.timeline({ delay: 0.6 });

        tl.to(contentRef.current, { opacity: 1, duration: 0.01 })
          .to(taglineRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
          })
          .to(firstNameRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power4.out',
          }, '-=0.7')
          .to(lastNameRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power4.out',
          }, '-=0.9')
          .to(roleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
          }, '-=0.7')
          .to(scrollHintRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          }, '-=0.4');

      }, sectionRef.current);
    }

    runAnimations();
    return () => ctx && ctx.revert();
  }, []);

  const toggleMute = () => {
    const muted = !isMuted;
    setIsMuted(muted);
    if (videoRef.current) videoRef.current.muted = muted;
    if (bgVideoRef.current) bgVideoRef.current.muted = true; // bg always muted
    setShowSoundHint(false);
  };

  const togglePlay = () => {
    const vid = videoRef.current;
    const bgVid = bgVideoRef.current;
    if (!vid) return;
    if (isPlaying) {
      vid.pause();
      bgVid?.pause();
    } else {
      vid.play();
      bgVid?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleScrollClick = () => {
    const next = sectionRef.current?.nextElementSibling;
    if (next) {
      next.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  const handleVideoLoad = () => setIsLoaded(true);

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* ── Ambient blurred background video ── */}
      <div className={styles.bgVideoWrap}>
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
      </div>

      {/* ── Cinematic gradient overlays ── */}
      <div className={styles.gradientOverlayBottom} />
      <div className={styles.gradientOverlayTop} />
      <div className={styles.gradientOverlaySides} />
      <div className={styles.vignetteFrame} />

      {/* ── Foreground video ── */}
      <div className={`${styles.videoWrap} ${isLoaded ? styles.videoLoaded : ''}`}>
        <video
          ref={videoRef}
          className={styles.video}
          src={videoSrc}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onCanPlay={handleVideoLoad}
          aria-label="Portfolio introduction video"
        />
        {/* Subtle inner shadow on video */}
        <div className={styles.videoInnerShadow} />
      </div>

      {/* ── Three.js particle layer ── */}
      <CinematicLayer />

      {/* ── Overlay content ── */}
      <div ref={contentRef} className={styles.content}>
        <p ref={taglineRef} className={styles.tagline}>
          <span className={styles.taglineDot} />
          Available for work · 2026
        </p>

        <h1 className={styles.name}>
          <span ref={firstNameRef} className={styles.firstName}>ZOYA</span>
          <span ref={lastNameRef} className={styles.lastName}>EJAZ</span>
        </h1>

        <p ref={roleRef} className={styles.role}>
          Creative Developer &amp; Digital Architect
          <span className={styles.roleSub}>
            Crafting cinematic web experiences at the intersection of design and code.
          </span>
        </p>
      </div>

      {/* ── Controls ── */}
      <div className={styles.controls}>
        <button
          className={styles.controlBtn}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        <button
          className={styles.controlBtn}
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Sound hint badge ── */}
      <div className={`${styles.soundHint} ${showSoundHint ? styles.soundHintVisible : ''}`}>
        <span className={styles.soundDot} />
        Tap for sound
      </div>

      {/* ── Scroll indicator ── */}
      <button
        ref={scrollHintRef}
        className={styles.scrollIndicator}
        onClick={handleScrollClick}
        aria-label="Scroll to next section"
      >
        <span className={styles.scrollLabel}>SCROLL</span>
        <span className={styles.scrollLine}>
          <span className={styles.scrollPulse} />
        </span>
      </button>
    </section>
  );
}
