import React from 'react';

interface CompetitorData {
  rank: number;
  brand: string;
  mentions: number;
  delta: number;
}

export default function AeoCompetitors() {
  const competitors: CompetitorData[] = [
    { rank: 1, brand: 'HubSpot', mentions: 142, delta: 6 },
    { rank: 2, brand: 'Mailchimp', mentions: 98, delta: -4 },
    { rank: 3, brand: 'Apollo.io', mentions: 76, delta: 11 },
    { rank: 4, brand: 'Lemlist', mentions: 54, delta: 2 },
    { rank: 5, brand: 'Instantly', mentions: 41, delta: -2 },
    { rank: 6, brand: 'Smartlead', mentions: 33, delta: 5 },
    { rank: 7, brand: 'Reply.io', mentions: 27, delta: 0 },
    { rank: 8, brand: 'Woodpecker', mentions: 21, delta: -3 },
    { rank: 9, brand: 'Lumen', mentions: 13, delta: 9 }, // highlighted brand
    { rank: 10, brand: 'Mailshake', mentions: 11, delta: 1 },
  ];

  return (
    <div className="border-border relative overflow-hidden border-b p-6 lg:min-h-[520px] lg:border-r lg:border-b-0 md:p-8 lg:p-10">
      
      {/* Title block */}
      <div className="relative z-10 max-w-none lg:max-w-[44%]">
        <span className="feature-badge">Audit</span>
        <h3 className="text-foreground text-2xl font-light lg:text-3xl">Beat your competitors</h3>
        <p className="text-muted-foreground/50 mt-1.5 text-base font-light leading-relaxed">
          See who AI cites instead of you.
        </p>
      </div>

      {/* Floating Card containing Competitors List */}
      <div className="relative mt-6 w-full lg:absolute lg:top-10 lg:right-[-12%] lg:bottom-4 lg:left-[46%] lg:mt-0 lg:w-auto">
        <div className="bg-card border-border/50 max-h-[420px] w-full lg:w-[350px] xl:w-[420px] overflow-y-auto rounded-2xl border lg:max-h-none lg:rounded-l-2xl lg:rounded-r-none lg:border-r-0 backdrop-blur-xs">
          
          <div className="px-5 py-5 select-none">
            <h2 className="text-[15px] font-normal tracking-tight text-foreground">Competitors</h2>
            <p className="text-muted-foreground text-xs">Brands cited alongside you in AI answers, ranked</p>
          </div>

          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-muted-foreground border-border/40 border-y text-xs select-none">
                <th className="px-5 py-2 font-normal">#</th>
                <th className="px-2 py-2 font-normal">Brand</th>
                <th className="px-2 py-2 text-right font-normal">Mentions</th>
                <th className="px-5 py-2 text-right font-normal">Δ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {competitors.map((c) => {
                const isLumen = c.brand === 'Lumen';
                const deltaClass = c.delta > 0 
                  ? 'text-green-700 dark:text-green-400 font-normal' 
                  : c.delta < 0 
                    ? 'text-destructive font-normal' 
                    : 'text-muted-foreground';
                const deltaPrefix = c.delta > 0 ? '+' : '';

                return (
                  <tr 
                    key={c.brand} 
                    className={`transition-colors hover:bg-muted/30 ${isLumen ? 'bg-primary/5' : ''}`}
                  >
                    <td className="text-muted-foreground px-5 py-3 tabular-nums text-xs">
                      {c.rank}
                    </td>
                    <td className="py-3 pr-3 pl-2">
                      <span className={`whitespace-nowrap ${isLumen ? 'font-normal text-foreground' : 'text-foreground/80 font-normal'}`}>
                        {c.brand}
                        {isLumen && <span className="text-[10px] text-primary ml-1.5 font-normal px-1 rounded bg-primary/10">You</span>}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-right tabular-nums text-foreground/90 text-xs">
                      {c.mentions}
                    </td>
                    <td className={`px-5 py-3 text-right tabular-nums text-xs ${deltaClass}`}>
                      {deltaPrefix}{c.delta}
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
