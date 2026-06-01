import React from 'react';

interface PromptData {
  question: string;
  platform: string;
  cited: boolean;
  position: string;
}

export default function AeoTrackedPrompts() {
  const prompts: PromptData[] = [
    { question: 'Best cold email tool for startups', platform: 'ChatGPT', cited: true, position: '#2' },
    { question: 'Top AI tools for B2B lead generation', platform: 'Perplexity', cited: true, position: '#4' },
    { question: 'How to improve email deliverability for SaaS', platform: 'Claude', cited: false, position: 'Not cited' },
    { question: 'Tools YC startups use for growth', platform: 'ChatGPT', cited: true, position: '#1' },
    { question: 'How to automate outbound sales', platform: 'Gemini', cited: false, position: 'Not cited' },
    { question: 'Best email outreach platform', platform: 'Perplexity', cited: true, position: '#3' },
    { question: 'How to set up cold email infrastructure', platform: 'Claude', cited: true, position: '#2' },
    { question: 'AI SEO vs traditional SEO', platform: 'Perplexity', cited: true, position: '#1' },
  ];

  return (
    <div className="relative overflow-hidden p-6 lg:min-h-[480px] md:p-8 lg:p-10">
      
      {/* Title block */}
      <div className="relative z-10 mb-2 max-w-none lg:max-w-md">
        <span className="feature-badge">Monitor</span>
        <h3 className="text-foreground text-2xl font-light lg:text-3xl">Track every prompt</h3>
        <p className="text-muted-foreground/50 mt-1.5 text-base font-light leading-relaxed">
          Know exactly where you stand.
        </p>
      </div>

      {/* Floating Card containing Prompts List */}
      <div className="relative mt-6 w-full lg:absolute lg:right-[-14%] lg:bottom-[-44px] lg:left-[14%] lg:mt-0 lg:w-auto">
        <div className="bg-card border-border/50 max-h-[420px] w-full lg:w-[450px] xl:w-[520px] overflow-y-auto rounded-2xl border lg:max-h-none lg:rounded-t-2xl lg:rounded-b-none lg:border-b-0 backdrop-blur-xs">
          
          <div className="px-6 py-5 select-none">
            <h2 className="text-[15px] font-normal tracking-tight text-foreground">Tracked prompts</h2>
            <p className="text-muted-foreground text-xs">Every question we run against the AI engines</p>
          </div>

          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-muted-foreground border-border/40 border-y text-xs select-none">
                <th className="px-6 py-2 font-normal">Question</th>
                <th className="px-2 py-2 font-normal">Platform</th>
                <th className="px-2 py-2 font-normal">Cited</th>
                <th className="px-6 py-2 text-right font-normal">Position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {prompts.map((p, idx) => {
                return (
                  <tr key={idx} className="transition-colors hover:bg-muted/30">
                    <td className="px-6 py-3.5 text-foreground/80 font-normal max-w-[200px] truncate">
                      {p.question}
                    </td>
                    <td className="text-muted-foreground px-2 py-3.5 text-xs font-mono">
                      {p.platform}
                    </td>
                    <td className="px-2 py-3.5 text-xs">
                      {p.cited ? (
                        <span className="text-green-700 dark:text-green-400 font-normal px-2 py-0.5 rounded-full bg-green-500/10">
                          Yes
                        </span>
                      ) : (
                        <span className="text-muted-foreground px-2 py-0.5 rounded-full bg-muted/30">
                          No
                        </span>
                      )}
                    </td>
                    <td className={`px-6 py-3.5 text-right tabular-nums text-xs ${p.cited ? 'text-foreground font-normal' : 'text-muted-foreground/60'}`}>
                      {p.position}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
