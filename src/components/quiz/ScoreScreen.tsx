import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface ScoreScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const AnimatedCounter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.5,
      ease: "easeOut",
    });

    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, motionValue, rounded]);

  return <>{displayValue}</>;
};

const getScoreMessage = (percentage: number): string => {
  if (percentage === 100) return "Perfect Score! 🎉";
  if (percentage >= 80) return "Excellent Work!";
  if (percentage >= 60) return "Good Job!";
  if (percentage >= 40) return "Keep Practicing!";
  return "Keep Learning!";
};

const ScoreScreen = ({ score, totalQuestions, onRestart }: ScoreScreenProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const message = getScoreMessage(percentage);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-block bg-card px-6 py-2 rounded-full shadow-sm border border-border mb-8"
      >
        <span className="font-medium text-foreground">{message}</span>
      </motion.div>

      <h2 className="text-3xl sm:text-4xl mb-6">
        <span className="quiz-title quiz-title-italic">Your </span>
        <span className="quiz-title font-semibold">Final score is</span>
      </h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        className="mb-6"
      >
        <span className="font-display text-7xl sm:text-8xl font-bold text-primary">
          <AnimatedCounter value={percentage} />
        </span>
        <span className="font-display text-4xl sm:text-5xl text-primary">%</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-10"
      >
        <p className="text-lg text-foreground font-semibold">
          {score} / {totalQuestions}
        </p>
        <p className="text-sm text-muted-foreground">correct answers</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRestart}
          className="px-8 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold transition-all duration-200 hover:bg-secondary/80 border border-border"
        >
          Start Again
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ScoreScreen;
