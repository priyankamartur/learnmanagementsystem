import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import type { QuizQuestion } from "@/data/courses";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  questions: QuizQuestion[];
  onQuizComplete?: () => void;
}

export const QuizModal = ({ isOpen, onClose, title, questions, onQuizComplete }: QuizModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!questions || questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (!submitted) {
      setSelectedOption(idx);
    }
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    if (selectedOption === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      setIsFinished(true);
      if (onQuizComplete) onQuizComplete();
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-6 bg-card">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <HelpCircle className="h-5 w-5 text-primary" />
            Knowledge Check: {title}
          </DialogTitle>
        </DialogHeader>

        {isFinished ? (
          <div className="py-8 text-center space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/20">
              <Trophy className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Quiz Completed!</h3>
            <p className="text-muted-foreground text-sm">
              You scored <span className="font-bold text-foreground">{score}</span> out of{" "}
              <span className="font-bold text-foreground">{questions.length}</span> (
              {Math.round((score / questions.length) * 100)}%)
            </p>
            <div className="flex justify-center gap-3 pt-4">
              <Button variant="outline" onClick={handleRestart} className="gap-2">
                <RotateCcw className="h-4 w-4" /> Try Again
              </Button>
              <Button onClick={onClose} className="gradient-primary text-primary-foreground font-semibold">
                Continue Learning
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span>Score: {score}</span>
            </div>

            <h3 className="text-base font-semibold text-foreground leading-snug">
              {currentQ.question}
            </h3>

            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = "border bg-card hover:bg-muted text-foreground";

                if (submitted) {
                  if (idx === currentQ.correctAnswer) {
                    btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold";
                  } else if (isSelected) {
                    btnStyle = "border-destructive bg-destructive/10 text-destructive font-semibold";
                  }
                } else if (isSelected) {
                  btnStyle = "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-3.5 rounded-lg text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {submitted && idx === currentQ.correctAnswer && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 ml-2" />
                    )}
                    {submitted && isSelected && idx !== currentQ.correctAnswer && (
                      <XCircle className="h-4 w-4 text-destructive shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className="p-3.5 rounded-lg bg-muted text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Explanation:</strong> {currentQ.explanation}
              </div>
            )}

            <div className="flex justify-end gap-3 border-t pt-4">
              {!submitted ? (
                <Button
                  onClick={handleCheck}
                  disabled={selectedOption === null}
                  className="gradient-primary text-primary-foreground font-semibold"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNext} className="gradient-primary text-primary-foreground font-semibold">
                  {currentIndex < questions.length - 1 ? "Next Question" : "View Score"}
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;
