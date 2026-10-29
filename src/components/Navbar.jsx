import React, { useState, useEffect } from 'react';
import { Menu, X, Landmark, Sparkles, MessageSquare, Palette, BookOpen } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Entrance', href: '#entrance' },
    { label: 'Understanding', href: '#understanding' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Spotlight', href: '#spotlight' },
    { label: 'Interactive Zone', href: '#interactive' },
    { label: 'Studio', href: '#studio', highlight: true },
    { label: 'Reflection', href: '#reflection' },
    { label: 'Community Wall', href: '#community-wall' },
    { label: 'Creators', href: '#creators' },
    { label: 'References', href: '#references' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#F5F1E8]/95 backdrop-blur-md shadow-sm border-b border-stone-gray/30 py-3' 
          : 'bg-[#F5F1E8]/80 backdrop-blur-sm py-4 border-b border-stone-gray/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Museum Identity */}
          <a href="#entrance" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-terracotta flex items-center justify-center text-white shadow-sm group-hover:bg-terracotta-dark transition-colors">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display-serif text-2xl font-bold tracking-wider text-charcoal">
                  SCULPTURA
                </span>
              </div>
              <p className="text-[11px] text-charcoal-600 tracking-wider font-light italic">
                Where Form Becomes Meaning
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-colors ${
                  link.highlight
                    ? 'bg-terracotta text-white hover:bg-terracotta-dark shadow-xs'
                    : 'text-charcoal-700 hover:text-terracotta hover:bg-stone-gray/10'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action on Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <a 
              href="#community-wall"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-olive-dark bg-olive/10 hover:bg-olive/20 px-3 py-1.5 rounded-full transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-olive" />
              <span>Wall</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-charcoal hover:bg-stone-gray/20 focus:outline-hidden focus:ring-2 focus:ring-terracotta"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#F5F1E8] border-b border-stone-gray/30 px-4 pt-3 pb-6 shadow-lg">
          <nav className="grid grid-cols-2 gap-2" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  link.highlight
                    ? 'bg-terracotta text-white font-semibold'
                    : 'text-charcoal hover:bg-stone-gray/15 hover:text-terracotta'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-stone-gray/20 flex justify-between items-center text-xs text-charcoal-600">
            <span>Art Appreciation Midterm Project</span>
            <span className="font-semibold text-terracotta">Group 6</span>
          </div>
        </div>
      )}
    </header>
  );
}
