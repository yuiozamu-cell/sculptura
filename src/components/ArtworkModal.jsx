import React, { useEffect } from 'react';
import { X, ExternalLink, MessageSquare, Info, MapPin, Calendar, Hammer, Layers, Maximize2 } from 'lucide-react';

export default function ArtworkModal({ artwork, onClose, onCommentClick }) {
  useEffect(() => {
    if (!artwork) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [artwork, onClose]);

  if (!artwork) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#FAF8F4] border border-stone-gray/40 rounded-2xl shadow-2xl overflow-y-auto flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-charcoal/60 text-white hover:bg-terracotta transition-colors shadow-md focus:outline-hidden focus:ring-2 focus:ring-white"
          aria-label="Close artwork details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Side */}
        <div className="w-full md:w-1/2 bg-charcoal-900 flex flex-col items-center justify-center p-6 relative min-h-[320px] md:min-h-full">
          <img 
            src={artwork.image} 
            alt={artwork.title}
            onError={(e) => {
              if (artwork.highResImage && e.target.src !== artwork.highResImage) {
                e.target.src = artwork.highResImage;
              }
            }}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
          />
          <div className="mt-4 text-center">
            <p className="text-xs text-stone-light/80 italic">
              {artwork.caption}
            </p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-[10px] text-stone-gray uppercase tracking-wider">
                Source: {artwork.credit}
              </span>
              {artwork.creditUrl && artwork.creditUrl.startsWith('http') && (
                <a 
                  href={artwork.creditUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-terracotta-light hover:underline inline-flex items-center gap-0.5 text-[10px]"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right: Content Side */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header info */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-terracotta bg-terracotta-50 px-2.5 py-1 rounded-full border border-terracotta/20">
                {artwork.type || 'Sculpture'}
              </span>
              <span className="text-xs text-charcoal-500 font-medium">
                {artwork.period}
              </span>
            </div>

            <h3 id="modal-title" className="font-display-serif text-2xl sm:text-3xl font-bold text-charcoal mb-1">
              {artwork.title}
            </h3>
            <p className="text-sm font-medium text-olive-dark mb-4">
              By {artwork.artist} ({artwork.year})
            </p>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-gray/20 my-4 text-xs">
              <div>
                <span className="block text-charcoal-400 font-medium uppercase tracking-wider text-[10px]">
                  Medium
                </span>
                <span className="text-charcoal font-semibold">{artwork.medium}</span>
              </div>
              <div>
                <span className="block text-charcoal-400 font-medium uppercase tracking-wider text-[10px]">
                  Technique
                </span>
                <span className="text-charcoal font-semibold">{artwork.technique}</span>
              </div>
              <div>
                <span className="block text-charcoal-400 font-medium uppercase tracking-wider text-[10px]">
                  Location
                </span>
                <span className="text-charcoal font-semibold">{artwork.location}</span>
              </div>
              <div>
                <span className="block text-charcoal-400 font-medium uppercase tracking-wider text-[10px]">
                  Dimensions
                </span>
                <span className="text-charcoal font-semibold">{artwork.dimensions}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 text-sm text-charcoal-700 leading-relaxed">
              <p>{artwork.description}</p>
              
              {/* Curatorial Context Box */}
              <div className="bg-olive-50 border-l-3 border-olive p-3 rounded-r-md text-xs text-charcoal-800">
                <span className="font-bold text-olive-dark block mb-1">
                  Curatorial Analysis & Historical Significance:
                </span>
                {artwork.moduleSignificance}
              </div>

              {/* Reflection */}
              {artwork.reflectionPrompt && (
                <div className="bg-terracotta-50/70 border border-terracotta/20 p-3 rounded-lg text-xs text-charcoal-800">
                  <span className="font-bold text-terracotta block mb-1">
                    Visitor Hermeneutic Inquiry:
                  </span>
                  <p className="italic">"{artwork.reflectionPrompt}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-6 pt-4 border-t border-stone-gray/20 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                if (onCommentClick) onCommentClick(artwork.id);
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-terracotta text-white font-medium text-xs hover:bg-terracotta-dark transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              Discuss on Community Wall
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-stone-gray/40 text-charcoal font-medium text-xs hover:bg-stone-gray/20 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
