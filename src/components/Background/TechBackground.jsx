import { useEffect, useRef } from 'react';
import './TechBackground.css';

/*
  Using Simple Icons CDN for logos. 
  Removed Redis ("R") as requested.
*/
const TECH_ICONS = [
  { id: 'java', color: '#f89820', slug: 'java' },
  { id: 'go', color: '#00ADD8', slug: 'go' },
  { id: 'cplusplus', color: '#9ecbf5', slug: 'cplusplus' },
  { id: 'kafka', color: '#6ea8f9', slug: 'apachekafka' },
  // Redis removed
  { id: 'ignite', color: '#ffaa55', slug: 'apacheignite' },
  { id: 'github', color: '#d0d0e8', slug: 'github' },
  { id: 'docker', color: '#5bc4f5', slug: 'docker' },
  { id: 'spring', color: '#82d46f', slug: 'spring' },
  { id: 'postgres', color: '#85bcff', slug: 'postgresql' },
  { id: 'k8s', color: '#7fa8f5', slug: 'kubernetes' },
  { id: 'linux', color: '#f5d020', slug: 'linux' },
];

const ICON_SIZE = 36;
const ICON_BASE = 'https://cdn.simpleicons.org';

export default function TechBackground() {
  const canvasRef = useRef(null);
  const stateRef = useRef({ nodes: [], raf: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;

    /* ── Resize ── */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const maxRadius = Math.max(cx, cy) * 1.1; // Increased radius to spread further

      // Update orbital centers and relative radii smoothly if screen resizes
      state.nodes.forEach(n => {
        n.cx = cx;
        n.cy = cy;
        // Keep their relative positional band
        if (!n.baseRadius) n.baseRadius = (0.3 + Math.random() * 0.7);
        n.radius = n.baseRadius * maxRadius;
      });
    };

    /* ── Initialization & Image Loading ── */
    const loadAll = () => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const maxRadius = Math.max(cx, cy) * 1.1; // Increased radius

      const promises = TECH_ICONS.map((icon, idx) => new Promise(resolve => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        const colorHex = icon.color.replace('#', '');
        img.src = `${ICON_BASE}/${icon.slug}/${colorHex}`;

        img.onload = () => resolve({ ...icon, img, loaded: true });
        img.onerror = () => {
          // If image fails, try pure white
          const img2 = new Image();
          img2.crossOrigin = 'anonymous';
          img2.src = `${ICON_BASE}/${icon.slug}/ffffff`;
          img2.onload = () => resolve({ ...icon, img: img2, loaded: true });
          img2.onerror = () => resolve({ ...icon, img: null, loaded: false });
        };
      }));

      Promise.all(promises).then(loaded => {
        state.nodes = loaded.map((icon, i) => {
          const baseRadius = 0.3 + (i / loaded.length) * 0.7; // distribute in rings
          return {
            ...icon,
            cx, cy,
            baseRadius,
            radius: baseRadius * maxRadius,
            angle: (i / loaded.length) * Math.PI * 2,
            speed: (Math.random() > 0.5 ? 1 : -1) * (0.0006 + Math.random() * 0.001), // Slightly slower graceful orbit
            alpha: 0.35 + Math.random() * 0.3, // Increased visibility (0.35 - 0.65)
            size: ICON_SIZE + (Math.random() * 8 - 4),
            x: 0, y: 0
          };
        });
        animate();
      });
    };

    /* ── Connections ── */
    const drawConnection = (a, b) => {
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist > 380) return;
      const str = 1 - dist / 380;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      // Brightened connection lines with subtle glow
      ctx.save();
      ctx.strokeStyle = `rgba(79, 142, 247, ${str * 0.35})`;
      ctx.lineWidth = 1.0;
      ctx.shadowColor = 'rgba(79, 142, 247, 0.5)';
      ctx.shadowBlur = 4;
      ctx.stroke();
      ctx.restore();
    };

    /* ── Render Loop ── */
    const animate = () => {
      const { nodes } = state;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw faint orbital tracks
      ctx.lineWidth = 1;
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.cx, node.cy, node.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(79, 142, 247, 0.015)`;
        ctx.stroke();
      });

      // Update positions
      nodes.forEach(node => {
        node.angle += node.speed;
        node.x = node.cx + Math.cos(node.angle) * node.radius;
        node.y = node.cy + Math.sin(node.angle) * node.radius;
      });

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          drawConnection(nodes[i], nodes[j]);
        }
      }

      // Draw Icons (Stars / Crystals)
      nodes.forEach(node => {
        const half = node.size / 2;
        if (node.loaded && node.img) {
          ctx.save();
          // Crystal aura / bloom
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 24;
          ctx.globalAlpha = node.alpha * 0.8;
          ctx.drawImage(node.img, node.x - half, node.y - half, node.size, node.size);

          // Star core (bright center dot)
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#ffffff';
          ctx.globalAlpha = node.alpha + 0.3;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.restore();
        }
        // Removed text fallback completely as requested. Empty space if image fails.
      });

      state.raf = requestAnimationFrame(animate);
    };

    resize();
    loadAll();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(state.raf);
    };
  }, []);

  return (
    <>
      <div className="bg-glow-top" />
      <div className="bg-glow-bottom" />
      <div className="grid-overlay" />
      <div className="tech-bg">
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}
