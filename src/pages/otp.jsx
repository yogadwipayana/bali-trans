import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  KeyRound,
  MailCheck,
  RotateCcw,
  ShieldCheck,
  Timer,
} from "lucide-react";

import { Footer } from "@/components/Footer";
import { useFullScreenRoot } from "@/hooks/useFullScreenRoot";

// ---------------------------------------------------------------------------
// Email confirmation (OTP) — restyled to share /dashboard-v2's monochrome
// system, matching the redesigned /sign-in and /sign-up pages so the entire
// auth flow feels like one continuous experience. The two-column split,
// security preview, OTP input behaviour, paste handling, focus management,
// resend cooldown, and every line of copy are preserved verbatim — only
// the chrome changes.
// ---------------------------------------------------------------------------
const INK = "#0f0f0f"; // primary action / brand text
const TEXT = "#1a1a1a"; // body text
const MUTED = "#7c7c7c"; // secondary text
const BORDER = "#e6e6e6"; // panel borders
const SOFT = "#f3f4f4"; // page surface
const SUCCESS_TINT = "#16a34a"; // green tone — used by the success banner
const SUCCESS_TINT_BG = "#ecfdf5"; // pale green tile background

const OTP_LENGTH = 6;
const RESEND_SECONDS = 45;

function getInitialDigits() {
  return Array.from({ length: OTP_LENGTH }, () => "");
}

// Small uppercase strip used above the security preview cards. Mirrors the
// "RENTAL TYPE" / "BODY TYPE" small-cap labels on /dashboard-v2.
function PreviewLabel({ children, trailing }) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/55">
        {children}
      </span>
      {trailing}
    </div>
  );
}

