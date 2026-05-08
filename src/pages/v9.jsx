import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Star,
  MapPin,
  Calendar,
  Car,
  Users,
  Cog,
  Gauge,
  Phone,
  Mail,
  Globe,
  AtSign,
  MessageCircle,
  Search,
  Tag,
  Truck,
  Shield,
  Clock,
  Wallet,
  CheckCircle,
  User,
  Zap,
  Activity,
  Flag,
  Timer,
  TrendingUp,
} from "lucide-react";

const navLinks = ["FLEET", "DEALS", "ROUTES", "SERVICES", "REVIEWS", "ABOUT", "CONTACT"];

function useFullScreenRoot() {
  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;
    const prev = {
      width: root.style.width,
      maxWidth: root.style.maxWidth,
      borderInline: root.style.borderInline,
      textAlign: root.style.textAlign,
    };
    root.style.width = "100%";
    root.style.maxWidth = "100%";
    root.style.borderInline = "none";
    root.style.textAlign = "left";
    return () => {
      root.style.width = prev.width;
      root.style.maxWidth = prev.maxWidth;
      root.style.borderInline = prev.borderInline;
      root.style.textAlign = prev.textAlign;
    };
  }, []);
}

// Diagonal stripe pattern for racing
const DiagonalStripes = ({ className = "" }) => (
  <div
    className={className}
    style={{
      backgroundImage:
        "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 12px)",
    }}
  />
);

const CheckerStrip = ({ className = "" }) => (
  <div
    className={`flex h-3 ${className}`}
    style={{
      backgroundImage:
        "repeating-linear-gradient(90deg, #fff200 0 16px, #0a0a0a 16px 32px)",
    }}
  />
);

