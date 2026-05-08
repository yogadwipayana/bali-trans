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
  Zap,
  Heart,
  Sun,
  Waves,
  Sparkles,
  Tag,
  Truck,
  Shield,
  Clock,
  Wallet,
  CheckCircle,
} from "lucide-react";

const navLinks = ["Vehicles", "Deals", "Spots", "Services", "Reviews", "About", "Contact"];

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

export default function V4() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useFullScreenRoot();

  return (
    <>
      <Helmet>
        <title>Auto Ultimate · Bali Adventures Made Easy</title>
        <meta name="description" content="Bold & easy Bali car rental for surfers, dreamers, and adventurers." />
      </Helmet>

      <div className="min-h-screen bg-[#fff8f0] font-sans text-[#0d2233] antialiased overflow-x-hidden">
        {/* ==================== 1. NAVBAR — chunky pill ==================== */}
        <header className="sticky top-4 z-50 px-4">
          <div className="max-w-7xl mx-auto bg-white border-2 border-[#0d2233] rounded-full shadow-[6px_6px_0_0_#0d2233] px-4 lg:px-6">
            <div className="flex items-center justify-between h-14 lg:h-16">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-[#ff6b35] border-2 border-[#0d2233] rounded-full flex items-center justify-center -rotate-12">
                  <Car className="w-4 h-4 text-[#0d2233]" />
                </div>
                <div>
                  <div className="font-black text-base text-[#0d2233] leading-none">Auto Ultimate</div>
                  <div className="text-[9px] tracking-[0.2em] uppercase text-[#ff6b35] font-bold mt-0.5">Bali Crew</div>
                </div>
              </div>

              <nav className="hidden lg:flex items-center gap-7">
                {navLinks.map((l, i) => (
                  <a key={l} href={`#${l.toLowerCase()}`} className={`text-[13px] font-bold transition-colors ${i === 0 ? "text-[#ff6b35]" : "text-[#0d2233] hover:text-[#ff6b35]"}`}>
                    {l}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <a href="#signin" className="hidden sm:block text-[13px] font-bold px-3">Sign in</a>
                <a href="#book" className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#ffd60a] border-2 border-[#0d2233] text-[#0d2233] text-[13px] font-black rounded-full hover:bg-[#ff6b35] hover:text-white transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#0d2233]">
                  Book now <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button className="lg:hidden p-1.5" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
          {mobileOpen && (
            <div className="lg:hidden max-w-7xl mx-auto mt-2 bg-white border-2 border-[#0d2233] rounded-3xl shadow-[6px_6px_0_0_#0d2233] p-5 space-y-3">
              {navLinks.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm font-bold" onClick={() => setMobileOpen(false)}>{l}</a>
              ))}
              <div className="pt-3 border-t-2 border-[#0d2233] flex flex-col gap-2.5">
                <a href="#signin" className="text-sm font-bold">Sign in</a>
                <a href="#book" className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#ffd60a] border-2 border-[#0d2233] text-[#0d2233] text-sm font-black rounded-full">
                  Book now <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </header>

        {/* ==================== 2. HERO — big bold playful ==================== */}
        <section className="relative pt-12 lg:pt-20 pb-32 overflow-hidden">
          {/* Background blobs */}
          <div className="absolute top-32 -left-32 w-96 h-96 bg-[#ffd60a] rounded-full blur-3xl opacity-40" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff5c8a] rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#00b4d8] rounded-full blur-3xl opacity-20" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0d2233] text-[#ffd60a] rounded-full">
                <Zap className="w-4 h-4 fill-current" />
                <span className="text-xs font-black tracking-wider uppercase">Reliable · Flexible · Island-wide</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0d2233]">
                <span className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#ffd60a] text-[#ffd60a]" />)}
                </span>
                4.9/5 from 2,000+ travelers
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <h1 className="font-black text-[#0d2233] text-6xl sm:text-7xl lg:text-8xl xl:text-[140px] leading-[0.9] tracking-[-0.04em]">
                  Drive Bali.<br />
                  Make it<br />
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[#ff6b35]">unforget-</span>
                    <span className="absolute inset-x-0 bottom-2 lg:bottom-4 h-3 lg:h-5 bg-[#ffd60a] -z-0 rotate-[-1deg]" />
                  </span><br />
                  <span className="text-[#ff6b35]">table.</span>
                  <span className="inline-block ml-3">
                    <Sparkles className="inline-block w-12 h-12 lg:w-20 lg:h-20 fill-[#ffd60a] text-[#ffd60a]" />
                  </span>
                </h1>

                <p className="text-[#0d2233]/70 text-lg lg:text-xl font-medium mt-8 max-w-lg">
                  Big rides. Bigger adventures. Pick your wheels and we'll deliver them <span className="bg-[#ffd60a] px-1 font-bold">free</span> wherever you are on the island.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <a href="#book" className="group inline-flex items-center gap-2 px-7 py-4 bg-[#ff6b35] border-2 border-[#0d2233] text-white font-black rounded-full hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#0d2233] transition-all">
                    Book a ride <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#vehicles" className="inline-flex items-center gap-2 px-7 py-4 bg-white border-2 border-[#0d2233] text-[#0d2233] font-black rounded-full hover:bg-[#0d2233] hover:text-white transition-all">
                    Browse fleet
                  </a>
                </div>

                {/* Quick badges */}
                <div className="flex flex-wrap gap-3 mt-10">
                  {[
                    { icon: Wallet, label: "No hidden fees", bg: "bg-[#ffd60a]" },
                    { icon: Truck, label: "Free delivery", bg: "bg-[#00b4d8]" },
                    { icon: Clock, label: "24/7 support", bg: "bg-[#ff5c8a]" },
                    { icon: Shield, label: "Full insurance", bg: "bg-[#a3e635]" },
                  ].map(({ icon: Icon, label, bg }) => (
                    <div key={label} className={`${bg} border-2 border-[#0d2233] rounded-full pl-2 pr-4 py-1.5 flex items-center gap-2 text-xs font-bold`}>
                      <span className="w-6 h-6 bg-white border-2 border-[#0d2233] rounded-full flex items-center justify-center">
                        <Icon className="w-3 h-3" />
                      </span>
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right hero image */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-square max-w-md mx-auto">
                  {/* Main image with thick border */}
                  <div className="absolute inset-0 bg-[#ffd60a] rounded-[40%_60%_60%_40%/50%_50%_50%_50%] rotate-6" />
                  <div className="absolute inset-3 bg-[#ff6b35] rounded-[40%_60%_60%_40%/50%_50%_50%_50%] -rotate-3" />
                  <div className="absolute inset-6 overflow-hidden rounded-[40%_60%_60%_40%/50%_50%_50%_50%] border-2 border-[#0d2233]">
                    <img src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80" alt="Hero car" className="w-full h-full object-cover" />
                  </div>

                  {/* Floating stickers */}
                  <div className="absolute -top-4 -right-4 w-28 h-28 bg-[#0d2233] text-white rounded-full flex flex-col items-center justify-center text-center rotate-12 border-2 border-[#0d2233]">
                    <Heart className="w-5 h-5 fill-[#ff5c8a] text-[#ff5c8a] mb-1" />
                    <div className="text-[10px] font-black leading-tight">10,000+</div>
                    <div className="text-[9px] font-bold leading-tight">happy<br />travelers</div>
                  </div>

                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#ffd60a] border-2 border-[#0d2233] rounded-full flex flex-col items-center justify-center text-center -rotate-12 shadow-[4px_4px_0_0_#0d2233]">
                    <Sun className="w-6 h-6 text-[#0d2233] mb-1" />
                    <div className="text-[10px] font-black text-[#0d2233] leading-tight">BEST PRICE</div>
                    <div className="text-[10px] font-black text-[#0d2233] leading-tight">GUARANTEE</div>
                  </div>

                  <div className="absolute top-1/2 -left-8 w-16 h-16 bg-[#00b4d8] border-2 border-[#0d2233] rounded-full flex items-center justify-center rotate-[-20deg]">
                    <Waves className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 3. BOOKING — chunky pill form ==================== */}
        <section className="relative -mt-16 z-20 px-4">
          <div className="max-w-6xl mx-auto bg-white border-2 border-[#0d2233] rounded-3xl shadow-[8px_8px_0_0_#0d2233] p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-5">
              <Search className="w-4 h-4 text-[#ff6b35]" />
              <span className="text-xs font-black tracking-[0.2em] uppercase text-[#0d2233]">Find your ride</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              {[
                { label: "Pickup", icon: MapPin, type: "select", options: ["Airport", "Ubud", "Seminyak", "Kuta"] },
                { label: "Pick-up", icon: Calendar, type: "datetime-local", value: "2026-05-10T10:00" },
                { label: "Return", icon: Calendar, type: "datetime-local", value: "2026-05-15T10:00" },
                { label: "Vehicle", icon: Car, type: "select", options: ["All", "SUV", "MPV", "Sedan"] },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-[10px] font-black tracking-[0.15em] uppercase text-[#0d2233] mb-1.5">{f.label}</label>
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-[#fff8f0] border-2 border-[#0d2233] rounded-full">
                    <f.icon className="w-4 h-4 text-[#ff6b35] shrink-0" />
                    {f.type === "select" ? (
                      <select className="bg-transparent text-sm font-medium w-full outline-none cursor-pointer">{f.options.map((o) => <option key={o}>{o}</option>)}</select>
                    ) : (
                      <input type={f.type} defaultValue={f.value} className="bg-transparent text-sm font-medium w-full outline-none" />
                    )}
                  </div>
                </div>
              ))}
              <button className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ff6b35] border-2 border-[#0d2233] text-white font-black rounded-full hover:bg-[#ffd60a] hover:text-[#0d2233] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#0d2233]">
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
            <div className="mt-6 pt-6 border-t-2 border-dashed border-[#0d2233]/20 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs font-bold">
              {[{ icon: CheckCircle, t: "Free cancellation" }, { icon: Gauge, t: "Unlimited mileage" }, { icon: Shield, t: "Full insurance" }, { icon: Clock, t: "Flexible rentals" }].map(({ icon: Icon, t }) => (
                <div key={t} className="flex items-center gap-1.5 text-[#0d2233]">
                  <Icon className="w-4 h-4 text-[#ff6b35]" /> {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 4. SPECIAL OFFERS — colorful cards ==================== */}
        <section id="deals" className="py-24 lg:py-32 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffd60a] border-2 border-[#0d2233] rounded-full text-xs font-black tracking-wider uppercase mb-4">
                  <Tag className="w-3.5 h-3.5" /> Hot deals
                </div>
                <h2 className="font-black text-5xl lg:text-6xl xl:text-7xl text-[#0d2233] leading-[0.95] tracking-tight">
                  Sweet deals<br />
                  for <span className="text-[#ff6b35]">your trip!</span>
                </h2>
              </div>
              <a href="#all-deals" className="group inline-flex items-center gap-2 px-5 py-3 bg-white border-2 border-[#0d2233] rounded-full font-black text-sm hover:bg-[#0d2233] hover:text-white transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#ff6b35]">
                View all deals <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { title: "Early Bird", desc: "Book 30 days ahead", off: "15", bg: "bg-[#ffd60a]", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db9?auto=format&fit=crop&w=400&q=80" },
                { title: "Weekend Vibes", desc: "Friday → Monday fun", off: "10", bg: "bg-[#00b4d8]", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80" },
                { title: "Long Stay", desc: "7+ days = big save", off: "20", bg: "bg-[#ff5c8a]", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80" },
                { title: "Family Mode", desc: "Big rides, all ages", off: "12", bg: "bg-[#a3e635]", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80" },
              ].map((deal, i) => (
                <div key={deal.title} className={`${deal.bg} border-2 border-[#0d2233] rounded-3xl p-6 relative group cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#0d2233] transition-all ${i % 2 === 1 ? 'lg:translate-y-6' : ''}`}>
                  <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#0d2233] text-white border-2 border-[#0d2233] rounded-full flex flex-col items-center justify-center rotate-12 shadow-[3px_3px_0_0_#fff8f0]">
                    <span className="font-black text-xl leading-none">{deal.off}%</span>
                    <span className="text-[8px] font-bold tracking-wider">OFF</span>
                  </div>
                  <h3 className="font-black text-2xl text-[#0d2233] mt-4 mb-1">{deal.title}</h3>
                  <p className="text-sm font-medium text-[#0d2233]/80 mb-5">{deal.desc}</p>
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl border-2 border-[#0d2233] bg-white">
                    <img src={deal.img} alt={deal.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. FEATURED FLEET — chunky cards ==================== */}
        <section id="vehicles" className="py-24 lg:py-32 px-4 bg-[#0d2233] text-white relative overflow-hidden">
          {/* Decorative dots */}
          <div className="absolute top-10 left-10 grid grid-cols-8 gap-2 opacity-30">
            {[...Array(40)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-[#ffd60a] rounded-full" />)}
          </div>
          <div className="absolute bottom-10 right-10 grid grid-cols-8 gap-2 opacity-30">
            {[...Array(40)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-[#ff6b35] rounded-full" />)}
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff6b35] rounded-full text-xs font-black tracking-wider uppercase mb-4">
                  <Car className="w-3.5 h-3.5" /> The Fleet
                </div>
                <h2 className="font-black text-5xl lg:text-6xl xl:text-7xl leading-[0.95] tracking-tight">
                  Pick your<br />
                  <span className="text-[#ffd60a]">perfect ride.</span>
                </h2>
              </div>
              <a href="#all-vehicles" className="group inline-flex items-center gap-2 px-5 py-3 bg-[#ffd60a] text-[#0d2233] rounded-full font-black text-sm hover:bg-white transition-all hover:-translate-y-0.5">
                See all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Toyota Avanza", tag: "FAMILY", emoji: "🚐", seats: 7, trans: "Auto", cc: "1.3L", price: "450", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=600&q=80", color: "bg-[#ffd60a]" },
                { name: "Toyota Rush", tag: "ADVENTURE", emoji: "🏔️", seats: 7, trans: "Auto", cc: "1.5L", price: "550", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80", color: "bg-[#ff6b35]" },
                { name: "Honda HR-V", tag: "PREMIUM", emoji: "✨", seats: 5, trans: "Auto", cc: "1.8L", price: "600", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80", color: "bg-[#ff5c8a]" },
              ].map((car) => (
                <div key={car.name} className="bg-white text-[#0d2233] rounded-3xl border-2 border-[#0d2233] overflow-hidden hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#ffd60a] transition-all">
                  <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-[#0d2233]">
                    <img src={car.img} alt={car.name} className="w-full h-full object-cover" />
                    <div className={`absolute top-4 left-4 ${car.color} border-2 border-[#0d2233] rounded-full px-3 py-1 text-xs font-black`}>
                      {car.tag}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-black text-2xl">{car.name}</h3>
                      <span className="text-3xl">{car.emoji}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#0d2233]/60 font-bold mb-4">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {car.seats}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Cog className="w-3 h-3" /> {car.trans}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Gauge className="w-3 h-3" /> {car.cc}</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t-2 border-dashed border-[#0d2233]/20">
                      <div>
                        <span className="font-black text-2xl">Rp {car.price}K</span>
                        <span className="text-sm text-[#0d2233]/60 ml-1 font-bold">/day</span>
                      </div>
                      <button className="w-11 h-11 bg-[#0d2233] text-[#ffd60a] rounded-full flex items-center justify-center hover:bg-[#ff6b35] hover:text-white transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust */}
            <div className="mt-14 pt-10 border-t-2 border-dashed border-white/20 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: CheckCircle, t: "Well-maintained" },
                { icon: Tag, t: "Transparent pricing" },
                { icon: MapPin, t: "Island-wide" },
                { icon: Heart, t: "Loved by travelers" },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#ffd60a] text-[#0d2233] rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 6. DESTINATIONS — sticker collage ==================== */}
        <section id="spots" className="py-24 lg:py-32 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00b4d8] border-2 border-[#0d2233] text-white rounded-full text-xs font-black tracking-wider uppercase mb-4">
                  <Waves className="w-3.5 h-3.5" /> Top Spots
                </div>
                <h2 className="font-black text-5xl lg:text-6xl xl:text-7xl text-[#0d2233] leading-[0.95] tracking-tight">
                  Where to<br />
                  <span className="text-[#ff6b35]">go next?</span>
                </h2>
              </div>
              <a href="#all-spots" className="group inline-flex items-center gap-2 px-5 py-3 bg-[#0d2233] text-white border-2 border-[#0d2233] rounded-full font-black text-sm hover:bg-[#ff6b35] transition-all hover:-translate-y-0.5">
                Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { name: "Ubud", desc: "Rice & art", emoji: "🌾", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80", rotate: "rotate-[-2deg]" },
                { name: "Seminyak", desc: "Sunset bars", emoji: "🌅", img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80", rotate: "rotate-[2deg]" },
                { name: "Uluwatu", desc: "Cliffs & surf", emoji: "🏄", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80", rotate: "rotate-[-1deg]" },
                { name: "Nusa Penida", desc: "Crystal water", emoji: "💎", img: "https://images.unsplash.com/photo-1589817864531-ef00b149c23a?auto=format&fit=crop&w=600&q=80", rotate: "rotate-[1deg]" },
              ].map((d) => (
                <div key={d.name} className={`group cursor-pointer ${d.rotate} hover:rotate-0 transition-transform duration-500`}>
                  <div className="bg-white border-2 border-[#0d2233] rounded-3xl p-3 shadow-[6px_6px_0_0_#0d2233] hover:shadow-[8px_8px_0_0_#ff6b35] transition-all">
                    <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-3 relative border-2 border-[#0d2233]">
                      <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-3 right-3 w-10 h-10 bg-[#ffd60a] border-2 border-[#0d2233] rounded-full flex items-center justify-center text-xl">
                        {d.emoji}
                      </div>
                    </div>
                    <div className="px-2 pb-2 flex items-center justify-between">
                      <div>
                        <h3 className="font-black text-xl text-[#0d2233]">{d.name}</h3>
                        <p className="text-xs font-bold text-[#0d2233]/60">{d.desc}</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-[#ff6b35]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 7. TESTIMONIALS — chunky cards ==================== */}
        <section id="reviews" className="py-24 lg:py-32 px-4 bg-[#ffd60a] relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0d2233] text-[#ffd60a] rounded-full text-xs font-black tracking-wider uppercase mb-4">
                  <Heart className="w-3.5 h-3.5 fill-current" /> Real talk
                </div>
                <h2 className="font-black text-5xl lg:text-6xl xl:text-7xl text-[#0d2233] leading-[0.95] tracking-tight">
                  People<br />
                  <span className="italic">love us.</span> 💛
                </h2>
              </div>
              <div className="bg-white border-2 border-[#0d2233] rounded-3xl px-5 py-4 shadow-[4px_4px_0_0_#0d2233]">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#ff6b35] text-[#ff6b35]" />)}
                </div>
                <div className="font-black text-lg text-[#0d2233]">Excellent 4.9/5</div>
                <div className="text-xs font-bold text-[#0d2233]/60">2,000+ reviews</div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { text: "Spotless car, smooth airport pickup. Will book again!", name: "Sarah Mitchell", country: "🇦🇺 Sydney", img: "https://i.pravatar.cc/100?img=1", bg: "bg-white" },
                { text: "Best in Bali. Transparent pricing, no surprises. The 24/7 WhatsApp saved us!", name: "Marcus Chen", country: "🇸🇬 Singapore", img: "https://i.pravatar.cc/100?img=3", bg: "bg-[#ff6b35] text-white" },
                { text: "Free delivery to Ubud was huge. Kids loved the spacious ride!", name: "Emma Larsson", country: "🇸🇪 Sweden", img: "https://i.pravatar.cc/100?img=5", bg: "bg-white" },
                { text: "Super pro service. Delivered to our villa exactly on time.", name: "James Wilson", country: "🇬🇧 UK", img: "https://i.pravatar.cc/100?img=8", bg: "bg-[#00b4d8] text-white" },
              ].map((r, i) => (
                <div key={r.name} className={`${r.bg} border-2 border-[#0d2233] rounded-3xl p-6 ${i % 2 === 1 ? 'lg:translate-y-4' : ''} hover:-translate-y-1 transition-transform`}>
                  <Quote className="w-7 h-7 mb-3 opacity-80" />
                  <p className={`text-sm font-medium leading-relaxed mb-5`}>"{r.text}"</p>
                  <div className="flex items-center gap-3 pt-3 border-t-2 border-dashed border-current/20">
                    <img src={r.img} alt={r.name} className="w-10 h-10 rounded-full object-cover border-2 border-[#0d2233]" />
                    <div>
                      <div className="font-black text-sm">{r.name}</div>
                      <div className="text-xs font-bold opacity-70">{r.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 8. CTA — big bold ==================== */}
        <section className="py-24 lg:py-32 px-4 bg-[#0d2233] text-white relative overflow-hidden">
          <div className="absolute top-1/2 -left-32 w-96 h-96 bg-[#ff6b35] rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-40 -right-32 w-96 h-96 bg-[#ffd60a] rounded-full blur-3xl opacity-30" />

          <div className="relative max-w-7xl mx-auto text-center">
            <Sparkles className="w-12 h-12 fill-[#ffd60a] text-[#ffd60a] mx-auto mb-6" />
            <h2 className="font-black text-6xl sm:text-7xl lg:text-8xl xl:text-[140px] leading-[0.9] tracking-tight mb-8">
              Ready to<br />
              hit the road,<br />
              <span className="text-[#ffd60a]">friend?</span>
            </h2>
            <p className="text-white/70 text-lg lg:text-xl font-medium max-w-xl mx-auto mb-10">
              Your perfect ride is one click away. Let's make some memories!
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-14">
              <a href="#book" className="group inline-flex items-center gap-2 px-8 py-4 bg-[#ff6b35] border-2 border-[#ff6b35] text-white font-black rounded-full hover:bg-[#ffd60a] hover:text-[#0d2233] hover:border-[#ffd60a] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#ffd60a]">
                Book now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#vehicles" className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-black rounded-full hover:bg-white hover:text-[#0d2233] transition-all">
                View all vehicles
              </a>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { icon: Tag, title: "Best price", desc: "Match any rate" },
                { icon: Truck, title: "Free delivery", desc: "Anywhere in Bali" },
                { icon: Clock, title: "24/7 support", desc: "Always there" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white/10 border-2 border-white/20 rounded-3xl p-5 backdrop-blur">
                  <Icon className="w-7 h-7 text-[#ffd60a] mb-3" />
                  <div className="font-black text-base">{title}</div>
                  <div className="text-xs font-medium text-white/70 mt-0.5">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 9. FOOTER — playful cream ==================== */}
        <footer className="bg-[#fff8f0] pt-20 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 pb-12 border-b-2 border-dashed border-[#0d2233]/20">
              <div className="col-span-2 md:col-span-3 lg:col-span-2">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-10 h-10 bg-[#ff6b35] border-2 border-[#0d2233] rounded-full flex items-center justify-center -rotate-12">
                    <Car className="w-4 h-4 text-[#0d2233]" />
                  </div>
                  <div>
                    <div className="font-black text-lg text-[#0d2233]">Auto Ultimate</div>
                    <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#ff6b35]">Bali Crew</div>
                  </div>
                </div>
                <p className="text-sm font-medium text-[#0d2233]/70 mb-5 leading-relaxed max-w-xs">
                  Big rides for big adventures. Made with love in Bali. 🌴
                </p>
                <div className="flex gap-2.5">
                  {[
                    { Icon: Globe, label: "Website" },
                    { Icon: AtSign, label: "Social" },
                    { Icon: MessageCircle, label: "WhatsApp" },
                  ].map(({ Icon, label }) => (
                    <a key={label} href="#social" aria-label={label} className="w-10 h-10 bg-white border-2 border-[#0d2233] rounded-full flex items-center justify-center hover:bg-[#ff6b35] hover:text-white transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#0d2233]">
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
                  <h4 className="font-black text-xs tracking-[0.2em] uppercase text-[#ff6b35] mb-4">{col.head}</h4>
                  <ul className="space-y-2.5">
                    {col.items.map((i) => <li key={i}><a href="#" className="text-sm font-bold text-[#0d2233] hover:text-[#ff6b35] transition-colors">{i}</a></li>)}
                  </ul>
                </div>
              ))}

              <div>
                <h4 className="font-black text-xs tracking-[0.2em] uppercase text-[#ff6b35] mb-4">Contact</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm font-bold text-[#0d2233]"><Phone className="w-4 h-4 text-[#ff6b35]" /> +62 812 3456 7890</li>
                  <li className="flex items-center gap-2 text-sm font-bold text-[#0d2233]"><Mail className="w-4 h-4 text-[#ff6b35]" /> hello@autoultimate.id</li>
                  <li className="flex items-start gap-2 text-sm font-bold text-[#0d2233]"><MapPin className="w-4 h-4 text-[#ff6b35] shrink-0 mt-0.5" /> Ngurah Rai Airport, Bali</li>
                </ul>
              </div>

              <div className="col-span-2 md:col-span-3 lg:col-span-1">
                <h4 className="font-black text-xs tracking-[0.2em] uppercase text-[#ff6b35] mb-4">Newsletter</h4>
                <p className="text-xs font-medium text-[#0d2233]/70 mb-3">Get hot deals & travel tips</p>
                <input type="email" placeholder="your@email.com" className="w-full px-4 py-2.5 bg-white border-2 border-[#0d2233] rounded-full text-sm font-medium outline-none focus:bg-[#ffd60a] mb-2" />
                <button className="w-full py-2.5 bg-[#0d2233] text-[#ffd60a] text-sm font-black rounded-full hover:bg-[#ff6b35] hover:text-white transition-colors">Subscribe →</button>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold">
              <span className="text-[#0d2233]/60">© {new Date().getFullYear()} Auto Ultimate.</span>
              <span className="text-[#0d2233]/60">Made in Bali with love.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
