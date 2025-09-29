import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { DeckManager } from './components/DeckManager';
import { FlashcardManager } from './components/FlashcardManager';
import { StudyMode } from './components/StudyMode';
import { useLocalStorage } from './hooks/useLocalStorage';
import { sampleDecks, sampleFlashcards } from './data/sampleDecks';
import { Flashcard, Deck, AppView } from './types';

/**
 * Main App component - handles routing and state management
 */
function App() {
  // State management with localStorage persistence
  const [flashcards, setFlashcards] = useLocalStorage<Flashcard[]>('flashcards', sampleFlashcards);
  const [decks, setDecks] = useLocalStorage<Deck[]>('decks', sampleDecks);
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [selectedDeckId, setSelectedDeckId] = useState<string>('');

  // Deck management functions
  const createDeck = (name: string) => {
    const newDeck: Deck = {
      id: crypto.randomUUID(),
      name,
      createdAt: Date.now(),
    };
    setDecks(prev => [...prev, newDeck]);
  };

  const deleteDeck = (deckId: string) => {
    if (window.confirm('This will delete the deck and all its flashcards. Are you sure?')) {
      setDecks(prev => prev.filter(deck => deck.id !== deckId));
      setFlashcards(prev => prev.filter(card => card.deckId !== deckId));
      if (selectedDeckId === deckId) {
        setSelectedDeckId('');
        setCurrentView('manage');
      }
    }
  };

  // Flashcard management functions
  const createFlashcard = (cardData: Omit<Flashcard, 'id' | 'createdAt'>) => {
    const newCard: Flashcard = {
      ...cardData,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setFlashcards(prev => [...prev, newCard]);
  };

  const updateFlashcard = (updatedCard: Flashcard) => {
    setFlashcards(prev =>
      prev.map(card => card.id === updatedCard.id ? updatedCard : card)
    );
  };

  const deleteFlashcard = (cardId: string) => {
    setFlashcards(prev => prev.filter(card => card.id !== cardId));
  };

  // Navigation functions
  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    if (view === 'study') {
      setSelectedDeckId(''); // Reset deck selection when entering study mode
    }
  };

  const handleSelectDeck = (deckId: string) => {
    setSelectedDeckId(deckId);
    if (currentView === 'manage') {
      setCurrentView('flashcard-manage');
    }
  };

  const handleSelectStudyDeck = (deckId: string) => {
    setSelectedDeckId(deckId);
  };

  // Utility functions
  const getFlashcardCount = (deckId: string) => {
    return flashcards.filter(card => card.deckId === deckId).length;
  };

  const totalFlashcards = flashcards.length;

  // Render appropriate view
  switch (currentView) {
    case 'landing':
      return (
        <LandingPage
          onNavigate={handleNavigate}
          flashcardCount={totalFlashcards}
        />
      );

    case 'manage':
      return (
        <DeckManager
          decks={decks}
          onCreateDeck={createDeck}
          onDeleteDeck={deleteDeck}
          onNavigate={handleNavigate}
          onSelectDeck={handleSelectDeck}
          getFlashcardCount={getFlashcardCount}
        />
      );

    case 'flashcard-manage':
      return (
        <FlashcardManager
          flashcards={flashcards}
          decks={decks}
          selectedDeckId={selectedDeckId}
          onCreateFlashcard={createFlashcard}
          onUpdateFlashcard={updateFlashcard}
          onDeleteFlashcard={deleteFlashcard}
          onNavigate={(view) => {
            if (view === 'manage') {
              setSelectedDeckId('');
            }
            setCurrentView(view);
          }}
        />
      );

    case 'study':
      return (
        <StudyMode
          flashcards={flashcards}
          decks={decks}
          selectedDeckId={selectedDeckId}
          onNavigate={handleNavigate}
          onSelectDeck={handleSelectStudyDeck}
        />
      );

    case 'create-deck':
      // Redirect to deck manager with create mode
      setCurrentView('manage');
      return (
        <DeckManager
          decks={decks}
          onCreateDeck={createDeck}
          onDeleteDeck={deleteDeck}
          onNavigate={handleNavigate}
          onSelectDeck={handleSelectDeck}
          getFlashcardCount={getFlashcardCount}
        />
      );

    default:
      return (
        <LandingPage
          onNavigate={handleNavigate}
          flashcardCount={totalFlashcards}
        />
      );
  }
}

export default App;