/**
 * SCULPTURA - Interactive Activities Data
 * Supporting:
 * 1. Match the Terms Activity
 * 2. Guess the Sculpture (Artwork Detective)
 * 3. Decode the Artwork (Guided Hermeneutic Analysis)
 */

export const termMatchingPairs = [
  {
    id: 'rough',
    term: 'Rough',
    definition: 'Sketchy version of a piece, done quickly at the design stage, showing its final visual appearance.'
  },
  {
    id: 'abstractionism',
    term: 'Abstractionism',
    definition: 'Art having no reference to figurative reality, depicting forms in a simplified or reduced way.'
  },
  {
    id: 'atelier',
    term: 'Atélier',
    definition: 'A French word meaning "studio" and referring precisely to the place where an artist works.'
  },
  {
    id: 'mould',
    term: 'Mould',
    definition: 'An impression produced by coating a model with ductile material to obtain a die for casting.'
  },
  {
    id: 'conceptual',
    term: 'Conceptual',
    definition: 'Art where the concept or idea is considered more important than material or aesthetic concerns.'
  },
  {
    id: 'figurative',
    term: 'Figurative',
    definition: 'Art describing work which portrays mainly the human or animal figure.'
  },
  {
    id: 'sketch',
    term: 'Sketch',
    definition: 'The first hastily executed drawing capturing an initial inspiration of the artwork to come.'
  },
  {
    id: 'armature',
    term: 'Armature',
    definition: 'A skeleton-like framework usually made of stiff wire used to support materials like paper-mâché or clay.'
  },
  {
    id: 'assemblage',
    term: 'Assemblage',
    definition: 'A 3D art assembly created by gathering and joining scraps, junk, and various found objects.'
  },
  {
    id: 'freestanding',
    term: 'Freestanding',
    definition: 'A method when a sculpture is completely unattached and intended to be viewed from all sides.'
  }
];

export const guessSculpturesData = [
  {
    id: 'guess-1',
    artworkName: 'People Power Monument',
    artist: 'Eduardo Castrillo',
    image: './images/people_power_monument_module.jpeg',
    clues: [
      'Clue 1: I am a monumental public sculpture located on Epifanio de los Santos Avenue (EDSA) in the Philippines.',
      'Clue 2: I am crafted from welded bronze and brass sheets over an intricate structural steel framework.',
      'Clue 3: I feature a dynamic assembly of 37 figures surrounding a towering motherland figure ("Inang Bayan") celebrating the 1986 peaceful revolution.',
      'Clue 4: I was sculpted by nationalist Filipino artist Eduardo Castrillo and stand as a defining monument of modern Philippine public art.'
    ],
    hint: 'A Filipino national monument celebrating restored democracy.',
    funFact: 'Castrillo created this monumental piece to show how still metal can vibrate with the kinetic energy of human unity.'
  },
  {
    id: 'guess-2',
    artworkName: 'David',
    artist: 'Michelangelo Buonarroti',
    image: './images/david_module.jpeg',
    clues: [
      'Clue 1: I was carved from an immense single block of Carrara marble that had been quarried and abandoned decades earlier.',
      'Clue 2: I depict a biblical youth before combat, poised in dynamic contrapposto with concentrated focus ("terribilità").',
      'Clue 3: I stand 5.17 meters (17 feet) tall in Florence, Italy, as an icon of High Renaissance marble mastery.',
      'Clue 4: My creator famously stated that the sculpture was already trapped inside the stone, waiting to be freed by chipping away excess.'
    ],
    hint: 'The most iconic freestanding marble youth in Western art history.',
    funFact: 'Michelangelo sculpted David when he was only 26 years old, completing the colossus in three years.'
  },
  {
    id: 'guess-3',
    artworkName: 'The Great Sphinx of Giza',
    artist: 'Unknown Sculptors (Reign of Pharaoh Khafre)',
    image: './images/great_sphinx_module.jpeg',
    clues: [
      'Clue 1: I measure 240 feet long and 65 feet high, making me one of the largest monolithic statues on earth.',
      'Clue 2: I was carved directly from the natural limestone bedrock of a desert plateau.',
      'Clue 3: I famously symbolize the union of "human intelligence" with "animal strength."',
      'Clue 4: I guard the funerary complex of an ancient Old Kingdom pharaoh on the west bank of the Nile.'
    ],
    hint: 'A creature with the head of an Egyptian ruler and the body of a crouching lion.',
    funFact: 'The Sphinx is over 4,500 years old and was buried in sand up to its shoulders for many centuries.'
  },
  {
    id: 'guess-4',
    artworkName: 'Löwenmensch (Lion-Man)',
    artist: 'Paleolithic Hunter-Gatherer Artist',
    image: './images/lowenmensch.jpeg',
    clues: [
      'Clue 1: I was discovered in a subterranean cave at Hohlenstein-Stadel, Germany.',
      'Clue 2: I date back approximately 30,000 to 40,000 BCE to the Upper Paleolithic period.',
      'Clue 3: I am a 12-inch statuette carved from the ivory tusk of an Ice Age mammoth using sharp flint blades.',
      'Clue 4: I portray a human upright body crowned with the head and ears of a cave lion.'
    ],
    hint: 'The oldest known anthropomorphic zoomorphic statuette in archaeological history.',
    funFact: 'Archaeologists estimate that carving this single ivory piece with stone tools required around 400 hours of patient craftsmanship.'
  }
];

