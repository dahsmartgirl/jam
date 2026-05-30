import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Spirograph({ darkMode }: { darkMode: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height || 380;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    let animTime = 0;

    const animate = () => {
      animTime += 0.5;
      ctx.clearRect(0, 0, width, height);

      // Shift center to the right so it looks like it is coming from the right
      const cx = width * 0.85;
      const cy = height / 2;

      ctx.save();
      ctx.translate(cx, cy);

      const baseR = Math.min(width, height) * 0.72;
      const h = height * 0.95;
      const rotY = animTime * 0.008;

      const getRadius = (yVal: number) => {
        const normY = yVal / h; // -0.5 to 0.5
        const lidH = 0.12;
        const neckH = 0.08;
        
        if (normY < -0.5 + lidH) {
          // Lid
          return baseR * 0.65;
        } else if (normY < -0.5 + lidH + neckH) {
          // Neck transition
          const t = (normY - (-0.5 + lidH)) / neckH;
          return baseR * (0.65 - 0.2 * t);
        } else if (normY < 0.4) {
          // Body
          const t = (normY - (-0.5 + lidH + neckH)) / (0.4 - (-0.5 + lidH + neckH));
          return baseR * (0.45 + 0.4 * Math.sin(t * Math.PI / 2));
        } else {
          // Bottom round off
          const t = (normY - 0.4) / 0.1;
          return baseR * 0.85 * Math.sqrt(Math.max(0, 1 - t * t));
        }
      };

      // 1. Draw horizontal rings (ellipses)
      const ringCount = 20;
      for (let j = 0; j <= ringCount; j++) {
        const normY = -0.5 + j / ringCount;
        const y = normY * h;
        const r = getRadius(y);

        ctx.beginPath();
        // Ellipse tilt is 0.2
        ctx.ellipse(0, y, r, r * 0.2, 0, 0, 2 * Math.PI);

        // Highlight ring at the lid neck
        const isHighlightRing = j === Math.floor(ringCount * 0.15) || j === Math.floor(ringCount * 0.25);
        
        if (isHighlightRing) {
          ctx.strokeStyle = darkMode ? 'rgba(244, 63, 94, 0.4)' : 'rgba(225, 29, 72, 0.3)';
          ctx.lineWidth = 1.2;
        } else {
          ctx.strokeStyle = darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(16, 16, 16, 0.035)';
          ctx.lineWidth = 0.75;
        }
        ctx.stroke();
      }

      // 2. Draw vertical curves (longitudinal lines)
      const vertCount = 18;
      const highlightPeriod = 120;
      const highlightedIndex = Math.floor((animTime % highlightPeriod) / (highlightPeriod / vertCount));

      for (let i = 0; i < vertCount; i++) {
        const theta = (i * 2 * Math.PI) / vertCount;
        const isHighlighted = i === highlightedIndex;

        ctx.beginPath();
        for (let j = 0; j <= 40; j++) {
          const normY = -0.5 + j / 40;
          const y = normY * h;
          const r = getRadius(y);

          // Rotate around Y-axis
          const x = r * Math.cos(theta + rotY);

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        if (isHighlighted) {
          ctx.strokeStyle = darkMode ? 'rgba(244, 63, 94, 0.95)' : 'rgba(225, 29, 72, 0.95)';
          ctx.lineWidth = 0.5;
          ctx.shadowBlur = 10;
          ctx.shadowColor = darkMode ? 'rgba(244, 63, 94, 0.5)' : 'rgba(225, 29, 72, 0.35)';
        } else {
          ctx.strokeStyle = darkMode ? 'rgba(255, 255, 255, 0.07)' : 'rgba(16, 16, 16, 0.06)';
          ctx.lineWidth = 0.35;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [darkMode]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[420px] bg-transparent overflow-visible flex items-center justify-end select-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
    </div>
  );
}

export default function Changelog({ darkMode = false }: { darkMode?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const updates = [
    {
      date: 'May 19, 2026',
      title: 'Guided Onboarding',
      changes: [
        "New accounts now start with a short guided setup. Tell Jam about your product once and it researches your company in the background while you finish the rest of onboarding, so your first conversation already knows who you are and what you sell.",
        "Set up your workspace and invite your team right from the setup flow, or skip team invites entirely if you're working solo. Every step is optional, and a clear Skip control drops you straight into the product whenever you're ready."
      ]
    },
    {
      date: 'May 18, 2026',
      title: 'A Faster Chat',
      changes: [
        "Chat is noticeably quicker. Read-only questions, the kind where you're asking Jam to look something up rather than take an action, now take a dedicated fast path that skips the heavier agent machinery and answers right away.",
        "Drafts are steadier too. Your draft status now survives navigating away and back, duplicate drafts are no longer created when a request retries, and a background safety net automatically recovers any draft left stuck mid-send. A handful of inbox and dashboard glitches were cleaned up along the way."
      ]
    },
    {
      date: 'May 13, 2026',
      title: 'Send Straight From Gmail',
      changes: [
        "Connecting Gmail is now a single click through Google's own sign-in. No app passwords, no manual setup.",
        "Once connected, you can send from any of your send-as aliases and add cc and bcc to any message, in chat or in a campaign. Jam discovers your aliases automatically and lets you pick which one to send from.",
        "Sending volume ramps up gradually to protect your deliverability. If you'd rather not warm up, turning it off lifts your daily cap straight to your provider's maximum."
      ]
    }
  ];

  return (
    <section className="relative p-6 md:p-8 lg:p-10 border-t border-border/30 bg-transparent overflow-hidden">
      {/* Section Header */}
      <div className="mb-10 text-left">
        <span className="feature-badge">Changelog</span>
        <h2 className="text-foreground text-2xl font-light sm:text-3xl mt-1">Shipping every week.</h2>
        <p className="text-muted-foreground/60 text-lg font-light mt-1">See what&#x27;s new inside the platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-6">
        {/* Left column: Accordion List */}
        <div className="md:col-span-7">
          <div className="divide-y divide-border/25">
            {updates.map((update, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="py-6 first:pt-0 last:pb-0"
                >
                  {/* Responsive Grid layout */}
                  <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-8 text-left">
                    {/* Left column: Date */}
                    <div className="flex items-center md:items-start md:pt-1.5">
                      <span className="text-sm text-muted-foreground/60 font-normal">
                        {update.date}
                      </span>
                    </div>

                    {/* Right column: Clickable Title + Animated Content Accordion */}
                    <div className="flex flex-col">
                      {/* Clickable Header */}
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="flex items-center justify-between w-full text-left group cursor-pointer py-1"
                      >
                        <h3 className="text-foreground text-lg font-normal group-hover:text-primary transition-colors duration-150">
                          {update.title}
                        </h3>
                        <ChevronDown 
                          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-foreground' : 'group-hover:text-foreground'
                          }`}
                        />
                      </button>

                      {/* Animated changes content */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 pb-2 text-sm text-foreground/80 leading-relaxed font-normal space-y-3">
                              {update.changes.map((paragraph, pIdx) => (
                                <p key={pIdx}>
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Link */}
          <div className="mt-8 text-left border-t border-border/20 pt-6">
            <a 
              className="group inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors font-medium" 
              href="/changelog"
            >
              <span>See all updates</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1.5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Right column: Spirograph pinned fixed at top-0 inside right column */}
        <div className="hidden md:block md:col-span-5 relative">
          <div className="absolute right-0 top-0 w-[550px] h-[550px] pointer-events-none select-none overflow-visible">
            <Spirograph darkMode={darkMode} />
          </div>
        </div>
      </div>
    </section>
  );
}
