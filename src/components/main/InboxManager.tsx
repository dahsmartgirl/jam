import React, { useState } from 'react';

interface InboxManagerProps {
  variant?: 'home' | 'outbound';
}

export default function InboxManager({ variant = 'home' }: InboxManagerProps) {
  const isOutbound = variant === 'outbound';

  // Folder list categories
  const folders = [
    { name: 'Inbox', count: isOutbound ? 21 : 18, active: false },
    { name: 'Needs reply', count: 4, active: true },
    { name: 'Sent', count: isOutbound ? 168 : 132, active: false },
    { name: 'Drafts', count: isOutbound ? 2 : 3, active: false },
    { name: 'Archive', count: isOutbound ? 94 : 86, active: false }
  ];

  // Connected email accounts list
  const accounts = [
    { email: 'dave@getorbit.co', colorClass: 'bg-primary' },
    { email: 'dave@gmail.com', colorClass: 'bg-blue-500' },
    { email: 'dave@outlook.com', colorClass: 'bg-emerald-500' }
  ];

  // Outbox threads previews
  const threads = isOutbound ? [
    { id: '1', sender: 'Sarah Chen', time: '4m', snippet: 'Yes, this is exactly what we need. Can we talk Thursday?', active: true, email: 'sarah.chen@northwind.io', subject: 'Re: Quick idea for Northwind', body: ['Yes, this is exactly what we need. We have been trying to get outbound off the ground for months without much luck.', 'I just grabbed a slot for Thursday at 10am. Looking forward to seeing how this works for our team.'] },
    { id: '2', sender: 'Marcus Whitfield', time: '1h', snippet: 'Looks great, send me a time and I will be there.', active: false, email: 'marcus@globex.io', subject: 'Re: Setup outbound', body: ['Looks great, send me a time and I will be there.'] },
    { id: '3', sender: 'Priya Raman', time: '3h', snippet: 'Perfect timing, the team has been asking for this.', active: false, email: 'priya@cadence.io', subject: 'Re: Outreach campaign', body: ['Perfect timing, the team has been asking for this.'] },
    { id: '4', sender: 'Jordan Pace', time: '6h', snippet: 'Count us in. How do we get started?', active: false, email: 'jordan@meridian.io', subject: 'Re: Autopilot growth', body: ['Count us in. How do we get started?'] }
  ] : [
    { id: '1', sender: 'Jordan Lee', time: '2m', snippet: 'Yes, I would love to try this out...', active: true, email: 'jordan@brightfox.io', subject: 'Re: Quick intro', body: ['Yes, I would love to try this out. I just booked a time for Thursday at 10am.', 'Looking forward to seeing how this works for our team. Talk soon!'] },
    { id: '2', sender: 'Sam Rivera', time: '1h', snippet: 'This looks great, can we set up a call?', active: false, email: 'sam@riveratech.co', subject: 'Re: Quick call', body: ['This looks great, can we set up a call?'] },
    { id: '3', sender: 'Dana Cole', time: '3h', snippet: 'Perfect timing, we\'ve been looking for this.', active: false, email: 'dana@coleventures.io', subject: 'Re: Integration', body: ['Perfect timing, we\'ve been looking for this.'] },
    { id: '4', sender: 'Alex Kim', time: '5h', snippet: 'Count us in. How do we get started?', active: false, email: 'alex@kimcorp.com', subject: 'Re: Setup', body: ['Count us in. How do we get started?'] }
  ];

  const [activeThreadId, setActiveThreadId] = useState('1');
  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  return (
    <>
      <section className="relative overflow-hidden p-6 md:min-h-[460px] md:p-8 lg:p-10 bg-transparent">
        
        {/* Title Block */}
        <div className="relative z-10 md:max-w-sm">
          <div className="mb-0">
            <span className="feature-badge">Inbox</span>
            <h3 className="text-foreground text-2xl font-light md:text-3xl">One inbox for every account</h3>
            <p className="text-muted-foreground/60 mt-1.5 text-base font-light">
              Connect every mailbox, triage replies, and send from one place.
            </p>
          </div>
        </div>

        {/* 3-Column Mock Client Wrapper */}
        <div className="relative mt-6 w-full md:absolute md:right-[-10%] md:bottom-0 md:left-[38%] md:mt-0 md:w-auto">
          <div className="flex h-[440px] w-[700px] overflow-hidden md:w-full md:min-w-[700px] border border-border rounded-xl bg-card shadow-sm select-none">
            
            {/* COLUMN 1: Folder sidebar (w-[176px]) */}
            <div className="border-border flex w-[176px] shrink-0 flex-col gap-4 border-r p-3 bg-card">
              <nav className="flex flex-col gap-0.5">
                {folders.map((folder, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] ${
                      folder.active 
                        ? 'bg-accent text-accent-foreground font-normal' 
                        : 'text-foreground hover:bg-accent/40 cursor-pointer'
                    }`}
                  >
                    <span className="truncate">{folder.name}</span>
                    <span className="text-muted-foreground shrink-0 text-[11px] tabular-nums">{folder.count}</span>
                  </div>
                ))}
              </nav>

              <div className="flex flex-col gap-1.5">
                <p className="text-muted-foreground px-2 text-[11px] font-normal">Accounts</p>
                {accounts.map((acct, idx) => (
                  <div key={idx} className="text-foreground flex items-center gap-2 px-2 py-1 text-[12px]">
                    <span className={`size-2 shrink-0 rounded-full ${acct.colorClass}`} aria-hidden="true"></span>
                    <span className="truncate">{acct.email}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 2: Message threads preview column (w-[260px]) */}
            <div className="border-border flex w-[260px] shrink-0 flex-col border-r bg-card">
              
              {/* Category tabs */}
              <div className="border-border flex flex-wrap gap-1.5 border-b p-3 bg-muted/5">
                <span className="rounded-full border px-2 py-0.5 text-[11px] border-border text-muted-foreground cursor-pointer">All</span>
                <span className="rounded-full border px-2 py-0.5 text-[11px] bg-foreground text-background border-transparent cursor-pointer font-normal">Interested</span>
                <span className="rounded-full border px-2 py-0.5 text-[11px] border-border text-muted-foreground cursor-pointer">Question</span>
                <span className="rounded-full border px-2 py-0.5 text-[11px] border-border text-muted-foreground cursor-pointer">Out of office</span>
              </div>

              {/* Threads list */}
              <div className="flex flex-col overflow-y-auto">
                {threads.map((thread) => (
                  <div 
                    key={thread.id} 
                    onClick={() => setActiveThreadId(thread.id)}
                    className={`border-border flex flex-col gap-1 border-b px-3 py-2.5 cursor-pointer transition-colors ${
                      thread.id === activeThreadId 
                        ? 'bg-accent/40' 
                        : 'hover:bg-accent/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="size-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true"></span>
                        <span className="text-foreground truncate text-[13px] font-normal">{thread.sender}</span>
                      </div>
                      <span className="text-muted-foreground shrink-0 text-[11px]">{thread.time}</span>
                    </div>
                    <p className="text-muted-foreground truncate text-[12px]">{thread.snippet}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 3: Active reader pane */}
            <div className="flex min-w-0 flex-1 flex-col bg-card">
              
              {/* Message Header */}
              <div className="flex-1 px-6 py-5 overflow-y-auto">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="min-w-0 text-left">
                    <p className="text-foreground text-sm font-normal">{activeThread.sender}</p>
                    <p className="text-muted-foreground text-[12px] font-mono">{activeThread.email}</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-normal shrink-0">
                    Interested
                  </span>
                </div>
                <h3 className="text-foreground mb-4 text-xl leading-tight font-normal text-left">{activeThread.subject}</h3>
                <div className="space-y-2 text-left text-muted-foreground text-sm leading-relaxed">
                  {activeThread.body.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Message Actions Footer */}
              <div className="border-border flex items-center justify-end gap-2 border-t px-6 py-3 bg-muted/5">
                <button 
                  data-slot="button" 
                  className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap text-sm font-normal transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5" 
                  type="button"
                >
                  Reply
                </button>
              </div>

            </div>

          </div>
        </div>

      </section>
    </>
  );
}
