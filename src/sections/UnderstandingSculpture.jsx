import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { glossaryData } from '../data/glossaryData';
import { 
  BookOpen, 
  Layers, 
  Hammer, 
  Compass, 
  ShieldCheck, 
  Eye, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Scroll,
  HelpCircle
} from 'lucide-react';

export default function UnderstandingSculpture() {
  const [activeTab, setActiveTab] = useState('origins');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter glossary
  const categories = ['All', 'Style & Theory', 'Design & Process', 'Technique & Reproduction', 'Types & Form', 'Materials', 'Structure & Mechanics'];
  
  const filteredGlossary = glossaryData.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.moduleDirectQuote.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="understanding" className="py-24 bg-[#FAF8F4] border-t border-b border-stone-gray/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          tag="Foundations of 3D Art"
          title="Understanding Sculpture"
          subtitle="Explore the origins, significance, structural types, techniques, and foundational terminology of sculptural art across history."
        />

        {/* Pillar Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'origins', label: 'The Origin & History', icon: Scroll },
            { id: 'importance', label: 'Importance & Role', icon: Eye },
            { id: 'types', label: 'Types of Sculptures', icon: Layers },
            { id: 'techniques', label: 'Medium & Techniques', icon: Hammer },
            { id: 'glossary', label: 'Terminology & Concepts', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-terracotta text-white shadow-md'
                    : 'bg-white border border-stone-gray/40 text-charcoal hover:border-terracotta hover:text-terracotta'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="bg-white rounded-2xl border border-stone-gray/30 p-6 sm:p-10 shadow-museum">
          
          {/* TAB 1: THE ORIGIN OF SCULPTURE */}
          {activeTab === 'origins' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-stone-gray/20 pb-6">
                <h3 className="font-display-serif text-3xl font-bold text-charcoal">
                  The Origin & Ancient Development of Sculpture
                </h3>
              </div>

              {/* Etymology & Perception Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-ivory-50 p-6 rounded-xl border border-stone-gray/30">
                  <span className="text-xs font-bold text-olive-dark uppercase tracking-wider block mb-2">
                    Etymological Roots
                  </span>
                  <h4 className="font-display-serif text-xl font-bold text-charcoal mb-2">
                    From the Latin <em className="text-terracotta">“Sculpere”</em>
                  </h4>
                  <p className="text-sm text-charcoal-700 leading-relaxed">
                    The word sculpture originates from the Latin verb <strong>sculpere</strong>, which translates directly 
                    as <em>“to carve.”</em> Throughout human history, the tools and implements employed by sculptors have continually 
                    evolved—from prehistoric flint hand-axes to modern bronze foundries and welded assemblies.
                  </p>
                </div>

                <div className="bg-ivory-50 p-6 rounded-xl border border-stone-gray/30">
                  <span className="text-xs font-bold text-olive-dark uppercase tracking-wider block mb-2">
                    Perceptual Difference • Sheldon (1968)
                  </span>
                  <h4 className="font-display-serif text-xl font-bold text-charcoal mb-2">
                    Occupying Space as a Three-Dimensional Mass
                  </h4>
                  <p className="text-sm text-charcoal-700 leading-relaxed">
                    As art scholar <strong>Sheldon (1968)</strong> observed, sculpture engages our human senses fundamentally 
                    differently than paintings. Because it occupies physical space as a tangible 3D mass through carving, casting, 
                    modeling, or assembling materials, it demands our spatial awareness from changing perspectives.
                  </p>
                </div>
              </div>

              {/* Materials Hierarchy */}
              <div className="p-6 bg-white rounded-xl border border-stone-gray/30">
                <h4 className="font-display-serif text-lg font-bold text-charcoal mb-3">
                  Historical & Traditional Sculptural Materials
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-ivory rounded-lg">
                    <span className="font-bold text-terracotta block mb-1">Permanent & Durable</span>
                    <p className="text-charcoal-600">Bronze, granite, limestone, marble, and native stone, sought for monumental permanence.</p>
                  </div>
                  <div className="p-3 bg-ivory rounded-lg">
                    <span className="font-bold text-terracotta block mb-1">Precious & Rare (Chryselephantine)</span>
                    <p className="text-charcoal-600">Precious gold, ivory, jade, and silver, historically utilized for sacred chryselephantine masterworks.</p>
                  </div>
                  <div className="p-3 bg-ivory rounded-lg">
                    <span className="font-bold text-terracotta block mb-1">Broader Consumption</span>
                    <p className="text-charcoal-600">Cast metals, ceramics, kiln glass, and hardwoods engineered for accessible and civic art.</p>
                  </div>
                </div>
              </div>

              {/* Prehistoric & Egyptian Case Studies */}
              <div>
                <h4 className="font-display-serif text-2xl font-bold text-charcoal mb-4">
                  Foundational Historical Case Studies
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Löwenmensch Case Study */}
                  <div className="border border-stone-gray/30 rounded-xl p-5 hover:border-terracotta/40 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-olive-dark bg-olive/10 px-2 py-0.5 rounded-sm">
                        30,000 BCE • Upper Paleolithic
                      </span>
                    </div>
                    <h5 className="font-display-serif text-lg font-bold text-charcoal">
                      Löwenmensch (Lion-Human of Hohlenstein-Stadel)
                    </h5>
                    <p className="text-xs text-charcoal-600 mt-2 leading-relaxed">
                      Discovered in a cave in Hohlenstein-Stadel, Germany, this 12-inch mammoth ivory statuette is one of the oldest 
                      known sculptures in archaeological history. Depicting a human figure with a feline face, it demonstrates that 
                      the earliest sculptures were made to supply magical aid to hunters/trackers, represent ancient deities, and satisfy 
                      the spiritual hunger to manifest unseen powers (Witcombe, 1997).
                    </p>
                  </div>

                  {/* Great Sphinx Case Study */}
                  <div className="border border-stone-gray/30 rounded-xl p-5 hover:border-terracotta/40 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-olive-dark bg-olive/10 px-2 py-0.5 rounded-sm">
                        c. 2500 BCE • Old Kingdom Egypt
                      </span>
                    </div>
                    <h5 className="font-display-serif text-lg font-bold text-charcoal">
                      The Great Sphinx of Giza
                    </h5>
                    <p className="text-xs text-charcoal-600 mt-2 leading-relaxed">
                      Measuring <strong>240 feet long and 65 feet high</strong>, this colossal sandstone monolith depicts the portrait 
                      of Pharaoh Khafre joined to the crouching body of a lion. Historical records highlight that Egyptian art was founded upon 
                      belief in life after death; combining the pharaoh’s head with a lion’s body synthesized 
                      <strong>human intelligence with animal strength</strong> to guard the pharaoh's funerary complex for eternity.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IMPORTANCE OF SCULPTURE */}
          {activeTab === 'importance' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-stone-gray/20 pb-6">
                <h3 className="font-display-serif text-3xl font-bold text-charcoal">
                  The Aesthetic, Societal & Personal Importance of Sculpture
                </h3>
              </div>

              {/* Core Definition of Importance */}
              <div className="bg-terracotta-50/60 p-6 rounded-xl border border-terracotta/30">
                <h4 className="font-display-serif text-xl font-bold text-terracotta-dark mb-2">
                  “A Perceptive-Regeneration of Reality”
                </h4>
                <p className="text-sm text-charcoal-800 leading-relaxed">
                  Sculpture is defined as <em>“a perceptive-regeneration of reality through the use of three-dimensional form.”</em> 
                  As a specialized fine art, its core objective is to <strong>exemplify an abstract concept by forming a physical visual equivalent</strong>. 
                  Because shape is the dominant characteristic of sculptural art, the human anatomy and animal forms have historically served 
                  as its primary and most resonant subject matters.
                </p>
              </div>

              {/* 4 Societal Dimensions of Sculpture */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-white border border-stone-gray/30 rounded-xl shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-bold text-sm mb-3">
                    01
                  </div>
                  <h5 className="font-bold text-charcoal text-sm mb-1">Religious Devotion</h5>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    Manifesting deities, spiritual protectors, and sacred veneration, bridging the earthly realm with transcendent faith.
                  </p>
                </div>

                <div className="p-5 bg-white border border-stone-gray/30 rounded-xl shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-olive/10 text-olive flex items-center justify-center font-bold text-sm mb-3">
                    02
                  </div>
                  <h5 className="font-bold text-charcoal text-sm mb-1">Patriotism & Pride</h5>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    Erected in public squares to commemorate civic heroism, revolution, national identity, and moral sacrifice (e.g. Castrillo’s monument).
                  </p>
                </div>

                <div className="p-5 bg-white border border-stone-gray/30 rounded-xl shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-stone-gray/30 text-charcoal flex items-center justify-center font-bold text-sm mb-3">
                    03
                  </div>
                  <h5 className="font-bold text-charcoal text-sm mb-1">Personal Expression</h5>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    Reflecting an individual artist’s psychological state, contemplation, philosophical query, and aesthetic exploration.
                  </p>
                </div>

                <div className="p-5 bg-white border border-stone-gray/30 rounded-xl shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-charcoal/10 text-charcoal flex items-center justify-center font-bold text-sm mb-3">
                    04
                  </div>
                  <h5 className="font-bold text-charcoal text-sm mb-1">Cultural & Economic Value</h5>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    Integral museum pieces, architectural adornment in homes/offices, and enduring, valuable historical art investments.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TYPES OF SCULPTURES */}
          {activeTab === 'types' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-stone-gray/20 pb-6">
                <h3 className="font-display-serif text-3xl font-bold text-charcoal">
                  The Three Structural Types of Sculptures
                </h3>
                <p className="text-sm text-charcoal-600 mt-1">
                  Sculpture is classified structurally into three distinct primary categories: Bust, Statue, and Architectural.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Bust */}
                <div className="border border-stone-gray/30 rounded-xl p-6 bg-white hover:shadow-md transition-shadow">
                  <span className="text-xs font-bold uppercase tracking-widest text-terracotta block mb-2">
                    Type 01
                  </span>
                  <h4 className="font-display-serif text-2xl font-bold text-charcoal mb-2">
                    Bust
                  </h4>
                  <p className="text-xs text-charcoal-600 mb-4 leading-relaxed">
                    <em>“A bust is a sculpted and painted representation of the upper part of the human figure such as the head, neck, shoulders, chest or breast.”</em>
                  </p>
                  <div className="p-3 bg-ivory rounded-lg text-xs space-y-1">
                    <span className="font-semibold text-charcoal block">Key Characteristic:</span>
                    <p className="text-charcoal-600">Focuses intimately on facial expression, character, psychological presence, and identity.</p>
                  </div>
                </div>

                {/* 2. Statue */}
                <div className="border border-terracotta/40 rounded-xl p-6 bg-terracotta-50/20 hover:shadow-md transition-shadow">
                  <span className="text-xs font-bold uppercase tracking-widest text-terracotta block mb-2">
                    Type 02
                  </span>
                  <h4 className="font-display-serif text-2xl font-bold text-charcoal mb-2">
                    Statue
                  </h4>
                  <p className="text-xs text-charcoal-600 mb-4 leading-relaxed">
                    <em>“A statue is a life-size or a larger size of a sculpture of a person or an animal, made of metal, stone or wood.”</em>
                  </p>
                  <div className="p-3 bg-white border border-stone-gray/20 rounded-lg text-xs space-y-1">
                    <span className="font-semibold text-terracotta block">Monumental Exemplar:</span>
                    <p className="text-charcoal-600">
                      The <strong>Spring Temple Buddha in Henan, China</strong> standing at <strong>420 feet (128 meters)</strong> exemplifies colossal assembled statuary.
                    </p>
                  </div>
                </div>

                {/* 3. Architectural */}
                <div className="border border-stone-gray/30 rounded-xl p-6 bg-white hover:shadow-md transition-shadow">
                  <span className="text-xs font-bold uppercase tracking-widest text-olive-dark block mb-2">
                    Type 03
                  </span>
                  <h4 className="font-display-serif text-2xl font-bold text-charcoal mb-2">
                    Architectural
                  </h4>
                  <p className="text-xs text-charcoal-600 mb-4 leading-relaxed">
                    <em>“A universal classification used to describe a structural design such as bridges, burial chambers and other big projects.”</em>
                  </p>
                  <div className="p-3 bg-ivory rounded-lg text-xs space-y-1">
                    <span className="font-semibold text-charcoal block">Materials Specified:</span>
                    <p className="text-charcoal-600">Carved brownstone, cast iron, machine-pressed sheet zinc, terra cotta, and reinforced concrete.</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: MEDIUM AND TECHNIQUES */}
          {activeTab === 'techniques' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-stone-gray/20 pb-6">
                <h3 className="font-display-serif text-3xl font-bold text-charcoal">
                  Sculptural Medium & The Four Basic Techniques
                </h3>
                <p className="text-sm text-charcoal-600 mt-1">
                  All sculptural procedures are categorized as either <strong>Subtractive</strong> (material is removed/carved away) 
                  or <strong>Additive</strong> (material is built up or joined together).
                </p>
              </div>

              {/* Additive vs Subtractive Indicator */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-terracotta-50 rounded-xl border border-terracotta/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-terracotta text-white flex items-center justify-center font-bold text-lg">
                    −
                  </div>
                  <div>
                    <h5 className="font-bold text-charcoal text-sm">Subtractive Procedures</h5>
                    <p className="text-xs text-charcoal-600">Material is systematically cut away, carved, chipped, or incised from a raw solid mass.</p>
                  </div>
                </div>

                <div className="p-4 bg-olive-50 rounded-xl border border-olive/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-olive text-white flex items-center justify-center font-bold text-lg">
                    +
                  </div>
                  <div>
                    <h5 className="font-bold text-charcoal text-sm">Additive Procedures</h5>
                    <p className="text-xs text-charcoal-600">Material is gradually gathered, accumulated, built up by hand, poured into dies, or joined together.</p>
                  </div>
                </div>
              </div>

              {/* The 4 Techniques */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                
                {/* 1. Carving */}
                <div className="p-6 border border-stone-gray/30 rounded-xl bg-white shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display-serif text-xl font-bold text-charcoal">
                      1. Carving (Subtractive)
                    </h4>
                    <span className="text-[10px] font-bold text-terracotta bg-terracotta/10 px-2.5 py-0.5 rounded-full uppercase">
                      Subtractive
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-600 mb-4">
                    Artists cut away objects until reaching the desired form through planned tool usage.
                  </p>
                  <div className="space-y-2 text-xs border-t border-stone-gray/20 pt-3">
                    <p><strong>a. Stone Carving:</strong> Requires patience and meticulous planning; shaping rough natural stone with hammer and chisel.</p>
                    <p><strong>b. Wood Carving:</strong> Shaping wood with specialized tools: the <em>carving knife</em> (cut and smooth), the <em>slicer saw</em> (cut chunks), the <em>chisel</em> (lines and flat surfaces), and the <em>gouge</em> (carving hollows, rounds, and sweeping curves).</p>
                  </div>
                </div>

                {/* 2. Casting */}
                <div className="p-6 border border-stone-gray/30 rounded-xl bg-white shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display-serif text-xl font-bold text-charcoal">
                      2. Casting (Additive / Reproductive)
                    </h4>
                    <span className="text-[10px] font-bold text-olive bg-olive/10 px-2.5 py-0.5 rounded-full uppercase">
                      Liquid & Mold
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-600 mb-4">
                    Liquid material is poured into a frame or pattern containing a hollow cavity of the desired shape, then allowed to harden.
                  </p>
                  <div className="space-y-2 text-xs border-t border-stone-gray/20 pt-3">
                    <p><strong>a. Glass Casting:</strong> Pouring and shaping molten silica glass into refractory molds.</p>
                    <p><strong>b. Slip Casting:</strong> A specialized mass-production technique for pottery, especially for complex or hollow shapes not easily produced on a potter's wheel.</p>
                  </div>
                </div>

                {/* 3. Molding */}
                <div className="p-6 border border-stone-gray/30 rounded-xl bg-white shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display-serif text-xl font-bold text-charcoal">
                      3. Molding (Additive)
                    </h4>
                    <span className="text-[10px] font-bold text-terracotta bg-terracotta/10 px-2.5 py-0.5 rounded-full uppercase">
                      Tactile & Plastic
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    Working soft, ductile, or plastic materials—such as clay, terracotta, and wax—entirely by hand or with modeling spatulas to build up, manipulate, and shape a volumetric form.
                  </p>
                </div>

                {/* 4. Assembling */}
                <div className="p-6 border border-stone-gray/30 rounded-xl bg-white shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display-serif text-xl font-bold text-charcoal">
                      4. Assembling (Additive)
                    </h4>
                    <span className="text-[10px] font-bold text-olive bg-olive/10 px-2.5 py-0.5 rounded-full uppercase">
                      Construction
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    The additive process of gathering and joining disparate materials (scraps, junk, industrial metal) to create an assembled artwork.
                  </p>
                  <div className="mt-3 p-2.5 bg-ivory rounded-md text-[11px] text-charcoal-700">
                    <strong>Curatorial Example:</strong> Martin Puryear’s network of welded, sandblasted stainless steel tubes bound together by strands of silver and patented bronze.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 5: BASIC SCULPTURE TERMS & CONCEPTS */}
          {activeTab === 'glossary' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-stone-gray/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h3 className="font-display-serif text-3xl font-bold text-charcoal">
                    Sculpture Vocabulary & Conceptual Dictionary
                  </h3>
                  <p className="text-sm text-charcoal-600 mt-1">
                    Comprehensive glossary featuring all foundational sculpture terms and definitions.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-charcoal-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search terms, definitions..."
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-stone-gray/40 bg-ivory/50 focus:bg-white focus:outline-hidden focus:border-terracotta"
                  />
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      selectedCategory === cat
                        ? 'bg-charcoal text-white'
                        : 'bg-ivory text-charcoal-600 hover:bg-stone-gray/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Glossary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {filteredGlossary.map((item) => (
                  <div 
                    key={item.term} 
                    className="border border-stone-gray/30 rounded-xl p-4 bg-ivory/30 hover:bg-white hover:border-terracotta/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-display-serif text-lg font-bold text-charcoal">
                          {item.term}
                        </span>
                        <span className="text-[10px] font-semibold text-olive-dark bg-olive/10 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      
                      <p className="text-xs text-charcoal-700 leading-relaxed mt-2">
                        {item.definition}
                      </p>
                      
                      <div className="mt-3 p-2.5 bg-white/80 rounded-md border-l-2 border-terracotta text-[11px] text-charcoal-600 italic">
                        “{item.moduleDirectQuote}”
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-gray/20 flex items-center justify-between text-[10px] text-charcoal-400">
                      <span>Curatorial Domain: {item.moduleReference}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-olive" />
                    </div>
                  </div>
                ))}
              </div>

              {filteredGlossary.length === 0 && (
                <div className="text-center py-12 text-charcoal-500 text-sm">
                  No terminology matched your search "{searchTerm}".
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
