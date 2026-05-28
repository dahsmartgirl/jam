import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function BlogSection() {
  const posts = [
    {
      category: 'AI',
      date: 'Jan 6, 2025',
      title: 'Why Builders Need AI Orchestration, Not More AI Tools',
      readTime: '5 min read',
      href: '/blogs/ai-orchestration-for-builders'
    },
    {
      category: 'Founders',
      date: 'Jan 13, 2025',
      title: 'The Hidden Cost of Being a Part-Time Marketer',
      readTime: '6 min read',
      href: '/blogs/hidden-cost-of-part-time-marketer'
    },
    {
      category: 'Outreach',
      date: 'Jan 20, 2025',
      title: "Cold Outreach That Doesn't Feel Cold",
      readTime: '7 min read',
      href: '/blogs/cold-outreach-that-doesnt-feel-cold'
    }
  ];

  return (
    <section className="relative p-6 md:p-8 lg:p-10">
      
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-light text-foreground mb-8">
        From the blog
      </h2>

      {/* Grid of articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, idx) => (
          <a 
            key={idx} 
            className="group flex flex-col justify-between p-6 bg-muted/30 hover:bg-muted/50 border border-border/40 hover:border-border transition-colors min-h-[240px] rounded-lg cursor-pointer"
            href={post.href}
          >
            <div>
              {/* Meta details */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs px-2.5 py-1 border border-border rounded-full text-muted-foreground font-mono">
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {post.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-light text-foreground group-hover:text-foreground/80 transition-colors leading-snug">
                {post.title}
              </h3>
            </div>

            {/* Read action footer */}
            <div className="flex items-center justify-between mt-6">
              <span className="text-xs text-muted-foreground">
                {post.readTime}
              </span>
              <span className="inline-flex items-center gap-1 text-xs border border-border bg-background text-foreground px-4 py-2 rounded-full group-hover:gap-2 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all font-semibold select-none">
                Read post
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Footer "See all" link */}
      <div className="mt-6">
        <a 
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors cursor-pointer font-medium" 
          href="/blogs"
        >
          See all posts
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

    </section>
  );
}
