import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import AeoProduct from './pages/AeoProduct';
import EmailOutbound from './pages/EmailOutbound';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true; // Dark mode by default
  });

  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('navigate', handleLocationChange);

    // Global click interceptor for local page transitions
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const a = target.closest('a');
      if (a && a.href && a.host === window.location.host) {
        const url = new URL(a.href);
        const path = url.pathname;
        if (
          path === '/' || 
          path === '/products/aeo' || 
          path === '/products/aeo/' ||
          path === '/products/email-outbound' ||
          path === '/products/email-outbound/'
        ) {
          e.preventDefault();
          window.history.pushState(null, '', a.href);
          setCurrentPath(path);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }
    };
    document.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('navigate', handleLocationChange);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('theme-toggling');

    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));

    // Force layout reflow to apply color changes instantly
    window.getComputedStyle(root).opacity;

    const timer = setTimeout(() => {
      root.classList.remove('theme-toggling');
    }, 20);

    return () => clearTimeout(timer);
  }, [darkMode]);

  const isAeoRoute = currentPath === '/products/aeo' || currentPath === '/products/aeo/';
  const isOutboundRoute = currentPath === '/products/email-outbound' || currentPath === '/products/email-outbound/';

  return (
    <div className="dark:bg-background min-h-screen bg-[#FAF9F5] text-foreground">
      {/* 1. Navigation Bar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Spacing for fixed navbar */}
      <div className="h-12" />

      {isAeoRoute ? (
        <AeoProduct darkMode={darkMode} />
      ) : isOutboundRoute ? (
        <EmailOutbound darkMode={darkMode} />
      ) : (
        <>
          {/* Sticky Growth Engineering Manifesto Bar */}
          <a 
            className="border-border dark:bg-background group sticky top-12 z-50 block w-full border-b bg-[#FAF9F5] py-2.5 text-center text-sm" 
            href="/manifesto"
          >
            <span className="text-foreground">Growth Engineering: Manifesto</span>{' '}
            <span className="font-medium text-primary inline-flex items-center">Read now <span className="inline-block ml-1 transition-transform duration-300 ease-out group-hover:translate-x-1">→</span></span>
          </a>

          <Home darkMode={darkMode} />
        </>
      )}

      {/* L. Page Footer and CTA */}
      <Footer darkMode={darkMode} />
    </div>
  );
}
