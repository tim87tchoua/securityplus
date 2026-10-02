export interface TermDefinition {
  term: string
  definition: string
}

export interface Proposal {
  id: string
  title: string
  style: string
  answer: string
  terms: TermDefinition[]
}

export interface AnswerSet {
  id: string
  question: string
  createdAt: string
  source: "openai" | "demo"
  proposals: Proposal[]
}

export interface CorrectAnswerDefinition {
  term: string
  definition: string
}

export interface SectionQuestionResult {
  questionId: number
  prompt: string
  selectedAnswers: string[]
  correctAnswers: CorrectAnswerDefinition[]
  isCorrect: boolean
}

export interface SectionResult {
  groupIndex: number
  score: number
  total: number
  questions: SectionQuestionResult[]
}