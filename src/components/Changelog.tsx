import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Changelog() {
  const updates = [
    {
      date: 'May 19, 2026',
      title: 'Guided Onboarding',
      href: '/changelog#guided-onboarding'
    },
    {
      date: 'May 18, 2026',
      title: 'A Faster Chat',
      href: '/changelog#faster-chat'
    },
    {
      date: 'May 13, 2026',
      title: 'Send Straight From Gmail',
      href: '/changelog#gmail-direct'
    }
  ];

  return (
    <section className="relative p-6 md:p-8 lg:p-10">
        
        {/* Section Header */}
        <div className="mb-8 text-left">
          <h2 className="text-foreground text-2xl font-light sm:text-3xl">Shipping every week.</h2>
          <p className="text-muted-foreground/50 text-2xl font-light sm:text-3xl">See what&#x27;s new.</p>
        </div>

        {/* 3-Column Grid Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {updates.map((update, idx) => (
            <a 
              key={idx}
              className="border-border dark:bg-background group hover:bg-secondary rounded-lg border bg-[#FAF9F5] p-6 transition-all block text-left" 
              href={update.href}
            >
              <div>
                <p className="text-muted-foreground mb-3 text-sm">{update.date}</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-foreground text-lg font-light sm:text-xl">{update.title}</h3>
                  <span className="border-border bg-background text-foreground ml-4 inline-flex shrink-0 items-center gap-1 rounded-full border px-4 py-2 text-sm transition-all group-hover:gap-2">
                    See updates
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-6 text-left">
          <a className="text-muted-foreground hover:text-foreground text-sm transition-colors" href="/changelog">
            See all updates →
          </a>
        </div>

      </section>
  );
}
