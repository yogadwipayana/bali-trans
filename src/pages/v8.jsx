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
  Crown,
  Award,
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

// SVG ornaments inspired by Balinese motifs
const SunRays = ({ className = "", color = "#b8860b" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none">
    <circle cx="50" cy="50" r="14" fill={color} opacity="0.9" />
    <circle cx="50" cy="50" r="22" stroke={color} strokeWidth="1.5" opacity="0.5" fill="none" />
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const x1 = 50 + Math.cos(angle) * 28;
      const y1 = 50 + Math.sin(angle) * 28;
      const x2 = 50 + Math.cos(angle) * 42;
      const y2 = 50 + Math.sin(angle) * 42;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" strokeLinecap="round" />;
    })}
  </svg>
);

const Lotus = ({ className = "", color = "#b8860b" }) => (
  <svg viewBox="0 0 100 60" className={className} fill="none">
    <path d="M50 50 Q 30 20, 50 5 Q 70 20, 50 50 Z" fill={color} opacity="0.4" />
    <path d="M50 50 Q 15 30, 15 50 Q 30 35, 50 50 Z" fill={color} opacity="0.6" />
    <path d="M50 50 Q 85 30, 85 50 Q 70 35, 50 50 Z" fill={color} opacity="0.6" />
    <path d="M50 50 Q 5 50, 5 55 Q 50 55, 50 50 Z" fill={color} opacity="0.8" />
    <path d="M50 50 Q 95 50, 95 55 Q 50 55, 50 50 Z" fill={color} opacity="0.8" />
    <circle cx="50" cy="50" r="3" fill={color} />
  </svg>
);

const OrnamentDivider = ({ color = "#b8860b" }) => (
  <div className="flex items-center justify-center gap-3 py-2">
    <div className="h-px bg-current opacity-30 flex-1" style={{ color }} />
    <SunRays className="w-6 h-6 shrink-0" color={color} />
    <div className="h-px bg-current opacity-30 flex-1" style={{ color }} />
  </div>
);

const HeritageBadge = ({ children, className = "" }) => (
  <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#f7f1e3] border border-[#b8860b]/40 rounded-full ${className}`}>
    <SunRays className="w-3.5 h-3.5 shrink-0" color="#b8860b" />
    <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8e2433]">{children}</span>
  </div>
);

