import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Check,
  Shield,
  Truck,
  Headphones,
  Wallet,
  Clock,
  Users,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FacebookIcon } from "@/components/SocialIcons";
import { useFullScreenRoot } from "@/hooks/useFullScreenRoot";

const TEAL = "#1d4046";

// Brand-color "G" for the Google button. Inlined because lucide-react
// doesn't ship brand marks.
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

// Apple "" mark. Single-color; inherits from currentColor.
function AppleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.42 2.22-1.13 3-.74.83-1.95 1.47-3.13 1.38-.13-1.13.42-2.31 1.12-3.06.78-.83 2.06-1.46 3.14-1.32zM20.5 17.45c-.55 1.27-.81 1.84-1.52 2.97-.99 1.57-2.39 3.52-4.13 3.54-1.55.01-1.95-1.01-4.05-1-2.1.01-2.54 1.02-4.09 1.01-1.74-.02-3.07-1.79-4.06-3.36C.05 16.16-.24 10.71 1.49 7.74c1.23-2.13 3.18-3.38 5.01-3.38 1.86 0 3.03 1.02 4.57 1.02 1.49 0 2.4-1.02 4.55-1.02 1.63 0 3.36.89 4.59 2.42-4.04 2.21-3.38 7.97.29 9.67z" />
    </svg>
  );
}

