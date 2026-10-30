import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { Quote, BookOpen, Feather, Sparkles, MessageCircle, Send, Check } from 'lucide-react';

export default function Reflection() {
  const postTestReflections = [
    {
      qNum: '01',
      question: 'Why is sculpture considered one of the most popular forms of fine arts?',
      reflection: 'Sculpture is celebrated because it shares the physical reality that we inhabit. Unlike two-dimensional paintings that create an optical illusion of depth on a flat plane, sculpture is a tangible, three-dimensional presence. As noted by Sheldon (1968), it occupies physical space as mass, allowing viewers to walk around it, experience shifting shadows, and feel its scale. It transforms inanimate stone, metal, and earth into enduring vessels of human memory and emotion.'
    },
    {
      qNum: '02',
      question: 'What are the interpretations that are commonly expressed in sculpture?',
      reflection: 'Historically, sculpture has been used to embody society’s most vital concerns: spiritual reverence, morality, and political consciousness (Witcombe, 1997). Sculptural works express human triumph, sorrow, philosophical contemplation (like Rodin’s Thinker), collective liberation (like Castrillo’s People Power Monument), and the quest for immortality (as in Egyptian funerary complexes). It gives concrete physical form to ideas that would otherwise remain abstract.'
    },
    {
      qNum: '03',
      question: 'If you are a sculptor, what technique and medium do you like most?',
      reflection: 'Our group is drawn to subtractive stone carving using Carrara marble. There is profound poetry in Michelangelo’s philosophy that the statue is already captive within the raw block, waiting for the sculptor to chip away excess stone. The tactile resistance of natural rock demands patience, foresight, and absolute focus, resulting in an artwork that can outlast millennia.'
    },
    {
      qNum: '04',
      question: 'What are the goals of an artist in creating a sculpture?',
      reflection: 'At its core philosophical foundation, the objective of sculpture is to “exemplify a concept by forming a visual equivalent.” The artist seeks to regenerate reality perceptually—communicating complex emotions, sacred mythologies, or cultural ideals through volume, proportion, and tactile balance. A successful sculpture does not merely depict an object; it commands space and provokes contemplation.'
    },
    {
      qNum: '05',
      question: 'Explain how sculpture is associated with Religion and the Military.',
      reflection: 'Sculpture has been intrinsically linked to Religion and the Military since prehistoric antiquity. Religiously, it supplied hunting talismans (the Paleolithic Löwenmensch), housed the divine spirits of Egyptian kings (The Great Sphinx), and provided monumental icons of faith (Christ the Redeemer). Militarily and politically, monumental sculptures celebrate national defense, heroic commanders, and historic revolutions—instilling patriotism, civic courage, and reverence for collective sacrifice.'
    }
  ];

  const [visitorNotes, setVisitorNotes] = useState('');
  const [visitorSaved, setVisitorSaved] = useState(false);

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!visitorNotes.trim()) return;
    setVisitorSaved(true);
    setTimeout(() => setVisitorSaved(false), 3000);
  };

  return (
    <section id="reflection" className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          tag="Art Appreciation Reflection"
          title="Where Form Becomes Meaning"
          subtitle="Critical group synthesis examining the essential dimensions of sculpture: how spatial form, tactile materials, and monumental scale shape human culture."
        />

        {/* Central Quote Callout */}
        <div className="max-w-4xl mx-auto mb-16 bg-white p-8 sm:p-10 rounded-3xl border border-stone-gray/30 shadow-museum text-center relative overflow-hidden">
          <Quote className="w-12 h-12 text-terracotta/20 mx-auto mb-4" />
          <p className="font-academic italic text-xl sm:text-2xl text-charcoal-800 leading-relaxed">
            “The sculpture is a perceptive-regeneration of reality through the use of three-dimensional form. 
            Its objective is to exemplify a concept by forming a visual equivalent.”
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-terracotta">
            <span>Curatorial Axiom</span>
            <span>•</span>
            <span>Arnulfo B. Ramos (2018)</span>
          </div>
        </div>

        {/* 5 Post-Test Analytical Inquiries */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <h3 className="font-display-serif text-2xl font-bold text-charcoal mb-6 text-center">
            Critical Hermeneutic Synthesis & Inquiries
          </h3>

          {postTestReflections.map((item) => (
            <div 
              key={item.qNum}
              className="bg-white rounded-2xl border border-stone-gray/30 p-6 sm:p-8 hover:border-terracotta/40 transition-colors shadow-xs"
            >
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-full bg-ivory border border-stone-gray/30 text-terracotta font-bold text-sm flex items-center justify-center shrink-0">
                  {item.qNum}
                </span>
                <div className="space-y-2">
                  <h4 className="font-display-serif text-lg sm:text-xl font-bold text-charcoal">
                    {item.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
                    {item.reflection}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Visitor Reflection Journal */}
        <div className="mt-16 max-w-3xl mx-auto bg-white rounded-3xl border border-stone-gray/30 p-6 sm:p-10 shadow-museum">
          <div className="flex items-center gap-2 mb-2">
            <Feather className="w-5 h-5 text-terracotta" />
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
              Personal Hermeneutic Journal
            </span>
          </div>

          <h4 className="font-display-serif text-2xl font-bold text-charcoal mb-2">
            Your Personal Art Appreciation Note
          </h4>
          <p className="text-xs text-charcoal-600 mb-4 leading-relaxed">
            Consider the surface of raw stone, soft soap, or welded bronze. How does the physical texture of a sculpture 
            influence your emotional thoughts?
          </p>

          <form onSubmit={handleSaveNote} className="space-y-3">
            <textarea
              rows={3}
              value={visitorNotes}
              onChange={(e) => setVisitorNotes(e.target.value)}
              placeholder="Reflect on your experience touring SCULPTURA..."
              className="w-full p-4 rounded-xl border border-stone-gray/40 text-xs text-charcoal bg-ivory/30 focus:bg-white focus:outline-hidden focus:border-terracotta leading-relaxed"
            ></textarea>
            
            <div className="flex items-center justify-between">
              {visitorSaved && (
                <span className="text-xs text-emerald-700 flex items-center gap-1 font-medium animate-fadeIn">
                  <Check className="w-3.5 h-3.5" /> Note recorded locally in session!
                </span>
              )}
              <div className="ml-auto">
                <a
                  href="#community-wall"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-terracotta text-white font-medium text-xs hover:bg-terracotta-dark transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Share Thought on Community Wall</span>
                </a>
              </div>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
