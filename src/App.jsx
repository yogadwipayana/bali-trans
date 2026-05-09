import { Routes, Route } from "react-router"
import Home from "./pages/home"
import Vehicles from "./pages/vehicles"
import SignIn from "./pages/sign-in"
import SignUp from "./pages/sign-up"
import { useClarity } from "@/hooks/useClarity"

export default function App() {
  // useClarity();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/vehicles" element={<Vehicles/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
      </Routes>
    </>
  )
}
