import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { academicReferences, imageCredits } from '../data/referencesData';
import { BookOpen, Image, ExternalLink } from 'lucide-react';

export default function References() {
  return (
    <section id="references" className="py-24 bg-[#FAF8F4] border-t border-stone-gray/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          tag="Academic Integrity"
          title="References & Image Credits"
          subtitle="All curriculum definitions, historical facts, and artwork media are thoroughly documented according to APA 7th Edition standards."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          
          {/* Column 1: Academic Textual References (APA 7th) */}
          <div className="bg-white rounded-3xl border border-stone-gray/30 p-6 sm:p-8 shadow-museum space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-gray/20">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-terracotta" />
                <h3 className="font-display-serif text-xl font-bold text-charcoal">
                  Textual References (APA 7th Edition)
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta bg-terracotta-50 px-2.5 py-0.5 rounded-full border border-terracotta/20">
                5 Sources
              </span>
            </div>

            <div className="space-y-5">
              {academicReferences.map((ref) => (
                <div key={ref.id} className="p-4 rounded-xl border border-stone-gray/20 bg-ivory/30 space-y-2 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-olive-dark bg-olive/10 px-2 py-0.5 rounded-full">
                      {ref.category}
                    </span>
                    {ref.url && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-terracotta hover:underline inline-flex items-center gap-1 text-[11px] font-semibold"
                      >
                        <span>Visit Resource</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {/* APA 7 Citation */}
                  <p className="font-academic text-sm text-charcoal-900 leading-relaxed font-semibold">
                    {ref.citation}
                  </p>

                  <p className="text-[11px] text-charcoal-600 leading-relaxed">
                    {ref.annotation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Media & Artwork Credits */}
          <div className="bg-white rounded-3xl border border-stone-gray/30 p-6 sm:p-8 shadow-museum space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-gray/20">
              <div className="flex items-center gap-2">
                <Image className="w-5 h-5 text-olive" />
                <h3 className="font-display-serif text-xl font-bold text-charcoal">
                  Artwork & Image Attributions
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-olive-dark bg-olive/10 px-2.5 py-0.5 rounded-full border border-olive/20">
                {imageCredits.length} Artworks
              </span>
            </div>

            <p className="text-xs text-charcoal-600 leading-relaxed">
              Every photograph and artwork in SCULPTURA is attributed to its verified source, 
              providing links to institutional collections and public repositories:
            </p>

            <div className="space-y-3.5 max-h-[580px] overflow-y-auto pr-2">
              {imageCredits.map((img, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl border border-stone-gray/20 bg-ivory/40 space-y-1.5 text-xs hover:border-terracotta/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-charcoal text-xs">
                      {img.artwork}
                    </span>
                    {img.link && img.link.startsWith('http') && (
                      <a
                        href={img.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-terracotta hover:underline inline-flex items-center gap-1 text-[10px] font-semibold"
                      >
                        <span>View Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <p className="text-[11px] text-olive-dark font-medium">
                    Creator: {img.creator} {img.year ? `(${img.year})` : ''}
                  </p>

                  <div className="text-[10px] text-charcoal-500">
                    <span>Medium/Location: {img.medium} • {img.location}</span>
                  </div>

                  <div className="text-[10px] text-charcoal-500 flex flex-wrap items-center justify-between gap-1 pt-1.5 border-t border-stone-gray/20">
                    <span>Source: {img.source}</span>
                    <span className="font-mono text-[9px] bg-white px-1.5 py-0.5 rounded-sm border border-stone-gray/20">
                      {img.license}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
