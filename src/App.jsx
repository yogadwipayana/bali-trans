import { Routes, Route, useLocation } from "react-router"
import Home from "./pages/home"
import Vehicles from "./pages/vehicles"
import Destinations from "./pages/destinations"
import Services from "./pages/services"
import Reviews from "./pages/reviews"
import About from "./pages/about"
import Contact from "./pages/contact"
import SignIn from "./pages/auth/sign-in"
import SignUp from "./pages/auth/sign-up"
import Terms from "./pages/auth/terms"
import PrivacyPolicy from "./pages/auth/privacy-policy"
import Dashboard from "./pages/dashboard/dashboard"
import DashboardVehicles from "./pages/dashboard/dashboard-vehicles"
import DashboardBookings from "./pages/dashboard/dashboard-bookings"
import DashboardFavourites from "./pages/dashboard/dashboard-favourites"
import DashboardChat from "./pages/dashboard/dashboard-chat"
import DashboardLicense from "./pages/dashboard/dashboard-license"
import DashboardSupport from "./pages/dashboard/dashboard-support"
import Otp from "./pages/auth/otp"
import { Header } from "@/components/Header"

// Routes that ship their own custom header (admin shell, alternate
// dashboards) and therefore want the global brand header suppressed.
// /vehicles deliberately keeps the shared <Header /> so the homepage's
// nav travels with the user into the catalog.
const FULLSCREEN_ROUTES = ["/dashboard", "/dashboard/", "/dashboard/vehicles", "/dashboard/vehicles/", "/dashboard/bookings", "/dashboard/bookings/", "/dashboard/favourites", "/dashboard/favourites/", "/dashboard/chat", "/dashboard/chat/", "/dashboard/license", "/dashboard/license/", "/dashboard/support", "/dashboard/support/"]

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
        <Route path="/destinations" element={<Destinations/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/reviews" element={<Reviews/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/terms" element={<Terms/>} />
        <Route path="/otp" element={<Otp/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/dashboard/vehicles" element={<DashboardVehicles/>} />
        <Route path="/dashboard/bookings" element={<DashboardBookings/>} />
        <Route path="/dashboard/favourites" element={<DashboardFavourites/>} />
        <Route path="/dashboard/chat" element={<DashboardChat/>} />
        <Route path="/dashboard/license" element={<DashboardLicense/>} />
        <Route path="/dashboard/support" element={<DashboardSupport/>} />
      </Routes>
    </>
  )
}
