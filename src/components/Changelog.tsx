import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Changelog() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const updates = [
    {
      date: 'May 19, 2026',
      title: 'Guided Onboarding',
      changes: [
        "New accounts now start with a short guided setup. Tell Jam about your product once and it researches your company in the background while you finish the rest of onboarding, so your first conversation already knows who you are and what you sell.",
        "Set up your workspace and invite your team right from the setup flow, or skip team invites entirely if you're working solo. Every step is optional, and a clear Skip control drops you straight into the product whenever you're ready."
      ]
    },
    {
      date: 'May 18, 2026',
      title: 'A Faster Chat',
      changes: [
        "Chat is noticeably quicker. Read-only questions, the kind where you're asking Jam to look something up rather than take an action, now take a dedicated fast path that skips the heavier agent machinery and answers right away.",
        "Drafts are steadier too. Your draft status now survives navigating away and back, duplicate drafts are no longer created when a request retries, and a background safety net automatically recovers any draft left stuck mid-send. A handful of inbox and dashboard glitches were cleaned up along the way."
      ]
    },
    {
      date: 'May 13, 2026',
      title: 'Send Straight From Gmail',
      changes: [
        "Connecting Gmail is now a single click through Google's own sign-in. No app passwords, no manual setup.",
        "Once connected, you can send from any of your send-as aliases and add cc and bcc to any message, in chat or in a campaign. Jam discovers your aliases automatically and lets you pick which one to send from.",
        "Sending volume ramps up gradually to protect your deliverability. If you'd rather not warm up, turning it off lifts your daily cap straight to your provider's maximum."
      ]
    }
  ];

  return (
    <section className="relative p-6 md:p-8 lg:p-10 border-t border-border/30 bg-transparent">
      {/* Section Header */}
      <div className="mb-10 text-left">
        <span className="feature-badge">Changelog</span>
        <h2 className="text-foreground text-2xl font-light sm:text-3xl mt-1">Shipping every week.</h2>
        <p className="text-muted-foreground/60 text-lg font-light mt-1">See what&#x27;s new inside the platform.</p>
      </div>

      {/* Accordion List */}
      <div className="max-w-4xl divide-y divide-border/25">
        {updates.map((update, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className="py-6 first:pt-0 last:pb-0"
            >
              {/* Responsive Grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-8 text-left">
                {/* Left column: Date */}
                <div className="flex items-center md:items-start md:pt-1.5">
                  <span className="text-sm text-muted-foreground/60 font-normal">
                    {update.date}
                  </span>
                </div>

                {/* Right column: Clickable Title + Animated Content Accordion */}
                <div className="flex flex-col">
                  {/* Clickable Header */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex items-center justify-between w-full text-left group cursor-pointer py-1"
                  >
                    <h3 className="text-foreground text-lg font-normal group-hover:text-primary transition-colors duration-150">
                      {update.title}
                    </h3>
                    <ChevronDown 
                      className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-foreground' : 'group-hover:text-foreground'
                      }`}
                    />
                  </button>

                  {/* Animated changes content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pb-2 text-sm text-foreground/80 leading-relaxed font-normal space-y-3">
                          {update.changes.map((paragraph, pIdx) => (
                            <p key={pIdx}>
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Link */}
      <div className="mt-8 text-left max-w-4xl border-t border-border/20 pt-6">
        <a 
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium" 
          href="/changelog"
        >
          See all updates
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
