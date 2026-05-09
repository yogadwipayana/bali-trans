import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  Car,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FacebookIcon } from "@/components/SocialIcons";
import { useFullScreenRoot } from "@/hooks/useFullScreenRoot";

const TEAL = "#1d4046";

// Brand-color "G" for the Google button. Inlined because lucide-react
// doesn't ship brand marks and we don't want another asset for one icon.
function GoogleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.56c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.56-2.77c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.95l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

// Apple "" mark. Single-color so we drive it from currentColor and let the
// button's text color cascade in.
function AppleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.42 2.22-1.13 3-.74.83-1.95 1.47-3.13 1.38-.13-1.13.42-2.31 1.12-3.06.78-.83 2.06-1.46 3.14-1.32zM20.5 17.45c-.55 1.27-.81 1.84-1.52 2.97-.99 1.57-2.39 3.52-4.13 3.54-1.55.01-1.95-1.01-4.05-1-2.1.01-2.54 1.02-4.09 1.01-1.74-.02-3.07-1.79-4.06-3.36C.05 16.16-.24 10.71 1.49 7.74c1.23-2.13 3.18-3.38 5.01-3.38 1.86 0 3.03 1.02 4.57 1.02 1.49 0 2.4-1.02 4.55-1.02 1.63 0 3.36.89 4.59 2.42-4.04 2.21-3.38 7.97.29 9.67z" />
    </svg>
  );
}

