export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  category: string;
}

export interface QuizCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const quizCategories: QuizCategory[] = [
  { id: "general", name: "General Knowledge", icon: "🧠", description: "Test your everyday knowledge" },
  { id: "science", name: "Science", icon: "🔬", description: "Explore the world of science" },
  { id: "geography", name: "Geography", icon: "🌍", description: "Know your world" },
  { id: "animals", name: "Animals", icon: "🐾", description: "Facts about the animal kingdom" },
];

export const quizQuestions: QuizQuestion[] = [
  // General Knowledge
  {
    id: 1,
    question: "What sound does a cat make?",
    options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
    correctAnswer: "Meow-Meow",
    category: "general",
  },
  {
    id: 2,
    question: "What would you probably find in your fridge?",
    options: ["Shoes", "Ice Cream", "Books"],
    correctAnswer: "Ice Cream",
    category: "general",
  },
  {
    id: 3,
    question: "What color are bananas?",
    options: ["Blue", "Yellow", "Red"],
    correctAnswer: "Yellow",
    category: "general",
  },
  {
    id: 4,
    question: "How many days are in a week?",
    options: ["Five", "Seven", "Ten"],
    correctAnswer: "Seven",
    category: "general",
  },
  // Science
  {
    id: 5,
    question: "What planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter"],
    correctAnswer: "Mars",
    category: "science",
  },
  {
    id: 6,
    question: "What do bees make?",
    options: ["Butter", "Honey", "Cheese"],
    correctAnswer: "Honey",
    category: "science",
  },
  {
    id: 7,
    question: "What gas do plants breathe in?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen"],
    correctAnswer: "Carbon Dioxide",
    category: "science",
  },
  {
    id: 8,
    question: "How many planets are in our solar system?",
    options: ["Seven", "Eight", "Nine"],
    correctAnswer: "Eight",
    category: "science",
  },
  // Geography
  {
    id: 9,
    question: "How many stars are in the sky?",
    options: ["Two", "Infinite", "One Hundred"],
    correctAnswer: "Infinite",
    category: "geography",
  },
  {
    id: 10,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Pacific", "Indian"],
    correctAnswer: "Pacific",
    category: "geography",
  },
  {
    id: 11,
    question: "Which continent is the largest?",
    options: ["Africa", "Asia", "Europe"],
    correctAnswer: "Asia",
    category: "geography",
  },
  {
    id: 12,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin"],
    correctAnswer: "Paris",
    category: "geography",
  },
  // Animals
  {
    id: 13,
    question: "What is the fastest land animal?",
    options: ["Lion", "Cheetah", "Horse"],
    correctAnswer: "Cheetah",
    category: "animals",
  },
  {
    id: 14,
    question: "How many legs does a spider have?",
    options: ["Six", "Eight", "Ten"],
    correctAnswer: "Eight",
    category: "animals",
  },
  {
    id: 15,
    question: "What is a baby dog called?",
    options: ["Kitten", "Puppy", "Cub"],
    correctAnswer: "Puppy",
    category: "animals",
  },
  {
    id: 16,
    question: "Which bird cannot fly?",
    options: ["Eagle", "Penguin", "Sparrow"],
    correctAnswer: "Penguin",
    category: "animals",
  },
];

export const getQuestionsByCategory = (categoryId: string): QuizQuestion[] => {
  return quizQuestions.filter((q) => q.category === categoryId);
};
