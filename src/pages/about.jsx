import { Helmet } from "react-helmet-async";
import { Car, Clock, MapPin, Shield, Users } from "lucide-react";
import { Footer } from "@/components/Footer";

const STATS = [
  { value: "5+", label: "Years of Service" },
  { value: "200+", label: "Vehicles Available" },
  { value: "10K+", label: "Happy Customers" },
  { value: "24/7", label: "Customer Support" },
];

const VALUES = [
  { icon: Shield, title: "Trust & Safety", desc: "All vehicles are fully insured and regularly maintained for your peace of mind." },
  { icon: Clock, title: "Reliability", desc: "On-time delivery and pickup, every single time. No excuses." },
  { icon: Users, title: "Local Expertise", desc: "Our Balinese team knows every road, shortcut, and hidden gem on the island." },
  { icon: Car, title: "Quality Fleet", desc: "From scooters to SUVs — clean, modern, and ready for your adventure." },
  { icon: MapPin, title: "Island-Wide Coverage", desc: "We deliver anywhere in Bali: airport, hotel, villa, or any location you choose." },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us — Bali Trans</title>
        <meta name="description" content="Learn about Bali Trans — Bali's trusted car rental service with 5+ years of experience." />
      </Helmet>

      <main className="min-h-screen" style={{ backgroundColor: "#f3f4f4" }}>
        <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl">
            {/* Intro */}
            <div className="rounded-[8px] border bg-white p-8 sm:p-10" style={{ borderColor: "#e6e6e6" }}>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0f0f0f] tracking-tight">About Bali Trans</h1>
              <p className="mt-4 text-sm sm:text-base leading-relaxed max-w-2xl" style={{ color: "#7c7c7c" }}>
                Bali Trans is a locally owned car rental service based in Bali, Indonesia. We've been helping travelers explore the island since 2021 — providing reliable vehicles, transparent pricing, and friendly service that makes your trip stress-free.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-[8px] border bg-white p-6 text-center" style={{ borderColor: "#e6e6e6" }}>
                  <div className="text-2xl font-bold text-[#0f0f0f]">{s.value}</div>
                  <div className="mt-1 text-xs" style={{ color: "#7c7c7c" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="rounded-[8px] border bg-white p-6 flex flex-col" style={{ borderColor: "#e6e6e6" }}>
                    <div className="w-10 h-10 rounded-lg border grid place-items-center text-[#0f0f0f]" style={{ borderColor: "#e6e6e6" }}>
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <h3 className="mt-4 text-[15px] font-semibold text-[#0f0f0f]">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "#7c7c7c" }}>{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
