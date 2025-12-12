import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface TimerProps {
  duration: number; // seconds per question
  onTimeUp: () => void;
  questionIndex: number;
}

const Timer = ({ duration, onTimeUp, questionIndex }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [questionIndex, duration]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const percentage = (timeLeft / duration) * 100;
  const isLow = timeLeft <= 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2"
    >
      <Clock className={`w-4 h-4 ${isLow ? "text-destructive" : "text-muted-foreground"}`} />
      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${isLow ? "bg-destructive" : "bg-primary"}`}
          initial={{ width: "100%" }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <span className={`text-sm font-medium tabular-nums ${isLow ? "text-destructive" : "text-muted-foreground"}`}>
        {timeLeft}s
      </span>
    </motion.div>
  );
};

export default Timer;
