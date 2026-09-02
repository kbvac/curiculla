"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Question = {
  id: string;
  prompt: string;
  choices: string[];
  order: number;
};

type Assessment = {
  id: string;
  title: string;
  description: string;
  passScore: number;
  skill: string;
  questions: Question[];
};

type QuizResult = {
  attemptId: string;
  score: number;
  passed: boolean;
  correct: number;
  total: number;
  passScore: number;
  results: {
    questionId: string;
    prompt: string;
    choices: string[];
    selected: number;
    correct: number;
    isCorrect: boolean;
    explanation: string;
  }[];
};

export default function QuizPage() {
  const params = useParams();
  const skillSlug = params.skillSlug as string;

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    fetch(`/api/assessments/${skillSlug}`)
      .then((r) => {
        if (!r.ok) throw new Error("No assessment found");
        return r.json();
      })
      .then((d) => {
        setAssessment(d.data);
        setAnswers(new Array(d.data.questions.length).fill(null));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [skillSlug]);

  const handleAnswer = (choiceIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = choiceIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (!assessment) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/assessments/${skillSlug}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: answers.map((a) => a ?? 0) }),
      });
      const data = await res.json();
      setResult(data.data);
      setSubmitted(true);
    } catch {
      setError("Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-muted" />
          <div className="h-4 w-96 rounded bg-muted" />
          <div className="h-64 rounded-lg bg-muted" />
        </div>
      </div>
    );
  }

  if (error || !assessment) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <h1 className="font-display text-2xl font-bold text-fg">No quiz available</h1>
        <p className="mt-2 text-fg-muted">{error || "No assessment found for this skill."}</p>
        <Link href={`/skills/${skillSlug}`} className="mt-4 inline-block text-accent hover:text-accent-dark">
          Back to skill
        </Link>
      </div>
    );
  }

  // Results view
  if (submitted && result) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className={`rounded-lg border p-6 ${result.passed ? "border-success/30 bg-success-light/30" : "border-red-300 bg-red-50"}`}>
          <h1 className="font-display text-2xl font-bold text-fg">
            {result.passed ? "Quiz Passed!" : "Not quite there yet"}
          </h1>
          <div className="mt-4 flex items-center gap-6">
            <div className="text-4xl font-bold text-accent">{result.score}%</div>
            <div className="text-sm text-fg-muted">
              {result.correct}/{result.total} correct
              <br />
              Seuil de réussite : {result.passScore}%
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <h2 className="font-display text-lg font-semibold text-fg">Review Answers</h2>
          {result.results.map((r, i) => (
            <div
              key={r.questionId}
              className={`rounded-lg border p-4 ${r.isCorrect ? "border-success/30" : "border-red-300"}`}
            >
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 text-lg ${r.isCorrect ? "text-success" : "text-red-500"}`}>
                  {r.isCorrect ? "✓" : "✗"}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-fg">
                    {i + 1}. {r.prompt}
                  </p>
                  <div className="mt-2 space-y-1">
                    {r.choices.map((choice, ci) => (
                      <div
                        key={ci}
                        className={`rounded px-3 py-1.5 text-sm ${
                          ci === r.correct
                            ? "bg-success-light font-medium text-success"
                            : ci === r.selected && !r.isCorrect
                            ? "bg-red-50 text-red-600"
                            : "text-fg-muted"
                        }`}
                      >
                        {choice}
                        {ci === r.correct && " ✓"}
                        {ci === r.selected && !r.isCorrect && " ✗"}
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-fg-faint">{r.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          <Link
            href={`/skills/${skillSlug}`}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-fg hover:border-accent/40"
          >
            Back to skill
          </Link>
          <button
            onClick={() => {
              setSubmitted(false);
              setResult(null);
              setCurrentQ(0);
              setAnswers(new Array(assessment.questions.length).fill(null));
            }}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark"
          >
            Repasser le quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz view
  const question = assessment.questions[currentQ];
  const progress = ((currentQ + 1) / assessment.questions.length) * 100;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-6">
        <Link href={`/skills/${skillSlug}`} className="text-sm text-fg-muted hover:text-fg">
          &larr; {assessment.skill}
        </Link>
        <h1 className="mt-2 font-display text-2xl font-bold text-fg">{assessment.title}</h1>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-fg-muted">
          <span>Question {currentQ + 1} of {assessment.questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar mt-2">
          <div className="progress-bar-fill bg-accent" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-medium text-fg">{question.prompt}</h2>
        <div className="mt-4 space-y-2">
          {question.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className={`w-full rounded-lg border p-3 text-left text-sm transition-all ${
                answers[currentQ] === i
                  ? "border-accent bg-accent-light/50 font-medium text-accent-dark"
                  : "border-border hover:border-border-strong"
              }`}
            >
              <span className="mr-2 font-medium text-fg-faint">{String.fromCharCode(65 + i)}.</span>
              {choice}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setCurrentQ((q) => Math.max(0, q - 1))}
          disabled={currentQ === 0}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-fg disabled:opacity-30"
        >
          Previous
        </button>

        {currentQ < assessment.questions.length - 1 ? (
          <button
            onClick={() => setCurrentQ((q) => q + 1)}
            className="rounded-lg bg-fg px-4 py-2 text-sm font-medium text-card hover:bg-fg/90"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting || answers.includes(null)}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit quiz"}
          </button>
        )}
      </div>
    </div>
  );
}
