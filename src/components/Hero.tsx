import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  darkMode: boolean;
}

export default function Hero({ darkMode }: HeroProps) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(110);

  const keywords = [
    'AI search',
    'content enrichment',
    'email outbound',
    'brand awareness'
  ];

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typing effect loop
  useEffect(() => {
    let timer: number;
    const handleType = () => {
      const i = loopNum % keywords.length;
      const fullWord = keywords[i] + '.'; // Type the word including the fullstop

      if (isDeleting) {
        setText(fullWord.substring(0, text.length - 1));
        setTypingSpeed(45); // Deleting speed
      } else {
        setText(fullWord.substring(0, text.length + 1));
        setTypingSpeed(115); // Typing speed
      }

      if (!isDeleting && text === fullWord) {
        // Pause at the end of the word before deleting
        timer = window.setTimeout(() => setIsDeleting(true), 1800);
        return;
      }

      if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        timer = window.setTimeout(() => {}, 400); // Pause before starting the next word
        return;
      }

      timer = window.setTimeout(handleType, typingSpeed);
    };

    timer = window.setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  // Halftone Dot Matrix Cluster Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates and state
    const mouse = { x: 0, y: 0, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let animTime = 0;

    const animate = () => {
      animTime += 1;
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 640;
      const gridSpacing = isMobile ? 7 : 8;
      const maxDotRadius = isMobile ? 0.95 : 1.35;

      const cx = width * 0.85 + Math.sin(animTime * 0.005) * 30;
      const cy = height * 0.15 + Math.cos(animTime * 0.004) * 20;

      // Span full container
      const maxClusterRadius = Math.sqrt(width * width + height * height);

      const cols = Math.ceil(width / gridSpacing);
      const rows = Math.ceil(height / gridSpacing);

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * gridSpacing + gridSpacing / 2;
          const y = r * gridSpacing + gridSpacing / 2;

          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Span full container with a soft minimum baseline intensity
          let intensity = 0.15 + 0.85 * Math.pow(Math.max(0, 1 - dist / maxClusterRadius), 1.8);

          // Traveling wave rippling outward (expanding) with a higher amplitude (0.24) and wider bands (0.012)
          const wave = Math.sin(dist * 0.012 - animTime * 0.045) * 0.24;
          intensity = Math.max(0, Math.min(1, intensity + wave));

          if (intensity <= 0.01) continue;

          const seed = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453;
          const staticRandom = seed - Math.floor(seed);
          const sizeFactor = 0.7 + staticRandom * 0.6;

          let currentRadius = intensity * maxDotRadius * sizeFactor;

          let hoverAmt = 0;
          if (mouse.active) {
            const mdx = x - mouse.x;
            const mdy = y - mouse.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < 110) {
              hoverAmt = (110 - mdist) / 110;
              currentRadius += hoverAmt * (isMobile ? 1.2 : 2.5);
              intensity = Math.max(intensity, hoverAmt * 0.7);
            }
          }

          if (currentRadius < 0.25) continue;

          let colorStr = '';
          const opacity = Math.min(1, intensity * (0.6 + hoverAmt * 0.3));

          if (staticRandom < 0.06) {
            if (darkMode) {
              colorStr = `rgba(244, 63, 94, ${opacity * 0.7})`;
            } else {
              colorStr = `rgba(194, 29, 76, ${opacity * 0.7})`;
            }
          } else if (staticRandom < 0.28) {
            if (darkMode) {
              colorStr = `rgba(242, 241, 243, ${opacity * 0.48})`;
            } else {
              colorStr = `rgba(16, 16, 16, ${opacity * 0.42})`;
            }
          } else if (staticRandom < 0.65) {
            if (darkMode) {
              colorStr = `rgba(154, 149, 159, ${opacity * 0.38})`;
            } else {
              colorStr = `rgba(94, 90, 98, ${opacity * 0.32})`;
            }
          } else {
            if (darkMode) {
              colorStr = `rgba(42, 40, 45, ${opacity * 0.28})`;
            } else {
              colorStr = `rgba(222, 219, 225, ${opacity * 0.22})`;
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, currentRadius, 0, Math.PI * 2);

          if (hoverAmt > 0.4) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = darkMode ? 'rgba(244, 63, 94, 0.4)' : 'rgba(194, 29, 76, 0.25)';
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.fillStyle = colorStr;
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [darkMode]);

  return (
    <section className="relative overflow-hidden bg-transparent border-b border-border">
      {/* Background Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>

      {/* Vertical Stack Layout Container */}
      <div className="relative z-10 mx-auto max-w-[1800px] px-6 pt-20 pb-8 sm:px-10 sm:pt-28 sm:pb-10 lg:px-16 flex flex-col items-start justify-center">
        
        {/* Left-Aligned Stack */}
        <div className="flex flex-col items-start gap-6 text-left max-w-2xl">
          
          {/* Headline with Typing Animation */}
          <h1 className="text-foreground text-[28px] sm:text-[40px] md:text-[48px] leading-[1.15] font-light tracking-tight">
            <span className="block">Marketing agents</span>
            <span className="block whitespace-nowrap">
              that win{' '}
              <span className="inline font-normal text-foreground select-none">
                {text}
                <span className="text-primary animate-[blink_1s_step-end_infinite]">|</span>
              </span>
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-muted-foreground text-base sm:text-lg font-normal leading-relaxed max-w-md">
            Full-stack marketing agents that win you customers across every channel.
          </p>

          {/* Compact CTA Buttons */}
          <div className="flex flex-wrap gap-3 items-center mt-2">
            {/* Start Jamming Button */}
            <button 
              type="button" 
              className="group relative cursor-pointer inline-flex items-center justify-center gap-0 rounded-full py-1.5 px-5 text-center text-sm font-normal shadow-sm transition-all hover:opacity-90 active:brightness-95 bg-foreground text-background border border-transparent w-auto font-sans"
            >
              <span>Start Jamming</span>
              <span className="inline-flex overflow-hidden max-w-0 ml-0 group-hover:max-w-6 group-hover:ml-1.5 transition-all duration-300 ease-out">
                <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
              </span>
            </button>

            {/* Talk to Team Button */}
            <button 
              type="button" 
              className="rounded-full border border-zinc-300 dark:border-zinc-800 py-1.5 px-5 text-center text-sm font-normal transition-colors hover:bg-muted/40 text-foreground bg-transparent cursor-pointer"
            >
              Talk to Team
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
