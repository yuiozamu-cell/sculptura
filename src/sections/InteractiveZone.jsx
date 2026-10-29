import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { quizQuestions } from '../data/quizData';
import { termMatchingPairs, guessSculpturesData, decodeArtworksData } from '../data/matchingData';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Award, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  Puzzle, 
  Search, 
  BookOpen, 
  Lightbulb, 
  ChevronRight,
  Eye,
  Send
} from 'lucide-react';

export default function InteractiveZone() {
  const [activeActivity, setActiveActivity] = useState('quiz');

  // ----------------------------------------------------
  // ACTIVITY 1: QUIZ STATE
  // ----------------------------------------------------
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState({});
  const [showQuizExplanation, setShowQuizExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quizQuestions[currentQuizIndex];
  const totalQuestions = quizQuestions.length;

  const handleSelectQuizAnswer = (optionId) => {
    if (selectedQuizAnswers[currentQuizIndex]) return; // already answered
    const isCorrect = optionId === currentQuestion.correctAnswer;
    setSelectedQuizAnswers(prev => ({
      ...prev,
      [currentQuizIndex]: { selected: optionId, isCorrect }
    }));
    setShowQuizExplanation(true);
  };

  const handleNextQuizQuestion = () => {
    setShowQuizExplanation(false);
    if (currentQuizIndex + 1 < totalQuestions) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestartQuiz = () => {
    setSelectedQuizAnswers({});
    setCurrentQuizIndex(0);
    setShowQuizExplanation(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return Object.values(selectedQuizAnswers).filter(a => a.isCorrect).length;
  };

  // ----------------------------------------------------
  // ACTIVITY 2: MATCHING GAME STATE
  // ----------------------------------------------------
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDef, setSelectedDef] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [matchingAttempts, setMatchingAttempts] = useState(0);
  const [matchingError, setMatchingError] = useState(null);

  const handleTermClick = (item) => {
    if (matchedPairs.includes(item.id)) return;
    setSelectedTerm(item);
    setMatchingError(null);
    if (selectedDef) {
      checkMatch(item, selectedDef);
    }
  };

  const handleDefClick = (item) => {
    if (matchedPairs.includes(item.id)) return;
    setSelectedDef(item);
    setMatchingError(null);
    if (selectedTerm) {
      checkMatch(selectedTerm, item);
    }
  };

  const checkMatch = (termItem, defItem) => {
    setMatchingAttempts(prev => prev + 1);
    if (termItem.id === defItem.id) {
      const newMatches = [...matchedPairs, termItem.id];
      setMatchedPairs(newMatches);
      setSelectedTerm(null);
      setSelectedDef(null);
      if (newMatches.length === termMatchingPairs.length) {
        confetti({ particleCount: 80, spread: 60 });
      }
    } else {
      setMatchingError(`"${termItem.term}" does not match that definition. Try again!`);
      setTimeout(() => {
        setSelectedTerm(null);
        setSelectedDef(null);
        setMatchingError(null);
      }, 1200);
    }
  };

  const handleRestartMatching = () => {
    setSelectedTerm(null);
    setSelectedDef(null);
    setMatchedPairs([]);
    setMatchingAttempts(0);
    setMatchingError(null);
  };

  // ----------------------------------------------------
  // ACTIVITY 3: GUESS THE SCULPTURE STATE
  // ----------------------------------------------------
  const [guessIndex, setGuessIndex] = useState(0);
  const [revealedCluesCount, setRevealedCluesCount] = useState(1);
  const [userGuessInput, setUserGuessInput] = useState('');
  const [guessFeedback, setGuessFeedback] = useState(null);
  const [solvedGuesses, setSolvedGuesses] = useState({});

  const currentGuessItem = guessSculpturesData[guessIndex];

  const handleRevealNextClue = () => {
    if (revealedCluesCount < currentGuessItem.clues.length) {
      setRevealedCluesCount(prev => prev + 1);
    }
  };

  const handleVerifyGuess = (e) => {
    e.preventDefault();
    if (!userGuessInput.trim()) return;
    
    const input = userGuessInput.trim().toLowerCase();
    const correctTarget = currentGuessItem.artworkName.toLowerCase();
    const artistTarget = currentGuessItem.artist.toLowerCase();

    const isMatch = input.includes(correctTarget) || 
                    correctTarget.includes(input) || 
                    input.includes('sphinx') && correctTarget.includes('sphinx') ||
                    input.includes('david') && correctTarget.includes('david') ||
                    input.includes('people power') && correctTarget.includes('people power') ||
                    input.includes('lion') && correctTarget.includes('löwenmensch');

    if (isMatch) {
      setGuessFeedback({
        success: true,
        message: `Brilliant! That is indeed ${currentGuessItem.artworkName} by ${currentGuessItem.artist}!`
      });
      setSolvedGuesses(prev => ({ ...prev, [guessIndex]: true }));
      confetti({ particleCount: 50, spread: 50 });
    } else {
      setGuessFeedback({
        success: false,
        message: `Not quite! Read the extra clues or check the hint.`
      });
    }
  };

  const handleNextGuessSculpture = () => {
    setGuessFeedback(null);
    setUserGuessInput('');
    setRevealedCluesCount(1);
    setGuessIndex(prev => (prev + 1) % guessSculpturesData.length);
  };

  // ----------------------------------------------------
  // ACTIVITY 4: DECODE THE ARTWORK STATE
  // ----------------------------------------------------
  const [decodeIndex, setDecodeIndex] = useState(0);
  const [userInterpretations, setUserInterpretations] = useState({});
  const [revealedAnalysis, setRevealedAnalysis] = useState({});

  const currentDecode = decodeArtworksData[decodeIndex];

  const handleSaveInterpretation = (qIndex, text) => {
    setUserInterpretations(prev => ({
      ...prev,
      [`${decodeIndex}-${qIndex}`]: text
    }));
  };

  const toggleRevealAnalysis = (qIndex) => {
    setRevealedAnalysis(prev => ({
      ...prev,
      [`${decodeIndex}-${qIndex}`]: !prev[`${decodeIndex}-${qIndex}`]
    }));
  };

  return (
    <section id="interactive" className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          tag="Interactive Zone • Play & Learn"
          title="The Sculpture Learning Lab"
          subtitle="Test your mastery of Module 6 through 4 distinct interactive challenges: multiple-choice examination, term matching, artwork detective inquiry, and guided hermeneutic analysis."
        />

        {/* Activity Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { id: 'quiz', label: '1. Master Quiz (12 Qs)', icon: Award, desc: 'Multiple-Choice with explanations' },
            { id: 'matching', label: '2. Match the Terms', icon: Puzzle, desc: 'Module 6 terminology pairing' },
            { id: 'guess', label: '3. Guess the Sculpture', icon: Search, desc: 'Clue-based artwork deduction' },
            { id: 'decode', label: '4. Decode the Artwork', icon: Eye, desc: 'Guided critical interpretation' },
          ].map(act => {
            const Icon = act.icon;
            const isActive = activeActivity === act.id;
            return (
              <button
                key={act.id}
                onClick={() => setActiveActivity(act.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-charcoal text-white border-charcoal shadow-md scale-102'
                    : 'bg-white border-stone-gray/30 text-charcoal hover:border-terracotta hover:text-terracotta'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-terracotta' : 'text-stone-gray'}`} />
                <span>{act.label}</span>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* ACTIVITY 1: SCULPTURE MASTER QUIZ                        */}
        {/* ======================================================== */}
        {activeActivity === 'quiz' && (
          <div className="bg-white rounded-3xl border border-stone-gray/30 p-6 sm:p-10 shadow-museum max-w-3xl mx-auto">
            {!quizCompleted ? (
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-gray/20 mb-6 text-xs text-charcoal-500">
                  <span className="font-semibold text-terracotta">
                    Question {currentQuizIndex + 1} of {totalQuestions}
                  </span>
                  <span>Score: {calculateScore()} / {Object.keys(selectedQuizAnswers).length}</span>
                </div>

                {/* Question */}
                <h3 className="font-display-serif text-xl sm:text-2xl font-bold text-charcoal mb-6 leading-snug">
                  {currentQuestion.question}
                </h3>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {currentQuestion.options.map((option) => {
                    const isAnswered = Boolean(selectedQuizAnswers[currentQuizIndex]);
                    const isSelected = selectedQuizAnswers[currentQuizIndex]?.selected === option.id;
                    const isCorrect = option.id === currentQuestion.correctAnswer;

                    let btnStyle = 'bg-ivory/50 border-stone-gray/30 text-charcoal hover:bg-ivory hover:border-terracotta/50';
                    
                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 line-through';
                      } else {
                        btnStyle = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={option.id}
                        disabled={isAnswered}
                        onClick={() => handleSelectQuizAnswer(option.id)}
                        className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {option.id}
                        </span>
                        <span>{option.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                {showQuizExplanation && (
                  <div className="p-4 rounded-xl bg-ivory border border-stone-gray/30 mb-6 text-xs text-charcoal-700 animate-fadeIn">
                    <div className="flex items-center gap-1.5 font-bold text-terracotta mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Academic Rationale:</span>
                    </div>
                    <p>{currentQuestion.explanation}</p>
                    <span className="block mt-2 text-[10px] text-charcoal-400 font-mono">
                      Ref: {currentQuestion.moduleReference}
                    </span>
                  </div>
                )}

                {/* Navigation Button */}
                {selectedQuizAnswers[currentQuizIndex] && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleNextQuizQuestion}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-terracotta text-white font-medium text-xs hover:bg-terracotta-dark transition-colors shadow-xs"
                    >
                      <span>{currentQuizIndex + 1 === totalQuestions ? 'View Final Results' : 'Next Question'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Quiz Completed Score Card */
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-terracotta/10 text-terracotta mx-auto flex items-center justify-center">
                  <Award className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-display-serif text-3xl font-bold text-charcoal">
                    Quiz Completed!
                  </h3>
                  <p className="text-sm text-charcoal-600 mt-1">
                    You scored <strong>{calculateScore()}</strong> out of <strong>{totalQuestions}</strong> questions.
                  </p>
                </div>

                <div className="p-6 bg-ivory rounded-2xl border border-stone-gray/30 max-w-md mx-auto text-xs text-charcoal-700 space-y-2">
                  <span className="font-bold text-terracotta text-sm block">
                    {calculateScore() >= 10 ? 'Distinguished Art Scholar!' : calculateScore() >= 7 ? 'Proficient Sculptural Scholar' : 'Good Effort! Review Module 6'}
                  </span>
                  <p>
                    {calculateScore() >= 10 
                      ? 'Exceptional mastery of Module 6 concepts, terminology, artists, and technical procedures!' 
                      : 'You have a solid foundation in sculpture. Feel free to re-read the glossary and retake the quiz to sharpen your score.'}
                  </p>
                </div>

                <button
                  onClick={handleRestartQuiz}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-charcoal text-white font-medium text-xs hover:bg-charcoal-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake the Quiz</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* ACTIVITY 2: MATCH THE TERMS                              */}
        {/* ======================================================== */}
        {activeActivity === 'matching' && (
          <div className="bg-white rounded-3xl border border-stone-gray/30 p-6 sm:p-10 shadow-museum max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-gray/20 mb-6 gap-2">
              <div>
                <h3 className="font-display-serif text-2xl font-bold text-charcoal">
                  Match the Module 6 Terms
                </h3>
                <p className="text-xs text-charcoal-600">
                  Select a Term on the left, then click its corresponding Definition on the right.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="text-terracotta">Matched: {matchedPairs.length} / {termMatchingPairs.length}</span>
                <button
                  onClick={handleRestartMatching}
                  className="p-1.5 text-charcoal-500 hover:text-terracotta"
                  title="Reset Game"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {matchingError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-lg text-xs animate-shake">
                {matchingError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Terms Column */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block mb-2">
                  Vocabulary Terms
                </span>
                {termMatchingPairs.map((item) => {
                  const isMatched = matchedPairs.includes(item.id);
                  const isSelected = selectedTerm?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      disabled={isMatched}
                      onClick={() => handleTermClick(item)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60'
                          : isSelected
                          ? 'bg-terracotta text-white border-terracotta shadow-xs'
                          : 'bg-ivory border-stone-gray/30 text-charcoal hover:border-terracotta'
                      }`}
                    >
                      <span>{item.term}</span>
                      {isMatched && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Definitions Column (shuffled order) */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block mb-2">
                  Definitions from Module 6
                </span>
                {[...termMatchingPairs].reverse().map((item) => {
                  const isMatched = matchedPairs.includes(item.id);
                  const isSelected = selectedDef?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      disabled={isMatched}
                      onClick={() => handleDefClick(item)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all flex items-start justify-between gap-2 ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60'
                          : isSelected
                          ? 'bg-olive text-white border-olive shadow-xs'
                          : 'bg-ivory border-stone-gray/30 text-charcoal-700 hover:border-olive'
                      }`}
                    >
                      <span>{item.definition}</span>
                      {isMatched && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>

            </div>

            {matchedPairs.length === termMatchingPairs.length && (
              <div className="mt-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <Sparkles className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-display-serif text-xl font-bold text-emerald-900">
                  All 10 Terms Matched Perfectly!
                </h4>
                <p className="text-xs text-emerald-800">
                  You accomplished this in {matchingAttempts} attempts. Excellent familiarity with the curriculum concepts!
                </p>
                <button
                  onClick={handleRestartMatching}
                  className="px-5 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors inline-block"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* ACTIVITY 3: GUESS THE SCULPTURE                          */}
        {/* ======================================================== */}
        {activeActivity === 'guess' && (
          <div className="bg-white rounded-3xl border border-stone-gray/30 p-6 sm:p-10 shadow-museum max-w-3xl mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-gray/20 mb-6 text-xs text-charcoal-500">
              <span className="font-semibold text-terracotta">
                Case File {guessIndex + 1} of {guessSculpturesData.length}
              </span>
              <span>Solved: {Object.keys(solvedGuesses).length} / {guessSculpturesData.length}</span>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-display-serif text-2xl font-bold text-charcoal mb-1">
                  Artwork Detective: Who Am I?
                </h3>
                <p className="text-xs text-charcoal-600">
                  Read the progressive clues below to deduce which famous sculpture is being described.
                </p>
              </div>

              {/* Clues Container */}
              <div className="space-y-3">
                {currentGuessItem.clues.slice(0, revealedCluesCount).map((clue, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 bg-ivory rounded-xl border-l-3 border-terracotta text-xs text-charcoal-800 font-medium animate-fadeIn"
                  >
                    {clue}
                  </div>
                ))}
              </div>

              {/* Reveal More Clues or Hint */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                {revealedCluesCount < currentGuessItem.clues.length ? (
                  <button
                    onClick={handleRevealNextClue}
                    className="text-terracotta hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    Reveal Next Clue ({revealedCluesCount} of {currentGuessItem.clues.length} revealed)
                  </button>
                ) : (
                  <span className="text-charcoal-400 italic">All clues revealed!</span>
                )}

                <span className="text-[11px] text-stone-dark italic">
                  Hint: {currentGuessItem.hint}
                </span>
              </div>

              {/* Guess Form */}
              {!solvedGuesses[guessIndex] ? (
                <form onSubmit={handleVerifyGuess} className="space-y-4 pt-4 border-t border-stone-gray/20">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userGuessInput}
                      onChange={(e) => setUserGuessInput(e.target.value)}
                      placeholder="Type the sculpture's name (e.g. David, Sphinx...)"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-stone-gray/40 text-xs focus:outline-hidden focus:border-terracotta bg-ivory/30 focus:bg-white"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-terracotta text-white font-semibold text-xs hover:bg-terracotta-dark transition-colors"
                    >
                      Verify
                    </button>
                  </div>

                  {guessFeedback && (
                    <div className={`p-3 rounded-xl text-xs ${guessFeedback.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : 'bg-rose-50 text-rose-800 border border-rose-300'}`}>
                      {guessFeedback.message}
                    </div>
                  )}
                </form>
              ) : (
                /* Solved Reveal Card */
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-charcoal shrink-0">
                      <img src={currentGuessItem.image} alt={currentGuessItem.artworkName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Identified!</span>
                      <h4 className="font-display-serif text-xl font-bold text-charcoal">{currentGuessItem.artworkName}</h4>
                      <p className="text-xs text-charcoal-600">By {currentGuessItem.artist}</p>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-900 italic">“{currentGuessItem.funFact}”</p>
                  
                  <button
                    onClick={handleNextGuessSculpture}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
                  >
                    <span>Next Case File</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* ACTIVITY 4: DECODE THE ARTWORK                           */}
        {/* ======================================================== */}
        {activeActivity === 'decode' && (
          <div className="bg-white rounded-3xl border border-stone-gray/30 p-6 sm:p-10 shadow-museum max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-gray/20 mb-6">
              <div>
                <h3 className="font-display-serif text-2xl font-bold text-charcoal">
                  Decode the Artwork: Guided Inquiry
                </h3>
                <p className="text-xs text-charcoal-600">
                  Analyze how physical form, material, and spatial composition communicate cultural meaning.
                </p>
              </div>

              {/* Artwork Switcher */}
              <div className="flex gap-2">
                {decodeArtworksData.map((art, idx) => (
                  <button
                    key={art.id}
                    onClick={() => setDecodeIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      decodeIndex === idx 
                        ? 'bg-terracotta text-white' 
                        : 'bg-ivory text-charcoal hover:bg-stone-gray/20'
                    }`}
                  >
                    {art.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Artwork Mini Header */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-ivory rounded-2xl border border-stone-gray/30 mb-8">
              <img 
                src={currentDecode.image} 
                alt={currentDecode.title} 
                className="w-24 h-24 object-cover rounded-xl shadow-xs" 
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta">
                  Target Artwork
                </span>
                <h4 className="font-display-serif text-xl font-bold text-charcoal">
                  {currentDecode.title}
                </h4>
                <p className="text-xs text-olive-dark font-medium">By {currentDecode.artist}</p>
                <span className="text-[11px] text-charcoal-500 mt-1 block">
                  Medium & Technique: {currentDecode.mediumPrompt}
                </span>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {currentDecode.guidedQuestions.map((q, qIdx) => {
                const key = `${decodeIndex}-${qIdx}`;
                const userVal = userInterpretations[key] || '';
                const isRevealed = revealedAnalysis[key];

                return (
                  <div key={q.aspect} className="p-5 border border-stone-gray/30 rounded-2xl bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-terracotta bg-terracotta-50 px-2.5 py-0.5 rounded-full">
                        {q.aspect}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-medium text-charcoal">
                      {q.question}
                    </p>

                    {/* Visitor Input */}
                    <div>
                      <textarea
                        rows={2}
                        value={userVal}
                        onChange={(e) => handleSaveInterpretation(qIdx, e.target.value)}
                        placeholder="Write your observation here..."
                        className="w-full p-3 rounded-xl border border-stone-gray/40 text-xs focus:outline-hidden focus:border-terracotta bg-ivory/30 focus:bg-white"
                      ></textarea>
                    </div>

                    {/* Toggle Sample Interpretation */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => toggleRevealAnalysis(qIdx)}
                        className="text-xs font-semibold text-olive-dark hover:underline inline-flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-olive" />
                        {isRevealed ? 'Hide Curatorial Interpretation' : 'Compare with Curatorial Interpretation'}
                      </button>
                    </div>

                    {isRevealed && (
                      <div className="p-3.5 bg-olive-50 rounded-xl border-l-3 border-olive text-xs text-charcoal-800 animate-fadeIn">
                        <span className="font-bold text-olive-dark block mb-1">Curatorial Insight:</span>
                        <p>{q.sampleInterpretation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
