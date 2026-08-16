import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, CheckCircle2, Trophy, RotateCcw, ArrowRight } from "lucide-react";
import type { QuizQuestion } from "@/data/courses";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  questions: QuizQuestion[];
}

export const QuizModal = ({ isOpen, onClose, title, questions }: QuizModalProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!questions || questions.length === 0) return null;

  const currentQ = questions[currentIdx];

  const handleSelectOption = (optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentIdx]: optionIdx });
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const correctCount = questions.reduce((count, q, idx) => {
    return selectedAnswers[idx] === q.correctAnswer ? count + 1 : count;
  }, 0);

  const scorePercentage = Math.round((correctCount / questions.length) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6 bg-card border-2 border-primary/20">
        <DialogHeader className="pb-2 border-b">
          <div className="flex items-center justify-between mb-1">
            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0 text-xs font-semibold">
              Knowledge Check Quiz
            </Badge>
            <HelpCircle className="h-4 w-4 text-amber-500" />
          </div>
          <DialogTitle className="text-lg font-bold text-foreground line-clamp-1">
            {title}
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center space-y-6">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 ring-8 ring-amber-500/20 shadow-lg">
              <Trophy className="h-10 w-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold">Quiz Completed!</h2>
              <p className="text-sm text-muted-foreground">
                You scored <strong className="text-primary font-bold">{correctCount} / {questions.length}</strong> ({scorePercentage}%)
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button variant="outline" onClick={handleReset} className="gap-1.5 text-xs font-semibold">
                <RotateCcw className="h-4 w-4" /> Retry Quiz
              </Button>
              <Button onClick={onClose} className="gradient-primary text-primary-foreground font-semibold text-xs gap-1">
                Continue Lesson <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 pt-2">
            {/* Question Progress */}
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span className="text-primary">{Math.round(((currentIdx + 1) / questions.length) * 100)}%</span>
            </div>

            {/* Question Text */}
            <h3 className="text-base font-bold text-foreground leading-snug">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentIdx] === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/30"
                        : "bg-card text-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>

            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentIdx] === undefined}
              className="w-full gradient-primary text-primary-foreground font-bold py-5 text-sm gap-2"
            >
              {currentIdx === questions.length - 1 ? "Submit Quiz" : "Next Question"} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;
