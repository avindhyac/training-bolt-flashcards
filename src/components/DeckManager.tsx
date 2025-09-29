import { useState } from 'react';
import { Plus, Trash2, ArrowLeft, Book } from 'lucide-react';
import { Deck, AppView } from '../types';

interface DeckManagerProps {
  decks: Deck[];
  onCreateDeck: (name: string) => void;
  onDeleteDeck: (deckId: string) => void;
  onNavigate: (view: AppView) => void;
  onSelectDeck: (deckId: string) => void;
  getFlashcardCount: (deckId: string) => number;
}

/**
 * Component for managing flashcard decks
 */
export function DeckManager({
  decks,
  onCreateDeck,
  onDeleteDeck,
  onNavigate,
  onSelectDeck,
  getFlashcardCount,
}: DeckManagerProps) {
  const [newDeckName, setNewDeckName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateDeck = () => {
    if (newDeckName.trim()) {
      onCreateDeck(newDeckName.trim());
      setNewDeckName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('landing')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Manage Decks</h1>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Deck
          </button>
        </div>

        {/* Create Deck Form */}
        {isCreating && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Create New Deck</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={newDeckName}
                onChange={(e) => setNewDeckName(e.target.value)}
                placeholder="Enter deck name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyDown={(e) => e.key === 'Enter' && handleCreateDeck()}
                autoFocus
              />
              <button
                onClick={handleCreateDeck}
                disabled={!newDeckName.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setNewDeckName('');
                }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Decks Grid */}
        {decks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {decks.map((deck) => {
              const flashcardCount = getFlashcardCount(deck.id);
              return (
                <div
                  key={deck.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onSelectDeck(deck.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Book className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900 truncate">{deck.name}</h3>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteDeck(deck.id);
                      }}
                      className="p-1 hover:bg-red-100 rounded text-red-500 transition-colors"
                      title="Delete deck"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>{flashcardCount} {flashcardCount === 1 ? 'card' : 'cards'}</p>
                    <p className="text-xs mt-1">
                      Created {new Date(deck.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No decks yet</h3>
            <p className="text-gray-600 mb-4">Create your first deck to get started!</p>
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Create Your First Deck
            </button>
          </div>
        )}
      </div>
    </div>
  );
}