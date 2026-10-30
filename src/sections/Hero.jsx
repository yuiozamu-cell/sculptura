import React from 'react';
import { ArrowDown, Compass, Sparkles, BookOpen, MessageSquare, Landmark } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  return (
    <section id="entrance" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-ivory">
      {/* Subtle Architectural Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-olive/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Museum Intro */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-stone-gray/40 bg-white/60 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse"></span>
              <span className="text-xs font-semibold tracking-wider uppercase text-charcoal-700">
                Art Appreciation • Digital Museum Exhibition
              </span>
            </div>

            <div>
              <h1 className="font-display-serif text-5xl sm:text-6xl lg:text-7xl font-extrabold text-charcoal tracking-tight leading-[1.08]">
                SCULPTURA
              </h1>
              <p className="mt-2 text-xl sm:text-2xl font-academic italic text-terracotta tracking-wide">
                Where Form Becomes Meaning
              </p>
            </div>

            <p className="text-base sm:text-lg text-charcoal-700 font-light leading-relaxed max-w-2xl">
              Sculpture is one of the oldest and most profound of all art forms. Unlike two-dimensional paintings, 
              it occupies real physical space as a three-dimensional mass—inviting us to explore volume, texture, 
              light, and shadow. Here, inert rock, metal, clay, and soap transcend stillness to vibrate with 
              human courage, spiritual reverence, and enduring philosophy.
            </p>

            {/* Guiding Curatorial Quote */}
            <div className="border-l-2 border-terracotta pl-4 py-1.5 my-6 bg-white/40 rounded-r-md">
              <p className="font-academic italic text-lg text-charcoal-800">
                “Sculpture is the best comment that a painter can make on painting.”
              </p>
              <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-widest mt-1 block">
                — Pablo Picasso
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3.5 pt-2">
              <a
                href="#understanding"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-terracotta text-white font-medium text-sm hover:bg-terracotta-dark transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Compass className="w-4 h-4" />
                <span>Explore the Museum</span>
              </a>
              <a
                href="#studio"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-stone-gray/40 text-charcoal font-medium text-sm hover:border-terracotta hover:text-terracotta transition-all duration-200 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-terracotta" />
                <span>Digital Sculpture Studio</span>
              </a>
              <a
                href="#community-wall"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-olive/10 text-olive-dark font-medium text-sm hover:bg-olive/20 transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4 text-olive" />
                <span>Community Wall</span>
              </a>
            </div>

            {/* Metric Pills */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-gray/30 max-w-lg">
              <div>
                <span className="block font-display-serif text-2xl font-bold text-charcoal">30,000 BCE</span>
                <span className="text-xs text-charcoal-500">Prehistoric Origins (Löwenmensch)</span>
              </div>
              <div>
                <span className="block font-display-serif text-2xl font-bold text-terracotta">4 Methods</span>
                <span className="text-xs text-charcoal-500">Carve, Cast, Mold & Assemble</span>
              </div>
              <div>
                <span className="block font-display-serif text-2xl font-bold text-olive">Fine Arts</span>
                <span className="text-xs text-charcoal-500">Historical & Modern Theory</span>
              </div>
            </div>
          </div>

          {/* Right Column: Curated Museum Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Artwork Plinth Display */}
              <div className="relative z-10 bg-white p-3 rounded-2xl shadow-museum border border-stone-gray/30">
                <div className="relative overflow-hidden rounded-xl bg-charcoal-900 aspect-4/5 group">
                  <img
                    src="./images/people_power_monument_module.jpeg"
                    alt="People Power Monument by Eduardo Castrillo"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal/90 via-charcoal/20 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-terracotta-light bg-black/40 px-2.5 py-0.5 rounded-full inline-block mb-1.5 backdrop-blur-xs">
                      Featured Monumental Work
                    </span>
                    <h3 className="font-display-serif text-xl font-bold">
                      People Power Monument
                    </h3>
                    <p className="text-xs text-stone-light/90">
                      Eduardo Castrillo (1993) • Monumental Welded Bronze & Brass
                    </p>
                  </div>
                </div>

                {/* Subtitle caption below photo */}
                <div className="mt-3 px-2 py-1 flex items-center justify-between text-xs text-charcoal-600">
                  <span className="italic">“Where still metal becomes dynamic life.”</span>
                  <a href="#gallery" className="text-terracotta hover:underline font-medium">
                    View in Gallery →
                  </a>
                </div>
              </div>

              {/* Decorative Corner Stone Accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-terracotta/40 rounded-tr-2xl pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Down indicator */}
      <div className="text-center mt-12">
        <a 
          href="#understanding" 
          className="inline-flex flex-col items-center text-xs text-charcoal-400 hover:text-terracotta transition-colors group"
          aria-label="Scroll to Understanding Sculpture"
        >
          <span className="tracking-widest uppercase text-[10px] mb-1 group-hover:tracking-wider transition-all">
            Begin Museum Tour
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-stone-gray group-hover:text-terracotta" />
        </a>
      </div>
    </section>
  );
}
