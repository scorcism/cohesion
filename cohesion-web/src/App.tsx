import { Route, Routes } from "react-router"
import AuthWrapper from "./components/AuthWrapper"
import AuthModal from "./components/elements/chat/modals/AuthModal"
import Home from "./screens/home/Home"
import NotFound from "./screens/NotFound"
import { Toaster } from "sonner"

function App() {

  return (
    <>
      <Routes>
        <Route element={<AuthWrapper />}>
          <Route index path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster richColors closeButton/>
      <AuthModal />
    </>
  )
}

export default App
