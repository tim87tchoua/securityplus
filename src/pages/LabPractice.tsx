import { useEffect, useMemo, useRef, useState } from "react"
import { FiActivity, FiBookOpen, FiFileText, FiSearch } from "react-icons/fi"
import Workspace from "../components/Workspace"
import PdfLabReader from "../components/PdfLabReader"

type LabCategory = "Foundations" | "Endpoint monitoring" | "Threat hunting" | "Compliance" | "Detection & response"

interface LabDocument {
  number: number
  title: string
  filename: string
  category: LabCategory
}

const labs: LabDocument[] = [
  { number: 1, title: "What is Wazuh?", filename: "1-What is Wazuh.pdf", category: "Foundations" },
  { number: 2, title: "Wazuh installation prerequisites", filename: "2-Wazuh Installation Prerequisites.pdf", category: "Foundations" },
  { number: 3, title: "Install Wazuh SIEM on Ubuntu Server", filename: "3-How to Install Wazuh SIEM on Ubuntu Server.pdf", category: "Foundations" },
  { number: 4, title: "Install Sysmon for advanced Windows security logging", filename: "4-How-to-Install-Sysmon-for-Advanced-Windows-Security-Logging.pdf", category: "Endpoint monitoring" },
  { number: 5, title: "Configure centralized agent groups", filename: "5-How-to-configure-Centralized-Agent-Groups-in-Wazuh.pdf", category: "Foundations" },
  { number: 6, title: "Collect Windows Defender and system logs", filename: "6-How-to-Collect-windows-defender-and-system-Logs-in-Wazuh-SIEM.pdf", category: "Endpoint monitoring" },
  { number: 7, title: "Wazuh file integrity monitoring", filename: "7-Wazuh FIM TutorielFile-Integrity-Monitoring.pdf", category: "Endpoint monitoring" },
  { number: 8, title: "Configure who-data on Windows for Wazuh FIM", filename: "8-How-to-Configure-Whodata-on-Windows-for-Wazuh-FIM.pdf", category: "Endpoint monitoring" },
  { number: 9, title: "VirusTotal integration for malware detection", filename: "9-Wazuh-Virusotal-Integration-for-Malware-Detection.pdf", category: "Detection & response" },
  { number: 10, title: "Detect fileless malware with Sysmon", filename: "10-Integration-of-Sysmon-with-Wazuh-to-Detect-Fileless-Malware.pdf", category: "Detection & response" },
  { number: 11, title: "Threat hunting and effective log collection", filename: "11-intro-threat-hunting-and-Effective-Log-Collection-Strategies-for-Threat-Hunting-with-Wazuh.pdf", category: "Threat hunting" },
  { number: 12, title: "Use MITRE ATT&CK with Wazuh for threat hunting", filename: "12-How-to-Use-MITRE-ATT&CK-with-Wazuh -SIEM-for-Threat-Hunting.pdf", category: "Threat hunting" },
  { number: 13, title: "Simulate MITRE ATT&CK with Atomic Red Team", filename: "13-Simulating-MITRE-ATT&CK-with-Invoke-Atomic-Red-Team-in-Wazuh.pdf", category: "Threat hunting" },
  { number: 14, title: "Detect PowerShell abuse techniques", filename: "14-How-to-detect-PowerShell-abuse-techniques-in-Wazuh-for-threat-hunting.pdf", category: "Threat hunting" },
  { number: 15, title: "Set up vulnerability detection", filename: "15-How-to-Set-Up-Vulnerability-Detection-in-Wazuh-for-Threat-Hunting.pdf", category: "Threat hunting" },
  { number: 16, title: "Security Configuration Assessment (SCA)", filename: "16-How to Use Wazuh for Security Configuration Assessment (SCA).pdf", category: "Compliance" },
  { number: 17, title: "Run compliance benchmark scans", filename: "17 How to Run Compliance Benchmark Scans in Wazuh.pdf", category: "Compliance" },
  { number: 18, title: "Check regulatory compliance: PCI DSS, GDPR, NIST, HIPAA", filename: "18 How to Check Regulatory Compliance in Wazuh PCI DSS-GDPR-NIST-HIPAA.pdf", category: "Compliance" },
  { number: 19, title: "Integrate Suricata for network intrusion detection", filename: "19 How to Integrate Suricata with Wazuh for Network Intrusion Detection.pdf", category: "Detection & response" },
  { number: 20, title: "Detect SQL injection, XSS, and file inclusion", filename: "20-How to Detect SQL Injection, XSS & File Inclusion with Wazuh SIEM.pdf", category: "Detection & response" },
  { number: 21, title: "Block RDP attackers with Windows Firewall active response", filename: "21-Automating Windows Firewall Blocks via Wazuh Active Response for RDP Attackers.pdf", category: "Detection & response" },
  { number: 22, title: "Disable unauthorized accounts with active response", filename: "22-Automating Wazuh Active Response to Disable Unauthorized New User Accounts.pdf", category: "Detection & response" },
]

