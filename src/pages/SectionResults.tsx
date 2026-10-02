import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FiArrowLeft, FiArrowRight, FiAward, FiCheck, FiHeadphones, FiPause, FiPlay, FiRotateCcw, FiVolume2 } from "react-icons/fi"
import Workspace from "../components/Workspace"
import { questionSources } from "../questionSources"
import type { SectionResult } from "../types"

const sectionResultsKey = "answerlab-section-results"
const sectionCount = 5

function readSectionResult(sectionIndex: number): SectionResult | null {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(sectionResultsKey) ?? "{}")
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return null
    const result = (saved as Record<number, SectionResult>)[sectionIndex]
    return result && Array.isArray(result.questions) ? result : null
  } catch {
    return null
  }
}

function buildWalkthroughBlocks(questionId: number, source: string) {
  const blocks = source
    .replace(/\*\*/g, "")
    .replace(/\r/g, "")
    .split(/\n\s*\n/)
    .map((block) => block.replace(/\s+/g, " ").trim())
    .filter(Boolean)

  if (!blocks.length) return []

  return blocks.map((block, index) => {
    const clean = block.replace(/^Q\d+[.-]\s*/i, `Q${questionId}- `)
    const label = index === 0
      ? `Q${questionId}-`
      : /^(?:Which|What)\b/i.test(clean)
        ? "Prompt"
        : /^(?:The correct answer|The correct answers)/i.test(clean)
          ? "Answer"
          : /^(?:Definition|Definitions)/i.test(clean)
            ? "Definition"
            : "Detail"

    return { id: `${questionId}-${index}`, label, text: clean }
  })
}

export default function SectionResults() {
  const navigate = useNavigate()
  const { sectionNumber } = useParams()
  const parsedNumber = Number(sectionNumber)
  const sectionIndex = Number.isInteger(parsedNumber) ? parsedNumber - 1 : -1
  const result = sectionIndex >= 0 && sectionIndex < sectionCount ? readSectionResult(sectionIndex) : null
  const passed = result !== null && result.score >= 9
  const isFinalSection = sectionIndex === sectionCount - 1
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null)
  const [audioPaused, setAudioPaused] = useState(false)

  const speakBlock = (id: string, text: string) => {
    if (!("speechSynthesis" in window)) return
    if (activeAudioId === id) {
      window.speechSynthesis.cancel()
      setActiveAudioId(null)
      setAudioPaused(false)
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.onend = () => {
      setActiveAudioId(null)
      setAudioPaused(false)
    }
    utterance.onerror = () => {
      setActiveAudioId(null)
      setAudioPaused(false)
    }

    setActiveAudioId(id)
    setAudioPaused(false)
    window.speechSynthesis.speak(utterance)
  }

  const pauseOrResume = () => {
    if (!("speechSynthesis" in window) || !activeAudioId) return
    if (audioPaused) {
      window.speechSynthesis.resume()
      setAudioPaused(false)
      return
    }
    window.speechSynthesis.pause()
    setAudioPaused(true)
  }

  const stopAudio = () => {
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    setActiveAudioId(null)
    setAudioPaused(false)
  }

  const blocksForQuestion = useMemo(() => {
    return result?.questions.map((question) => {
      const source = questionSources[question.questionId] ?? ""
      const blocks = buildWalkthroughBlocks(question.questionId, source)
      return { question, blocks }
    }) ?? []
  }, [result])

  if (!result) {
    return (
      <Workspace>
        <div className="page-heading"><div><p className="eyebrow">Security+ practice</p><h1>No section results yet.</h1><p>Complete and submit a section to review its answers.</p></div></div>
        <button className="generate-button" type="button" onClick={() => navigate("/")}><FiArrowLeft size={14} /> Back to practice</button>
      </Workspace>
    )
  }

  return (
    <Workspace>
      <div className="page-heading results-page-heading">
        <div>
          <p className="eyebrow"><FiAward size={12} /> Section {String(sectionIndex + 1).padStart(2, "0")} complete</p>
          <h1>Your answers, reviewed.</h1>
          <p>{passed ? "This section is complete and the next one is unlocked." : "Review the correct definitions, then revise this section to improve your score."}</p>
        </div>
        <span className="streak-pill section-result-score"><FiCheck size={13} /> Score {result.score}/{result.total}</span>
      </div>

      <section className="result-review" aria-label={`Section ${sectionIndex + 1} correct answers`}>
        {blocksForQuestion.map(({ question, blocks }, index) => (
          <article className="result-question" key={question.questionId}>
            <div className="result-question-heading">
              <span className="answer-number">{String(index + 1).padStart(2, "0")}</span>
              <h2>{question.prompt}</h2>
              <span className={`result-mark${question.isCorrect ? " is-correct" : " is-missed"}`} aria-label={question.isCorrect ? "Correct" : "Missed"}>{question.isCorrect ? <FiCheck size={14} /> : <FiRotateCcw size={14} />}</span>
            </div>

            <div className="result-correct-answer">
              {blocks.length ? blocks.map((block) => (
                <div key={block.id} className="result-walkthrough-block">
                  <div className="source-block-header">
                    <strong>{block.label}</strong>
                    <button className="listen-link" type="button" onClick={() => speakBlock(`result-${block.id}`, block.text)}>
                      {activeAudioId === `result-${block.id}` ? <FiHeadphones size={13} /> : <FiVolume2 size={12} />}
                      {activeAudioId === `result-${block.id}` ? (audioPaused ? "Resume" : "Pause") : "Listen"}
                    </button>
                  </div>
                  <p>{block.text}</p>
                </div>
              )) : (
                <>
                  <strong>The correct answer is: {question.correctAnswers.map(({ term }) => term).join(" and ")}</strong>
                  {question.correctAnswers.map((answer) => (
                    <p className="result-definition" key={answer.term}>{answer.definition}</p>
                  ))}
                </>
              )}

              {activeAudioId && (
                <div className="speech-controls" role="group" aria-label="Read-aloud playback controls">
                  <button className="speech-control-button" type="button" onClick={pauseOrResume}>
                    {audioPaused ? <FiPlay size={14} /> : <FiPause size={14} />}{audioPaused ? "Resume" : "Pause"}
                  </button>
                  <button className="speech-control-button" type="button" onClick={stopAudio}><FiRotateCcw size={13} /> Stop</button>
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      <div className="results-actions">
        <button className="nav-quiet" type="button" onClick={() => navigate("/")}><FiArrowLeft size={14} /> Practice</button>
        <button className="generate-button" type="button" onClick={() => navigate("/", { state: { resumeGroupIndex: sectionIndex, retrySection: true } })}><FiRotateCcw size={14} /> Revise this section</button>
        {passed && !isFinalSection && <button className="generate-button" type="button" onClick={() => navigate("/", { state: { resumeGroupIndex: sectionIndex + 1 } })}>Next section <FiArrowRight size={14} /></button>}
      </div>
    </Workspace>
  )
}