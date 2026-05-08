import { Routes, Route } from "react-router"
import Home from "./pages/home"
import V1 from "./pages/v1"
import V2 from "./pages/v2"
import V3 from "./pages/v3"
import V4 from "./pages/v4"
import V5 from "./pages/v5"
import V6 from "./pages/v6"
import V7 from "./pages/v7"
import V8 from "./pages/v8"
import V9 from "./pages/v9"
import V10 from "./pages/v10"
import V11 from "./pages/v11"
import { useClarity } from "@/hooks/useClarity"

export default function App() {
  // useClarity();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/v1" element={<V1/>} />
        <Route path="/v2" element={<V2/>} />
        <Route path="/v3" element={<V3/>} />
        <Route path="/v4" element={<V4/>} />
        <Route path="/v5" element={<V5/>} />
        <Route path="/v6" element={<V6/>} />
        <Route path="/v7" element={<V7/>} />
        <Route path="/v8" element={<V8/>} />
        <Route path="/v9" element={<V9/>} />
        <Route path="/v10" element={<V10/>} />
        <Route path="/v11" element={<V11/>} />
      </Routes>
    </>
  )
}