// Square 6px-radius accent tile used inside the preview to anchor each
// row. Same rhythm as the IconTile on the redesigned home page, just
// painted in inverted (white-on-ink) tones.
function PreviewTile({ children, size = 32 }) {
  return (
    <div
      className="grid shrink-0 place-items-center rounded-[6px] border border-white/15 bg-white/[0.06] text-white/85"
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
}

export default function Otp() {
  useFullScreenRoot();

  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const email =
    typeof location.state?.email === "string" && location.state.email.trim()
      ? location.state.email.trim()
      : "your email";

  const [digits, setDigits] = useState(getInitialDigits);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(RESEND_SECONDS);
  const [message, setMessage] = useState("");

  const code = digits.join("");
  const isComplete = digits.every(Boolean);
  const error =
    submitAttempted && !isComplete
      ? code
        ? "Enter all 6 digits from your email."
        : "Enter the 6-digit code from your email."
      : "";

  useEffect(() => {
    if (resendSeconds <= 0) return undefined;

    const timer = window.setInterval(() => {
      setResendSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendSeconds]);

  const focusInput = (index) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };

  const applyCode = (value, startIndex = 0) => {
    const numeric = value.replace(/\D/g, "").slice(0, OTP_LENGTH - startIndex);
    if (!numeric) return;

    setDigits((current) => {
      const next = [...current];
      numeric.split("").forEach((digit, offset) => {
        next[startIndex + offset] = digit;
      });
      return next;
    });

    const nextIndex = Math.min(startIndex + numeric.length, OTP_LENGTH - 1);
    window.requestAnimationFrame(() => focusInput(nextIndex));
  };

  const handleDigitChange = (index, value) => {
    if (value.length > 1) {
      applyCode(value, index);
      return;
    }

    const digit = value.replace(/\D/g, "");
    setDigits((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });

    if (digit && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
      return;
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      event.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (index, event) => {
    event.preventDefault();
    applyCode(event.clipboardData.getData("text"), index);
  };

  const handleResend = () => {
    if (resendSeconds > 0) return;

    setDigits(getInitialDigits());
    setSubmitAttempted(false);
    setMessage(`A new code was sent to ${email}.`);
    setResendSeconds(RESEND_SECONDS);
    window.requestAnimationFrame(() => focusInput(0));
    console.log("Resend OTP", { email });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    setMessage("");

    if (!isComplete) {
      const firstEmpty = digits.findIndex((digit) => !digit);
      focusInput(firstEmpty === -1 ? 0 : firstEmpty);
      return;
    }

    console.log("Verify OTP", { email, code });
    setMessage("Email verified. Taking you to your dashboard...");
    window.setTimeout(() => navigate("/dashboard"), 650);
  };

  return (
    <>
      <Helmet>
        <title>Email confirmation | Bali Trans</title>
        <meta
          name="description"
          content="Confirm your Bali Trans account email address with a one-time verification code."
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
        {/* ==================== EMAIL CONFIRMATION ====================
            Same outer card pattern as /sign-in and /sign-up: a single
            max-w-7xl thin-bordered tile with an ink-black security
            preview on the left and a white form on the right.
        ==================== */}
        <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-10 lg:pt-10 lg:pb-14">
          <div
            className="relative mx-auto max-w-7xl overflow-hidden rounded-[12px] border bg-white"
            style={{ borderColor: BORDER }}
          >
            <div className="grid lg:grid-cols-2 min-h-[560px] lg:min-h-[640px]">
              {/* ---- Left: account-security preview ---- */}
              <aside
                className="relative hidden overflow-hidden lg:block"
                style={{ backgroundColor: INK }}
              >
                {/* Subtle textured underlay — hero image knocked back so
                    it reads as monochrome ambience. */}
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
                    Account security
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
                    Confirm it is really you
                  </h2>
                  <p className="mb-7 max-w-sm text-[13px] leading-relaxed text-white/65">
                    We use email confirmation before saving trips, pickup
                    locations, and payment details to your account.
                  </p>

                  <div className="space-y-3" aria-hidden="true">
                    {[
                      {
                        icon: MailCheck,
                        title: "Email ownership",
                        text: "Only the owner of this inbox can activate the account.",
                      },
                      {
                        icon: ShieldCheck,
                        title: "Protected bookings",
                        text: "Your saved trips and receipts stay attached to a verified profile.",
                      },
                      {
                        icon: KeyRound,
                        title: "One-time code",
                        text: "The code is short-lived and can be resent if needed.",
                      },
                    ].map(({ icon: Icon, title, text }) => (
                      <div
                        key={title}
                        className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md"
                      >
                        <PreviewLabel>{title}</PreviewLabel>
                        <div className="flex items-start gap-3">
                          <PreviewTile size={32}>
                            <Icon className="h-4 w-4" strokeWidth={1.7} />
                          </PreviewTile>
                          <div className="text-[12px] leading-relaxed text-white/70">
                            {text}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              {/* ---- Right: OTP form ---- */}
              <div className="flex items-center justify-center bg-white px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
                <div className="w-full max-w-lg">
                  {/* Back link — INK with opacity hover. */}
                  <Link
                    to="/sign-up"
                    className="mb-8 inline-flex items-center gap-2 text-[12px] font-semibold transition-opacity hover:opacity-70"
                    style={{ color: INK }}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to sign up
                  </Link>

                  <div className="mb-8">
                    {/* Mail-check tile — thin-bordered square in the same
                        rhythm as IconTile on the redesigned home page. */}
                    <div
                      className="mb-6 grid h-[44px] w-[44px] place-items-center rounded-[8px] border"
                      style={{ borderColor: BORDER, color: INK }}
                    >
                      <MailCheck className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    <span
                      className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: MUTED }}
                    >
                      Email confirmation
                    </span>
                    <h1
                      className="mt-2 mb-3 tracking-tight"
                      style={{
                        color: INK,
                        margin: "0.5rem 0 0.75rem 0",
                        fontSize: "clamp(1.5rem, 0.875rem + 1vw, 2rem)",
                        letterSpacing: "-0.02em",
                        fontWeight: 700,
                        lineHeight: 1.15,
                      }}
                    >
                      Check your email
                    </h1>
                    <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>
                      Enter the 6-digit code we sent to{" "}
                      <span className="font-semibold" style={{ color: INK }}>
                        {email}
                      </span>
                      .
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate>
                    <fieldset className="mb-6">
                      <legend
                        className="mb-3 block text-[12px] font-semibold"
                        style={{ color: INK }}
                      >
                        Verification code
                      </legend>
                      <div
                        className="grid grid-cols-6 gap-2"
                        aria-label="6-digit verification code"
                      >
                        {digits.map((digit, index) => (
                          <input
                            key={index}
                            ref={(node) => {
                              inputRefs.current[index] = node;
                            }}
                            type="text"
                            inputMode="numeric"
                            autoComplete={index === 0 ? "one-time-code" : "off"}
                            pattern="[0-9]*"
                            maxLength={1}
                            value={digit}
                            onChange={(event) =>
                              handleDigitChange(index, event.target.value)
                            }
                            onKeyDown={(event) => handleKeyDown(index, event)}
                            onPaste={(event) => handlePaste(index, event)}
                            aria-label={`Digit ${index + 1}`}
                            aria-invalid={Boolean(error)}
                            className={`h-[56px] rounded-[6px] border bg-white text-center text-[18px] font-bold outline-none transition-colors ${
                              error
                                ? "border-red-300 focus:border-red-500"
                                : "focus:border-[#0f0f0f]"
                            }`}
                            style={{
                              borderColor: error ? undefined : BORDER,
                              color: TEXT,
                            }}
                          />
                        ))}
                      </div>
                      {error && (
                        <p className="mt-2 text-[11px] font-medium text-red-600">
                          {error}
                        </p>
                      )}
                    </fieldset>

                    {/* Status message — pale green tile with a check icon
                        (success-tinted accent, the only non-monochrome
                        affordance on the page). */}
                    {message && (
                      <p
                        className="mb-5 flex items-start gap-2 rounded-[6px] border px-3 py-2 text-[11.5px] font-medium"
                        style={{
                          backgroundColor: SUCCESS_TINT_BG,
                          borderColor: "#bbf7d0",
                          color: SUCCESS_TINT,
                        }}
                      >
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        <span>{message}</span>
                      </p>
                    )}

                    {/* Submit — solid ink pill matching the auth flow. */}
                    <button
                      type="submit"
                      className="inline-flex h-[44px] w-full items-center justify-center gap-2 rounded-[6px] text-[12.5px] font-bold tracking-[0.01em] text-white transition-colors hover:bg-[#1f1f1f] active:translate-y-px active:scale-[0.99]"
                      style={{ backgroundColor: INK }}
                    >
                      Verify email <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>

                  {/* Resend row — timer on the left, INK resend button on
                      the right. */}
                  <div
                    className="mt-6 flex flex-col gap-3 rounded-[6px] border px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                    style={{ borderColor: BORDER, backgroundColor: SOFT }}
                  >
                    <span
                      className="inline-flex items-center gap-1.5 text-[12px]"
                      style={{ color: MUTED }}
                    >
                      <Timer className="h-3.5 w-3.5" />
                      {resendSeconds > 0
                        ? `Resend available in ${resendSeconds}s`
                        : "You can request a new code now"}
                    </span>
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendSeconds > 0}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:text-gray-400 disabled:opacity-100"
                      style={{ color: resendSeconds > 0 ? undefined : INK }}
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Resend code
                    </button>
                  </div>

                  {/* Footer link */}
                  <p
                    className="mt-6 text-center text-[12.5px]"
                    style={{ color: MUTED }}
                  >
                    Wrong email?{" "}
                    <Link
                      to="/sign-up"
                      className="font-semibold transition-opacity hover:opacity-70"
                      style={{ color: INK }}
                    >
                      Edit sign-up details
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
