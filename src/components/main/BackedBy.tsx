import React from 'react';

export default function BackedBy() {
  const logos = [
    { name: 'Andreessen Horowitz', src: '/backed/a16z-scout-fund.png' },
    { name: 'Finta', src: '/backed/finta.png' },
    { name: 'Clado', src: '/backed/clado.png' },
    { name: 'Hyperspell', src: '/backed/hyperspell.png' },
    { name: 'Earthling', src: '/backed/earthling.png' },
    { name: 'Boost', src: '/backed/boostvc.png' },
    { name: 'Browserbase', src: '/backed/browserbase.png' },
    { name: 'Google', src: '/backed/google.png' },
    { name: 'Hugging Face', src: '/backed/hugging-face.png' },
    { name: 'Together AI', src: '/backed/togetherai.png' }
  ];

  return (
    <div className="bg-[#FAF9F5]/40 dark:bg-background/40">
      <section className="p-6 md:p-8 lg:p-10">
        <section className="relative">
          <div className="flex items-start gap-3 mb-1">
            <span className="text-xs font-medium text-muted-foreground">Backed by</span>
          </div>
          <h3 className="text-sm sm:text-base text-muted-foreground mb-4">Funds, Founders, and Engineers</h3>
          <div className="scroller">
            <ul className="flex w-max min-w-full shrink-0 flex-nowrap gap-16 py-4 hover:[animation-play-state:paused] animate-infinite-scroll">
              {logos.map((logo, idx) => (
                <li key={`logo-${idx}`} className="relative shrink-0 flex items-center justify-center w-auto">
                  <div className="flex items-center gap-4 transition-opacity duration-200 hover:opacity-75">
                    <img 
                      alt={logo.name} 
                      loading="lazy" 
                      width="200" 
                      height="48" 
                      className="h-12 w-auto object-contain theme-transition-logo" 
                      src={logo.src} 
                    />
                  </div>
                </li>
              ))}
              {logos.map((logo, idx) => (
                <li key={`logo-dup-${idx}`} className="relative shrink-0 flex items-center justify-center w-auto">
                  <div className="flex items-center gap-4 transition-opacity duration-200 hover:opacity-75">
                    <img 
                      alt={logo.name} 
                      loading="lazy" 
                      width="200" 
                      height="48" 
                      className="h-12 w-auto object-contain theme-transition-logo" 
                      src={logo.src} 
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </div>
  );
}

