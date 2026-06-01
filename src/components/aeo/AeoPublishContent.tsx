import React from 'react';

export default function AeoPublishContent() {
  return (
    <div className="relative overflow-hidden p-6 lg:min-h-[520px] md:p-8 lg:p-10">
      
      {/* Title block */}
      <div className="relative z-10 mb-2 max-w-none lg:max-w-[42%]">
        <span className="feature-badge">Publish</span>
        <h3 className="text-foreground text-2xl font-light lg:text-3xl">Publish content that gets cited</h3>
        <p className="text-muted-foreground/50 mt-1.5 text-base font-light leading-relaxed">
          We draft it for you.
        </p>
      </div>

      {/* Draft Blog Post Panel (Left-Bordered Prose Layout) */}
      <div className="relative mt-6 max-h-[350px] w-full overflow-y-auto border-l border-border pl-6 lg:absolute lg:top-8 lg:right-[-10%] lg:bottom-4 lg:left-[48%] lg:mt-0 lg:w-auto lg:max-h-none lg:overflow-visible">
        <div className="prose prose-sm dark:prose-invert max-w-none lg:w-[450px] xl:w-[540px] text-left select-text select-none">
          
          <h1 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-4 leading-snug">
            How to Show Up in AI Answers for Cold Email Tools
          </h1>
          
          <p className="text-foreground/80 text-sm leading-relaxed mb-6 font-sans">
            When a founder asks ChatGPT or Perplexity for the best cold email tool, the answer is built from sources those engines already trust. To get cited, you need content that directly answers the question and is easy for an engine to quote.
          </p>
          
          <h2 className="font-serif text-base sm:text-lg font-normal text-foreground mt-5 mb-2 border-b border-border pb-1">
            Answer the exact question
          </h2>
          <p className="text-foreground/85 text-sm leading-relaxed mb-4 font-sans">
            Start with the phrasing buyers use. &quot;Best cold email tool for startups&quot; is a real query, so publish a page that answers it head on, with a clear recommendation in the first paragraph.
          </p>
          
          <h2 className="font-serif text-base sm:text-lg font-normal text-foreground mt-5 mb-2 border-b border-border pb-1">
            Back claims with specifics
          </h2>
          <p className="text-foreground/85 text-sm leading-relaxed mb-4 font-sans">
            Deliverability rates, reply rates, and pricing give an engine concrete facts to lift into its response. Vague claims get skipped; numbers get quoted.
          </p>
          
          <h2 className="font-serif text-base sm:text-lg font-normal text-foreground mt-5 mb-2 border-b border-border pb-1">
            Earn trusted mentions
          </h2>
          <p className="text-foreground/85 text-sm leading-relaxed mb-4 font-sans">
            Earn mentions on the sources engines read most, including Reddit threads, comparison roundups, and community guides. The more often your name appears next to the question, the more often you get cited.
          </p>
          
          <p className="text-foreground/75 text-xs sm:text-sm italic font-sans mt-4">
            Refresh quarterly so your page stays current and keeps winning the answer.
          </p>
          
        </div>
      </div>

    </div>
  );
}