const categories = ["All labs", "Foundations", "Endpoint monitoring", "Threat hunting", "Compliance", "Detection & response"] as const

export default function LabPractice() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<(typeof categories)[number]>("All labs")
  const [selectedLab, setSelectedLab] = useState<LabDocument | null>(null)
  const readerRef = useRef<HTMLDivElement>(null)
  const filteredLabs = useMemo(() => labs.filter((lab) => {
    const matchesCategory = category === "All labs" || lab.category === category
    const search = query.trim().toLowerCase()
    return matchesCategory && (!search || `${lab.title} ${lab.category}`.toLowerCase().includes(search))
  }), [category, query])

  useEffect(() => {
    if (selectedLab) readerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [selectedLab])

  return (
    <Workspace>
      <div className="page-heading">
        <div>
          <p className="eyebrow"><FiActivity size={12} /> Hands-on Wazuh practice</p>
          <h1>Lab practique</h1>
          <p>Work through the labs and keep each course document close at hand.</p>
        </div>
        <span className="streak-pill"><FiFileText size={13} /> {labs.length} course PDFs</span>
      </div>

      <section className="lab-library" aria-label="Wazuh lab courses">
        <div className="lab-toolbar">
          <label className="lab-search">
            <FiSearch size={16} aria-hidden="true" />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search labs" aria-label="Search labs" />
          </label>
          <label className="lab-filter-label" htmlFor="lab-category">Course</label>
          <select id="lab-category" className="lab-category-select" value={category} onChange={(event) => setCategory(event.target.value as (typeof categories)[number])}>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <span className="lab-result-count">{filteredLabs.length} of {labs.length}</span>
        </div>

        {selectedLab && <div ref={readerRef}><PdfLabReader key={selectedLab.filename} title={selectedLab.title} filename={selectedLab.filename} onClose={() => setSelectedLab(null)} /></div>}

        {filteredLabs.length > 0 ? <div className="lab-course-list">
          {filteredLabs.map((lab) => (
            <article className="lab-course-row" key={lab.number}>
              <span className="lab-file-icon"><FiFileText size={17} /></span>
              <div className="lab-course-copy">
                <span className="lab-course-kicker">LAB {String(lab.number).padStart(2, "0")} <span>·</span> {lab.category}</span>
                <h2>{lab.title}</h2>
              </div>
              <button className="lab-pdf-link" type="button" onClick={() => setSelectedLab(lab)} aria-label={`Read online: ${lab.title}`}>
                <span>Read online</span><FiBookOpen size={15} />
              </button>
            </article>
          ))}
        </div> : <div className="lab-empty-state"><FiSearch size={18} /><p>No labs match that search.</p><button type="button" onClick={() => { setQuery(""); setCategory("All labs") }}>Clear filters</button></div>}
      </section>
    </Workspace>
  )
}