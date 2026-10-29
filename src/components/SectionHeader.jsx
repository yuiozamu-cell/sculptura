import React from 'react';

export default function SectionHeader({ 
  tag, 
  title, 
  subtitle, 
  centered = true,
  className = '' 
}) {
  return (
    <div className={`mb-12 ${centered ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}>
      {tag && (
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-5 h-[1px] bg-terracotta"></span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-terracotta">
            {tag}
          </span>
          <span className="w-5 h-[1px] bg-terracotta"></span>
        </div>
      )}
      <h2 className="font-display-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-charcoal-600 font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
