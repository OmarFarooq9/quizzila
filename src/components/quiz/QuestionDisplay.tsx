import { motion } from "framer-motion";

interface QuestionDisplayProps {
  questionNumber: number;
  question: string;
}

const QuestionDisplay = ({ questionNumber, question }: QuestionDisplayProps) => {
  return (
    <motion.div
      key={questionNumber}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="quiz-question-pill mb-6"
    >
      <span className="font-semibold text-foreground">
        {questionNumber}. {question}
      </span>
    </motion.div>
  );
};

export default QuestionDisplay;
