import { lazy, Suspense } from "react"
import { Provider as ReduxProvider } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider as UrqlProvider, createClient, cacheExchange, fetchExchange } from "urql"
import Workspace from "./components/Workspace"
import Home from "./pages/Home"
import Library from "./pages/Library"
import SectionResults from "./pages/SectionResults"
import { store } from "./store"

const LabPractice = lazy(() => import("./pages/LabPractice"))

const graphqlClient = createClient({
  url: "/graphql",
  exchanges: [cacheExchange, fetchExchange],
})

function App() {
  return (
    <ReduxProvider store={store}>
      <UrqlProvider value={graphqlClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results/:sectionNumber" element={<SectionResults />} />
            <Route path="/labs" element={<Suspense fallback={<Workspace><div className="lab-loading" role="status">Loading lab library...</div></Workspace>}><LabPractice /></Suspense>} />
            <Route path="/library" element={<Library />} />
          </Routes>
        </BrowserRouter>
      </UrqlProvider>
    </ReduxProvider>
  )
}

export default App
