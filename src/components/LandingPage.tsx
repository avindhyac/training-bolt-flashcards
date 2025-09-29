import { BookOpen, Brain, Plus } from 'lucide-react';
import { AppView } from '../types';

interface LandingPageProps {
  onNavigate: (view: AppView) => void;
  flashcardCount: number;
}

/**
 * Landing page component with navigation options
 */
export function LandingPage({ onNavigate, flashcardCount }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Flashcard Study
          </h1>
          <p className="text-gray-600">
            Master your knowledge with spaced repetition
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{flashcardCount}</p>
            <p className="text-gray-600 text-sm">
              {flashcardCount === 1 ? 'Flashcard' : 'Flashcards'} Available
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => onNavigate('study')}
            disabled={flashcardCount === 0}
            className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-medium transition-all ${
              flashcardCount > 0
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Brain className="w-5 h-5" />
            Start Studying
          </button>

          <button
            onClick={() => onNavigate('manage')}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg font-medium transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            <BookOpen className="w-5 h-5" />
            Manage Flashcards
          </button>

          <button
            onClick={() => onNavigate('create-deck')}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Create New Deck
          </button>
        </div>

        {flashcardCount === 0 && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm text-center">
              Create some flashcards to start studying!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}