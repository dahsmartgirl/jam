import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BackedBy from './components/BackedBy';
import WorkflowCanvas from './components/WorkflowCanvas';
import VisibilityScore from './components/VisibilityScore';
import AuditGaps from './components/AuditGaps';
import ContactsTable from './components/ContactsTable';
import InboxManager from './components/InboxManager';
import LeadEnrichmentWarmUp from './components/LeadEnrichmentWarmUp';
import CustomAutomations from './components/CustomAutomations';
import SlackGithubAlerts from './components/SlackGithubAlerts';
import Changelog from './components/Changelog';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true; // Dark mode by default
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Tab Switcher for the top interactive workflow canvas
  const [activeTab, setActiveTab] = useState<string>('seo');
  const tabs = [
    { id: 'seo', name: 'Rank on AI search' },
    { id: 'social', name: 'Monitor social' },
    { id: 'prospects', name: 'Find prospects' },
    { id: 'emails', name: 'Send cold emails' },
    { id: 'audits', name: 'Run SEO audit' }
  ];

  return (
    <div className="dark:bg-background min-h-screen bg-[#FAF9F5] text-foreground">
      {/* 1. Navigation Bar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Spacing for fixed navbar */}
      <div className="h-12" />

      {/* 2. Sticky Growth Engineering Manifesto Bar */}
      <a 
        className="border-border dark:bg-background group sticky top-12 z-50 block w-full border-b bg-[#FAF9F5] py-2.5 text-center text-sm" 
        href="/manifesto"
      >
        <span className="text-foreground">Growth Engineering: Manifesto</span>{' '}
        <span className="font-medium text-primary inline-flex items-center">Read now <span className="inline-block ml-1 transition-transform duration-300 ease-out group-hover:translate-x-1">→</span></span>
      </a>

      {/* 3. Main Grid layout wrapper */}
      <main className="mx-auto max-w-[1800px] px-3 pt-4 sm:px-6 sm:pt-8 md:px-10 lg:px-16">
        <div className="border-border border">
          
          {/* A. Hero Section */}
          <Hero darkMode={darkMode} />

          {/* B. Tabs Selector and Workflow Canvas */}
          <div className="relative">
            <div className="border-border relative flex flex-col overflow-hidden border-b md:h-[min(1000px,90vh)] md:min-h-[700px]">
              
              {/* Overlay backgrounds */}
              <div className="h-full w-full overflow-hidden absolute inset-0">
                <div 
                  aria-hidden="true" 
                  className="absolute -inset-[5%] dark:hidden" 
                  style={{
                    backgroundImage: 'url(/landing/main-demo-bg-landscape.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: '55% 45%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                <div 
                  aria-hidden="true" 
                  className="absolute -inset-[5%] hidden [filter:saturate(0.25)] dark:block" 
                  style={{
                    backgroundImage: 'url(/landing/main-demo-bg-dark.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: '55% 45%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              </div>

              {/* Centered Content Container */}
              <div className="relative z-10 flex flex-col flex-1 min-h-0 w-full max-w-[1432px] mx-auto px-4 sm:px-6 md:px-8">
                
                {/* Tab Selector Buttons Bar */}
                <div className="flex-shrink-0 py-4 sm:py-5">
                  <div className="scrollbar-hide flex flex-nowrap gap-2 overflow-x-auto">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors cursor-pointer ${
                          activeTab === tab.id 
                            ? 'bg-foreground text-background font-medium' 
                            : 'bg-background/80 text-foreground hover:bg-background border-border border backdrop-blur'
                        }`}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Workflow Canvas display */}
                <section className="relative min-h-0 flex-1 w-full pb-4 sm:pb-6 md:pb-8">
                  <WorkflowCanvas activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} />
                </section>

              </div>

            </div>
          </div>

          <div className="border-border border-t" />

          {/* C. BackedBy Marquee Section */}
          <BackedBy />

          <div className="border-border border-t" />

          {/* D. Visibility Score / Find Your Gaps Section */}
          <VisibilityScore />

          <div className="border-border border-t" />

          {/* E. Competitor & Leads split grid */}
          <section className="grid grid-cols-1 lg:grid-cols-2">
            <AuditGaps />
            <ContactsTable />
          </section>

          <div className="border-border border-t" />

          {/* G. Outbound Inbox Manager Section */}
          <InboxManager />

          <div className="border-border border-t" />

          {/* G2. Lead Enrichment & Auto Warm-up Section */}
          <LeadEnrichmentWarmUp />

          {/* H. Custom Automations branching canvas Section */}
          <CustomAutomations activeTab={activeTab} darkMode={darkMode} />

          <div className="border-border border-t" />

          {/* I. Workflow Integrations / Slack & GitHub Alerts Section */}
          <SlackGithubAlerts />

          <div className="border-border border-t" />

          {/* J. Changelog Updates Section */}
          <Changelog darkMode={darkMode} />

          <div className="border-border border-t" />

          {/* K. Related Blogs Section */}
          <BlogSection />

        </div>
      </main>

      {/* L. Page Footer and CTA */}
      <Footer darkMode={darkMode} />
    </div>
  );
}
