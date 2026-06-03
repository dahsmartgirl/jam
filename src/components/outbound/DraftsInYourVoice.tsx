import React, { useState, useEffect } from 'react';

interface DraftItem {
  name: string;
  email: string;
  company: string;
  subject: string;
  greeting: string;
  context: string;
  token: string;
  pitch: string;
}

export default function DraftsInYourVoice() {
  const drafts: DraftItem[] = [
    { 
      name: 'Sarah Chen', 
      email: 'sarah.chen@northwind.io',
      company: 'Northwind Labs', 
      subject: 'Quick idea for Northwind Labs',
      greeting: 'Hi Sarah,',
      context: 'read your post about scaling engineering at ',
      token: 'Northwind Labs',
      pitch: '. Given your focus on AI pipelines, thought you\'d find our marketing agents useful. They automate outbound campaigns matching your exact tone.'
    },
    { 
      name: 'Marcus Whitfield', 
      email: 'marcus@brightpath.io',
      company: 'Brightpath', 
      subject: 'Growth setup for Brightpath',
      greeting: 'Hi Marcus,',
      context: 'loved your recent article on demand gen. I put together a mockup for ',
      token: 'Brightpath',
      pitch: ' to scale outreach without losing the personal touch. Let me know if you have 5 minutes this week.'
    },
    { 
      name: 'Priya Raman', 
      email: 'priya@cadence.co',
      company: 'Cadence', 
      subject: 'Automating Cadence personalization',
      greeting: 'Hi Priya,',
      context: 'noticed ',
      token: 'Cadence',
      pitch: ' is expanding its product line. We help high-growth SaaS teams automate outbound personalization. It writes and adapts to each prospect\'s background.'
    },
    { 
      name: 'Jordan Pace', 
      email: 'jordan@meridian.io',
      company: 'Meridian', 
      subject: 'Quick request',
      greeting: 'Hi Jordan,',
      context: 'congrats on the recent launch at ',
      token: 'Meridian',
      pitch: '. We built a tool that helps teams setup automated, personalized outbound that books meetings on autopilot in your team\'s voice.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [transState, setTransState] = useState<'idle' | 'exit' | 'enter'>('idle');

  useEffect(() => {
    const timer = setInterval(() => {
      setTransState('exit');
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % drafts.length);
        setTransState('enter');
        setTimeout(() => {
          setTransState('idle');
        }, 50);
      }, 350); // exit duration
    }, 4500);
    return () => clearInterval(timer);
  }, [drafts.length]);

  const activeDraft = drafts[activeIndex];

  // Animation classes mapping
  let animationClass = 'transition-all duration-350 ease-out translate-y-0 opacity-100';
  if (transState === 'exit') {
    animationClass = 'transition-all duration-350 ease-in translate-y-[-16px] opacity-0';
  } else if (transState === 'enter') {
    animationClass = 'transition-none translate-y-[16px] opacity-0';
  }

  return (
    <div className="relative overflow-hidden p-6 md:p-8 lg:p-10 h-auto md:h-[500px] md:min-h-[500px] flex flex-col justify-start select-none bg-transparent">
      
      {/* Title block matching other sections with tag badge */}
      <div className="relative z-10 mb-5 max-w-none md:max-w-md">
        <span className="feature-badge">Drafts</span>
        <h3 className="text-foreground text-2xl font-light md:text-3xl">
          Drafts in your voice
        </h3>
        <p className="text-muted-foreground/60 mt-1.5 text-base font-light">
          Personalized for every contact.
        </p>
      </div>

      {/* Mock Email Composer Artifact */}
      <div className="border-border bg-card rounded-xl border-[0.5px] p-4 flex flex-col flex-1 gap-3 relative overflow-hidden font-sans">
        
        {/* Composer Header Bar */}
        <div className="flex items-center justify-between border-b border-border/20 pb-2.5 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/50" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <span className="w-2 h-2 rounded-full bg-green-500/50" />
            <span className="text-[10px] text-muted-foreground/50 font-mono ml-2">draft_writer.ai</span>
          </div>
          <span className="text-[10px] text-muted-foreground/50 font-mono">10:24 AM</span>
        </div>

        {/* Dynamic content wrapper with slide-up transition */}
        <div className={`flex-1 flex flex-col gap-3 ${animationClass}`}>
          
          {/* Metadata Fields */}
          <div className="flex flex-col gap-1.5 text-[11px] border-b border-border/10 pb-2 shrink-0">
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="text-muted-foreground/50 w-12 shrink-0">To:</span>
              <span className="text-foreground font-normal truncate">{activeDraft.name}</span>
              <span className="text-muted-foreground/60 font-mono truncate">&lt;{activeDraft.email}&gt;</span>
            </div>
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="text-muted-foreground/50 w-12 shrink-0">Subject:</span>
              <span className="text-foreground font-normal truncate">{activeDraft.subject}</span>
            </div>
          </div>

          {/* Email Body Editor */}
          <div className="flex-1 text-[12px] text-foreground/80 leading-relaxed font-light py-1 overflow-y-auto">
            <p className="mb-2">{activeDraft.greeting}</p>
            <p>
              {activeDraft.context}
              <span className="inline-block px-1.5 py-0.5 rounded bg-primary/5 text-primary border-[0.5px] border-primary/20 text-[11px] font-normal mx-0.5">
                {activeDraft.token}
              </span>
              {activeDraft.pitch}
              <span className="inline-block w-1 h-3.5 bg-primary/70 ml-0.5 align-middle animate-[blink_1s_step-end_infinite]" />
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
