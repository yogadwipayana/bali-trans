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

const SectionLabel = ({ num, children }) => (
  <div className="flex items-center gap-3 text-[#b1382e] text-xs font-medium tracking-[0.3em] uppercase">
    <span className="font-serif italic text-base">{num}</span>
    <span className="w-8 h-px bg-[#b1382e]" />
    <span>{children}</span>
  </div>
);

export default function V3() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useFullScreenRoot();

  return (
    <>
      <Helmet>
        <title>Auto Ultimate — Bali Car Rental Editorial</title>
        <meta name="description" content="A considered car rental experience in Bali. Editorial. Minimal. Trusted." />
      </Helmet>

      <div className="min-h-screen bg-[#fafaf7] font-sans text-[#1a1a1a] antialiased selection:bg-[#b1382e] selection:text-white">
        {/* ==================== 1. NAVBAR — minimal line ==================== */}
        <header className="sticky top-0 z-50 bg-[#fafaf7]/90 backdrop-blur border-b border-[#1a1a1a]/10">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-baseline gap-3">
                <div className="font-serif text-xl font-bold tracking-tight">Auto Ultimate</div>
                <div className="hidden sm:block w-px h-4 bg-[#1a1a1a]/20" />
                <div className="hidden sm:block text-[10px] tracking-[0.3em] uppercase text-[#6b6b6b]">Bali Rental Co.</div>
              </div>

              <nav className="hidden lg:flex items-center gap-10">
                {navLinks.map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase()}`}
                    className="text-[13px] tracking-wide text-[#1a1a1a] hover:text-[#b1382e] transition-colors relative group"
                  >
                    {l}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#b1382e] group-hover:w-full transition-all" />
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-6">
                <a href="#signin" className="hidden sm:block text-[13px] tracking-wide hover:text-[#b1382e] transition-colors">Sign in</a>
                <a href="#book" className="hidden sm:inline-flex items-center gap-2 text-[13px] tracking-wide font-medium border-b-2 border-[#1a1a1a] pb-1 hover:border-[#b1382e] hover:text-[#b1382e] transition-colors">
                  Book now <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
          {mobileOpen && (
            <div className="lg:hidden border-t border-[#1a1a1a]/10 bg-[#fafaf7] px-6 py-6 space-y-4">
              {navLinks.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm" onClick={() => setMobileOpen(false)}>{l}</a>
              ))}
              <div className="pt-4 flex flex-col gap-3 border-t border-[#1a1a1a]/10">
                <a href="#signin" className="text-sm">Sign in</a>
                <a href="#book" className="inline-flex items-center gap-2 text-sm font-medium">Book now <ArrowRight className="w-4 h-4" /></a>
              </div>
            </div>
          )}
        </header>

        {/* ==================== 2. HERO — editorial split ==================== */}
        <section className="border-b border-[#1a1a1a]/10">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-12 lg:pb-16">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left meta */}
              <div className="lg:col-span-3 space-y-6">
                <SectionLabel num="01">The Edition</SectionLabel>
                <div className="text-xs text-[#6b6b6b] uppercase tracking-wider">
                  Issue №47<br />
                  <span className="text-[#1a1a1a]">May, MMXXVI</span>
                </div>
                <p className="text-sm text-[#6b6b6b] leading-relaxed border-t border-[#1a1a1a]/10 pt-6">
                  An ongoing series on travel in Indonesia, written by people who actually live here.
                </p>
              </div>

              {/* Center headline */}
              <div className="lg:col-span-9">
                <div className="text-xs text-[#6b6b6b] uppercase tracking-[0.2em] mb-6">Reliable · Flexible · Island-wide</div>
                <h1 className="font-serif font-medium text-[#1a1a1a] text-6xl sm:text-7xl lg:text-8xl xl:text-[140px] leading-[0.9] tracking-tight">
                  Drive Bali.<br />
                  <span className="italic font-light text-[#b1382e]">Make it</span><br />
                  unforgettable.
                </h1>
              </div>
            </div>

            {/* Hero photo full-bleed within container */}
            <div className="mt-12 lg:mt-16 grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              <div className="lg:col-span-8">
                <div className="aspect-[16/9] overflow-hidden bg-[#1a1a1a]/5">
                  <img
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=80"
                    alt="Bali"
                    className="w-full h-full object-cover grayscale-[20%]"
                  />
                </div>
                <div className="mt-3 text-xs text-[#6b6b6b] italic font-serif">↑ A morning in Ubud, Bali — photographed by Léa M.</div>
              </div>
              <div className="lg:col-span-4 space-y-8">
                <p className="font-serif text-xl lg:text-2xl text-[#1a1a1a] leading-snug italic">
                  "A premium fleet, curated routes, and concierge support — your island adventure starts the moment you arrive."
                </p>
                <div className="grid grid-cols-2 gap-px bg-[#1a1a1a]/10">
                  {[
                    { label: "Vehicles", value: "100+" },
                    { label: "Routes", value: "24" },
                    { label: "Years", value: "12" },
                    { label: "Reviews", value: "2k+" },
                  ].map((s) => (
                    <div key={s.label} className="bg-[#fafaf7] py-5">
                      <div className="font-serif text-3xl">{s.value}</div>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 3. BOOKING — minimal form line ==================== */}
        <section className="border-b border-[#1a1a1a]/10 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10 lg:py-12">
            <div className="grid lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-2">
                <SectionLabel num="02">Reserve</SectionLabel>
                <div className="font-serif text-2xl mt-3">Begin here.</div>
              </div>
              <div className="lg:col-span-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { label: "Pickup", icon: MapPin, type: "select", options: ["Ngurah Rai Airport", "Ubud", "Seminyak"] },
                  { label: "Pick-up date", icon: Calendar, type: "datetime-local", value: "2026-05-10T10:00" },
                  { label: "Return date", icon: Calendar, type: "datetime-local", value: "2026-05-15T10:00" },
                  { label: "Vehicle", icon: Car, type: "select", options: ["All", "SUV", "MPV", "Sedan"] },
                ].map((f) => (
                  <div key={f.label} className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#6b6b6b]">{f.label}</label>
                    <div className="flex items-center gap-2 border-b border-[#1a1a1a] pb-2">
                      <f.icon className="w-3.5 h-3.5 text-[#1a1a1a]" />
                      {f.type === "select" ? (
                        <select className="bg-transparent text-sm w-full outline-none">
                          {f.options.map((o) => <option key={o}>{o}</option>)}
                        </select>
                      ) : (
                        <input type={f.type} defaultValue={f.value} className="bg-transparent text-sm w-full outline-none" />
                      )}
                    </div>
                  </div>
                ))}
                <button className="group flex items-center justify-center gap-2 px-6 py-3 bg-[#1a1a1a] text-[#fafaf7] text-sm tracking-wide hover:bg-[#b1382e] transition-colors">
                  Search
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-[#1a1a1a]/10 flex flex-wrap gap-x-10 gap-y-3 text-xs text-[#6b6b6b]">
              {["Free cancellation", "Unlimited mileage", "Full insurance", "Flexible rentals"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#b1382e] rounded-full" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 4. SPECIAL OFFERS — editorial cards ==================== */}
        <section id="deals" className="border-b border-[#1a1a1a]/10">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
            <div className="grid lg:grid-cols-12 gap-8 mb-16">
              <div className="lg:col-span-5">
                <SectionLabel num="03">On offer</SectionLabel>
                <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-medium leading-[0.95] tracking-tight mt-6">
                  Special<br />
                  <span className="italic font-light">offers</span>, for<br />
                  your trip.
                </h2>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 self-end">
                <p className="text-sm text-[#6b6b6b] leading-relaxed mb-6">
                  Selected promotions, refreshed weekly. Each rate is fully transparent — no surprises at pickup.
                </p>
                <a href="#all-deals" className="inline-flex items-center gap-2 text-sm font-medium border-b border-[#1a1a1a] pb-1 hover:text-[#b1382e] hover:border-[#b1382e]">
                  View all deals <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a1a]/10">
              {[
                { num: "I", title: "Early Bird Saver", desc: "Book 30 days ahead, save more.", off: "15", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db9?auto=format&fit=crop&w=600&q=80" },
                { num: "II", title: "Weekend Escape", desc: "Friday to Monday adventures.", off: "10", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80" },
                { num: "III", title: "Long Stay Value", desc: "7+ days, daily rate drops.", off: "20", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" },
                { num: "IV", title: "Family Adventure", desc: "Spacious, for all ages.", off: "12", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80" },
              ].map((deal) => (
                <article key={deal.title} className="bg-[#fafaf7] p-8 group cursor-pointer hover:bg-white transition-colors">
                  <div className="flex items-baseline justify-between mb-8">
                    <span className="font-serif text-sm text-[#6b6b6b]">№ {deal.num}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-4xl text-[#b1382e]">{deal.off}</span>
                      <span className="text-xs text-[#b1382e]">% OFF</span>
                    </div>
                  </div>
                  <div className="aspect-square overflow-hidden mb-6">
                    <img src={deal.img} alt={deal.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <h3 className="font-serif text-xl mb-2">{deal.title}</h3>
                  <p className="text-sm text-[#6b6b6b]">{deal.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. FEATURED FLEET — table style ==================== */}
        <section id="vehicles" className="border-b border-[#1a1a1a]/10 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
            <div className="grid lg:grid-cols-12 gap-8 mb-16">
              <div className="lg:col-span-6">
                <SectionLabel num="04">The Fleet</SectionLabel>
                <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-medium leading-[0.95] tracking-tight mt-6">
                  Featured<br />
                  <span className="italic font-light">vehicles.</span>
                </h2>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 self-end">
                <a href="#all-vehicles" className="inline-flex items-center gap-2 text-sm font-medium border-b border-[#1a1a1a] pb-1 hover:text-[#b1382e] hover:border-[#b1382e]">
                  View all vehicles <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Table-like list */}
            <div className="border-t border-[#1a1a1a]/10">
              {[
                { name: "Toyota Avanza", cat: "Family MPV", seats: 7, trans: "Auto", cc: "1.3L", price: "450", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80" },
                { name: "Toyota Rush", cat: "Adventure SUV", seats: 7, trans: "Auto", cc: "1.5L", price: "550", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80" },
                { name: "Honda HR-V", cat: "Premium SUV", seats: 5, trans: "Auto", cc: "1.8L", price: "600", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80" },
              ].map((car, idx) => (
                <article key={car.name} className="grid grid-cols-12 gap-4 lg:gap-8 py-8 lg:py-10 border-b border-[#1a1a1a]/10 group hover:bg-[#fafaf7] transition-colors items-center">
                  <div className="col-span-12 lg:col-span-1 font-serif text-2xl text-[#6b6b6b]">0{idx + 1}</div>
                  <div className="col-span-12 lg:col-span-3">
                    <div className="aspect-[4/3] overflow-hidden bg-[#fafaf7]">
                      <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-3">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#b1382e] mb-2">{car.cat}</div>
                    <h3 className="font-serif text-3xl">{car.name}</h3>
                  </div>
                  <div className="col-span-12 lg:col-span-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#6b6b6b]">
                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {car.seats} seats</span>
                    <span className="flex items-center gap-1.5"><Cog className="w-3.5 h-3.5" /> {car.trans}</span>
                    <span className="flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5" /> {car.cc}</span>
                  </div>
                  <div className="col-span-12 lg:col-span-2 flex flex-col items-start lg:items-end gap-3">
                    <div>
                      <span className="font-serif text-3xl">Rp {car.price}K</span>
                      <span className="text-sm text-[#6b6b6b] ml-1">/day</span>
                    </div>
                    <button className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] border-b border-[#1a1a1a] pb-0.5 hover:text-[#b1382e] hover:border-[#b1382e] transition-colors">
                      View <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-[#1a1a1a]/10">
              {["Well-maintained", "Transparent pricing", "Island-wide support", "Trusted by travelers"].map((t, i) => (
                <div key={t} className="flex items-baseline gap-3">
                  <span className="font-serif italic text-sm text-[#b1382e]">0{i + 1}</span>
                  <span className="text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 6. DESTINATIONS — editorial gallery ==================== */}
        <section id="destinations" className="border-b border-[#1a1a1a]/10">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
            <div className="grid lg:grid-cols-12 gap-8 mb-16">
              <div className="lg:col-span-6">
                <SectionLabel num="05">Destinations</SectionLabel>
                <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-medium leading-[0.95] tracking-tight mt-6">
                  Top spots<br />
                  in <span className="italic font-light">paradise.</span>
                </h2>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 self-end">
                <p className="text-sm text-[#6b6b6b] leading-relaxed mb-6">
                  A short list of our favourites — chosen by drivers and updated monthly.
                </p>
                <a href="#all-destinations" className="inline-flex items-center gap-2 text-sm font-medium border-b border-[#1a1a1a] pb-1 hover:text-[#b1382e] hover:border-[#b1382e]">
                  Explore more <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 lg:gap-6">
              {[
                { name: "Ubud", caption: "Rice terraces & art villages", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80", span: "col-span-12 lg:col-span-7", aspect: "aspect-[16/10]" },
                { name: "Seminyak", caption: "Beach clubs at sunset", img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80", span: "col-span-12 lg:col-span-5", aspect: "aspect-[4/5]" },
                { name: "Uluwatu", caption: "Cliff temple & surf", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80", span: "col-span-6 lg:col-span-4", aspect: "aspect-square" },
                { name: "Nusa Penida", caption: "Crystal waters", img: "https://images.unsplash.com/photo-1589817864531-ef00b149c23a?auto=format&fit=crop&w=600&q=80", span: "col-span-6 lg:col-span-4", aspect: "aspect-square" },
                { name: "Canggu", caption: "Surf & cafe culture", img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=600&q=80", span: "col-span-12 lg:col-span-4", aspect: "aspect-square" },
              ].map((d) => (
                <figure key={d.name} className={`${d.span} group cursor-pointer`}>
                  <div className={`${d.aspect} overflow-hidden bg-[#1a1a1a]/5`}>
                    <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <figcaption className="flex items-baseline justify-between pt-3 border-b border-[#1a1a1a]/10 pb-3">
                    <div>
                      <div className="font-serif text-2xl">{d.name}</div>
                      <div className="text-xs text-[#6b6b6b] italic font-serif mt-0.5">{d.caption}</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 group-hover:text-[#b1382e] transition-colors" />
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 7. TESTIMONIALS — pull quote ==================== */}
        <section id="reviews" className="border-b border-[#1a1a1a]/10 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
            <div className="grid lg:grid-cols-12 gap-8 mb-16">
              <div className="lg:col-span-6">
                <SectionLabel num="06">Reviews</SectionLabel>
                <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-medium leading-[0.95] tracking-tight mt-6">
                  Loved by<br />
                  <span className="italic font-light">travelers.</span>
                </h2>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 self-end">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#b1382e] text-[#b1382e]" />)}
                </div>
                <div className="font-serif text-2xl">Excellent 4.9/5</div>
                <div className="text-xs text-[#6b6b6b] mt-1">Based on 2,000+ reviews</div>
              </div>
            </div>

            {/* Featured pull quote */}
            <div className="border-y border-[#1a1a1a]/10 py-12 lg:py-16 mb-12">
              <Quote className="w-10 h-10 text-[#b1382e] mb-6" />
              <blockquote className="font-serif italic text-3xl lg:text-4xl xl:text-5xl leading-[1.2] tracking-tight max-w-4xl">
                "The car was spotless, the pickup was seamless, and the team felt more like friends than rental agents. We'll be back."
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <img src="https://i.pravatar.cc/100?img=1" alt="Sarah" className="w-12 h-12 rounded-full object-cover grayscale" />
                <div>
                  <div className="font-serif text-base">Sarah Mitchell</div>
                  <div className="text-xs text-[#6b6b6b] italic">Sydney, Australia · May 2026</div>
                </div>
              </div>
            </div>

            {/* Smaller reviews */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a]/10">
              {[
                { text: "Best car rental experience in Bali. Transparent pricing, no hidden fees.", name: "Marcus Chen", country: "Singapore", img: "https://i.pravatar.cc/100?img=3" },
                { text: "Free delivery to Ubud was a huge plus. Kids loved the spacious ride.", name: "Emma Larsson", country: "Sweden", img: "https://i.pravatar.cc/100?img=5" },
                { text: "Super professional service. Delivered to our villa exactly on time.", name: "James Wilson", country: "United Kingdom", img: "https://i.pravatar.cc/100?img=8" },
              ].map((r) => (
                <div key={r.name} className="bg-white p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#b1382e] text-[#b1382e]" />)}
                  </div>
                  <p className="font-serif italic text-lg leading-relaxed mb-6">"{r.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#1a1a1a]/10">
                    <img src={r.img} alt={r.name} className="w-8 h-8 rounded-full object-cover grayscale" />
                    <div>
                      <div className="text-sm">{r.name}</div>
                      <div className="text-xs text-[#6b6b6b] italic font-serif">{r.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 8. CTA — minimalist statement ==================== */}
        <section className="border-b border-[#1a1a1a]/10">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-24 lg:py-40">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <SectionLabel num="07">Begin</SectionLabel>
                <h2 className="font-serif text-6xl lg:text-7xl xl:text-9xl font-medium leading-[0.9] tracking-tight mt-8">
                  Ready to<br />
                  explore <span className="italic font-light text-[#b1382e]">Bali?</span>
                </h2>
                <p className="font-serif italic text-xl lg:text-2xl text-[#6b6b6b] mt-8 max-w-xl">
                  Your perfect ride is just a few clicks away. Freedom and comfort, delivered to your door.
                </p>
                <div className="mt-12 flex flex-wrap gap-6 items-center">
                  <a href="#book" className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] text-[#fafaf7] text-sm tracking-[0.15em] uppercase hover:bg-[#b1382e] transition-colors">
                    Book now <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="#vehicles" className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase border-b border-[#1a1a1a] pb-1 hover:text-[#b1382e] hover:border-[#b1382e]">
                    View all vehicles
                  </a>
                </div>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 space-y-6">
                {[
                  { title: "Best price guarantee", desc: "We match competitor pricing." },
                  { title: "Free delivery", desc: "Anywhere across Bali." },
                  { title: "24/7 local support", desc: "Real humans, anytime." },
                ].map((p, i) => (
                  <div key={p.title} className="border-t border-[#1a1a1a]/10 pt-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif italic text-sm text-[#b1382e]">0{i + 1}</span>
                      <div>
                        <div className="font-serif text-xl">{p.title}</div>
                        <div className="text-sm text-[#6b6b6b] mt-1">{p.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 9. FOOTER — newspaper style ==================== */}
        <footer className="bg-[#fafaf7]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
            <div className="grid grid-cols-12 gap-6 lg:gap-8 pb-12 border-b border-[#1a1a1a]/10">
              <div className="col-span-12 lg:col-span-4">
                <div className="font-serif text-3xl lg:text-4xl font-medium leading-tight mb-3">Auto Ultimate</div>
                <p className="text-sm text-[#6b6b6b] leading-relaxed max-w-xs mb-6">
                  An independent car rental company based in Bali, Indonesia. Founded 2013.
                </p>
                <div className="flex gap-2">
                  {[
                    { Icon: Globe, label: "Website" },
                    { Icon: AtSign, label: "Social" },
                    { Icon: MessageCircle, label: "WhatsApp" },
                  ].map(({ Icon, label }) => (
                    <a key={label} href="#social" aria-label={label} className="w-9 h-9 border border-[#1a1a1a]/20 rounded-full flex items-center justify-center hover:bg-[#1a1a1a] hover:text-[#fafaf7] transition-colors">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {[
                { head: "Company", items: ["About us", "Careers", "Press", "Blog"] },
                { head: "Services", items: ["Car rental", "Chauffeur", "Airport", "Long-term"] },
                { head: "Resources", items: ["Help center", "FAQs", "Terms", "Privacy"] },
              ].map((col) => (
                <div key={col.head} className="col-span-6 lg:col-span-2">
                  <h4 className="font-serif italic text-sm text-[#6b6b6b] mb-4">{col.head}</h4>
                  <ul className="space-y-2.5">
                    {col.items.map((i) => (
                      <li key={i}><a href="#" className="text-sm hover:text-[#b1382e] transition-colors">{i}</a></li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="col-span-12 lg:col-span-2">
                <h4 className="font-serif italic text-sm text-[#6b6b6b] mb-4">Newsletter</h4>
                <p className="text-xs text-[#6b6b6b] mb-3">Quarterly dispatch.</p>
                <input type="email" placeholder="your@email.com" className="w-full bg-transparent border-b border-[#1a1a1a] py-2 text-sm outline-none focus:border-[#b1382e] mb-3" />
                <button className="w-full py-2.5 bg-[#1a1a1a] text-[#fafaf7] text-xs uppercase tracking-[0.2em] hover:bg-[#b1382e] transition-colors">Subscribe</button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6 pt-8 text-xs text-[#6b6b6b]">
              <div className="col-span-12 lg:col-span-4 flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> +62 812 3456 7890</div>
              <div className="col-span-12 lg:col-span-4 flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> hello@autoultimate.id</div>
              <div className="col-span-12 lg:col-span-4 flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Jl. Airport Ngurah Rai No. 88, Bali</div>
            </div>

            <div className="pt-8 mt-8 border-t border-[#1a1a1a]/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-[#6b6b6b]">
              <span>© {new Date().getFullYear()} Auto Ultimate Co.</span>
              <span className="font-serif italic">Set in Bali · No. 47</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
