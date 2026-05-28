import React, { useState } from 'react';

export default function InboxManager() {
  // Folder list categories
  const folders = [
    { name: 'Inbox', count: 18, active: false },
    { name: 'Needs reply', count: 4, active: true },
    { name: 'Sent', count: 132, active: false },
    { name: 'Drafts', count: 3, active: false },
    { name: 'Archive', count: 86, active: false }
  ];

  // Connected email accounts list
  const accounts = [
    { email: 'dave@getorbit.co', colorClass: 'bg-primary' },
    { email: 'dave@gmail.com', colorClass: 'bg-blue-500' },
    { email: 'dave@outlook.com', colorClass: 'bg-emerald-500' }
  ];

  // Outbox threads previews
  const threads = [
    { id: '1', sender: 'Jordan Lee', time: '2m', snippet: 'Yes, I would love to try this out...', active: true },
    { id: '2', sender: 'Sam Rivera', time: '1h', snippet: 'This looks great, can we set up a call?', active: false },
    { id: '3', sender: 'Dana Cole', time: '3h', snippet: 'Perfect timing, we\'ve been looking for this.', active: false },
    { id: '4', sender: 'Alex Kim', time: '5h', snippet: 'Count us in. How do we get started?', active: false }
  ];

  return (
    <>
      <div className="border-border border-t" />
      <section className="relative overflow-hidden p-6 md:min-h-[460px] md:p-8 lg:p-10">
        
        {/* Title Block */}
        <div className="relative z-10 md:max-w-sm">
          <div className="mb-0">
            <h2 className="text-foreground text-2xl font-light md:text-3xl">One inbox for every account</h2>
            <p className="text-muted-foreground/50 text-2xl font-light md:text-3xl">
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
                        ? 'bg-accent text-accent-foreground font-medium' 
                        : 'text-foreground hover:bg-accent/40 cursor-pointer'
                    }`}
                  >
                    <span className="truncate">{folder.name}</span>
                    <span className="text-muted-foreground shrink-0 text-[11px] tabular-nums">{folder.count}</span>
                  </div>
                ))}
              </nav>

              <div className="flex flex-col gap-1.5">
                <p className="text-muted-foreground px-2 text-[11px] font-medium">Accounts</p>
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
                <span className="rounded-full border px-2 py-0.5 text-[11px] bg-foreground text-background border-transparent cursor-pointer font-medium">Interested</span>
                <span className="rounded-full border px-2 py-0.5 text-[11px] border-border text-muted-foreground cursor-pointer">Question</span>
                <span className="rounded-full border px-2 py-0.5 text-[11px] border-border text-muted-foreground cursor-pointer">Out of office</span>
              </div>

              {/* Threads list */}
              <div className="flex flex-col overflow-y-auto">
                {threads.map((thread) => (
                  <div 
                    key={thread.id} 
                    className={`border-border flex flex-col gap-1 border-b px-3 py-2.5 cursor-pointer transition-colors ${
                      thread.active 
                        ? 'bg-accent/40' 
                        : 'hover:bg-accent/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="size-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true"></span>
                        <span className="text-foreground truncate text-[13px] font-medium">{thread.sender}</span>
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
                    <p className="text-foreground text-sm font-medium">Jordan Lee</p>
                    <p className="text-muted-foreground text-[12px] font-mono">jordan@brightfox.io</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium shrink-0">
                    Interested
                  </span>
                </div>
                <h3 className="text-foreground mb-4 text-xl leading-tight font-normal text-left">Re: Quick intro</h3>
                <div className="space-y-2 text-left text-muted-foreground text-sm leading-relaxed">
                  <p>Yes, I would love to try this out. I just booked a time for Thursday at 10am.</p>
                  <p>Looking forward to seeing how this works for our team. Talk soon!</p>
                </div>
              </div>

              {/* Message Actions Footer */}
              <div className="border-border flex items-center justify-end gap-2 border-t px-6 py-3 bg-muted/5">
                <button 
                  data-slot="button" 
                  className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap text-sm font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5" 
                  type="button"
                >
                  Reply
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Ambient fade-out overlay */}
        <div className="dark:from-background pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[10%] bg-gradient-to-r from-[#FAF9F5] to-transparent md:block" />

      </section>
    </>
  );
}
