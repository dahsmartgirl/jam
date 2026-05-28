import React from 'react';

export default function AuditGaps() {
  return (
    <div className="border-border relative overflow-hidden border-b p-6 lg:min-h-[520px] lg:border-r lg:border-b-0 md:p-8 lg:p-10">
      
      {/* Title block */}
      <div className="relative z-10 max-w-none lg:max-w-[44%]">
        <h3 className="text-foreground text-2xl font-light md:text-3xl">Beat your competitors</h3>
        <p className="text-muted-foreground/50 text-2xl font-light md:text-3xl">Publish articles that get you cited.</p>
      </div>

      {/* Prose Article preview block */}
      <div 
        className="border-border pointer-events-none relative mt-6 max-h-[260px] w-full overflow-hidden border-l pl-6 lg:absolute lg:top-8 lg:right-[-30%] lg:bottom-0 lg:left-[48%] lg:mt-0 lg:max-h-none lg:w-auto lg:overflow-visible lg:top-10" 
        aria-hidden="true"
      >
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p>
            Choosing between Lumen and Globex comes down to one thing: which platform actually
            gets your product cited when buyers ask an AI assistant for a recommendation.
          </p>
          
          <h2>AI deliverability</h2>
          <p>
            Lumen writes structured, source-rich pages that answer engines can parse and quote
            directly. Globex still leans on classic blog formatting, so its content rarely
            surfaces in generated answers.
          </p>
          
          <h2>Getting cited by AI answer engines</h2>
          <p>
            When a prospect asks ChatGPT, Perplexity, or Gemini &quot;what&#x27;s the best tool for
            this?&quot;, the platform that structures its content for retrieval wins the mention.
          </p>
          
          <ul>
            <li>
              <strong>Lumen</strong> publishes comparison pages with clear headings, definitions, and data
              tables that models lift verbatim.
            </li>
            <li>
              <strong>Globex</strong> publishes long narrative posts that models summarize but rarely cite
              by name.
            </li>
            <li>
              <strong>Lumen</strong> refreshes pages on a schedule so answer engines see current pricing
              and features.
            </li>
            <li>
              <strong>Globex</strong> updates infrequently, leaving stale claims in the index.
            </li>
          </ul>
          
          <h2>The bottom line</h2>
          <p>
            If your goal is to show up the moment an AI answers a buying question, Lumen&#x27;s
            deliverability-first approach puts you in the answer. Globex gets you indexed;
            Lumen gets you cited.
          </p>
        </div>

        {/* Ambient fade-out overlay */}
        <div className="dark:from-background pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[10%] bg-gradient-to-r from-[#FAF9F5] to-transparent lg:block" />
      </div>

    </div>
  );
}
