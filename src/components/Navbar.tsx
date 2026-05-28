import React, { useState, useEffect } from 'react';
import { Sun, Moon, ChevronDown, ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 right-0 left-0 z-[60] transition-all duration-300 ease-in-out border-b ${
      scrolled 
        ? 'bg-background/80 backdrop-blur-md border-border' 
        : 'bg-transparent border-transparent'
    }`}>
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
        <div className="relative flex h-12 items-center justify-between">
          
          {/* Logo link */}
          <a className="flex items-center gap-1.5 select-none" href="/">
            <img 
              src="/jam-logo.svg"
              alt="Jam"
              className="h-4 w-auto"
            />
            <span className="text-foreground text-sm font-medium tracking-tight">Jam</span>
          </a>

          {/* Navigation Links in Center */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
            {/* Product Dropdown */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => { setProductOpen(!productOpen); setResourcesOpen(false); }}
                className="text-foreground inline-flex items-center gap-1 text-sm font-normal transition-opacity hover:opacity-70 cursor-pointer font-sans"
              >
                Product
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${productOpen ? 'rotate-180' : ''}`} />
              </button>
              {productOpen && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 glass-panel p-2 shadow-md z-50 flex flex-col gap-1 font-sans">
                  <a href="#aeo" onClick={() => setProductOpen(false)} className="px-3 py-1.5 rounded-lg text-xs text-foreground/80 hover:bg-accent hover:text-foreground transition-colors font-sans">AI Citations (AEO)</a>
                  <a href="#inbox" onClick={() => setProductOpen(false)} className="px-3 py-1.5 rounded-lg text-xs text-foreground/80 hover:bg-accent hover:text-foreground transition-colors font-sans">Email Outbound</a>
                  <a href="#alerts" onClick={() => setProductOpen(false)} className="px-3 py-1.5 rounded-lg text-xs text-foreground/80 hover:bg-accent hover:text-foreground transition-colors font-sans">Social Monitoring</a>
                  <a href="#automations" onClick={() => setProductOpen(false)} className="px-3 py-1.5 rounded-lg text-xs text-foreground/80 hover:bg-accent hover:text-foreground transition-colors font-sans">Custom Workflows</a>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => { setResourcesOpen(!resourcesOpen); setProductOpen(false); }}
                className="text-foreground inline-flex items-center gap-1 text-sm font-normal transition-opacity hover:opacity-70 cursor-pointer font-sans"
              >
                Resources
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {resourcesOpen && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-40 glass-panel p-2 shadow-md z-50 flex flex-col gap-1 font-sans">
                  <a href="/manifesto" onClick={() => setResourcesOpen(false)} className="px-3 py-1.5 rounded-lg text-xs text-foreground/80 hover:bg-accent hover:text-foreground transition-colors font-sans">Manifesto</a>
                  <a href="#blog" onClick={() => setResourcesOpen(false)} className="px-3 py-1.5 rounded-lg text-xs text-foreground/80 hover:bg-accent hover:text-foreground transition-colors font-sans">Blog</a>
                  <a href="#changelog" onClick={() => setResourcesOpen(false)} className="px-3 py-1.5 rounded-lg text-xs text-foreground/80 hover:bg-accent hover:text-foreground transition-colors font-sans">Changelog</a>
                </div>
              )}
            </div>

            {/* Pricing link */}
            <a className="text-foreground text-sm font-normal transition-opacity hover:opacity-70 font-sans" href="#pricing">
              Pricing
            </a>
          </div>

          {/* Right Area Actions */}
          <div className="flex items-center gap-4">
            {/* Theme selector */}
            <button 
              className="h-7 w-7 flex items-center justify-center p-1 rounded-full text-foreground hover:bg-accent/50 cursor-pointer transition-colors bg-transparent border-0 outline-none" 
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>

            {/* Sign in */}
            <button className="text-foreground hidden text-sm font-normal transition-opacity hover:opacity-70 md:block cursor-pointer font-sans">
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
