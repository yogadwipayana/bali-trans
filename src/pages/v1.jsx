import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Menu,
  X,
  User,
  ArrowRight,
  Shield,
  Clock,
  Truck,
  Wallet,
  Search,
  Star,
  MapPin,
  Calendar,
  Car,
  ChevronRight,
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
} from "lucide-react";

const navLinks = [
  "Vehicles",
  "Deals",
  "Destinations",
  "Services",
  "Reviews",
  "About us",
  "Contact",
];

export default function V1() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Auto Ultimate | Bali Car Rental</title>
        <meta name="description" content="Premium car rental service in Bali. Reliable, flexible, island-wide." />
      </Helmet>

      <div className="min-h-screen bg-white font-sans text-[#4a4a4a]">
        {/* ==================== 1. HEADER / NAVBAR ==================== */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-8 h-8 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <div className="leading-tight">
                  <div className="text-[#1e3a5f] font-bold text-lg tracking-tight">Auto Ultimate</div>
                  <div className="text-xs text-gray-400 -mt-0.5">Bali Car Rental</div>
                </div>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-sm font-medium text-gray-600 hover:text-[#1e3a5f] transition-colors"
                  >
                    {l}
                  </a>
                ))}
              </nav>

              {/* Right Actions */}
              <div className="flex items-center gap-4">
                <a href="#signin" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#1e3a5f]">
                  <User className="w-4 h-4" />
                  Sign in
                </a>
                <a
                  href="#book"
                  className="hidden sm:inline-flex items-center px-5 py-2.5 bg-[#1e3a5f] text-white text-sm font-semibold rounded-lg hover:bg-[#152d4a] transition-colors"
                >
                  Book now
                </a>
                <button
                  className="lg:hidden p-2 text-gray-600"
                  onClick={() => setMobileOpen(!mobileOpen)}
                >
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
              {navLinks.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                  className="block text-sm font-medium text-gray-600 hover:text-[#1e3a5f]"
                  onClick={() => setMobileOpen(false)}
                >
                  {l}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-3">
                <a href="#signin" className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <User className="w-4 h-4" /> Sign in
                </a>
                <a href="#book" className="inline-flex justify-center px-5 py-2.5 bg-[#1e3a5f] text-white text-sm font-semibold rounded-lg">
                  Book now
                </a>
              </div>
            </div>
          )}
        </header>

        {/* ==================== 2. HERO SECTION ==================== */}
        <section className="relative bg-[#f8f9fa] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="order-2 lg:order-1">
                <span className="inline-block px-3 py-1.5 bg-[#f5e6d3] text-[#8b6914] text-xs font-bold tracking-wider rounded-full mb-6">
                  RELIABLE. FLEXIBLE. ISLAND-WIDE.
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#1a1a2e] leading-[1.1] tracking-tight mb-6">
                  Drive Bali.<br />Make it unforgettable.
                </h1>
                <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
                  Premium car rental service with island-wide delivery, transparent pricing, and 24/7 local support for your Bali adventure.
                </p>

                {/* 2x2 Grid Features */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                      <Wallet className="w-5 h-5 text-[#1e3a5f]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#1a1a2e] text-sm">No hidden fees</div>
                      <div className="text-xs text-gray-400 mt-0.5">Transparent pricing</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                      <Truck className="w-5 h-5 text-[#1e3a5f]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#1a1a2e] text-sm">Free delivery</div>
                      <div className="text-xs text-gray-400 mt-0.5">Anywhere in Bali</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                      <Clock className="w-5 h-5 text-[#1e3a5f]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#1a1a2e] text-sm">24/7 support</div>
                      <div className="text-xs text-gray-400 mt-0.5">Always here for you</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                      <Shield className="w-5 h-5 text-[#1e3a5f]" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#1a1a2e] text-sm">Full insurance</div>
                      <div className="text-xs text-gray-400 mt-0.5">Drive with peace</div>
                    </div>
                  </div>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="Customer"
                        className="w-9 h-9 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#1a1a2e]">10,000+ happy customers</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#22c55e] text-[#22c55e]" />
                      ))}
                      <span className="text-xs font-bold text-[#1a1a2e] ml-1">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="order-1 lg:order-2 relative">
                <div className="relative mx-auto w-full max-w-md lg:max-w-none aspect-[4/5] lg:aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#e8d5c4] to-[#d4a574] rounded-[40%_60%_70%_30%/60%_30%_70%_40%] opacity-30" />
                  <img
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
                    alt="Bali iconic gate with car"
                    className="relative w-full h-full object-cover rounded-[40%_60%_70%_30%/60%_30%_70%_40%] shadow-2xl"
                  />
                  {/* Floating Badge */}
                  <div className="absolute -top-2 -right-2 lg:top-8 lg:right-0 bg-white rounded-full shadow-lg p-3 lg:p-4 flex items-center gap-2 animate-bounce">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#1e3a5f] rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <div className="leading-tight pr-1">
                      <div className="text-[10px] lg:text-xs font-bold text-[#1e3a5f] tracking-tight">BEST PRICE</div>
                      <div className="text-[10px] lg:text-xs font-bold text-[#1e3a5f] tracking-tight">GUARANTEE</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 3. BOOKING WIDGET ==================== */}
        <section className="relative z-10 -mt-8 lg:-mt-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 lg:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                <div className="lg:col-span-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Pickup location</label>
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <select className="bg-transparent text-sm text-gray-700 outline-none w-full cursor-pointer">
                      <option>Denpasar Airport</option>
                      <option>Ubud</option>
                      <option>Seminyak</option>
                      <option>Kuta</option>
                      <option>Nusa Dua</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Pick-up</label>
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                    <input type="datetime-local" className="bg-transparent text-sm text-gray-700 outline-none w-full" defaultValue="2026-05-10T10:00" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Return</label>
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                    <input type="datetime-local" className="bg-transparent text-sm text-gray-700 outline-none w-full" defaultValue="2026-05-15T10:00" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Vehicle type</label>
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    <Car className="w-4 h-4 text-gray-400 shrink-0" />
                    <select className="bg-transparent text-sm text-gray-700 outline-none w-full cursor-pointer">
                      <option>All vehicles</option>
                      <option>SUV</option>
                      <option>MPV</option>
                      <option>Sedan</option>
                      <option>Convertible</option>
                    </select>
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 px-5 py-3 bg-[#1e3a5f] text-white text-sm font-bold rounded-lg hover:bg-[#152d4a] transition-colors">
                  <Search className="w-4 h-4" />
                  Search vehicles
                </button>
              </div>
            </div>

            {/* 4 Trust Points */}
            <div className="flex flex-wrap justify-center gap-6 lg:gap-10 mt-5">
              {[
                { icon: CheckCircle, text: "Free cancellation" },
                { icon: Gauge, text: "Unlimited mileage" },
                { icon: Shield, text: "Full insurance" },
                { icon: Clock, text: "Flexible rentals" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-gray-500">
                  <Icon className="w-4 h-4 text-[#1e3a5f]" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 4. SPECIAL OFFERS ==================== */}
        <section id="deals" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e]">Special offers for your Bali trip</h2>
                <p className="text-gray-400 mt-2 text-sm">Exclusive deals to make your journey even better</p>
              </div>
              <a href="#all-deals" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#1e3a5f] hover:underline">
                View all deals <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  title: "Early Bird Saver",
                  desc: "Book 30 days ahead and save big on your rental",
                  discount: "15% OFF",
                  bg: "bg-[#fef3e2]",
                  img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db9?auto=format&fit=crop&w=400&q=80",
                },
                {
                  title: "Weekend Escape",
                  desc: "Special rates for Friday to Monday adventures",
                  discount: "10% OFF",
                  bg: "bg-[#e8f4f0]",
                  img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80",
                },
                {
                  title: "Long Stay Value",
                  desc: "Rent for 7+ days and enjoy discounted daily rates",
                  discount: "20% OFF",
                  bg: "bg-[#f0e8f4]",
                  img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80",
                },
                {
                  title: "Family Adventure",
                  desc: "Spacious vehicles perfect for family getaways",
                  discount: "12% OFF",
                  bg: "bg-[#e8eef4]",
                  img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80",
                },
              ].map((deal) => (
                <div key={deal.title} className={`${deal.bg} rounded-2xl p-5 relative overflow-hidden group`}>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center text-[10px] font-bold text-center leading-tight z-10">
                    {deal.discount}
                  </div>
                  <h3 className="font-bold text-[#1a1a2e] mb-1.5">{deal.title}</h3>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">{deal.desc}</p>
                  <div className="relative h-32 -mx-5 -mb-5">
                    <img
                      src={deal.img}
                      alt={deal.title}
                      className="absolute bottom-0 right-0 w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. FEATURED FLEET ==================== */}
        <section id="vehicles" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e]">Featured fleet</h2>
                <p className="text-gray-400 mt-2 text-sm">Well-maintained vehicles ready for your Bali adventure</p>
              </div>
              <a href="#all-vehicles" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#1e3a5f] hover:underline">
                View all vehicles <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Toyota Avanza",
                  seats: 7,
                  trans: "Auto",
                  cc: "1.3L",
                  price: "450K",
                  img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=500&q=80",
                },
                {
                  name: "Toyota Rush",
                  seats: 7,
                  trans: "Auto",
                  cc: "1.5L",
                  price: "550K",
                  img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500&q=80",
                },
                {
                  name: "Honda HR-V",
                  seats: 5,
                  trans: "Auto",
                  cc: "1.8L",
                  price: "600K",
                  img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=500&q=80",
                },
              ].map((car) => (
                <div key={car.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-5">
                    <h3 className="font-bold text-[#1a1a2e] text-lg">{car.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {car.seats} seats</span>
                      <span className="flex items-center gap-1"><Cog className="w-3.5 h-3.5" /> {car.trans}</span>
                      <span className="flex items-center gap-1"><Gauge className="w-3.5 h-3.5" /> {car.cc}</span>
                    </div>
                    <div className="mt-3 text-2xl font-bold text-[#1e3a5f]">
                      Rp {car.price}<span className="text-sm font-normal text-gray-400">/day</span>
                    </div>
                  </div>
                  <div className="relative h-44 bg-gradient-to-t from-gray-50 to-transparent">
                    <img src={car.img} alt={car.name} className="absolute inset-0 w-full h-full object-contain p-4" />
                  </div>
                  <div className="p-5 pt-0">
                    <button className="w-full py-2.5 border-2 border-[#1e3a5f] text-[#1e3a5f] text-sm font-semibold rounded-lg hover:bg-[#1e3a5f] hover:text-white transition-colors">
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Banner */}
            <div className="mt-12 bg-white rounded-2xl border border-gray-100 p-6 lg:p-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: CheckCircle, text: "Well-maintained vehicles" },
                  { icon: Tag, text: "Transparent pricing" },
                  { icon: MapPin, text: "Island-wide support" },
                  { icon: Star, text: "Trusted by travelers" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#f0f4f8] rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#1e3a5f]" />
                    </div>
                    <span className="text-sm font-medium text-[#1a1a2e]">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 6. TOP DESTINATIONS ==================== */}
        <section id="destinations" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e]">Top destinations in Bali</h2>
                <p className="text-gray-400 mt-2 text-sm">Explore the best spots around the island</p>
              </div>
              <a href="#all-destinations" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#1e3a5f] hover:underline">
                Explore more <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  name: "Ubud",
                  desc: "Rice terraces & art villages",
                  img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80",
                },
                {
                  name: "Seminyak",
                  desc: "Beach clubs & sunset bars",
                  img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=500&q=80",
                },
                {
                  name: "Uluwatu",
                  desc: "Cliff temple & surf breaks",
                  img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=500&q=80",
                },
                {
                  name: "Nusa Penida",
                  desc: "Crystal clear waters & cliffs",
                  img: "https://images.unsplash.com/photo-1589817864531-ef00b149c23a?auto=format&fit=crop&w=500&q=80",
                },
              ].map((dest) => (
                <div key={dest.name} className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer">
                  <img
                    src={dest.img}
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center group-hover:bg-[#1e3a5f] transition-colors">
                      <ChevronRight className="w-5 h-5 text-[#1e3a5f] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-white font-bold text-xl">{dest.name}</h3>
                    <p className="text-white/80 text-sm mt-1">{dest.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 7. TESTIMONIALS ==================== */}
        <section id="reviews" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e]">Loved by travelers</h2>
                <p className="text-gray-400 mt-2 text-sm">See what our customers say about us</p>
              </div>
              <div className="hidden sm:flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-gray-100">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#22c55e] text-[#22c55e]" />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-[#1a1a2e]">Excellent 4.9/5</span>
                  <span className="text-gray-400"> based on 2,000+ reviews</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  text: "The car was spotless and the pickup at the airport was seamless. Will definitely book again on my next Bali trip!",
                  name: "Sarah Mitchell",
                  country: "Australia",
                  img: "https://i.pravatar.cc/100?img=1",
                },
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
              ].map((review) => (
                <div key={review.name} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <Quote className="w-8 h-8 text-[#1e3a5f]/10 mb-3" />
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">{review.text}</p>
                  <div className="flex items-center gap-3">
                    <img src={review.img} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-[#1a1a2e] text-sm">{review.name}</div>
                      <div className="text-xs text-gray-400">{review.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 8. CTA BANNER ==================== */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f] via-[#1e3a5f] to-transparent z-10" />
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=80"
              alt="Bali beach sunset"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Ready to explore Bali?
                </h2>
                <p className="text-white/80 mb-8 max-w-md">
                  Book your perfect ride today and experience the island with freedom and comfort. Your adventure starts here.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#book" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1e3a5f] font-bold rounded-lg hover:bg-gray-100 transition-colors">
                    Book now <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="#vehicles" className="inline-flex items-center px-6 py-3 border-2 border-white/50 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                    View all vehicles
                  </a>
                </div>
              </div>
              <div className="space-y-5">
                {[
                  { icon: Tag, text: "Best price guarantee" },
                  { icon: Truck, text: "Free delivery anywhere in Bali" },
                  { icon: Clock, text: "24/7 local support" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white font-semibold">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 9. FOOTER ==================== */}
        <footer className="bg-[#f8f9fa] pt-16 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 mb-12">
              {/* Brand */}
              <div className="col-span-2 md:col-span-3 lg:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
                    <Car className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[#1e3a5f] font-bold text-lg">Auto Ultimate</div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                  Premium car rental service in Bali. Reliable, flexible, island-wide.
                </p>
                <div className="flex gap-3">
                  {[
                    { Icon: Globe, label: "Website" },
                    { Icon: AtSign, label: "Social" },
                    { Icon: MessageCircle, label: "WhatsApp" },
                  ].map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#social"
                      aria-label={label}
                      className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-gray-400 hover:text-[#1e3a5f] hover:shadow-md transition-all"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h4 className="font-bold text-[#1a1a2e] text-sm mb-4">Company</h4>
                <ul className="space-y-2.5">
                  {["About us", "Careers", "Press", "Blog"].map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase().replace(/\s/g, "-")}`} className="text-sm text-gray-400 hover:text-[#1e3a5f] transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#1a1a2e] text-sm mb-4">Services</h4>
                <ul className="space-y-2.5">
                  {["Car rental", "Chauffeur", "Airport transfer", "Long-term lease"].map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase().replace(/\s/g, "-")}`} className="text-sm text-gray-400 hover:text-[#1e3a5f] transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#1a1a2e] text-sm mb-4">Resources</h4>
                <ul className="space-y-2.5">
                  {["Help center", "FAQs", "Terms", "Privacy"].map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase().replace(/\s/g, "-")}`} className="text-sm text-gray-400 hover:text-[#1e3a5f] transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-bold text-[#1a1a2e] text-sm mb-4">Contact</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-gray-400">
                    <Phone className="w-4 h-4 text-[#1e3a5f]" />
                    +62 812 3456 7890
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-400">
                    <Mail className="w-4 h-4 text-[#1e3a5f]" />
                    hello@autoultimate.id
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4 text-[#1e3a5f] shrink-0 mt-0.5" />
                    Jl. Airport Ngurah Rai No. 88, Bali
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="col-span-2 md:col-span-3 lg:col-span-1">
                <h4 className="font-bold text-[#1a1a2e] text-sm mb-1">STAY UPDATED</h4>
                <p className="text-xs text-gray-400 mb-4">Get special offers and travel tips</p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1e3a5f]"
                  />
                  <button className="w-full py-2.5 bg-[#1e3a5f] text-white text-sm font-semibold rounded-lg hover:bg-[#152d4a] transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8 text-center">
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} Auto Ultimate. All rights reserved. Made with love in Bali.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
