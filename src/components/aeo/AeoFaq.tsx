import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

export default function AeoFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'How do you measure AI visibility?',
      answer: 'Jam runs the real questions your buyers ask against the major AI answer engines, then reads each answer to see whether your brand and your site are mentioned and in what position. That gives you a clear visibility score per engine instead of a guess.',
    },
    {
      question: 'How often do you re-check?',
      answer: 'We re-run your tracked prompts on a schedule, so you can watch your visibility move over time and catch the moment a competitor starts winning answers you used to own. You set the cadence that fits your release pace.',
    },
    {
      question: 'Do you support ChatGPT, Perplexity, Gemini and Claude?',
      answer: 'Yes. We monitor the major AI answer engines, including ChatGPT, Perplexity, Gemini and Claude, and show you a per-engine breakdown of how often you are cited versus your competitors.',
    },
    {
      question: 'What is a citation gap?',
      answer: 'A citation gap is a buying question where the engines answer with a competitor instead of you. Jam surfaces every gap so you know exactly which questions to win next, ranked by how much they matter to your buyers.',
    },
    {
      question: 'How do you get me cited?',
      answer: 'For every gap, Jam drafts content that answers the exact question the engines are pulling from, backed by the specifics they like to quote. You review the draft, and Jam can open a content pull request so it ships fast.',
    },
    {
      question: 'How is this different from SEO?',
      answer: 'SEO optimizes for the blue links on a results page. AEO optimizes for the answer itself, the recommendation an AI gives before a user ever clicks. Jam tracks and improves whether you are named in that answer, not just where you rank.',
    },
    {
      question: 'How fast are results?',
      answer: 'You see your current visibility and gaps on day one. New citations follow once your published content gets picked up by the engines, which is typically a matter of weeks rather than the months a traditional SEO play takes.',
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
                    className="flex items-center justify-between w-full text-left group cursor-pointer py-1"
                  >
                    <h3 className="text-foreground text-lg font-normal group-hover:text-primary transition-colors duration-150 pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown 
                      className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
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
