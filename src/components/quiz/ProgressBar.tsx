import { motion } from "framer-motion";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  answers: Record<number, string>;
}

const ProgressBar = ({ currentQuestion, totalQuestions, answers }: ProgressBarProps) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="mb-6">
      {/* Continuous progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Question indicators */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const isAnswered = answers[index] !== undefined;
          const isCurrent = index === currentQuestion - 1;
          
          return (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                isCurrent
                  ? "w-4 bg-primary"
                  : isAnswered
                  ? "bg-accent"
                  : "bg-border"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
