import React, { useState } from 'react';

export default function VisibilityScore() {
  // Color configuration from source
  const chatgptColor = 'oklch(0.62 0.21 257)';
  const perplexityColor = 'oklch(0.69 0.15 162)';
  const geminiColor = 'oklch(0.78 0.13 197)';
  const claudeColor = 'oklch(0.72 0.15 295)';

  // Hover state to track the active data point index
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Generate daily data points from May 1 to May 29 (29 days)
  const generateData = () => {
    const data = [];
    const startChatGPT = 56;
    const endChatGPT = 68;
    const startPerplexity = 46;
    const endPerplexity = 54;
    const startGemini = 44;
    const endGemini = 41;
    const startClaude = 23;
    const endClaude = 38;

    for (let i = 0; i < 29; i++) {
      const progress = i / 28;
      // Add multi-frequency sine/cosine waves scaled by progress to create beautiful organic fluctuations
      const factor = Math.sin(progress * Math.PI); // 0 at start, 1 in middle, 0 at end
      const wave = factor * (Math.sin(i * 0.7) * 4.5 + Math.cos(i * 0.3) * 2.5);
      
      data.push({
        day: i + 1,
        date: `May ${i + 1}`,
        chatgpt: Math.round(startChatGPT + progress * (endChatGPT - startChatGPT) + wave),
        perplexity: Math.round(startPerplexity + progress * (endPerplexity - startPerplexity) - wave * 0.7),
        gemini: Math.round(startGemini + progress * (endGemini - startGemini) + Math.cos(i * 0.5) * 1.5 * factor),
        claude: Math.round(startClaude + progress * (endClaude - startClaude) + wave * 1.2),
      });
    }
    // Force final values to match the static stats exactly
    data[28] = {
      day: 29,
      date: 'May 29',
      chatgpt: 68,
      perplexity: 54,
      gemini: 41,
      claude: 38,
    };
    return data;
  };

  const chartData = generateData();

  // Extend chart to the end of the SVG grid (x = 600)
  const getX = (index: number) => 50 + (index / 28) * 550;
  // Scaled Y up to 100% (height 150px, from y=170 at 0% to y=20 at 100%)
  const getY = (val: number) => 170 - (val / 100) * 150;

  // Render a smooth line using cubic bezier curves
  const makeSmoothPath = (key: 'chatgpt' | 'perplexity' | 'gemini' | 'claude') => {
    let path = `M ${getX(0)} ${getY(chartData[0][key])}`;
    for (let i = 0; i < chartData.length - 1; i++) {
      const x0 = getX(i);
      const y0 = getY(chartData[i][key]);
      const x1 = getX(i + 1);
      const y1 = getY(chartData[i + 1][key]);
      
      // Control points for smooth horizontal tangents
      const cp1x = x0 + (x1 - x0) / 3;
      const cp1y = y0;
      const cp2x = x0 + 2 * (x1 - x0) / 3;
      const cp2y = y1;
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x1} ${y1}`;
    }
    return path;
  };

  // Tooltip positioning variables
  let tooltipLeft = '';
  let tooltipTransform = 'translateX(-50%)';
  if (hoveredIndex !== null) {
    if (hoveredIndex < 5) {
      tooltipTransform = 'none';
      tooltipLeft = '55px';
    } else if (hoveredIndex > 23) {
      tooltipTransform = 'translateX(-100%)';
      tooltipLeft = 'calc(100% - 10px)';
    } else {
      tooltipLeft = `${(getX(hoveredIndex) / 600) * 100}%`;
    }
  }

  return (
    <section className="relative overflow-hidden p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left side: Heading */}
        <div className="relative z-10 lg:col-span-4">
          <h3 className="text-foreground text-2xl font-light md:text-3xl">
            Find Your Gaps
          </h3>
          <p className="text-muted-foreground/50 text-2xl font-light md:text-3xl">
            Find where you&#x27;re not being cited in all AI platforms.
          </p>
        </div>

        {/* Right side: Charts & Stats Dashboard */}
        <div className="relative w-full lg:col-span-8">
          <div className="w-full">
            <div className="space-y-1">
              <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
                Visibility Score
              </h2>
              <p className="text-muted-foreground text-xs">
                Share of tracked prompts where you are cited
              </p>
              
              {/* Value score row */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-semibold text-foreground tabular-nums" style={{ fontSize: '3.5rem', lineHeight: 1, letterSpacing: '-0.04em' }}>
                  50%
                </span>
                <span className="text-xs font-medium tabular-nums text-green-600 dark:text-green-400">
                  <span aria-hidden="true">↑</span>8 pp
                </span>
              </div>

              {/* Chart Area wrapper */}
              <div className="mt-6 h-[260px]">
                <div 
                  data-slot="chart" 
                  data-chart="chart-_R_hhlav5tlb_"
                  className="aspect-auto h-full w-full relative"
                >
                  <svg 
                    className="w-full h-full cursor-crosshair" 
                    viewBox="0 0 600 200" 
                    xmlns="http://www.w3.org/2000/svg"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const svgX = (x / rect.width) * 600;
                      
                      const clampedX = Math.max(50, Math.min(600, svgX));
                      const progress = (clampedX - 50) / 550;
                      const index = Math.round(progress * 28);
                      setHoveredIndex(index);
                    }}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Grid Lines (scaled up to 100%, every 20%) */}
                    <line x1="50" y1="20" x2="600" y2="20" stroke="currentColor" className="text-border/40" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="50" y1="50" x2="600" y2="50" stroke="currentColor" className="text-border/40" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="50" y1="80" x2="600" y2="80" stroke="currentColor" className="text-border/40" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="50" y1="110" x2="600" y2="110" stroke="currentColor" className="text-border/40" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="50" y1="140" x2="600" y2="140" stroke="currentColor" className="text-border/40" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="50" y1="170" x2="600" y2="170" stroke="currentColor" className="text-border/60" strokeWidth="1" />

                    {/* X Axis vertical lines (extending all the way to x=600) */}
                    <line x1="50" y1="20" x2="50" y2="170" stroke="currentColor" className="text-border/10" strokeWidth="1" />
                    <line x1="187.5" y1="20" x2="187.5" y2="170" stroke="currentColor" className="text-border/10" strokeWidth="1" />
                    <line x1="325" y1="20" x2="325" y2="170" stroke="currentColor" className="text-border/10" strokeWidth="1" />
                    <line x1="462.5" y1="20" x2="462.5" y2="170" stroke="currentColor" className="text-border/10" strokeWidth="1" />
                    <line x1="600" y1="20" x2="600" y2="170" stroke="currentColor" className="text-border/10" strokeWidth="1" />

                    {/* Vertical hover line indicator (0.5px light grey) */}
                    {hoveredIndex !== null && (
                      <line 
                        x1={getX(hoveredIndex)} 
                        y1="20" 
                        x2={getX(hoveredIndex)} 
                        y2="170" 
                        stroke="rgba(156, 163, 175, 0.4)" 
                        strokeWidth="0.5" 
                        strokeDasharray="4 4"
                      />
                    )}

                    {/* Platform paths - smooth curves, thickness reduced to 1.5, circular ending dots removed */}
                    <path d={makeSmoothPath('chatgpt')} fill="none" stroke={chatgptColor} strokeWidth="1.5" />
                    <path d={makeSmoothPath('perplexity')} fill="none" stroke={perplexityColor} strokeWidth="1.5" />
                    <path d={makeSmoothPath('gemini')} fill="none" stroke={geminiColor} strokeWidth="1.5" />
                    <path d={makeSmoothPath('claude')} fill="none" stroke={claudeColor} strokeWidth="1.5" />

                    {/* Left Axis Labels - shifted to left boundary, scaled up to 100% */}
                    <text x="10" y="24" className="text-[10px] font-medium fill-muted-foreground" textAnchor="start">100%</text>
                    <text x="10" y="54" className="text-[10px] font-medium fill-muted-foreground" textAnchor="start">80%</text>
                    <text x="10" y="84" className="text-[10px] font-medium fill-muted-foreground" textAnchor="start">60%</text>
                    <text x="10" y="114" className="text-[10px] font-medium fill-muted-foreground" textAnchor="start">40%</text>
                    <text x="10" y="144" className="text-[10px] font-medium fill-muted-foreground" textAnchor="start">20%</text>
                    <text x="10" y="174" className="text-[10px] font-medium fill-muted-foreground" textAnchor="start">0%</text>

                    {/* X Axis labels (extending all the way to end at x=600) */}
                    <text x="50" y="188" className="text-[9px] fill-muted-foreground" textAnchor="middle">May 1</text>
                    <text x="187.5" y="188" className="text-[9px] fill-muted-foreground" textAnchor="middle">May 8</text>
                    <text x="325" y="188" className="text-[9px] fill-muted-foreground" textAnchor="middle">May 15</text>
                    <text x="462.5" y="188" className="text-[9px] fill-muted-foreground" textAnchor="middle">May 22</text>
                    <text x="600" y="188" className="text-[9px] fill-muted-foreground" textAnchor="end">May 29</text>
                  </svg>

                  {/* Tooltip Card detailing all percentages */}
                  {hoveredIndex !== null && (
                    <div 
                      className="absolute z-20 pointer-events-none bg-background/95 dark:bg-zinc-950/95 border border-border/80 rounded-lg p-3 shadow-xl backdrop-blur-md transition-all duration-75 text-xs min-w-[145px]"
                      style={{
                        left: tooltipLeft,
                        top: '10px',
                        transform: tooltipTransform,
                      }}
                    >
                      <div className="font-semibold text-foreground mb-1.5 border-b border-border/50 pb-1">
                        {chartData[hoveredIndex].date}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: chatgptColor }} />
                            <span>ChatGPT</span>
                          </div>
                          <span className="font-semibold text-foreground tabular-nums">{chartData[hoveredIndex].chatgpt}%</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: perplexityColor }} />
                            <span>Perplexity</span>
                          </div>
                          <span className="font-semibold text-foreground tabular-nums">{chartData[hoveredIndex].perplexity}%</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: geminiColor }} />
                            <span>Gemini</span>
                          </div>
                          <span className="font-semibold text-foreground tabular-nums">{chartData[hoveredIndex].gemini}%</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: claudeColor }} />
                            <span>Claude</span>
                          </div>
                          <span className="font-semibold text-foreground tabular-nums">{chartData[hoveredIndex].claude}%</span>
                        </div>
                      </div>
                    </div>
                  )}
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

      </section>
  );
}

