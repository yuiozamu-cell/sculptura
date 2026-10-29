import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ArtworkModal from './components/ArtworkModal';

import Hero from './sections/Hero';
import UnderstandingSculpture from './sections/UnderstandingSculpture';
import Gallery from './sections/Gallery';
import ArtistSpotlight from './sections/ArtistSpotlight';
import InteractiveZone from './sections/InteractiveZone';
import DigitalStudio from './sections/DigitalStudio';
import Reflection from './sections/Reflection';
import CommunityWall from './sections/CommunityWall';
import MeetTheCreators from './sections/MeetTheCreators';
import References from './sections/References';

export default function App() {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [communityArtworkFilter, setCommunityArtworkFilter] = useState('all');

  const handleOpenCommentForArtwork = (artworkId) => {
    setSelectedArtwork(null);
    setCommunityArtworkFilter(artworkId || 'general');
    const wallElem = document.getElementById('community-wall');
    if (wallElem) {
      wallElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal">
      {/* Top Fixed Museum Navbar */}
      <Navbar />

      {/* Main Museum Body */}
      <main className="flex-1">
        {/* Section A: Museum Entrance / Hero */}
        <Hero onExploreClick={() => {
          const el = document.getElementById('understanding');
          el?.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* Section B: Understanding Sculpture (Origins, Importance, Types, Techniques, Glossary) */}
        <UnderstandingSculpture />

        {/* Section C: Curated Sculpture Gallery */}
        <Gallery 
          onSelectArtwork={(art) => setSelectedArtwork(art)}
          onCommentClick={handleOpenCommentForArtwork}
        />

        {/* Section D: Artist Spotlight (Michelangelo & David Subtractive Mastery) */}
        <ArtistSpotlight 
          onCommentClick={handleOpenCommentForArtwork}
        />

        {/* Section E: Interactive Learning Zone (Quiz, Matching, Detective, Decode) */}
        <InteractiveZone />

        {/* Section F: Digital Sculpture Studio (Original Creative Output) */}
        <DigitalStudio />

        {/* Section G: Art Appreciation Reflection (Post-Test & Hermeneutic Journal) */}
        <Reflection />

        {/* Section IV Challenge: Shared Supabase PostgreSQL Community Wall */}
        <CommunityWall 
          initialArtworkFilter={communityArtworkFilter}
        />

        {/* Section H: Meet the Creators (Group 6 & Course Instructor) */}
        <MeetTheCreators />

        {/* Section I: APA 7 References & Image Credits */}
        <References />
      </main>

      {/* Global Artwork Detail Modal */}
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          onCommentClick={handleOpenCommentForArtwork}
        />
      )}

      {/* Museum Footer */}
      <Footer />
    </div>
  );
}
