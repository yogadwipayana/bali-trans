import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  Car,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import { Footer } from "@/components/Footer";
import { FacebookIcon } from "@/components/SocialIcons";
import { useFullScreenRoot } from "@/hooks/useFullScreenRoot";

// ---------------------------------------------------------------------------
// Sign up — restyled to share /dashboard-v2's monochrome system, matching
// the redesigned /sign-in page exactly so the two flows feel like one
// continuous experience. The two-column split, dashboard preview, every
// field, every validation rule, and every line of copy are preserved
// verbatim — only the chrome changes (palette, borders, radii, button
// treatment).
// ---------------------------------------------------------------------------
const INK = "#0f0f0f"; // primary action / brand text
const TEXT = "#1a1a1a"; // body text
const MUTED = "#7c7c7c"; // secondary text
const BORDER = "#e6e6e6"; // panel borders
const SOFT = "#f3f4f4"; // page surface

const FIELD_ORDER = [
  "fullName",
  "email",
  "phone",
  "password",
  "confirmPassword",
  "agreeTerms",
];
const FIELD_IDS = {
  fullName: "su-name",
  email: "su-email",
  phone: "su-phone",
  password: "su-password",
  confirmPassword: "su-confirm-password",
  agreeTerms: "su-terms",
};
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s().-]+$/;

function validateSignUpForm(values) {
  const errors = {};
  const fullName = values.fullName.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const phoneDigits = phone.replace(/\D/g, "");

  if (!fullName) {
    errors.fullName = "Enter your full name.";
  } else if (fullName.length < 2) {
    errors.fullName = "Enter at least 2 characters for your name.";
  }

  if (!email) {
    errors.email = "Enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Use a valid email address, like name@example.com.";
  }

  if (phone && !PHONE_PATTERN.test(phone)) {
    errors.phone = "Use numbers, spaces, +, -, or parentheses only.";
  } else if (phone && (phoneDigits.length < 9 || phoneDigits.length > 15)) {
    errors.phone = "Use a phone number with 9 to 15 digits.";
  }

  if (!values.password) {
    errors.password = "Create a password.";
  } else if (values.password.length < 8) {
    errors.password = "Use at least 8 characters.";
  } else if (!/[A-Za-z]/.test(values.password) || !/\d/.test(values.password)) {
    errors.password = "Add at least one letter and one number.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm your password.";
  } else if (values.password && values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!values.agreeTerms) {
    errors.agreeTerms = "Agree to the terms and privacy policy to create an account.";
  }

  return errors;
}

function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p
      id={id}
      className="mt-1.5 flex items-start gap-1.5 text-[11px] font-medium text-red-600"
    >
      <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

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

// Small uppercase strip used above the dashboard preview cards. Mirrors the
// "RENTAL TYPE" / "BODY TYPE" small-cap labels on /dashboard-v2.
function PreviewLabel({ children, trailing }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/55">
        {children}
      </span>
      {trailing}
    </div>
  );
}

