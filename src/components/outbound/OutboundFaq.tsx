import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

export default function OutboundFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Will my emails land in spam?',
      answer: 'Jam warms up every connected mailbox automatically, ramping send volume over time and watching bounce and complaint rates so your inboxes build a healthy sending reputation. Each draft is checked for spam-trigger words and deliverability issues before it goes out, so your emails land in the primary inbox instead of the spam folder.',
    },
    {
      question: 'Do I send from my own inbox?',
      answer: 'Yes. Jam connects directly to your Gmail, Outlook, or AgentMail accounts and sends from your real address, so replies come back to your inbox and your messages keep your sending history. You can connect several mailboxes and Jam will spread sends across them to stay within healthy daily limits.',
    },
    {
      question: 'How does warm-up work?',
      answer: 'When you connect a mailbox, Jam starts it on a conservative daily send limit and gradually increases it as the account proves it can deliver reliably. It tracks per-account bounce and complaint rates over a rolling window and pauses or slows any inbox that starts to look risky, keeping your whole pool healthy.',
    },
    {
      question: 'Can I personalize at scale?',
      answer: 'Every email is written for the individual recipient using their role, company, and enriched profile, not dropped into a mail-merge template. You can set the voice once and Jam drafts each message in that style, so a few hundred emails still read like you wrote each one by hand.',
    },
    {
      question: 'How are replies handled?',
      answer: 'Replies land back in your connected mailbox and show up in one unified inbox across every account. Jam reads each reply, sorts it by intent (interested, question, out of office, not interested), and surfaces the ones that need a response first, so you spend your time on the conversations that actually move toward a meeting.',
    },
    {
      question: 'What are the daily send limits?',
      answer: 'New mailboxes start on a conservative daily cap and ramp up as they prove they can deliver cleanly. If you connect several inboxes, Jam spreads sends across the pool and respects the current limit on each account, so you never blast a single mailbox past what its reputation can handle.',
    },
    {
      question: 'Does Jam handle opt-outs and compliance?',
      answer: 'Yes. Every contact who asks to stop is suppressed automatically and excluded from future sends, and unsubscribe handling is built into the flow. Jam keeps a record of who opted out so the same person is never emailed again across any of your campaigns.',
    },
    {
      question: 'Should I use a separate sending domain?',
      answer: 'For serious volume we recommend sending from a dedicated domain (or subdomain) so the reputation of your primary domain stays protected. Jam works with whatever you connect, and it watches deliverability per domain and per mailbox so a problem on one never drags down the rest.',
    },
    {
      question: 'How long does warm-up take before I can send?',
      answer: 'A fresh mailbox is usually ready for meaningful volume within a couple of weeks, though Jam lets you start sending at a low cap from day one and increases it as the account earns trust. The pace adapts to how the inbox performs rather than a fixed schedule, which keeps you out of spam while you ramp.',
    },
  ];

  return (
    <section className="relative p-6 md:p-8 lg:p-10 bg-transparent overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-16">
        
        {/* Left column: Header */}
        <div className="relative z-10 max-w-none lg:max-w-[85%]">
          <span className="feature-badge">FAQ</span>
          <h3 className="text-foreground text-2xl font-light lg:text-3xl mt-1">Questions</h3>
          <p className="text-muted-foreground/50 mt-1.5 text-base font-light leading-relaxed">
            Answers to what we get asked most.
          </p>
        </div>

        {/* Right column: Accordions list */}
        <div className="flex flex-col">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="py-6 border-b border-border/30 last:border-b-0"
              >
                <div className="flex flex-col">
                  {/* Clickable Header */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex items-start justify-between w-full text-left group cursor-pointer py-1"
                  >
                    <h3 className="text-foreground text-lg font-normal group-hover:text-primary transition-colors duration-150 pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown 
                      className={`w-4 h-4 text-muted-foreground transition-transform duration-200 mt-1 shrink-0 ${
                        isOpen ? 'rotate-180 text-foreground' : 'group-hover:text-foreground'
                      }`}
                    />
                  </button>

                  {/* Animated Answer panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pb-2 text-sm text-foreground/80 leading-relaxed font-normal pr-6">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
