import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface FlashcardFormProps {
  initialData?: { front: string; back: string } | null;
  onSave: (data: { front: string; back: string }) => void;
  onCancel: () => void;
  title: string;
}

/**
 * Form component for creating and editing flashcards
 */
export function FlashcardForm({ initialData, onSave, onCancel, title }: FlashcardFormProps) {
  const [front, setFront] = useState(initialData?.front || '');
  const [back, setBack] = useState(initialData?.back || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (front.trim() && back.trim()) {
      onSave({ front: front.trim(), back: back.trim() });
    }
  };

  const isValid = front.trim() && back.trim();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              {/* Front Side */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Front Side (Question)
                </label>
                <textarea
                  value={front}
                  onChange={(e) => setFront(e.target.value)}
                  placeholder="Enter the question or prompt..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* Back Side */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Back Side (Answer)
                </label>
                <textarea
                  value={back}
                  onChange={(e) => setBack(e.target.value)}
                  placeholder="Enter the answer or explanation..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
            >
              {initialData ? 'Update Card' : 'Create Card'}
            </button>
          </div>
        </form>

        {/* Preview */}
        {(front || back) && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h4 className="font-medium text-gray-700 mb-2">Front</h4>
                <p className="text-gray-900">{front || 'Your question will appear here...'}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h4 className="font-medium text-gray-700 mb-2">Back</h4>
                <p className="text-gray-900">{back || 'Your answer will appear here...'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}