// Square 6px-radius accent tile used inside the dashboard preview to anchor
// each row. Same rhythm as the IconTile on the redesigned home page, just
// painted in inverted (white-on-ink) tones.
function PreviewTile({ children, size = 28 }) {
  return (
    <div
      className="grid shrink-0 place-items-center rounded-[6px] border border-white/15 bg-white/[0.06] text-white/80"
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
}

// Outlined social provider button. Square edges, thin border, hover fills
// to a pale grey — matches the dashboard's outlined-pill treatment.
function SocialButton({ icon, children }) {
  return (
    <button
      type="button"
      className="flex h-[44px] w-full items-center justify-center gap-2.5 rounded-[6px] border bg-white text-[12.5px] font-semibold transition-colors hover:bg-[#f5f5f5]"
      style={{ borderColor: BORDER, color: INK }}
    >
      {icon}
      {children}
    </button>
  );
}

export default function SignUp() {
  useFullScreenRoot();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));
  const markTouched = (key) =>
    setTouched((prev) => ({ ...prev, [key]: true }));

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitAttempted(true);

    const nextErrors = validateSignUpForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setTouched(
        FIELD_ORDER.reduce((next, key) => ({ ...next, [key]: true }), {}),
      );

      const firstInvalid = FIELD_ORDER.find((key) => nextErrors[key]);
      const target = firstInvalid
        ? document.getElementById(FIELD_IDS[firstInvalid])
        : null;
      target?.focus();
      return;
    }

    // Hook: replace with axios call to your signup endpoint.
    const { confirmPassword: _confirmPassword, ...signupPayload } = form;
    console.log("Sign up", {
      ...signupPayload,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    });
    navigate("/otp", { state: { email: form.email.trim() } });
  };

  const errors = validateSignUpForm(form);
  const fieldError = (key) =>
    touched[key] || submitAttempted ? errors[key] : "";

  // Shared input class generator — keeps every text input visually
  // consistent and switches to a red border when validation fails.
  const inputClass = (key) => {
    const hasError = Boolean(fieldError(key));
    return `h-[44px] w-full rounded-[6px] border bg-white text-[13px] outline-none transition-colors placeholder:text-gray-400 ${
      hasError
        ? "border-red-300 focus:border-red-500"
        : "focus:border-[#0f0f0f]"
    }`;
  };

  // Lightweight password strength hint — purely visual. Three buckets:
  // weak (< 8 chars), fair (8+ chars), strong (8+ and mixed letters/numbers).
  const pwd = form.password;
  let strength = null;
  if (pwd.length > 0) {
    if (pwd.length < 8) {
      strength = { label: "Too short", tone: "weak", bars: 1 };
    } else if (/[A-Za-z]/.test(pwd) && /\d/.test(pwd)) {
      strength = { label: "Strong", tone: "strong", bars: 3 };
    } else {
      strength = { label: "Fair", tone: "fair", bars: 2 };
    }
  }
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
        className="min-h-screen font-sans antialiased"
        style={{
          backgroundColor: SOFT,
          color: TEXT,
          // Force light values for the global dark-mode CSS variables so
          // text doesn't flip greys under prefers-color-scheme.
          "--text": MUTED,
          "--text-h": INK,
          "--bg": SOFT,
          "--border": BORDER,
          colorScheme: "light",
        }}
      >
        {/* ==================== SIGN UP ====================
            Single max-w-7xl card with a thin 1px border replaces the
            previous rounded-3xl shadow-elevated panel. Inside, the
            two-column split is preserved — ink-black dashboard preview
            on the left, white form on the right — so users still see
            the product story even though the chrome is now monochrome.
        ==================== */}
        <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-10 lg:pt-10 lg:pb-14">
          <div
            className="relative mx-auto max-w-7xl overflow-hidden rounded-[12px] border bg-white"
            style={{ borderColor: BORDER }}
          >
            <div className="grid lg:grid-cols-2 min-h-[560px] lg:min-h-[680px]">
              {/* ---- Left: dashboard preview ----
                  Concrete preview of what's inside an account: upcoming trip,
                  saved pickups, payment methods. Background is the deep INK
                  used by the dashboard's PRO-features chip and the home
                  page's CTA banner so all three pages read in the same voice.
              ---- */}
              <aside
                className="relative hidden overflow-hidden lg:block"
                style={{ backgroundColor: INK }}
              >
                {/* Subtle textured underlay — the hero image, knocked back
                    to ~12% so it reads as monochrome ambience instead of
                    competing with the foreground content. */}
                <img
                  src="/images/hero.png"
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.12] mix-blend-luminosity"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(15,15,15,0.65) 0%, rgba(15,15,15,0.95) 100%)",
                  }}
                />

                <div className="relative z-10 flex h-full max-w-xl flex-col justify-center p-10 xl:p-14 text-white">
                  <span className="mb-4 inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                    What you&apos;ll get
                  </span>
                  <h2
                    className="mb-3 tracking-tight text-white"
                    style={{
                      fontSize: "clamp(1.5rem, 0.875rem + 1.4vw, 2rem)",
                      letterSpacing: "-0.02em",
                      fontWeight: 700,
                      lineHeight: 1.15,
                    }}
                  >
                    Built for repeat travel
                  </h2>
                  <p className="mb-7 max-w-sm text-[13px] leading-relaxed text-white/65">
                    Save trips, pickup spots, and payment methods so your next
                    booking takes seconds.
                  </p>

                  <div className="space-y-3" aria-hidden="true">
                    {/* Upcoming trip */}
                    <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                      <PreviewLabel
                        trailing={
                          <span className="rounded-[4px] bg-emerald-300/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                            Confirmed
                          </span>
                        }
                      >
                        Upcoming trip
                      </PreviewLabel>
                      <div className="flex items-center gap-3">
                        <PreviewTile size={36}>
                          <Car className="h-[18px] w-[18px]" strokeWidth={1.7} />
                        </PreviewTile>
                        <div className="min-w-0 flex-1 leading-tight">
                          <div className="truncate text-[13px] font-semibold text-white">
                            Toyota Avanza · Auto
                          </div>
                          <div className="mt-0.5 text-[11px] text-white/55">
                            Sep 12 → Sep 15 · 3 days
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-white/40" />
                      </div>
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-white/65">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">
                          Ngurah Rai Airport → Ubud Villa
                        </span>
                      </div>
                    </div>

                    {/* Saved pickups */}
                    <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                      <PreviewLabel
                        trailing={
                          <span className="text-[10px] text-white/45">3 places</span>
                        }
                      >
                        Saved pickups
                      </PreviewLabel>
                      <div className="space-y-2">
                        {[
                          { label: "Home villa", sub: "Seminyak" },
                          { label: "Ngurah Rai Airport", sub: "Terminal 2" },
                        ].map((loc) => (
                          <div key={loc.label} className="flex items-center gap-2.5">
                            <PreviewTile>
                              <MapPin className="h-3 w-3" strokeWidth={1.8} />
                            </PreviewTile>
                            <div className="text-[12px] leading-tight">
                              <div className="font-medium text-white/90">
                                {loc.label}
                              </div>
                              <div className="mt-0.5 text-[10.5px] text-white/45">
                                {loc.sub}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Payment methods */}
                    <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md">
                      <PreviewLabel
                        trailing={
                          <span className="text-[10px] text-white/45">2 saved</span>
                        }
                      >
                        Payment methods
                      </PreviewLabel>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="grid h-6 w-9 shrink-0 place-items-center rounded-[4px]"
                            style={{
                              background:
                                "linear-gradient(135deg, #1a56db 0%, #1e3a8a 100%)",
                            }}
                          >
                            <span className="text-[8px] font-bold italic tracking-tight text-white">
                              VISA
                            </span>
                          </div>
                          <div className="flex-1 text-[12px] text-white/85">
                            •••• 4242
                          </div>
                          <div className="text-[10px] font-medium text-white/45">
                            Default
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="grid h-6 w-9 shrink-0 place-items-center rounded-[4px] bg-black">
                            <AppleIcon className="h-3 w-3 text-white" />
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

              {/* ---- Right: form ---- */}
              <div className="flex items-center justify-center bg-white px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
                <div className="w-full max-w-md">
                  {/* Heading */}
                  <span
                    className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: MUTED }}
                  >
                    Member access
                  </span>
                  <h1
                    className="mt-2 mb-2 tracking-tight"
                    style={{
                      color: INK,
                      margin: "0.5rem 0 0.5rem 0",
                      fontSize: "clamp(1.5rem, 0.875rem + 1vw, 2rem)",
                      letterSpacing: "-0.02em",
                      fontWeight: 700,
                      lineHeight: 1.15,
                    }}
                  >
                    Create your account
                  </h1>
                  <p
                    className="mb-6 text-[13px] leading-relaxed"
                    style={{ color: MUTED }}
                  >
                    Save trips, pickup locations, and payment methods to book
                    your next ride faster.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* Full name */}
                    <div>
                      <label
                        htmlFor="su-name"
                        className="mb-1.5 block text-[12px] font-semibold"
                        style={{ color: INK }}
                      >
                        Full name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          id="su-name"
                          type="text"
                          autoComplete="name"
                          required
                          value={form.fullName}
                          onChange={(event) => update("fullName", event.target.value)}
                          onBlur={() => markTouched("fullName")}
                          placeholder="Enter your full name"
                          aria-invalid={Boolean(fieldError("fullName"))}
                          aria-describedby={
                            fieldError("fullName") ? "su-name-error" : undefined
                          }
                          className={`${inputClass("fullName")} pl-10 pr-3`}
                          style={{
                            borderColor: fieldError("fullName") ? undefined : BORDER,
                            color: TEXT,
                          }}
                        />
                      </div>
                      <FieldError id="su-name-error">{fieldError("fullName")}</FieldError>
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="su-email"
                        className="mb-1.5 block text-[12px] font-semibold"
                        style={{ color: INK }}
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          id="su-email"
                          type="email"
                          autoComplete="email"
                          required
                          value={form.email}
                          onChange={(event) => update("email", event.target.value)}
                          onBlur={() => markTouched("email")}
                          placeholder="Enter your email"
                          aria-invalid={Boolean(fieldError("email"))}
                          aria-describedby={
                            fieldError("email") ? "su-email-error" : undefined
                          }
                          className={`${inputClass("email")} pl-10 pr-3`}
                          style={{
                            borderColor: fieldError("email") ? undefined : BORDER,
                            color: TEXT,
                          }}
                        />
                      </div>
                      <FieldError id="su-email-error">{fieldError("email")}</FieldError>
                    </div>

                    {/* Phone */}
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <label
                          htmlFor="su-phone"
                          className="block text-[12px] font-semibold"
                          style={{ color: INK }}
                        >
                          Phone number
                        </label>
                        <span
                          className="text-[10.5px] font-medium"
                          style={{ color: "#a4a4a4" }}
                        >
                          Optional
                        </span>
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          id="su-phone"
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          value={form.phone}
                          onChange={(event) => update("phone", event.target.value)}
                          onBlur={() => markTouched("phone")}
                          placeholder="+62 812 3456 7890"
                          aria-invalid={Boolean(fieldError("phone"))}
                          aria-describedby={
                            fieldError("phone") ? "su-phone-error" : undefined
                          }
                          className={`${inputClass("phone")} pl-10 pr-3`}
                          style={{
                            borderColor: fieldError("phone") ? undefined : BORDER,
                            color: TEXT,
                          }}
                        />
                      </div>
                      <FieldError id="su-phone-error">{fieldError("phone")}</FieldError>
                    </div>

                    {/* Password */}
                    <div>
                      <label
                        htmlFor="su-password"
                        className="mb-1.5 block text-[12px] font-semibold"
                        style={{ color: INK }}
                      >
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          id="su-password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required
                          minLength={8}
                          value={form.password}
                          onChange={(event) => update("password", event.target.value)}
                          onBlur={() => markTouched("password")}
                          placeholder="At least 8 characters"
                          aria-invalid={Boolean(fieldError("password"))}
                          aria-describedby={
                            fieldError("password") ? "su-password-error" : undefined
                          }
                          className={`${inputClass("password")} pl-10 pr-10`}
                          style={{
                            borderColor: fieldError("password") ? undefined : BORDER,
                            color: TEXT,
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((value) => !value)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-[4px] text-gray-400 transition-colors hover:bg-[#f5f5f5] hover:text-[#0f0f0f]"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      {/* Strength meter — shown as soon as the user types. */}
                      {strength && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex flex-1 gap-1">
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
                            className="text-[10.5px] font-semibold"
                            style={{ color: strengthColor[strength.tone] }}
                          >
                            {strength.label}
                          </span>
                        </div>
                      )}
                      <FieldError id="su-password-error">{fieldError("password")}</FieldError>
                    </div>

                    {/* Confirm password */}
                    <div>
                      <label
                        htmlFor="su-confirm-password"
                        className="mb-1.5 block text-[12px] font-semibold"
                        style={{ color: INK }}
                      >
                        Confirm password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          id="su-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required
                          value={form.confirmPassword}
                          onChange={(event) =>
                            update("confirmPassword", event.target.value)
                          }
                          onBlur={() => markTouched("confirmPassword")}
                          placeholder="Repeat your password"
                          aria-invalid={Boolean(fieldError("confirmPassword"))}
                          aria-describedby={
                            fieldError("confirmPassword")
                              ? "su-confirm-password-error"
                              : undefined
                          }
                          className={`${inputClass("confirmPassword")} pl-10 pr-10`}
                          style={{
                            borderColor: fieldError("confirmPassword")
                              ? undefined
                              : BORDER,
                            color: TEXT,
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((value) => !value)}
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirmation password"
                              : "Show confirmation password"
                          }
                          className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-[4px] text-gray-400 transition-colors hover:bg-[#f5f5f5] hover:text-[#0f0f0f]"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <FieldError id="su-confirm-password-error">
                        {fieldError("confirmPassword")}
                      </FieldError>
                    </div>

                    {/* Terms — flat 14×14 checkbox matching dashboard-v2's
                        body-type filter. */}
                    <div>
                      <div className="flex items-start gap-2">
                        <label className="relative mt-0.5 inline-flex cursor-pointer select-none">
                          <input
                            id="su-terms"
                            type="checkbox"
                            required
                            checked={form.agreeTerms}
                            onChange={(event) => {
                              update("agreeTerms", event.target.checked);
                              markTouched("agreeTerms");
                            }}
                            aria-invalid={Boolean(fieldError("agreeTerms"))}
                            aria-labelledby="terms-description"
                            aria-describedby={
                              fieldError("agreeTerms") ? "su-terms-error" : undefined
                            }
                            className="peer sr-only"
                          />
                          <span
                            className={`grid h-[14px] w-[14px] place-items-center rounded-[3px] border bg-white transition-colors peer-checked:border-[#0f0f0f] peer-checked:bg-[#0f0f0f] ${
                              fieldError("agreeTerms")
                                ? "border-red-300"
                                : ""
                            }`}
                            style={{
                              borderColor: fieldError("agreeTerms")
                                ? undefined
                                : "#d6d6d6",
                            }}
                          >
                            {form.agreeTerms && (
                              <Check
                                className="h-[10px] w-[10px] text-white"
                                strokeWidth={3.5}
                              />
                            )}
                          </span>
                        </label>
                        <span
                          id="terms-description"
                          className="text-[11.5px] leading-relaxed"
                          style={{ color: TEXT }}
                        >
                          I agree to the{" "}
                          <Link
                            to="/terms"
                            className="font-semibold transition-opacity hover:opacity-70"
                            style={{ color: INK }}
                          >
                            Terms &amp; conditions
                          </Link>{" "}
                          and{" "}
                          <Link
                            to="/privacy-policy"
                            className="font-semibold transition-opacity hover:opacity-70"
                            style={{ color: INK }}
                          >
                            Privacy policy
                          </Link>
                          .
                        </span>
                      </div>
                      <FieldError id="su-terms-error">{fieldError("agreeTerms")}</FieldError>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="inline-flex h-[44px] w-full items-center justify-center gap-2 rounded-[6px] text-[12.5px] font-bold tracking-[0.01em] text-white transition-colors hover:bg-[#1f1f1f] active:translate-y-px active:scale-[0.99]"
                      style={{ backgroundColor: INK }}
                    >
                      Create account <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="my-5 flex items-center gap-3">
                    <div
                      className="h-px flex-1"
                      style={{ backgroundColor: BORDER }}
                    />
                    <span
                      className="text-[10.5px] font-semibold uppercase tracking-[0.12em]"
                      style={{ color: "#a4a4a4" }}
                    >
                      or sign up with
                    </span>
                    <div
                      className="h-px flex-1"
                      style={{ backgroundColor: BORDER }}
                    />
                  </div>

                  {/* Social providers */}
                  <div className="space-y-2">
                    <SocialButton icon={<GoogleIcon className="h-4 w-4" />}>
                      Continue with Google
                    </SocialButton>
                    <SocialButton
                      icon={<FacebookIcon className="h-4 w-4 text-[#1877F2]" />}
                    >
                      Continue with Facebook
                    </SocialButton>
                    <SocialButton icon={<AppleIcon className="h-4 w-4 text-black" />}>
                      Continue with Apple
                    </SocialButton>
                  </div>

                  {/* Footer link */}
                  <p
                    className="mt-6 text-center text-[12.5px]"
                    style={{ color: MUTED }}
                  >
                    Already have an account?{" "}
                    <Link
                      to="/sign-in"
                      className="font-semibold transition-opacity hover:opacity-70"
                      style={{ color: INK }}
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
