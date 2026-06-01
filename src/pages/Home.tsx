import React, { useState } from 'react';
import Hero from '../components/main/Hero';
import BackedBy from '../components/main/BackedBy';
import WorkflowCanvas from '../components/shared/WorkflowCanvas';
import VisibilityScore from '../components/shared/VisibilityScore';
import AuditGaps from '../components/main/AuditGaps';
import ContactsTable from '../components/main/ContactsTable';
import InboxManager from '../components/main/InboxManager';
import LeadEnrichmentWarmUp from '../components/main/LeadEnrichmentWarmUp';
import CustomAutomations from '../components/main/CustomAutomations';
import SlackGithubAlerts from '../components/main/SlackGithubAlerts';
import Changelog from '../components/main/Changelog';
import BlogSection from '../components/main/BlogSection';

interface HomeProps {
  darkMode: boolean;
}

export default function Home({ darkMode }: HomeProps) {
  const [activeTab, setActiveTab] = useState<string>('seo');
  const tabs = [
    { id: 'seo', name: 'Rank on AI search' },
    { id: 'social', name: 'Monitor social' },
    { id: 'prospects', name: 'Find prospects' },
    { id: 'emails', name: 'Send cold emails' },
    { id: 'audits', name: 'Run SEO audit' }
  ];

  return (
    <main className="mx-auto max-w-[1800px] px-3 pt-4 sm:px-6 sm:pt-8 md:px-10 lg:px-16">
      <div className="border-border border">
        
        {/* A. Hero Section */}
        <Hero darkMode={darkMode} />

        {/* B. Tabs Selector and Workflow Canvas */}
        <div className="relative">
          <div className="border-border relative flex flex-col overflow-hidden border-b lg:h-[min(1000px,90vh)] lg:min-h-[700px]">
            
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
  );
}
