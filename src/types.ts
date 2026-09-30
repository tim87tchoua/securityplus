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