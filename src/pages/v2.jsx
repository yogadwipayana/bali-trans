import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Menu,
  X,
  User,
  ArrowRight,
  ArrowUpRight,
  Shield,
  Clock,
  Truck,
  Wallet,
  Search,
  Star,
  MapPin,
  Calendar,
  Car,
  CheckCircle,
  Gauge,
  Users,
  Cog,
  Tag,
  Phone,
  Mail,
  MessageCircle,
  Quote,
  Globe,
  AtSign,
  Sparkles,
  Award,
  Plus,
} from "lucide-react";

const navLinks = [
  "Vehicles",
  "Deals",
  "Destinations",
  "Services",
  "Reviews",
  "About",
  "Contact",
];

export default function V2() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Break out of the global #root width constraint for full-screen layout
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

  return (
    <>
      <Helmet>
        <title>Auto Ultimate · Luxury Bali Car Rental</title>
        <meta name="description" content="Premium luxury car rental experience in Bali with island-wide concierge service." />
      </Helmet>

      <div className="min-h-screen bg-[#fafaf7] font-sans text-[#3a3a3a] antialiased">
        {/* ==================== 1. FLOATING GLASS NAVBAR ==================== */}
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl">
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-full shadow-[0_8px_32px_rgba(6,78,59,0.08)] px-4 lg:px-6">
            <div className="flex items-center justify-between h-14 lg:h-16">
              {/* Logo */}
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="w-9 h-9 bg-gradient-to-br from-[#064e3b] to-[#0f766e] rounded-full flex items-center justify-center shadow-md">
                  <Car className="w-4 h-4 text-[#d4a574]" />
                </div>
                <div className="leading-tight">
                  <div className="text-[#064e3b] font-serif font-bold text-base tracking-tight">Auto Ultimate</div>
                  <div className="text-[10px] text-[#9ca3a0] tracking-[0.15em] uppercase -mt-0.5">Bali Rental</div>
                </div>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-7">
                {navLinks.map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-[13px] font-medium text-[#4a4a4a] hover:text-[#064e3b] transition-colors"
                  >
                    {l}
                  </a>
                ))}
              </nav>

              {/* Right Actions */}
              <div className="flex items-center gap-2 lg:gap-3">
                <a href="#signin" className="hidden sm:flex items-center gap-1.5 text-[13px] font-medium text-[#4a4a4a] hover:text-[#064e3b] px-3">
                  <User className="w-3.5 h-3.5" />
                  Sign in
                </a>
                <a
                  href="#book"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#064e3b] text-white text-[13px] font-semibold rounded-full hover:bg-[#0a3d2f] transition-all hover:gap-2"
                >
                  Book now
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  className="lg:hidden p-1.5 text-[#064e3b]"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-5 space-y-3">
              {navLinks.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                  className="block text-sm font-medium text-[#4a4a4a]"
                  onClick={() => setMobileOpen(false)}
                >
                  {l}
                </a>
              ))}
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
                <a href="#signin" className="flex items-center gap-2 text-sm font-medium text-[#4a4a4a]">
                  <User className="w-4 h-4" /> Sign in
                </a>
                <a href="#book" className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#064e3b] text-white text-sm font-semibold rounded-full">
                  Book now <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </header>

        {/* ==================== 2. DRAMATIC DARK HERO ==================== */}
        <section className="relative pt-28 lg:pt-32 pb-32 overflow-hidden">
          {/* Background image with gradient overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80"
              alt="Bali landscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#064e3b]/95 via-[#0a1f1c]/85 to-[#064e3b]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf7] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Left content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#d4a574]/20 border border-[#d4a574]/40 backdrop-blur-sm rounded-full mb-8">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4a574]" />
                  <span className="text-[#d4a574] text-[11px] font-bold tracking-[0.2em] uppercase">
                    Reliable · Flexible · Island-wide
                  </span>
                </div>

                <h1 className="font-serif text-white text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] font-bold leading-[0.95] tracking-tight mb-6">
                  Drive Bali.<br />
                  <span className="italic font-light text-[#d4a574]">Make it</span><br />
                  unforgettable.
                </h1>

                <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-lg">
                  A premium fleet, curated routes, and concierge support — your island adventure starts the moment you arrive.
                </p>

                {/* Glass feature cards */}
                <div className="grid grid-cols-2 gap-3 max-w-xl mb-10">
                  {[
                    { icon: Wallet, label: "No hidden fees" },
                    { icon: Truck, label: "Free delivery" },
                    { icon: Clock, label: "24/7 support" },
                    { icon: Shield, label: "Full insurance" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl">
                      <div className="w-8 h-8 bg-[#d4a574]/20 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#d4a574]" />
                      </div>
                      <span className="text-white text-sm font-medium">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/100?img=${i + 20}`}
                        alt="Customer"
                        className="w-10 h-10 rounded-full border-2 border-[#064e3b] object-cover"
                      />
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-[#064e3b] bg-[#d4a574] flex items-center justify-center text-[#064e3b] text-xs font-bold">
                      <Plus className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">10,000+ happy travelers</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#d4a574] text-[#d4a574]" />
                      ))}
                      <span className="text-white/80 text-xs ml-1.5">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right floating cards */}
              <div className="lg:col-span-5 hidden lg:block">
                <div className="relative h-[500px]">
                  {/* Main card */}
                  <div className="absolute top-0 right-0 w-[320px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-5 rotate-[3deg] hover:rotate-0 transition-transform duration-500">
                    <img
                      src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=600&q=80"
                      alt="Luxury SUV"
                      className="w-full h-44 object-cover rounded-2xl mb-4"
                    />
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs text-[#9ca3a0] uppercase tracking-wider">Featured</div>
                        <div className="font-serif font-bold text-[#064e3b] text-lg">Toyota Fortuner</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[#064e3b] font-bold">Rp 850K</div>
                        <div className="text-xs text-[#9ca3a0]">/day</div>
                      </div>
                    </div>
                  </div>

                  {/* Best price badge */}
                  <div className="absolute top-1/2 -left-4 bg-[#d4a574] rounded-full w-32 h-32 flex flex-col items-center justify-center text-center shadow-2xl rotate-[-12deg] border-4 border-[#fafaf7]">
                    <Award className="w-7 h-7 text-[#064e3b] mb-1" />
                    <div className="text-[#064e3b] font-bold text-[10px] leading-tight">BEST PRICE</div>
                    <div className="text-[#064e3b] font-bold text-[10px] leading-tight">GUARANTEE</div>
                  </div>

                  {/* Stats card */}
                  <div className="absolute bottom-0 right-12 bg-[#0a1f1c]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 w-[260px]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="font-serif text-[#d4a574] text-3xl font-bold">100+</div>
                        <div className="text-white/60 text-xs mt-1">Vehicles</div>
                      </div>
                      <div>
                        <div className="font-serif text-[#d4a574] text-3xl font-bold">24/7</div>
                        <div className="text-white/60 text-xs mt-1">Support</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 3. BOOKING WIDGET (Floating, asymmetric) ==================== */}
        <section className="relative -mt-20 z-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(6,78,59,0.15)] border border-[#e8e6df] overflow-hidden">
              <div className="grid lg:grid-cols-[1fr_auto] items-stretch">
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-5">
                    <Search className="w-4 h-4 text-[#064e3b]" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#064e3b]">Find your perfect ride</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                      { label: "Pickup location", icon: MapPin, type: "select", options: ["Denpasar Airport", "Ubud", "Seminyak", "Kuta"] },
                      { label: "Pick-up date", icon: Calendar, type: "datetime-local", value: "2026-05-10T10:00" },
                      { label: "Return date", icon: Calendar, type: "datetime-local", value: "2026-05-15T10:00" },
                      { label: "Vehicle type", icon: Car, type: "select", options: ["All", "SUV", "MPV", "Sedan"] },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-[10px] font-bold text-[#9ca3a0] mb-1.5 uppercase tracking-[0.15em]">{field.label}</label>
                        <div className="flex items-center gap-2 pb-2 border-b-2 border-[#e8e6df] focus-within:border-[#064e3b] transition-colors">
                          <field.icon className="w-4 h-4 text-[#064e3b] shrink-0" />
                          {field.type === "select" ? (
                            <select className="bg-transparent text-sm font-medium text-[#3a3a3a] outline-none w-full cursor-pointer">
                              {field.options.map((o) => <option key={o}>{o}</option>)}
                            </select>
                          ) : (
                            <input type={field.type} defaultValue={field.value} className="bg-transparent text-sm font-medium text-[#3a3a3a] outline-none w-full" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#064e3b] to-[#0a3d2f] flex items-stretch">
                  <button className="flex flex-col items-center justify-center gap-2 px-8 lg:px-10 py-6 lg:py-0 text-white w-full hover:bg-[#0a3d2f] transition-colors group">
                    <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold">Search</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#d4a574]">vehicles</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Trust strip */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {[
                { icon: CheckCircle, text: "Free cancellation" },
                { icon: Gauge, text: "Unlimited mileage" },
                { icon: Shield, text: "Full insurance" },
                { icon: Clock, text: "Flexible rentals" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-[13px] text-[#6a6a6a]">
                  <Icon className="w-4 h-4 text-[#d4a574]" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 4. SPECIAL OFFERS (Magazine-style) ==================== */}
        <section id="deals" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
              <div>
                <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#d4a574] mb-3">— Promotions</div>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#064e3b] tracking-tight">
                  Special offers for<br />
                  <span className="italic font-light">your Bali trip</span>
                </h2>
              </div>
              <a href="#all-deals" className="group flex items-center gap-2 text-sm font-semibold text-[#064e3b]">
                View all deals
                <span className="w-9 h-9 rounded-full bg-[#064e3b] text-white flex items-center justify-center group-hover:bg-[#d4a574] group-hover:text-[#064e3b] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  title: "Early Bird Saver",
                  desc: "Book 30 days ahead and save big",
                  discount: "15",
                  bg: "bg-[#fdf6e9]",
                  accent: "#d4a574",
                  img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db9?auto=format&fit=crop&w=400&q=80",
                },
                {
                  title: "Weekend Escape",
                  desc: "Friday to Monday adventures",
                  discount: "10",
                  bg: "bg-[#e9f3ee]",
                  accent: "#064e3b",
                  img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80",
                },
                {
                  title: "Long Stay Value",
                  desc: "7+ days, discounted daily rates",
                  discount: "20",
                  bg: "bg-[#f3edfe]",
                  accent: "#5b21b6",
                  img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80",
                },
                {
                  title: "Family Adventure",
                  desc: "Spacious vehicles for families",
                  discount: "12",
                  bg: "bg-[#fde9e9]",
                  accent: "#9f1239",
                  img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80",
                },
              ].map((deal, idx) => (
                <div
                  key={deal.title}
                  className={`${deal.bg} rounded-3xl p-6 relative overflow-hidden group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl ${idx % 2 === 1 ? 'lg:translate-y-6' : ''}`}
                >
                  <div className="flex items-baseline gap-1 mb-1" style={{ color: deal.accent }}>
                    <span className="font-serif text-5xl font-bold">{deal.discount}</span>
                    <span className="text-xl font-bold">%</span>
                    <span className="text-xs ml-1 font-bold uppercase tracking-wider">OFF</span>
                  </div>
                  <h3 className="font-serif font-bold text-[#1a1a1a] text-xl mt-4 mb-1">{deal.title}</h3>
                  <p className="text-sm text-[#6a6a6a] mb-6">{deal.desc}</p>
                  <div className="relative h-28 -mx-6 -mb-6 rounded-b-3xl overflow-hidden">
                    <img
                      src={deal.img}
                      alt={deal.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. FEATURED FLEET (Dark contrast section) ==================== */}
        <section id="vehicles" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a1f1c] text-white relative overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#064e3b] rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#d4a574] rounded-full blur-3xl opacity-10" />

          <div className="relative max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
              <div>
                <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#d4a574] mb-3">— Curated fleet</div>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold tracking-tight">
                  Featured<br />
                  <span className="italic font-light text-[#d4a574]">vehicles</span>
                </h2>
              </div>
              <a href="#all-vehicles" className="group flex items-center gap-2 text-sm font-semibold text-white">
                View all vehicles
                <span className="w-9 h-9 rounded-full bg-[#d4a574] text-[#064e3b] flex items-center justify-center group-hover:bg-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Toyota Avanza",
                  tag: "Family",
                  seats: 7,
                  trans: "Auto",
                  cc: "1.3L",
                  price: "450",
                  img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: "Toyota Rush",
                  tag: "Adventure",
                  seats: 7,
                  trans: "Auto",
                  cc: "1.5L",
                  price: "550",
                  img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: "Honda HR-V",
                  tag: "Premium",
                  seats: 5,
                  trans: "Auto",
                  cc: "1.8L",
                  price: "600",
                  img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
                },
              ].map((car) => (
                <div key={car.name} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden group hover:bg-white/10 transition-all">
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#064e3b]/40 to-transparent">
                    <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#d4a574] text-[#064e3b] text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {car.tag}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-2xl mb-3">{car.name}</h3>
                    <div className="flex items-center gap-4 text-xs text-white/60 mb-5">
                      <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#d4a574]" /> {car.seats} seats</span>
                      <span className="flex items-center gap-1.5"><Cog className="w-3.5 h-3.5 text-[#d4a574]" /> {car.trans}</span>
                      <span className="flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5 text-[#d4a574]" /> {car.cc}</span>
                    </div>
                    <div className="flex items-end justify-between pt-5 border-t border-white/10">
                      <div>
                        <div className="text-xs text-white/50">Starting from</div>
                        <div className="font-serif text-3xl font-bold text-[#d4a574]">
                          Rp {car.price}K<span className="text-sm font-normal text-white/50 ml-1">/day</span>
                        </div>
                      </div>
                      <button className="w-11 h-11 bg-[#d4a574] text-[#064e3b] rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 pt-10 border-t border-white/10">
              {[
                { icon: CheckCircle, text: "Well-maintained vehicles" },
                { icon: Tag, text: "Transparent pricing" },
                { icon: MapPin, text: "Island-wide support" },
                { icon: Star, text: "Trusted by travelers" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#d4a574] shrink-0" />
                  <span className="text-sm text-white/80">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 6. DESTINATIONS (Mosaic asymmetric) ==================== */}
        <section id="destinations" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
              <div>
                <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#d4a574] mb-3">— Destinations</div>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#064e3b] tracking-tight">
                  Top spots in<br />
                  <span className="italic font-light">paradise.</span>
                </h2>
              </div>
              <a href="#all-destinations" className="group flex items-center gap-2 text-sm font-semibold text-[#064e3b]">
                Explore more
                <span className="w-9 h-9 rounded-full bg-[#064e3b] text-white flex items-center justify-center group-hover:bg-[#d4a574] group-hover:text-[#064e3b] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </div>

            {/* Asymmetric mosaic grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:h-[600px]">
              {/* Big card */}
              <div className="lg:row-span-2 group relative rounded-3xl overflow-hidden cursor-pointer min-h-[400px] lg:min-h-0">
                <img
                  src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
                  alt="Ubud"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-5 right-5 w-11 h-11 bg-white/95 rounded-full flex items-center justify-center group-hover:bg-[#d4a574] transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-[#064e3b]" />
                </div>
                <div className="absolute bottom-7 left-7 right-7">
                  <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#d4a574] mb-2">Featured</div>
                  <h3 className="font-serif text-white text-4xl font-bold mb-2">Ubud</h3>
                  <p className="text-white/80 text-sm max-w-xs">Rice terraces, art villages, and the spiritual heart of Bali</p>
                </div>
              </div>

              {[
                {
                  name: "Seminyak",
                  desc: "Beach clubs & sunset bars",
                  img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: "Uluwatu",
                  desc: "Cliff temple & surf breaks",
                  img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: "Nusa Penida",
                  desc: "Crystal waters & cliffs",
                  img: "https://images.unsplash.com/photo-1589817864531-ef00b149c23a?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: "Canggu",
                  desc: "Surf & cafe culture",
                  img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=600&q=80",
                },
              ].slice(0, 4).map((dest, idx) => (
                <div
                  key={dest.name}
                  className={`group relative rounded-3xl overflow-hidden cursor-pointer min-h-[200px] ${idx === 3 ? 'hidden lg:block' : ''}`}
                >
                  <img
                    src={dest.img}
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 right-4 w-9 h-9 bg-white/95 rounded-full flex items-center justify-center group-hover:bg-[#d4a574] transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-[#064e3b]" />
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="font-serif text-white text-xl font-bold">{dest.name}</h3>
                    <p className="text-white/80 text-xs mt-0.5">{dest.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 7. TESTIMONIALS (Big featured + smaller) ==================== */}
        <section id="reviews" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#f5f3ec]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
              <div>
                <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#d4a574] mb-3">— Testimonials</div>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#064e3b] tracking-tight">
                  Loved by<br />
                  <span className="italic font-light">travelers.</span>
                </h2>
              </div>
              <div className="flex items-center gap-4 bg-white px-5 py-4 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-[#22c55e] rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 fill-white text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#22c55e] text-[#22c55e]" />
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-bold text-[#064e3b]">Excellent 4.9/5</span>
                  </div>
                  <div className="text-xs text-[#9ca3a0]">based on 2,000+ reviews</div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Featured big testimonial */}
              <div className="lg:col-span-1 bg-[#064e3b] text-white rounded-3xl p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#d4a574]/20 rounded-full blur-2xl" />
                <Quote className="w-12 h-12 text-[#d4a574] mb-6" />
                <p className="font-serif text-xl lg:text-2xl leading-relaxed mb-8 italic">
                  "The car was spotless and the pickup at the airport was seamless. Will definitely book again on my next Bali trip!"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <img src="https://i.pravatar.cc/100?img=1" alt="Sarah" className="w-14 h-14 rounded-full object-cover ring-2 ring-[#d4a574]" />
                  <div>
                    <div className="font-bold text-white">Sarah Mitchell</div>
                    <div className="text-sm text-white/60">Sydney, Australia</div>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#d4a574] text-[#d4a574]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Smaller reviews */}
              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
                {[
                  {
                    text: "Best car rental experience in Bali. Transparent pricing, no hidden fees, and the 24/7 WhatsApp support saved us twice!",
                    name: "Marcus Chen",
                    country: "Singapore",
                    img: "https://i.pravatar.cc/100?img=3",
                  },
                  {
                    text: "Rented an SUV for our family of 6. Free delivery to Ubud was a huge plus. Kids loved the spacious ride.",
                    name: "Emma Larsson",
                    country: "Sweden",
                    img: "https://i.pravatar.cc/100?img=5",
                  },
                  {
                    text: "Super professional service. The car was delivered to our villa in Seminyak exactly on time. Highly recommended!",
                    name: "James Wilson",
                    country: "United Kingdom",
                    img: "https://i.pravatar.cc/100?img=8",
                  },
                  {
                    text: "Amazing experience from start to finish. The team made our anniversary trip truly special with a beautiful upgrade.",
                    name: "Aisha Rahman",
                    country: "Malaysia",
                    img: "https://i.pravatar.cc/100?img=9",
                  },
                ].map((review) => (
                  <div key={review.name} className="bg-white rounded-2xl p-6 border border-[#e8e6df]">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#22c55e] text-[#22c55e]" />
                      ))}
                    </div>
                    <p className="text-sm text-[#3a3a3a] leading-relaxed mb-5">"{review.text}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-[#e8e6df]">
                      <img src={review.img} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-[#064e3b] text-sm">{review.name}</div>
                        <div className="text-xs text-[#9ca3a0]">{review.country}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 8. CTA BANNER (Dramatic full-bleed) ==================== */}
        <section className="relative overflow-hidden">
          <div className="relative h-[500px] lg:h-[450px]">
            <img
              src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80"
              alt="Bali sunset"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#064e3b] via-[#064e3b]/85 to-[#064e3b]/30" />

            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                <div>
                  <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#d4a574] mb-4">— Start your journey</div>
                  <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.05] mb-6">
                    Ready to explore<br />
                    <span className="italic font-light text-[#d4a574]">Bali?</span>
                  </h2>
                  <p className="text-white/80 text-lg mb-8 max-w-md">
                    Book your perfect ride today and experience the island with freedom and comfort.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="#book" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#d4a574] text-[#064e3b] font-bold rounded-full hover:bg-white transition-colors">
                      Book now <ArrowRight className="w-4 h-4" />
                    </a>
                    <a href="#vehicles" className="inline-flex items-center px-6 py-3.5 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
                      View all vehicles
                    </a>
                  </div>
                </div>
                <div className="hidden lg:block space-y-4">
                  {[
                    { icon: Tag, title: "Best price guarantee", desc: "We match any competitor's price" },
                    { icon: Truck, title: "Free delivery", desc: "Anywhere in Bali, no extra cost" },
                    { icon: Clock, title: "24/7 local support", desc: "Real humans, anytime you need" },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5">
                      <div className="w-12 h-12 bg-[#d4a574] rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-[#064e3b]" />
                      </div>
                      <div>
                        <div className="font-bold text-white">{title}</div>
                        <div className="text-sm text-white/70 mt-0.5">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 9. FOOTER (Dark luxury) ==================== */}
        <footer className="bg-[#0a1f1c] text-white pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 mb-16">
              {/* Brand */}
              <div className="col-span-2 md:col-span-3 lg:col-span-2">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#064e3b] to-[#0f766e] rounded-full flex items-center justify-center">
                    <Car className="w-5 h-5 text-[#d4a574]" />
                  </div>
                  <div className="leading-tight">
                    <div className="font-serif text-white font-bold text-lg">Auto Ultimate</div>
                    <div className="text-[10px] text-[#d4a574] tracking-[0.2em] uppercase">Bali Rental</div>
                  </div>
                </div>
                <p className="text-sm text-white/60 mb-6 leading-relaxed max-w-xs">
                  Premium car rental experience in Bali. Curated fleet, transparent pricing, island-wide concierge.
                </p>
                <div className="flex gap-2.5">
                  {[
                    { Icon: Globe, label: "Website" },
                    { Icon: AtSign, label: "Social" },
                    { Icon: MessageCircle, label: "WhatsApp" },
                  ].map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#social"
                      aria-label={label}
                      className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-[#d4a574] hover:border-[#d4a574]/40 transition-all"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#d4a574] text-xs tracking-[0.2em] uppercase mb-5">Company</h4>
                <ul className="space-y-3">
                  {["About us", "Careers", "Press", "Blog"].map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase().replace(/\s/g, "-")}`} className="text-sm text-white/60 hover:text-white transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#d4a574] text-xs tracking-[0.2em] uppercase mb-5">Services</h4>
                <ul className="space-y-3">
                  {["Car rental", "Chauffeur", "Airport transfer", "Long-term"].map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase().replace(/\s/g, "-")}`} className="text-sm text-white/60 hover:text-white transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#d4a574] text-xs tracking-[0.2em] uppercase mb-5">Contact</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-white/60">
                    <Phone className="w-4 h-4 text-[#d4a574]" />
                    +62 812 3456 7890
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/60">
                    <Mail className="w-4 h-4 text-[#d4a574]" />
                    hello@autoultimate.id
                  </li>
                  <li className="flex items-start gap-2 text-sm text-white/60">
                    <MapPin className="w-4 h-4 text-[#d4a574] shrink-0 mt-0.5" />
                    Ngurah Rai Airport, Bali
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="col-span-2 md:col-span-3 lg:col-span-1">
                <h4 className="font-bold text-[#d4a574] text-xs tracking-[0.2em] uppercase mb-5">Stay updated</h4>
                <p className="text-xs text-white/60 mb-4">Special offers and travel tips</p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-full text-sm outline-none focus:border-[#d4a574] text-white placeholder:text-white/40"
                  />
                  <button className="w-full py-3 bg-[#d4a574] text-[#064e3b] text-sm font-bold rounded-full hover:bg-white transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/50">
                © {new Date().getFullYear()} Auto Ultimate. All rights reserved.
              </p>
              <p className="text-xs text-white/50 italic font-serif">
                Crafted with care in Bali.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
