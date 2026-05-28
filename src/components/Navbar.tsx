import React, { useState, useEffect } from 'react';
import { Sun, Moon, ChevronDown, ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 right-0 left-0 z-[60] border-b border-border ${
      scrolled 
        ? 'bg-background/80 backdrop-blur-md' 
        : 'bg-transparent'
    }`}>
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
        <div className="relative flex h-12 items-center justify-between">
          
          {/* Logo link */}
          <a className="flex items-center gap-2 select-none" href="/">
            <img 
              src="/jam-logo.svg"
              alt="Jam"
              className="h-7 w-auto"
            />
            <span className="text-foreground text-lg font-medium tracking-tight">Jam</span>
          </a>

          {/* Navigation Links in Center */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
            {/* Product Dropdown */}
            <div className="relative group">
              <button 
                type="button"
                className="text-foreground inline-flex items-center gap-1 text-sm font-normal transition-opacity hover:opacity-70 cursor-pointer font-sans h-12"
              >
                Product
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              
              {/* Redesigned Sublinks Container */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 hidden group-hover:block z-50">
                <div className="w-56 bg-background/95 backdrop-blur-xl border border-border shadow-xl rounded-xl p-2 flex flex-col gap-0.5 font-sans">
                  <a href="#aeo" className="flex flex-col px-3 py-2 rounded-lg text-foreground/80 hover:bg-accent hover:text-foreground transition-all duration-150">
                    <span className="text-xs font-semibold text-foreground">AI Citations (AEO)</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 leading-normal">Rank on AI Search engines</span>
                  </a>
                  <a href="#inbox" className="flex flex-col px-3 py-2 rounded-lg text-foreground/80 hover:bg-accent hover:text-foreground transition-all duration-150">
                    <span className="text-xs font-semibold text-foreground">Email Outbound</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 leading-normal">Direct deliverability at scale</span>
                  </a>
                  <a href="#alerts" className="flex flex-col px-3 py-2 rounded-lg text-foreground/80 hover:bg-accent hover:text-foreground transition-all duration-150">
                    <span className="text-xs font-semibold text-foreground">Social Monitoring</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 leading-normal">Listen and respond in real-time</span>
                  </a>
                  <a href="#automations" className="flex flex-col px-3 py-2 rounded-lg text-foreground/80 hover:bg-accent hover:text-foreground transition-all duration-150">
                    <span className="text-xs font-semibold text-foreground">Custom Workflows</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 leading-normal">Branching logic node canvas</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Resources Dropdown */}
            <div className="relative group">
              <button 
                type="button"
                className="text-foreground inline-flex items-center gap-1 text-sm font-normal transition-opacity hover:opacity-70 cursor-pointer font-sans h-12"
              >
                Resources
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              
              {/* Redesigned Sublinks Container */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 hidden group-hover:block z-50">
                <div className="w-48 bg-background/95 backdrop-blur-xl border border-border shadow-xl rounded-xl p-2 flex flex-col gap-0.5 font-sans">
                  <a href="/manifesto" className="flex flex-col px-3 py-2 rounded-lg text-foreground/80 hover:bg-accent hover:text-foreground transition-all duration-150">
                    <span className="text-xs font-semibold text-foreground">Manifesto</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 leading-normal">Our growth engineering ideas</span>
                  </a>
                  <a href="#blog" className="flex flex-col px-3 py-2 rounded-lg text-foreground/80 hover:bg-accent hover:text-foreground transition-all duration-150">
                    <span className="text-xs font-semibold text-foreground">Blog</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 leading-normal">Marketing and AI guides</span>
                  </a>
                  <a href="#changelog" className="flex flex-col px-3 py-2 rounded-lg text-foreground/80 hover:bg-accent hover:text-foreground transition-all duration-150">
                    <span className="text-xs font-semibold text-foreground">Changelog</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 leading-normal">See what we've built</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Pricing link */}
            <a className="text-foreground text-sm font-normal transition-opacity hover:opacity-70 font-sans" href="#pricing">
              Pricing
            </a>
          </div>

          {/* Right Area Actions */}
          <div className="flex items-center gap-2">
            {/* Theme selector */}
            <button 
              className="h-7 w-7 flex items-center justify-center p-1 text-muted-foreground hover:text-foreground cursor-pointer transition-colors bg-transparent border-0 outline-none" 
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Sign in */}
            <button className="rounded-full border border-zinc-300 dark:border-zinc-800 h-7 px-3 flex items-center justify-center text-xs font-normal transition-colors hover:bg-muted/40 text-foreground bg-transparent cursor-pointer font-sans hidden md:flex">
              Sign in
            </button>

            {/* Start Jamming */}
            <button 
              data-slot="button" 
              className="cursor-pointer items-center justify-center whitespace-nowrap text-xs font-normal transition-all bg-foreground text-background hover:opacity-90 h-7 px-3 rounded-full group gap-0 hidden md:flex font-sans" 
              type="button"
            >
              <span>Start Jamming</span>
              <span className="inline-flex overflow-hidden max-w-0 ml-0 group-hover:max-w-6 group-hover:ml-1.5 transition-all duration-300 ease-out">
                <ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button 
              className="text-foreground flex items-center justify-center md:hidden p-2 rounded hover:bg-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-6 py-4 flex flex-col gap-4 shadow-md absolute w-full left-0 top-12 z-50">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Product</span>
            <a href="#aeo" onClick={() => setMobileMenuOpen(false)} className="text-sm text-foreground/80 pl-3 py-1">AI Citations (AEO)</a>
            <a href="#inbox" onClick={() => setMobileMenuOpen(false)} className="text-sm text-foreground/80 pl-3 py-1">Email Outbound</a>
            <a href="#alerts" onClick={() => setMobileMenuOpen(false)} className="text-sm text-foreground/80 pl-3 py-1">Social Monitoring</a>
            <a href="#automations" onClick={() => setMobileMenuOpen(false)} className="text-sm text-foreground/80 pl-3 py-1">Custom Workflows</a>
          </div>
          <div className="flex flex-col gap-2 border-t border-border/40 pt-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Resources</span>
            <a href="/manifesto" onClick={() => setMobileMenuOpen(false)} className="text-sm text-foreground/80 pl-3 py-1">Manifesto</a>
            <a href="#blog" onClick={() => setMobileMenuOpen(false)} className="text-sm text-foreground/80 pl-3 py-1">Blog</a>
            <a href="#changelog" onClick={() => setMobileMenuOpen(false)} className="text-sm text-foreground/80 pl-3 py-1">Changelog</a>
          </div>
          <div className="flex flex-col gap-3 border-t border-border/40 pt-3">
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm text-foreground/80 py-1">Pricing</a>
            <a href="#signin" onClick={() => setMobileMenuOpen(false)} className="text-sm text-foreground/80 py-1">Sign in</a>
            <button className="bg-foreground text-background font-normal rounded-full text-sm py-2 w-full mt-1 flex items-center justify-center gap-1.5 hover:opacity-90">
              <span>Start Jamming</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
