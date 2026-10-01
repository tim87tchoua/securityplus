import { useEffect, useRef, useState } from "react"
import { GlobalWorkerOptions, getDocument, type PDFDocumentProxy } from "pdfjs-dist"
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url"
import { createWorker } from "tesseract.js"
import { FiArrowLeft, FiArrowRight, FiHeadphones, FiPause, FiPlay, FiX } from "react-icons/fi"

GlobalWorkerOptions.workerSrc = pdfWorkerUrl

interface PdfLabReaderProps {
  title: string
  filename: string
  onClose: () => void
}

export default function PdfLabReader({ title, filename, onClose }: PdfLabReaderProps) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [pageText, setPageText] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [reading, setReading] = useState(false)
  const [paused, setPaused] = useState(false)
  const [recognizing, setRecognizing] = useState(false)
  const [readerStatus, setReaderStatus] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    const loadingTask = getDocument({ url: `/wazuh/${encodeURIComponent(filename)}` })
    loadingTask.promise.then((documentProxy) => {
      if (cancelled) return
      setPdf(documentProxy)
      setPageCount(documentProxy.numPages)
    }).catch(() => {
      if (!cancelled) setError("This PDF could not be opened in the in-page reader.")
    }).finally(() => {
      if (!cancelled) setLoading(false)
    })
    return () => {
      cancelled = true
      window.speechSynthesis?.cancel()
      void loadingTask.destroy()
    }
  }, [filename])

  useEffect(() => {
    if (!pdf) return
    const currentPdf = pdf
    let cancelled = false
    let cancelRender: (() => void) | undefined

    async function renderPage() {
      try {
        const page = await currentPdf.getPage(pageNumber)
        if (cancelled) return
        const textContent = await page.getTextContent()
        const text = textContent.items.map((item) => "str" in item ? item.str : "").filter(Boolean).join(" ").replace(/\s+/g, " ").trim()
        setPageText(text)
        const canvas = canvasRef.current
        const canvasContext = canvas?.getContext("2d")
        if (!canvas || !canvasContext) throw new Error("Canvas rendering is unavailable.")

        const baseViewport = page.getViewport({ scale: 1 })
        const availableWidth = containerRef.current?.clientWidth ?? baseViewport.width
        const scale = Math.min(1.6, Math.max(0.55, (availableWidth - 28) / baseViewport.width))
        const viewport = page.getViewport({ scale })
        const outputScale = Math.min(window.devicePixelRatio || 1, 2)
        canvas.width = Math.floor(viewport.width * outputScale)
        canvas.height = Math.floor(viewport.height * outputScale)
        canvas.style.width = `${viewport.width}px`
        canvas.style.height = `${viewport.height}px`
        const task = page.render({
          canvas,
          canvasContext,
          viewport,
          transform: outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0],
        })
        cancelRender = () => task.cancel()
        await task.promise
      } catch (renderError) {
        if (!cancelled && !(renderError instanceof Error && renderError.name === "RenderingCancelledException")) {
          setError("This page could not be rendered.")
        }
      }
    }

    void renderPage()
    return () => {
      cancelled = true
      cancelRender?.()
    }
  }, [pdf, pageNumber])

  function stopReading() {
    window.speechSynthesis.cancel()
    setReading(false)
    setPaused(false)
  }

  async function readPage() {
    stopReading()
    let text = pageText
    if (!text) {
      const canvas = canvasRef.current
      if (!canvas || canvas.width <= 300) {
        setReaderStatus("The PDF page is not ready for text recognition yet.")
        return
      }
      setRecognizing(true)
      setReaderStatus("Recognizing scanned page text...")
      let worker: Awaited<ReturnType<typeof createWorker>> | null = null
      try {
        worker = await createWorker("eng")
        const result = await worker.recognize(canvas)
        text = result.data.text.replace(/\s+/g, " ").trim()
        setPageText(text)
        setReaderStatus(text ? "Scanned text recognized." : "No readable text was recognized on this page.")
      } catch {
        setReaderStatus("OCR could not read this page. Check your connection and try again.")
        return
      } finally {
        if (worker) await worker.terminate()
        setRecognizing(false)
      }
    }
    if (!text) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.onend = () => {
      setReading(false)
      setPaused(false)
    }
    utterance.onerror = () => {
      setReading(false)
      setPaused(false)
    }
    setReading(true)
    window.speechSynthesis.speak(utterance)
  }

  function togglePause() {
    if (paused) {
      window.speechSynthesis.resume()
      setPaused(false)
    } else {
      window.speechSynthesis.pause()
      setPaused(true)
    }
  }

  function changePage(nextPage: number) {
    stopReading()
    setPageNumber(Math.min(pageCount, Math.max(1, nextPage)))
  }

  return (
    <section className="pdf-reader-panel" aria-label={`Online reader: ${title}`}>
      <header className="pdf-reader-header">
        <div className="pdf-reader-title"><span>READING ONLINE</span><h2>{title}</h2></div>
        <button className="voice-button" type="button" onClick={onClose} aria-label="Close PDF reader" title="Close reader"><FiX size={16} /></button>
      </header>
      <div className="pdf-reader-toolbar" role="group" aria-label="PDF page and speech controls">
        <button className="speech-control-button" type="button" onClick={() => changePage(pageNumber - 1)} disabled={pageNumber <= 1 || loading}><FiArrowLeft size={14} /> Previous</button>
        <span className="pdf-page-count">Page {pageNumber} of {pageCount || "..."}</span>
        <button className="speech-control-button" type="button" onClick={() => changePage(pageNumber + 1)} disabled={pageNumber >= pageCount || loading}>Next <FiArrowRight size={14} /></button>
        <span className="pdf-toolbar-divider" />
        {!reading ? <button className="generate-button pdf-read-button" type="button" onClick={readPage} disabled={loading || recognizing}><FiPlay size={14} />{recognizing ? "Recognizing..." : pageText ? "Read this page" : "Recognize & read"}</button> : <>
          <button className="speech-control-button" type="button" onClick={togglePause}>{paused ? <FiPlay size={14} /> : <FiPause size={14} />}{paused ? "Resume" : "Pause"}</button>
          <button className="speech-control-button" type="button" onClick={stopReading}><FiHeadphones size={14} /> Stop</button>
        </>}
      </div>
      {readerStatus && <p className="pdf-reader-status" aria-live="polite">{readerStatus}</p>}
      {error ? <div className="pdf-reader-message" role="alert">{error}</div> : loading ? <div className="pdf-reader-message">Loading course PDF...</div> : <>
        <div className="pdf-canvas-wrap" ref={containerRef}><canvas ref={canvasRef} className="pdf-page-canvas" aria-label={`${title}, page ${pageNumber}`} /></div>
        <details className="pdf-text-details">
          <summary>View page text</summary>
          <p>{pageText || "No selectable text is available on this PDF page."}</p>
        </details>
      </>}
    </section>
  )
}