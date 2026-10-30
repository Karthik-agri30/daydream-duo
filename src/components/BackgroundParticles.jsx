import React, { useEffect, useRef } from 'react';

export default function BackgroundParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // 1. CELESTIAL TWINKLING DIAMOND STARS
    const starCount = Math.min(Math.floor(width / 18), 65);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.8 + 1.2,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.008,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
      spikes: Math.random() > 0.5 ? 4 : 5,
      color: Math.random() > 0.6 ? '#A78BFA' : (Math.random() > 0.5 ? '#BFDBFE' : '#FFFFFF'),
      driftY: -0.08,
      driftX: (Math.random() - 0.5) * 0.08,
    }));

    // 2. GENTLE FLUTTERING LAVENDER FLOWER PETALS
    const petalCount = Math.min(Math.floor(width / 35), 24);
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 9 + 6,
      angle: Math.random() * 360,
      angularSpeed: (Math.random() - 0.5) * 0.025,
      speedY: Math.random() * 0.7 + 0.35,
      speedX: Math.sin(Math.random() * Math.PI) * 0.4 + 0.1,
      oscillation: Math.random() * 100,
      oscillationSpeed: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.5 ? 'rgba(233, 213, 255, 0.65)' : 'rgba(243, 232, 255, 0.75)',
      borderColor: 'rgba(167, 139, 250, 0.45)'
    }));

    // 3. GLOWING FIREFLY STARDUST
    const dustCount = Math.min(Math.floor(width / 25), 35);
    const dustParticles = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 1.2,
      baseAlpha: Math.random() * 0.6 + 0.25,
      alpha: 0.5,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 0.4 + 0.2),
      glowColor: Math.random() > 0.5 ? 'rgba(167, 139, 250, 0.85)' : 'rgba(191, 219, 254, 0.85)'
    }));

    // 4. PERIODIC SHOOTING STARS (METEORS)
    const shootingStars = [];
    let nextShootingStarTime = Date.now() + 2500;

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.85,
        y: Math.random() * (height * 0.4),
        len: Math.random() * 90 + 70,
        speed: Math.random() * 7 + 8,
        angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2, // ~45 deg downward
        alpha: 1,
        fadeSpeed: 0.018
      });
      nextShootingStarTime = Date.now() + 6000 + Math.random() * 7000;
    };

    // Helper: Draw 4/5-point glittering star
    const drawSparkleStar = (cx, cy, spikes, outerRadius, innerRadius, color, alpha) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.restore();
    };

    // Helper: Draw floating flower petal
    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.6, p.size * 1.2, p.size * 0.4, 0, p.size * 1.4);
      ctx.bezierCurveTo(-p.size * 1.2, p.size * 0.4, -p.size * 0.6, -p.size * 0.6, 0, 0);
      ctx.closePath();
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(233, 213, 255, 0.5)';
      ctx.fill();
      ctx.strokeStyle = p.borderColor;
      ctx.lineWidth = 0.6;
      ctx.stroke();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // --- A. Render Twinkling Stars with Mouse Interaction ---
      stars.forEach((s) => {
        s.alpha += s.twinkleSpeed * s.twinkleDir;
        if (s.alpha >= 0.95) s.twinkleDir = -1;
        if (s.alpha <= 0.15) s.twinkleDir = 1;

        s.y += s.driftY;
        s.x += s.driftX;
        if (s.y < -10) s.y = height + 10;
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;

        // Mouse proximity boost
        const dx = mouseX - s.x;
        const dy = mouseY - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let starAlpha = s.alpha;
        let starSize = s.size;
        if (dist < 140) {
          const proximity = (140 - dist) / 140;
          starAlpha = Math.min(1, s.alpha + proximity * 0.5);
          starSize = s.size * (1 + proximity * 0.6);
        }

        drawSparkleStar(s.x, s.y, s.spikes, starSize * 2.4, starSize * 0.8, s.color, starAlpha);
      });

      // --- B. Render Gentle Fluttering Petals ---
      petals.forEach((p) => {
        p.oscillation += p.oscillationSpeed;
        p.x += Math.sin(p.oscillation) * 0.8 + p.speedX;
        p.y += p.speedY;
        p.angle += p.angularSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      });

      // --- C. Render Firefly Stardust ---
      dustParticles.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;

        if (d.y < -10) {
          d.y = height + 10;
          d.x = Math.random() * width;
        }
        if (d.x < -10) d.x = width + 10;
        if (d.x > width + 10) d.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = d.glowColor;
        ctx.globalAlpha = d.baseAlpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = d.glowColor;
        ctx.fill();
        ctx.restore();
      });

      // --- D. Render Shooting Stars (Meteors) ---
      if (Date.now() > nextShootingStarTime) {
        spawnShootingStar();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const m = shootingStars[i];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= m.fadeSpeed;

        if (m.alpha <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.len;
        const tailY = m.y - Math.sin(m.angle) * m.len;

        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        grad.addColorStop(0, 'rgba(233, 213, 255, 0)');
        grad.addColorStop(0.7, 'rgba(167, 139, 250, ' + (m.alpha * 0.7) + ')');
        grad.addColorStop(1, 'rgba(255, 255, 255, ' + m.alpha + ')');

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 14;
        ctx.shadowColor = 'rgba(167, 139, 250, 0.9)';
        ctx.stroke();

        // Glowing star head
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowBlur = 16;
        ctx.shadowColor = '#FFFFFF';
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Dynamic Animated Ambient Aurora Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft floating orb 1 (Purple) */}
        <div className="absolute top-[5%] left-[10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-purple-300/35 via-violet-200/30 to-blue-200/30 blur-3xl animate-float-slow" />
        {/* Soft floating orb 2 (Baby Blue) */}
        <div className="absolute top-[40%] right-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-blue-200/35 via-indigo-200/25 to-purple-200/30 blur-3xl animate-float-reverse" />
        {/* Soft floating orb 3 (Soft Rose Lavender) */}
        <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-fuchsia-200/25 via-purple-200/30 to-blue-100/35 blur-3xl animate-float-slow" />
      </div>

      {/* Interactive HTML5 Canvas (Stars, Petals, Shooting Stars, Fireflies) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10"
        aria-hidden="true"
      />
    </>
  );
}
