import { Deck, Flashcard } from '../types';

/**
 * Sample decks and flashcards for demonstration and initial content
 */

export const sampleDecks: Deck[] = [
  {
    id: 'deck-cs',
    name: 'Computer Science Fundamentals',
    createdAt: Date.now() - 86400000 * 3, // 3 days ago
  },
  {
    id: 'deck-history',
    name: 'World History',
    createdAt: Date.now() - 86400000 * 2, // 2 days ago
  },
  {
    id: 'deck-math',
    name: 'Mathematics',
    createdAt: Date.now() - 86400000 * 1, // 1 day ago
  },
  {
    id: 'deck-geography',
    name: 'World Geography',
    createdAt: Date.now(), // Today
  },
];

export const sampleFlashcards: Flashcard[] = [
  // Computer Science Fundamentals
  {
    id: 'cs-1',
    front: 'What is Big O notation?',
    back: 'Big O notation describes the upper bound of an algorithm\'s time or space complexity, representing how the algorithm scales with input size.',
    deckId: 'deck-cs',
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'cs-2',
    front: 'What is the difference between a stack and a queue?',
    back: 'A stack follows LIFO (Last In, First Out) principle, while a queue follows FIFO (First In, First Out) principle.',
    deckId: 'deck-cs',
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'cs-3',
    front: 'What is recursion?',
    back: 'Recursion is a programming technique where a function calls itself to solve a smaller instance of the same problem.',
    deckId: 'deck-cs',
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'cs-4',
    front: 'What is the time complexity of binary search?',
    back: 'O(log n) - Binary search eliminates half of the remaining elements in each step.',
    deckId: 'deck-cs',
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'cs-5',
    front: 'What is a hash table?',
    back: 'A hash table is a data structure that maps keys to values using a hash function, providing average O(1) lookup time.',
    deckId: 'deck-cs',
    createdAt: Date.now() - 86400000 * 3,
  },

  // World History
  {
    id: 'history-1',
    front: 'When did World War II end?',
    back: 'World War II ended on September 2, 1945, with Japan\'s formal surrender.',
    deckId: 'deck-history',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'history-2',
    front: 'Who was the first emperor of Rome?',
    back: 'Augustus (originally named Octavian) became the first Roman Emperor in 27 BCE.',
    deckId: 'deck-history',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'history-3',
    front: 'What year did the Berlin Wall fall?',
    back: 'The Berlin Wall fell on November 9, 1989, marking a significant moment in the end of the Cold War.',
    deckId: 'deck-history',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'history-4',
    front: 'Which empire was ruled by Genghis Khan?',
    back: 'The Mongol Empire, which became the largest contiguous land empire in history.',
    deckId: 'deck-history',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'history-5',
    front: 'What was the Renaissance?',
    back: 'The Renaissance was a period of cultural rebirth in Europe (14th-17th centuries) marked by renewed interest in art, science, and classical learning.',
    deckId: 'deck-history',
    createdAt: Date.now() - 86400000 * 2,
  },

  // Mathematics
  {
    id: 'math-1',
    front: 'What is the Pythagorean theorem?',
    back: 'In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides: a² + b² = c²',
    deckId: 'deck-math',
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'math-2',
    front: 'What is the derivative of sin(x)?',
    back: 'The derivative of sin(x) is cos(x).',
    deckId: 'deck-math',
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'math-3',
    front: 'What is the quadratic formula?',
    back: 'x = (-b ± √(b² - 4ac)) / 2a, used to solve equations of the form ax² + bx + c = 0',
    deckId: 'deck-math',
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'math-4',
    front: 'What is the value of π (pi) to 5 decimal places?',
    back: 'π ≈ 3.14159',
    deckId: 'deck-math',
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'math-5',
    front: 'What is the integral of 1/x?',
    back: 'The integral of 1/x is ln|x| + C (natural logarithm of the absolute value of x plus constant)',
    deckId: 'deck-math',
    createdAt: Date.now() - 86400000 * 1,
  },

  // World Geography
  {
    id: 'geo-1',
    front: 'What is the capital of Australia?',
    back: 'Canberra (not Sydney or Melbourne, which are larger cities)',
    deckId: 'deck-geography',
    createdAt: Date.now(),
  },
  {
    id: 'geo-2',
    front: 'Which is the longest river in the world?',
    back: 'The Nile River in Africa, stretching approximately 6,650 kilometers (4,130 miles).',
    deckId: 'deck-geography',
    createdAt: Date.now(),
  },
  {
    id: 'geo-3',
    front: 'What is the highest mountain peak in the world?',
    back: 'Mount Everest, located in the Himalayas on the border between Nepal and Tibet, at 8,848.86 meters (29,031.7 feet).',
    deckId: 'deck-geography',
    createdAt: Date.now(),
  },
  {
    id: 'geo-4',
    front: 'Which country has the most time zones?',
    back: 'France has the most time zones (12) due to its overseas territories, followed by Russia (11).',
    deckId: 'deck-geography',
    createdAt: Date.now(),
  },
  {
    id: 'geo-5',
    front: 'What is the smallest country in the world?',
    back: 'Vatican City, with an area of approximately 0.17 square miles (0.44 square kilometers).',
    deckId: 'deck-geography',
    createdAt: Date.now(),
  },
];