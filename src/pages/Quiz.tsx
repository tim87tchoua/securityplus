import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts"
import { FiArrowLeft, FiArrowRight, FiAward, FiCheck, FiHeadphones, FiLoader, FiLock, FiPause, FiPlay, FiRotateCcw, FiVolume2, FiZap } from "react-icons/fi"
import { useLocation, useNavigate } from "react-router-dom"
import Workspace from "../components/Workspace"
import { questionBank } from "../questionBank"
import { getFullTermDefinition } from "../questionDefinitions"
import { questionSources } from "../questionSources"
import { setAnswerSet, useAppDispatch, useAppSelector } from "../store"
import type { AnswerSet, SectionResult, TermDefinition } from "../types"

const groups = Array.from({ length: Math.ceil(questionBank.length / 10) }, (_, index) => questionBank.slice(index * 10, (index + 1) * 10))
const masteredKey = "answerlab-mastered-question-ids"
const responsesKey = "answerlab-question-responses"
const sectionScoresKey = "answerlab-section-scores"
const sectionResultsKey = "answerlab-section-results"

interface QuizRouteState {
  resumeGroupIndex?: number
  retrySection?: boolean
}

interface ScreenWakeLockSentinel {
  release(): Promise<void>
  addEventListener(type: "release", listener: () => void, options?: { once?: boolean }): void
}

function readMastered(): number[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(masteredKey) ?? "[]")
    return Array.isArray(saved) ? saved.filter((id): id is number => Number.isInteger(id) && id > 0 && id <= questionBank.length) : []
  } catch {
    return []
  }
}

function readResponses(): Record<number, string[]> {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(responsesKey) ?? "{}")
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {}
    return Object.fromEntries(Object.entries(saved).flatMap(([key, values]) => {
      const id = Number(key)
      return Number.isInteger(id) && id > 0 && id <= questionBank.length && Array.isArray(values)
        ? [[id, values.filter((value): value is string => typeof value === "string")]]
        : []
    }))
  } catch {
    return {}
  }
}

function readSectionScores(): Record<number, number> {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(sectionScoresKey) ?? "{}")
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {}
    return Object.fromEntries(Object.entries(saved).flatMap(([key, score]) => {
      const index = Number(key)
      return Number.isInteger(index) && index >= 0 && index < groups.length && typeof score === "number" && score >= 0
        ? [[index, score]]
        : []
    }))
  } catch {
    return {}
  }
}

function readSectionResults(): Record<number, SectionResult> {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(sectionResultsKey) ?? "{}")
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {}
    return saved as Record<number, SectionResult>
  } catch {
    return {}
  }
}

