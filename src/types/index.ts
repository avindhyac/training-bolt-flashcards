/**
 * Type definitions for the Flashcard Study App
 */

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  deckId: string;
  createdAt: number;
}

export interface Deck {
  id: string;
  name: string;
  createdAt: number;
}

export interface StudyStats {
  correct: number;
  incorrect: number;
  total: number;
}

export type AppView = 'landing' | 'manage' | 'study' | 'create-deck';