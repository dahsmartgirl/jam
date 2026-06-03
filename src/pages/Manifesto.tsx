import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function Manifesto() {
  return (
    <main className="mx-auto max-w-[760px] px-6 pt-16 pb-32 sm:px-10 sm:pt-24 lg:px-16 text-left font-sans">
      {/* Back to Home Link */}
      <div className="mb-10">
        <a 
          href="/" 
          className="text-primary hover:text-primary/80 group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-150"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
          Back to home
        </a>
      </div>

      <article className="space-y-12">
        {/* Article Header */}
        <header className="border-b border-border/40 pb-10">
          <p className="text-primary text-xs uppercase tracking-widest font-medium mb-3">
            Growth Engineering
          </p>
          <h1 className="text-4xl sm:text-5xl font-normal text-foreground tracking-tight leading-tight mb-6">
            Getting customers is an engineering problem now.
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl font-normal leading-relaxed">
            Every year there are more places to show up and the same number of hours to do it in. Something had to give.
          </p>
        </header>

        {/* Article Body */}
        <div className="font-sans prose prose-neutral dark:prose-invert max-w-none text-base sm:text-lg text-muted-foreground/90 space-y-6 sm:space-y-8 leading-relaxed">
          <p>
            Every year there's a new place you're supposed to show up. Search, then social, then video, then newsletters, then communities, and now AI that answers people's questions before they ever click a link. None of the old ones disappear when a new one arrives. They just stack.
          </p>
          <p>
            So the list of things that supposedly work keeps getting longer while the day stays exactly as long as it's always been. For most of the internet's history there was one answer to that gap, and it was brute force. More people. More tools. More hours. Hope something catches.
          </p>
          <p>
            What actually changed has nothing to do with the size of the pile. Software can finally think. An agent can look at what's happening, decide what to do about it, go do it, see whether it worked, and try something else when it didn't. That's a different animal than a tool that just drafts faster. It can run a whole play from start to finish and change its mind in the middle.
          </p>
          <p>
            Which quietly turns growth from a willpower problem into a design one. The interesting work moves up a level: from doing the task to building the system that does the task from now on. We started calling that Growth Engineering.
          </p>
          <p className="border-l-2 border-primary/45 pl-5 my-8 text-foreground/90 font-medium text-lg sm:text-xl leading-relaxed">
            "Take some repetitive marketing grind, the kind everyone writes off as the cost of doing business, and instead of accepting it, treat it as a system waiting to be built. Then build it, usually before anyone thinks to ask."
          </p>
          <p>
            In practice it's quiet. Systems running in the background that nobody really sees. Something watching the conversations happening in your corner of the internet and stepping in where it genuinely fits. Something that catches a customer in the exact moment they're happy and asks for the review. Something keeping score across every channel at once and moving effort toward whatever's pulling its weight.
          </p>
          <p>
            None of that needed another app. It needed a different way of working, and that only became possible the moment a machine could reason its way through a real workflow instead of just following the steps it was handed.
          </p>
          <p className="font-medium text-foreground/90">
            The people figuring this out first usually aren't the biggest teams or the loudest accounts. They're whoever got tired of treating distribution like a chore to survive and started treating it like something worth building. Everything we make is for them.
          </p>
        </div>
      </article>
    </main>
  );
}