export default function SignIn() {
  useFullScreenRoot();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const [showPassword, setShowPassword] = useState(false);

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook: replace with axios call to your auth endpoint.
    console.log("Sign in", form);
  };

  return (
    <>
      <Helmet>
        <title>Sign in · Bali Trans</title>
        <meta
          name="description"
          content="Sign in to your Bali Trans account and continue your journey across the island."
        />
      </Helmet>

      <div
        className="min-h-screen font-sans text-[#1a1a1a] antialiased"
        style={{
          // Warm cream replaces pure white so the page sits more comfortably
          // next to the deep teal left panel — the harsh dark/bright boundary
          // is the main reason the original layout felt "loud".
          backgroundColor: "#f7f5f1",
          "--text": "#6b7280",
          "--text-h": "#1a1a1a",
          "--bg": "#f7f5f1",
          "--border": "#ece9e3",
          colorScheme: "light",
          color: "#1a1a1a",
        }}
      >
        {/* ==================== 1. HEADER / NAVBAR ==================== */}
        <Header />

        {/* ==================== 2. SIGN IN ====================
            Visual treatment mirrors the CTA banner on the home page:
            contained `max-w-7xl rounded-3xl overflow-hidden` card, with
            cream page background framing it. Inside, the same two-column
            split — teal dashboard preview on the left, white form on the
            right — but now sharing one rounded container instead of
            running edge-to-edge.
        ==================== */}
        <section className="pt-4 pb-10 lg:pt-8 lg:pb-14 px-4 sm:px-6 lg:px-8">
          <div
            className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative"
            style={{
              backgroundColor: TEAL,
              // Soft teal-tinted lift so the banner reads as a card sitting
              // on the cream page rather than floating in space.
              boxShadow: "0 12px 40px rgba(29, 64, 70, 0.15)",
            }}
          >
            <div className="grid lg:grid-cols-2 min-h-[560px] lg:min-h-[680px]">
              {/* ---- Left: dashboard preview ----
                  Concrete preview of what lives inside a Bali Trans account:
                  upcoming trip, saved pickup spots, payment methods. Replaces
                  the old marketing hero copy ("Drive Bali. Make it
                  unforgettable.") with actual product features.
              ---- */}
              <aside className="relative hidden lg:block overflow-hidden">
                <img
                  src="/images/hero.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-25"
                  loading="eager"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(29,64,70,0.65) 0%, rgba(29,64,70,0.88) 100%)",
                  }}
                />

              <div className="relative z-10 h-full flex flex-col justify-center p-10 xl:p-14 text-white max-w-xl">
                <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/55 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300/80" />
                  Your dashboard
                </span>
                <h2
                  className="tracking-tight mb-3 text-white"
                  style={{
                    fontSize: "clamp(1.375rem, 0.875rem + 1.4vw, 1.875rem)",
                    letterSpacing: "-0.018em",
                    fontWeight: 600,
                    color: "#ffffff",
                    lineHeight: 1.2,
                  }}
                >
                  Everything in one place
                </h2>
                <p className="text-[13px] text-white/65 mb-7 max-w-sm leading-relaxed">
                  Trips, receipts, saved pickups, and payment methods — all on
                  one account.
                </p>

                {/* Decorative — the real data lives behind auth. AT users get
                    the product story from the heading + subhead above. */}
                <div className="space-y-3" aria-hidden="true">
                  {/* Upcoming trip */}
                  <div className="rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/55">
                        Upcoming trip
                      </span>
                      <span className="text-[10px] font-medium text-emerald-300 bg-emerald-300/15 px-2 py-0.5 rounded-full">
                        Confirmed
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <Car className="w-5 h-5 text-white/85" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate">
                          Toyota Avanza · Auto
                        </div>
                        <div className="text-[11px] text-white/55 mt-0.5">
                          Sep 12 → Sep 15 · 3 days
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/40 shrink-0" />
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] text-white/65">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">
                        Ngurah Rai Airport → Ubud Villa
                      </span>
                    </div>
                  </div>

                  {/* Saved pickups */}
                  <div className="rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/55">
                        Saved pickups
                      </span>
                      <span className="text-[10px] text-white/45">3 places</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: "Home villa", sub: "Seminyak" },
                        { label: "Ngurah Rai Airport", sub: "Terminal 2" },
                      ].map((loc) => (
                        <div key={loc.label} className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-md bg-white/[0.07] flex items-center justify-center shrink-0">
                            <MapPin className="w-3.5 h-3.5 text-white/75" />
                          </div>
                          <div className="text-[12px] leading-tight">
                            <div className="font-medium text-white/90">
                              {loc.label}
                            </div>
                            <div className="text-white/45 text-[10.5px] mt-0.5">
                              {loc.sub}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment methods */}
                  <div className="rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/55">
                        Payment methods
                      </span>
                      <span className="text-[10px] text-white/45">2 saved</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-9 h-6 rounded flex items-center justify-center shrink-0"
                          style={{
                            background:
                              "linear-gradient(135deg, #1a56db 0%, #1e3a8a 100%)",
                          }}
                        >
                          <span className="text-[8px] font-bold italic text-white tracking-tight">
                            VISA
                          </span>
                        </div>
                        <div className="flex-1 text-[12px] text-white/85">
                          •••• 4242
                        </div>
                        <div className="text-[10px] text-white/45 font-medium">
                          Default
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-6 rounded bg-black flex items-center justify-center shrink-0">
                          <AppleIcon className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex-1 text-[12px] text-white/85">
                          Apple Pay
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

              {/* ---- Right: form (lives directly on white inside the
                   rounded banner — no nested card; the banner IS the card) ---- */}
              <div className="bg-white flex items-center justify-center px-6 sm:px-10 lg:px-14 py-10 lg:py-14">
                <div className="w-full max-w-md">
                  {/* Heading */}
                  <h1
                    className="tracking-tight mb-2"
                    style={{
                      // #0a0a0a → #1a1a1a: same family, less shouty.
                      color: "#1a1a1a",
                      margin: "0 0 0.5rem 0",
                      fontSize: "clamp(1.375rem, 0.875rem + 1vw, 1.875rem)",
                      letterSpacing: "-0.018em",
                      fontWeight: 600,
                    }}
                  >
                    Welcome back
                  </h1>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    Sign in to access your trips, saved pickup locations, and
                    payment methods.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="si-email"
                        className="block text-sm font-semibold text-[#1a1a1a] mb-1.5"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="si-email"
                          type="email"
                          autoComplete="email"
                          required
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="Enter your email"
                          className="w-full h-11 pl-10 pr-3 bg-white border border-gray-200 rounded-lg text-sm text-[#1a1a1a] placeholder:text-gray-400 outline-none transition-colors focus:border-[#1d4046] focus:ring-2 focus:ring-[#1d4046]/10"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="si-password"
                          className="block text-sm font-semibold text-[#1a1a1a]"
                        >
                          Password
                        </label>
                        <a
                          href="#forgot"
                          className="text-xs font-semibold transition-colors hover:underline"
                          style={{ color: TEAL }}
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="si-password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          required
                          value={form.password}
                          onChange={(e) => update("password", e.target.value)}
                          placeholder="Enter your password"
                          className="w-full h-11 pl-10 pr-10 bg-white border border-gray-200 rounded-lg text-sm text-[#1a1a1a] placeholder:text-gray-400 outline-none transition-colors focus:border-[#1d4046] focus:ring-2 focus:ring-[#1d4046]/10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-gray-400 hover:text-[#1d4046] transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Remember me */}
                    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                      <span className="relative inline-flex">
                        <input
                          type="checkbox"
                          checked={form.remember}
                          onChange={(e) => update("remember", e.target.checked)}
                          className="peer sr-only"
                        />
                        <span
                          className="w-4 h-4 rounded border border-gray-300 bg-white flex items-center justify-center transition-colors peer-checked:bg-[#1d4046] peer-checked:border-[#1d4046] peer-focus-visible:ring-2 peer-focus-visible:ring-[#1d4046]/30"
                        >
                          {form.remember && (
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          )}
                        </span>
                      </span>
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="btn-glass w-full h-11 text-white text-sm font-bold rounded-lg"
                      style={{ backgroundColor: TEAL }}
                    >
                      Sign in
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-5">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs text-gray-400">or continue with</span>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>

                  {/* Social providers */}
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      className="btn-glass-fill w-full h-11 flex items-center justify-center gap-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#1a1a1a]"
                      style={{ "--btn-fill": "#f8f9fa", "--btn-on-fill": "#1a1a1a" }}
                    >
                      <GoogleIcon className="w-4 h-4" />
                      Continue with Google
                    </button>
                    <button
                      type="button"
                      className="btn-glass-fill w-full h-11 flex items-center justify-center gap-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#1a1a1a]"
                      style={{ "--btn-fill": "#f8f9fa", "--btn-on-fill": "#1a1a1a" }}
                    >
                      <FacebookIcon className="w-4 h-4 text-[#1877F2]" />
                      Continue with Facebook
                    </button>
                    <button
                      type="button"
                      className="btn-glass-fill w-full h-11 flex items-center justify-center gap-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#1a1a1a]"
                      style={{ "--btn-fill": "#f8f9fa", "--btn-on-fill": "#1a1a1a" }}
                    >
                      <AppleIcon className="w-4 h-4 text-black" />
                      Continue with Apple
                    </button>
                  </div>

                  {/* Footer link */}
                  <p className="text-center text-sm text-gray-500 mt-6">
                    Don&apos;t have an account?{" "}
                    <Link
                      to="/sign-up"
                      className="font-semibold transition-colors hover:underline"
                      style={{ color: TEAL }}
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 3. FOOTER ====================
            The marketing trust strip ("No hidden fees", "10,000+ happy
            customers") was removed in this redesign — the page now leans
            on the dashboard preview to communicate value through actual
            product features instead of promotional claims.
        ==================== */}
        <Footer />
      </div>
    </>
  );
}
