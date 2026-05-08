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
  Heart,
  Tag,
  Truck,
  Shield,
  Clock,
  Wallet,
  CheckCircle,
  User,
  Sparkles,
  Sunrise,
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

export default function V5() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useFullScreenRoot();

  return (
    <>
      <Helmet>
        <title>Auto Ultimate · Bali Romance Drives</title>
        <meta name="description" content="Romantic Bali car rental for couples, honeymooners, and dreamers." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#fef5ed] via-[#fef0e2] to-[#fde8d3] font-sans text-[#4a2818] antialiased">
        {/* ==================== 1. NAVBAR — soft warm ==================== */}
        <header className="sticky top-0 z-50 bg-[#fef5ed]/85 backdrop-blur-xl border-b border-[#c2410c]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-18 lg:h-20 py-3">
              <div className="flex items-center gap-2.5">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f97316] to-[#fb7185] rounded-2xl rotate-3" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Car className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="leading-tight">
                  <div className="font-serif text-[#4a2818] font-bold text-lg tracking-tight">Auto Ultimate</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#c2410c] font-semibold mt-0.5">Bali Romance</div>
                </div>
              </div>

              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((l) => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="text-[13px] font-medium text-[#4a2818]/80 hover:text-[#c2410c] transition-colors">
                    {l}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <a href="#signin" className="hidden sm:flex items-center gap-1.5 text-[13px] font-medium text-[#4a2818]/80 hover:text-[#c2410c]">
                  <User className="w-3.5 h-3.5" /> Sign in
                </a>
                <a href="#book" className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#f97316] to-[#fb7185] text-white text-[13px] font-bold rounded-full shadow-lg shadow-[#f97316]/30 hover:shadow-xl hover:shadow-[#f97316]/40 transition-all">
                  Book now <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button className="lg:hidden p-1.5 text-[#4a2818]" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
          {mobileOpen && (
            <div className="lg:hidden border-t border-[#c2410c]/10 bg-[#fef5ed]/95 backdrop-blur-xl px-4 py-5 space-y-3">
              {navLinks.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm font-medium text-[#4a2818]" onClick={() => setMobileOpen(false)}>{l}</a>
              ))}
              <div className="pt-3 border-t border-[#c2410c]/10 flex flex-col gap-3">
                <a href="#signin" className="flex items-center gap-2 text-sm font-medium"><User className="w-4 h-4" /> Sign in</a>
                <a href="#book" className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#f97316] to-[#fb7185] text-white text-sm font-bold rounded-full">
                  Book now <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </header>

        {/* ==================== 2. HERO — sunset gradient ==================== */}
        <section className="relative pt-12 lg:pt-20 pb-32 overflow-hidden">
          {/* Decorative sun glow */}
          <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-[#f59e0b]/30 via-[#fb7185]/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#fb7185]/20 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-[#f97316]/20 rounded-full mb-8 shadow-sm">
                  <Sunrise className="w-4 h-4 text-[#f97316]" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#c2410c]">
                    Reliable · Flexible · Island-wide
                  </span>
                </div>

                <h1 className="font-serif text-[#4a2818] text-6xl sm:text-7xl lg:text-8xl xl:text-[120px] font-medium leading-[0.95] tracking-tight mb-8">
                  Drive Bali.<br />
                  <span className="italic font-light bg-gradient-to-r from-[#f97316] via-[#fb7185] to-[#c2410c] bg-clip-text text-transparent">Make it</span><br />
                  unforgettable
                  <span className="text-[#f97316]">.</span>
                </h1>

                <p className="text-[#4a2818]/70 text-lg lg:text-xl leading-relaxed font-light mb-10 max-w-xl italic font-serif">
                  "An island, a sunset, the open road. Let us handle the keys — you handle the memories."
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <a href="#book" className="group inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-[#f97316] to-[#fb7185] text-white font-bold rounded-full shadow-xl shadow-[#f97316]/30 hover:shadow-2xl hover:shadow-[#f97316]/40 hover:-translate-y-0.5 transition-all">
                    Book your drive <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#vehicles" className="inline-flex items-center gap-2 px-7 py-4 bg-white/60 backdrop-blur-sm border border-[#c2410c]/20 text-[#4a2818] font-bold rounded-full hover:bg-white transition-all">
                    Browse fleet
                  </a>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 max-w-xl">
                  {[
                    { icon: Wallet, label: "No hidden fees" },
                    { icon: Truck, label: "Free delivery" },
                    { icon: Clock, label: "24/7 support" },
                    { icon: Shield, label: "Full insurance" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#fef0e2] to-[#fde8d3] rounded-2xl flex items-center justify-center border border-[#f97316]/20 shadow-sm">
                        <Icon className="w-4 h-4 text-[#c2410c]" />
                      </div>
                      <span className="text-sm font-semibold text-[#4a2818]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right hero — sunset photo with curved frame */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] max-w-md mx-auto">
                  {/* Glowing background */}
                  <div className="absolute -inset-8 bg-gradient-to-br from-[#f59e0b]/40 via-[#fb7185]/30 to-[#c2410c]/20 rounded-[60%] blur-2xl" />

                  {/* Image with curved mask */}
                  <div className="relative w-full h-full overflow-hidden rounded-[60%_40%_55%_45%/55%_45%_55%_45%] shadow-2xl shadow-[#c2410c]/20">
                    <img src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80" alt="Bali sunset" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#c2410c]/30 to-transparent" />
                  </div>

                  {/* Floating heart sticker */}
                  <div className="absolute -top-4 -left-4 lg:top-8 lg:-left-8 w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-[#fef0e2] rotate-[-12deg]">
                    <div className="text-center">
                      <Heart className="w-7 h-7 fill-[#fb7185] text-[#fb7185] mx-auto mb-0.5" />
                      <div className="text-[8px] font-bold text-[#4a2818] tracking-wide">FOR<br />COUPLES</div>
                    </div>
                  </div>

                  {/* Floating rating card */}
                  <div className="absolute -bottom-4 -right-4 lg:bottom-12 lg:-right-8 bg-white rounded-3xl shadow-2xl p-4 max-w-[200px] rotate-[6deg]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex -space-x-1.5">
                        {[1, 2, 3].map((i) => (
                          <img key={i} src={`https://i.pravatar.cc/100?img=${i + 30}`} alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                        ))}
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#f59e0b] text-[#f59e0b]" />)}
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-[#4a2818]">10,000+ couples</div>
                    <div className="text-[10px] text-[#4a2818]/60 italic font-serif">have driven with us</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0 h-12 lg:h-20" style={{
            background: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 80' preserveAspectRatio='none'><path fill='%23fff' fill-opacity='0.6' d='M0,32L60,37.3C120,43,240,53,360,48C480,43,600,21,720,16C840,11,960,21,1080,32C1200,43,1320,53,1380,58.7L1440,64L1440,80L0,80Z'></path></svg>\") no-repeat",
            backgroundSize: "100% 100%",
          }} />
        </section>

        {/* ==================== 3. BOOKING — soft floating card ==================== */}
        <section className="relative -mt-20 z-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto bg-white rounded-[40px] shadow-2xl shadow-[#c2410c]/10 border border-[#f97316]/10 p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="w-4 h-4 text-[#f97316]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#c2410c]">Plan your romance</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-end">
              {[
                { label: "Pickup", icon: MapPin, type: "select", options: ["Ngurah Rai Airport", "Ubud", "Seminyak", "Nusa Dua"] },
                { label: "Pick-up date", icon: Calendar, type: "datetime-local", value: "2026-05-10T10:00" },
                { label: "Return date", icon: Calendar, type: "datetime-local", value: "2026-05-15T10:00" },
                { label: "Vehicle", icon: Car, type: "select", options: ["All", "Convertible", "SUV", "Sedan"] },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[#c2410c] mb-2">{f.label}</label>
                  <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-br from-[#fef5ed] to-[#fef0e2] rounded-2xl border border-[#f97316]/15">
                    <f.icon className="w-4 h-4 text-[#c2410c] shrink-0" />
                    {f.type === "select" ? (
                      <select className="bg-transparent text-sm font-medium text-[#4a2818] w-full outline-none cursor-pointer">{f.options.map((o) => <option key={o}>{o}</option>)}</select>
                    ) : (
                      <input type={f.type} defaultValue={f.value} className="bg-transparent text-sm font-medium text-[#4a2818] w-full outline-none" />
                    )}
                  </div>
                </div>
              ))}
              <button className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#f97316] to-[#fb7185] text-white font-bold rounded-2xl shadow-lg shadow-[#f97316]/30 hover:shadow-xl hover:shadow-[#f97316]/40 hover:-translate-y-0.5 transition-all">
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
            <div className="mt-6 pt-5 border-t border-[#f97316]/10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs">
              {[
                { icon: CheckCircle, t: "Free cancellation" },
                { icon: Gauge, t: "Unlimited mileage" },
                { icon: Shield, t: "Full insurance" },
                { icon: Clock, t: "Flexible rentals" },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="flex items-center gap-1.5 text-[#4a2818]/70 font-medium">
                  <Icon className="w-3.5 h-3.5 text-[#f97316]" /> {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 4. SPECIAL OFFERS — soft warm cards ==================== */}
        <section id="deals" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-12 h-px bg-[#c2410c]" />
                <Heart className="w-4 h-4 fill-[#fb7185] text-[#fb7185]" />
                <span className="w-12 h-px bg-[#c2410c]" />
              </div>
              <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#c2410c] mb-3">Special offers</div>
              <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#4a2818] font-medium leading-[1] tracking-tight">
                Made with love, <br/>
                <span className="italic font-light bg-gradient-to-r from-[#f97316] to-[#fb7185] bg-clip-text text-transparent">just for you.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Early Bird", desc: "Plan ahead, save more on your dream trip", off: "15", grad: "from-[#fef0e2] to-[#fde8d3]", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db9?auto=format&fit=crop&w=400&q=80" },
                { title: "Weekend Getaway", desc: "Friday to Monday romance escapes", off: "10", grad: "from-[#fde8d3] to-[#fbd5b5]", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80" },
                { title: "Long Stay", desc: "7+ days, slow & meaningful drives", off: "20", grad: "from-[#fce8df] to-[#fbcfc8]", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80" },
                { title: "Anniversary", desc: "A little gift for celebrating love", off: "12", grad: "from-[#fbe5e8] to-[#fac4cd]", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80" },
              ].map((deal) => (
                <div key={deal.title} className={`bg-gradient-to-br ${deal.grad} rounded-[32px] p-6 relative overflow-hidden group cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#c2410c]/10 transition-all`}>
                  <div className="absolute top-5 right-5 bg-white rounded-full px-3 py-1.5 shadow-md">
                    <div className="flex items-baseline gap-0.5">
                      <span className="font-serif font-bold text-2xl text-[#c2410c]">{deal.off}</span>
                      <span className="text-xs font-bold text-[#c2410c]">% OFF</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl text-[#4a2818] mt-2 mb-2">{deal.title}</h3>
                  <p className="text-sm text-[#4a2818]/70 italic font-serif mb-6 leading-relaxed">{deal.desc}</p>
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white/50">
                    <img src={deal.img} alt={deal.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. FEATURED FLEET — elegant cards ==================== */}
        <section id="vehicles" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#fbe9d4] via-[#fde8d3] to-[#fce8df]">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
              <div className="lg:col-span-7">
                <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#c2410c] mb-3">Curated fleet</div>
                <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#4a2818] font-medium leading-[1] tracking-tight">
                  Drive in<br />
                  <span className="italic font-light bg-gradient-to-r from-[#f97316] to-[#fb7185] bg-clip-text text-transparent">style.</span>
                </h2>
              </div>
              <div className="lg:col-span-5 lg:text-right">
                <a href="#all-vehicles" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#c2410c] font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all border border-[#f97316]/10">
                  View all vehicles <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Toyota Avanza", tag: "Spacious", seats: 7, trans: "Auto", cc: "1.3L", price: "450", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=600&q=80" },
                { name: "Toyota Rush", tag: "Adventurous", seats: 7, trans: "Auto", cc: "1.5L", price: "550", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80" },
                { name: "Honda HR-V", tag: "Premium", seats: 5, trans: "Auto", cc: "1.8L", price: "600", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" },
              ].map((car) => (
                <div key={car.name} className="bg-white rounded-[32px] overflow-hidden shadow-lg shadow-[#c2410c]/5 hover:shadow-2xl hover:shadow-[#c2410c]/15 transition-all hover:-translate-y-1 group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-[#c2410c] text-[10px] font-bold rounded-full uppercase tracking-[0.15em]">
                      {car.tag}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-[#4a2818] mb-3">{car.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#4a2818]/60 font-medium mb-5">
                      <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#f97316]" /> {car.seats}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1.5"><Cog className="w-3.5 h-3.5 text-[#f97316]" /> {car.trans}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5 text-[#f97316]" /> {car.cc}</span>
                    </div>
                    <div className="flex items-end justify-between pt-5 border-t border-[#f97316]/10">
                      <div>
                        <div className="text-[10px] text-[#4a2818]/50 uppercase tracking-wider mb-0.5">Starting from</div>
                        <div className="font-serif text-3xl text-[#c2410c]">Rp {car.price}K<span className="text-sm text-[#4a2818]/50 ml-1 font-sans">/day</span></div>
                      </div>
                      <button className="w-11 h-11 bg-gradient-to-br from-[#f97316] to-[#fb7185] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#f97316]/30 hover:shadow-xl hover:scale-110 transition-all">
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-[#f97316]/15">
              {[
                { icon: CheckCircle, t: "Well-maintained" },
                { icon: Tag, t: "Transparent pricing" },
                { icon: MapPin, t: "Island-wide" },
                { icon: Heart, t: "Loved by couples" },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Icon className="w-4 h-4 text-[#c2410c]" />
                  </div>
                  <span className="text-sm font-semibold text-[#4a2818]">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 6. DESTINATIONS — romantic gallery ==================== */}
        <section id="destinations" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#c2410c] mb-3">Romantic spots</div>
              <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#4a2818] font-medium leading-[1] tracking-tight">
                Places that <br/>
                <span className="italic font-light bg-gradient-to-r from-[#f97316] to-[#fb7185] bg-clip-text text-transparent">steal hearts.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Ubud", caption: "where rice fields meet the sky", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80", span: "lg:row-span-2", aspect: "lg:h-full" },
                { name: "Seminyak", caption: "for sunset cocktails à deux", img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=700&q=80", aspect: "aspect-[4/3]" },
                { name: "Uluwatu", caption: "cliff temples & ocean breeze", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=700&q=80", aspect: "aspect-[4/3]" },
                { name: "Nusa Penida", caption: "crystal waters, secret bays", img: "https://images.unsplash.com/photo-1589817864531-ef00b149c23a?auto=format&fit=crop&w=700&q=80", aspect: "aspect-[4/3]" },
                { name: "Canggu", caption: "surf, brunch, repeat", img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=700&q=80", aspect: "aspect-[4/3]" },
              ].map((d) => (
                <div key={d.name} className={`group cursor-pointer ${d.span || ''} relative overflow-hidden rounded-[32px] ${d.aspect}`}>
                  <img src={d.img} alt={d.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4a2818]/80 via-[#4a2818]/20 to-transparent" />
                  <div className="absolute top-5 right-5 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-[#f97316] group-hover:text-white transition-all">
                    <ArrowUpRight className="w-5 h-5 text-[#c2410c] group-hover:text-white transition-colors" />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-serif text-white text-3xl font-medium mb-1">{d.name}</h3>
                    <p className="text-white/85 text-sm italic font-serif">{d.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 7. TESTIMONIALS — heart-warming ==================== */}
        <section id="reviews" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#fef0e2] to-[#fde8d3]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-white rounded-full px-5 py-3 shadow-md mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />)}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-[#4a2818]">Excellent 4.9/5</span>
                  <span className="text-[#4a2818]/60"> · 2,000+ couples</span>
                </div>
              </div>
              <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-[#4a2818] font-medium leading-[1] tracking-tight">
                Stories from <br/>
                <span className="italic font-light bg-gradient-to-r from-[#f97316] to-[#fb7185] bg-clip-text text-transparent">our travelers.</span>
              </h2>
            </div>

            {/* Featured review */}
            <div className="bg-white rounded-[40px] p-8 lg:p-12 shadow-xl shadow-[#c2410c]/10 mb-8 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-[#fbe9d4] to-[#fce8df] rounded-full blur-3xl" />
              <div className="relative grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <Quote className="w-10 h-10 text-[#f97316] mb-4" />
                  <p className="font-serif text-2xl lg:text-3xl text-[#4a2818] italic leading-[1.4] mb-6">
                    "Driving the cliffs of Uluwatu at sunset, hand-in-hand with my partner — this is exactly the trip we'd dreamed of. Auto Ultimate made it effortless."
                  </p>
                  <div className="flex items-center gap-4">
                    <img src="https://i.pravatar.cc/100?img=1" alt="Sarah" className="w-14 h-14 rounded-full object-cover ring-4 ring-[#fef0e2]" />
                    <div>
                      <div className="font-bold text-[#4a2818]">Sarah & Tom Mitchell</div>
                      <div className="text-sm text-[#4a2818]/60 italic font-serif">Honeymooners · Sydney, Australia</div>
                    </div>
                  </div>
                </div>
                <div className="aspect-square rounded-3xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=500&q=80" alt="Uluwatu" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { text: "Pickup was seamless. The team felt like family from minute one.", name: "Marcus Chen", country: "Singapore", img: "https://i.pravatar.cc/100?img=3" },
                { text: "Free delivery to our villa was magic. Spotless car, gentle service.", name: "Emma Larsson", country: "Sweden", img: "https://i.pravatar.cc/100?img=5" },
                { text: "Made our anniversary unforgettable. Cannot recommend enough.", name: "James & Aisha", country: "Malaysia", img: "https://i.pravatar.cc/100?img=8" },
              ].map((r) => (
                <div key={r.name} className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-[#f97316]/10">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />)}
                  </div>
                  <p className="font-serif italic text-[#4a2818] leading-relaxed mb-5">"{r.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#f97316]/10">
                    <img src={r.img} alt={r.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-sm text-[#4a2818]">{r.name}</div>
                      <div className="text-xs text-[#4a2818]/60 italic font-serif">{r.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 8. CTA — sunset banner ==================== */}
        <section className="relative overflow-hidden">
          <div className="relative h-[500px] lg:h-[550px]">
            <img src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80" alt="Bali sunset" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#c2410c]/95 via-[#f97316]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#4a2818]/30" />

            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full mb-6">
                    <Heart className="w-3.5 h-3.5 fill-white text-white" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">Begin your story</span>
                  </div>
                  <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-medium text-white leading-[1] mb-6">
                    Ready to fall <br/>
                    <span className="italic font-light">in love</span> with <br/>
                    Bali?
                  </h2>
                  <p className="font-serif italic text-white/90 text-lg lg:text-xl mb-8 max-w-md">
                    Your perfect ride is waiting. Drive into golden hours, side by side.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="#book" className="inline-flex items-center gap-2 px-7 py-4 bg-white text-[#c2410c] font-bold rounded-full hover:bg-[#fef5ed] transition-colors shadow-2xl">
                      Book your drive <ArrowRight className="w-4 h-4" />
                    </a>
                    <a href="#vehicles" className="inline-flex items-center px-7 py-4 border-2 border-white/40 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                      View all vehicles
                    </a>
                  </div>
                </div>
                <div className="hidden lg:block space-y-4">
                  {[
                    { icon: Tag, title: "Best price guarantee", desc: "We match competitor pricing" },
                    { icon: Truck, title: "Free delivery", desc: "Anywhere across Bali" },
                    { icon: Clock, title: "24/7 local support", desc: "Real humans, anytime" },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-4 bg-white/15 backdrop-blur-md border border-white/25 rounded-3xl p-5">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-[#c2410c]" />
                      </div>
                      <div>
                        <div className="font-bold text-white">{title}</div>
                        <div className="text-sm text-white/80 italic font-serif mt-0.5">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 9. FOOTER — warm cream ==================== */}
        <footer className="bg-gradient-to-b from-[#fef5ed] to-[#fde8d3] pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 pb-12 border-b border-[#c2410c]/15">
              <div className="col-span-2 md:col-span-3 lg:col-span-2">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f97316] to-[#fb7185] rounded-2xl rotate-3" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Car className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="font-serif text-lg text-[#4a2818] font-bold">Auto Ultimate</div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-[#c2410c] font-semibold">Bali Romance</div>
                  </div>
                </div>
                <p className="text-sm text-[#4a2818]/70 italic font-serif mb-5 leading-relaxed max-w-xs">
                  Romantic Bali drives, made with care. For the dreamers and the lovers.
                </p>
                <div className="flex gap-2.5">
                  {[
                    { Icon: Globe, label: "Website" },
                    { Icon: AtSign, label: "Social" },
                    { Icon: MessageCircle, label: "WhatsApp" },
                  ].map(({ Icon, label }) => (
                    <a key={label} href="#social" aria-label={label} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#c2410c] hover:bg-gradient-to-br hover:from-[#f97316] hover:to-[#fb7185] hover:text-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5">
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
                  <h4 className="font-serif italic text-base text-[#c2410c] mb-4">{col.head}</h4>
                  <ul className="space-y-2.5">
                    {col.items.map((i) => <li key={i}><a href="#" className="text-sm font-medium text-[#4a2818]/80 hover:text-[#c2410c] transition-colors">{i}</a></li>)}
                  </ul>
                </div>
              ))}

              <div>
                <h4 className="font-serif italic text-base text-[#c2410c] mb-4">Contact</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-[#4a2818]/80"><Phone className="w-4 h-4 text-[#f97316]" /> +62 812 3456 7890</li>
                  <li className="flex items-center gap-2 text-sm text-[#4a2818]/80"><Mail className="w-4 h-4 text-[#f97316]" /> hello@autoultimate.id</li>
                  <li className="flex items-start gap-2 text-sm text-[#4a2818]/80"><MapPin className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" /> Ngurah Rai Airport, Bali</li>
                </ul>
              </div>

              <div className="col-span-2 md:col-span-3 lg:col-span-1">
                <h4 className="font-serif italic text-base text-[#c2410c] mb-4">Newsletter</h4>
                <p className="text-xs text-[#4a2818]/70 italic font-serif mb-3">Quarterly love letters from Bali</p>
                <input type="email" placeholder="your@email.com" className="w-full px-4 py-2.5 bg-white border border-[#f97316]/15 rounded-full text-sm outline-none focus:border-[#f97316] mb-2 text-[#4a2818]" />
                <button className="w-full py-2.5 bg-gradient-to-r from-[#f97316] to-[#fb7185] text-white text-sm font-bold rounded-full shadow-lg shadow-[#f97316]/30 hover:shadow-xl hover:shadow-[#f97316]/40 transition-all">
                  Subscribe with love
                </button>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[#4a2818]/60">© {new Date().getFullYear()} Auto Ultimate.</span>
              <span className="text-[#4a2818]/60 italic font-serif">Made with love in Bali · Drive into the sunset.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
