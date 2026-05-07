import { Routes, Route } from "react-router"
import Home from "./pages/home"
import { useClarity } from "@/hooks/useClarity"

export default function App() {
  // useClarity();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </>
  )
}
