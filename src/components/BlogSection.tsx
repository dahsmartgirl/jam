import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function BlogSection() {
  const posts = [
    {
      date: 'May 8, 2026',
      readTime: '7 min read',
      title: 'Multi-Channel Marketing Automation Platform | Jam',
      description: 'Unified platform that coordinates cold outreach, AI search optimization, and email campaigns in one automated workflow. Built...',
      image: '/jamonbread.jpg',
      href: '/blogs/multi-channel-marketing-automation'
    },
    {
      date: 'May 8, 2026',
      readTime: '12 min read',
      title: 'The Complete Guide to AI Search Ranking Optimization (ChatGPT, Perplexity, Claude)',
      href: '/blogs/ai-search-ranking-optimization'
    },
    {
      date: 'May 8, 2026',
      readTime: '10 min read',
      title: "Lead Generation Automation Software: Complete Buyer's Guide for 2026",
      href: '/blogs/lead-generation-automation-guide'
    }
  ];

  return (
    <section className="relative bg-transparent">
      
      {/* Section Title with standard responsive padding */}
      <div className="p-6 md:p-8 lg:p-10 pb-6 md:pb-6 lg:pb-6">
        <h2 className="text-2xl sm:text-3xl font-light text-foreground text-left">
          From the blog
        </h2>
      </div>

      {/* Grid layout with border lines matching the design */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-y border-border/30">
        
        {/* Left Column (Featured Post, spans 8 cols on desktop) */}
        <div className="lg:col-span-8">
          <a 
            href={posts[0].href} 
            className="group grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8 lg:p-10 cursor-pointer text-left h-full"
          >
            {/* Left Side: Wide Thumbnail (jamonbread.jpg in normal color) */}
            <div className="md:col-span-7 relative aspect-[16/10] w-full overflow-hidden">
              <img 
                src={posts[0].image} 
                alt={posts[0].title}
                className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-300"
              />
            </div>
            {/* Right Side: Content aligned to top, read post button at bottom */}
            <div className="md:col-span-5 flex flex-col justify-between h-full py-1">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 mb-2 font-mono">
                  <span>{posts[0].date}</span>
                  <span>/</span>
                  <span>{posts[0].readTime}</span>
                </div>
                <h3 className="text-xl font-normal text-foreground group-hover:text-primary transition-colors leading-snug mb-3">
                  {posts[0].title}
                </h3>
                <p className="text-sm text-muted-foreground/75 leading-relaxed line-clamp-4">
                  {posts[0].description}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-800 py-1.5 px-5 text-center text-sm font-normal transition-colors hover:bg-muted/40 text-foreground bg-transparent cursor-pointer select-none">
                  Read post
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* Right Column (Posts 2 & 3 stacked, horizontally aligned with dividing line) */}
        <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-border/30 flex flex-col divide-y divide-border/30">
          
          {/* Post 2 */}
          <a 
            href={posts[1].href} 
            className="group flex flex-col justify-between p-6 md:p-8 lg:p-10 cursor-pointer text-left flex-1 min-h-[160px]"
          >
            <div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 mb-2 font-mono">
                <span>{posts[1].date}</span>
                <span>/</span>
                <span>{posts[1].readTime}</span>
              </div>
              <h3 className="text-base font-normal text-foreground group-hover:text-primary transition-colors leading-snug">
                {posts[1].title}
              </h3>
            </div>
            <div className="mt-4">
              <span className="inline-flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-800 py-1.5 px-5 text-center text-sm font-normal transition-colors hover:bg-muted/40 text-foreground bg-transparent cursor-pointer select-none">
                Read post
              </span>
            </div>
          </a>

          {/* Post 3 */}
          <a 
            href={posts[2].href} 
            className="group flex flex-col justify-between p-6 md:p-8 lg:p-10 cursor-pointer text-left flex-1 min-h-[160px]"
          >
            <div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 mb-2 font-mono">
                <span>{posts[2].date}</span>
                <span>/</span>
                <span>{posts[2].readTime}</span>
              </div>
              <h3 className="text-base font-normal text-foreground group-hover:text-primary transition-colors leading-snug">
                {posts[2].title}
              </h3>
            </div>
            <div className="mt-4">
              <span className="inline-flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-800 py-1.5 px-5 text-center text-sm font-normal transition-colors hover:bg-muted/40 text-foreground bg-transparent cursor-pointer select-none">
                Read post
              </span>
            </div>
          </a>

        </div>

      </div>

      {/* Footer "See all" link separated by horizontal border */}
      <div className="p-6 md:px-8 lg:px-10 py-6 text-left">
        <a 
          className="group inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors font-medium" 
          href="/blogs"
        >
          <span>See all posts</span>
          <ArrowRight className="h-3.5 w-3.5 ml-1.5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </a>
      </div>

    </section>
  );
}
