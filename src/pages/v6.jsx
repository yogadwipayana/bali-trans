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
  Quote,
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
  Sparkles,
  Zap,
  Activity,
  Plus,
} from "lucide-react";

const navLinks = ["Vehicles", "Deals", "Destinations", "Services", "Reviews", "About", "Contact"];

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

const GlowOrb = ({ className }) => (
  <div className={`absolute rounded-full blur-[100px] ${className}`} />
);

export default function V6() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useFullScreenRoot();

  return (
    <>
      <Helmet>
        <title>Auto Ultimate · Premium Bali Drive</title>
        <meta name="description" content="Modern Bali car rental for the new generation of travelers." />
      </Helmet>

      <div className="min-h-screen bg-[#06051a] font-sans text-white antialiased relative overflow-x-hidden">
        {/* Dot grid background */}
        <div
          className="fixed inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Ambient glow orbs */}
        <GlowOrb className="top-0 left-1/4 w-[500px] h-[500px] bg-[#3a86ff]/20" />
        <GlowOrb className="top-1/3 right-0 w-[600px] h-[600px] bg-[#ff006e]/15" />
        <GlowOrb className="top-2/3 left-0 w-[400px] h-[400px] bg-[#00d4ff]/15" />
        <GlowOrb className="bottom-0 right-1/4 w-[500px] h-[500px] bg-[#7c3aed]/15" />

        {/* ==================== 1. NAVBAR — glass pill ==================== */}
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl">
          <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-4 lg:px-6">
            <div className="flex items-center justify-between h-14 lg:h-16">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff] via-[#3a86ff] to-[#ff006e] rounded-xl blur-sm opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff] via-[#3a86ff] to-[#ff006e] rounded-xl flex items-center justify-center">
                    <Car className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="leading-tight">
                  <div className="font-semibold text-white text-base tracking-tight">Auto Ultimate</div>
                  <div className="text-[9px] tracking-[0.2em] uppercase text-white/50 -mt-0.5">v.06 / bali</div>
                </div>
              </div>

              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase()}`}
                    className="text-[13px] font-medium text-white/70 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-all"
                  >
                    {l}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <a href="#signin" className="hidden sm:flex items-center gap-1.5 text-[13px] font-medium text-white/70 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-all">
                  <User className="w-3.5 h-3.5" /> Sign in
                </a>
                <a href="#book" className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#06051a] text-[13px] font-semibold rounded-full hover:bg-white/90 transition-all">
                  Book now
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button className="lg:hidden p-1.5 text-white" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
          {mobileOpen && (
            <div className="lg:hidden mt-2 bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-5 space-y-3">
              {navLinks.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm font-medium text-white/80" onClick={() => setMobileOpen(false)}>{l}</a>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
                <a href="#signin" className="flex items-center gap-2 text-sm font-medium text-white/80"><User className="w-4 h-4" /> Sign in</a>
                <a href="#book" className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white text-[#06051a] text-sm font-semibold rounded-full">
                  Book now <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </header>

        {/* ==================== 2. HERO — dark glow + glass ==================== */}
        <section className="relative pt-32 lg:pt-40 pb-32">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                {/* Status badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-full mb-8">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inset-0 rounded-full bg-[#00ff88] animate-ping opacity-75" />
                    <span className="relative rounded-full w-2 h-2 bg-[#00ff88]" />
                  </span>
                  <span className="text-[11px] font-medium tracking-wider uppercase text-white/80">100+ vehicles available now</span>
                </div>

                <h1 className="text-white text-6xl sm:text-7xl lg:text-8xl xl:text-[120px] font-bold leading-[0.95] tracking-[-0.04em] mb-8">
                  Drive Bali.<br />
                  <span className="bg-gradient-to-r from-[#00d4ff] via-[#3a86ff] to-[#ff006e] bg-clip-text text-transparent">
                    Make it
                  </span>
                  <br />
                  unforgettable.
                </h1>

                <p className="text-white/60 text-lg lg:text-xl max-w-xl mb-10 leading-relaxed">
                  A new way to rent. Premium fleet, real-time availability, instant confirmation. <span className="text-white">Built for the modern traveler.</span>
                </p>

                <div className="flex flex-wrap gap-3 mb-12">
                  <a href="#book" className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#06051a] font-semibold rounded-full overflow-hidden hover:scale-[1.02] transition-transform">
                    <span className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] via-[#3a86ff] to-[#ff006e] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2 group-hover:text-white transition-colors">
                      Book a ride <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                  <a href="#vehicles" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.04] backdrop-blur-md border border-white/10 text-white font-semibold rounded-full hover:bg-white/[0.08] transition-all">
                    Browse fleet
                  </a>
                </div>

                {/* Trust strip with avatars */}
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <img key={i} src={`https://i.pravatar.cc/80?img=${i + 30}`} alt="" className="w-8 h-8 rounded-full border-2 border-[#06051a] object-cover" />
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-[#06051a] bg-white/10 backdrop-blur flex items-center justify-center text-[10px] font-bold">
                        <Plus className="w-3 h-3" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">10,000+ travelers</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#ffd60a] text-[#ffd60a]" />)}
                        <span className="text-[11px] text-white/60 ml-1">4.9/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: glass UI mockup */}
              <div className="lg:col-span-5 relative">
                <div className="relative max-w-md mx-auto">
                  {/* Big gradient glow behind */}
                  <div className="absolute -inset-8 bg-gradient-to-br from-[#3a86ff]/40 via-[#ff006e]/30 to-[#00d4ff]/30 blur-3xl rounded-full" />

                  {/* Main card */}
                  <div className="relative bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-2xl">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
                      <img src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=600&q=80" alt="Featured car" className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-full">
                        <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full" />
                        <span className="text-[10px] font-medium tracking-wider uppercase">Available</span>
                      </div>
                    </div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-1">Featured</div>
                        <div className="font-semibold text-lg">Toyota Fortuner</div>
                        <div className="flex items-center gap-3 text-xs text-white/60 mt-1.5">
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 7</span>
                          <span className="flex items-center gap-1"><Cog className="w-3 h-3" /> Auto</span>
                          <span className="flex items-center gap-1"><Gauge className="w-3 h-3" /> 2.8L</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#ff006e] bg-clip-text text-transparent">Rp 850K</div>
                        <div className="text-xs text-white/50">/day</div>
                      </div>
                    </div>
                    <button className="w-full py-2.5 bg-white text-[#06051a] text-sm font-semibold rounded-full hover:bg-white/90 transition-colors">
                      Reserve →
                    </button>
                  </div>

                  {/* Small floating cards */}
                  <div className="absolute -top-4 -right-2 bg-white/[0.05] backdrop-blur-2xl border border-white/10 rounded-2xl px-4 py-3 shadow-xl rotate-[8deg]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#00d4ff] to-[#3a86ff] rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-[11px] text-white/60">Instant booking</div>
                        <div className="text-xs font-semibold">&lt; 30 sec</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -left-2 bg-white/[0.05] backdrop-blur-2xl border border-white/10 rounded-2xl px-4 py-3 shadow-xl -rotate-[6deg]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#ff006e] to-[#7c3aed] rounded-lg flex items-center justify-center">
                        <Activity className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-[11px] text-white/60">Avg rating</div>
                        <div className="text-xs font-semibold">4.9 / 5.0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature stats grid */}
            <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { icon: Wallet, label: "No hidden fees", desc: "100% transparent" },
                { icon: Truck, label: "Free delivery", desc: "Anywhere in Bali" },
                { icon: Clock, label: "24/7 support", desc: "Real humans" },
                { icon: Shield, label: "Full insurance", desc: "Drive easy" },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/[0.06] hover:border-white/20 transition-all">
                  <Icon className="w-5 h-5 text-[#00d4ff] mb-3" />
                  <div className="text-sm font-semibold mb-0.5">{label}</div>
                  <div className="text-xs text-white/50">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 3. BOOKING — glass form ==================== */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-6xl mx-auto bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/80">Find your ride</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              {[
                { label: "Pickup", icon: MapPin, type: "select", options: ["Ngurah Rai Airport", "Ubud", "Seminyak", "Kuta"] },
                { label: "Pick-up date", icon: Calendar, type: "datetime-local", value: "2026-05-10T10:00" },
                { label: "Return date", icon: Calendar, type: "datetime-local", value: "2026-05-15T10:00" },
                { label: "Vehicle", icon: Car, type: "select", options: ["All", "SUV", "MPV", "Sedan"] },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-white/50 mb-2">{f.label}</label>
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl focus-within:border-[#00d4ff]/50 transition-colors">
                    <f.icon className="w-4 h-4 text-[#00d4ff] shrink-0" />
                    {f.type === "select" ? (
                      <select className="bg-transparent text-sm font-medium w-full outline-none cursor-pointer text-white [&>option]:text-[#06051a]">{f.options.map((o) => <option key={o}>{o}</option>)}</select>
                    ) : (
                      <input type={f.type} defaultValue={f.value} className="bg-transparent text-sm font-medium w-full outline-none text-white" />
                    )}
                  </div>
                </div>
              ))}
              <button className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#06051a] font-semibold rounded-xl overflow-hidden hover:scale-[1.02] transition-transform">
                <span className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] via-[#3a86ff] to-[#ff006e] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2 group-hover:text-white transition-colors">
                  <Search className="w-4 h-4" /> Search
                </span>
              </button>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-white/60">
              {[
                { icon: CheckCircle, t: "Free cancellation" },
                { icon: Gauge, t: "Unlimited mileage" },
                { icon: Shield, t: "Full insurance" },
                { icon: Clock, t: "Flexible rentals" },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-[#00d4ff]" /> {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 4. SPECIAL OFFERS — glass cards ==================== */}
        <section id="deals" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-8 h-px bg-gradient-to-r from-[#00d4ff] to-transparent" />
                  <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#00d4ff]">Live deals</span>
                </div>
                <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tight text-white">
                  Smart pricing,<br />
                  <span className="bg-gradient-to-r from-[#00d4ff] via-[#3a86ff] to-[#ff006e] bg-clip-text text-transparent">zero surprises.</span>
                </h2>
              </div>
              <a href="#all-deals" className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-full text-sm font-medium hover:bg-white/[0.08] transition-all">
                View all deals
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { title: "Early Bird", desc: "Book 30 days ahead", off: "15", glow: "from-[#00d4ff]/30 to-[#3a86ff]/30", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db9?auto=format&fit=crop&w=400&q=80" },
                { title: "Weekend Escape", desc: "Friday → Monday", off: "10", glow: "from-[#7c3aed]/30 to-[#ff006e]/30", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80" },
                { title: "Long Stay", desc: "7+ days, less per day", off: "20", glow: "from-[#ff006e]/30 to-[#ffd60a]/30", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80" },
                { title: "Family", desc: "Spacious for everyone", off: "12", glow: "from-[#00ff88]/30 to-[#00d4ff]/30", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80" },
              ].map((deal) => (
                <div key={deal.title} className="group relative bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-1">
                  <div className={`absolute -inset-px bg-gradient-to-br ${deal.glow} blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative p-5">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
                      <img src={deal.img} alt={deal.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-full">
                        <span className="text-xs font-bold bg-gradient-to-r from-[#00d4ff] to-[#ff006e] bg-clip-text text-transparent">{deal.off}% OFF</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{deal.title}</h3>
                        <p className="text-xs text-white/50 mt-0.5">{deal.desc}</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:rotate-12 transition-all" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. FEATURED FLEET — premium glass ==================== */}
        <section id="vehicles" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-8 h-px bg-gradient-to-r from-[#ff006e] to-transparent" />
                  <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#ff006e]">The fleet</span>
                </div>
                <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tight">
                  Built for<br />
                  <span className="bg-gradient-to-r from-[#ff006e] via-[#7c3aed] to-[#00d4ff] bg-clip-text text-transparent">every journey.</span>
                </h2>
              </div>
              <a href="#all-vehicles" className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-full text-sm font-medium hover:bg-white/[0.08] transition-all">
                View all vehicles
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Toyota Avanza", tag: "FAMILY", seats: 7, trans: "Auto", cc: "1.3L", price: "450", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=600&q=80" },
                { name: "Toyota Rush", tag: "ADVENTURE", seats: 7, trans: "Auto", cc: "1.5L", price: "550", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80" },
                { name: "Honda HR-V", tag: "PREMIUM", seats: 5, trans: "Auto", cc: "1.8L", price: "600", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" },
              ].map((car) => (
                <div key={car.name} className="group relative bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all">
                  <div className="absolute -inset-px bg-gradient-to-br from-[#00d4ff]/20 to-[#ff006e]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-full">
                      <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full" />
                      <span className="text-[10px] font-semibold tracking-wider uppercase">{car.tag}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-2xl">{car.name}</h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-white/60 mb-5">
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {car.seats}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><Cog className="w-3.5 h-3.5" /> {car.trans}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><Gauge className="w-3.5 h-3.5" /> {car.cc}</span>
                      </div>
                      <div className="flex items-end justify-between pt-5 border-t border-white/10">
                        <div>
                          <div className="text-[10px] text-white/50 uppercase tracking-wider mb-0.5">From</div>
                          <div className="text-3xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#ff006e] bg-clip-text text-transparent">
                            Rp {car.price}K
                          </div>
                          <div className="text-xs text-white/50">/day</div>
                        </div>
                        <button className="w-11 h-11 bg-white text-[#06051a] rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                          <ArrowUpRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust strip */}
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-white/10">
              {[
                { icon: CheckCircle, t: "Well-maintained vehicles" },
                { icon: Tag, t: "Transparent pricing" },
                { icon: MapPin, t: "Island-wide support" },
                { icon: Star, t: "Trusted by 10,000+" },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#00d4ff]" />
                  </div>
                  <span className="text-sm text-white/80">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 6. DESTINATIONS — photo glass overlay ==================== */}
        <section id="destinations" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-8 h-px bg-gradient-to-r from-[#7c3aed] to-transparent" />
                  <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#7c3aed]">Destinations</span>
                </div>
                <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tight">
                  Where to<br />
                  <span className="bg-gradient-to-r from-[#7c3aed] via-[#3a86ff] to-[#00d4ff] bg-clip-text text-transparent">go next.</span>
                </h2>
              </div>
              <a href="#all-destinations" className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-full text-sm font-medium hover:bg-white/[0.08] transition-all">
                Explore all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-12 gap-4 lg:gap-5">
              {[
                { name: "Ubud", caption: "Rice terraces & art", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80", span: "col-span-12 lg:col-span-7", aspect: "aspect-[16/10]" },
                { name: "Seminyak", caption: "Beach clubs", img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80", span: "col-span-12 lg:col-span-5", aspect: "aspect-[4/5] lg:aspect-[16/10]" },
                { name: "Uluwatu", caption: "Cliff temples", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80", span: "col-span-6 lg:col-span-4", aspect: "aspect-square" },
                { name: "Nusa Penida", caption: "Crystal waters", img: "https://images.unsplash.com/photo-1589817864531-ef00b149c23a?auto=format&fit=crop&w=600&q=80", span: "col-span-6 lg:col-span-4", aspect: "aspect-square" },
                { name: "Canggu", caption: "Surf & cafe", img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=600&q=80", span: "col-span-12 lg:col-span-4", aspect: "aspect-square" },
              ].map((d) => (
                <div key={d.name} className={`group relative ${d.span} ${d.aspect} rounded-3xl overflow-hidden cursor-pointer border border-white/10`}>
                  <img src={d.img} alt={d.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06051a] via-[#06051a]/40 to-transparent" />

                  {/* Glass info card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/[0.08] backdrop-blur-2xl border border-white/15 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{d.name}</h3>
                      <p className="text-xs text-white/70">{d.caption}</p>
                    </div>
                    <div className="w-10 h-10 bg-white text-[#06051a] rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 7. TESTIMONIALS — glass quotes ==================== */}
        <section id="reviews" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-8 h-px bg-gradient-to-r from-[#00ff88] to-transparent" />
                  <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#00ff88]">Reviews</span>
                </div>
                <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tight">
                  Trusted by<br />
                  <span className="bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#3a86ff] bg-clip-text text-transparent">10,000+ travelers.</span>
                </h2>
              </div>
              <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-5 max-w-xs">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#ffd60a] text-[#ffd60a]" />)}
                </div>
                <div className="text-2xl font-bold mb-1">4.9 / 5.0</div>
                <div className="text-xs text-white/60">Based on 2,000+ reviews from real customers</div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
              {/* Featured large */}
              <div className="lg:col-span-1 relative bg-gradient-to-br from-[#3a86ff]/20 via-[#7c3aed]/20 to-[#ff006e]/20 backdrop-blur-md border border-white/15 rounded-3xl p-8 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#ff006e]/30 rounded-full blur-3xl" />
                <div className="relative">
                  <Quote className="w-10 h-10 text-white/80 mb-5" />
                  <p className="text-xl leading-relaxed mb-8">
                    "Cleanest car, smoothest pickup. The app made everything seamless — booked in 30 seconds, picked up at the airport. Will absolutely book again."
                  </p>
                  <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                    <img src="https://i.pravatar.cc/100?img=1" alt="Sarah" className="w-12 h-12 rounded-full object-cover ring-2 ring-white/30" />
                    <div>
                      <div className="font-semibold">Sarah Mitchell</div>
                      <div className="text-xs text-white/60">Sydney, Australia · Verified</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smaller reviews */}
              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
                {[
                  { text: "Best car rental in Bali. Transparent pricing, no hidden fees, and the 24/7 WhatsApp support is real.", name: "Marcus Chen", country: "Singapore", img: "https://i.pravatar.cc/100?img=3" },
                  { text: "Free delivery to Ubud was a huge plus. Kids loved the spacious ride.", name: "Emma Larsson", country: "Sweden", img: "https://i.pravatar.cc/100?img=5" },
                  { text: "Super professional. The car was at our villa exactly on time. Highly recommended.", name: "James Wilson", country: "United Kingdom", img: "https://i.pravatar.cc/100?img=8" },
                  { text: "App-first experience. Booked from my phone in seconds. Perfect for digital nomads.", name: "Aisha Rahman", country: "Malaysia", img: "https://i.pravatar.cc/100?img=9" },
                ].map((r) => (
                  <div key={r.name} className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#ffd60a] text-[#ffd60a]" />)}
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed mb-5">"{r.text}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <img src={r.img} alt={r.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-sm">{r.name}</div>
                        <div className="text-xs text-white/50">{r.country}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 8. CTA — gradient glow ==================== */}
        <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto relative">
            <div className="relative bg-gradient-to-br from-[#3a86ff]/10 via-[#7c3aed]/10 to-[#ff006e]/10 backdrop-blur-md border border-white/10 rounded-[40px] p-10 lg:p-16 overflow-hidden">
              {/* Glow blobs inside */}
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#3a86ff]/40 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#ff006e]/40 rounded-full blur-3xl" />

              <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.06] backdrop-blur-md border border-white/15 rounded-full mb-6">
                    <Sparkles className="w-3.5 h-3.5 text-[#00d4ff]" />
                    <span className="text-[11px] font-semibold tracking-wider uppercase">Start your journey</span>
                  </div>
                  <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] mb-6">
                    Ready to<br />
                    explore <span className="bg-gradient-to-r from-[#00d4ff] via-[#3a86ff] to-[#ff006e] bg-clip-text text-transparent">Bali?</span>
                  </h2>
                  <p className="text-white/70 text-lg max-w-md mb-8">
                    Your perfect ride is one tap away. Book in seconds, drive in minutes.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="#book" className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-[#06051a] font-semibold rounded-full overflow-hidden hover:scale-[1.02] transition-transform">
                      <span className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] via-[#3a86ff] to-[#ff006e] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="relative flex items-center gap-2 group-hover:text-white transition-colors">
                        Book now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </a>
                    <a href="#vehicles" className="inline-flex items-center px-8 py-4 bg-white/[0.06] backdrop-blur-md border border-white/15 text-white font-semibold rounded-full hover:bg-white/[0.10] transition-all">
                      View all vehicles
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: Tag, title: "Best price guarantee", desc: "We match competitor pricing" },
                    { icon: Truck, title: "Free delivery", desc: "Anywhere across Bali" },
                    { icon: Clock, title: "24/7 local support", desc: "Real humans, anytime you need" },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] to-[#3a86ff] rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">{title}</div>
                        <div className="text-sm text-white/60 mt-0.5">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 9. FOOTER — glass dark ==================== */}
        <footer className="relative pt-20 pb-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 pb-12 border-b border-white/10">
              <div className="col-span-2 md:col-span-3 lg:col-span-2">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff] via-[#3a86ff] to-[#ff006e] rounded-xl blur-sm opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff] via-[#3a86ff] to-[#ff006e] rounded-xl flex items-center justify-center">
                      <Car className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Auto Ultimate</div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-white/50">v.06 / bali</div>
                  </div>
                </div>
                <p className="text-sm text-white/60 mb-5 leading-relaxed max-w-xs">
                  The next generation of car rental. Built for the modern traveler in Bali.
                </p>
                <div className="flex gap-2">
                  {[
                    { Icon: Globe, label: "Website" },
                    { Icon: AtSign, label: "Social" },
                    { Icon: MessageCircle, label: "WhatsApp" },
                  ].map(({ Icon, label }) => (
                    <a key={label} href="#social" aria-label={label} className="w-10 h-10 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {[
                { head: "Company", items: ["About us", "Careers", "Press", "Blog"] },
                { head: "Services", items: ["Car rental", "Chauffeur", "Airport", "Long-term"] },
              ].map((col) => (
                <div key={col.head}>
                  <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/50 mb-5">{col.head}</h4>
                  <ul className="space-y-3">
                    {col.items.map((i) => <li key={i}><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{i}</a></li>)}
                  </ul>
                </div>
              ))}

              <div>
                <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/50 mb-5">Contact</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-white/70"><Phone className="w-3.5 h-3.5 text-[#00d4ff]" /> +62 812 3456 7890</li>
                  <li className="flex items-center gap-2 text-sm text-white/70"><Mail className="w-3.5 h-3.5 text-[#00d4ff]" /> hello@autoultimate.id</li>
                  <li className="flex items-start gap-2 text-sm text-white/70"><MapPin className="w-3.5 h-3.5 text-[#00d4ff] shrink-0 mt-0.5" /> Ngurah Rai Airport, Bali</li>
                </ul>
              </div>

              <div className="col-span-2 md:col-span-3 lg:col-span-1">
                <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/50 mb-2">Newsletter</h4>
                <p className="text-xs text-white/60 mb-3">Drops & updates, no spam</p>
                <input type="email" placeholder="your@email.com" className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-full text-sm outline-none focus:border-[#00d4ff]/50 mb-2 text-white placeholder:text-white/30" />
                <button className="group relative w-full py-2.5 bg-white text-[#06051a] text-sm font-semibold rounded-full overflow-hidden hover:scale-[1.02] transition-transform">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] via-[#3a86ff] to-[#ff006e] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative group-hover:text-white transition-colors">Subscribe</span>
                </button>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-white/50">© {new Date().getFullYear()} Auto Ultimate. All systems operational.</span>
              <span className="flex items-center gap-2 text-xs text-white/50">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full bg-[#00ff88] animate-ping opacity-75" />
                  <span className="relative rounded-full w-1.5 h-1.5 bg-[#00ff88]" />
                </span>
                Live · Bali, Indonesia
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
