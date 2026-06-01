import React from 'react';

interface MatrixRow {
  title: string;
  path: string;
  chatgpt: string | null;
  perplexity: string | null;
  gemini: string | null;
  claude: string | null;
}

export default function AeoCitationMatrix() {
  const rows: MatrixRow[] = [
    { title: 'Best cold email tools for startups', path: '/guides/cold-email-tools', chatgpt: '#2', perplexity: '#3', gemini: null, claude: '#1' },
    { title: 'Cold email deliverability checklist', path: '/guides/deliverability', chatgpt: '#4', perplexity: '#1', gemini: '#5', claude: null },
    { title: 'AI tools for B2B lead generation', path: '/blog/ai-lead-gen', chatgpt: '#1', perplexity: '#2', gemini: '#3', claude: '#2' },
    { title: 'How to automate outbound sales', path: '/blog/outbound-automation', chatgpt: null, perplexity: '#4', gemini: null, claude: '#3' },
    { title: 'Email outreach pricing compared', path: '/compare/pricing', chatgpt: '#3', perplexity: null, gemini: '#2', claude: null },
    { title: 'Personalization at scale, a playbook', path: '/playbook/personalization', chatgpt: '#5', perplexity: '#6', gemini: null, claude: '#4' },
    { title: 'Reply rate benchmarks for SaaS', path: '/research/reply-benchmarks', chatgpt: '#2', perplexity: '#3', gemini: '#4', claude: null },
    { title: 'Warming up a new sending domain', path: '/guides/domain-warmup', chatgpt: null, perplexity: '#5', gemini: null, claude: '#6' },
  ];

  const renderCell = (val: string | null) => {
    if (val) {
      return (
        <td className="px-4 py-3.5 text-center text-xs text-foreground font-normal align-middle">
          <span className="inline-flex items-center gap-1.5 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400" aria-hidden="true" />
            <span className="tabular-nums font-normal">{val}</span>
          </span>
        </td>
      );
    }
    return (
      <td className="px-4 py-3.5 text-center text-xs bg-muted/20 align-middle">
        <span className="text-muted-foreground/30 select-none font-normal">-</span>
      </td>
    );
  };

  return (
    <section className="relative overflow-hidden p-6 md:min-h-[460px] md:p-8 lg:p-10 flex flex-col justify-between border-b border-border">
      
      {/* Title Block */}
      <div className="relative z-10 md:max-w-xs">
        <span className="feature-badge">Analytics</span>
        <h2 className="text-foreground text-2xl font-light md:text-3xl">See exactly where you're cited</h2>
        <p className="text-muted-foreground/50 mt-1.5 text-base font-light leading-relaxed">
          Every page, every engine.
        </p>
      </div>

      {/* Overflow Table Container */}
      <div className="relative mt-6 w-full md:absolute md:right-[-10%] md:bottom-0 md:left-[38%] md:mt-0 md:w-auto">
        <div className="bg-card border-border/50 w-full md:w-[600px] lg:w-[650px] xl:w-[750px] overflow-x-auto rounded-l-2xl border border-r-0 md:overflow-visible">
          
          <div className="px-6 py-5 select-none">
            <h2 className="text-[15px] font-normal tracking-tight text-foreground">Citation matrix</h2>
            <p className="text-muted-foreground text-xs">Each page, and the engines that cite it · number is your position in the answer</p>
          </div>

          <table className="w-full min-w-[550px] text-sm text-left table-fixed">
            <thead>
              <tr className="text-muted-foreground border-border/40 border-y text-xs select-none">
                <th className="px-6 py-2.5 font-normal w-[40%]">Page</th>
                <th className="px-4 py-2.5 text-center font-normal w-[15%]">ChatGPT</th>
                <th className="px-4 py-2.5 text-center font-normal w-[15%]">Perplexity</th>
                <th className="px-4 py-2.5 text-center font-normal w-[15%]">Gemini</th>
                <th className="px-4 py-2.5 text-center font-normal w-[15%]">Claude</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {rows.map((r, idx) => (
                <tr key={idx} className="transition-colors hover:bg-muted/10">
                  <td className="px-6 py-3.5 pr-2 truncate">
                    <div className="text-foreground font-normal text-xs sm:text-sm truncate">
                      {r.title}
                    </div>
                    <div className="text-muted-foreground text-[10px] font-mono mt-0.5 truncate">
                      {r.path}
                    </div>
                  </td>
                  {renderCell(r.chatgpt)}
                  {renderCell(r.perplexity)}
                  {renderCell(r.gemini)}
                  {renderCell(r.claude)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
}
