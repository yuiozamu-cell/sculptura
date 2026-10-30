/**
 * SCULPTURA - Interactive Sculpture Quiz
 * 12 Questions grounded in art history, foundational terminology,
 * and classical sculptural techniques (Arnulfo B. Ramos, 2018).
 */

export const quizQuestions = [
  {
    id: 1,
    question: 'From which Latin root word does the term "Sculpture" originate, and what does it literally mean?',
    options: [
      { id: 'A', text: 'Sculpere — meaning "to carve"' },
      { id: 'B', text: 'Scultura — meaning "to mould"' },
      { id: 'C', text: 'Sculptura — meaning "to paint in space"' },
      { id: 'D', text: 'Scalprum — meaning "iron tool"' }
    ],
    correctAnswer: 'A',
    explanation: 'Sculpture originates from the Latin word "sculpere", which literally translates to "to carve".',
    moduleReference: 'Etymology & Origins'
  },
  {
    id: 2,
    question: 'How does sculpture engage our senses differently from paintings, as observed by art scholar Sheldon (1968)?',
    options: [
      { id: 'A', text: 'It uses brighter pigment and chemical glazes' },
      { id: 'B', text: 'It occupies space as a three-dimensional mass through carving, casting, modeling, or assembling' },
      { id: 'C', text: 'It is exclusively viewed indoors within private ateliers' },
      { id: 'D', text: 'It is purely conceptual and requires no physical touch' }
    ],
    correctAnswer: 'B',
    explanation: 'Art theorist Sheldon (1968) observed that sculpture engages our human senses fundamentally differently than paintings because it occupies physical space as a tangible three-dimensional mass.',
    moduleReference: 'Spatial Perception'
  },
  {
    id: 3,
    question: 'What is the Löwenmensch, recognized as one of the oldest surviving sculptures in human archaeology?',
    options: [
      { id: 'A', text: 'A bronze statue of an Egyptian pharaoh from Alexandria' },
      { id: 'B', text: 'A 12-inch ivory statuette from Hohlenstein-Stadel, Germany depicting a human figure with a feline face' },
      { id: 'C', text: 'A giant soapstone relief in South America' },
      { id: 'D', text: 'A marble bust carved by ancient Greek masters in Athens' }
    ],
    correctAnswer: 'B',
    explanation: 'The Löwenmensch ("lion-human") is an Upper Paleolithic ivory statuette dating approximately 38,000–40,000 BCE from Stadel Cave in Germany, measuring approximately 12 inches tall.',
    moduleReference: 'Prehistoric Origins'
  },
  {
    id: 4,
    question: 'What symbolic combination does the Great Sphinx of Giza represent in ancient Egyptian art?',
    options: [
      { id: 'A', text: 'Divine wind and ocean tides' },
      { id: 'B', text: 'Human intelligence and animal strength' },
      { id: 'C', text: 'Military conquest and trade dominance' },
      { id: 'D', text: 'Mortal frailty and eternal sorrow' }
    ],
    correctAnswer: 'B',
    explanation: 'In ancient Egyptian iconography, uniting the head of Pharaoh Khafre with the couchant figure of a lion symbolizes the fusion of human intelligence and animal strength to guard sacred burial precincts.',
    moduleReference: 'Symbolism & Monoliths'
  },
  {
    id: 5,
    question: 'What are the recorded dimensions of the Great Sphinx of Giza?',
    options: [
      { id: 'A', text: '120 feet long and 30 feet high' },
      { id: 'B', text: '240 feet long and 65 feet high' },
      { id: 'C', text: '420 feet long and 128 feet high' },
      { id: 'D', text: '500 feet long and 100 feet high' }
    ],
    correctAnswer: 'B',
    explanation: 'The Great Sphinx of Giza is an enormous limestone monolith measuring approximately 240 feet (73 m) long and 65 feet (20 m) high.',
    moduleReference: 'Monumental Dimensions'
  },
  {
    id: 6,
    question: 'In classical sculptural taxonomy, how is a "Bust" defined?',
    options: [
      { id: 'A', text: 'A full-length statue exceeding 100 meters' },
      { id: 'B', text: 'A structural design for bridges and architectural tombs' },
      { id: 'C', text: 'A sculpted and painted representation of the upper part of the human figure such as the head, neck, shoulders, chest or breast' },
      { id: 'D', text: 'An assemblage of junk and welded scraps' }
    ],
    correctAnswer: 'C',
    explanation: 'In sculptural taxonomy, a bust is a sculpted and painted representation of the upper part of the human figure, such as the head, neck, shoulders, chest, or breast.',
    moduleReference: 'Structural Classifications'
  },
  {
    id: 7,
    question: 'Which monumental sculpture stands at 420 feet (128 meters) in Henan, China, exemplifying colossal copper statuary?',
    options: [
      { id: 'A', text: 'Christ the Redeemer in Brazil' },
      { id: 'B', text: 'Spring Temple Buddha in Henan, China' },
      { id: 'C', text: 'Statue of Liberty in New York' },
      { id: 'D', text: 'People Power Monument in Manila' }
    ],
    correctAnswer: 'B',
    explanation: 'The Spring Temple Buddha in Henan, China stands 420 feet (128 meters) tall (reaching 208 meters with pedestals), cast from over 1,100 pieces of copper alloy.',
    moduleReference: 'Colossal Statuary'
  },
  {
    id: 8,
    question: 'What is the primary technical difference between Additive and Subtractive sculptural procedures?',
    options: [
      { id: 'A', text: 'Additive removes material; Subtractive melts material' },
      { id: 'B', text: 'Additive adds/builds up material; Subtractive cuts away or removes material' },
      { id: 'C', text: 'Additive is only for wood; Subtractive is only for clay' },
      { id: 'D', text: 'There is no technical difference between the two' }
    ],
    correctAnswer: 'B',
    explanation: 'Sculptural procedures are fundamentally divided into subtractive (where material is removed or carved out of a solid mass) and additive (where material is built up, molded, or assembled).',
    moduleReference: 'Sculptural Procedures'
  },
  {
    id: 9,
    question: 'In traditional wood carving, what specialized tool is specifically used for "carving hollows, rounds, and sweeping curves"?',
    options: [
      { id: 'A', text: 'The gouge' },
      { id: 'B', text: 'The slicer saw' },
      { id: 'C', text: 'The hammer' },
      { id: 'D', text: 'The armature wire' }
    ],
    correctAnswer: 'A',
    explanation: 'Traditional wood carving employs distinct hand tools: the gouge is crafted specifically for carving hollows, rounds, and sweeping curves, while straight chisels shape planar surfaces and lines.',
    moduleReference: 'Wood Carving Tools'
  },
  {
    id: 10,
    question: 'How is "Slip casting" defined within sculptural and ceramic reproduction techniques?',
    options: [
      { id: 'A', text: 'Shaping rough granite using hand chisels' },
      { id: 'B', text: 'A technique for the mass-production of pottery, especially for shapes not easily made on a wheel' },
      { id: 'C', text: 'Welding discarded automobile parts into abstract monuments' },
      { id: 'D', text: 'Pouring hot wax over marble to protect it from moisture' }
    ],
    correctAnswer: 'B',
    explanation: 'Slip casting is a specialized ceramic reproduction technique where liquid clay (slip) is poured into plaster molds to mass-produce complex, hollow vessels not easily formed on a wheel.',
    moduleReference: 'Casting & Reproduction'
  },
  {
    id: 11,
    question: 'In subtractive soap carving, how can rough facets and edges be softened and smoothed without abrasive tools?',
    options: [
      { id: 'A', text: 'Coarse industrial sandpaper' },
      { id: 'B', text: 'Your fingers, because your body heat will soften the soap' },
      { id: 'C', text: 'A blowtorch or heated metal iron' },
      { id: 'D', text: 'Soaking it overnight in boiling water' }
    ],
    correctAnswer: 'B',
    explanation: 'Using gentle fingertip rubbing, natural body warmth softens the soap medium, allowing sculptors to burnish and smooth rough facets into even curves.',
    moduleReference: 'Studio Carving Techniques'
  },
  {
    id: 12,
    question: 'What is the definition and historical origin of the term "Atélier"?',
    options: [
      { id: 'A', text: 'A skeleton wire framework used inside paper-mâché' },
      { id: 'B', text: 'A French word meaning "studio" and referring precisely to the place where an artist works' },
      { id: 'C', text: 'An impression taken of a relief using wax or clay' },
      { id: 'D', text: 'Art that has no reference to any figurative reality' }
    ],
    correctAnswer: 'B',
    explanation: 'Originating from the French word for workshop, an atelier refers specifically to the private studio or laboratory where an artist plans, models, and executes works.',
    moduleReference: 'Studio Vocabulary'
  }
];
