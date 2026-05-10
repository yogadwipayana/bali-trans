import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Database,
  FileText,
  Lock,
  Mail,
  Shield,
} from "lucide-react";

import { Footer } from "@/components/Footer";
import { useFullScreenRoot } from "@/hooks/useFullScreenRoot";

const TEAL = "#1d4046";

const sections = [
  {
    title: "1. Information we collect",
    body: [
      "We collect account details such as your name, email address, phone number, password, and communication preferences when you create or manage a Bali Trans account.",
      "When you make a booking, we collect trip details including pickup and return locations, rental dates, vehicle preferences, passenger notes, and driver information needed to prepare the rental.",
      "We may collect payment status, deposit status, invoice details, and limited transaction references. Full card details are handled by payment providers and are not stored by Bali Trans.",
    ],
  },
  {
    title: "2. How we use your information",
    body: [
      "We use personal information to create accounts, confirm bookings, deliver vehicles, verify drivers, process payments, send receipts, and provide customer support.",
      "We use trip and service information to coordinate pickup, return, roadside assistance, insurance documentation, and follow-up communication about active rentals.",
      "We may use aggregated or de-identified information to improve vehicle availability, pricing, support quality, website performance, and customer experience.",
    ],
  },
  {
    title: "3. Communication",
    body: [
      "We may contact you by email, phone, SMS, WhatsApp, or in-app messages about bookings, account activity, payment reminders, schedule changes, and support requests.",
      "If you subscribe to updates, we may send offers, travel tips, and service announcements. You can opt out of promotional messages, but we may still send important service messages.",
    ],
  },
  {
    title: "4. Sharing information",
    body: [
      "We do not sell your personal information.",
      "We may share information with payment processors, vehicle delivery teams, insurers, maintenance partners, analytics providers, and support tools when needed to provide the service.",
      "We may disclose information if required by law, government request, traffic enforcement, insurance investigation, dispute resolution, or to protect the safety and rights of customers, staff, or Bali Trans.",
    ],
  },
  {
    title: "5. Cookies and analytics",
    body: [
      "Our website may use cookies or similar technologies to keep sessions working, remember preferences, measure traffic, and understand how visitors use the service.",
      "If analytics tools such as Microsoft Clarity are enabled, they may help us review usage patterns and improve usability. These tools should be configured according to their own privacy terms.",
      "You can control cookies through your browser settings, but some account or booking features may not work correctly if essential cookies are blocked.",
    ],
  },
  {
    title: "6. Data security",
    body: [
      "We use reasonable technical and organizational safeguards to protect personal information from unauthorized access, misuse, loss, or disclosure.",
      "No online service can guarantee absolute security. You are responsible for using a strong password, keeping your login details private, and telling us if you suspect unauthorized account activity.",
    ],
  },
  {
    title: "7. Data retention",
    body: [
      "We keep personal information for as long as needed to provide services, maintain records, resolve disputes, comply with legal obligations, and protect our legitimate business interests.",
      "Booking, invoice, payment, vehicle handover, incident, and support records may be retained longer where required for accounting, insurance, safety, or legal reasons.",
    ],
  },
  {
    title: "8. Your choices",
    body: [
      "You may request access, correction, or deletion of your account information by contacting Bali Trans support.",
      "Some information may need to be retained even after a deletion request, such as completed booking records, invoices, dispute records, or information required by law.",
      "You can update account information directly in your account where available, or ask support for help with changes that are not self-service.",
    ],
  },
  {
    title: "9. Updates to this policy",
    body: [
      "We may update this Privacy Policy when our services, technology, partners, or legal requirements change.",
      "If changes are material, we will make reasonable efforts to notify customers through the website, email, account notice, or another appropriate channel.",
    ],
  },
];

export default function PrivacyPolicy() {
  useFullScreenRoot();

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Bali Trans</title>
        <meta
          name="description"
          content="Read the Bali Trans privacy policy for account data, bookings, payments, communications, cookies, data security, retention, and privacy choices."
        />
      </Helmet>

      <div
        className="min-h-screen font-sans text-[#1a1a1a] antialiased"
        style={{
          backgroundColor: "#f7f5f1",
          "--text": "#6b7280",
          "--text-h": "#1a1a1a",
          "--bg": "#f7f5f1",
          "--border": "#ece9e3",
          colorScheme: "light",
          color: "#1a1a1a",
        }}
      >
        <main className="px-4 sm:px-6 lg:px-8 pt-6 pb-12 lg:pt-10 lg:pb-16">
          <section className="max-w-7xl mx-auto rounded-3xl overflow-hidden bg-white shadow-[0_12px_40px_rgba(29,64,70,0.12)] border border-[#ece9e3]">
            <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
              <aside
                className="relative p-8 sm:p-10 lg:p-12 text-white overflow-hidden"
                style={{ backgroundColor: TEAL }}
              >
                <img
                  src="/images/hero.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1d4046]/75 to-[#1d4046]" />

                <div className="relative z-10 lg:sticky lg:top-8">
                  <Link
                    to="/sign-up"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white transition-colors mb-8"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to sign up
                  </Link>

                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-6">
                    <Shield className="w-6 h-6 text-white" />
                  </div>

                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-3">
                    Bali Trans privacy
                  </p>
                  <h1
                    className="text-white tracking-tight mb-4"
                    style={{
                      fontSize: "clamp(2rem, 1.25rem + 2vw, 3.25rem)",
                      lineHeight: 1.05,
                      fontWeight: 700,
                      letterSpacing: "-0.035em",
                    }}
                  >
                    Privacy Policy
                  </h1>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-md mb-8">
                    This policy explains what we collect, why we use it, who we share it with, and how you can manage your information.
                  </p>

                  <div className="space-y-3 text-sm text-white/75">
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-emerald-300" />
                      <span>Account and booking data protection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Database className="w-4 h-4 text-emerald-300" />
                      <span>Clear retention and sharing rules</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-emerald-300" />
                      <span>Support contact for privacy requests</span>
                    </div>
                  </div>
                </div>
              </aside>

              <div className="p-6 sm:p-10 lg:p-12">
                <div className="mb-8 pb-6 border-b border-gray-100">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#f0f5f5] px-3 py-1 text-xs font-semibold text-[#1d4046]">
                      <FileText className="w-3.5 h-3.5" />
                      Last updated: May 9, 2026
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      <CheckCircle className="w-3.5 h-3.5" />
                      No sale of personal data
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Please read this Privacy Policy before creating an account or making a booking with Bali Trans. By using our website or services, you acknowledge the practices described here.
                  </p>
                </div>

                <div className="space-y-8">
                  {sections.map((section) => (
                    <section key={section.title}>
                      <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#1a1a1a] mb-3">
                        {section.title}
                      </h2>
                      <div className="space-y-3">
                        {section.body.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="text-sm sm:text-[15px] text-gray-600 leading-relaxed"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                <div className="mt-10 rounded-2xl p-5 sm:p-6 border border-[#dfe9e7] bg-[#f0f5f5]">
                  <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">
                    Privacy questions or account requests?
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Contact Bali Trans support if you want to access, update, or ask about your account and booking information.
                  </p>
                  <Link
                    to="/sign-up"
                    className="btn-glass inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-bold text-white"
                    style={{ backgroundColor: TEAL }}
                  >
                    Return to sign up
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
