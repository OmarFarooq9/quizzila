import { motion } from "framer-motion";

interface OptionsListProps {
  options: string[];
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  disabled?: boolean;
}

const OptionsList = ({ options, selectedAnswer, onSelectAnswer, disabled = false }: OptionsListProps) => {
  const handleSelect = (option: string) => {
    if (disabled || selectedAnswer) return;
    onSelectAnswer(option);
  };

  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <motion.button
          key={option}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          onClick={() => handleSelect(option)}
          disabled={disabled || !!selectedAnswer}
          className={`quiz-option w-full ${
            selectedAnswer === option ? "selected" : ""
          } ${disabled || selectedAnswer ? "cursor-default" : ""}`}
        >
          <span className="font-medium text-foreground">{option}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default OptionsList;
