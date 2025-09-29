import { useState } from 'react';
import { Plus, CreditCard as Edit2, Trash2, ArrowLeft } from 'lucide-react';
import { Flashcard, Deck, AppView } from '../types';
import { FlashcardForm } from './FlashcardForm';

interface FlashcardManagerProps {
  flashcards: Flashcard[];
  decks: Deck[];
  selectedDeckId: string;
  onCreateFlashcard: (flashcard: Omit<Flashcard, 'id' | 'createdAt'>) => void;
  onUpdateFlashcard: (flashcard: Flashcard) => void;
  onDeleteFlashcard: (id: string) => void;
  onNavigate: (view: AppView) => void;
}

/**
 * Component for managing flashcards within a selected deck
 */
export function FlashcardManager({
  flashcards,
  decks,
  selectedDeckId,
  onCreateFlashcard,
  onUpdateFlashcard,
  onDeleteFlashcard,
  onNavigate,
}: FlashcardManagerProps) {
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [showForm, setShowForm] = useState(false);

  const selectedDeck = decks.find(deck => deck.id === selectedDeckId);
  const deckFlashcards = flashcards.filter(card => card.deckId === selectedDeckId);

  const handleCreateFlashcard = (cardData: { front: string; back: string }) => {
    onCreateFlashcard({
      ...cardData,
      deckId: selectedDeckId,
    });
    setShowForm(false);
  };

  const handleUpdateFlashcard = (cardData: { front: string; back: string }) => {
    if (editingCard) {
      onUpdateFlashcard({
        ...editingCard,
        ...cardData,
      });
      setEditingCard(null);
    }
  };

  const handleDeleteFlashcard = (id: string) => {
    if (window.confirm('Are you sure you want to delete this flashcard?')) {
      onDeleteFlashcard(id);
    }
  };

  if (showForm || editingCard) {
    return (
      <FlashcardForm
        initialData={editingCard}
        onSave={editingCard ? handleUpdateFlashcard : handleCreateFlashcard}
        onCancel={() => {
          setShowForm(false);
          setEditingCard(null);
        }}
        title={editingCard ? 'Edit Flashcard' : 'Create Flashcard'}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('manage')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedDeck?.name || 'Flashcards'}
              </h1>
              <p className="text-gray-600">{deckFlashcards.length} cards</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Card
          </button>
        </div>

        {/* Flashcards Grid */}
        {deckFlashcards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deckFlashcards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 mr-2">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {card.front}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {card.back}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEditingCard(card)}
                      className="p-1 hover:bg-blue-100 rounded text-blue-600 transition-colors"
                      title="Edit card"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteFlashcard(card.id)}
                      className="p-1 hover:bg-red-100 rounded text-red-500 transition-colors"
                      title="Delete card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No flashcards yet</h3>
            <p className="text-gray-600 mb-4">Create your first flashcard to get started!</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Create First Card
            </button>
          </div>
        )}
      </div>
    </div>
  );
}