export const decodeArtworksData = [
  {
    id: 'decode-people-power',
    title: 'People Power Monument',
    artist: 'Eduardo Castrillo',
    image: './images/people_power_monument_module.jpeg',
    mediumPrompt: 'Welded Bronze & Brass on Steel Skeleton (Assemblage/Additive)',
    guidedQuestions: [
      {
        aspect: 'Form & Mass',
        question: 'Notice the jagged, upward-sweeping diagonals of the figures. What feeling do these lines create compared to calm, vertical statues?',
        sampleInterpretation: 'The diagonal thrusts evoke surge, struggle, and collective momentum. Instead of static commemoration, Castrillo makes the bronze feel alive with democratic uprising.'
      },
      {
        aspect: 'Material & Surface',
        question: 'Why did Castrillo choose industrial brass and bronze sheets rather than smooth white marble for this monument?',
        sampleInterpretation: 'Sheet metal welded together embodies modern resilience, industrial resolve, and strength under fire. The faceted golden sheen reflects tropical sunlight like a blazing torch.'
      },
      {
        aspect: 'Cultural Meaning',
        question: 'How does the central female figure ("Inang Bayan") anchor the meaning of the 37 surrounding citizens?',
        sampleInterpretation: 'The matriarch stands as the moral soul of the nation, while the surrounding crowd demonstrates that freedom was not achieved by one individual alone, but through collective solidarity.'
      }
    ]
  },
  {
    id: 'decode-david',
    title: 'David',
    artist: 'Michelangelo Buonarroti',
    image: './images/david_module.jpeg',
    mediumPrompt: 'Subtractive Carved Carrara Marble (Freestanding)',
    guidedQuestions: [
      {
        aspect: 'The Moment Chosen',
        question: 'Earlier Renaissance sculptors portrayed David standing over Goliath’s severed head. Why did Michelangelo choose the moment BEFORE the fight?',
        sampleInterpretation: 'By capturing David before casting the stone, Michelangelo focuses on psychological tension, calculated resolve, and human courage over physical violence.'
      },
      {
        aspect: 'Anatomy & Proportion',
        question: 'Notice the enlarged right hand and head. Why might Michelangelo have slightly exaggerated these features?',
        sampleInterpretation: 'The hand is the instrument of divine action ("manu fortis" or strong hand), and the head houses intellect and reason. Intended for high cathedral placement, larger proportions ensured optical balance.'
      },
      {
        aspect: 'Renaissance Philosophy',
        question: 'How does this marble statue embody the aesthetic principle that sculpture exemplifies concepts through visual equivalents?',
        sampleInterpretation: 'David became the visual equivalent of civic freedom for the Republic of Florence—proving that human dignity and moral courage can defeat tyrannical giants.'
      }
    ]
  }
];
