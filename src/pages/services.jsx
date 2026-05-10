import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import { ArrowRight, Car, Clock, MapPin, Shield, Truck, Wallet } from "lucide-react";
import { Footer } from "@/components/Footer";

const SERVICES = [
  {
    icon: Car,
    title: "Self-Drive Rental",
    desc: "Choose from our wide range of well-maintained vehicles and explore Bali at your own pace.",
    tag: "Most Popular",
  },
  {
    icon: Truck,
    title: "Free Delivery & Pickup",
    desc: "We deliver your car to the airport, hotel, or villa — and pick it up when you're done.",
  },
  {
    icon: Clock,
    title: "24/7 Roadside Assistance",
    desc: "Our local team is always available to help with any issues, day or night.",
  },
  {
    icon: Shield,
    title: "Full Insurance Coverage",
    desc: "Drive with peace of mind. All rentals include comprehensive insurance protection.",
  },
  {
    icon: MapPin,
    title: "Chauffeur Service",
    desc: "Prefer a driver? Hire an experienced local driver who knows every corner of Bali.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    desc: "No hidden fees or surprise charges. What you see is exactly what you pay.",
  },
];

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services — Bali Trans</title>
        <meta name="description" content="Bali Trans car rental services: self-drive, chauffeur, free delivery, 24/7 support, and full insurance coverage." />
      </Helmet>

      <main className="min-h-screen" style={{ backgroundColor: "#f3f4f4" }}>
        <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl">
            {/* Top row: featured service + 2 stacked */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Featured card */}
              {(() => {
                const Featured = SERVICES[0];
                const Icon = Featured.icon;
                return (
                  <div className="relative bg-[#0f0f0f] text-white rounded-[8px] p-8 flex flex-col justify-between min-h-[280px]">
                    <div>
                      <span className="inline-block text-[10px] font-semibold uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded-full mb-4">
                        {Featured.tag}
                      </span>
                      <div className="w-11 h-11 rounded-lg bg-white/10 grid place-items-center mb-5">
                        <Icon className="w-5 h-5" strokeWidth={1.8} />
                      </div>
                      <h2 className="text-xl font-bold">{Featured.title}</h2>
                      <p className="mt-2 text-sm text-white/70 max-w-sm leading-relaxed">{Featured.desc}</p>
                    </div>
                    <Link
                      to="/vehicles"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80 transition-colors"
                    >
                      Browse vehicles <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })()}

              {/* Right stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICES.slice(1, 3).map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="rounded-[8px] border bg-white p-6 flex flex-col" style={{ borderColor: "#e6e6e6" }}>
                    <div className="w-10 h-10 rounded-lg border grid place-items-center text-[#0f0f0f]" style={{ borderColor: "#e6e6e6" }}>
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <h3 className="mt-4 text-[15px] font-semibold text-[#0f0f0f]">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "#7c7c7c" }}>{s.desc}</p>
                  </div>
                );
              })}
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {SERVICES.slice(3).map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="rounded-[8px] border bg-white p-6 flex flex-col" style={{ borderColor: "#e6e6e6" }}>
                    <div className="w-10 h-10 rounded-lg border grid place-items-center text-[#0f0f0f]" style={{ borderColor: "#e6e6e6" }}>
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <h3 className="mt-4 text-[15px] font-semibold text-[#0f0f0f]">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "#7c7c7c" }}>{s.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* CTA banner */}
            <div className="mt-10 rounded-[8px] border bg-white p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: "#e6e6e6" }}>
              <div>
                <h3 className="text-lg font-bold text-[#0f0f0f]">Ready to explore Bali?</h3>
                <p className="mt-1 text-sm" style={{ color: "#7c7c7c" }}>Book your vehicle today and enjoy free delivery to your location.</p>
              </div>
              <Link
                to="/vehicles"
                className="inline-flex items-center gap-2 h-[44px] rounded-lg px-6 text-[13px] font-bold text-white bg-[#0f0f0f] hover:bg-[#1f1f1f] transition-colors shrink-0"
              >
                Book now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
