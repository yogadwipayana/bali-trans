import { Routes, Route, useLocation } from "react-router"
import Home from "./pages/home"
import Vehicles from "./pages/vehicles"
import SignIn from "./pages/sign-in"
import SignUp from "./pages/sign-up"
import Terms from "./pages/terms"
import PrivacyPolicy from "./pages/privacy-policy"
import Dashboard from "./pages/dashboard"
import DashboardVehicles from "./pages/dashboard-vehicles"
import Otp from "./pages/otp"
import AdminVehicles from "./pages/admin-vehicles"
import { Header } from "@/components/Header"

// Routes that ship their own custom header (admin shell, alternate
// dashboards) and therefore want the global brand header suppressed.
// /vehicles deliberately keeps the shared <Header /> so the homepage's
// nav travels with the user into the catalog.
const FULLSCREEN_ROUTES = ["/dashboard", "/dashboard/vehicles"]

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith("/admin")
  const isFullscreenRoute = FULLSCREEN_ROUTES.includes(location.pathname)
  const hideGlobalHeader = isAdminRoute || isFullscreenRoute

  // Header is rendered once at the layout level so a single instance persists
  // across route changes. That lets the active-link underline animate from the
  // previous page's link to the new one instead of remounting and teleporting.
  return (
    <>
      {!hideGlobalHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/vehicles" element={<Vehicles/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/terms" element={<Terms/>} />
        <Route path="/otp" element={<Otp/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/dashboard/vehicles" element={<DashboardVehicles/>} />
        <Route path="/admin/vehicles" element={<AdminVehicles/>} />
      </Routes>
    </>
  )
}
