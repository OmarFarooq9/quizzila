import { motion } from "framer-motion";
import { QuizCategory } from "@/data/quizQuestions";

interface CategorySelectorProps {
  categories: QuizCategory[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

const CategorySelector = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 mt-6">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectCategory(category.id)}
          className={`p-4 rounded-xl border transition-all duration-200 text-left ${
            selectedCategory === category.id
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card border-border hover:border-primary/30 hover:bg-secondary"
          }`}
        >
          <span className="text-2xl mb-2 block">{category.icon}</span>
          <span className="font-semibold text-sm block">{category.name}</span>
          <span className={`text-xs ${selectedCategory === category.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
            {category.description}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategorySelector;
