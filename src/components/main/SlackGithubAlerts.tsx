import React from 'react';

export default function SlackGithubAlerts() {
  return (
    <div className="grid min-h-[500px] grid-cols-1 gap-0 md:grid-cols-[1fr_2fr]">
      
      {/* Left side text column */}
      <div className="border-border flex flex-col justify-start border-b p-6 md:border-r md:border-b-0 md:pr-8">
        <span className="feature-badge">Alerts</span>
        <h3 className="text-foreground text-2xl font-light md:text-3xl">Chat with Jam anywhere</h3>
        <p className="text-muted-foreground/60 mt-1.5 text-base font-light">
          Approve drafts, review PRs, and run campaigns right from Slack and GitHub.
        </p>
      </div>

        {/* Right side notification panels wrapper */}
        <div className="relative overflow-hidden" style={{ height: 'min(780px, 70vh)', minHeight: '500px' }}>
          
          {/* Ambient background grid textures */}
          <div className="absolute inset-0 saturate-[0.35] dark:hidden" style={{ backgroundImage: 'url(/landing/transparancy-bg-light.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
          <div className="absolute inset-0 hidden saturate-[0.2] dark:block" style={{ backgroundImage: 'url(/landing/transparancy-bg-dark.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />

          {/* DESKTOP PANELS VIEW (hidden md:block) */}
          <div className="relative hidden h-full md:block">
            <div className="relative w-full h-full min-h-[500px]">
              
              {/* Slack Window */}
              <div 
                className="absolute overflow-hidden select-none flex flex-col bg-background rounded-[10px] border border-border text-left" 
                style={{
                  left: 'max(56px, calc(35% - 290px))',
                  top: '40%',
                  width: '580px',
                  height: '420px',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  boxShadow: '0 28px 70px rgba(0, 0, 0, 0.14), 0 14px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="relative flex h-7 items-center justify-between border-b border-border px-2 bg-muted/50">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#27CA40]" />
                  </div>
                  <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 truncate text-center text-sm text-muted-foreground font-medium">Slack</div>
                  <div className="w-[52px]" />
                </div>
                <div className="flex-1 overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between border-b border-border px-4 py-2 bg-card">
                    <div className="flex items-center gap-2">
                      <h1 className="font-semibold text-sm text-foreground">#notifications</h1>
                      <span className="text-xs text-muted-foreground">3 members</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-4 text-sm overflow-y-auto">
                    
                    {/* Msg 1 */}
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded bg-neutral-800 flex items-center justify-center flex-shrink-0">
                        <img src="/jam-logo.svg" alt="Jam" className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-semibold text-sm text-foreground">Jam</span>
                          <span className="text-xs text-muted-foreground bg-muted px-1 rounded font-medium">APP</span>
                          <span className="text-xs text-muted-foreground">10:32 AM</span>
                        </div>
                        <div className="mt-1 text-foreground">
                          <p>Drafted 12 personalized emails for your startup founder campaign.</p>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <button className="text-xs font-medium rounded px-2.5 py-1.5 bg-primary text-primary-foreground cursor-pointer">Review Drafts</button>
                          <button className="text-xs font-medium rounded px-2.5 py-1.5 border border-border bg-background hover:bg-muted text-foreground cursor-pointer">View Campaign</button>
                        </div>
                      </div>
                    </div>

                    {/* Msg 2 */}
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded bg-neutral-800 flex items-center justify-center flex-shrink-0">
                        <img src="/jam-logo.svg" alt="Jam" className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-semibold text-sm text-foreground">Jam</span>
                          <span className="text-xs text-muted-foreground bg-muted px-1 rounded font-medium">APP</span>
                          <span className="text-xs text-muted-foreground">10:45 AM</span>
                        </div>
                        <div className="mt-1 text-foreground">
                          <p>Found 8 high-value keywords to optimize for. Created PR with blog updates.</p>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <button className="text-xs font-medium rounded px-2.5 py-1.5 bg-primary text-primary-foreground cursor-pointer">Review PR</button>
                        </div>
                      </div>
                    </div>

                    {/* Msg 3 */}
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded bg-neutral-800 flex items-center justify-center flex-shrink-0">
                        <img src="/jam-logo.svg" alt="Jam" className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-semibold text-sm text-foreground">Jam</span>
                          <span className="text-xs text-muted-foreground bg-muted px-1 rounded font-medium">APP</span>
                          <span className="text-xs text-muted-foreground">11:02 AM</span>
                        </div>
                        <div className="mt-1 text-foreground">
                          <p>Sarah Chen (Founder @ TechFlow) replied to your email!</p>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <button className="text-xs font-medium rounded px-2.5 py-1.5 bg-primary text-primary-foreground cursor-pointer">View Reply</button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* GitHub Pull Request Window */}
              <div 
                className="absolute overflow-hidden select-none flex flex-col bg-background rounded-[10px] border border-border text-left" 
                style={{
                  left: 'max(56px, calc(65% - 280px))',
                  top: '60%',
                  width: '560px',
                  height: '420px',
                  transform: 'translateY(-50%)',
                  zIndex: 15,
                  boxShadow: '0 28px 70px rgba(0, 0, 0, 0.14), 0 14px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="relative flex h-7 items-center justify-between border-b border-border px-2 bg-muted/50">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#27CA40]" />
                  </div>
                  <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 truncate text-center text-sm text-muted-foreground font-medium font-mono">GitHub Pull Request</div>
                  <div className="w-[52px]" />
                </div>
                <div className="flex-1 overflow-hidden px-5 py-3 text-sm flex flex-col">
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full">
                      <svg className="text-muted-foreground h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <span className="font-semibold text-foreground">Jam</span>
                      <span className="text-xs border border-border rounded-full px-2 py-0.5 font-medium">bot</span>
                      <span>reviewed</span>
                      <span>1m ago</span>
                    </div>
                  </div>

                  <div className="relative mt-3 flex-1 flex flex-col overflow-hidden">
                    <div className="absolute top-0 bottom-0 left-4 w-px bg-border/60" style={{ background: 'linear-gradient(to bottom, var(--border), transparent)' }} />
                    <div className="ml-12 flex-1 flex flex-col overflow-hidden">
                      <div className="text-xs border border-border bg-muted/50 text-muted-foreground rounded-t-md px-3 py-2 font-mono">content/blogs/cold-outreach-guide.mdx</div>
                      <div className="border border-t-0 border-border overflow-hidden rounded-b-md flex-shrink-0">
                        <div className="text-xs font-mono">
                          <div className="flex">
                            <div className="w-10 px-2 py-1 text-center select-none bg-red-500/10 text-red-600">12</div>
                            <div className="flex-1 px-3 py-1 whitespace-pre bg-red-500/10 text-red-600">
                              <span className="mr-1">-</span>title: Cold Outreach Guide
                            </div>
                          </div>
                          <div className="flex">
                            <div className="w-10 px-2 py-1 text-center select-none bg-green-500/10 text-green-600">12</div>
                            <div className="flex-1 px-3 py-1 whitespace-pre bg-green-500/10 text-green-600">
                              <span className="mr-1">+</span>title: Cold Email Strategy for B2B Startups
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-card border border-t-0 border-border px-4 py-4 rounded-b-md mt-0 flex-1 overflow-y-auto">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0">
                            <div className="h-6 w-6 rounded-md bg-neutral-800 flex items-center justify-center">
                              <img src="/jam-logo.svg" alt="Jam" className="h-4 w-4" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1 mb-1 text-muted-foreground text-xs">
                              <span className="font-semibold text-foreground">Jam</span>
                              <span className="text-[10px] border border-border rounded-full px-2 py-0.5 font-medium">bot</span>
                              <span>1m ago</span>
                            </div>
                            <div className="text-foreground leading-5 text-[13px]">
                              <div className="font-semibold">AI Search: High-value keyword integration</div>
                              <div className="mt-1">
                                Updated title to target <code className="bg-muted text-foreground rounded px-1 text-xs font-mono">cold email strategy</code> (2.4K monthly searches, low competition). This change aligns with your target audience search intent.
                              </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                              <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium cursor-pointer">Merge PR</button>
                              <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium cursor-pointer">Request Changes</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* MOBILE VIEW (relative h-full md:hidden) */}
          <div className="relative h-full md:hidden">
            <div className="relative h-full">
              <div className="absolute" style={{ left: 'max(16px, calc(50% - 315px))', top: '24px', width: '630px', height: '660px' }}>
                
                {/* Mobile Slack Window */}
                <div 
                  className="bg-background border-border absolute flex flex-col overflow-hidden rounded-[10px] border text-left" 
                  style={{ top: 0, left: 0, width: '580px', height: '420px', zIndex: 10, boxShadow: '0 28px 70px rgba(0, 0, 0, 0.14), 0 14px 32px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="border-border bg-muted/50 relative flex h-7 items-center justify-between border-b px-2">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#27CA40]" />
                    </div>
                    <div className="text-muted-foreground pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 truncate text-center text-sm font-medium">Slack</div>
                    <div className="w-[52px]" />
                  </div>
                  <div className="flex-1 overflow-hidden flex flex-col">
                    <div className="border-border bg-card flex items-center justify-between border-b px-4 py-2">
                      <div className="flex items-center gap-2">
                        <h1 className="text-sm font-semibold text-foreground">#notifications</h1>
                        <span className="text-muted-foreground text-xs">3 members</span>
                      </div>
                    </div>
                    <div className="space-y-4 p-4 text-sm overflow-y-auto">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-neutral-800">
                          <img src="/jam-logo.svg" alt="Jam" className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm font-semibold text-foreground">Jam</span>
                            <span className="text-muted-foreground bg-muted rounded px-1 text-xs font-medium">APP</span>
                            <span className="text-muted-foreground text-xs">10:32 AM</span>
                          </div>
                          <div className="text-foreground mt-1">
                            <p>Drafted 12 personalized emails for your startup founder campaign.</p>
                          </div>
                          <div className="mt-2 flex gap-2">
                            <button className="bg-primary text-primary-foreground rounded px-2.5 py-1.5 text-xs font-medium cursor-pointer">Review Drafts</button>
                            <button className="border-border bg-background hover:bg-muted text-foreground rounded border px-2.5 py-1.5 text-xs font-medium cursor-pointer">View Campaign</button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-neutral-800">
                          <img src="/jam-logo.svg" alt="Jam" className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm font-semibold text-foreground">Jam</span>
                            <span className="text-muted-foreground bg-muted rounded px-1 text-xs font-medium">APP</span>
                            <span className="text-muted-foreground text-xs">10:45 AM</span>
                          </div>
                          <div className="text-foreground mt-1">
                            <p>Found 8 high-value keywords to optimize for. Created PR with blog updates.</p>
                          </div>
                          <div className="mt-2 flex gap-2">
                            <button className="bg-primary text-primary-foreground rounded px-2.5 py-1.5 text-xs font-medium cursor-pointer">Review PR</button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-neutral-800">
                          <img src="/jam-logo.svg" alt="Jam" className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm font-semibold text-foreground">Jam</span>
                            <span className="text-muted-foreground bg-muted rounded px-1 text-xs font-medium">APP</span>
                            <span className="text-muted-foreground text-xs">11:02 AM</span>
                          </div>
                          <div className="text-foreground mt-1">
                            <p>Sarah Chen (Founder @ TechFlow) replied to your email!</p>
                          </div>
                          <div className="mt-2 flex gap-2">
                            <button className="bg-primary text-primary-foreground rounded px-2.5 py-1.5 text-xs font-medium cursor-pointer">View Reply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile GitHub Pull Request Window */}
                <div 
                  className="bg-background border-border absolute flex flex-col overflow-hidden rounded-[10px] border text-left" 
                  style={{ top: '240px', left: '70px', width: '560px', height: '420px', zIndex: 20, boxShadow: '0 28px 70px rgba(0, 0, 0, 0.14), 0 14px 32px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="border-border bg-muted/50 relative flex h-7 items-center justify-between border-b px-2">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#27CA40]" />
                    </div>
                    <div className="text-muted-foreground pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 truncate text-center text-sm font-medium font-mono">GitHub Pull Request</div>
                    <div className="w-[52px]" />
                  </div>
                  <div className="flex-1 overflow-hidden px-5 py-3 text-sm flex flex-col">
                    <div className="flex items-center gap-4">
                      <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full">
                        <svg className="text-muted-foreground h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-1">
                        <span className="text-foreground font-semibold">Jam</span>
                        <span className="border-border rounded-full border px-2 py-0.5 text-xs font-medium">bot</span>
                        <span>reviewed</span>
                        <span>1m ago</span>
                      </div>
                    </div>
                    <div className="relative mt-3 flex-1 flex flex-col overflow-hidden">
                      <div className="absolute top-0 bottom-0 left-4 w-px bg-border/60" style={{ background: 'linear-gradient(to bottom, var(--border), transparent)' }} />
                      <div className="ml-12 flex-1 flex flex-col overflow-hidden">
                        <div className="border-border bg-muted/50 text-muted-foreground rounded-t-md border px-3 py-2 font-mono text-xs">content/blogs/cold-outreach-guide.mdx</div>
                        <div className="border-border overflow-hidden rounded-b-md border border-t-0 flex-shrink-0 animate-none">
                          <div className="font-mono text-xs">
                            <div className="flex">
                              <div className="w-10 bg-red-500/10 px-2 py-1 text-center text-red-600 select-none">12</div>
                              <div className="flex-1 bg-red-500/10 px-3 py-1 whitespace-pre text-red-600">
                                <span className="mr-1">-</span>title: Cold Outreach Guide
                              </div>
                            </div>
                            <div className="flex">
                              <div className="w-10 bg-green-500/10 px-2 py-1 text-center text-green-600 select-none">12</div>
                              <div className="flex-1 bg-green-500/10 px-3 py-1 whitespace-pre text-green-600">
                                <span className="mr-1">+</span>title: Cold Email Strategy for B2B Startups
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-card border-border border-t px-4 py-4 flex-1 overflow-y-auto">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-800">
                                <img src="/jam-logo.svg" alt="Jam" className="h-4 w-4" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="text-muted-foreground mb-1 flex items-center gap-1 text-xs">
                                <span className="text-foreground font-semibold">Jam</span>
                                <span className="border-border rounded-full border px-2 py-0.5 text-xs font-medium font-mono">bot</span>
                                <span>1m ago</span>
                              </div>
                              <div className="text-foreground text-[13px] leading-5">
                                <div className="font-semibold">AI Search: High-value keyword integration</div>
                                <div className="mt-1 font-sans">
                                  Updated title to target <code className="bg-muted text-foreground rounded px-1 font-mono text-xs">cold email strategy</code> (2.4K monthly searches, low competition). This change aligns with your target audience search intent.
                                </div>
                              </div>
                              <div className="mt-4 flex flex-wrap gap-2">
                                <button className="border-border bg-card inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-medium cursor-pointer">Merge PR</button>
                                <button className="border-border bg-card inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-medium cursor-pointer">Request Changes</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
  );
}
