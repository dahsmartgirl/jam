import React from 'react';

export default function VisibilityScore() {
  // Color configuration from source
  const chatgptColor = 'oklch(0.62 0.21 257)';
  const perplexityColor = 'oklch(0.69 0.15 162)';
  const geminiColor = 'oklch(0.78 0.13 197)';
  const claudeColor = 'oklch(0.72 0.15 295)';

  return (
    <section className="relative overflow-hidden p-6 lg:min-h-[460px] md:p-8 lg:p-10">
        
        {/* Left side: Heading */}
        <div className="relative z-10 lg:max-w-sm">
          <h3 className="text-foreground text-2xl font-light md:text-3xl">
            Find Your Gaps
          </h3>
          <p className="text-muted-foreground/50 text-2xl font-light md:text-3xl">
            Find where you&#x27;re not being cited in all AI platforms.
          </p>
        </div>

        {/* Right side: Charts & Stats Dashboard */}
        <div className="relative mt-6 w-full lg:absolute lg:right-[-10%] lg:bottom-0 lg:left-[38%] lg:mt-0 lg:w-auto">
          <div className="w-[560px] lg:w-full">
            <div className="space-y-1">
              <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
                Visibility Score
              </h2>
              <p className="text-muted-foreground text-xs">
                Share of tracked prompts where you are cited
              </p>
              
              {/* Value score row */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-semibold text-foreground tabular-nums" style={{ fontSize: '2.75rem', lineHeight: 1, letterSpacing: '-0.04em' }}>
                  50%
                </span>
                <span className="text-xs font-medium tabular-nums text-green-600 dark:text-green-400">
                  <span aria-hidden="true">↑</span>8 pp
                </span>
              </div>

              {/* Chart Area wrapper */}
              <div className="mt-6 h-56">
                <div 
                  data-slot="chart" 
                  data-chart="chart-_R_hhlav5tlb_"
                  className="aspect-auto h-full w-full relative border border-border/40 rounded-lg p-2 bg-muted/10 overflow-hidden"
                >
                  <svg className="w-full h-full" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
                    {/* Grid Lines */}
                    <line x1="40" y1="30" x2="580" y2="30" stroke="currentColor" className="text-border/40" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="40" y1="80" x2="580" y2="80" stroke="currentColor" className="text-border/40" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="40" y1="130" x2="580" y2="130" stroke="currentColor" className="text-border/40" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="40" y1="170" x2="580" y2="170" stroke="currentColor" className="text-border/60" strokeWidth="1" />

                    {/* X Axis vertical lines */}
                    <line x1="100" y1="30" x2="100" y2="170" stroke="currentColor" className="text-border/10" strokeWidth="1" />
                    <line x1="200" y1="30" x2="200" y2="170" stroke="currentColor" className="text-border/10" strokeWidth="1" />
                    <line x1="300" y1="30" x2="300" y2="170" stroke="currentColor" className="text-border/10" strokeWidth="1" />
                    <line x1="400" y1="30" x2="400" y2="170" stroke="currentColor" className="text-border/10" strokeWidth="1" />
                    <line x1="500" y1="30" x2="500" y2="170" stroke="currentColor" className="text-border/10" strokeWidth="1" />

                    {/* ChatGPT line - blue */}
                    <path d="M 50,140 Q 150,110 250,90 T 450,60 T 580,50" fill="none" stroke={chatgptColor} strokeWidth="3" />
                    
                    {/* Perplexity line - green/teal */}
                    <path d="M 50,160 Q 150,130 250,110 T 450,90 T 580,82" fill="none" stroke={perplexityColor} strokeWidth="3" />
                    
                    {/* Gemini line - blue/cyan */}
                    <path d="M 50,130 Q 150,150 250,140 T 450,135 T 580,128" fill="none" stroke={geminiColor} strokeWidth="3" />
                    
                    {/* Claude line - purple/pink */}
                    <path d="M 50,170 Q 150,165 250,150 T 450,115 T 580,105" fill="none" stroke={claudeColor} strokeWidth="3" />

                    {/* Dots on the final point */}
                    <circle cx="580" cy="50" r="4.5" fill={chatgptColor} />
                    <circle cx="580" cy="82" r="4.5" fill={perplexityColor} />
                    <circle cx="580" cy="128" r="4.5" fill={geminiColor} />
                    <circle cx="580" cy="105" r="4.5" fill={claudeColor} />

                    {/* Left Axis Labels */}
                    <text x="32" y="34" className="text-[9px] fill-muted-foreground text-right" textAnchor="end">80%</text>
                    <text x="32" y="84" className="text-[9px] fill-muted-foreground text-right" textAnchor="end">50%</text>
                    <text x="32" y="134" className="text-[9px] fill-muted-foreground text-right" textAnchor="end">20%</text>
                    <text x="32" y="174" className="text-[9px] fill-muted-foreground text-right" textAnchor="end">0%</text>

                    {/* X Axis labels */}
                    <text x="100" y="186" className="text-[9px] fill-muted-foreground" textAnchor="middle">Wk 1</text>
                    <text x="200" y="186" className="text-[9px] fill-muted-foreground" textAnchor="middle">Wk 2</text>
                    <text x="300" y="186" className="text-[9px] fill-muted-foreground" textAnchor="middle">Wk 3</text>
                    <text x="400" y="186" className="text-[9px] fill-muted-foreground" textAnchor="middle">Wk 4</text>
                    <text x="500" y="186" className="text-[9px] fill-muted-foreground" textAnchor="middle">Wk 5</text>
                  </svg>
                </div>
              </div>

              {/* Platform buttons list */}
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
                
                <button type="button" className="flex items-center gap-2 text-xs">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: chatgptColor }} />
                  <span className="text-muted-foreground">ChatGPT</span>
                  <span className="text-foreground font-medium tabular-nums">68%</span>
                  <span className="tabular-nums text-green-600 dark:text-green-400 font-semibold">+12 pp</span>
                </button>

                <button type="button" className="flex items-center gap-2 text-xs">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: perplexityColor }} />
                  <span className="text-muted-foreground">Perplexity</span>
                  <span className="text-foreground font-medium tabular-nums">54%</span>
                  <span className="tabular-nums text-green-600 dark:text-green-400 font-semibold">+8 pp</span>
                </button>

                <button type="button" className="flex items-center gap-2 text-xs">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: geminiColor }} />
                  <span className="text-muted-foreground">Gemini</span>
                  <span className="text-foreground font-medium tabular-nums">41%</span>
                  <span className="tabular-nums text-destructive font-semibold">-3 pp</span>
                </button>

                <button type="button" className="flex items-center gap-2 text-xs">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: claudeColor }} />
                  <span className="text-muted-foreground">Claude</span>
                  <span className="text-foreground font-medium tabular-nums">38%</span>
                  <span className="tabular-nums text-green-600 dark:text-green-400 font-semibold">+15 pp</span>
                </button>

              </div>

            </div>
          </div>
        </div>

        {/* Ambient fade-out overlay */}
        <div className="dark:from-background pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[10%] bg-gradient-to-r from-[#FAF9F5] to-transparent lg:block" />

      </section>

  );
}
