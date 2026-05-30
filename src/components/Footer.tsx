import React, { useEffect, useRef } from 'react';

interface FooterProps {
  darkMode?: boolean;
}

export default function Footer({ darkMode = false }: FooterProps) {
  // Halftone Dot Matrix Cluster Animation (originating from top left)
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

      // Originating from top left (width * 0.15)
      const cx = width * 0.15 + Math.sin(animTime * 0.005) * 30;
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

          // Traveling wave rippling outward (expanding)
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
    <div>
      {/* Spread Like Jam Call to Action Section */}
      <div className="mx-auto max-w-[1800px] px-3 sm:px-6 md:px-10 lg:px-16">
        <section className="dark:bg-background relative overflow-hidden bg-[#FAF9F5] py-24 md:py-32 lg:py-40">
          <div className="absolute inset-0 z-0">
            <section className="p-4 flex items-center justify-center h-full w-full relative" style={{ width: '100%', height: '100%' }}>
              <div className="w-full h-full relative">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
              </div>
            </section>
          </div>
          <div className="relative z-10 mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="text-foreground mb-10 flex items-center gap-2 text-4xl sm:gap-3 sm:text-6xl md:mb-12 md:text-8xl lg:text-9xl">
                <span className="font-sans font-light">
                  Spread like
                </span>
                <svg width="90" height="102.98507462686568" viewBox="0 0 201 230" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1 ml-2 h-auto !w-[28px] sm:mr-2 sm:ml-3 sm:!w-[48px] md:!w-[65px] lg:!w-[90px]">
                  <rect x="198.154" y="75.8682" width="195.652" height="73.3685" rx="36.6842" transform="rotate(-180 198.154 75.8682)" stroke="#F10606" strokeWidth="5">
                  </rect>
                  <rect x="100.327" y="154.128" width="97.826" height="78.2597" rx="39.1299" transform="rotate(-180 100.327 154.128)" stroke="#F10606" strokeWidth="5">
                  </rect>
                  <path d="M198.154 114.998C198.154 136.609 180.635 154.128 159.025 154.128L100.328 154.128L100.328 75.8682L159.025 75.8682C180.635 75.8682 198.154 93.3872 198.154 114.998V114.998Z" stroke="#F10606" strokeWidth="5">
                  </path>
                  <path d="M2.5 190.813C2.5 170.553 18.9241 154.129 39.1842 154.129H100.326V227.497H39.1843C18.9241 227.497 2.5 211.073 2.5 190.813V190.813Z" stroke="#F10606" strokeWidth="5">
                  </path>
                  <path d="M198.154 190.812C198.154 211.072 181.73 227.496 161.47 227.496L100.328 227.496L100.328 154.128L161.47 154.128C181.73 154.128 198.154 170.552 198.154 190.812V190.812Z" stroke="#F10606" strokeWidth="5">
                  </path>
                </svg>
                <span className="font-sans font-normal">
                  Jam.
                </span>
              </h2>
              <button 
                type="button" 
                className="btn-gradient-highlight group relative cursor-pointer inline-flex items-center justify-center gap-0 rounded-full py-1.5 px-5 text-center text-sm font-normal shadow-sm transition-all hover:opacity-90 active:brightness-95 bg-foreground text-background border border-transparent w-auto font-sans"
              >
                <span>Start Jamming</span>
                <span className="inline-flex overflow-hidden max-w-0 ml-0 group-hover:max-w-6 group-hover:ml-2 transition-all duration-300 ease-out">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-4 w-4 flex-shrink-0" aria-hidden="true">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Main Footer Links & Copyright */}
      <footer className="w-full py-12 md:py-16 bg-background">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-10 md:flex-row md:gap-20">
            <div className="max-w-xs">
              <div className="h-9 w-auto flex items-center gap-2">
                <img 
                  src="/jam-logo.svg"
                  alt="Jam"
                  className="h-7 w-auto"
                />
                <span className="text-foreground text-lg font-medium tracking-tight">Jam</span>
              </div>
              <p className="text-muted-foreground mt-3 text-sm font-normal leading-relaxed">
                Full-stack marketing agents that win you customers across every channel.
              </p>
            </div>
            <div className="flex flex-wrap gap-12 md:gap-16 md:ml-auto">
              <div>
                <h3 className="text-foreground mb-3 text-sm font-medium">Product</h3>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <a className="text-muted-foreground hover:text-foreground text-sm transition-colors" href="/products/aeo">
                      AEO
                    </a>
                  </li>
                  <li>
                    <a className="text-muted-foreground hover:text-foreground text-sm transition-colors" href="/products/email-outbound">
                      Email Outbound
                    </a>
                  </li>
                  <li>
                    <a className="text-muted-foreground hover:text-foreground text-sm transition-colors" href="/products/social-monitoring">
                      Social Monitoring
                    </a>
                  </li>
                  <li>
                    <a className="text-muted-foreground hover:text-foreground text-sm transition-colors" href="/products/short-form-content">
                      Short Form Content
                    </a>
                  </li>
                  <li>
                    <a className="text-muted-foreground hover:text-foreground text-sm transition-colors" href="/pricing">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-foreground mb-3 text-sm font-medium">Resources</h3>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <a className="text-muted-foreground hover:text-foreground text-sm transition-colors" href="/blogs">
                      Blogs
                    </a>
                  </li>
                  <li>
                    <a href="https://docs.spreadjam.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                      Docs
                    </a>
                  </li>
                  <li>
                    <a className="text-muted-foreground hover:text-foreground text-sm transition-colors" href="/manifesto">
                      Manifesto
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/wespreadjam/jam-nodes" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                      Open Source
                    </a>
                  </li>
                  <li>
                    <a className="text-muted-foreground hover:text-foreground text-sm transition-colors" href="/changelog">
                      Change Log
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-foreground mb-3 text-sm font-medium">Legal</h3>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <a className="text-muted-foreground hover:text-foreground text-sm transition-colors" href="/terms">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a className="text-muted-foreground hover:text-foreground text-sm transition-colors" href="/privacy">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-foreground mb-3 text-sm font-medium">Social</h3>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <a href="https://dsc.gg/spreadjam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                      Discord
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com/wespreadjam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/108739060/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/wespreadjam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Footer Area */}
          <div className="mt-12 md:mt-16 pt-6 border-t border-border/20 flex flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground/40 text-xs">
              © 2026 Jam, Inc
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
