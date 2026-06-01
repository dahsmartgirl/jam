import React from 'react';

interface CitationSource {
  domain: string;
  count: number;
  widthPercent: number;
}

export default function AeoCitationSources() {
  const sources: CitationSource[] = [
    { domain: 'reddit.com', count: 47, widthPercent: 100 },
    { domain: 'wikipedia.org', count: 22, widthPercent: 47 },
    { domain: 'forbes.com', count: 14, widthPercent: 30 },
    { domain: 'stackoverflow.com', count: 9, widthPercent: 19 },
    { domain: 'producthunt.com', count: 4, widthPercent: 9 },
    { domain: 'medium.com', count: 4, widthPercent: 9 },
    { domain: 'github.com', count: 3, widthPercent: 6 },
    { domain: 'news.ycombinator.com', count: 3, widthPercent: 6 },
  ];

  return (
    <div className="border-border relative overflow-hidden border-b p-6 lg:min-h-[480px] lg:border-r lg:border-b-0 md:p-8 lg:p-10">
      
      {/* Title block */}
      <div className="relative z-10 mb-2 max-w-none lg:max-w-md">
        <span className="feature-badge">Sources</span>
        <h3 className="text-foreground text-2xl font-light lg:text-3xl">Citation sources</h3>
        <p className="text-muted-foreground/50 mt-1.5 text-base font-light leading-relaxed">
          Where AI answers pull you from.
        </p>
      </div>

      {/* Floating Card containing sources list */}
      <div className="relative mt-6 w-full lg:absolute lg:right-[8%] lg:bottom-[-44px] lg:left-[8%] lg:mt-0 lg:w-auto">
        <div className="bg-card border-border/50 w-full lg:w-[350px] xl:w-[400px] rounded-2xl border backdrop-blur-xs">
          
          <div className="px-5 py-4 select-none border-b border-border/25">
            <h2 className="text-[14px] font-normal tracking-tight text-foreground">Citation sources</h2>
            <p className="text-muted-foreground mt-0.5 text-[11px]">Where AI answers cite you from</p>
          </div>

          <ul className="space-y-1 p-3.5 list-none pl-0">
            {sources.map((src) => (
              <li 
                key={src.domain} 
                className="grid grid-cols-[1.2fr_2fr_auto] items-center gap-3 hover:bg-muted/20 px-3 py-2 rounded-xl transition-all duration-150 cursor-pointer group select-none"
              >
                {/* Domain name with Favicon */}
                <div className="flex items-center gap-2 min-w-0">
                  <img 
                    src={`https://www.google.com/s2/favicons?domain=${src.domain}&sz=32`} 
                    alt="" 
                    className="w-3.5 h-3.5 rounded-sm object-contain opacity-60 group-hover:opacity-100 transition-opacity" 
                    loading="lazy"
                  />
                  <span className="truncate text-xs font-normal text-foreground/70 group-hover:text-foreground transition-colors">
                    {src.domain}
                  </span>
                </div>
                
                {/* Progress bar container */}
                <div className="bg-muted/40 dark:bg-muted/10 relative h-1 w-full overflow-hidden rounded-full" aria-hidden="true">
                  <div 
                    className="bg-foreground/50 dark:bg-foreground/30 group-hover:bg-primary/75 h-full rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${src.widthPercent}%` }}
                  />
                </div>
                
                {/* Count */}
                <span className="text-muted-foreground group-hover:text-foreground text-xs tabular-nums font-mono text-right w-6 transition-colors">
                  {src.count}
                </span>
              </li>
            ))}
          </ul>

        </div>
      </div>

    </div>
  );
}