function responseIsCorrect(correct: string[], selected: string[]) {
  return selected.length === correct.length && correct.every((option) => selected.some((answer) => answer.toLowerCase() === option.toLowerCase()))
}
function AnswerText({ answer, terms }: { answer: string; terms: TermDefinition[] }) {
  if (!terms.length) return <>{answer}</>
  const matcher = new RegExp(`(${terms.map(({ term }) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi")
  return <>{answer.split(matcher).map((part, index) => {
    const definition = terms.find(({ term }) => term.toLowerCase() === part.toLowerCase())
    return definition ? <span className="term-wrap" key={`${part}-${index}`} tabIndex={0} aria-label={`${part}: ${definition.definition}`}>{part}<span className="term-tooltip" role="tooltip">{definition.definition}</span></span> : part
  })}</>
}

export default function Quiz() {
  const dispatch = useAppDispatch()
  const answerSet = useAppSelector((state) => state.answers)
  const navigate = useNavigate()
  const location = useLocation()
  const routeState = location.state as QuizRouteState | null
  const requestedGroupIndex = routeState?.resumeGroupIndex
  const initialGroupIndex = typeof requestedGroupIndex === "number" && Number.isInteger(requestedGroupIndex) && requestedGroupIndex >= 0 && requestedGroupIndex < groups.length ? requestedGroupIndex : 0
  const [groupIndex, setGroupIndex] = useState(initialGroupIndex)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [mastered, setMastered] = useState(() => {
    const saved = readMastered()
    if (!routeState?.retrySection) return saved
    const revisingIds = new Set((groups[initialGroupIndex] ?? []).map(({ id }) => id))
    return saved.filter((id) => !revisingIds.has(id))
  })
  const [responses, setResponses] = useState(readResponses)
  const [sectionScores, setSectionScores] = useState(() => {
    const saved = readSectionScores()
    if (routeState?.retrySection) delete saved[initialGroupIndex]
    return saved
  })
  const [sectionResults, setSectionResults] = useState(readSectionResults)
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const [speechPaused, setSpeechPaused] = useState(false)
  const [keepScreenAwake, setKeepScreenAwake] = useState(false)
  const [wakeLockActive, setWakeLockActive] = useState(false)
  const [wakeLockError, setWakeLockError] = useState("")
  const wakeLockRef = useRef<ScreenWakeLockSentinel | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState("")
  const [aiQuestionId, setAiQuestionId] = useState<number | null>(null)

  const groupQuestions = groups[groupIndex] ?? []
  const question = groupQuestions[questionIndex] ?? questionBank[0]
  const selection = responses[question.id] ?? []
  const submittedScore = sectionScores[groupIndex]
  const isSectionSubmitted = submittedScore !== undefined
  const groupAnswered = groupQuestions.filter(({ id, chooseCount }) => (responses[id]?.length ?? 0) === chooseCount).length
  const groupMastered = submittedScore ?? groupQuestions.filter(({ id }) => mastered.includes(id)).length
  const isCorrect = isSectionSubmitted ? responseIsCorrect(question.correct, selection) : null
  const groupFullyAttempted = isSectionSubmitted
  const groupGoal = groupQuestions.length < 10 ? groupQuestions.length : 9
  const isGroupPassed = submittedScore !== undefined ? submittedScore >= groupGoal : groupMastered >= groupGoal
  const correctTotal = mastered.length

  useEffect(() => {
    localStorage.setItem(masteredKey, JSON.stringify(mastered))
  }, [mastered])

  useEffect(() => {
    localStorage.setItem(responsesKey, JSON.stringify(responses))
  }, [responses])

  useEffect(() => {
    localStorage.setItem(sectionScoresKey, JSON.stringify(sectionScores))
  }, [sectionScores])

  useEffect(() => {
    localStorage.setItem(sectionResultsKey, JSON.stringify(sectionResults))
  }, [sectionResults])

  useEffect(() => {
    if (!routeState?.retrySection && sectionScores[groupIndex] !== undefined) {
      navigate(`/results/${groupIndex + 1}`, { replace: true })
    }
  }, [groupIndex, navigate, routeState?.retrySection, sectionScores])

  useEffect(() => () => window.speechSynthesis?.cancel(), [])

  useEffect(() => {
    let cancelled = false
    const wakeLockApi = (navigator as Navigator & { wakeLock?: { request(type: "screen"): Promise<ScreenWakeLockSentinel> } }).wakeLock

    if (!keepScreenAwake) {
      const currentLock = wakeLockRef.current
      wakeLockRef.current = null
      if (currentLock) void currentLock.release()
      return
    }

    if (!wakeLockApi) {
      return
    }

    async function acquireWakeLock() {
      if (cancelled || document.visibilityState !== "visible" || wakeLockRef.current) return
      try {
        const lock = await wakeLockApi.request("screen")
        if (cancelled || document.visibilityState !== "visible") {
          void lock.release()
          return
        }
        wakeLockRef.current = lock
        setWakeLockActive(true)
        lock.addEventListener("release", () => {
          if (wakeLockRef.current === lock) {
            wakeLockRef.current = null
            setWakeLockActive(false)
          }
        }, { once: true })
      } catch {
        if (!cancelled) {
          setWakeLockActive(false)
          setWakeLockError("The browser could not keep the screen awake.")
          setKeepScreenAwake(false)
        }
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        void acquireWakeLock()
      } else if (wakeLockRef.current) {
        const currentLock = wakeLockRef.current
        wakeLockRef.current = null
        void currentLock.release()
        setWakeLockActive(false)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    void acquireWakeLock()
    return () => {
      cancelled = true
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      const currentLock = wakeLockRef.current
      wakeLockRef.current = null
      if (currentLock) void currentLock.release()
      setWakeLockActive(false)
    }
  }, [keepScreenAwake])

  function groupUnlocked(index: number) {
    if (index === 0) return true
    const previousGroup = groups[index - 1] ?? []
    const previousScore = sectionScores[index - 1]
    return previousScore !== undefined ? previousScore >= 9 : previousGroup.filter(({ id }) => mastered.includes(id)).length >= 9
  }

  function openGroup(index: number) {
    if (!groupUnlocked(index)) return
    if (sectionScores[index] !== undefined) {
      navigate(`/results/${index + 1}`)
      return
    }
    setGroupIndex(index)
    setQuestionIndex(0)
    setAiQuestionId(null)
    window.speechSynthesis?.cancel()
    setSpeakingId(null)
    setSpeechPaused(false)
  }

  function resetProgress() {
    if (!window.confirm("Reset all question progress? This clears mastered answers and unlocks.")) return
    setMastered([])
    setResponses({})
    setSectionScores({})
    setSectionResults({})
    setGroupIndex(0)
    setQuestionIndex(0)
    setAiQuestionId(null)
    setAiError("")
    window.speechSynthesis?.cancel()
    setSpeakingId(null)
    setSpeechPaused(false)
  }

  function openQuestion(index: number) {
    if (index < 0 || index >= groupQuestions.length) return
    setQuestionIndex(index)
    setAiQuestionId(null)
    setAiError("")
    window.speechSynthesis?.cancel()
    setSpeakingId(null)
    setSpeechPaused(false)
  }

  function chooseAnswer(option: string) {
    if (isSectionSubmitted) return
    const updatedSelection = question.chooseCount === 1
      ? [option]
      : selection.includes(option)
        ? selection.filter((value) => value !== option)
        : selection.length < question.chooseCount
          ? [...selection, option]
          : selection
    setResponses((current) => ({ ...current, [question.id]: updatedSelection }))
  }

  function submitSection() {
    const questions = groupQuestions.map((item) => {
      const selectedAnswers = responses[item.id] ?? []
      const isCorrect = responseIsCorrect(item.correct, selectedAnswers)
      return {
        questionId: item.id,
        prompt: item.prompt,
        selectedAnswers,
        correctAnswers: item.correct.map((term) => ({
          term,
          definition: getFullTermDefinition(item.id, term) ?? item.explanation,
        })),
        isCorrect,
      }
    })
    const correctIds = questions.filter(({ isCorrect }) => isCorrect).map(({ questionId }) => questionId)
    const result: SectionResult = { groupIndex, score: correctIds.length, total: groupQuestions.length, questions }
    const groupIds = new Set(groupQuestions.map(({ id }) => id))
    const nextMastered = [...mastered.filter((id) => !groupIds.has(id)), ...correctIds]
    const nextScores = { ...sectionScores, [groupIndex]: correctIds.length }
    const nextResults = { ...sectionResults, [groupIndex]: result }
    setMastered(nextMastered)
    setSectionScores(nextScores)
    setSectionResults(nextResults)
    localStorage.setItem(masteredKey, JSON.stringify(nextMastered))
    localStorage.setItem(sectionScoresKey, JSON.stringify(nextScores))
    localStorage.setItem(sectionResultsKey, JSON.stringify(nextResults))
    navigate(`/results/${groupIndex + 1}`)
  }

  function retrySection() {
    const nextScores = Object.fromEntries(Object.entries(sectionScores).filter(([index]) => Number(index) !== groupIndex))
    const nextResults = Object.fromEntries(Object.entries(sectionResults).filter(([index]) => Number(index) !== groupIndex))
    const groupIds = new Set(groupQuestions.map(({ id }) => id))
    const nextMastered = mastered.filter((id) => !groupIds.has(id))
    setSectionScores(nextScores)
    setSectionResults(nextResults)
    setMastered(nextMastered)
    localStorage.setItem(sectionScoresKey, JSON.stringify(nextScores))
    localStorage.setItem(sectionResultsKey, JSON.stringify(nextResults))
    localStorage.setItem(masteredKey, JSON.stringify(nextMastered))
    setQuestionIndex(0)
  }

  function speak(id: string, text: string) {
    if (!("speechSynthesis" in window)) return
    if (speakingId === id) {
      window.speechSynthesis.cancel()
      setSpeakingId(null)
      setSpeechPaused(false)
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.onend = () => {
      setSpeakingId(null)
      setSpeechPaused(false)
    }
    utterance.onerror = () => {
      setSpeakingId(null)
      setSpeechPaused(false)
    }
    setSpeakingId(id)
    setSpeechPaused(false)
    window.speechSynthesis.speak(utterance)
  }

  function toggleSpeechPause() {
    if (speechPaused) {
      window.speechSynthesis.resume()
      setSpeechPaused(false)
    } else {
      window.speechSynthesis.pause()
      setSpeechPaused(true)
    }
  }

  function stopSpeech() {
    window.speechSynthesis.cancel()
    setSpeakingId(null)
    setSpeechPaused(false)
  }

  function getTranscriptBlocks() {
    const source = questionSources[question.id] ?? ""
    const sections = source
      .replace(/\*\*/g, "")
      .split(/\r?\n\s*\r?\n/)
      .map((section) => section.replace(/\s+/g, " ").trim())
      .filter(Boolean)

    if (!sections.length) {
      return [{ id: "question", label: String(question.id).padStart(2, "0"), text: `${question.prompt}` }]
    }

    const blocks = sections.map((section, index) => {
      const clean = section.replace(/^Q\d+[.-]\s*/i, "").replace(/^\s*\d{1,2}\s*$/i, "")
      const label = index === 0
        ? ""
        : /^(?:Which|What)\b/i.test(clean)
          ? ""
          : /^(?:The correct answer|The correct answers)/i.test(clean)
            ? "Answer"
            : /^(?:Wrong answer|Wrong answers)/i.test(clean)
              ? "Wrong answer"
              : /^(?:Definition|Definitions)/i.test(clean)
                ? "Definition"
                : ""
      const text = label === "Wrong answer" ? clean.replace(/^Wrong answer\s*[:.-]?\s*/i, "") : clean
      return { id: `${question.id}-${index}`, label, text }
    })

    const combined = blocks.reduce<Array<{ id: string; label: string; text: string }>>((result, block) => {
      if (!result.length) {
        result.push(block)
        return result
      }

      const previous = result[result.length - 1]
      if (previous.label === block.label && previous.label === "Detail") {
        previous.text = `${previous.text} ${block.text}`
        return result
      }

      result.push(block)
      return result
    }, [])

    return combined.slice(0, 6)
  }

  function correctAnswerText() {
    return getTranscriptBlocks().map((block) => block.text).join("\n\n")
  }

  async function askForExplanation() {
    setAiLoading(true)
    setAiError("")
    try {
      const prompt = `Explain this CompTIA Security+ question in three distinct, concise ways. Question: ${question.prompt} Correct answer: ${question.correct.join(" and ")}. Key explanation: ${question.explanation}`
      const response = await axios.post<AnswerSet>("/api/answer", { question: prompt })
      dispatch(setAnswerSet(response.data))
      setAiQuestionId(question.id)
    } catch {
      setAiError("Could not reach the answer service. Start the full-stack server and try again.")
    } finally {
      setAiLoading(false)
    }
  }

  const activity = groups.map((items, index) => ({ set: `S${index + 1}`, count: items.filter(({ id }) => mastered.includes(id)).length }))
  const percent = Math.round(((isSectionSubmitted ? submittedScore ?? 0 : groupAnswered) / groupQuestions.length) * 100)
  const hasNextQuestion = questionIndex < groupQuestions.length - 1
  const canAdvanceSet = groupIndex < groups.length - 1 && submittedScore !== undefined && submittedScore >= 9
  const allQuestionsAnswered = groupAnswered === groupQuestions.length
  const aiProposals = aiQuestionId === question.id ? answerSet.proposals : []
  const wakeLockSupported = typeof navigator !== "undefined" && "wakeLock" in navigator

  return (
    <Workspace>
      <div className="page-heading">
        <div>
          <p className="eyebrow"><FiZap size={12} /> CompTIA Security+ review</p>
          <h1>Practice one set at a time.</h1>
          <p>45 exam-style questions, with explanations for every concept.</p>
        </div>
        <span className="streak-pill"><FiAward size={13} /> {correctTotal} mastered</span>
      </div>

      <div className="quiz-groups" aria-label="Question sets">
        {groups.map((items, index) => {
          const count = items.filter(({ id }) => mastered.includes(id)).length
          const answered = items.filter(({ id, chooseCount }) => (responses[id]?.length ?? 0) === chooseCount).length
          const score = sectionScores[index]
          const unlocked = groupUnlocked(index)
          const passed = score !== undefined ? score >= (items.length < 10 ? items.length : 9) : count >= (items.length < 10 ? items.length : 9)
          return (
            <button key={items[0].id} className={`group-tab${groupIndex === index ? " is-active" : ""}${passed ? " is-passed" : ""}`} type="button" disabled={!unlocked} onClick={() => openGroup(index)} aria-current={groupIndex === index ? "step" : undefined} title={unlocked ? `Open set ${index + 1}` : "Answer 9 of 10 correctly in the previous set to unlock"}>
              <span className="group-tab-top"><span>SET {String(index + 1).padStart(2, "0")}</span>{!unlocked ? <FiLock size={12} /> : passed ? <FiCheck size={12} /> : null}</span>
              <strong>{String(items[0].id).padStart(2, "0")}-{String(items[items.length - 1].id).padStart(2, "0")}</strong>
              <span className="group-tab-progress">{score !== undefined ? `${score}/${items.length} score` : `${answered}/${items.length} answered`}</span>
            </button>
          )
        })}
      </div>

      <div className="quiz-layout">
        <section className="quiz-main" aria-label={`Set ${groupIndex + 1} questions`}>
          <div className="quiz-progress-panel">
            <div className="quiz-progress-top">
              <div><span className="quiz-set-label">SET {String(groupIndex + 1).padStart(2, "0")} <span>/</span> {question.concept}</span><strong>Question {questionIndex + 1} <span>of {groupQuestions.length}</span></strong></div>
              <button className={`voice-button${speakingId === "question" ? " is-speaking" : ""}`} type="button" aria-label="Read question aloud" title="Read question aloud" onClick={() => speak("question", question.prompt)}>
                {speakingId === "question" ? <FiHeadphones size={15} /> : <FiVolume2 size={15} />}
              </button>
            </div>
            <div className="progress-track" role="progressbar" aria-label={isSectionSubmitted ? "Section score" : "Questions answered"} aria-valuenow={isSectionSubmitted ? submittedScore : groupAnswered} aria-valuemin={0} aria-valuemax={groupQuestions.length}><span style={{ width: `${percent}%` }} /></div>
            <p className="quiz-prompt">{question.prompt}</p>
            <p className="choose-hint">{question.chooseCount > 1 ? `Choose ${question.chooseCount} answers` : "Choose the best answer"}</p>
          </div>

          {speakingId && <div className="speech-controls" role="group" aria-label="Read-aloud playback controls">
            <span>{speechPaused ? "Reading paused" : "Reading aloud"}</span>
            <button className="speech-control-button" type="button" onClick={toggleSpeechPause} aria-label={speechPaused ? "Resume reading" : "Pause reading"} title={speechPaused ? "Resume reading" : "Pause reading"}>
              {speechPaused ? <FiPlay size={14} /> : <FiPause size={14} />}{speechPaused ? "Resume" : "Pause"}
            </button>
            <button className="speech-control-button" type="button" onClick={stopSpeech} aria-label="Stop reading" title="Stop reading"><FiRotateCcw size={13} /> Stop</button>
          </div>}

          <div className="quiz-options" role="group" aria-label="Answer choices">
            {question.options.map((option) => {
              const selected = selection.includes(option.text)
              const id = `option-${question.id}-${option.letter}`
              return (
                <div className={`quiz-option${selected ? " is-selected" : ""}`} key={option.letter}>
                  <button className="option-select" type="button" aria-pressed={selected} onClick={() => chooseAnswer(option.text)}>
                    <span className="option-letter">{option.letter}</span>
                    <span className="option-copy">{option.text}</span>
                  </button>
                  <button className={`option-voice${speakingId === id ? " is-speaking" : ""}`} type="button" aria-label={`Read answer ${option.letter} aloud`} title={`Read aloud: ${option.text}`} onClick={() => speak(id, option.text)}>
                    {speakingId === id ? <FiHeadphones size={14} /> : <FiVolume2 size={14} />}
                  </button>
                </div>
              )
            })}
          </div>

          <div className="answer-actions">
            <span>{groupAnswered} of {groupQuestions.length} questions answered</span>
            <span>{selection.length === question.chooseCount ? "Selection saved" : `Select ${question.chooseCount - selection.length} more`}</span>
          </div>

          {isCorrect !== null && (
            <div className={`answer-feedback${isCorrect ? " is-correct" : " is-incorrect"}`} aria-live="polite">
              <div className="feedback-heading">
                <span className="feedback-icon">{isCorrect ? <FiCheck size={15} /> : <FiRotateCcw size={15} />}</span>
                <strong>{isCorrect ? "That's right." : "Not quite. Give it another try."}</strong>
              </div>
              <details className="source-walkthrough" open>
                <summary>Read the complete answer walkthrough</summary>
                <button className="listen-link source-voice" type="button" onClick={() => speak("correct-answer", correctAnswerText())}>
                  {speakingId === "correct-answer" ? <FiHeadphones size={13} /> : <FiPlay size={12} />}
                  {speakingId === "correct-answer" ? "Stop reading" : "Read correct answer aloud"}
                </button>
                <div className="source-transcript">
                  {getTranscriptBlocks().map((block, index) => (
                    <div className="source-block" key={`${block.id}-${index}`}>
                      {block.label && <div className={`source-block-header${block.label === "Wrong answer" ? " wrong-answer-header" : ""}`}><strong>{block.label}</strong></div>}
                      <p>{block.text}</p>
                    </div>
                  ))}
                </div>
              </details>
              {!isCorrect && <span className="correct-answer-note">Correct answer: {question.correct.join(" and ")}</span>}
              {isCorrect && <button className="ai-explain-button" type="button" onClick={askForExplanation} disabled={aiLoading}>
                {aiLoading ? <FiLoader className="loading-spin" size={13} /> : <FiZap size={13} />}{aiLoading ? "Preparing another explanation..." : "Explore this answer another way"}
              </button>}
              {aiError && <p className="error-banner" role="alert">{aiError}</p>}
            </div>
          )}

          {aiProposals.length > 0 && <div className="ai-followup" aria-live="polite">
            <div className="section-title-row"><h2>Another way to understand it</h2><span>AI study aid</span></div>
            <div className="ai-proposal-list">{aiProposals.map((proposal) => (
              <article className="ai-proposal" key={proposal.id}>
                <div className="ai-proposal-top"><strong>{proposal.title}</strong><button className="listen-link" type="button" onClick={() => speak(`ai-${proposal.id}`, `${proposal.title}. ${proposal.answer}`)}>{speakingId === `ai-${proposal.id}` ? <FiHeadphones size={13} /> : <FiPlay size={12} />}Listen</button></div>
                <p><AnswerText answer={proposal.answer} terms={proposal.terms} /></p>
              </article>
            ))}</div>
          </div>}

          <div className="question-navigation">
            <button className="nav-quiet" type="button" onClick={() => openQuestion(questionIndex - 1)} disabled={questionIndex === 0}><FiArrowLeft size={14} /> Previous</button>
            <span>Question {question.id} of {questionBank.length}</span>
            {hasNextQuestion
              ? <button className="generate-button" type="button" onClick={() => openQuestion(questionIndex + 1)} disabled={selection.length !== question.chooseCount}>Next question <FiArrowRight size={14} /></button>
              : !isSectionSubmitted
                ? <button className="generate-button" type="button" onClick={submitSection} disabled={!allQuestionsAnswered}>Submit set score <FiCheck size={14} /></button>
                : canAdvanceSet
                  ? <button className="generate-button" type="button" onClick={() => openGroup(groupIndex + 1)}>Continue to set {String(groupIndex + 2).padStart(2, "0")} <FiArrowRight size={14} /></button>
                  : groupIndex === groups.length - 1 && isGroupPassed
                    ? <span className="final-complete"><FiCheck size={14} /> Course complete</span>
                    : <button className="nav-quiet" type="button" onClick={retrySection}><FiRotateCcw size={14} /> Revise this set</button>}
          </div>
          {isGroupPassed && isSectionSubmitted && groupIndex < groups.length - 1 && <div className="unlock-banner"><FiCheck size={14} /><span><strong>Set complete.</strong> You scored {submittedScore} of {groupQuestions.length}; the next set is unlocked.</span></div>}
          {groupFullyAttempted && <section className="set-score-result" aria-live="polite" aria-label={`Set ${groupIndex + 1} score`}>
            <span className="score-result-icon"><FiAward size={17} /></span>
            <div className="score-result-main"><span>SET {String(groupIndex + 1).padStart(2, "0")} SCORE</span><strong>{submittedScore}<small>/{groupQuestions.length}</small></strong></div>
            <p>{submittedScore === groupQuestions.length ? "Perfect set. Every answer is correct." : isGroupPassed ? "Set cleared. The next set is unlocked." : "Revise your answers and submit again to improve your score."}</p>
          </section>}
        </section>

        <aside className="quiz-rail" aria-label="Study progress">
          <section className="rail-panel mastery-panel">
            <div className="rail-heading">
              <h3>Your progress</h3>
              <div className="progress-heading-actions">
                <span>{questionBank.length} questions</span>
                <button className="reset-progress-button" type="button" onClick={resetProgress} aria-label="Reset all question progress" title="Reset all question progress"><FiRotateCcw size={13} /></button>
              </div>
            </div>
            <div className="mastery-count"><strong>{correctTotal}<small>/{questionBank.length}</small></strong><span>correctly mastered</span></div>
            <div className="screen-awake-setting">
              <div><strong>Keep screen awake</strong><span>{wakeLockError || (wakeLockActive ? "Active while this page is visible" : wakeLockSupported ? "Prevent display sleep during practice" : "Not supported in this browser")}</span></div>
              <button className={`screen-awake-switch${keepScreenAwake ? " is-on" : ""}`} type="button" role="switch" aria-checked={keepScreenAwake} aria-label="Keep screen awake" disabled={!wakeLockSupported} onClick={() => { setWakeLockError(""); setKeepScreenAwake((enabled) => !enabled) }}>
                <span />
              </button>
            </div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activity} margin={{ top: 9, right: 2, left: 2, bottom: 0 }}>
                  <defs><linearGradient id="mastery-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9aab50" stopOpacity={0.24} /><stop offset="100%" stopColor="#9aab50" stopOpacity={0.01} /></linearGradient></defs>
                  <Tooltip cursor={false} formatter={(value) => [`${value} mastered`, "Questions"]} contentStyle={{ border: "1px solid #e4e7dc", borderRadius: 7, fontSize: 10 }} />
                  <Area type="monotone" dataKey="count" stroke="#849642" strokeWidth={2} fill="url(#mastery-fill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-days">{activity.map(({ set }) => <span key={set}>{set}</span>)}</div>
          </section>
          <section className="rail-panel current-set-panel">
            <div className="rail-heading"><h3>Set {String(groupIndex + 1).padStart(2, "0")}</h3><span>{isSectionSubmitted ? `${submittedScore}/${groupQuestions.length} score` : `${groupAnswered}/${groupQuestions.length} answered`}</span></div>
            <div className="current-concept"><span className="concept-dot" />{question.concept}</div>
            <p className="set-rule">{groupIndex === groups.length - 1 ? <>Answer all <strong>{groupQuestions.length} questions</strong> to finish the final set. Missed questions can be retried.</> : <>Answer <strong>9 out of 10</strong> correctly to unlock the next set. Missed questions can be retried.</>}</p>
          </section>
          <section className="rail-panel tip-panel">
            <div className="rail-heading"><h3>Make it stick</h3><FiHeadphones size={14} /></div>
            <p>Listen to each option, check your reasoning, then explain the concept in your own words.</p>
          </section>
        </aside>
      </div>
    </Workspace>
  )
}