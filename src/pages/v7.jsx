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
  Leaf,
  Flower2,
  TreePine,
  Sun,
  Wind,
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

// Subtle paper / grain texture as SVG data URL
const PAPER_TEXTURE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.4 0 0 0 0 0.3 0 0 0 0.04 0'/></filter><rect width='100' height='100' filter='url(%23n)'/></svg>";

const Squiggle = ({ className = "", color = "#a85a3c" }) => (
  <svg viewBox="0 0 120 12" className={className} fill="none">
    <path d="M2 6 Q 12 0, 22 6 T 42 6 T 62 6 T 82 6 T 102 6 T 118 6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const LeafBadge = ({ children, className = "" }) => (
  <div className={`inline-flex items-center gap-2 px-4 py-1.5 bg-[#dfe5d3] border border-[#7a9b6e]/30 rounded-full ${className}`}>
    <Leaf className="w-3.5 h-3.5 text-[#5d6f4a]" />
    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#5d6f4a]">{children}</span>
  </div>
);

export default function V7() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useFullScreenRoot();

  return (
    <>
      <Helmet>
        <title>Auto Ultimate · Conscious Bali Drives</title>
        <meta name="description" content="Eco-conscious car rental in Bali. Drive slow, breathe deep, travel light." />
      </Helmet>

      <div
        className="min-h-screen bg-[#f5f0e8] font-sans text-[#3d3024] antialiased relative"
        style={{ backgroundImage: `url("${PAPER_TEXTURE}")` }}
      >
        {/* ==================== 1. NAVBAR — earthy soft ==================== */}
        <header className="sticky top-0 z-50 bg-[#f5f0e8]/90 backdrop-blur-sm border-b border-[#5d4337]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-2.5">
                <div className="relative w-10 h-10 bg-[#5d6f4a] rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#f5f0e8]" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#c97b5b] rounded-full border-2 border-[#f5f0e8]" />
                </div>
                <div className="leading-tight">
                  <div className="font-serif text-[#3d3024] text-lg tracking-tight">Auto Ultimate</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#5d6f4a] font-medium">— Conscious Bali —</div>
                </div>
              </div>

              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((l) => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="text-[13px] font-medium text-[#3d3024]/80 hover:text-[#a85a3c] transition-colors">
                    {l}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                <a href="#signin" className="hidden sm:flex items-center gap-1.5 text-[13px] font-medium text-[#3d3024]/80 hover:text-[#a85a3c]">
                  <User className="w-3.5 h-3.5" /> Sign in
                </a>
                <a href="#book" className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#5d6f4a] text-[#f5f0e8] text-[13px] font-semibold rounded-full hover:bg-[#4a5a3b] transition-colors">
                  Reserve
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button className="lg:hidden p-1.5 text-[#3d3024]" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
          {mobileOpen && (
            <div className="lg:hidden border-t border-[#5d4337]/10 bg-[#f5f0e8]/95 px-4 py-5 space-y-3">
              {navLinks.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm font-medium text-[#3d3024]" onClick={() => setMobileOpen(false)}>{l}</a>
              ))}
              <div className="pt-3 border-t border-[#5d4337]/10 flex flex-col gap-3">
                <a href="#signin" className="flex items-center gap-2 text-sm font-medium"><User className="w-4 h-4" /> Sign in</a>
                <a href="#book" className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#5d6f4a] text-[#f5f0e8] text-sm font-semibold rounded-full">
                  Reserve <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </header>

        {/* ==================== 2. HERO — earthy organic ==================== */}
        <section className="relative pt-12 lg:pt-20 pb-32 overflow-hidden">
          {/* Decorative leafs */}
          <Leaf className="absolute top-32 left-8 w-8 h-8 text-[#5d6f4a]/20 -rotate-45" />
          <TreePine className="absolute top-1/2 right-12 w-10 h-10 text-[#5d6f4a]/15 rotate-12" />
          <Flower2 className="absolute bottom-40 left-1/4 w-7 h-7 text-[#c97b5b]/30" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <LeafBadge className="mb-8">Slow · Mindful · Bali</LeafBadge>

                <h1 className="font-serif text-[#3d3024] text-6xl sm:text-7xl lg:text-8xl xl:text-[110px] font-medium leading-[0.95] tracking-tight mb-2">
                  Drive Bali.<br />
                  <span className="relative inline-block">
                    <span className="italic text-[#a85a3c]">Make it</span>
                    <Squiggle className="absolute -bottom-3 left-0 w-full h-3" color="#a85a3c" />
                  </span>
                  <br />
                  unforgettable.
                </h1>

                <p className="font-serif italic text-[#5d4337]/80 text-xl lg:text-2xl mt-10 mb-10 max-w-lg leading-relaxed">
                  "We take you slow through paddy fields, jungle roads, and quiet villages — the way Bali was meant to be seen."
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <a href="#book" className="group inline-flex items-center gap-2 px-7 py-4 bg-[#a85a3c] text-[#f5f0e8] font-semibold rounded-full hover:bg-[#8b4830] transition-colors shadow-lg shadow-[#a85a3c]/20">
                    Reserve a ride <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#vehicles" className="inline-flex items-center gap-2 px-7 py-4 border-2 border-[#3d3024] text-[#3d3024] font-semibold rounded-full hover:bg-[#3d3024] hover:text-[#f5f0e8] transition-colors">
                    Browse fleet
                  </a>
                </div>

                {/* Feature pills */}
                <div className="grid grid-cols-2 gap-4 max-w-xl">
                  {[
                    { icon: Wallet, label: "No hidden fees", desc: "All-in pricing" },
                    { icon: Truck, label: "Free delivery", desc: "Anywhere in Bali" },
                    { icon: Clock, label: "24/7 support", desc: "Real humans" },
                    { icon: Shield, label: "Full insurance", desc: "Drive at ease" },
                  ].map(({ icon: Icon, label, desc }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#dfe5d3] border border-[#7a9b6e]/30 rounded-2xl flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#5d6f4a]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#3d3024] text-sm">{label}</div>
                        <div className="text-xs text-[#5d4337]/60 italic font-serif">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: organic photo composition */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] max-w-md mx-auto">
                  {/* Big sage green organic background */}
                  <div className="absolute inset-0 bg-[#7a9b6e]/40 rounded-[60%_40%_55%_45%/55%_45%_55%_45%] -rotate-3" />

                  {/* Photo with arch shape */}
                  <div className="absolute inset-2 overflow-hidden rounded-t-full rounded-b-3xl border-4 border-[#3d3024]/10 shadow-2xl shadow-[#5d4337]/15">
                    <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80" alt="Bali rice paddies" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3d3024]/20 to-transparent" />
                  </div>

                  {/* Leaf sprig left */}
                  <Leaf className="absolute top-12 -left-6 w-12 h-12 text-[#5d6f4a] -rotate-45 drop-shadow-md" />
                  <Leaf className="absolute top-20 -left-2 w-8 h-8 text-[#7a9b6e] -rotate-12" />

                  {/* Round stamp badge */}
                  <div className="absolute -top-4 -right-4 w-28 h-28 bg-[#c97b5b] rounded-full flex flex-col items-center justify-center text-center text-[#f5f0e8] rotate-12 shadow-xl border-4 border-[#f5f0e8]">
                    <Leaf className="w-5 h-5 mb-1" />
                    <div className="text-[9px] font-bold tracking-[0.15em] uppercase">Eco</div>
                    <div className="text-[9px] font-bold tracking-[0.15em] uppercase">friendly</div>
                    <div className="text-[8px] font-medium mt-0.5 italic">est. 2013</div>
                  </div>

                  {/* Rating chip */}
                  <div className="absolute -bottom-4 left-4 bg-[#f5f0e8] border border-[#5d4337]/15 rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
                    <div className="flex -space-x-1.5">
                      {[1, 2, 3].map((i) => (
                        <img key={i} src={`https://i.pravatar.cc/100?img=${i + 40}`} alt="" className="w-7 h-7 rounded-full border-2 border-[#f5f0e8] object-cover" />
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-[#c97b5b] text-[#c97b5b]" />)}
                      </div>
                      <div className="text-xs text-[#3d3024] font-medium">10,000+ travelers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 3. BOOKING — earthy form ==================== */}
        <section className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto bg-[#fdfaf3] border border-[#5d4337]/10 rounded-[32px] p-6 lg:p-8 shadow-xl shadow-[#5d4337]/5 relative">
            {/* Corner ornaments */}
            <Flower2 className="absolute -top-3 -left-3 w-8 h-8 text-[#c97b5b] rotate-12" />
            <Sun className="absolute -bottom-3 -right-3 w-8 h-8 text-[#5d6f4a] -rotate-12" />

            <div className="flex items-center gap-2 mb-5">
              <Leaf className="w-4 h-4 text-[#5d6f4a]" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#5d6f4a]">Plan your slow drive</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-end">
              {[
                { label: "Pickup", icon: MapPin, type: "select", options: ["Ngurah Rai Airport", "Ubud Center", "Seminyak", "Canggu"] },
                { label: "Pick-up", icon: Calendar, type: "datetime-local", value: "2026-05-10T10:00" },
                { label: "Return", icon: Calendar, type: "datetime-local", value: "2026-05-15T10:00" },
                { label: "Vehicle", icon: Car, type: "select", options: ["All", "Compact", "SUV", "MPV"] },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-[#5d4337]/60 mb-2">{f.label}</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#f5f0e8] border border-[#5d4337]/15 rounded-2xl focus-within:border-[#5d6f4a] transition-colors">
                    <f.icon className="w-4 h-4 text-[#5d6f4a] shrink-0" />
                    {f.type === "select" ? (
                      <select className="bg-transparent text-sm font-medium text-[#3d3024] w-full outline-none cursor-pointer">{f.options.map((o) => <option key={o}>{o}</option>)}</select>
                    ) : (
                      <input type={f.type} defaultValue={f.value} className="bg-transparent text-sm font-medium text-[#3d3024] w-full outline-none" />
                    )}
                  </div>
                </div>
              ))}
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#5d6f4a] text-[#f5f0e8] font-semibold rounded-2xl hover:bg-[#4a5a3b] transition-colors">
                <Search className="w-4 h-4" /> Search
              </button>
            </div>

            <div className="mt-6 pt-5 border-t border-dashed border-[#5d4337]/15 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-[#5d4337]/70">
              {[
                { icon: CheckCircle, t: "Free cancellation" },
                { icon: Gauge, t: "Unlimited mileage" },
                { icon: Shield, t: "Full insurance" },
                { icon: Clock, t: "Flexible rentals" },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-[#5d6f4a]" /> {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 4. SPECIAL OFFERS — earthy stamps ==================== */}
        <section id="deals" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <LeafBadge className="mb-5">Slow Travel Deals</LeafBadge>
              <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#3d3024] leading-[1] tracking-tight">
                Gentle <span className="italic text-[#a85a3c]">offerings</span><br />
                for the journey.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Early Riser", desc: "Plan ahead, save together", off: "15", bg: "bg-[#dfe5d3]", accent: "#5d6f4a", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db9?auto=format&fit=crop&w=400&q=80" },
                { title: "Weekend Retreat", desc: "Friday to Monday peace", off: "10", bg: "bg-[#ede4d3]", accent: "#a85a3c", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80" },
                { title: "Long Stay", desc: "Live slow, drive less", off: "20", bg: "bg-[#e8d8c4]", accent: "#5d4337", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80" },
                { title: "Family Roots", desc: "All ages, big & small", off: "12", bg: "bg-[#e0d4be]", accent: "#7a5e42", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80" },
              ].map((deal) => (
                <div key={deal.title} className={`${deal.bg} rounded-[32px] p-6 relative group cursor-pointer hover:-translate-y-1 transition-transform`}>
                  {/* Stamp badge */}
                  <div
                    className="absolute -top-3 -right-3 w-16 h-16 rounded-full flex flex-col items-center justify-center text-center text-[#f5f0e8] rotate-[6deg] border-2 border-[#f5f0e8] shadow-md"
                    style={{ backgroundColor: deal.accent }}
                  >
                    <span className="text-lg font-bold leading-none font-serif">{deal.off}%</span>
                    <span className="text-[8px] tracking-wider mt-0.5">OFF</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#3d3024] mb-1">{deal.title}</h3>
                  <p className="text-sm italic font-serif text-[#5d4337]/70 mb-5">{deal.desc}</p>
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl border-2 border-[#f5f0e8]">
                    <img src={deal.img} alt={deal.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a href="#all-deals" className="inline-flex items-center gap-2 text-sm font-semibold text-[#a85a3c] border-b-2 border-[#a85a3c] pb-1 hover:gap-3 transition-all">
                View all deals <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ==================== 5. FEATURED FLEET — earthy cards ==================== */}
        <section id="vehicles" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#ede4d3]">
          <Leaf className="absolute top-20 right-20 w-12 h-12 text-[#5d6f4a]/20 rotate-12" />
          <TreePine className="absolute bottom-40 left-12 w-14 h-14 text-[#5d6f4a]/15 -rotate-12" />

          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
              <div className="lg:col-span-7">
                <LeafBadge className="mb-5">The Fleet</LeafBadge>
                <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#3d3024] leading-[0.95] tracking-tight">
                  Cars chosen<br />
                  with <span className="italic text-[#a85a3c]">care.</span>
                </h2>
                <p className="font-serif italic text-[#5d4337]/70 text-lg mt-6 max-w-md">
                  Reliable, well-maintained, and serviced before every journey. Built for the long, beautiful drive.
                </p>
              </div>
              <div className="lg:col-span-5 lg:text-right">
                <a href="#all-vehicles" className="inline-flex items-center gap-2 px-6 py-3 bg-[#3d3024] text-[#f5f0e8] font-semibold rounded-full hover:bg-[#5d4337] transition-colors">
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
                <div key={car.name} className="bg-[#fdfaf3] rounded-[32px] overflow-hidden border border-[#5d4337]/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#5d4337]/10 transition-all group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#5d6f4a] text-[#f5f0e8] text-[10px] font-semibold rounded-full uppercase tracking-[0.15em]">
                      {car.tag}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-[#3d3024] mb-3">{car.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#5d4337]/60 font-medium mb-5">
                      <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#5d6f4a]" /> {car.seats}</span>
                      <span className="text-[#5d4337]/30">·</span>
                      <span className="flex items-center gap-1.5"><Cog className="w-3.5 h-3.5 text-[#5d6f4a]" /> {car.trans}</span>
                      <span className="text-[#5d4337]/30">·</span>
                      <span className="flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5 text-[#5d6f4a]" /> {car.cc}</span>
                    </div>
                    <div className="flex items-end justify-between pt-5 border-t border-dashed border-[#5d4337]/15">
                      <div>
                        <div className="text-[10px] text-[#5d4337]/50 uppercase tracking-wider mb-0.5">From</div>
                        <div className="font-serif text-3xl text-[#a85a3c]">Rp {car.price}K<span className="text-sm text-[#5d4337]/50 ml-1 font-sans not-italic">/day</span></div>
                      </div>
                      <button className="w-11 h-11 bg-[#5d6f4a] text-[#f5f0e8] rounded-full flex items-center justify-center hover:bg-[#4a5a3b] hover:scale-110 transition-all">
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust strip with leaf dividers */}
            <div className="mt-16 pt-12 border-t border-[#5d4337]/15 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: CheckCircle, t: "Well-maintained" },
                { icon: Tag, t: "Honest pricing" },
                { icon: MapPin, t: "Island-wide" },
                { icon: Star, t: "Loved by travelers" },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#dfe5d3] border border-[#7a9b6e]/30 rounded-full flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#5d6f4a]" />
                  </div>
                  <span className="text-sm font-medium text-[#3d3024]">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 6. DESTINATIONS — postcard style ==================== */}
        <section id="destinations" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <Wind className="absolute top-32 left-12 w-10 h-10 text-[#5d6f4a]/20" />
          <Sun className="absolute bottom-40 right-12 w-12 h-12 text-[#c97b5b]/20" />

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <LeafBadge className="mb-5">Hidden Spots</LeafBadge>
              <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#3d3024] leading-[1] tracking-tight">
                Quiet places<br />
                <span className="italic text-[#a85a3c]">worth driving to.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Ubud", caption: "Rice terraces & monkey forests", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80", rotate: "-rotate-2", featured: true },
                { name: "Sidemen", caption: "Volcano views, less crowds", img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=700&q=80", rotate: "rotate-1" },
                { name: "Munduk", caption: "Waterfalls & coffee plantations", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=700&q=80", rotate: "-rotate-1" },
                { name: "Nusa Penida", caption: "Wild cliffs and clear water", img: "https://images.unsplash.com/photo-1589817864531-ef00b149c23a?auto=format&fit=crop&w=700&q=80", rotate: "rotate-2" },
                { name: "Amed", caption: "Black sand & quiet diving", img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=700&q=80", rotate: "-rotate-1" },
                { name: "West Bali", caption: "National park & wild coast", img: "https://images.unsplash.com/photo-1531259736519-9a17795bbcce?auto=format&fit=crop&w=700&q=80", rotate: "rotate-1" },
              ].map((d) => (
                <div key={d.name} className={`group cursor-pointer ${d.rotate} hover:rotate-0 transition-transform duration-500`}>
                  {/* Postcard */}
                  <div className="bg-[#fdfaf3] rounded-2xl p-3 border border-[#5d4337]/10 shadow-lg shadow-[#5d4337]/10 hover:shadow-xl transition-shadow">
                    <div className="aspect-[4/5] overflow-hidden rounded-xl mb-3 relative">
                      <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

                      {/* Stamp on photo */}
                      <div className="absolute top-3 right-3 w-10 h-10 bg-[#c97b5b] rounded-full flex items-center justify-center rotate-12 border-2 border-[#fdfaf3]">
                        <Leaf className="w-4 h-4 text-[#f5f0e8]" />
                      </div>
                    </div>

                    {/* Postcard text */}
                    <div className="px-2 pb-2 flex items-center justify-between">
                      <div>
                        <h3 className="font-serif text-xl text-[#3d3024]">{d.name}</h3>
                        <p className="text-xs italic font-serif text-[#5d4337]/60 mt-0.5">{d.caption}</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-[#a85a3c] group-hover:rotate-12 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a href="#all-destinations" className="inline-flex items-center gap-2 text-sm font-semibold text-[#a85a3c] border-b-2 border-[#a85a3c] pb-1 hover:gap-3 transition-all">
                Explore more <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ==================== 7. TESTIMONIALS — handwritten feel ==================== */}
        <section id="reviews" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#5d6f4a] text-[#f5f0e8] overflow-hidden">
          {/* Decorative leaves */}
          <Leaf className="absolute top-12 left-8 w-16 h-16 text-[#f5f0e8]/10 rotate-45" />
          <Leaf className="absolute bottom-16 right-12 w-20 h-20 text-[#f5f0e8]/10 -rotate-12" />
          <Flower2 className="absolute top-1/2 right-1/4 w-12 h-12 text-[#f5f0e8]/10" />

          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f5f0e8]/10 border border-[#f5f0e8]/20 rounded-full mb-5">
                  <Leaf className="w-3.5 h-3.5 text-[#f5f0e8]" />
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#f5f0e8]">Travelers' Letters</span>
                </div>
                <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl leading-[1] tracking-tight">
                  Words from<br />
                  <span className="italic text-[#dfe5d3]">our friends.</span>
                </h2>
              </div>
              <div className="lg:col-span-5 lg:text-right">
                <div className="inline-flex flex-col items-end">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#dfe5d3] text-[#dfe5d3]" />)}
                  </div>
                  <div className="font-serif text-2xl">Excellent 4.9 / 5</div>
                  <div className="text-xs text-[#f5f0e8]/70 italic font-serif">Based on 2,000+ kind reviews</div>
                </div>
              </div>
            </div>

            {/* Featured letter */}
            <div className="bg-[#f5f0e8] text-[#3d3024] rounded-[32px] p-8 lg:p-12 mb-8 relative">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-[#a85a3c]/30" />
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <p className="font-serif italic text-2xl lg:text-3xl text-[#3d3024] leading-[1.4] mb-8">
                    "We took the long way through Sidemen and Munduk — just our family, the rice fields, and a Toyota that purred. Auto Ultimate didn't just rent us a car. They gave us memories."
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-dashed border-[#5d4337]/15">
                    <img src="https://i.pravatar.cc/100?img=1" alt="Sarah" className="w-14 h-14 rounded-full object-cover ring-4 ring-[#dfe5d3]" />
                    <div>
                      <div className="font-serif text-lg">Sarah & Tom Mitchell</div>
                      <div className="text-sm italic font-serif text-[#5d4337]/60">Slow travelers · Sydney, Australia</div>
                    </div>
                  </div>
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=500&q=80" alt="Bali" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Smaller testimonials */}
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { text: "Smooth pickup, kind staff, well-loved car. Felt like family.", name: "Marcus Chen", country: "Singapore", img: "https://i.pravatar.cc/100?img=3" },
                { text: "Free delivery to our jungle villa was magic. Spotless ride.", name: "Emma Larsson", country: "Sweden", img: "https://i.pravatar.cc/100?img=5" },
                { text: "Booking felt easy and human. Made our trip relaxing.", name: "Aisha Rahman", country: "Malaysia", img: "https://i.pravatar.cc/100?img=9" },
              ].map((r) => (
                <div key={r.name} className="bg-[#f5f0e8]/10 backdrop-blur-sm border border-[#f5f0e8]/15 rounded-3xl p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#dfe5d3] text-[#dfe5d3]" />)}
                  </div>
                  <p className="font-serif italic text-[#f5f0e8] leading-relaxed mb-5">"{r.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-dashed border-[#f5f0e8]/15">
                    <img src={r.img} alt={r.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-[#f5f0e8]/30" />
                    <div>
                      <div className="font-medium text-sm">{r.name}</div>
                      <div className="text-xs italic font-serif text-[#f5f0e8]/60">{r.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 8. CTA — earthy invitation ==================== */}
        <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#a85a3c] rounded-[40px] p-10 lg:p-16 relative overflow-hidden">
              {/* Decorative organic shapes */}
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#c97b5b] rounded-full opacity-40 blur-2xl" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#5d6f4a] rounded-full opacity-30 blur-2xl" />

              {/* Decorative leafs */}
              <Leaf className="absolute top-8 right-8 w-12 h-12 text-[#f5f0e8]/30 -rotate-12" />
              <Flower2 className="absolute bottom-8 left-8 w-10 h-10 text-[#f5f0e8]/30" />

              <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f5f0e8]/15 border border-[#f5f0e8]/30 rounded-full mb-6">
                    <Sun className="w-3.5 h-3.5 text-[#f5f0e8]" />
                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#f5f0e8]">Begin your slow drive</span>
                  </div>
                  <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#f5f0e8] leading-[1] tracking-tight mb-6">
                    Drive Bali<br />
                    <span className="italic text-[#dfe5d3]">at your pace.</span>
                  </h2>
                  <p className="font-serif italic text-[#f5f0e8]/85 text-lg lg:text-xl mb-8 max-w-md">
                    Your perfect ride is one click away. Take the slow road. Breathe deep. Stay long.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="#book" className="inline-flex items-center gap-2 px-7 py-4 bg-[#f5f0e8] text-[#a85a3c] font-semibold rounded-full hover:bg-[#fdfaf3] transition-colors shadow-xl">
                      Reserve a ride <ArrowRight className="w-4 h-4" />
                    </a>
                    <a href="#vehicles" className="inline-flex items-center px-7 py-4 border-2 border-[#f5f0e8]/50 text-[#f5f0e8] font-semibold rounded-full hover:bg-[#f5f0e8]/10 transition-colors">
                      View all vehicles
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: Tag, title: "Best price guarantee", desc: "Honest, transparent rates" },
                    { icon: Truck, title: "Free delivery", desc: "Anywhere across the island" },
                    { icon: Clock, title: "24/7 support", desc: "Real humans, anytime" },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="bg-[#f5f0e8]/10 backdrop-blur-sm border border-[#f5f0e8]/20 rounded-3xl p-5 flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#f5f0e8] rounded-2xl flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#a85a3c]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#f5f0e8]">{title}</div>
                        <div className="text-sm italic font-serif text-[#f5f0e8]/75 mt-0.5">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 9. FOOTER — warm cream ==================== */}
        <footer className="relative pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-[#3d3024] text-[#f5f0e8]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 pb-12 border-b border-[#f5f0e8]/15">
              <div className="col-span-2 md:col-span-3 lg:col-span-2">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="relative w-10 h-10 bg-[#5d6f4a] rounded-full flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-[#f5f0e8]" />
                  </div>
                  <div>
                    <div className="font-serif text-lg text-[#f5f0e8]">Auto Ultimate</div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-[#f5f0e8]/60">— Conscious Bali —</div>
                  </div>
                </div>
                <p className="font-serif italic text-[#f5f0e8]/70 mb-5 leading-relaxed max-w-xs">
                  "Drive slow. Breathe deep. Stay long. The Bali you've been looking for."
                </p>
                <div className="flex gap-2.5">
                  {[
                    { Icon: Globe, label: "Website" },
                    { Icon: AtSign, label: "Social" },
                    { Icon: MessageCircle, label: "WhatsApp" },
                  ].map(({ Icon, label }) => (
                    <a key={label} href="#social" aria-label={label} className="w-10 h-10 bg-[#f5f0e8]/10 border border-[#f5f0e8]/15 rounded-full flex items-center justify-center text-[#f5f0e8]/70 hover:text-[#f5f0e8] hover:bg-[#f5f0e8]/15 transition-all">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {[
                { head: "Company", items: ["About us", "Story", "Press", "Journal"] },
                { head: "Services", items: ["Car rental", "Driver", "Airport", "Long-term"] },
              ].map((col) => (
                <div key={col.head}>
                  <h4 className="font-serif italic text-base text-[#dfe5d3] mb-4">{col.head}</h4>
                  <ul className="space-y-3">
                    {col.items.map((i) => <li key={i}><a href="#" className="text-sm text-[#f5f0e8]/70 hover:text-[#f5f0e8] transition-colors">{i}</a></li>)}
                  </ul>
                </div>
              ))}

              <div>
                <h4 className="font-serif italic text-base text-[#dfe5d3] mb-4">Contact</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-[#f5f0e8]/70"><Phone className="w-4 h-4 text-[#dfe5d3]" /> +62 812 3456 7890</li>
                  <li className="flex items-center gap-2 text-sm text-[#f5f0e8]/70"><Mail className="w-4 h-4 text-[#dfe5d3]" /> hello@autoultimate.id</li>
                  <li className="flex items-start gap-2 text-sm text-[#f5f0e8]/70"><MapPin className="w-4 h-4 text-[#dfe5d3] shrink-0 mt-0.5" /> Ngurah Rai Airport, Bali</li>
                </ul>
              </div>

              <div className="col-span-2 md:col-span-3 lg:col-span-1">
                <h4 className="font-serif italic text-base text-[#dfe5d3] mb-2">Slow letter</h4>
                <p className="text-xs italic font-serif text-[#f5f0e8]/60 mb-3">A monthly note. No spam, ever.</p>
                <input type="email" placeholder="your@email.com" className="w-full px-4 py-2.5 bg-[#f5f0e8]/10 border border-[#f5f0e8]/15 rounded-full text-sm outline-none focus:border-[#dfe5d3] mb-2 text-[#f5f0e8] placeholder:text-[#f5f0e8]/40" />
                <button className="w-full py-2.5 bg-[#dfe5d3] text-[#3d3024] text-sm font-semibold rounded-full hover:bg-[#f5f0e8] transition-colors">
                  Join the slow letter
                </button>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[#f5f0e8]/60">© {new Date().getFullYear()} Auto Ultimate.</span>
              <span className="text-[#f5f0e8]/60 italic font-serif">Grown in Bali · Made with care.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
