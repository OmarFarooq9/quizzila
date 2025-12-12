import { motion } from "framer-motion";
import { quizCategories } from "@/data/quizQuestions";
import CategorySelector from "./CategorySelector";

interface WelcomeScreenProps {
  totalQuestions: number;
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
  onStart: () => void;
}

const WelcomeScreen = ({ 
  totalQuestions, 
  selectedCategory, 
  onSelectCategory, 
  onStart 
}: WelcomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center py-4"
    >
      <h1 className="text-4xl sm:text-5xl mb-4">
        <span className="quiz-title font-semibold">Test Your </span>
        <span className="quiz-title quiz-title-italic">Knowledge</span>
      </h1>
      
      <p className="text-muted-foreground mb-2">
        Choose a category to begin
      </p>

      <CategorySelector
        categories={quizCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <p className="text-sm text-muted-foreground mb-4">
            {totalQuestions} questions • 30 seconds each
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="px-10 py-4 rounded-2xl bg-accent text-accent-foreground font-bold text-lg transition-all duration-200 hover:opacity-90 shadow-lg"
          >
            Start Quiz
          </motion.button>
        </motion.div>
      )}

      {/* Decorative paw print */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8"
      >
        <svg width="60" height="60" viewBox="0 0 80 80" className="text-pink-200 opacity-80">
          <ellipse cx="40" cy="50" rx="18" ry="16" fill="currentColor" />
          <ellipse cx="22" cy="30" rx="10" ry="10" fill="currentColor" />
          <ellipse cx="58" cy="30" rx="10" ry="10" fill="currentColor" />
          <ellipse cx="32" cy="18" rx="8" ry="8" fill="currentColor" />
          <ellipse cx="48" cy="18" rx="8" ry="8" fill="currentColor" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
