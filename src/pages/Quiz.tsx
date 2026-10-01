import { useEffect, useState } from "react"
import axios from "axios"
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts"
import { FiArrowLeft, FiArrowRight, FiAward, FiCheck, FiHeadphones, FiLoader, FiLock, FiPause, FiPlay, FiRotateCcw, FiVolume2, FiZap } from "react-icons/fi"
import Workspace from "../components/Workspace"
import { questionBank } from "../questionBank"
import { questionSources } from "../questionSources"
import { setAnswerSet, useAppDispatch, useAppSelector } from "../store"
import type { AnswerSet, TermDefinition } from "../types"

const groups = Array.from({ length: Math.ceil(questionBank.length / 10) }, (_, index) => questionBank.slice(index * 10, (index + 1) * 10))
const masteredKey = "answerlab-mastered-question-ids"
const attemptedKey = "answerlab-attempted-question-ids"

function readMastered(): number[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(masteredKey) ?? "[]")
    return Array.isArray(saved) ? saved.filter((id): id is number => Number.isInteger(id) && id > 0 && id <= questionBank.length) : []
  } catch {
    return []
  }
}

function readAttempted(): number[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(attemptedKey) ?? "[]")
    return Array.isArray(saved) ? saved.filter((id): id is number => Number.isInteger(id) && id > 0 && id <= questionBank.length) : []
  } catch {
    return []
  }
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
  const [groupIndex, setGroupIndex] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selection, setSelection] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [mastered, setMastered] = useState(readMastered)
  const [attempted, setAttempted] = useState(readAttempted)
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const [speechPaused, setSpeechPaused] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState("")
  const [aiQuestionId, setAiQuestionId] = useState<number | null>(null)

  const groupQuestions = groups[groupIndex] ?? []
  const question = groupQuestions[questionIndex] ?? questionBank[0]
  const groupMastered = groupQuestions.filter(({ id }) => mastered.includes(id)).length
  const groupAttempted = groupQuestions.filter(({ id }) => attempted.includes(id)).length
  const groupFullyAttempted = groupAttempted === groupQuestions.length
  const groupGoal = groupQuestions.length < 10 ? groupQuestions.length : 9
  const isGroupPassed = groupMastered >= groupGoal
  const correctTotal = mastered.length

  useEffect(() => {
    localStorage.setItem(masteredKey, JSON.stringify(mastered))
  }, [mastered])

  useEffect(() => {
    localStorage.setItem(attemptedKey, JSON.stringify(attempted))
  }, [attempted])

  useEffect(() => () => window.speechSynthesis?.cancel(), [])

  function groupUnlocked(index: number) {
    if (index === 0) return true
    const previousGroup = groups[index - 1] ?? []
    return previousGroup.filter(({ id }) => mastered.includes(id)).length >= 9
  }

  function openGroup(index: number) {
    if (!groupUnlocked(index)) return
    setGroupIndex(index)
    setQuestionIndex(0)
    setSelection([])
    setIsCorrect(null)
    setAiQuestionId(null)
    window.speechSynthesis?.cancel()
    setSpeakingId(null)
    setSpeechPaused(false)
  }

  function resetProgress() {
    if (!window.confirm("Reset all question progress? This clears mastered answers and unlocks.")) return
    setMastered([])
    setAttempted([])
    setGroupIndex(0)
    setQuestionIndex(0)
    setSelection([])
    setIsCorrect(null)
    setAiQuestionId(null)
    setAiError("")
    window.speechSynthesis?.cancel()
    setSpeakingId(null)
    setSpeechPaused(false)
  }

  function openQuestion(index: number) {
    if (index < 0 || index >= groupQuestions.length) return
    setQuestionIndex(index)
    setSelection([])
    setIsCorrect(null)
    setAiQuestionId(null)
    setAiError("")
    window.speechSynthesis?.cancel()
    setSpeakingId(null)
    setSpeechPaused(false)
  }

  function chooseAnswer(option: string) {
    if (isCorrect === true) return
    setSelection((current) => {
      if (question.chooseCount === 1) return [option]
      return current.includes(option) ? current.filter((value) => value !== option) : current.length < question.chooseCount ? [...current, option] : current
    })
    setIsCorrect(null)
  }

  function checkAnswer() {
    const correct = selection.length === question.correct.length && question.correct.every((option) => selection.some((selected) => selected.toLowerCase() === option.toLowerCase()))
    setIsCorrect(correct)
    setAttempted((current) => current.includes(question.id) ? current : [...current, question.id])
    if (correct) setMastered((current) => current.includes(question.id) ? current : [...current, question.id])
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

  function correctAnswerText() {
    const source = questionSources[question.id] ?? ""
    const explanation = source.split(/\r?\n\s*\r?\n/).find((paragraph) => /^(?:and\s+)?the correct answers?\s+(?:is|are)\b/i.test(paragraph.trim()))
    return explanation?.trim() ?? `${question.correct.join(" and ")}. ${question.explanation}`
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
  const percent = Math.round((groupMastered / groupQuestions.length) * 100)
  const hasNextQuestion = questionIndex < groupQuestions.length - 1
  const canAdvanceSet = groupIndex < groups.length - 1 && groupMastered >= 9
  const aiProposals = aiQuestionId === question.id ? answerSet.proposals : []

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
          const unlocked = groupUnlocked(index)
          const passed = count >= (items.length < 10 ? items.length : 9)
          return (
            <button key={items[0].id} className={`group-tab${groupIndex === index ? " is-active" : ""}${passed ? " is-passed" : ""}`} type="button" disabled={!unlocked} onClick={() => openGroup(index)} aria-current={groupIndex === index ? "step" : undefined} title={unlocked ? `Open set ${index + 1}` : "Answer 9 of 10 correctly in the previous set to unlock"}>
              <span className="group-tab-top"><span>SET {String(index + 1).padStart(2, "0")}</span>{!unlocked ? <FiLock size={12} /> : passed ? <FiCheck size={12} /> : null}</span>
              <strong>{String(items[0].id).padStart(2, "0")}-{String(items[items.length - 1].id).padStart(2, "0")}</strong>
              <span className="group-tab-progress">{count}/{items.length} correct</span>
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
            <div className="progress-track" role="progressbar" aria-label="Set mastery" aria-valuenow={groupMastered} aria-valuemin={0} aria-valuemax={groupQuestions.length}><span style={{ width: `${percent}%` }} /></div>
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
              const answerIsCorrect = question.correct.some((correct) => correct.toLowerCase() === option.text.toLowerCase())
              const answerClass = isCorrect !== null && answerIsCorrect ? " is-correct" : isCorrect === false && selected ? " is-incorrect" : ""
              const id = `option-${question.id}-${option.letter}`
              return (
                <div className={`quiz-option${selected ? " is-selected" : ""}${answerClass}`} key={option.letter}>
                  <button className="option-select" type="button" aria-pressed={selected} aria-describedby={`${id}-definition`} onClick={() => chooseAnswer(option.text)}>
                    <span className="option-letter">{option.letter}</span>
                    <span className="option-copy">{option.text}</span>
                    <span className="option-mark" aria-hidden="true">{isCorrect !== null && answerIsCorrect ? <FiCheck size={15} /> : null}</span>
                  </button>
                  <button className={`option-voice${speakingId === id ? " is-speaking" : ""}`} type="button" aria-label={`Read answer ${option.letter} and definition aloud`} title={`Read aloud: ${option.text} and its definition`} onClick={() => speak(id, `${option.text}. ${option.definition}`)}>
                    {speakingId === id ? <FiHeadphones size={14} /> : <FiVolume2 size={14} />}
                  </button>
                  <div className="option-definition-popup">
                    <button className="definition-voice" type="button" aria-label={`Read ${option.text} definition aloud`} title={`Read ${option.text} definition aloud`} onClick={() => speak(`definition-${id}`, `${option.text}. ${option.definition}`)}>
                      {speakingId === `definition-${id}` ? <FiHeadphones size={14} /> : <FiVolume2 size={14} />}
                    </button>
                    <span id={`${id}-definition`} className="option-definition" role="tooltip">{option.definition}</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="answer-actions">
            <span>{selection.length === question.chooseCount ? "Ready when you are" : `Select ${question.chooseCount - selection.length} more`}</span>
            <button className="generate-button check-answer-button" type="button" onClick={checkAnswer} disabled={selection.length !== question.chooseCount || isCorrect !== null}>
              {isCorrect === true ? <FiCheck size={14} /> : <FiCheck size={14} />}{isCorrect === true ? "Mastered" : "Check answer"}
            </button>
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
                <div className="source-transcript">{correctAnswerText()}</div>
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
            {hasNextQuestion ? <button className="generate-button" type="button" onClick={() => openQuestion(questionIndex + 1)}>Next question <FiArrowRight size={14} /></button> : canAdvanceSet ? <button className="generate-button" type="button" onClick={() => openGroup(groupIndex + 1)}>Continue to set {String(groupIndex + 2).padStart(2, "0")} <FiArrowRight size={14} /></button> : groupIndex === groups.length - 1 && isGroupPassed ? <span className="final-complete"><FiCheck size={14} /> Course complete</span> : <span className="locked-next"><FiLock size={12} /> Master 9/10 to continue</span>}
          </div>
          {isGroupPassed && groupIndex < groups.length - 1 && <div className="unlock-banner"><FiCheck size={14} /><span><strong>Set complete.</strong> You mastered {groupMastered} of {groupQuestions.length}; the next set is unlocked.</span></div>}
          {groupFullyAttempted && <section className="set-score-result" aria-live="polite" aria-label={`Set ${groupIndex + 1} score`}>
            <span className="score-result-icon"><FiAward size={17} /></span>
            <div className="score-result-main"><span>SET {String(groupIndex + 1).padStart(2, "0")} SCORE</span><strong>{groupMastered}<small>/{groupQuestions.length}</small></strong></div>
            <p>{groupMastered === groupQuestions.length ? "Perfect set. Every answer is correct." : groupMastered >= groupGoal ? "Set cleared. The next set is unlocked." : "Retry missed questions to improve your score."}</p>
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
            <div className="rail-heading"><h3>Set {String(groupIndex + 1).padStart(2, "0")}</h3><span>{groupMastered}/{groupQuestions.length}</span></div>
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