import React from 'react';

export default function LeadEnrichmentWarmUp() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
      {/* Column 1: Lead enrichment */}
      <div className="relative overflow-hidden p-6 md:p-8 lg:p-10 border-border border-b md:border-r md:border-b-0 h-auto md:h-[500px] md:min-h-[500px] flex flex-col justify-start">
        <div className="relative z-10 mb-2 max-w-none md:max-w-md">
          <span className="feature-badge">Enrichment</span>
          <h3 className="text-foreground text-2xl font-light md:text-3xl">
            Lead enrichment
          </h3>
          <p className="text-muted-foreground/60 mt-1.5 text-base font-light">
            Turn a name into a full profile, automatically.
          </p>
        </div>

        {/* Overlapping Cards Container */}
        <div className="relative mt-8 flex flex-col gap-2 w-full">
          {/* Marcus Whitfield Card */}
          <div className="border-border bg-card flex items-center gap-3 rounded-lg border px-4 py-3 opacity-40">
            <div className="bg-muted size-8 shrink-0 rounded-full flex items-center justify-center text-xs font-semibold text-muted-foreground">MW</div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate text-sm font-medium">
                Marcus Whitfield
              </p>
              <p className="text-muted-foreground truncate text-xs">
                Head of Growth · Globex
              </p>
            </div>
            <span className="text-muted-foreground shrink-0 text-xs">
              Enriched
            </span>
          </div>

          {/* Priya Nair Card */}
          <div className="border-border bg-card flex items-center gap-3 rounded-lg border px-4 py-3 opacity-70">
            <div className="bg-muted size-8 shrink-0 rounded-full flex items-center justify-center text-xs font-semibold text-muted-foreground">PN</div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate text-sm font-medium">
                Priya Nair
              </p>
              <p className="text-muted-foreground truncate text-xs">
                VP Sales · Initech
              </p>
            </div>
            <span className="text-muted-foreground shrink-0 text-xs">
              Enriching
            </span>
          </div>

          {/* Jane Cooper Card (Fully enriched detailed profile) */}
          <div className="border-border bg-card rounded-t-xl border border-b-0 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                JC
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-foreground text-base font-medium">
                  Jane Cooper
                </p>
                <p className="text-muted-foreground mt-0.5 text-sm">
                  VP Growth · Northwind
                </p>
              </div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 shrink-0">
                Enriched
              </div>
            </div>
            <div className="border-border/60 mt-4 grid gap-2 border-t pt-4 text-sm">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-muted-foreground text-xs">
                  Email
                </span>
                <span className="text-foreground truncate">
                  jane@northwind.io
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-muted-foreground text-xs">
                  Location
                </span>
                <span className="text-foreground truncate">
                  San Francisco, CA
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-muted-foreground text-xs">
                  Company
                </span>
                <span className="text-foreground truncate">
                  Northwind · 210 employees
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-muted-foreground text-xs">
                  Seniority
                </span>
                <span className="text-foreground truncate">
                  Director and above
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Column 2: Auto warm-up */}
      <div className="relative overflow-hidden p-6 md:p-8 lg:p-10 h-auto md:h-[500px] md:min-h-[500px] flex flex-col justify-between">
        <div className="relative z-10 mb-2 max-w-none md:max-w-md">
          <span className="feature-badge">Warm-up</span>
          <h3 className="text-foreground text-2xl font-light md:text-3xl">
            Auto warm-up
          </h3>
          <p className="text-muted-foreground/60 mt-1.5 text-base font-light">
            Mailboxes that ramp themselves to stay out of spam.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {/* Stat Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Reply Rate Card */}
            <div className="bg-card text-card-foreground border-border/50 flex flex-col rounded-xl border p-4">
              <div className="text-foreground text-[13px] font-medium">
                Reply rate
              </div>
              <div className="text-muted-foreground mt-0.5 text-xs">
                Last 30 days
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-semibold tabular-nums text-3xl leading-none tracking-tight">
                  24%
                </span>
                <span className="flex items-baseline gap-0.5 text-xs font-medium whitespace-nowrap tabular-nums text-green-600 dark:text-green-400">
                  <span>↑</span>
                  3 pp
                </span>
              </div>
              <div className="mt-3 h-6 w-full">
                <svg viewBox="0 0 100 20" className="w-full h-full text-foreground/30 fill-none" preserveAspectRatio="none">
                  <path d="M0,15 Q25,12 50,18 T100,5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Delivery Rate Card */}
            <div className="bg-card text-card-foreground border-border/50 flex flex-col rounded-xl border p-4">
              <div className="text-foreground text-[13px] font-medium">
                Delivery rate
              </div>
              <div className="text-muted-foreground mt-0.5 text-xs">
                Delivered / sent
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-semibold tabular-nums text-3xl leading-none tracking-tight">
                  98%
                </span>
                <span className="flex items-baseline gap-0.5 text-xs font-medium whitespace-nowrap tabular-nums text-green-600 dark:text-green-400">
                  <span>↑</span>
                  1 pp
                </span>
              </div>
              <div className="mt-3 h-6 w-full">
                <svg viewBox="0 0 100 20" className="w-full h-full text-foreground/30 fill-none" preserveAspectRatio="none">
                  <path d="M0,18 Q30,17 60,10 T100,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Bounce Rate Card */}
            <div className="bg-card text-card-foreground border-border/50 flex flex-col rounded-xl border p-4">
              <div className="text-foreground text-[13px] font-medium">
                Bounce rate
              </div>
              <div className="text-muted-foreground mt-0.5 text-xs">
                Hard bounces / sent
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-semibold tabular-nums text-3xl leading-none tracking-tight">
                  0.4%
                </span>
              </div>
              <div className="mt-3 h-6 w-full">
                <svg viewBox="0 0 100 20" className="w-full h-full text-foreground/30 fill-none" preserveAspectRatio="none">
                  <path d="M0,5 Q40,4 70,8 T100,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Sent Card */}
            <div className="bg-card text-card-foreground border-border/50 flex flex-col rounded-xl border p-4">
              <div className="text-foreground text-[13px] font-medium">
                Sent
              </div>
              <div className="text-muted-foreground mt-0.5 text-xs">
                Last 30 days
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-semibold tabular-nums text-3xl leading-none tracking-tight">
                  3,204
                </span>
              </div>
              <div className="mt-3 h-6 w-full">
                <svg viewBox="0 0 100 20" className="w-full h-full text-foreground/30 fill-none" preserveAspectRatio="none">
                  <path d="M0,15 L20,13 L40,17 L60,12 L80,14 L100,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Deliverability Table */}
          <div className="bg-card border-border/50 rounded-xl border mt-2">
            <div className="px-4 py-3">
              <p className="text-foreground text-[13px] font-medium">
                Account deliverability
              </p>
            </div>
            <div className="divide-border/30 border-border/40 divide-y border-t">
              {/* you@getorbit.co */}
              <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-4 py-2.5">
                <span className="text-foreground truncate text-xs">
                  you@getorbit.co
                </span>
                <div className="inline-flex items-center gap-2">
                  <div className="bg-muted relative h-1.5 w-16 overflow-hidden rounded-full">
                    <div className="bg-foreground absolute h-full" style={{ width: '45%' }} aria-hidden="true" />
                  </div>
                  <span className="text-muted-foreground text-[11px] tabular-nums">
                    18/40
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'oklch(0.69 0.15 162)' }} aria-hidden="true" />
                  <span className="text-foreground text-xs">
                    Healthy
                  </span>
                </div>
              </div>

              {/* you@team.io */}
              <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-4 py-2.5">
                <span className="text-foreground truncate text-xs">
                  you@team.io
                </span>
                <div className="inline-flex items-center gap-2">
                  <div className="bg-muted relative h-1.5 w-16 overflow-hidden rounded-full">
                    <div className="bg-foreground absolute h-full" style={{ width: '22.5%' }} aria-hidden="true" />
                  </div>
                  <span className="text-muted-foreground text-[11px] tabular-nums">
                    9/40
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'oklch(0.78 0.13 197)' }} aria-hidden="true" />
                  <span className="text-foreground text-xs">
                    Ramping
                  </span>
                </div>
              </div>

              {/* you@send.co */}
              <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-4 py-2.5">
                <span className="text-foreground truncate text-xs">
                  you@send.co
                </span>
                <div className="inline-flex items-center gap-2">
                  <div className="bg-muted relative h-1.5 w-16 overflow-hidden rounded-full">
                    <div className="bg-foreground absolute h-full" style={{ width: '55%' }} aria-hidden="true" />
                  </div>
                  <span className="text-muted-foreground text-[11px] tabular-nums">
                    22/40
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'oklch(0.69 0.15 162)' }} aria-hidden="true" />
                  <span className="text-foreground text-xs">
                    Healthy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