export default function V8() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useFullScreenRoot();

  return (
    <>
      <Helmet>
        <title>Auto Ultimate · Heritage Bali Drive</title>
        <meta name="description" content="An authentic, locally-rooted car rental experience in Bali. Heritage. Hospitality. Trust." />
      </Helmet>

      <div className="min-h-screen bg-[#f7f1e3] font-sans text-[#2a1810] antialiased relative">
        {/* Subtle ornamental background */}
        <div
          className="fixed inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #b8860b 0, transparent 50%), radial-gradient(circle at 75% 75%, #8e2433 0, transparent 50%)",
            backgroundSize: "300px 300px",
          }}
        />

        {/* ==================== 1. NAVBAR — heritage formal ==================== */}
        <header className="sticky top-0 z-50 bg-[#f7f1e3]/95 backdrop-blur-sm border-b-2 border-[#b8860b]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 bg-[#8e2433] rounded-xl flex items-center justify-center border-2 border-[#b8860b]/40">
                  <Car className="w-5 h-5 text-[#d4a017]" />
                  <SunRays className="absolute -top-1.5 -right-1.5 w-5 h-5" color="#b8860b" />
                </div>
                <div className="leading-tight">
                  <div className="font-serif text-[#2a1810] text-lg tracking-tight">Auto Ultimate</div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#8e2433] font-semibold">— Heritage Bali —</div>
                </div>
              </div>

              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase()}`}
                    className="text-[13px] font-medium text-[#2a1810]/80 hover:text-[#8e2433] transition-colors relative group"
                  >
                    {l}
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#b8860b] group-hover:w-full transition-all" />
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                <a href="#signin" className="hidden sm:flex items-center gap-1.5 text-[13px] font-medium text-[#2a1810]/80 hover:text-[#8e2433]">
                  <User className="w-3.5 h-3.5" /> Sign in
                </a>
                <a href="#book" className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#8e2433] text-[#f7f1e3] text-[13px] font-semibold rounded-md hover:bg-[#6e1c27] transition-colors border border-[#b8860b]/30">
                  Reserve <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button className="lg:hidden p-1.5 text-[#2a1810]" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
          {mobileOpen && (
            <div className="lg:hidden border-t-2 border-[#b8860b]/20 bg-[#f7f1e3] px-4 py-5 space-y-3">
              {navLinks.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm font-medium text-[#2a1810]" onClick={() => setMobileOpen(false)}>{l}</a>
              ))}
              <div className="pt-3 border-t border-[#b8860b]/20 flex flex-col gap-3">
                <a href="#signin" className="flex items-center gap-2 text-sm font-medium"><User className="w-4 h-4" /> Sign in</a>
                <a href="#book" className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#8e2433] text-[#f7f1e3] text-sm font-semibold rounded-md">
                  Reserve <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </header>

        {/* ==================== 2. HERO — heritage rich ==================== */}
        <section className="relative pt-12 lg:pt-20 pb-32 overflow-hidden">
          {/* Decorative ornaments */}
          <SunRays className="absolute top-32 left-10 w-16 h-16 opacity-30" color="#b8860b" />
          <Lotus className="absolute bottom-24 right-10 w-24 h-14 opacity-25" color="#8e2433" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <HeritageBadge className="mb-8">Authentic · Local · Trusted</HeritageBadge>

                <h1 className="font-serif text-[#2a1810] text-6xl sm:text-7xl lg:text-8xl xl:text-[110px] font-medium leading-[0.95] tracking-tight mb-2">
                  Drive Bali.<br />
                  <span className="italic font-light text-[#8e2433]">Make it</span>
                  <br />
                  unforgettable.
                </h1>

                {/* Decorative line under headline */}
                <div className="flex items-center gap-3 mt-6 mb-8">
                  <div className="h-0.5 w-12 bg-[#b8860b]" />
                  <SunRays className="w-5 h-5" color="#b8860b" />
                  <div className="h-0.5 w-24 bg-[#b8860b]/40" />
                </div>

                <p className="font-serif italic text-[#2a1810]/75 text-xl lg:text-2xl mt-6 mb-10 max-w-xl leading-relaxed">
                  "We are a family-run rental house, born and raised on this island. Our cars carry you. Our hospitality stays with you."
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <a href="#book" className="group inline-flex items-center gap-2 px-7 py-4 bg-[#8e2433] text-[#f7f1e3] font-semibold rounded-md hover:bg-[#6e1c27] transition-colors shadow-lg shadow-[#8e2433]/20 border border-[#b8860b]/40">
                    Reserve a journey <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#vehicles" className="inline-flex items-center gap-2 px-7 py-4 border-2 border-[#2a1810] text-[#2a1810] font-semibold rounded-md hover:bg-[#2a1810] hover:text-[#f7f1e3] transition-colors">
                    Browse fleet
                  </a>
                </div>

                {/* Heritage features in elegant table */}
                <div className="grid grid-cols-2 gap-6 max-w-xl pt-8 border-t border-[#b8860b]/30">
                  {[
                    { icon: Wallet, label: "Honest pricing", desc: "No hidden fees" },
                    { icon: Truck, label: "Free delivery", desc: "Anywhere in Bali" },
                    { icon: Clock, label: "24/7 hospitality", desc: "Local team" },
                    { icon: Shield, label: "Full insurance", desc: "Comprehensive" },
                  ].map(({ icon: Icon, label, desc }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#8e2433]/10 border border-[#8e2433]/20 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#8e2433]" />
                      </div>
                      <div>
                        <div className="font-serif text-[#2a1810] text-base">{label}</div>
                        <div className="text-xs text-[#2a1810]/55 italic font-serif">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: photo with arched frame */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] max-w-md mx-auto">
                  {/* Outer ornament frame */}
                  <div className="absolute inset-0 bg-[#8e2433]/10 rounded-t-full rounded-b-2xl" />
                  <div className="absolute inset-2 border-2 border-[#b8860b]/40 rounded-t-full rounded-b-2xl" />

                  {/* Photo */}
                  <div className="absolute inset-4 overflow-hidden rounded-t-full rounded-b-xl shadow-2xl shadow-[#2a1810]/20">
                    <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80" alt="Bali heritage" className="w-full h-full object-cover" style={{ filter: "sepia(15%) saturate(1.1)" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2a1810]/30 to-transparent" />
                  </div>

                  {/* Top ornament crown */}
                  <SunRays className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-12" color="#b8860b" />

                  {/* Side lotus */}
                  <Lotus className="absolute top-1/3 -left-12 w-20 h-12 -rotate-90 opacity-70" color="#b8860b" />

                  {/* Award seal — bottom corner */}
                  <div className="absolute -bottom-6 -right-4 w-32 h-32 bg-[#f7f1e3] rounded-full flex flex-col items-center justify-center text-center border-4 border-[#8e2433] shadow-xl rotate-[-8deg]">
                    <Award className="w-6 h-6 text-[#8e2433] mb-1" />
                    <div className="text-[9px] tracking-[0.2em] uppercase text-[#8e2433] font-bold">Family Owned</div>
                    <div className="font-serif text-2xl text-[#8e2433] leading-none mt-1">Est.</div>
                    <div className="font-serif text-2xl text-[#8e2433] leading-none">2013</div>
                  </div>

                  {/* Trust card — bottom left */}
                  <div className="absolute -bottom-3 -left-2 bg-[#f7f1e3] border-2 border-[#b8860b]/30 rounded-lg px-4 py-3 shadow-xl flex items-center gap-3">
                    <div className="flex -space-x-1.5">
                      {[1, 2, 3].map((i) => (
                        <img key={i} src={`https://i.pravatar.cc/100?img=${i + 50}`} alt="" className="w-7 h-7 rounded-full border-2 border-[#f7f1e3] object-cover" />
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-[#b8860b] text-[#b8860b]" />)}
                      </div>
                      <div className="text-xs text-[#2a1810] font-medium">10,000+ guests</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ornament strip at bottom of section */}
          <div className="max-w-2xl mx-auto px-4 mt-16">
            <OrnamentDivider color="#b8860b" />
          </div>
        </section>

        {/* ==================== 3. BOOKING — heritage form ==================== */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto bg-[#fbf6e8] border-2 border-[#b8860b]/30 rounded-2xl p-6 lg:p-8 shadow-xl shadow-[#2a1810]/5 relative">
            {/* Corner ornaments */}
            <SunRays className="absolute -top-4 -left-4 w-8 h-8" color="#b8860b" />
            <SunRays className="absolute -top-4 -right-4 w-8 h-8" color="#b8860b" />
            <SunRays className="absolute -bottom-4 -left-4 w-8 h-8" color="#b8860b" />
            <SunRays className="absolute -bottom-4 -right-4 w-8 h-8" color="#b8860b" />

            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3">
                <div className="h-px w-8 bg-[#8e2433]/40" />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#8e2433]">Reserve Your Journey</span>
                <div className="h-px w-8 bg-[#8e2433]/40" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-end">
              {[
                { label: "Pickup", icon: MapPin, type: "select", options: ["Ngurah Rai Airport", "Ubud", "Seminyak", "Sanur"] },
                { label: "Pick-up", icon: Calendar, type: "datetime-local", value: "2026-05-10T10:00" },
                { label: "Return", icon: Calendar, type: "datetime-local", value: "2026-05-15T10:00" },
                { label: "Vehicle", icon: Car, type: "select", options: ["All", "SUV", "MPV", "Sedan"] },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[#8e2433] mb-2">{f.label}</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#f7f1e3] border border-[#b8860b]/30 rounded-md focus-within:border-[#8e2433] transition-colors">
                    <f.icon className="w-4 h-4 text-[#8e2433] shrink-0" />
                    {f.type === "select" ? (
                      <select className="bg-transparent text-sm font-medium text-[#2a1810] w-full outline-none cursor-pointer">{f.options.map((o) => <option key={o}>{o}</option>)}</select>
                    ) : (
                      <input type={f.type} defaultValue={f.value} className="bg-transparent text-sm font-medium text-[#2a1810] w-full outline-none" />
                    )}
                  </div>
                </div>
              ))}
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#8e2433] text-[#f7f1e3] font-semibold rounded-md hover:bg-[#6e1c27] transition-colors border border-[#b8860b]/40">
                <Search className="w-4 h-4" /> Search
              </button>
            </div>

            <div className="mt-6 pt-5 border-t border-[#b8860b]/20 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-[#2a1810]/70">
              {[
                { icon: CheckCircle, t: "Free cancellation" },
                { icon: Gauge, t: "Unlimited mileage" },
                { icon: Shield, t: "Full insurance" },
                { icon: Clock, t: "Flexible rentals" },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-[#b8860b]" /> {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 4. SPECIAL OFFERS — heritage cards ==================== */}
        <section id="deals" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <HeritageBadge className="mb-5">Generous Offerings</HeritageBadge>
              <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#2a1810] leading-[1] tracking-tight">
                Promotions, <br/>
                <span className="italic text-[#8e2433]">with grace.</span>
              </h2>
              <div className="max-w-md mx-auto mt-6">
                <OrnamentDivider color="#b8860b" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Early Reserve", desc: "Plan ahead, save together", off: "15", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db9?auto=format&fit=crop&w=400&q=80" },
                { title: "Weekend Stay", desc: "Friday to Monday escape", off: "10", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80" },
                { title: "Long Voyage", desc: "Seven days or more", off: "20", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80" },
                { title: "Family Honor", desc: "Spacious for all ages", off: "12", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80" },
              ].map((deal, idx) => (
                <div key={deal.title} className="bg-[#fbf6e8] border-2 border-[#b8860b]/25 rounded-xl p-5 relative group cursor-pointer hover:border-[#8e2433]/40 hover:shadow-xl hover:shadow-[#8e2433]/10 transition-all">
                  {/* Roman numeral */}
                  <div className="absolute top-3 left-3 font-serif italic text-sm text-[#b8860b]">N° {["I", "II", "III", "IV"][idx]}</div>

                  {/* Discount badge */}
                  <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#8e2433] rounded-full flex flex-col items-center justify-center text-[#f7f1e3] border-4 border-[#f7f1e3] shadow-lg">
                    <span className="font-serif text-xl leading-none font-bold">{deal.off}</span>
                    <span className="text-[8px] tracking-wider mt-0.5">% OFF</span>
                  </div>

                  <div className="aspect-[4/3] overflow-hidden rounded-lg mt-6 mb-5 border border-[#b8860b]/20">
                    <img src={deal.img} alt={deal.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" style={{ filter: "sepia(10%)" }} />
                  </div>

                  <h3 className="font-serif text-xl text-[#2a1810] mb-1">{deal.title}</h3>
                  <p className="text-xs italic font-serif text-[#2a1810]/60">{deal.desc}</p>

                  <div className="mt-4 pt-4 border-t border-dashed border-[#b8860b]/30 flex items-center justify-between">
                    <span className="text-xs text-[#8e2433] font-semibold uppercase tracking-wider">Reserve</span>
                    <ArrowUpRight className="w-4 h-4 text-[#8e2433] group-hover:rotate-12 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. FEATURED FLEET — refined heritage ==================== */}
        <section id="vehicles" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#2a1810] text-[#f7f1e3] overflow-hidden">
          {/* Ornamental dots */}
          <SunRays className="absolute top-12 right-12 w-20 h-20 opacity-15" color="#d4a017" />
          <Lotus className="absolute bottom-12 left-12 w-24 h-14 opacity-15" color="#d4a017" />

          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#f7f1e3]/10 border border-[#d4a017]/30 rounded-full mb-5">
                  <Crown className="w-3.5 h-3.5 text-[#d4a017]" />
                  <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#d4a017]">The Royal Fleet</span>
                </div>
                <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl leading-[0.95] tracking-tight">
                  Vehicles for<br />
                  <span className="italic font-light text-[#d4a017]">every occasion.</span>
                </h2>
              </div>
              <div className="lg:col-span-5 lg:text-right">
                <a href="#all-vehicles" className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a017] text-[#2a1810] font-semibold rounded-md hover:bg-[#f7f1e3] transition-colors">
                  View all vehicles <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Toyota Avanza", tag: "Family", seats: 7, trans: "Auto", cc: "1.3L", price: "450", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=600&q=80" },
                { name: "Toyota Rush", tag: "Adventure", seats: 7, trans: "Auto", cc: "1.5L", price: "550", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80" },
                { name: "Honda HR-V", tag: "Premium", seats: 5, trans: "Auto", cc: "1.8L", price: "600", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" },
              ].map((car) => (
                <div key={car.name} className="bg-[#3a2418] border border-[#d4a017]/20 rounded-xl overflow-hidden hover:border-[#d4a017]/50 transition-all group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" style={{ filter: "sepia(10%)" }} />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#8e2433] text-[#f7f1e3] text-[10px] font-semibold rounded-md uppercase tracking-[0.15em] border border-[#d4a017]/40">
                      {car.tag}
                    </div>
                    <div className="absolute top-4 right-4 w-9 h-9 bg-[#d4a017] rounded-full flex items-center justify-center">
                      <Crown className="w-4 h-4 text-[#2a1810]" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl mb-3">{car.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#f7f1e3]/60 mb-5">
                      <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#d4a017]" /> {car.seats}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1.5"><Cog className="w-3.5 h-3.5 text-[#d4a017]" /> {car.trans}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5 text-[#d4a017]" /> {car.cc}</span>
                    </div>
                    <div className="flex items-end justify-between pt-5 border-t border-dashed border-[#d4a017]/20">
                      <div>
                        <div className="text-[10px] text-[#f7f1e3]/50 uppercase tracking-wider mb-0.5">From</div>
                        <div className="font-serif text-3xl text-[#d4a017]">Rp {car.price}K</div>
                        <div className="text-xs text-[#f7f1e3]/50">/day</div>
                      </div>
                      <button className="w-11 h-11 bg-[#d4a017] text-[#2a1810] rounded-full flex items-center justify-center hover:bg-[#f7f1e3] hover:scale-110 transition-all">
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust strip with ornament dividers */}
            <div className="mt-16 pt-12 border-t border-[#d4a017]/20 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: CheckCircle, t: "Well-maintained" },
                { icon: Tag, t: "Honest pricing" },
                { icon: MapPin, t: "Island-wide" },
                { icon: Star, t: "Loved by guests" },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#f7f1e3]/5 border border-[#d4a017]/30 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#d4a017]" />
                  </div>
                  <span className="text-sm font-medium">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 6. DESTINATIONS — temple gates ==================== */}
        <section id="destinations" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <HeritageBadge className="mb-5">Sacred Places</HeritageBadge>
              <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#2a1810] leading-[1] tracking-tight">
                Spots that hold<br />
                <span className="italic text-[#8e2433]">our history.</span>
              </h2>
              <div className="max-w-md mx-auto mt-6">
                <OrnamentDivider color="#b8860b" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Tanah Lot", caption: "Sea temple at sunset", img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=700&q=80" },
                { name: "Besakih", caption: "Mother temple of Bali", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=700&q=80" },
                { name: "Ubud", caption: "Royal palaces & dance", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80" },
                { name: "Uluwatu", caption: "Cliff temple & kecak", img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=700&q=80" },
                { name: "Tirta Empul", caption: "Sacred spring waters", img: "https://images.unsplash.com/photo-1531259736519-9a17795bbcce?auto=format&fit=crop&w=700&q=80" },
                { name: "Goa Gajah", caption: "Elephant cave heritage", img: "https://images.unsplash.com/photo-1589817864531-ef00b149c23a?auto=format&fit=crop&w=700&q=80" },
              ].map((d) => (
                <div key={d.name} className="group cursor-pointer">
                  {/* Temple gate-like frame */}
                  <div className="relative bg-[#fbf6e8] border-2 border-[#b8860b]/30 rounded-t-3xl rounded-b-lg p-3 hover:border-[#8e2433]/50 transition-colors">
                    <SunRays className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-7 h-7 bg-[#fbf6e8] rounded-full p-0.5" color="#b8860b" />

                    <div className="aspect-[4/5] overflow-hidden rounded-t-2xl mb-3 relative">
                      <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" style={{ filter: "sepia(15%)" }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2a1810]/40 to-transparent" />
                    </div>

                    <div className="px-2 pb-2 text-center">
                      <h3 className="font-serif text-2xl text-[#2a1810]">{d.name}</h3>
                      <p className="text-xs italic font-serif text-[#2a1810]/55 mt-0.5">{d.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a href="#all-destinations" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8e2433] border-b-2 border-[#8e2433] pb-1 hover:gap-3 transition-all">
                Explore more <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ==================== 7. TESTIMONIALS — heritage guestbook ==================== */}
        <section id="reviews" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#fbf6e8] border-y-2 border-[#b8860b]/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
              <div className="lg:col-span-7">
                <HeritageBadge className="mb-5">Guestbook</HeritageBadge>
                <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#2a1810] leading-[1] tracking-tight">
                  Words from<br />
                  <span className="italic text-[#8e2433]">our guests.</span>
                </h2>
              </div>
              <div className="lg:col-span-5 lg:text-right">
                <div className="inline-flex flex-col items-end">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#b8860b] text-[#b8860b]" />)}
                  </div>
                  <div className="font-serif text-2xl text-[#2a1810]">Excellent 4.9 / 5</div>
                  <div className="text-xs italic font-serif text-[#2a1810]/60">Based on 2,000+ honored guests</div>
                </div>
              </div>
            </div>

            {/* Featured big testimonial */}
            <div className="bg-[#f7f1e3] border-2 border-[#b8860b]/30 rounded-2xl p-8 lg:p-12 mb-8 relative">
              <SunRays className="absolute -top-4 -left-4 w-10 h-10" color="#b8860b" />
              <SunRays className="absolute -top-4 -right-4 w-10 h-10" color="#b8860b" />
              <SunRays className="absolute -bottom-4 -left-4 w-10 h-10" color="#b8860b" />
              <SunRays className="absolute -bottom-4 -right-4 w-10 h-10" color="#b8860b" />

              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <Quote className="w-12 h-12 text-[#8e2433]/30 mb-6" />
                  <p className="font-serif italic text-2xl lg:text-3xl text-[#2a1810] leading-[1.4] mb-8">
                    "We were welcomed like family. The car was immaculate, the team kind, and the journey through Besakih unforgettable. Auto Ultimate is true Bali hospitality."
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-[#b8860b]/30">
                    <img src="https://i.pravatar.cc/100?img=1" alt="Sarah" className="w-14 h-14 rounded-full object-cover ring-2 ring-[#b8860b]" />
                    <div>
                      <div className="font-serif text-lg text-[#2a1810]">Sarah & Tom Mitchell</div>
                      <div className="text-sm italic font-serif text-[#2a1810]/60">Honored guests · Sydney, Australia</div>
                    </div>
                  </div>
                </div>
                <div className="aspect-square rounded-xl overflow-hidden border-2 border-[#b8860b]/30">
                  <img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=500&q=80" alt="Bali heritage" className="w-full h-full object-cover" style={{ filter: "sepia(15%)" }} />
                </div>
              </div>
            </div>

            {/* Smaller testimonials */}
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { text: "True hospitality. Smooth pickup, thoughtful detail. Felt at home from minute one.", name: "Marcus Chen", country: "Singapore", img: "https://i.pravatar.cc/100?img=3" },
                { text: "Free delivery to our villa was generous. Clean car, clear pricing. Trusted.", name: "Emma Larsson", country: "Sweden", img: "https://i.pravatar.cc/100?img=5" },
                { text: "Family-run, family-felt. Made our heritage tour through Bali truly special.", name: "Aisha Rahman", country: "Malaysia", img: "https://i.pravatar.cc/100?img=9" },
              ].map((r) => (
                <div key={r.name} className="bg-[#f7f1e3] border border-[#b8860b]/25 rounded-xl p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#b8860b] text-[#b8860b]" />)}
                  </div>
                  <p className="font-serif italic text-[#2a1810] leading-relaxed mb-5">"{r.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-dashed border-[#b8860b]/20">
                    <img src={r.img} alt={r.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-[#b8860b]/30" />
                    <div>
                      <div className="font-medium text-sm text-[#2a1810]">{r.name}</div>
                      <div className="text-xs italic font-serif text-[#2a1810]/60">{r.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 8. CTA — heritage invitation ==================== */}
        <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#8e2433] rounded-3xl p-10 lg:p-16 relative overflow-hidden border-4 border-[#b8860b]/40">
              {/* Big ornament background */}
              <SunRays className="absolute -top-32 -right-32 w-96 h-96 opacity-15" color="#d4a017" />
              <Lotus className="absolute -bottom-32 -left-32 w-[400px] h-[240px] opacity-15" color="#d4a017" />

              {/* Corner ornaments */}
              <SunRays className="absolute top-6 left-6 w-10 h-10" color="#d4a017" />
              <SunRays className="absolute top-6 right-6 w-10 h-10" color="#d4a017" />
              <SunRays className="absolute bottom-6 left-6 w-10 h-10" color="#d4a017" />
              <SunRays className="absolute bottom-6 right-6 w-10 h-10" color="#d4a017" />

              <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#f7f1e3]/15 border border-[#d4a017]/30 rounded-full mb-6">
                    <Crown className="w-3.5 h-3.5 text-[#d4a017]" />
                    <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#d4a017]">Begin your journey</span>
                  </div>
                  <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#f7f1e3] leading-[1] tracking-tight mb-6">
                    Drive Bali, <br/>
                    <span className="italic text-[#d4a017]">with heritage.</span>
                  </h2>
                  <p className="font-serif italic text-[#f7f1e3]/85 text-lg lg:text-xl mb-8 max-w-md">
                    Your perfect ride awaits. Welcomed by family. Honored as a guest.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="#book" className="inline-flex items-center gap-2 px-7 py-4 bg-[#d4a017] text-[#2a1810] font-semibold rounded-md hover:bg-[#f7f1e3] transition-colors shadow-xl">
                      Reserve a journey <ArrowRight className="w-4 h-4" />
                    </a>
                    <a href="#vehicles" className="inline-flex items-center px-7 py-4 border-2 border-[#d4a017]/50 text-[#d4a017] font-semibold rounded-md hover:bg-[#d4a017]/10 transition-colors">
                      View all vehicles
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: Tag, title: "Best price guarantee", desc: "Honest, transparent rates" },
                    { icon: Truck, title: "Free delivery", desc: "Anywhere across Bali" },
                    { icon: Clock, title: "Family hospitality", desc: "24/7 local team" },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="bg-[#f7f1e3]/10 backdrop-blur-sm border border-[#d4a017]/20 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#d4a017] rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#2a1810]" />
                      </div>
                      <div>
                        <div className="font-serif text-lg text-[#f7f1e3]">{title}</div>
                        <div className="text-sm italic font-serif text-[#f7f1e3]/75 mt-0.5">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 9. FOOTER — heritage formal ==================== */}
        <footer className="relative pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-[#2a1810] text-[#f7f1e3]">
          <div className="max-w-7xl mx-auto">
            {/* Top ornament */}
            <div className="max-w-xs mx-auto mb-12">
              <OrnamentDivider color="#d4a017" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 pb-12 border-b border-[#d4a017]/20">
              <div className="col-span-2 md:col-span-3 lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-11 h-11 bg-[#8e2433] rounded-xl flex items-center justify-center border-2 border-[#d4a017]/40">
                    <Car className="w-5 h-5 text-[#d4a017]" />
                  </div>
                  <div>
                    <div className="font-serif text-lg">Auto Ultimate</div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-[#d4a017]">— Heritage Bali —</div>
                  </div>
                </div>
                <p className="font-serif italic text-[#f7f1e3]/70 mb-5 leading-relaxed max-w-xs">
                  "A family-run rental house, born and raised in Bali. Carrying you. Honoring you."
                </p>
                <div className="flex gap-2.5">
                  {[
                    { Icon: Globe, label: "Website" },
                    { Icon: AtSign, label: "Social" },
                    { Icon: MessageCircle, label: "WhatsApp" },
                  ].map(({ Icon, label }) => (
                    <a key={label} href="#social" aria-label={label} className="w-10 h-10 bg-[#f7f1e3]/5 border border-[#d4a017]/20 rounded-md flex items-center justify-center text-[#f7f1e3]/70 hover:text-[#d4a017] hover:border-[#d4a017]/50 transition-all">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {[
                { head: "Company", items: ["About us", "Story", "Press", "Heritage"] },
                { head: "Services", items: ["Car rental", "Driver", "Airport", "Long-term"] },
              ].map((col) => (
                <div key={col.head}>
                  <h4 className="font-serif italic text-base text-[#d4a017] mb-4">{col.head}</h4>
                  <ul className="space-y-3">
                    {col.items.map((i) => <li key={i}><a href="#" className="text-sm text-[#f7f1e3]/70 hover:text-[#f7f1e3] transition-colors">{i}</a></li>)}
                  </ul>
                </div>
              ))}

              <div>
                <h4 className="font-serif italic text-base text-[#d4a017] mb-4">Contact</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-[#f7f1e3]/70"><Phone className="w-4 h-4 text-[#d4a017]" /> +62 812 3456 7890</li>
                  <li className="flex items-center gap-2 text-sm text-[#f7f1e3]/70"><Mail className="w-4 h-4 text-[#d4a017]" /> hello@autoultimate.id</li>
                  <li className="flex items-start gap-2 text-sm text-[#f7f1e3]/70"><MapPin className="w-4 h-4 text-[#d4a017] shrink-0 mt-0.5" /> Ngurah Rai Airport, Bali</li>
                </ul>
              </div>

              <div className="col-span-2 md:col-span-3 lg:col-span-1">
                <h4 className="font-serif italic text-base text-[#d4a017] mb-2">Heritage news</h4>
                <p className="text-xs italic font-serif text-[#f7f1e3]/60 mb-3">Stories from our island, monthly.</p>
                <input type="email" placeholder="your@email.com" className="w-full px-4 py-2.5 bg-[#f7f1e3]/10 border border-[#d4a017]/20 rounded-md text-sm outline-none focus:border-[#d4a017] mb-2 text-[#f7f1e3] placeholder:text-[#f7f1e3]/40" />
                <button className="w-full py-2.5 bg-[#d4a017] text-[#2a1810] text-sm font-semibold rounded-md hover:bg-[#f7f1e3] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[#f7f1e3]/60">© {new Date().getFullYear()} Auto Ultimate.</span>
              <span className="text-[#f7f1e3]/60 italic font-serif">Born in Bali · Family since 2013</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