export default function SignUp() {
  useFullScreenRoot();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook: replace with axios call to your signup endpoint.
    console.log("Sign up", form);
  };

  // Lightweight password strength hint — purely visual. Three buckets:
  // weak (< 8 chars), fair (8+ chars), strong (8+ and mixed letters/numbers).
  const pwd = form.password;
  const strength =
    pwd.length === 0
      ? null
      : pwd.length < 8
      ? { label: "Too short", tone: "weak", bars: 1 }
      : /[A-Za-z]/.test(pwd) && /\d/.test(pwd)
      ? { label: "Strong", tone: "strong", bars: 3 }
      : { label: "Fair", tone: "fair", bars: 2 };

  const strengthColor = {
    weak: "#ef4444",
    fair: "#f59e0b",
    strong: "#16a34a",
  };

  return (
    <>
      <Helmet>
        <title>Sign up · Bali Trans</title>
        <meta
          name="description"
          content="Create a Bali Trans account and start exploring the island with our premium car rentals."
        />
      </Helmet>

      <div
        className="min-h-screen bg-white font-sans text-[#1a1a1a] antialiased"
        style={{
          // Same light-mode override the sign-in / home pages use so the
          // global prefers-color-scheme dark variables don't bleed in.
          "--text": "#6b7280",
          "--text-h": "#1a1a1a",
          "--bg": "#ffffff",
          "--border": "#e5e7eb",
          colorScheme: "light",
          color: "#1a1a1a",
        }}
      >
        {/* ==================== 1. HEADER / NAVBAR ==================== */}
        <Header />

        {/* ==================== 2. SIGN UP ==================== */}
        <section className="relative bg-white">
          <div className="grid lg:grid-cols-2 min-h-[640px] lg:min-h-[760px]">
            {/* ---- Left: Bali hero panel (mirrors sign-in, different copy) ---- */}
            <aside className="relative hidden lg:block overflow-hidden">
              <img
                src="/images/hero.png"
                alt="White SUV at Bali temple gates with ocean and palm trees at sunset"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(29,64,70,0.10) 0%, rgba(29,64,70,0.55) 60%, rgba(29,64,70,0.85) 100%)",
                }}
              />
              <div
                className="absolute inset-y-0 right-0 w-32"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                }}
              />

              <div className="relative z-10 h-full flex flex-col justify-end p-10 xl:p-14 text-white max-w-xl">
                <h2
                  className="font-bold tracking-tight mb-2 text-white"
                  style={{
                    fontSize: "clamp(1.75rem, 1rem + 2vw, 2.5rem)",
                    letterSpacing: "-0.02em",
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  Start your journey.
                </h2>
                <p
                  className="font-bold tracking-tight mb-7 text-white"
                  style={{
                    fontSize: "clamp(1.25rem, 0.75rem + 1.25vw, 1.75rem)",
                    letterSpacing: "-0.02em",
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  Bali is waiting.
                </p>

                <ul className="space-y-4">
                  {[
                    {
                      icon: Shield,
                      title: "Best Price Guarantee",
                      desc: "We offer the best rates with no hidden fees.",
                    },
                    {
                      icon: Truck,
                      title: "Free Delivery",
                      desc: "Airport, hotel, villa, or anywhere in Bali.",
                    },
                    {
                      icon: Headphones,
                      title: "24/7 Support",
                      desc: "We're here whenever you need us.",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <li key={title} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-white/15 backdrop-blur-sm">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="leading-snug">
                        <div className="font-semibold text-sm text-white">{title}</div>
                        <div className="text-xs text-white/75 mt-0.5 max-w-[18rem]">
                          {desc}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* ---- Right: form ---- */}
            <div className="flex items-center justify-center px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
              <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-6 sm:p-8 lg:p-10">
                  {/* Heading */}
                  <h1
                    className="font-bold tracking-tight mb-2"
                    style={{
                      color: "#0a0a0a",
                      margin: "0 0 0.5rem 0",
                      fontSize: "clamp(1.5rem, 1rem + 1vw, 2rem)",
                      letterSpacing: "-0.02em",
                      fontWeight: 700,
                    }}
                  >
                    Create your account
                  </h1>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    Join Bali Trans and unlock premium rides across the island.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full name */}
                    <div>
                      <label
                        htmlFor="su-name"
                        className="block text-sm font-semibold text-[#1a1a1a] mb-1.5"
                      >
                        Full name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="su-name"
                          type="text"
                          autoComplete="name"
                          required
                          value={form.fullName}
                          onChange={(e) => update("fullName", e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full h-11 pl-10 pr-3 bg-white border border-gray-200 rounded-lg text-sm text-[#1a1a1a] placeholder:text-gray-400 outline-none transition-colors focus:border-[#1d4046] focus:ring-2 focus:ring-[#1d4046]/10"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="su-email"
                        className="block text-sm font-semibold text-[#1a1a1a] mb-1.5"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="su-email"
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

                    {/* Phone */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="su-phone"
                          className="block text-sm font-semibold text-[#1a1a1a]"
                        >
                          Phone number
                        </label>
                        <span className="text-xs text-gray-400">Optional</span>
                      </div>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="su-phone"
                          type="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+62 812 3456 7890"
                          className="w-full h-11 pl-10 pr-3 bg-white border border-gray-200 rounded-lg text-sm text-[#1a1a1a] placeholder:text-gray-400 outline-none transition-colors focus:border-[#1d4046] focus:ring-2 focus:ring-[#1d4046]/10"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label
                        htmlFor="su-password"
                        className="block text-sm font-semibold text-[#1a1a1a] mb-1.5"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="su-password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required
                          minLength={8}
                          value={form.password}
                          onChange={(e) => update("password", e.target.value)}
                          placeholder="At least 8 characters"
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

                      {/* Strength meter — shown as soon as the user types. */}
                      {strength && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex gap-1 flex-1">
                            {[1, 2, 3].map((i) => (
                              <span
                                key={i}
                                className="h-1 flex-1 rounded-full transition-colors"
                                style={{
                                  backgroundColor:
                                    i <= strength.bars
                                      ? strengthColor[strength.tone]
                                      : "#e5e7eb",
                                }}
                              />
                            ))}
                          </div>
                          <span
                            className="text-[11px] font-semibold"
                            style={{ color: strengthColor[strength.tone] }}
                          >
                            {strength.label}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Terms */}
                    <label className="flex items-start gap-2 cursor-pointer select-none">
                      <span className="relative inline-flex mt-0.5">
                        <input
                          type="checkbox"
                          required
                          checked={form.agreeTerms}
                          onChange={(e) => update("agreeTerms", e.target.checked)}
                          className="peer sr-only"
                        />
                        <span className="w-4 h-4 rounded border border-gray-300 bg-white flex items-center justify-center transition-colors peer-checked:bg-[#1d4046] peer-checked:border-[#1d4046] peer-focus-visible:ring-2 peer-focus-visible:ring-[#1d4046]/30">
                          {form.agreeTerms && (
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          )}
                        </span>
                      </span>
                      <span className="text-xs text-gray-600 leading-relaxed">
                        I agree to the{" "}
                        <a
                          href="#terms"
                          className="font-semibold hover:underline"
                          style={{ color: TEAL }}
                        >
                          Terms &amp; conditions
                        </a>{" "}
                        and{" "}
                        <a
                          href="#privacy"
                          className="font-semibold hover:underline"
                          style={{ color: TEAL }}
                        >
                          Privacy policy
                        </a>
                        .
                      </span>
                    </label>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="btn-glass w-full h-11 text-white text-sm font-bold rounded-lg"
                      style={{ backgroundColor: TEAL }}
                    >
                      Create account
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-5">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-xs text-gray-400">or sign up with</span>
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
                    Already have an account?{" "}
                    <Link
                      to="/sign-in"
                      className="font-semibold transition-colors hover:underline"
                      style={{ color: TEAL }}
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 3. TRUST STRIP ==================== */}
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto bg-white border border-gray-100 rounded-2xl p-5 lg:p-6 grid grid-cols-2 lg:grid-cols-4 gap-y-5">
            {[
              { icon: Wallet, title: "No hidden fees", desc: "What you see is what you pay" },
              { icon: Truck, title: "Free delivery", desc: "Airport, hotel, villa and anywhere in Bali" },
              { icon: Clock, title: "24/7 support", desc: "Local team ready to help anytime" },
              { icon: Users, title: "10,000+ happy customers", desc: "Trusted by travelers from around the world" },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <div
                key={title}
                className={`flex items-start gap-3 px-4 lg:px-6 ${
                  idx > 0 ? "lg:border-l lg:border-gray-100" : ""
                }`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#f0f5f5" }}
                >
                  <Icon className="w-4 h-4" style={{ color: TEAL }} />
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#1a1a1a]">{title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== 4. FOOTER ==================== */}
        <Footer />
      </div>
    </>
  );
}
