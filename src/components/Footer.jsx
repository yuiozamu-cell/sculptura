import React from 'react';
import { Landmark, ArrowUp, Heart, Sparkles, MessageSquare } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-stone-light/80 pt-16 pb-12 border-t border-stone-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-stone-gray/20">
          
          {/* Col 1: Identity & Motto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-terracotta flex items-center justify-center text-white">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display-serif text-2xl font-bold tracking-wider text-white">
                  SCULPTURA
                </span>
                <p className="text-xs text-stone-light font-academic italic">
                  Where Form Becomes Meaning
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-light/70 leading-relaxed max-w-sm font-light">
              A contemporary digital sculpture museum created for Art Appreciation (GE-AA) Module 6. 
              Celebrating the tactile, monumental, and spiritual expressions of three-dimensional form.
            </p>

            <div className="pt-2 text-xs text-stone-gray">
              <span>Course Project • Group 6: Sculpture</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Museum Exploration
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#entrance" className="hover:text-terracotta transition-colors">Entrance & Hero</a>
              </li>
              <li>
                <a href="#understanding" className="hover:text-terracotta transition-colors">Understanding Sculpture</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-terracotta transition-colors">Sculpture Gallery</a>
              </li>
              <li>
                <a href="#spotlight" className="hover:text-terracotta transition-colors">Michelangelo Spotlight</a>
              </li>
              <li>
                <a href="#interactive" className="hover:text-terracotta transition-colors">Interactive Learning Zone</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic & Community */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Features & Technical
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#studio" className="hover:text-terracotta transition-colors inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                  <span>Digital Soap Sculpture Studio</span>
                </a>
              </li>
              <li>
                <a href="#reflection" className="hover:text-terracotta transition-colors">Post-Test Reflections</a>
              </li>
              <li>
                <a href="#community-wall" className="hover:text-terracotta transition-colors inline-flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-olive-light" />
                  <span>The Sculpture Community Wall (Supabase)</span>
                </a>
              </li>
              <li>
                <a href="#creators" className="hover:text-terracotta transition-colors">Meet Group 6 & Instructor</a>
              </li>
              <li>
                <a href="#references" className="hover:text-terracotta transition-colors">APA 7 References & Image Credits</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-gray gap-4">
          <p>
            © 2026 SCULPTURA • Group 6 Midterm Project in Art Appreciation. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-gray/30 hover:border-terracotta hover:text-white transition-colors text-xs"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
