import { motion } from "framer-motion";
import { Check, X, ChevronLeft } from "lucide-react";
import { QuizQuestion } from "@/data/quizQuestions";

interface ReviewScreenProps {
  questions: QuizQuestion[];
  answers: Record<number, string>;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const ReviewScreen = ({ questions, answers, onBack, onSubmit, isSubmitting = false }: ReviewScreenProps) => {
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-4"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl mb-2">
          <span className="quiz-title font-semibold">Review Your </span>
          <span className="quiz-title quiz-title-italic">Answers</span>
        </h2>
        <p className="text-muted-foreground text-sm">
          {answeredCount} of {questions.length} questions answered
        </p>
      </div>

      <div className="max-h-[300px] overflow-y-auto space-y-3 mb-6 pr-2">
        {questions.map((question, index) => {
          const hasAnswer = answers[index] !== undefined;
          return (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 rounded-xl border ${
                hasAnswer ? "bg-secondary/50 border-accent/30" : "bg-muted/30 border-destructive/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  hasAnswer ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {hasAnswer ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    Q{index + 1}: {question.question}
                  </p>
                  <p className={`text-xs mt-1 ${hasAnswer ? "text-accent" : "text-destructive"}`}>
                    {hasAnswer ? `Your answer: ${answers[index]}` : "Not answered"}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Quiz
        </button>
        <button
          onClick={onSubmit}
          disabled={!allAnswered || isSubmitting}
          className="px-6 py-2 rounded-lg bg-accent text-accent-foreground font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Quiz"}
        </button>
      </div>

      {!allAnswered && (
        <p className="text-center text-destructive text-xs mt-3">
          Please answer all questions before submitting
        </p>
      )}
    </motion.div>
  );
};

export default ReviewScreen;
