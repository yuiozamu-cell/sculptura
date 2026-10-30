import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { Sparkles, Hammer, Layers, Quote, Award, BookOpen, ExternalLink, MessageSquare } from 'lucide-react';

export default function ArtistSpotlight({ onCommentClick }) {
  const [activeArtist, setActiveArtist] = useState('michelangelo');

  return (
    <section id="spotlight" className="py-24 bg-[#FAF8F4] border-t border-stone-gray/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          tag="Master Sculptor Profile"
          title="Artist Spotlight: Michelangelo Buonarroti"
          subtitle="An in-depth study of the High Renaissance master, his subtractive philosophy, and the monumental marble masterpiece 'David'."
        />

        {/* Master Presentation Card */}
        <div className="bg-white rounded-3xl border border-stone-gray/30 shadow-museum-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left: Striking Visual Composition */}
            <div className="lg:col-span-5 bg-charcoal-900 relative p-8 sm:p-12 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 opacity-40">
                <img
                  src="./images/david_module.jpeg"
                  alt="David by Michelangelo"
                  className="w-full h-full object-cover object-top filter grayscale contrast-125"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/70 to-transparent"></div>

              {/* Top Tag */}
              <div className="relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-widest text-terracotta-light bg-terracotta/20 px-3 py-1 rounded-full backdrop-blur-xs border border-terracotta/30">
                  High Renaissance Masterpiece
                </span>
                <h3 className="font-display-serif text-3xl sm:text-4xl font-bold text-white mt-4">
                  Michelangelo
                </h3>
                <p className="text-stone-light text-sm font-academic italic">
                  1475 – 1564 • Caprese & Florence, Italy
                </p>
              </div>

              {/* Bottom Quote */}
              <div className="relative z-10 mt-20 pt-6 border-t border-stone-light/20">
                <Quote className="w-8 h-8 text-terracotta/60 mb-2" />
                <p className="text-sm font-academic italic text-white/95 leading-relaxed">
                  “Every block of stone has a statue inside it and it is the task of the sculptor to discover it. 
                  I saw the angel in the marble and carved until I set him free.”
                </p>
                <span className="text-[10px] uppercase tracking-widest text-stone-gray mt-2 block font-semibold">
                  — The Subtractive Sculptor's Credo
                </span>
              </div>
            </div>

            {/* Right: Analytical Narrative */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-olive-dark bg-olive/10 px-2.5 py-0.5 rounded-full">
                    High Renaissance (1501–1504)
                  </span>
                  <span className="text-xs text-charcoal-500 font-medium">
                    Carrara Marble • 5.17 m (17.0 ft)
                  </span>
                </div>

                <h4 className="font-display-serif text-2xl sm:text-3xl font-bold text-charcoal">
                  The Subtractive Mastery of <em>David</em>
                </h4>

                <p className="text-sm text-charcoal-700 leading-relaxed mt-4">
                  Michelangelo's <em>David</em> is celebrated as the quintessential embodiment of 
                  <strong>subtractive carving</strong>. Unlike painters who add pigments to a blank canvas, Michelangelo 
                  began with a colossal eighteen-foot block of Carrara marble—derisively known as <em>"the Giant"</em>, which 
                  had lain damaged and abandoned in the courtyard of Florence Cathedral for four decades.
                </p>

                {/* Technical Breakthroughs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <div className="p-4 bg-ivory rounded-xl border border-stone-gray/20">
                    <div className="flex items-center gap-2 text-terracotta font-bold text-xs uppercase tracking-wider mb-1">
                      <Hammer className="w-4 h-4" />
                      <span>Subtractive Technique</span>
                    </div>
                    <p className="text-xs text-charcoal-600 leading-relaxed">
                      Carved solely using progressive iron chisels: the subbia (point), gradina (toothed claw), and flat chisel, 
                      releasing the form millimeter by millimeter.
                    </p>
                  </div>

                  <div className="p-4 bg-ivory rounded-xl border border-stone-gray/20">
                    <div className="flex items-center gap-2 text-olive font-bold text-xs uppercase tracking-wider mb-1">
                      <Layers className="w-4 h-4" />
                      <span>The Psychological Moment</span>
                    </div>
                    <p className="text-xs text-charcoal-600 leading-relaxed">
                      Portrayed in intense anticipation rather than after battle; his furrowed brow and dilated pupils embody 
                      intellect, courage, and moral purpose.
                    </p>
                  </div>
                </div>

                {/* Sculptural Theory Synthesis */}
                <div className="p-4 bg-olive-50 border-l-3 border-olive rounded-r-xl text-xs text-charcoal-800 space-y-1">
                  <span className="font-bold text-olive-dark block">
                    Sculptural Theory & Aesthetic Philosophy:
                  </span>
                  <p>
                    Aesthetic theory emphasizes that <em>"shape is the dominant characteristic of sculptures, with the human body being its primary subject."</em> 
                    David exemplifies how a visual equivalent of human dignity, divine proportion, and civic liberty was achieved through pure form.
                  </p>
                </div>
              </div>

              {/* Attribution & Discussion Action */}
              <div className="pt-6 border-t border-stone-gray/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-[11px] text-charcoal-500">
                  <span>Photo Credit: Marta Pons Moreta / Shutterstock</span>
                </div>
                <button
                  onClick={() => onCommentClick && onCommentClick('david')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-terracotta text-white text-xs font-semibold hover:bg-terracotta-dark transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Discuss David on Community Wall
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
