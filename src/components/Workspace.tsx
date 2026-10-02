import { useState, type ReactNode } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { FiActivity, FiBookOpen, FiClock, FiHome, FiLinkedin, FiMenu, FiX } from "react-icons/fi"
import { SiFacebook, SiInstagram, SiTiktok, SiYoutube } from "react-icons/si"
import type { IconType } from "react-icons"

const trainerChannels: { name: string; href: string; icon: IconType }[] = [
  { name: "YouTube", href: "https://www.youtube.com/results?search_query=TimSandTech", icon: SiYoutube },
  { name: "Instagram", href: "https://www.instagram.com/explore/search/keyword/?q=TimSandTech", icon: SiInstagram },
  { name: "TikTok", href: "https://www.tiktok.com/search?q=TimSandTech", icon: SiTiktok },
  { name: "Facebook", href: "https://www.facebook.com/search/top?q=TimSandTech", icon: SiFacebook },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/timothee-djouokep-tchouamou-a369183a6/", icon: FiLinkedin },
]

export default function Workspace({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const pageName = location.pathname === "/library" ? "Your sessions" : location.pathname === "/labs" ? "Lab practique" : location.pathname.startsWith("/results/") ? "Section results" : "Practice studio"

  return (
    <div className="app-shell">
      <aside className={`sidebar${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
        <NavLink className="brand" to="/" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark"><img src="/tinsandtech.png" alt="TimSandTech logo" /></span>
          <span className="brand-copy">TimSandTech</span>
        </NavLink>
        <p className="brand-subtitle brand-copy">Security+ practice</p>
        <p className="side-label">Workspace</p>
        <nav className="side-nav">
          <NavLink end className={({ isActive }) => `side-link${isActive ? " active" : ""}`} to="/" onClick={() => setMenuOpen(false)}>
            <FiHome size={16} /><span>Practice studio</span>
          </NavLink>
          <NavLink className={({ isActive }) => `side-link${isActive ? " active" : ""}`} to="/library" onClick={() => setMenuOpen(false)}>
            <FiClock size={16} /><span>Your sessions</span>
          </NavLink>
          <NavLink className={({ isActive }) => `side-link${isActive ? " active" : ""}`} to="/labs" onClick={() => setMenuOpen(false)}>
            <FiActivity size={16} /><span>Lab practique</span>
          </NavLink>
        </nav>
        <div className="side-divider" />
        <p className="side-label">Your learning</p>
        <div className="side-nav">
          <NavLink className="side-link" to="/" onClick={() => setMenuOpen(false)}>
            <FiBookOpen size={16} /><span>Security fundamentals</span>
          </NavLink>
        </div>
        <div className="trainer-card">
          <img className="trainer-image" src="/tim.jpeg" alt="Tims TCHOUAMOU" />
          <span className="trainer-label">YOUR TRAINER</span>
          <strong className="trainer-name">Tims TCHOUAMOU</strong>
          <span className="trainer-role">Security Engineer</span>
          <div className="trainer-links" aria-label="TimSandTech channels">
            {trainerChannels.map(({ name, href, icon: ChannelIcon }) => (
              <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={`Find TimSandTech on ${name}`} title={`Find TimSandTech on ${name}`}>
                <ChannelIcon size={14} /><span>{name}</span>
              </a>
            ))}
          </div>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <button className="mobile-menu" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <FiX size={17} /> : <FiMenu size={17} />}
          </button>
          <div className="crumb">Workspace <span aria-hidden="true">/</span> <strong>{pageName}</strong></div>
          <div className="topbar-right"><span className="today-label">A little practice goes a long way</span><span className="topbar-avatar">TT</span></div>
        </header>
        <main className="page-content">{children}</main>
      </div>
    </div>
  )
}