'use client';

import { useEffect, useRef } from 'react';
import styles from './CinematicLayer.module.css';

export default function CinematicLayer() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const sceneRef = useRef({});

  useEffect(() => {
    let THREE;
    let mounted = true;

    async function init() {
      THREE = await import('three');
      if (!mounted || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const { width, height } = canvas.getBoundingClientRect();

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);

      // Scene + Camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 200);
      camera.position.z = 50;

      // Particles
      const COUNT = 320;
      const positions = new Float32Array(COUNT * 3);
      const colors = new Float32Array(COUNT * 3);
      const sizes = new Float32Array(COUNT);
      const phases = new Float32Array(COUNT);
      const speeds = new Float32Array(COUNT);

      const warmOrange = new THREE.Color(0xff7a2f);
      const softWhite = new THREE.Color(0xfff0e0);
      const goldGlow = new THREE.Color(0xffb347);
      const coolBlue = new THREE.Color(0x8ab4f8);

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 120;
        positions[i3 + 1] = (Math.random() - 0.5) * 70;
        positions[i3 + 2] = (Math.random() - 0.5) * 60;

        // Mix warm palette with occasional cool accent
        const roll = Math.random();
        let col;
        if (roll < 0.45) col = warmOrange;
        else if (roll < 0.75) col = softWhite;
        else if (roll < 0.90) col = goldGlow;
        else col = coolBlue;

        colors[i3] = col.r;
        colors[i3 + 1] = col.g;
        colors[i3 + 2] = col.b;

        sizes[i] = Math.random() * 3.5 + 0.8;
        phases[i] = Math.random() * Math.PI * 2;
        speeds[i] = 0.18 + Math.random() * 0.22;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // Sprite texture (soft bokeh circle)
      const spriteCanvas = document.createElement('canvas');
      spriteCanvas.width = 64;
      spriteCanvas.height = 64;
      const ctx = spriteCanvas.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.3, 'rgba(255,255,255,0.6)');
      gradient.addColorStop(0.7, 'rgba(255,255,255,0.1)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      const spriteTex = new THREE.CanvasTexture(spriteCanvas);

      const mat = new THREE.PointsMaterial({
        size: 1.2,
        map: spriteTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      // Mouse parallax
      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMouseMove = (e) => {
        mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMouseMove);

      // Resize
      const onResize = () => {
        if (!canvasRef.current) return;
        const { width: w, height: h } = canvasRef.current.getBoundingClientRect();
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      // Store refs for cleanup
      sceneRef.current = {
        renderer,
        scene,
        camera,
        geo,
        mat,
        spriteTex,
        points,
        positions,
        phases,
        speeds,
        COUNT,
        mouse,
        onMouseMove,
        onResize,
      };

      // Animate
      let clock = 0;
      const animate = () => {
        if (!mounted) return;
        animRef.current = requestAnimationFrame(animate);
        clock += 0.008;

        const posAttr = geo.attributes.position;

        // Float particles
        for (let i = 0; i < COUNT; i++) {
          const i3 = i * 3;
          const phase = phases[i];
          const speed = speeds[i];
          posAttr.array[i3 + 1] += Math.sin(clock * speed + phase) * 0.012;
          posAttr.array[i3] += Math.cos(clock * speed * 0.7 + phase) * 0.006;
        }
        posAttr.needsUpdate = true;

        // Smooth mouse parallax
        mouse.x += (mouse.tx - mouse.x) * 0.04;
        mouse.y += (mouse.ty - mouse.y) * 0.04;
        camera.position.x = mouse.x * 4;
        camera.position.y = mouse.y * 2.5;
        camera.lookAt(0, 0, 0);

        // Gentle points rotation
        points.rotation.z += 0.00015;

        renderer.render(scene, camera);
      };

      animate();
    }

    init();

    return () => {
      mounted = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      const { renderer, geo, mat, spriteTex, onMouseMove, onResize } = sceneRef.current;
      if (onMouseMove) window.removeEventListener('mousemove', onMouseMove);
      if (onResize) window.removeEventListener('resize', onResize);
      if (geo) geo.dispose();
      if (mat) mat.dispose();
      if (spriteTex) spriteTex.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
