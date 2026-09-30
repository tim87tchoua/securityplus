import { gql, useQuery } from "urql"
import { FiArrowUpRight, FiBookOpen, FiClock, FiLoader } from "react-icons/fi"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import Workspace from "../components/Workspace"

interface SessionRecord {
  id: string
  question: string
  createdAt: string
  proposalCount: number
  source: string
}

const HISTORY_QUERY = gql`
  query RecentSessions {
    history {
      id
      question
      createdAt
      proposalCount
      source
    }
  }
`

const weeklyPractice = [
  { day: "Mon", sessions: 2 }, { day: "Tue", sessions: 4 }, { day: "Wed", sessions: 3 },
  { day: "Thu", sessions: 5 }, { day: "Fri", sessions: 2 }, { day: "Sat", sessions: 6 }, { day: "Sun", sessions: 3 },
]

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Just now"
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(date)
}

export default function Library() {
  const [{ data, fetching, error }] = useQuery<{ history: SessionRecord[] }>({ query: HISTORY_QUERY, requestPolicy: "cache-and-network" })
  const sessions = data?.history ?? []

  return (
    <Workspace>
      <div className="page-heading">
        <div>
          <p className="eyebrow"><FiClock size={12} /> Keep your curiosity close</p>
          <h1>Your practice, in one place.</h1>
          <p>Pick up where you left off and notice how your understanding grows.</p>
        </div>
        <span className="streak-pill"><FiBookOpen size={12} /> {sessions.length} saved {sessions.length === 1 ? "session" : "sessions"}</span>
      </div>

      <div className="history-layout">
        <section>
          <div className="section-title-row" style={{ marginTop: 0 }}><h2>Recent questions</h2><span>Newest first</span></div>
          {fetching && sessions.length === 0 && <div className="history-list" aria-label="Loading recent sessions"><div className="skeleton-row" /><div className="skeleton-row" /><div className="skeleton-row" /></div>}
          {error && <p className="error-banner" role="alert">History is unavailable. Start the full-stack server to load saved sessions.</p>}
          {!fetching && !error && sessions.length === 0 && (
            <div className="empty-state"><FiBookOpen size={20} /><p>Your next good question belongs here.</p><span>Head to the practice studio to start a session.</span></div>
          )}
          {sessions.length > 0 && <div className="history-list">
            {sessions.map((session) => (
              <article className="history-item" key={session.id}>
                <span className="history-icon"><FiBookOpen size={16} /></span>
                <div className="history-text"><p>{session.question}</p><span>{formatDate(session.createdAt)} · {session.source === "openai" ? "AI answers" : "Practice answers"}</span></div>
                <span className="history-count">{session.proposalCount} answers</span>
                <FiArrowUpRight size={14} color="#9aa398" aria-hidden="true" />
              </article>
            ))}
          </div>}
        </section>

        <aside className="right-rail">
          <section className="rail-panel">
            <div className="rail-heading"><h3>Practice rhythm</h3><span>Last 7 days</span></div>
            <div className="chart-summary"><strong>{sessions.length}</strong><span>questions explored</span></div>
            <div className="library-chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyPractice} margin={{ top: 10, right: 0, left: -22, bottom: 0 }}>
                  <defs><linearGradient id="history-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9aab50" stopOpacity={0.22} /><stop offset="100%" stopColor="#9aab50" stopOpacity={0.01} /></linearGradient></defs>
                  <CartesianGrid stroke="#edf0e8" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#969f94", fontSize: 9 }} />
                  <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "#969f94", fontSize: 9 }} />
                  <Tooltip contentStyle={{ border: "1px solid #e4e7dc", borderRadius: 7, fontSize: 10 }} />
                  <Area type="monotone" dataKey="sessions" stroke="#849642" strokeWidth={2} fill="url(#history-fill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-legend"><i /> Questions explored per day</div>
          </section>
          <section className="rail-panel tip-panel">
            <div className="rail-heading"><h3>Small steps count</h3><FiBookOpen size={14} /></div>
            <p>Coming back to an idea is part of learning it. Revisit a question and see what feels clearer this time.</p>
          </section>
        </aside>
      </div>
      {fetching && sessions.length > 0 && <span className="source-note"><FiLoader className="loading-spin" size={12} /> Updating history...</span>}
    </Workspace>
  )
}