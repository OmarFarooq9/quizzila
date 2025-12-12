import { useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getQuestionsByCategory, QuizQuestion } from "@/data/quizQuestions";
import WelcomeScreen from "./WelcomeScreen";
import ProgressBar from "./ProgressBar";
import QuestionDisplay from "./QuestionDisplay";
import OptionsList from "./OptionsList";
import NavigationButtons from "./NavigationButtons";
import ScoreScreen from "./ScoreScreen";
import Timer from "./Timer";
import ReviewScreen from "./ReviewScreen";
import SoundToggle from "./SoundToggle";
import { useSound } from "@/hooks/useSound";

type QuizState = "welcome" | "quiz" | "review" | "results";

const TIMER_DURATION = 30; // seconds per question

const QuizCard = () => {
  const [quizState, setQuizState] = useState<QuizState>("welcome");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { playSound, isMuted, toggleMute } = useSound();
  const hasSubmittedRef = useRef(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const selectedAnswer = answers[currentQuestionIndex] || null;

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setQuestions(getQuestionsByCategory(categoryId));
    playSound("click");
  };

  const handleStart = () => {
    if (selectedCategory && questions.length > 0) {
      setQuizState("quiz");
      playSound("click");
    }
  };

  const handleSelectAnswer = (answer: string) => {
    if (selectedAnswer) return; // Prevent double selection
    
    playSound("click");
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));

    // Play correct/wrong sound after a brief delay
    setTimeout(() => {
      if (answer === currentQuestion.correctAnswer) {
        playSound("correct");
      } else {
        playSound("wrong");
      }
    }, 200);
  };

  const handleTimeUp = useCallback(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizState("review");
    }
  }, [currentQuestionIndex, totalQuestions]);

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      playSound("click");
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      playSound("click");
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleReview = () => {
    playSound("click");
    setQuizState("review");
  };

  const handleBackToQuiz = () => {
    playSound("click");
    setQuizState("quiz");
  };

  const handleSubmit = () => {
    if (isSubmitting || hasSubmittedRef.current) return; // Prevent double submit
    
    setIsSubmitting(true);
    hasSubmittedRef.current = true;
    
    let finalScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        finalScore++;
      }
    });
    setScore(finalScore);
    playSound("complete");
    setQuizState("results");
    setIsSubmitting(false);
  };

  const handleRestart = () => {
    playSound("click");
    // Reset all state
    setQuizState("welcome");
    setSelectedCategory(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScore(0);
    setIsSubmitting(false);
    hasSubmittedRef.current = false;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="quiz-card w-full max-w-2xl mx-auto px-6 sm:px-12 py-8 sm:py-10 relative overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {quizState === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WelcomeScreen 
              totalQuestions={questions.length} 
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              onStart={handleStart} 
            />
          </motion.div>
        )}

        {quizState === "quiz" && currentQuestion && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl sm:text-2xl">
                <span className="quiz-title font-semibold">Test Your </span>
                <span className="quiz-title quiz-title-italic">Knowledge</span>
              </h1>
              <div className="flex items-center gap-2">
                <SoundToggle isMuted={isMuted} onToggle={toggleMute} />
                <Timer
                  duration={TIMER_DURATION}
                  onTimeUp={handleTimeUp}
                  questionIndex={currentQuestionIndex}
                />
              </div>
            </div>

            <ProgressBar
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              answers={answers}
            />

            <QuestionDisplay
              questionNumber={currentQuestionIndex + 1}
              question={currentQuestion.question}
            />

            <OptionsList
              options={currentQuestion.options}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleSelectAnswer}
            />

            <NavigationButtons
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              canGoNext={!!selectedAnswer}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onReview={handleReview}
            />
          </motion.div>
        )}

        {quizState === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ReviewScreen
              questions={questions}
              answers={answers}
              onBack={handleBackToQuiz}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </motion.div>
        )}

        {quizState === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScoreScreen
              score={score}
              totalQuestions={totalQuestions}
              onRestart={handleRestart}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuizCard;
