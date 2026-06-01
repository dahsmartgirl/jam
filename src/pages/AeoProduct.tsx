import React from 'react';
import AeoHero from '../components/aeo/AeoHero';
import WorkflowCanvas from '../components/shared/WorkflowCanvas';
import VisibilityScore from '../components/shared/VisibilityScore';
import AeoCompetitors from '../components/aeo/AeoCompetitors';
import AeoTrackedPrompts from '../components/aeo/AeoTrackedPrompts';
import AeoCitationMatrix from '../components/aeo/AeoCitationMatrix';
import AeoCitationSources from '../components/aeo/AeoCitationSources';
import AeoPublishContent from '../components/aeo/AeoPublishContent';
import AeoFaq from '../components/aeo/AeoFaq';

interface AeoProductProps {
  darkMode: boolean;
}

export default function AeoProduct({ darkMode }: AeoProductProps) {
  return (
    <main className="mx-auto max-w-[1800px] px-3 pt-4 sm:px-6 sm:pt-8 md:px-10 lg:px-16">
      <div className="border-border border">
        
        {/* A. Hero Section */}
        <AeoHero darkMode={darkMode} />

        {/* B. Workflow Canvas locked to SEO (Rank on AI search) */}
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
              {/* Workflow Canvas display */}
              <section className="relative min-h-0 flex-1 w-full pb-4 sm:pb-6 md:pb-8">
                <WorkflowCanvas activeTab="seo" setActiveTab={() => {}} darkMode={darkMode} isFixedScenario={true} />
              </section>
            </div>

          </div>
        </div>

        <div className="border-border border-t" />

        {/* C. Visibility Score Section */}
        <VisibilityScore subtitle="See where you're not being cited across every AI platform." />

        <div className="border-border border-t" />

        {/* D. Competitors & Prompts side-by-side grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2">
          <AeoCompetitors />
          <AeoTrackedPrompts />
        </section>

        <div className="border-border border-t" />

        {/* E. Citation Matrix Section */}
        <AeoCitationMatrix />

        <div className="border-border border-t" />

        {/* F. Sources & Publish Content split grid */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr]">
          <AeoCitationSources />
          <AeoPublishContent />
        </section>

        <div className="border-border border-t" />

        {/* G. FAQ Accordion Section */}
        <AeoFaq />

      </div>
    </main>
  );
}
