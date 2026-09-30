import "dotenv/config"
import cors from "cors"
import express from "express"
import { buildSchema } from "graphql"
import { createHandler } from "graphql-http/lib/use/express"
import OpenAI from "openai"
import { randomUUID } from "node:crypto"

const app = express()
const port = Number(process.env.PORT || 4100)
const sessions = []

app.use(cors())
app.use(express.json({ limit: "1mb" }))

const schema = buildSchema(`
  type QuestionSession {
    id: String!
    question: String!
    createdAt: String!
    proposalCount: Int!
    source: String!
  }
  type Query {
    history: [QuestionSession!]!
  }
`)

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", openAIConfigured: Boolean(process.env.OPENAI_API_KEY) })
})

app.post("/api/answer", async (request, response) => {
  const question = typeof request.body?.question === "string" ? request.body.question.trim() : ""
  if (!question) return response.status(400).json({ error: "Enter a question to get started." })
  if (question.length > 1000) return response.status(400).json({ error: "Questions must be 1,000 characters or fewer." })

  try {
    let proposals
    let source = "demo"

    if (process.env.OPENAI_API_KEY) {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are a patient cybersecurity tutor. Return JSON with a proposals array of exactly 3 objects. Each object has title, style, answer, and terms (an array of objects with term and a short plain-language definition). Make the answers accurate, distinct, concise, and relevant to the user's question. Include only terms that appear verbatim in that answer." },
          { role: "user", content: question },
        ],
      })
      const content = completion.choices[0]?.message.content
      const parsed = JSON.parse(content || "{}")
      if (!Array.isArray(parsed.proposals) || parsed.proposals.length < 3) throw new Error("The answer service returned an incomplete response.")
      proposals = parsed.proposals.slice(0, 3).map((proposal, index) => ({
        id: randomUUID(),
        title: String(proposal.title || `Perspective ${index + 1}`),
        style: String(proposal.style || "EXPLANATION"),
        answer: String(proposal.answer || ""),
        terms: Array.isArray(proposal.terms) ? proposal.terms.map((term) => ({ term: String(term.term || ""), definition: String(term.definition || "") })).filter((term) => term.term && term.definition) : [],
      }))
      source = "openai"
    } else {
      proposals = [
        {
          id: randomUUID(), title: "Begin with the essentials", style: "PLAIN LANGUAGE",
          answer: `A clear way to approach “${question}” is to identify what needs protecting, what could go wrong, and which security control lowers that risk. Start with the core idea, then connect it to a practical outcome.`,
          terms: [{ term: "security control", definition: "A safeguard used to reduce risk or protect systems, data, and people." }],
        },
        {
          id: randomUUID(), title: "Connect it to the mechanism", style: "HOW IT WORKS",
          answer: "Strong security uses defense in depth: identity checks, least privilege, and monitoring work together. If one safeguard misses a threat, the other layers can limit its impact and help teams respond.",
          terms: [
            { term: "defense in depth", definition: "Using multiple different safeguards so one failure does not expose everything." },
            { term: "least privilege", definition: "Giving each account only the access it needs to do its job." },
            { term: "monitoring", definition: "Reviewing system activity to spot suspicious behavior or changes." },
          ],
        },
        {
          id: randomUUID(), title: "Put it into practice", style: "REAL-WORLD VIEW",
          answer: "Picture a team reviewing this question during an incident. They would confirm the facts, choose a proportionate control, and check that it works. That turns the idea into a repeatable security decision rather than a definition to memorize.",
          terms: [{ term: "proportionate control", definition: "A safeguard matched to the likelihood and potential impact of a risk." }],
        },
      ]
    }

    const session = { id: randomUUID(), question, createdAt: new Date().toISOString(), source, proposals }
    sessions.unshift({ ...session, proposalCount: proposals.length })
    if (sessions.length > 100) sessions.pop()
    return response.json(session)
  } catch (error) {
    console.error("Answer generation failed:", error)
    return response.status(502).json({ error: "The answer service could not complete this request." })
  }
})

app.all("/graphql", createHandler({
  schema,
  rootValue: { history: () => sessions },
}))

app.listen(port, () => {
  console.log(`Answerlab API listening on http://localhost:${port}`)
})