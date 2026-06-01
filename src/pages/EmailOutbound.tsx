import React from 'react';
import Hero from '../components/main/Hero';
import WorkflowCanvas from '../components/shared/WorkflowCanvas';
import ContactsTable from '../components/main/ContactsTable';
import DraftsInYourVoice from '../components/outbound/DraftsInYourVoice';
import LeadEnrichmentWarmUp from '../components/main/LeadEnrichmentWarmUp';
import InboxManager from '../components/main/InboxManager';
import OutboundFaq from '../components/outbound/OutboundFaq';

interface EmailOutboundProps {
  darkMode: boolean;
}

export default function EmailOutbound({ darkMode }: EmailOutboundProps) {
  return (
    <main className="mx-auto max-w-[1800px] px-3 pt-4 sm:px-6 sm:pt-8 md:px-10 lg:px-16">
      <div className="border-border border">
        
        {/* A. Hero Section */}
        <Hero 
          darkMode={darkMode} 
          titleLine1="Cold outbound that" 
          titleLine2="books meetings on autopilot" 
          subtitle="Find leads, write in your voice, warm up your inboxes, sends, and triages every reply." 
        />

        {/* B. Workflow Canvas locked to Outbound (emails) */}
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
            <div className="relative z-10 flex flex-col flex-1 min-h-0 w-full max-w-[1432px] mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8">
              <section className="relative min-h-0 flex-1 w-full pb-4 sm:pb-6 md:pb-8">
                <WorkflowCanvas activeTab="emails" setActiveTab={() => {}} darkMode={darkMode} isFixedScenario={true} />
              </section>
            </div>

          </div>
        </div>

        <div className="border-border border-t" />

        {/* C. Find Warm Leads & Drafts in your voice (3fr / 1fr split) */}
        <section className="grid grid-cols-1 md:grid-cols-[3fr_1fr]">
          <ContactsTable variant="outbound" />
          <DraftsInYourVoice />
        </section>

        <div className="border-border border-t" />

        {/* D. Lead Enrichment & Auto Warm-up */}
        <LeadEnrichmentWarmUp variant="outbound" />

        {/* E. Inbox Manager */}
        <InboxManager variant="outbound" />

        <div className="border-border border-t" />

        {/* F. FAQ Accordion Section */}
        <OutboundFaq />

      </div>
    </main>
  );
}
