import React, { useEffect, useRef } from 'react';

export default function Footer() {
  // Background particle canvas animation matching the source/Hero
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

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.speedY = (Math.random() - 0.5) * 0.25;
        this.opacity = Math.random() * 0.4 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Soft rose-colored particles matching hero
        ctx.fillStyle = `rgba(244, 63, 94, ${this.opacity})`;
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = 35;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {/* Spread Like Jam Call to Action Section */}
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
              className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-full group px-8 py-5 text-lg"
            >
              <span>Get started</span>
              <span className="inline-flex overflow-hidden max-w-0 ml-0 group-hover:max-w-6 group-hover:ml-2 transition-all duration-300 ease-out">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-right h-4 w-4 flex-shrink-0" aria-hidden="true">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

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
            <div className="flex flex-wrap gap-12 md:gap-16">
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
            <div className="flex flex-col items-start gap-3 justify-end md:ml-auto">
              <p className="text-muted-foreground text-sm">
                © 2026 Jam, Inc
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
