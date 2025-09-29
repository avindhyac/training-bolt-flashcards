import { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { Flashcard, Deck, StudyStats, AppView } from '../types';

interface StudyModeProps {
  flashcards: Flashcard[];
  decks: Deck[];
  selectedDeckId: string | null;
  onNavigate: (view: AppView) => void;
  onSelectDeck: (deckId: string) => void;
}

/**
 * Study mode component with card flipping and progress tracking
 */
export function StudyMode({ flashcards, decks, selectedDeckId, onNavigate, onSelectDeck }: StudyModeProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState<StudyStats>({ correct: 0, incorrect: 0, total: 0 });
  const [studyCards, setStudyCards] = useState<Flashcard[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Filter cards based on selected deck
  useEffect(() => {
    if (selectedDeckId) {
      const deckCards = flashcards.filter(card => card.deckId === selectedDeckId);
      setStudyCards(shuffleArray([...deckCards]));
      setCurrentCardIndex(0);
      setIsFlipped(false);
      setIsComplete(false);
      setStats({ correct: 0, incorrect: 0, total: 0 });
    }
  }, [flashcards, selectedDeckId]);

  // Shuffle array utility
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const currentCard = studyCards[currentCardIndex];
  const selectedDeck = selectedDeckId ? decks.find(deck => deck.id === selectedDeckId) : null;

  const handleAnswer = (correct: boolean) => {
    setStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1),
      total: prev.total + 1,
    }));

    if (currentCardIndex < studyCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setIsComplete(true);
    }
  };

  const resetStudy = () => {
    setStudyCards(shuffleArray([...studyCards]));
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setStats({ correct: 0, incorrect: 0, total: 0 });
    setIsComplete(false);
  };

  // Deck selection screen
  if (!selectedDeckId) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => onNavigate('landing')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Choose a Deck to Study</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {decks.map((deck) => {
              const deckCardCount = flashcards.filter(card => card.deckId === deck.id).length;
              return (
                <button
                  key={deck.id}
                  onClick={() => onSelectDeck(deck.id)}
                  disabled={deckCardCount === 0}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    deckCardCount > 0
                      ? 'bg-white hover:bg-blue-50 border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md'
                      : 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{deck.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {deckCardCount} {deckCardCount === 1 ? 'card' : 'cards'}
                  </p>
                </button>
              );
            })}
          </div>

          {decks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No decks available to study.</p>
              <button
                onClick={() => onNavigate('create-deck')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Create a Deck
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Study complete screen
  if (isComplete) {
    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="mb-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Study Complete!</h2>
            <p className="text-gray-600">Great job studying {selectedDeck?.name}</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600 mb-1">{accuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-xl font-semibold text-green-600">{stats.correct}</div>
                <div className="text-sm text-green-700">Correct</div>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <div className="text-xl font-semibold text-red-600">{stats.incorrect}</div>
                <div className="text-sm text-red-700">Incorrect</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={resetStudy}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Study Again
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Study session screen
  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No cards available in this deck.</p>
          <button
            onClick={() => onNavigate('landing')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('landing')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{selectedDeck?.name}</h1>
              <p className="text-sm text-gray-600">
                Card {currentCardIndex + 1} of {studyCards.length}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="text-green-600 font-medium">{stats.correct}</span> / 
            <span className="text-red-600 font-medium">{stats.incorrect}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentCardIndex + (isFlipped ? 1 : 0)) / studyCards.length) * 100}%`,
            }}
          />
        </div>

        {/* Flashcard */}
        <div 
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8 min-h-[300px] flex items-center justify-center cursor-pointer transform transition-all duration-300 hover:shadow-xl"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="text-center">
            {!isFlipped ? (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {currentCard.front}
                </h2>
                <p className="text-sm text-gray-500">Click to reveal answer</p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {currentCard.back}
                </h2>
                <p className="text-sm text-gray-500">How did you do?</p>
              </>
            )}
          </div>
        </div>

        {/* Answer Buttons */}
        {isFlipped && (
          <div className="flex gap-4">
            <button
              onClick={() => handleAnswer(false)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
            >
              <XCircle className="w-5 h-5" />
              Got it wrong
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
            >
              <CheckCircle className="w-5 h-5" />
              Got it right
            </button>
          </div>
        )}

        {/* Flip instruction */}
        {!isFlipped && (
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Tap the card or click to see the answer
            </p>
          </div>
        )}
      </div>
    </div>
  );
}