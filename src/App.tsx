import { Provider as ReduxProvider } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider as UrqlProvider, createClient, cacheExchange, fetchExchange } from "urql"
import Home from "./pages/Home"
import Library from "./pages/Library"
import { store } from "./store"

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
            <Route path="/library" element={<Library />} />
          </Routes>
        </BrowserRouter>
      </UrqlProvider>
    </ReduxProvider>
  )
}

export default App
