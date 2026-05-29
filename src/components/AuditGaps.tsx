import React from 'react';

export default function AuditGaps() {
  return (
    <div className="border-border relative overflow-hidden border-b p-6 lg:min-h-[520px] lg:border-r lg:border-b-0 md:p-8 lg:p-10">
      
      {/* Title block */}
      <div className="relative z-10 max-w-none lg:max-w-[44%]">
        <h3 className="text-foreground text-2xl font-light md:text-3xl">Beat your competitors</h3>
        <p className="text-muted-foreground/50 text-2xl font-light md:text-3xl">Publish articles that get you cited.</p>
      </div>

      {/* Article preview window */}
      <div 
        className="relative mt-6 w-full lg:absolute lg:top-10 lg:right-[-12%] lg:bottom-4 lg:left-[46%] lg:mt-0 lg:max-h-none lg:w-[60%] overflow-hidden" 
        aria-hidden="true"
      >
        <div className="bg-card border border-border shadow-sm rounded-xl overflow-hidden flex flex-col h-full bg-background/60 backdrop-blur-xs">
          
          {/* Editor Header Bar */}
          <div className="border-b border-border/50 px-4 py-3 flex items-center justify-between bg-muted/10 select-none">
            {/* macOS window dots */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80" />
            </div>
            
            {/* Title / URL */}
            <div className="text-[10px] font-mono text-muted-foreground/80 truncate px-2">
              trylumen.com/blog/lumen-vs-globex
            </div>

            {/* Published status badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-semibold bg-primary/10 text-primary border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Indexed
              </span>
            </div>
          </div>

          {/* Editor/Prose Body */}
          <div className="p-6 overflow-y-auto max-h-[300px] lg:max-h-none lg:flex-1 text-left scrollbar-thin">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h1 className="font-serif text-2xl font-normal text-foreground mb-4">Lumen vs Globex: Which gets cited by AI search?</h1>
              
              <p className="text-foreground/80">
                Choosing between <span className="bg-primary/5 border border-primary/10 px-1 rounded font-bold text-foreground">Lumen</span> and <span className="text-muted-foreground/60 line-through">Globex</span> comes down to one thing: which platform actually
                gets your product cited when buyers ask an AI assistant for a recommendation.
              </p>
              
              <h2 className="font-serif text-lg font-normal text-foreground mt-5 mb-2 border-b border-border pb-1">AI deliverability</h2>
              <p className="text-foreground/85">
                <strong className="text-primary font-bold">Lumen</strong> writes structured, source-rich pages that answer engines can parse and quote
                directly. <span className="text-foreground/60">Globex</span> still leans on classic blog formatting, so its content rarely
                surfaces in generated answers.
              </p>
              
              <h2 className="font-serif text-lg font-normal text-foreground mt-5 mb-2 border-b border-border pb-1">Getting cited by AI answer engines</h2>
              <p className="text-foreground/85">
                When a prospect asks ChatGPT, Perplexity, or Claude &quot;what&#x27;s the best tool for
                this?&quot;, the platform that structures its content for retrieval wins the mention.
              </p>
              
              <ul className="space-y-2.5 my-4 list-none pl-0">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold shrink-0 mt-0.5 text-xs">✓</span>
                  <span className="text-foreground/85">
                    <strong className="text-primary font-bold">Lumen</strong> publishes comparison pages with clear headings, definitions, and data
                    tables that models lift verbatim.
                  </span>
                </li>
                <li className="flex items-start gap-2 opacity-50">
                  <span className="text-muted-foreground shrink-0 mt-0.5 text-xs">✗</span>
                  <span className="text-foreground/75">
                    <strong>Globex</strong> publishes long narrative posts that models summarize but rarely cite
                    by name.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold shrink-0 mt-0.5 text-xs">✓</span>
                  <span className="text-foreground/85">
                    <strong className="text-primary font-bold">Lumen</strong> refreshes pages on a schedule so answer engines see current pricing
                    and features.
                  </span>
                </li>
                <li className="flex items-start gap-2 opacity-50">
                  <span className="text-muted-foreground shrink-0 mt-0.5 text-xs">✗</span>
                  <span className="text-foreground/75">
                    <strong>Globex</strong> updates infrequently, leaving stale claims in the index.
                  </span>
                </li>
              </ul>
              
              <h2 className="font-serif text-lg font-normal text-foreground mt-5 mb-2 border-b border-border pb-1">The bottom line</h2>
              <p className="text-foreground/85">
                If your goal is to show up the moment an AI answers a buying question, Lumen&#x27;s
                deliverability-first approach puts you in the answer. Globex gets you indexed;
                Lumen gets you cited.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