// Race number plate
const NumberPlate = ({ num, className = "" }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`}>
    <div className="absolute inset-0 bg-[#fff200] -skew-x-12" />
    <div className="relative font-black italic text-[#0a0a0a] text-sm tracking-tight px-3 py-1">
      {num}
    </div>
  </div>
);

export default function V9() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useFullScreenRoot();

  return (
    <>
      <Helmet>
        <title>Auto Ultimate · Bali Drive Performance</title>
        <meta name="description" content="High-performance car rental in Bali. Built for drivers who actually drive." />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a] font-sans text-white antialiased relative overflow-x-hidden">
        {/* ==================== 1. NAVBAR — racing dashboard ==================== */}
        <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b-2 border-[#e10600]">
          {/* Top status strip */}
          <div className="bg-[#171717] py-1 px-4 sm:px-6 lg:px-8 border-b border-white/5">
            <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase">
              <div className="flex items-center gap-4 text-white/50">
                <span className="flex items-center gap-1.5">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inset-0 rounded-full bg-[#00ff88] animate-ping opacity-75" />
                    <span className="relative rounded-full w-1.5 h-1.5 bg-[#00ff88]" />
                  </span>
                  ALL SYSTEMS LIVE
                </span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">100+ UNITS AVAILABLE</span>
              </div>
              <div className="text-white/50 hidden sm:flex gap-3">
                <span>BALI · ID</span>
                <span>·</span>
                <span>EST. 2013</span>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 bg-[#e10600] flex items-center justify-center -skew-x-12">
                  <span className="skew-x-12">
                    <Car className="w-5 h-5 text-white" />
                  </span>
                </div>
                <div className="leading-tight">
                  <div className="font-black italic text-white text-lg tracking-tight">AUTO ULTIMATE</div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#e10600] font-mono">/ BALI · DRIVE / V.09</div>
                </div>
              </div>

              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase()}`}
                    className="text-[12px] font-bold tracking-wider px-3 py-2 text-white/70 hover:text-[#fff200] hover:bg-white/5 transition-colors"
                  >
                    {l}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <a href="#signin" className="hidden sm:flex items-center gap-1.5 text-[12px] font-bold tracking-wider text-white/70 hover:text-white">
                  <User className="w-3.5 h-3.5" /> SIGN IN
                </a>
                <a href="#book" className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#e10600] text-white text-[12px] font-black tracking-wider uppercase hover:bg-[#ff1a1a] transition-colors -skew-x-12">
                  <span className="skew-x-12 flex items-center gap-1.5">
                    BOOK NOW <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>
                <button className="lg:hidden p-1.5 text-white" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
          {mobileOpen && (
            <div className="lg:hidden border-t-2 border-[#e10600] bg-[#0a0a0a] px-4 py-5 space-y-3">
              {navLinks.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm font-bold tracking-wider text-white" onClick={() => setMobileOpen(false)}>{l}</a>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
                <a href="#signin" className="flex items-center gap-2 text-sm font-bold tracking-wider"><User className="w-4 h-4" /> SIGN IN</a>
                <a href="#book" className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#e10600] text-white text-sm font-black tracking-wider">
                  BOOK NOW <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </header>

        {/* ==================== 2. HERO — racing dashboard ==================== */}
        <section className="relative pt-12 lg:pt-16 pb-32 overflow-hidden">
          {/* Diagonal red stripe accent */}
          <div className="absolute top-32 -left-20 w-96 h-2 bg-[#e10600] -rotate-45 opacity-70" />
          <div className="absolute top-44 -left-10 w-72 h-1 bg-[#fff200] -rotate-45 opacity-70" />

          {/* Mile-marker grid background */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(0deg, transparent 49.5%, white 49.5%, white 50.5%, transparent 50.5%), linear-gradient(90deg, transparent 49.5%, white 49.5%, white 50.5%, transparent 50.5%)",
              backgroundSize: "80px 80px",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                {/* Top race-style label */}
                <div className="inline-flex items-center gap-3 mb-8">
                  <NumberPlate num="01" />
                  <span className="text-[#e10600] font-black italic text-xs tracking-[0.25em]">PERFORMANCE / BALI</span>
                  <span className="h-px w-12 bg-white/30" />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/50">SEASON 2026</span>
                </div>

                <h1 className="font-black italic text-white text-7xl sm:text-8xl lg:text-9xl xl:text-[160px] leading-[0.85] tracking-[-0.04em] mb-2">
                  DRIVE
                  <br />
                  BALI.
                  <br />
                  <span className="text-[#e10600]">UNFORGET-</span>
                  <br />
                  <span className="bg-[#fff200] text-[#0a0a0a] px-3 -skew-x-12 inline-block">TABLE.</span>
                </h1>

                <div className="flex items-center gap-4 mt-8 mb-10">
                  <CheckerStrip className="w-20" />
                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-white/60">100+ Units · Island-wide</p>
                </div>

                <p className="text-white/70 text-lg lg:text-xl max-w-lg mb-10 leading-relaxed">
                  Built for drivers who actually drive. <span className="text-white font-bold">Tuned fleet</span>, real-time availability, and pickup faster than your average pit stop.
                </p>

                <div className="flex flex-wrap gap-3 mb-12">
                  <a href="#book" className="group relative inline-flex items-center gap-2 px-7 py-4 bg-[#e10600] text-white font-black italic tracking-wider uppercase hover:bg-[#ff1a1a] transition-colors -skew-x-12">
                    <span className="skew-x-12 flex items-center gap-2">
                      START ENGINE <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                  <a href="#vehicles" className="inline-flex items-center gap-2 px-7 py-4 bg-white/5 border-2 border-white/30 text-white font-black italic tracking-wider uppercase hover:bg-white/10 transition-all -skew-x-12">
                    <span className="skew-x-12">BROWSE FLEET</span>
                  </a>
                </div>

                {/* Performance stats — dashboard style */}
                <div className="grid grid-cols-4 gap-px bg-white/10 border border-white/10">
                  {[
                    { label: "BOOKINGS", value: "10K+", sub: "completed" },
                    { label: "RATING", value: "4.9", sub: "/ 5.0" },
                    { label: "RESPONSE", value: "< 2m", sub: "average" },
                    { label: "UPTIME", value: "100%", sub: "fleet" },
                  ].map((s) => (
                    <div key={s.label} className="bg-[#0a0a0a] p-4">
                      <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase mb-1">{s.label}</div>
                      <div className="font-black italic text-2xl">{s.value}</div>
                      <div className="font-mono text-[10px] text-white/50 uppercase">{s.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: car with speedometer */}
              <div className="lg:col-span-5 relative">
                <div className="relative">
                  {/* Big diagonal accent */}
                  <div className="absolute -top-8 -right-8 w-[120%] h-32 bg-[#e10600] -rotate-12 opacity-90" />

                  <div className="relative aspect-[4/5] overflow-hidden border-4 border-white">
                    <img src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=80" alt="Performance car" className="w-full h-full object-cover" />

                    {/* Top label overlay */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <div className="bg-[#fff200] -skew-x-12 px-3 py-1.5">
                        <div className="skew-x-12 font-black italic text-[#0a0a0a] text-xs tracking-tight">FEATURED · 2026</div>
                      </div>
                      <div className="font-mono text-[10px] tracking-[0.2em] text-white bg-black/60 px-2 py-1 backdrop-blur-sm">#FT-001</div>
                    </div>

                    {/* Bottom info bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent p-5">
                      <div className="font-mono text-[10px] tracking-[0.2em] text-[#fff200] mb-1">VEHICLE_ID: TOY-FRT-2026</div>
                      <div className="font-black italic text-3xl text-white tracking-tight">TOYOTA FORTUNER</div>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {[
                          { label: "POWER", value: "204HP" },
                          { label: "TORQUE", value: "500NM" },
                          { label: "SEATS", value: "7" },
                        ].map((s) => (
                          <div key={s.label} className="border border-white/20 p-2">
                            <div className="font-mono text-[9px] tracking-wider text-white/50 uppercase">{s.label}</div>
                            <div className="font-black italic text-white">{s.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating speedometer card */}
                  <div className="absolute -bottom-6 -left-6 bg-[#0a0a0a] border-2 border-[#fff200] p-4 -skew-x-6 shadow-2xl">
                    <div className="skew-x-6">
                      <div className="font-mono text-[9px] tracking-[0.2em] text-[#fff200] mb-1">RATE</div>
                      <div className="font-black italic text-3xl text-white">RP 850K</div>
                      <div className="font-mono text-[10px] text-white/50 uppercase mt-0.5">/ 24H</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom checker strip */}
          <CheckerStrip className="mt-20" />
        </section>

        {/* ==================== 3. BOOKING — control panel ==================== */}
        <section className="relative px-4 sm:px-6 lg:px-8 -mt-12 z-10">
          <div className="max-w-6xl mx-auto bg-[#171717] border-2 border-[#e10600] relative">
            {/* Top label */}
            <div className="absolute -top-3 left-6 bg-[#e10600] text-white font-black italic text-xs tracking-wider uppercase px-3 py-1">
              CONFIGURE TRIP
            </div>
            <div className="absolute -top-3 right-6 bg-[#fff200] text-[#0a0a0a] font-black italic text-xs tracking-wider uppercase px-3 py-1">
              02 / SETUP
            </div>

            <div className="p-6 lg:p-8 pt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-end">
                {[
                  { label: "PICKUP", icon: MapPin, type: "select", options: ["NGURAH RAI AIRPORT", "UBUD", "SEMINYAK", "KUTA"] },
                  { label: "START", icon: Calendar, type: "datetime-local", value: "2026-05-10T10:00" },
                  { label: "END", icon: Calendar, type: "datetime-local", value: "2026-05-15T10:00" },
                  { label: "VEHICLE", icon: Car, type: "select", options: ["ALL", "SUV", "MPV", "SEDAN"] },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[#fff200] mb-2">/ {f.label}</label>
                    <div className="flex items-center gap-2 px-3 py-3 bg-[#0a0a0a] border border-white/15 focus-within:border-[#e10600] transition-colors">
                      <f.icon className="w-4 h-4 text-[#e10600] shrink-0" />
                      {f.type === "select" ? (
                        <select className="bg-transparent text-sm font-bold text-white w-full outline-none cursor-pointer [&>option]:text-[#0a0a0a]">{f.options.map((o) => <option key={o}>{o}</option>)}</select>
                      ) : (
                        <input type={f.type} defaultValue={f.value} className="bg-transparent text-sm font-bold text-white w-full outline-none" />
                      )}
                    </div>
                  </div>
                ))}
                <button className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#e10600] text-white font-black italic tracking-wider uppercase hover:bg-[#ff1a1a] transition-colors -skew-x-12">
                  <span className="skew-x-12 flex items-center gap-2">
                    <Search className="w-4 h-4" /> SEARCH
                  </span>
                </button>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs">
                {[
                  { icon: CheckCircle, t: "FREE CANCEL" },
                  { icon: Gauge, t: "UNLIMITED KM" },
                  { icon: Shield, t: "FULL INSURANCE" },
                  { icon: Clock, t: "FLEXIBLE" },
                ].map(({ icon: Icon, t }) => (
                  <div key={t} className="flex items-center gap-1.5 font-mono tracking-[0.15em] text-white/60">
                    <Icon className="w-3.5 h-3.5 text-[#fff200]" /> {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 4. SPECIAL OFFERS — pit stop deals ==================== */}
        <section id="deals" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
              <div>
                <div className="inline-flex items-center gap-3 mb-5">
                  <NumberPlate num="03" />
                  <span className="text-[#e10600] font-black italic text-xs tracking-[0.25em]">DEAL ZONE</span>
                  <CheckerStrip className="w-12" />
                </div>
                <h2 className="font-black italic text-5xl lg:text-6xl xl:text-7xl text-white leading-[0.95] tracking-[-0.03em]">
                  PIT STOP<br />
                  <span className="text-[#e10600]">DEALS.</span>
                </h2>
              </div>
              <a href="#all-deals" className="group inline-flex items-center gap-2 px-5 py-3 border-2 border-white/30 text-white font-black italic uppercase tracking-wider text-sm hover:bg-white hover:text-[#0a0a0a] transition-all -skew-x-12">
                <span className="skew-x-12 flex items-center gap-2">
                  ALL DEALS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { num: "01", title: "EARLY BIRD", desc: "Book 30 days ahead", off: "15", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db9?auto=format&fit=crop&w=400&q=80" },
                { num: "02", title: "WEEKEND RUN", desc: "Friday → Monday", off: "10", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80" },
                { num: "03", title: "LONG HAUL", desc: "7+ days, low rate", off: "20", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80" },
                { num: "04", title: "FAMILY FLEX", desc: "All ages, big space", off: "12", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80" },
              ].map((deal) => (
                <div key={deal.title} className="bg-[#171717] border border-white/10 hover:border-[#e10600] transition-colors group cursor-pointer relative">
                  {/* Number badge */}
                  <div className="absolute top-0 left-0 z-10 bg-[#e10600] text-white font-black italic text-xs tracking-wider px-3 py-1.5">
                    /{deal.num}
                  </div>

                  {/* Discount stamp */}
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-[#fff200] -skew-x-12 px-3 py-1">
                      <div className="skew-x-12 font-black italic text-[#0a0a0a] text-sm">-{deal.off}%</div>
                    </div>
                  </div>

                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={deal.img} alt={deal.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0" />
                  </div>

                  <div className="p-5">
                    <h3 className="font-black italic text-xl text-white mb-1">{deal.title}</h3>
                    <p className="font-mono text-[11px] tracking-wider uppercase text-white/50">{deal.desc}</p>

                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#fff200]">RESERVE NOW</span>
                      <ArrowUpRight className="w-4 h-4 text-[#e10600] group-hover:scale-125 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. FEATURED FLEET — performance specs ==================== */}
        <section id="fleet" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white text-[#0a0a0a]">
          {/* Diagonal accent */}
          <div className="absolute top-0 right-0 w-1/2 h-3 bg-[#e10600]" />
          <div className="absolute top-3 right-0 w-1/3 h-1 bg-[#fff200]" />

          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
              <div>
                <div className="inline-flex items-center gap-3 mb-5">
                  <NumberPlate num="04" />
                  <span className="text-[#e10600] font-black italic text-xs tracking-[0.25em]">THE GARAGE</span>
                  <CheckerStrip className="w-12" />
                </div>
                <h2 className="font-black italic text-5xl lg:text-6xl xl:text-7xl text-[#0a0a0a] leading-[0.95] tracking-[-0.03em]">
                  TUNED &<br />
                  <span className="text-[#e10600]">READY.</span>
                </h2>
              </div>
              <a href="#all-vehicles" className="group inline-flex items-center gap-2 px-5 py-3 bg-[#0a0a0a] text-white font-black italic uppercase tracking-wider text-sm hover:bg-[#e10600] transition-colors -skew-x-12">
                <span className="skew-x-12 flex items-center gap-2">
                  ALL VEHICLES <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "TOYOTA AVANZA", id: "AVZ-001", tag: "FAMILY", seats: 7, trans: "AUTO", cc: "1.3L", power: "104HP", price: "450", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=600&q=80" },
                { name: "TOYOTA RUSH", id: "RSH-002", tag: "ADVENTURE", seats: 7, trans: "AUTO", cc: "1.5L", power: "104HP", price: "550", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80" },
                { name: "HONDA HR-V", id: "HRV-003", tag: "PREMIUM", seats: 5, trans: "AUTO", cc: "1.8L", power: "139HP", price: "600", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" },
              ].map((car) => (
                <div key={car.name} className="bg-[#0a0a0a] text-white border-l-4 border-[#e10600] hover:border-[#fff200] transition-colors group cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[20%]" />

                    {/* Top tags */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      <div className="bg-[#e10600] text-white font-black italic text-[10px] tracking-wider uppercase px-2.5 py-1 -skew-x-12">
                        <span className="skew-x-12">{car.tag}</span>
                      </div>
                      <div className="font-mono text-[10px] tracking-[0.2em] bg-black/60 backdrop-blur-sm text-white px-2 py-1">
                        #{car.id}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-black italic text-2xl mb-3 tracking-tight">{car.name}</h3>

                    {/* Specs grid */}
                    <div className="grid grid-cols-4 gap-px bg-white/10 mb-5">
                      {[
                        { label: "SEATS", value: car.seats },
                        { label: "TRANS", value: car.trans },
                        { label: "ENG", value: car.cc },
                        { label: "PWR", value: car.power },
                      ].map((s) => (
                        <div key={s.label} className="bg-[#0a0a0a] p-2">
                          <div className="font-mono text-[8px] tracking-wider text-white/40">{s.label}</div>
                          <div className="font-black italic text-sm">{s.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-end justify-between pt-4 border-t border-dashed border-white/15">
                      <div>
                        <div className="font-mono text-[10px] tracking-[0.2em] text-[#fff200]">/ RATE</div>
                        <div className="font-black italic text-3xl">RP {car.price}K</div>
                        <div className="font-mono text-[10px] text-white/50 uppercase">/ 24H</div>
                      </div>
                      <button className="bg-[#fff200] text-[#0a0a0a] font-black italic text-xs tracking-wider uppercase px-4 py-2.5 -skew-x-12 hover:bg-white transition-colors">
                        <span className="skew-x-12 flex items-center gap-1">
                          BOOK <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust badges row */}
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#0a0a0a]/10 border-2 border-[#0a0a0a]">
              {[
                { icon: CheckCircle, t: "FLEET INSPECTED" },
                { icon: Tag, t: "ZERO HIDDEN FEES" },
                { icon: MapPin, t: "ISLAND COVERAGE" },
                { icon: Star, t: "RATED 4.9 / 5" },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="bg-white p-5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#e10600] flex items-center justify-center -skew-x-12">
                    <span className="skew-x-12">
                      <Icon className="w-4 h-4 text-white" />
                    </span>
                  </div>
                  <span className="font-black italic text-sm tracking-tight">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 6. DESTINATIONS — race routes ==================== */}
        <section id="routes" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
              <div>
                <div className="inline-flex items-center gap-3 mb-5">
                  <NumberPlate num="05" />
                  <span className="text-[#e10600] font-black italic text-xs tracking-[0.25em]">ROUTE MAP</span>
                  <CheckerStrip className="w-12" />
                </div>
                <h2 className="font-black italic text-5xl lg:text-6xl xl:text-7xl text-white leading-[0.95] tracking-[-0.03em]">
                  TOP<br />
                  <span className="text-[#e10600]">ROUTES.</span>
                </h2>
              </div>
              <a href="#all-routes" className="group inline-flex items-center gap-2 px-5 py-3 border-2 border-white/30 text-white font-black italic uppercase tracking-wider text-sm hover:bg-white hover:text-[#0a0a0a] transition-all -skew-x-12">
                <span className="skew-x-12 flex items-center gap-2">
                  ALL ROUTES <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { name: "UBUD", caption: "Mountain → rice valley", distance: "37 KM", time: "1H 15M", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80" },
                { name: "ULUWATU", caption: "Cliff coast track", distance: "24 KM", time: "45M", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=700&q=80" },
                { name: "SIDEMEN", caption: "Volcanic backroads", distance: "62 KM", time: "1H 50M", img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=700&q=80" },
                { name: "MUNDUK", caption: "Highland twisties", distance: "78 KM", time: "2H 20M", img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=700&q=80" },
                { name: "AMED", caption: "Coastal east", distance: "85 KM", time: "2H 30M", img: "https://images.unsplash.com/photo-1531259736519-9a17795bbcce?auto=format&fit=crop&w=700&q=80" },
                { name: "WEST BALI", caption: "National park drive", distance: "112 KM", time: "3H 15M", img: "https://images.unsplash.com/photo-1589817864531-ef00b149c23a?auto=format&fit=crop&w=700&q=80" },
              ].map((d, idx) => (
                <div key={d.name} className="group relative aspect-[4/3] overflow-hidden border-2 border-white/10 hover:border-[#fff200] transition-colors cursor-pointer">
                  <img src={d.img} alt={d.name} className="absolute inset-0 w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

                  {/* Top label */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <div className="font-mono text-[10px] tracking-[0.2em] text-[#fff200]">/ ROUTE_{String(idx + 1).padStart(2, "0")}</div>
                    <div className="font-mono text-[10px] tracking-[0.2em] text-white/80 bg-black/60 backdrop-blur-sm px-2 py-1">
                      {d.distance} · {d.time}
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h3 className="font-black italic text-3xl text-white tracking-tight">{d.name}</h3>
                      <p className="font-mono text-[11px] tracking-wider uppercase text-white/70">{d.caption}</p>
                    </div>
                    <div className="w-10 h-10 bg-[#e10600] flex items-center justify-center -skew-x-12 group-hover:bg-[#fff200] transition-colors">
                      <span className="skew-x-12">
                        <ArrowUpRight className="w-5 h-5 text-white group-hover:text-[#0a0a0a]" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 7. TESTIMONIALS — pit reports ==================== */}
        <section id="reviews" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#171717]">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 items-end mb-14">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 mb-5">
                  <NumberPlate num="06" />
                  <span className="text-[#e10600] font-black italic text-xs tracking-[0.25em]">PIT REPORTS</span>
                  <CheckerStrip className="w-12" />
                </div>
                <h2 className="font-black italic text-5xl lg:text-6xl xl:text-7xl text-white leading-[0.95] tracking-[-0.03em]">
                  DRIVERS<br />
                  <span className="text-[#e10600]">VOUCH.</span>
                </h2>
              </div>
              <div className="lg:col-span-5 lg:text-right">
                <div className="inline-flex items-center gap-4 bg-[#0a0a0a] border border-white/15 p-4">
                  <div className="w-12 h-12 bg-[#fff200] flex items-center justify-center -skew-x-12">
                    <span className="skew-x-12">
                      <Star className="w-6 h-6 fill-[#0a0a0a] text-[#0a0a0a]" />
                    </span>
                  </div>
                  <div>
                    <div className="font-black italic text-2xl text-white">4.9 / 5.0</div>
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">2K+ DRIVERS</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured big testimonial */}
            <div className="bg-[#0a0a0a] border-l-4 border-[#e10600] p-8 lg:p-12 mb-8 relative">
              <div className="absolute top-0 right-0 bg-[#e10600] text-white font-black italic text-xs tracking-wider px-3 py-1.5">
                FEATURED
              </div>
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#fff200] text-[#fff200]" />)}
                  </div>
                  <p className="font-black italic text-2xl lg:text-3xl text-white leading-[1.3] tracking-tight mb-8">
                    "TUNED FLEET, TIGHT TURNAROUND. PICKED UP AT THE AIRPORT IN UNDER A MINUTE. THIS IS HOW CAR RENTAL SHOULD WORK."
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <img src="https://i.pravatar.cc/100?img=1" alt="Sarah" className="w-14 h-14 object-cover ring-2 ring-[#e10600]" />
                    <div>
                      <div className="font-black italic text-white">SARAH MITCHELL</div>
                      <div className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">DRIVER #001 · SYDNEY · MAY 2026</div>
                    </div>
                  </div>
                </div>
                <div className="aspect-square overflow-hidden border-2 border-[#e10600]">
                  <img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=500&q=80" alt="Bali drive" className="w-full h-full object-cover grayscale-[30%]" />
                </div>
              </div>
            </div>

            {/* Smaller reviews */}
            <div className="grid sm:grid-cols-3 gap-px bg-white/10">
              {[
                { text: "Best car rental in Bali. Transparent pricing, real WhatsApp support.", name: "MARCUS CHEN", country: "SG", img: "https://i.pravatar.cc/100?img=3" },
                { text: "Free delivery to Ubud. Spotless car, perfect for jungle roads.", name: "EMMA LARSSON", country: "SE", img: "https://i.pravatar.cc/100?img=5" },
                { text: "Fast, professional, no BS. The way it should be.", name: "JAMES WILSON", country: "UK", img: "https://i.pravatar.cc/100?img=8" },
              ].map((r) => (
                <div key={r.name} className="bg-[#0a0a0a] p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#fff200] text-[#fff200]" />)}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-5">"{r.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-dashed border-white/10">
                    <img src={r.img} alt={r.name} className="w-9 h-9 object-cover" />
                    <div>
                      <div className="font-black italic text-sm text-white">{r.name}</div>
                      <div className="font-mono text-[10px] tracking-[0.2em] text-[#fff200]">/ {r.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 8. CTA — start engine ==================== */}
        <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#e10600] text-white overflow-hidden">
          {/* Diagonal stripes background */}
          <div className="absolute inset-0 opacity-15">
            <DiagonalStripes className="w-full h-full text-white" />
          </div>

          {/* Big number */}
          <div className="absolute -top-10 -right-10 font-black italic text-[400px] leading-none text-white/10 select-none pointer-events-none">
            09
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <Flag className="w-5 h-5 text-[#fff200]" />
                  <span className="font-black italic text-xs tracking-[0.25em] text-[#fff200]">FINAL LAP</span>
                  <CheckerStrip className="w-12" />
                </div>
                <h2 className="font-black italic text-6xl lg:text-7xl xl:text-9xl leading-[0.85] tracking-[-0.04em] mb-6">
                  READY<br />
                  TO <span className="bg-[#fff200] text-[#0a0a0a] px-3 -skew-x-12 inline-block">RIDE?</span>
                </h2>
                <p className="text-white/85 text-lg lg:text-xl max-w-md mb-8 font-medium">
                  Engine's running. Fleet's ready. Let's hit the road.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="#book" className="group inline-flex items-center gap-2 px-8 py-4 bg-[#0a0a0a] text-white font-black italic uppercase tracking-wider hover:bg-white hover:text-[#0a0a0a] transition-colors -skew-x-12">
                    <span className="skew-x-12 flex items-center gap-2">
                      START ENGINE <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                  <a href="#vehicles" className="inline-flex items-center px-8 py-4 bg-white text-[#e10600] font-black italic uppercase tracking-wider hover:bg-[#fff200] hover:text-[#0a0a0a] transition-colors -skew-x-12">
                    <span className="skew-x-12">VIEW FLEET</span>
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Tag, title: "BEST PRICE GUARANTEE", desc: "We match competitor pricing" },
                  { icon: Zap, title: "INSTANT BOOKING", desc: "Confirm in under 30 seconds" },
                  { icon: Activity, title: "LIVE FLEET STATUS", desc: "Real-time availability" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="bg-[#0a0a0a] border-l-4 border-[#fff200] p-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#fff200] flex items-center justify-center -skew-x-12 shrink-0">
                      <span className="skew-x-12">
                        <Icon className="w-6 h-6 text-[#0a0a0a]" />
                      </span>
                    </div>
                    <div>
                      <div className="font-black italic text-white tracking-tight">{title}</div>
                      <div className="font-mono text-[11px] tracking-wider uppercase text-white/60 mt-0.5">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 9. FOOTER — race team style ==================== */}
        <footer className="relative pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] border-t-4 border-[#e10600]">
          <CheckerStrip className="absolute top-0 left-0 right-0" />

          <div className="max-w-7xl mx-auto pt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 pb-12 border-b border-white/10">
              <div className="col-span-2 md:col-span-3 lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-11 h-11 bg-[#e10600] flex items-center justify-center -skew-x-12">
                    <span className="skew-x-12">
                      <Car className="w-5 h-5 text-white" />
                    </span>
                  </div>
                  <div>
                    <div className="font-black italic text-lg text-white">AUTO ULTIMATE</div>
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#e10600]">/ BALI · DRIVE / V.09</div>
                  </div>
                </div>
                <p className="text-white/60 mb-5 leading-relaxed max-w-xs">
                  Built for drivers who actually drive. Tuned fleet, real-time availability, island-wide pickup.
                </p>
                <div className="flex gap-2">
                  {[
                    { Icon: Globe, label: "Website" },
                    { Icon: AtSign, label: "Social" },
                    { Icon: MessageCircle, label: "WhatsApp" },
                  ].map(({ Icon, label }) => (
                    <a key={label} href="#social" aria-label={label} className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#fff200] hover:border-[#fff200] transition-all">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {[
                { head: "TEAM", items: ["About us", "Careers", "Press", "Story"] },
                { head: "SERVICES", items: ["Car rental", "Chauffeur", "Airport", "Long-term"] },
              ].map((col) => (
                <div key={col.head}>
                  <h4 className="font-black italic text-xs tracking-[0.25em] uppercase text-[#fff200] mb-5">/ {col.head}</h4>
                  <ul className="space-y-3">
                    {col.items.map((i) => <li key={i}><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{i}</a></li>)}
                  </ul>
                </div>
              ))}

              <div>
                <h4 className="font-black italic text-xs tracking-[0.25em] uppercase text-[#fff200] mb-5">/ COMMS</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-white/70"><Phone className="w-3.5 h-3.5 text-[#e10600]" /> +62 812 3456 7890</li>
                  <li className="flex items-center gap-2 text-sm text-white/70"><Mail className="w-3.5 h-3.5 text-[#e10600]" /> hello@autoultimate.id</li>
                  <li className="flex items-start gap-2 text-sm text-white/70"><MapPin className="w-3.5 h-3.5 text-[#e10600] shrink-0 mt-0.5" /> Ngurah Rai Airport, Bali</li>
                </ul>
              </div>

              <div className="col-span-2 md:col-span-3 lg:col-span-1">
                <h4 className="font-black italic text-xs tracking-[0.25em] uppercase text-[#fff200] mb-2">/ NEWSLETTER</h4>
                <p className="font-mono text-[10px] tracking-wider uppercase text-white/50 mb-3">Race day deals, no spam</p>
                <input type="email" placeholder="your@email.com" className="w-full px-3 py-2.5 bg-white/5 border border-white/10 text-sm outline-none focus:border-[#fff200] mb-2 text-white placeholder:text-white/40" />
                <button className="w-full py-2.5 bg-[#e10600] text-white text-sm font-black italic tracking-wider uppercase hover:bg-[#fff200] hover:text-[#0a0a0a] transition-colors -skew-x-12">
                  <span className="skew-x-12">SUBSCRIBE</span>
                </button>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] tracking-[0.2em] uppercase">
              <span className="text-white/50">© {new Date().getFullYear()} AUTO ULTIMATE / ALL RIGHTS RESERVED</span>
              <span className="flex items-center gap-3 text-white/50">
                <span className="flex items-center gap-1.5">
                  <Timer className="w-3 h-3" /> SINCE 2013
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3 text-[#00ff88]" /> ALL SYSTEMS LIVE
                </span>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
