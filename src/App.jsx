import { Routes, Route } from "react-router"
import Home from "./pages/home"
import V1 from "./pages/v1"
import { useClarity } from "@/hooks/useClarity"

export default function App() {
  // useClarity();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/v1" element={<V1/>} />
      </Routes>
    </>
  )
}
