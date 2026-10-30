import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import { groupInfo } from '../data/creatorsData';
import { Award, User, GraduationCap, Quote, CheckCircle2, Maximize2, X, ZoomIn } from 'lucide-react';

export default function MeetTheCreators() {
  const [selectedMember, setSelectedMember] = useState(null);

  // Keyboard accessibility: ESC to close
  useEffect(() => {
    if (!selectedMember) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedMember(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMember]);

  return (
    <section id="creators" className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          tag="Meet the Creators"
          title="The Curators Behind SCULPTURA"
          subtitle="Designed and developed for our Art Appreciation Midterm Project on Sculpture. Meet our student team and our course instructor."
        />

        {/* INSTRUCTOR SPOTLIGHT CARD */}
        <div className="max-w-4xl mx-auto mb-16 bg-white rounded-3xl border border-stone-gray/30 p-8 sm:p-10 shadow-museum">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Instructor Photo */}
            <div className="md:col-span-4 flex flex-col items-center">
              <button
                type="button"
                onClick={() => setSelectedMember({
                  ...groupInfo.instructor,
                  avatar: groupInfo.instructor.photo,
                  role: groupInfo.instructor.role,
                  contribution: groupInfo.instructor.mostUsedLines || [groupInfo.instructor.message],
                  memberNumber: null
                })}
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-ivory border-2 border-stone-gray/40 shadow-md relative group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-terracotta"
                title="Click to view full photo"
              >
                <img
                  src={groupInfo.instructor.photo}
                  alt={groupInfo.instructor.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs gap-1">
                  <ZoomIn className="w-6 h-6" />
                  <span className="font-medium text-[11px]">View Photo</span>
                </div>
              </button>
            </div>

            {/* Instructor Credentials */}
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-olive-50 border border-olive/30 text-olive-dark text-[11px] font-bold uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Faculty Mentor & Evaluator</span>
              </div>

              <h3 className="font-display-serif text-2xl sm:text-3xl font-bold text-charcoal">
                {groupInfo.instructor.name}
              </h3>
              
              <p className="text-xs font-semibold text-terracotta uppercase tracking-wider">
                {groupInfo.instructor.role}
              </p>

              <div className="bg-ivory/60 p-4 rounded-xl border border-stone-gray/20">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block mb-2">
                  Most Used Lines:
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-charcoal-700 font-light italic">
                  {(groupInfo.instructor.mostUsedLines || [groupInfo.instructor.message]).map((line, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0"></span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 text-[11px] text-charcoal-500 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-olive" />
                <span>Course: Art Appreciation (GE-Art App) • Midterm Project 2026</span>
              </div>
            </div>

          </div>
        </div>

        {/* STUDENT MEMBERS GRID */}
        <div>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-olive-dark">
              Student Development Team
            </span>
            <h3 className="font-display-serif text-3xl font-bold text-charcoal mt-1">
              Members & Contributions
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2 max-w-2xl mx-auto">
              Our student team collaborating across research, curation, 3D WebGL engineering, database architecture, and educational activities. Click any photo to view in high resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {groupInfo.members.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-stone-gray/30 p-6 shadow-xs hover:border-terracotta/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge: Member Number */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-olive-dark bg-olive/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Member {member.memberNumber}
                    </span>
                    <span className="text-[10px] text-charcoal-400 italic">
                      Click photo to enlarge
                    </span>
                  </div>

                  {/* Avatar & Role Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => setSelectedMember(member)}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-ivory border-2 border-stone-gray/30 shadow-xs shrink-0 group relative cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-terracotta transition-transform hover:scale-105"
                      title={`Click to view ${member.name}'s photo`}
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-300"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=C86E4B&color=fff&size=150`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <ZoomIn className="w-5 h-5 drop-shadow-sm" />
                      </div>
                    </button>
                    <div>
                      <h4 className="font-display-serif text-lg font-bold text-charcoal leading-snug">
                        {member.name}
                      </h4>
                      <span className="text-xs font-semibold text-terracotta block mt-1 leading-snug">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Contribution */}
                  <div className="text-xs text-charcoal-700 leading-relaxed mb-4 bg-ivory/50 p-3.5 rounded-xl border border-stone-gray/20">
                    <span className="font-bold text-charcoal block mb-1">Assigned Contribution:</span>
                    <p>{member.contribution}</p>
                  </div>
                </div>

                {/* Favorite Quote */}
                {member.favoriteQuote && (
                  <div className="pt-3 border-t border-stone-gray/20 text-[11px] text-charcoal-500 font-academic italic">
                    {member.favoriteQuote}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FULL-SIZE PHOTO LIGHTBOX MODAL (Landscape Orientation) */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedMember(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedMember.name}'s profile`}
        >
          <div 
            className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl border border-stone-gray/30 p-6 sm:p-8 animate-scaleUp max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-charcoal/10 hover:bg-charcoal/20 text-charcoal flex items-center justify-center transition-colors cursor-pointer z-20"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              
              {/* Left Column: Landscape Photo Container */}
              <div className="md:col-span-5 flex items-center justify-center">
                <div className="w-full aspect-4/5 sm:aspect-square md:aspect-3/4 rounded-2xl overflow-hidden bg-[#F5F1E8] border border-stone-gray/30 shadow-md relative">
                  <img
                    src={selectedMember.avatar}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember.name)}&background=C86E4B&color=fff&size=400`;
                    }}
                  />
                </div>
              </div>

              {/* Right Column: Information & Assigned Contribution */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center justify-between pr-8">
                  <span className="text-xs font-bold text-olive-dark bg-olive/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedMember.memberNumber ? `Member ${selectedMember.memberNumber}` : 'Faculty Instructor'}
                  </span>
                </div>

                <div>
                  <h3 className="font-display-serif text-2xl sm:text-3xl font-bold text-charcoal leading-tight">
                    {selectedMember.name}
                  </h3>
                  <p className="text-sm font-semibold text-terracotta mt-1">
                    {selectedMember.role}
                  </p>
                </div>

                <div className="bg-ivory/70 p-4 sm:p-5 rounded-2xl border border-stone-gray/20 text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                  <span className="font-bold text-charcoal block mb-2 text-xs uppercase tracking-wider text-charcoal-900">
                    {selectedMember.memberNumber ? 'Assigned Contribution:' : 'Most Used Lines:'}
                  </span>
                  {Array.isArray(selectedMember.contribution) ? (
                    <ul className="space-y-1.5 font-light italic">
                      {selectedMember.contribution.map((line, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0"></span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-charcoal-700">{selectedMember.contribution}</p>
                  )}
                </div>

                {selectedMember.favoriteQuote && (
                  <div className="pt-2">
                    <p className="text-xs text-charcoal-500 font-academic italic border-l-2 border-terracotta/40 pl-3 py-1">
                      {selectedMember.favoriteQuote}
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}
