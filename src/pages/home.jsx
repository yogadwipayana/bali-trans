import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Star,
  MapPin,
  Calendar,
  Car,
  Users,
  Cog,
  Gauge,
  Quote,
  Tag,
  Truck,
  Shield,
  Clock,
  Wallet,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingDateTime } from "@/components/BookingDateTime";
import { BookingSelect } from "@/components/BookingSelect";
import { useFullScreenRoot } from "@/hooks/useFullScreenRoot";

const TEAL = "#1d4046";
const CREAM = "#fff5e6";

const PICKUP_LOCATIONS = [
  "Ngurah Rai Airport (DPS)",
];

const VEHICLE_TYPES = [
  "All vehicle types",
  "SUV",
  "MPV",
  "Sedan",
  "Convertible",
];

export default function Home() {
  const [booking, setBooking] = useState({
    pickup: PICKUP_LOCATIONS[0],
    pickupAt: "2026-05-18T10:00",
    returnAt: "2026-05-21T10:00",
    vehicleType: VEHICLE_TYPES[0],
  });
  const updateBooking = (key, value) =>
    setBooking((prev) => ({ ...prev, [key]: value }));

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Hook: pass `booking` to your search route / API.
    // For now we just log and scroll to vehicles.
    console.log("Search vehicles", booking);
    document.getElementById("vehicles")?.scrollIntoView({ behavior: "smooth" });
  };

  useFullScreenRoot();

  return (
    <>
      <Helmet>
        <title>Bali Trans · Bali Car Rental</title>
        <meta name="description" content="Premium vehicles, transparent prices, and friendly local service. Drive Bali, make it unforgettable." />
      </Helmet>

      <div
        className="min-h-screen bg-white font-sans text-[#1a1a1a] antialiased"
        style={{
          // Override the global CSS variables from index.css that get auto-switched
          // to dark mode based on prefers-color-scheme. Force light values here.
          "--text": "#6b7280",
          "--text-h": "#1a1a1a",
          "--bg": "#ffffff",
          "--border": "#e5e7eb",
          colorScheme: "light",
          color: "#1a1a1a",
        }}
      >
        {/* ==================== 1. HEADER / NAVBAR ==================== */}
        <Header />

        {/* ==================== 2. HERO SECTION ==================== */}
        <section className="relative bg-white pt-4 lg:pt-4 pb-8 lg:pb-12 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-10 items-center">
            {/* Left content — padded to align with the page's max-w-7xl gutter */}
            <div className="order-2 lg:order-1 px-4 sm:px-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-0 text-center lg:text-left">
              {/* Badge */}
              <span
                className="inline-block px-3 py-1.5 text-[10px] lg:text-[11px] font-bold tracking-[0.15em] uppercase rounded-full mb-3 lg:mb-7"
                style={{ backgroundColor: CREAM, color: "#a16e2e" }}
              >
                ✦ RELIABLE. FLEXIBLE. ISLAND-WIDE.
              </span>

              {/* Headline */}
              <h1
                className="font-bold leading-[1.05] tracking-[-0.02em] mb-3 lg:mb-6"
                style={{
                  color: "#0a0a0a",
                  margin: "0 0 0.75rem 0",
                  fontSize: "clamp(2rem, 1.25rem + 3vw, 3.625rem)",
                  letterSpacing: "-0.02em",
                  fontWeight: 700,
                }}
              >
                Your Bali journey<br className="hidden lg:inline" /> starts here.
              </h1>

              {/* Subhead */}
              <p className="text-gray-500 text-sm lg:text-[17px] leading-relaxed mb-5 lg:mb-14 max-w-xl mx-auto lg:mx-0">
                Premium vehicles, transparent prices, and friendly local service. Airport pickup, hotel delivery, and 24/7 support across Bali.
              </p>

              {/* CTA buttons — mobile only */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 lg:hidden">
                <a
                  href="#book"
                  className="btn-glass flex-1 px-6 py-3 rounded-lg font-semibold text-white text-sm text-center shadow-md"
                  style={{ backgroundColor: TEAL }}
                >
                  Book your ride
                </a>
                <a
                  href="#vehicles"
                  className="btn-glass-fill flex-1 px-6 py-3 rounded-lg font-semibold text-sm text-center border-2"
                  style={{ borderColor: TEAL, color: TEAL }}
                >
                  View vehicles
                </a>
              </div>

              {/* 3 Feature row */}
              <div className="grid grid-cols-3 lg:grid-cols-3 gap-2 lg:gap-5 my-4 max-w-2xl mx-auto lg:mx-0">
                {[
                  { icon: Wallet, title: "No hidden fees", desc: "What you see is what you pay" },
                  { icon: Truck, title: "Free delivery", desc: "Airport, hotel, villa and anywhere in Bali" },
                  { icon: Clock, title: "24/7 support", desc: "Local team ready to help anytime" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left gap-1.5 lg:gap-2.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#f0f5f5" }}>
                      <Icon className="w-4 h-4" style={{ color: TEAL }} />
                    </div>
                    <div className="leading-tight">
                      <div className="font-semibold text-[#1a1a1a] text-[11px] lg:text-sm">{title}</div>
                      <div className="hidden lg:block text-xs text-gray-400 mt-1 leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="flex items-center justify-center lg:justify-start gap-3 lg:gap-4 mt-5 lg:mt-0">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="Customer"
                      className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div className="text-xs lg:text-sm font-semibold text-[#1a1a1a]">10,000+ happy customers</div>
                <div className="hidden sm:flex items-center gap-1 ml-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#22c55e] text-[#22c55e]" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">4.9/5</span>
                </div>
              </div>
            </div>

            {/* Right Image — bleeds to the viewport's right edge to match the design */}
            <div className="order-1 lg:order-2 relative w-full">
              <div
                className="relative w-full h-[200px] sm:h-[300px] lg:h-[460px] xl:h-[500px]"
              >
                <img
                  src="/images/hero.png"
                  alt="Modern SUVs parked at Bali gates with ocean and palm trees at sunset"
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{ display: "block", objectPosition: "center" }}
                  loading="eager"
                  onError={(e) => {
                    // Fallback to Unsplash if local file fails to load
                    const fallbacks = [
                      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80",
                      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=80",
                    ];
                    const current = e.currentTarget.src;
                    const next = fallbacks.find((u) => !current.includes(u.split("?")[0].split("/").pop()));
                    if (next) e.currentTarget.src = next;
                  }}
                />

              </div>
            </div>
          </div>
        </section>

        {/* ==================== 3. BOOKING WIDGET ==================== */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-12">
          <form
            onSubmit={handleBookingSubmit}
            className="max-w-6xl mx-auto bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-gray-100 p-5 lg:p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] gap-4 lg:gap-3 items-end">
              {/* Pickup location */}
              <BookingSelect
                id="bf-pickup"
                label="Pickup location"
                icon={MapPin}
                value={booking.pickup}
                onChange={(v) => updateBooking("pickup", v)}
                options={PICKUP_LOCATIONS}
                allowCustom
              />

              {/* Pick-up date & time */}
              <BookingDateTime
                id="bf-pickup-at"
                label="Pick-up date & time"
                icon={Calendar}
                value={booking.pickupAt}
                onChange={(v) => updateBooking("pickupAt", v)}
              />

              {/* Return date & time */}
              <BookingDateTime
                id="bf-return-at"
                label="Return date & time"
                icon={Calendar}
                value={booking.returnAt}
                min={booking.pickupAt}
                onChange={(v) => updateBooking("returnAt", v)}
              />

              {/* Vehicle type */}
              <BookingSelect
                id="bf-vehicle"
                label="Vehicle type"
                icon={Car}
                value={booking.vehicleType}
                onChange={(v) => updateBooking("vehicleType", v)}
                options={VEHICLE_TYPES}
              />

              {/* Submit */}
              <button
                type="submit"
                className="btn-glass inline-flex items-center justify-center gap-2 h-[46px] px-5 text-white text-sm font-bold rounded-lg w-full lg:w-auto sm:col-span-2 lg:col-span-1"
                style={{ backgroundColor: TEAL }}
              >
                Search vehicles <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust strip */}
            <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[
                { icon: CheckCircle, title: "Free cancellation", desc: "Up to 24h before pickup" },
                { icon: Gauge, title: "Unlimited mileage", desc: "Drive without limits" },
                { icon: Shield, title: "Full insurance", desc: "Peace of mind covered" },
                { icon: Clock, title: "Flexible rentals", desc: "Daily, weekly, monthly" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#f0f5f5" }}>
                    <Icon className="w-4 h-4" style={{ color: TEAL }} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#1a1a1a]">{title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </form>

          {/* Hide the spinner buttons on the HH/MM number inputs inside our
              custom date-time picker. */}
          <style>{`
            .bali-time::-webkit-outer-spin-button,
            .bali-time::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            .bali-time { -moz-appearance: textfield; }
          `}</style>
        </section>

        {/* ==================== 4. SPECIAL OFFERS ==================== */}
        <section id="deals" className="pt-6 pb-8 lg:pt-8 lg:pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-5">
              <div>
                <h2 className="font-bold tracking-tight" style={{ color: "#0a0a0a", margin: 0, fontSize: "clamp(1.5rem, 1rem + 1vw, 1.75rem)", letterSpacing: "-0.02em", fontWeight: 700 }}>Special offers for your Bali trip</h2>
              </div>
              <a href="#all-deals" className="hidden sm:flex items-center gap-1 text-sm font-semibold transition-colors" style={{ color: TEAL }}>
                View all deals <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {[
                {
                  title: "Early Bird Saver",
                  desc: "Book 7+ days in advance and save big.",
                  meta: "Min. 3 days rental",
                  discount: "15%",
                  bg: "#fef5ec",
                  img: "/images/mercy.png",
                },
                {
                  title: "Weekend Escape",
                  desc: "Perfect for short trips and quick getaways.",
                  meta: "Valid Fri – Sun",
                  discount: "10%",
                  bg: "#fef0e1",
                  img: "/images/mercy.png",
                },
                {
                  title: "Long Stay Value",
                  desc: "Stay longer, pay less. Best value for 7+ days.",
                  meta: "Min. 7 days rental",
                  discount: "20%",
                  bg: "#fff8e8",
                  img: "/images/mercy.png",
                },
                {
                  title: "Family Adventure",
                  desc: "Spacious rides for your whole crew.",
                  meta: "SUV & Van only",
                  discount: "10%",
                  bg: "#fef5ec",
                  img: "/images/mercy.png",
                },
              ].map((deal) => (
                <div key={deal.title} className="rounded-2xl p-4 lg:p-5 relative overflow-hidden cursor-pointer group min-h-[200px] lg:min-h-[220px] flex flex-col" style={{ backgroundColor: deal.bg }}>
                  {/* Discount badge — absolute so it doesn't affect title/desc spacing */}
                  <div className="absolute top-4 right-4 lg:top-5 lg:right-5 bg-white rounded-md px-2 py-1 text-center border border-orange-100 z-10" style={{ minWidth: "44px" }}>
                    <div className="text-[13px] font-bold text-orange-500 leading-none">{deal.discount}</div>
                    <div className="text-[8px] font-bold text-orange-500 mt-0.5 tracking-wider">OFF</div>
                  </div>

                  {/* Title + description — pr-14 keeps them clear of the absolute-positioned badge */}
                  <div className="pr-14 relative z-10">
                    <h3 className="font-bold text-[#1a1a1a] text-base lg:text-lg leading-tight mb-1">{deal.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">{deal.desc}</p>
                  </div>

                  {/* Spacer to push meta + image to the bottom */}
                  <div className="flex-1" />

                  {/* Meta — bottom left */}
                  <p className="text-[10px] text-gray-400 relative z-10">{deal.meta}</p>

                  {/* Car image — bottom right, bleeding slightly off the right edge */}
                  <img
                    src={deal.img}
                    alt={deal.title}
                    className="absolute bottom-2 -right-3 lg:-right-4 w-[68%] lg:w-[72%] h-auto object-contain pointer-events-none group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. FEATURED FLEET ==================== */}
        <section id="vehicles" className="pt-6 pb-8 lg:pt-8 lg:pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-5">
              <h2 className="font-bold tracking-tight" style={{ color: "#0a0a0a", margin: 0, fontSize: "clamp(1.5rem, 1rem + 1vw, 1.75rem)", letterSpacing: "-0.02em", fontWeight: 700 }}>Featured fleet</h2>
              <a href="/vehicles" className="hidden sm:flex items-center gap-1 text-sm font-semibold transition-colors" style={{ color: TEAL }}>
                View all vehicles <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-6">
              {[
                {
                  name: "Toyota Avanza",
                  seats: 7, trans: "Automatic", cc: "1.5L",
                  price: "32",
                  img: "/images/mercy.png",
                },
                {
                  name: "Toyota Rush",
                  seats: 7, trans: "Automatic", cc: "1.5L",
                  price: "45",
                  img: "/images/mercy.png",
                },
                {
                  name: "Honda HR-V",
                  seats: 5, trans: "Automatic", cc: "1.8L",
                  price: "55",
                  img: "/images/mercy.png",
                },
              ].map((car) => (
                <div key={car.name} className="bg-[#f8f8f6] rounded-2xl p-4 lg:p-5 hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-[#1a1a1a] text-base mb-2">{car.name}</h3>
                  <div className="flex items-center gap-3 lg:gap-4 mb-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {car.seats} Seats</span>
                    <span className="flex items-center gap-1"><Cog className="w-3.5 h-3.5" /> {car.trans}</span>
                    <span className="flex items-center gap-1"><Gauge className="w-3.5 h-3.5" /> {car.cc}</span>
                  </div>

                  <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                    <div>
                      <div className="text-3xl lg:text-[32px] font-bold leading-none text-[#1a1a1a]">${car.price}</div>
                      <div className="text-xs text-gray-400 mt-1 mb-3">/day</div>
                      <button className="btn-glass-fill px-4 py-1.5 border-2 border-[#1d4046] text-[#1d4046] text-xs font-semibold rounded-md">
                        View details
                      </button>
                    </div>
                    <div className="relative h-32 lg:h-36 -mr-2">
                      <img src={car.img} alt={car.name} className="absolute inset-0 w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust banner */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 lg:p-6 grid grid-cols-2 lg:grid-cols-4 gap-y-5">
              {[
                { icon: CheckCircle, title: "Well-maintained vehicles", desc: "Clean, safe & reliable" },
                { icon: Tag, title: "Transparent pricing", desc: "No hidden fees" },
                { icon: MapPin, title: "Island-wide support", desc: "We're here for you" },
                { icon: Users, title: "Trusted by travelers", desc: "10,000+ 5-star reviews" },
              ].map(({ icon: Icon, title, desc }, idx) => (
                <div
                  key={title}
                  className={`flex items-start gap-3 px-4 lg:px-6 ${idx > 0 ? "lg:border-l lg:border-gray-100" : ""}`}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#f0f5f5" }}>
                    <Icon className="w-4 h-4" style={{ color: TEAL }} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#1a1a1a]">{title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 6. TOP DESTINATIONS ==================== */}
        <section id="destinations" className="pt-6 pb-8 lg:pt-8 lg:pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-5">
              <h2 className="font-bold tracking-tight" style={{ color: "#0a0a0a", margin: 0, fontSize: "clamp(1.5rem, 1rem + 1vw, 1.75rem)", letterSpacing: "-0.02em", fontWeight: 700 }}>Top destinations in Bali</h2>
              <a href="#all-destinations" className="hidden sm:flex items-center gap-1 text-sm font-semibold transition-colors" style={{ color: TEAL }}>
                Explore more <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
              {[
                {
                  name: "Ubud",
                  desc: "Rice terraces, culture & peaceful nature",
                  img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: "Seminyak",
                  desc: "Beach clubs, shopping & nightlife",
                  img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: "Uluwatu",
                  desc: "Cliffs, temples & stunning sunsets",
                  img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: "Nusa Penida",
                  desc: "Crystal waters & iconic views",
                  img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: "Canggu",
                  desc: "Surf spots, cafés & laid-back vibes",
                  img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=600&q=80",
                },
              ].map((dest) => (
                <div key={dest.name} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3">
                    <img
                      src={dest.img}
                      alt={dest.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button className="absolute bottom-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                      <ArrowRight className="w-4 h-4" style={{ color: TEAL }} />
                    </button>
                  </div>
                  <h3 className="font-bold text-[#1a1a1a] text-base mb-1">{dest.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{dest.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 7. TESTIMONIALS ==================== */}
        <section id="reviews" className="pt-6 pb-8 lg:pt-8 lg:pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
              <h2 className="font-bold tracking-tight" style={{ color: "#0a0a0a", margin: 0, fontSize: "clamp(1.5rem, 1rem + 1vw, 1.75rem)", letterSpacing: "-0.02em", fontWeight: 700 }}>Loved by travelers</h2>
              <div className="flex items-center gap-3 text-sm">
                <span className="font-bold text-[#1a1a1a]">Excellent</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-sm flex items-center justify-center" style={{ backgroundColor: "#22c55e" }}>
                      <Star className="w-3.5 h-3.5 fill-white text-white" />
                    </div>
                  ))}
                </div>
                <span className="font-medium text-gray-600">4.9/5</span>
                <span className="text-gray-400">based on 2,000+ reviews</span>
              </div>
            </div>

            <div className="relative">
              {/* Carousel arrows */}
              <button className="hidden lg:flex absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full items-center justify-center shadow-md hover:bg-gray-50 z-10">
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </button>
              <button className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full items-center justify-center shadow-md hover:bg-gray-50 z-10">
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </button>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                {[
                  {
                    text: "Super easy booking and the car was in perfect condition. Delivery to our villa was seamless!",
                    name: "Jason R.",
                    country: "Australia",
                    img: "https://i.pravatar.cc/100?img=11",
                  },
                  {
                    text: "Best car rental experience in Bali. No hidden fees and great customer service.",
                    name: "Sarah M.",
                    country: "Singapore",
                    img: "https://i.pravatar.cc/100?img=5",
                  },
                  {
                    text: "The car was clean and fuel-efficient and perfect for our trip around the island.",
                    name: "David L.",
                    country: "United States",
                    img: "https://i.pravatar.cc/100?img=12",
                  },
                  {
                    text: "Highly recommend! They even helped us with local tips and route suggestions.",
                    name: "Mila K.",
                    country: "Indonesia",
                    img: "https://i.pravatar.cc/100?img=9",
                  },
                ].map((review) => (
                  <div key={review.name} className="bg-white border border-gray-100 rounded-2xl p-5 lg:p-6">
                    <Quote className="w-6 h-6 mb-4" style={{ color: TEAL, opacity: 0.3 }} />
                    <p className="text-sm text-gray-700 leading-relaxed mb-5 min-h-[80px]">{review.text}</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <img src={review.img} alt={review.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-sm text-[#1a1a1a]">{review.name}</div>
                        <div className="text-xs text-gray-400">{review.country}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination dots */}
              <div className="flex justify-center gap-1.5 mt-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: i === 0 ? TEAL : "#d1d5db" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 8. CTA BANNER ==================== */}
        <section className="pt-6 pb-10 lg:pt-8 lg:pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative" style={{ backgroundColor: TEAL }}>
            <div className="grid lg:grid-cols-[1fr_1fr]">
              <div className="p-8 lg:p-12 z-10">
                <h2
                  className="font-bold leading-tight"
                  style={{
                    color: "#ffffff",
                    margin: "0 0 0.75rem 0",
                    fontSize: "clamp(1.875rem, 1.25rem + 1.5vw, 2.5rem)",
                    letterSpacing: "-0.01em",
                    fontWeight: 700,
                  }}
                >
                  Ready to explore Bali?
                </h2>
                <p className="text-white/80 text-base mb-7 max-w-md">
                  Book your ride in minutes and hit the road with confidence.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="#book" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1d4046] font-bold rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Book now
                  </a>
                  <a href="/vehicles" className="inline-flex items-center px-6 py-3 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm">
                    View all vehicles
                  </a>
                </div>
              </div>

              {/* Right with image and overlays */}
              <div className="relative min-h-[300px] lg:min-h-0">
                <img
                  src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80"
                  alt="Bali sunset"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${TEAL} 0%, ${TEAL}cc 20%, transparent 60%)` }} />

                {/* Three info points */}
                <div className="relative z-10 h-full flex items-center px-8 py-8 lg:px-10">
                  <div className="space-y-4 text-white">
                    {[
                      { icon: Tag, title: "Best price guarantee" },
                      { icon: Truck, title: "Free delivery anywhere in Bali" },
                      { icon: Clock, title: "24/7 local support" },
                    ].map(({ icon: Icon, title }) => (
                      <div key={title} className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-white shrink-0" />
                        <span className="font-medium text-sm">{title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 9. FOOTER ==================== */}
        <Footer />
      </div>
    </>
  );
}
