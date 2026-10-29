import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { artworksData } from '../data/artworksData';
import { ExternalLink, Eye, Info, MessageSquare, Filter, Layers } from 'lucide-react';

export default function Gallery({ onSelectArtwork, onCommentClick }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterCategories = [
    { id: 'all', label: 'All Curated Works' },
    { id: 'module-figures', label: 'Module Figures (1-5)' },
    { id: 'carving', label: 'Subtractive Carving' },
    { id: 'casting', label: 'Additive & Casting' },
    { id: 'monumental', label: 'Monumental Statues' },
  ];

  const filteredArtworks = artworksData.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'module-figures') {
      return ['people-power', 'the-thinker', 'david', 'great-sphinx', 'christ-redeemer'].includes(item.id);
    }
    if (activeFilter === 'carving') {
      return item.technique.toLowerCase().includes('carving') || item.technique.toLowerCase().includes('subtractive');
    }
    if (activeFilter === 'casting') {
      return item.technique.toLowerCase().includes('casting') || item.technique.toLowerCase().includes('additive');
    }
    if (activeFilter === 'monumental') {
      return item.type.toLowerCase().includes('statue') || item.type.toLowerCase().includes('monument');
    }
    return true;
  });

  return (
    <section id="gallery" className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          tag="Curated Exhibition"
          title="The Sculpture Gallery"
          subtitle="Explore prominent historical and contemporary sculptures highlighted throughout Module 6, examining form, physical medium, cultural context, and human meaning."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                activeFilter === cat.id
                  ? 'bg-charcoal text-white shadow-sm'
                  : 'bg-white border border-stone-gray/30 text-charcoal-700 hover:border-terracotta hover:text-terracotta'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((artwork) => (
            <div 
              key={artwork.id}
              className="museum-card rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer"
              onClick={() => onSelectArtwork(artwork)}
            >
              {/* Image Frame */}
              <div className="relative bg-charcoal-900 aspect-4/3 overflow-hidden">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  onError={(e) => {
                    if (artwork.highResImage && e.target.src !== artwork.highResImage) {
                      e.target.src = artwork.highResImage;
                    }
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-medium inline-flex items-center gap-1.5 bg-terracotta/90 px-3 py-1.5 rounded-full backdrop-blur-xs">
                    <Eye className="w-3.5 h-3.5" />
                    Inspect Details & Context
                  </span>
                </div>

                {/* Badge on Card */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 text-charcoal px-2.5 py-1 rounded-full shadow-xs backdrop-blur-xs">
                    {artwork.type.split('/')[0]}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-charcoal-500 mb-1">
                    <span>{artwork.period}</span>
                    <span>{artwork.year}</span>
                  </div>
                  
                  <h3 className="font-display-serif text-xl font-bold text-charcoal group-hover:text-terracotta transition-colors">
                    {artwork.title}
                  </h3>
                  
                  <p className="text-xs text-olive-dark font-medium mb-3">
                    {artwork.artist}
                  </p>

                  <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
                    {artwork.description}
                  </p>
                </div>

                {/* Footer specs */}
                <div className="mt-4 pt-4 border-t border-stone-gray/20">
                  <div className="flex items-center justify-between text-[11px] text-charcoal-500">
                    <span className="truncate max-w-[170px]" title={artwork.medium}>
                      {artwork.medium}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectArtwork(artwork);
                      }}
                      className="text-terracotta hover:text-terracotta-dark font-semibold inline-flex items-center gap-1"
                    >
                      Examine →
                    </button>
                  </div>
                  
                  {/* Image Credit Snippet */}
                  <div className="mt-2 text-[10px] text-stone-dark truncate">
                    Credit: {artwork.credit}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
