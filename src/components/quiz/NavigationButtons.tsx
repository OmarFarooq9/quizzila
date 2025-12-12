import { ChevronLeft, ChevronRight, ClipboardList } from "lucide-react";

interface NavigationButtonsProps {
  currentQuestion: number;
  totalQuestions: number;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onReview: () => void;
}

const NavigationButtons = ({
  currentQuestion,
  totalQuestions,
  canGoNext,
  onPrevious,
  onNext,
  onReview,
}: NavigationButtonsProps) => {
  const isLastQuestion = currentQuestion === totalQuestions;

  return (
    <div className="flex items-center justify-between mt-8">
      <button
        onClick={onPrevious}
        disabled={currentQuestion === 1}
        className="nav-button"
        aria-label="Previous question"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>

      <button
        onClick={onReview}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors border border-border"
      >
        <ClipboardList className="w-4 h-4" />
        Review
      </button>

      {isLastQuestion ? (
        <button
          onClick={onReview}
          disabled={!canGoNext}
          className="px-6 py-2 rounded-lg bg-accent text-accent-foreground font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Review & Submit
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className="nav-button"
          aria-label="Next question"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
