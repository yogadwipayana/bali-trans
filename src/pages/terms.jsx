import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, FileText, Mail, Shield } from "lucide-react";

import { Footer } from "@/components/Footer";
import { useFullScreenRoot } from "@/hooks/useFullScreenRoot";

const TEAL = "#1d4046";

const sections = [
  {
    title: "1. Eligibility and account responsibility",
    body: [
      "You must be at least 18 years old to create a Bali Trans account and at least 21 years old to rent a self-drive vehicle unless a different age is stated for a specific vehicle class.",
      "You are responsible for keeping your account details accurate, protecting your password, and ensuring every listed driver has a valid license accepted in Indonesia.",
      "If you create an account or booking on behalf of another passenger or driver, you confirm that you have permission to provide their information.",
    ],
  },
  {
    title: "2. Bookings and rental confirmation",
    body: [
      "A booking request is confirmed only after Bali Trans issues written confirmation by email, WhatsApp, or account notification.",
      "Vehicle photos and model names are representative. If the requested unit is unavailable, we may offer an equivalent or higher class vehicle with comparable capacity and features.",
      "Pickup and return times must be agreed in advance. Late pickup, late return, or route changes may affect the final rental price.",
    ],
  },
  {
    title: "3. Payments, deposits, and pricing",
    body: [
      "Prices are shown in the selected currency and may include daily rental fees, driver service, airport delivery, insurance options, taxes, and selected add-ons depending on your booking.",
      "Deposits or prepayments may be required to secure high-demand dates, long rentals, or premium vehicles. Any unpaid balance is due before vehicle handover unless we agree otherwise in writing.",
      "Promotional prices, discounts, and vouchers may be limited by date, vehicle category, route, rental duration, or availability.",
    ],
  },
  {
    title: "4. Cancellation and schedule changes",
    body: [
      "Cancellation terms depend on the rental package, season, and notice period stated at checkout or in your confirmation.",
      "We will try to accommodate pickup time, drop-off location, and date changes, but changes are subject to vehicle availability, operating hours, route feasibility, and any applicable price difference.",
      "If you do not arrive at the agreed pickup location within a reasonable waiting period and do not contact us, the booking may be treated as a no-show.",
    ],
  },
  {
    title: "5. Vehicle use and driver obligations",
    body: [
      "Vehicles must be used lawfully, safely, and only on suitable public roads in Bali unless written approval is given for another route.",
      "Self-drive customers must not sublet the vehicle, allow unregistered drivers, drive under the influence, overload the vehicle, carry illegal goods, or use the vehicle for racing, towing, ride-hailing, or commercial delivery.",
      "You must keep the vehicle locked, parked safely, and protected from misuse while it is in your possession.",
    ],
  },
  {
    title: "6. Fuel, cleaning, tolls, and fines",
    body: [
      "Unless your package states otherwise, vehicles should be returned with the same fuel level received.",
      "You are responsible for tolls, parking, traffic tickets, late-return charges, excessive cleaning, missing accessories, and government fines incurred during your rental period.",
      "Additional cleaning fees may apply if the vehicle is returned with excessive sand, stains, smoke odor, pet hair, or other unusual cleaning needs.",
    ],
  },
  {
    title: "7. Damage, insurance, and liability",
    body: [
      "Basic insurance or damage coverage may apply only when the rental is used according to these terms and the police or insurance documentation requirements are met.",
      "You must report accidents, theft, breakdowns, or vehicle damage immediately and follow Bali Trans instructions for police reports, photos, and incident details.",
      "You remain responsible for deductibles, exclusions, lost keys, tire or undercarriage damage, interior damage, negligence, unauthorized use, and any losses not covered by insurance.",
    ],
  },
  {
    title: "8. Privacy and communication",
    body: [
      "We collect booking, identity, license, payment, and trip information to process reservations, prevent fraud, provide customer support, and meet legal obligations.",
      "By booking with Bali Trans, you agree that we may contact you by email, phone, SMS, WhatsApp, or in-app message about your reservation, safety updates, invoices, and service notices.",
      "We do not sell your personal information. Some information may be shared with payment processors, delivery partners, insurers, or authorities when required to provide the service or comply with law.",
    ],
  },
  {
    title: "9. Service changes and availability",
    body: [
      "Bali Trans may update vehicle availability, prices, operating areas, pickup procedures, and these terms when needed for safety, legal, supplier, or operational reasons.",
      "We aim to keep the service available and accurate, but we do not guarantee that the website, booking flow, or vehicle inventory will always be uninterrupted or error-free.",
      "If a confirmed service is disrupted by events outside our reasonable control, we will work with you on a fair alternative, reschedule, credit, or refund based on the circumstances.",
    ],
  },
];

export default function Terms() {
  useFullScreenRoot();

  return (
    <>
      <Helmet>
        <title>Terms &amp; Conditions | Bali Trans</title>
        <meta
          name="description"
          content="Read the Bali Trans terms and conditions for car rental bookings, payments, cancellations, vehicle use, privacy, and service availability."
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
                    <FileText className="w-6 h-6 text-white" />
                  </div>

                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-3">
                    Bali Trans legal
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
                    Terms &amp; Conditions
                  </h1>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-md mb-8">
                    Clear rental rules for safe, reliable, and transparent Bali travel with Bali Trans.
                  </p>

                  <div className="space-y-3 text-sm text-white/75">
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-emerald-300" />
                      <span>Protected booking and payment expectations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-300" />
                      <span>Responsible rental and return standards</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-emerald-300" />
                      <span>Support contact for rental questions</span>
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
                      Rental rules before booking
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Please read these Terms & Conditions before creating an account or making a booking with Bali Trans. By using our website or services, you agree to these terms.
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
                    Questions about these terms?
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Contact Bali Trans support before completing your booking if anything is unclear.
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
