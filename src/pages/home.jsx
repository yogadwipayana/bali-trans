import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Calendar,
  Car,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cog,
  Footprints,
  Gauge,
  Heart,
  MapPin,
  Quote,
  Shield,
  Star,
  Tag,
  Truck,
  Users,
  Wallet,
} from "lucide-react";

import { Footer } from "@/components/Footer";
import { BookingDateTime } from "@/components/BookingDateTime";
import { BookingSelect } from "@/components/BookingSelect";
import { useFullScreenRoot } from "@/hooks/useFullScreenRoot";

// ---------------------------------------------------------------------------
// Marketing home rebuilt to share the visual system used on /dashboard-v2:
// monochrome black/white/grey, thin 1px borders instead of soft shadows, and
// small 4–8px radii instead of the rounded-2xl/3xl curves the page used to
// have. All product copy and section ordering is preserved — only the
// chrome around it changes.
//
// The palette is centralised so individual sections stay in sync if any
// shade gets nudged later.
// ---------------------------------------------------------------------------
const INK = "#0f0f0f"; // primary action / brand text
const TEXT = "#1a1a1a"; // body text
const MUTED = "#7c7c7c"; // secondary text
const BORDER = "#e6e6e6"; // panel borders
const SOFT = "#f3f4f4"; // page surface
const STAR = "#ffc933"; // ratings
const HEART = "#ff3a5e"; // hearts / urgency

// Form data — same contract as before so the booking widget keeps working.
const PICKUP_LOCATIONS = ["Ngurah Rai Airport (DPS)"];
const VEHICLE_TYPES = ["All vehicle types", "SUV", "MPV", "Sedan", "Convertible"];

// Special offers — same content as the previous design, restyled.
const SPECIAL_OFFERS = [
  {
    title: "Early Bird Saver",
    desc: "Book 7+ days in advance and save big.",
    meta: "Min. 3 days rental",
    discount: "15%",
    img: "/images/mercy.png",
  },
  {
    title: "Weekend Escape",
    desc: "Perfect for short trips and quick getaways.",
    meta: "Valid Fri – Sun",
    discount: "10%",
    img: "/images/mercy.png",
  },
  {
    title: "Long Stay Value",
    desc: "Stay longer, pay less. Best value for 7+ days.",
    meta: "Min. 7 days rental",
    discount: "20%",
    img: "/images/mercy.png",
  },
  {
    title: "Family Adventure",
    desc: "Spacious rides for your whole crew.",
    meta: "SUV & Van only",
    discount: "10%",
    img: "/images/mercy.png",
  },
];

// Featured fleet — preserved verbatim.
const FEATURED_FLEET = [
  {
    name: "Toyota Avanza",
    seats: 7,
    trans: "Automatic",
    cc: "1.5L",
    price: "32",
    img: "/images/mercy.png",
    favorite: false,
  },
  {
    name: "Toyota Rush",
    seats: 7,
    trans: "Automatic",
    cc: "1.5L",
    price: "45",
    img: "/images/mercy.png",
    favorite: true,
  },
  {
    name: "Honda HR-V",
    seats: 5,
    trans: "Automatic",
    cc: "1.8L",
    price: "55",
    img: "/images/mercy.png",
    favorite: false,
  },
];

const DESTINATIONS = [
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
];

const TESTIMONIALS = [
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
];

// ---------------------------------------------------------------------------
// Tiny shared chrome — kept alongside the page rather than promoted to the
// component library because it's home-page-specific.
// ---------------------------------------------------------------------------

// "Eyebrow" label — a small uppercase strip used above section headlines.
// Mirrors the dashboard's "RENTAL TYPE" / "BODY TYPE" small-cap labels.
function Eyebrow({ children }) {
  return (
    <span
      className="inline-block text-[10.5px] font-semibold uppercase tracking-[0.18em]"
      style={{ color: "#7c7c7c" }}
    >
      {children}
    </span>
  );
}

// Section heading. Bold, tight tracking, fluid clamp() so it scales without
// blowing past the design rhythm at narrow widths.
function SectionHeading({ children }) {
  return (
    <h2
      className="font-bold tracking-tight"
      style={{
        color: INK,
        margin: 0,
        fontSize: "clamp(1.5rem, 1rem + 1vw, 1.875rem)",
        letterSpacing: "-0.02em",
        lineHeight: 1.15,
        fontWeight: 700,
      }}
    >
      {children}
    </h2>
  );
}

// "View all" trailing link — small bold text + arrow.
function SectionLink({ href, children }) {
  return (
    <a
      href={href}
      className="hidden sm:inline-flex items-center gap-1 text-[12px] font-semibold transition-colors hover:opacity-70"
      style={{ color: INK }}
    >
      {children} <ArrowRight className="w-3 h-3" />
    </a>
  );
}

// Solid black pill button. Used for primary actions across the page. The
// component renders an `<a>` when given an href and a `<button>` otherwise,
// so the same visual lives on both navigation links and form submitters.
function PrimaryButton({ children, type = "button", ...props }) {
  const Tag = props.href ? "a" : "button";
  return (
    <Tag
      type={Tag === "button" ? type : undefined}
      {...props}
      className={`inline-flex items-center justify-center gap-2 h-[44px] rounded-[6px] px-5 text-[12.5px] font-bold tracking-[0.01em] text-white transition-colors hover:bg-[#1f1f1f] ${
        props.className ?? ""
      }`}
      style={{ backgroundColor: INK }}
    >
      {children}
    </Tag>
  );
}

// Outlined black pill — secondary CTA partner.
function OutlineButton({ children, ...props }) {
  const Tag = props.href ? "a" : "button";
  return (
    <Tag
      type={Tag === "button" ? "button" : undefined}
      {...props}
      className={`inline-flex items-center justify-center gap-2 h-[44px] rounded-[6px] border px-5 text-[12.5px] font-semibold transition-colors hover:bg-[#0f0f0f] hover:text-white ${
        props.className ?? ""
      }`}
      style={{ borderColor: INK, color: INK }}
    >
      {children}
    </Tag>
  );
}

// 36×36 thin-bordered square that holds an icon — the dashboard uses 8px-
// radius dark tiles for accent containers; we mirror that visual rhythm.
function IconTile({ icon: Icon, size = 36 }) {
  return (
    <div
      className="grid shrink-0 place-items-center rounded-[8px] border"
      style={{ width: size, height: size, borderColor: BORDER, color: INK }}
    >
      <Icon className="h-[16px] w-[16px]" strokeWidth={1.8} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  const [booking, setBooking] = useState({
    pickup: PICKUP_LOCATIONS[0],
    pickupAt: "2026-05-18T10:00",
    returnAt: "2026-05-21T10:00",
    vehicleType: VEHICLE_TYPES[0],
  });
  const updateBooking = (key, value) =>
    setBooking((prev) => ({ ...prev, [key]: value }));

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    // Hook: pass `booking` to your search route / API. For now we just log
    // and scroll to the fleet section.
    console.log("Search vehicles", booking);
    document.getElementById("vehicles")?.scrollIntoView({ behavior: "smooth" });
  };

  // Toggle a card's heart icon in the featured fleet — purely cosmetic on
  // the home page but keeps the interaction parity with /dashboard-v2.
  const initialFavorites = new Set(
    FEATURED_FLEET.filter((vehicle) => vehicle.favorite).map((vehicle) => vehicle.name),
  );
  const [favorites, setFavorites] = useState(initialFavorites);
  const toggleFavorite = (name) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  useFullScreenRoot();

  return (
    <>
      <Helmet>
        <title>Bali Trans · Bali Car Rental</title>
        <meta
          name="description"
          content="Premium vehicles, transparent prices, and friendly local service. Drive Bali, make it unforgettable."
        />
      </Helmet>

      <div
        className="min-h-screen font-sans antialiased"
        style={{
          backgroundColor: SOFT,
          color: TEXT,
          // Force light values for the global dark-mode CSS variables so
          // section text doesn't flip greys under prefers-color-scheme.
          "--text": MUTED,
          "--text-h": INK,
          "--bg": SOFT,
          "--border": BORDER,
          colorScheme: "light",
        }}
      >
        {/* ==================== 1. HERO ==================== */}
        <section className="relative overflow-hidden bg-white">
          <div className="grid lg:grid-cols-2 items-center gap-6 lg:gap-10">
            {/* Left content — padded to align with the page's max-w-7xl gutter */}
            <div className="order-2 lg:order-1 px-4 sm:px-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-0 py-10 lg:py-16 text-center lg:text-left">
              <Eyebrow>✦ RELIABLE · FLEXIBLE · ISLAND-WIDE</Eyebrow>

              <h1
                className="mt-3 lg:mt-4 mb-3 lg:mb-5 font-bold leading-[1.05]"
                style={{
                  color: INK,
                  margin: "0.75rem 0 1rem 0",
                  fontSize: "clamp(2rem, 1.25rem + 3vw, 3.5rem)",
                  letterSpacing: "-0.025em",
                  fontWeight: 700,
                }}
              >
                Your Bali journey
                <br className="hidden lg:inline" /> starts here.
              </h1>

              <p
                className="text-[14px] lg:text-[15.5px] leading-relaxed mb-6 lg:mb-8 max-w-xl mx-auto lg:mx-0"
                style={{ color: MUTED }}
              >
                Premium vehicles, transparent prices, and friendly local service.
                Airport pickup, hotel delivery, and 24/7 support across Bali.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8 lg:mb-10 max-w-md mx-auto lg:mx-0">
                <PrimaryButton href="#book" className="flex-1">
                  Book your ride <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
                <OutlineButton href="#vehicles" className="flex-1">
                  View vehicles
                </OutlineButton>
              </div>

              {/* 3 features row */}
              <div className="grid grid-cols-3 gap-3 lg:gap-5 max-w-2xl mx-auto lg:mx-0">
                {[
                  {
                    icon: Wallet,
                    title: "No hidden fees",
                    desc: "What you see is what you pay",
                  },
                  {
                    icon: Truck,
                    title: "Free delivery",
                    desc: "Airport, hotel, villa and anywhere in Bali",
                  },
                  {
                    icon: Clock,
                    title: "24/7 support",
                    desc: "Local team ready to help anytime",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left gap-2 lg:gap-3"
                  >
                    <IconTile icon={Icon} />
                    <div className="leading-tight min-w-0">
                      <div
                        className="text-[12px] lg:text-[13px] font-semibold"
                        style={{ color: INK }}
                      >
                        {title}
                      </div>
                      <div
                        className="hidden lg:block text-[11px] mt-1 leading-snug"
                        style={{ color: MUTED }}
                      >
                        {desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="mt-8 lg:mt-10 flex items-center justify-center lg:justify-start gap-3 lg:gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="Customer"
                      className="h-8 w-8 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div className="text-[12.5px] font-semibold" style={{ color: INK }}>
                  10,000+ happy customers
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5"
                      style={{ color: STAR, fill: STAR }}
                    />
                  ))}
                  <span className="ml-1 text-[12px]" style={{ color: MUTED }}>
                    4.9/5
                  </span>
                </div>
              </div>
            </div>

            {/* Right hero image — bleeds to the viewport edge */}
            <div className="order-1 lg:order-2 relative w-full">
              <div className="relative w-full h-[220px] sm:h-[320px] lg:h-[480px] xl:h-[520px]">
                <img
                  src="/images/hero.png"
                  alt="Modern SUVs parked at Bali gates with ocean and palm trees at sunset"
                  className="absolute inset-0 h-full w-full object-contain"
                  style={{ display: "block", objectPosition: "center" }}
                  loading="eager"
                  onError={(event) => {
                    // Graceful fallback to Unsplash if the local hero PNG
                    // hasn't shipped yet.
                    const fallbacks = [
                      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80",
                      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=80",
                    ];
                    const current = event.currentTarget.src;
                    const next = fallbacks.find(
                      (url) => !current.includes(url.split("?")[0].split("/").pop()),
                    );
                    if (next) event.currentTarget.src = next;
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 2. BOOKING WIDGET ==================== */}
        <section
          id="book"
          className="relative -mt-2 lg:-mt-6 px-4 sm:px-6 lg:px-8 pb-14"
        >
          <form
            onSubmit={handleBookingSubmit}
            className="mx-auto max-w-6xl rounded-[10px] border bg-white p-5 lg:p-6"
            style={{ borderColor: BORDER }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] gap-4 lg:gap-3 items-end">
              <BookingSelect
                id="bf-pickup"
                label="Pickup location"
                icon={MapPin}
                value={booking.pickup}
                onChange={(value) => updateBooking("pickup", value)}
                options={PICKUP_LOCATIONS}
                allowCustom
              />
              <BookingDateTime
                id="bf-pickup-at"
                label="Pick-up date & time"
                icon={Calendar}
                value={booking.pickupAt}
                onChange={(value) => updateBooking("pickupAt", value)}
              />
              <BookingDateTime
                id="bf-return-at"
                label="Return date & time"
                icon={Calendar}
                value={booking.returnAt}
                min={booking.pickupAt}
                onChange={(value) => updateBooking("returnAt", value)}
              />
              <BookingSelect
                id="bf-vehicle"
                label="Vehicle type"
                icon={Car}
                value={booking.vehicleType}
                onChange={(value) => updateBooking("vehicleType", value)}
                options={VEHICLE_TYPES}
              />
              <PrimaryButton
                type="submit"
                className="w-full lg:w-auto sm:col-span-2 lg:col-span-1"
              >
                Search vehicles <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </div>

            {/* Trust strip */}
            <div
              className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-2 border-t pt-6"
              style={{ borderColor: BORDER }}
            >
              {[
                {
                  icon: CheckCircle,
                  title: "Free cancellation",
                  desc: "Up to 24h before pickup",
                },
                {
                  icon: Gauge,
                  title: "Unlimited mileage",
                  desc: "Drive without limits",
                },
                { icon: Shield, title: "Full insurance", desc: "Peace of mind covered" },
                { icon: Clock, title: "Flexible rentals", desc: "Daily, weekly, monthly" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 px-1">
                  <IconTile icon={Icon} />
                  <div className="leading-tight">
                    <div
                      className="text-[13px] font-semibold"
                      style={{ color: INK }}
                    >
                      {title}
                    </div>
                    <div className="text-[11.5px] mt-0.5" style={{ color: MUTED }}>
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </form>

          {/* Hide the spinner on the HH/MM number inputs inside the date-time
              picker, matching the previous behavior. */}
          <style>{`
            .bali-time::-webkit-outer-spin-button,
            .bali-time::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            .bali-time { -moz-appearance: textfield; }
          `}</style>
        </section>

        {/* ==================== 3. SPECIAL OFFERS ==================== */}
        <section id="deals" className="px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <Eyebrow>Limited time</Eyebrow>
                <div className="mt-2">
                  <SectionHeading>Special offers for your Bali trip</SectionHeading>
                </div>
              </div>
              <SectionLink href="#all-deals">View all deals</SectionLink>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {SPECIAL_OFFERS.map((deal) => (
                <article
                  key={deal.title}
                  className="group relative flex min-h-[210px] flex-col overflow-hidden rounded-[8px] border bg-white p-4 lg:p-5"
                  style={{ borderColor: BORDER }}
                >
                  {/* Discount tile — solid black mirrors the dashboard's
                      "PRO features" chip, swapping out the previous orange
                      cream-on-orange treatment. */}
                  <div
                    className="absolute right-4 top-4 grid place-items-center rounded-[6px] px-2.5 py-1 text-center"
                    style={{ backgroundColor: INK, minWidth: 44 }}
                  >
                    <div className="text-[12px] font-bold leading-none text-white">
                      {deal.discount}
                    </div>
                    <div className="mt-0.5 text-[8px] font-bold tracking-[0.12em] text-white/80">
                      OFF
                    </div>
                  </div>

                  <div className="relative z-10 pr-14">
                    <h3
                      className="text-[15.5px] font-bold leading-tight"
                      style={{ color: INK, letterSpacing: "-0.01em" }}
                    >
                      {deal.title}
                    </h3>
                    <p
                      className="mt-1.5 text-[12px] leading-relaxed"
                      style={{ color: MUTED }}
                    >
                      {deal.desc}
                    </p>
                  </div>

                  <div className="flex-1" />

                  <p
                    className="relative z-10 text-[10.5px] font-semibold uppercase tracking-[0.08em]"
                    style={{ color: "#a4a4a4" }}
                  >
                    {deal.meta}
                  </p>

                  <img
                    src={deal.img}
                    alt={deal.title}
                    className="pointer-events-none absolute -right-3 bottom-2 h-auto w-[68%] lg:w-[72%] object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 4. FEATURED FLEET ==================== */}
        <section id="vehicles" className="px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <Eyebrow>Studio cutouts</Eyebrow>
                <div className="mt-2">
                  <SectionHeading>Featured fleet</SectionHeading>
                </div>
              </div>
              <SectionLink href="/vehicles">View all vehicles</SectionLink>
            </div>

            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              {FEATURED_FLEET.map((car) => {
                const isFavorite = favorites.has(car.name);
                return (
                  <article
                    key={car.name}
                    className="flex flex-col rounded-[8px] border bg-white p-4 lg:p-5 transition-colors"
                    style={{ borderColor: BORDER }}
                  >
                    {/* Top row mirrors the dashboard vehicle card: a meta
                        chip on the left, heart toggle on the right. */}
                    <div className="flex items-start justify-between gap-2">
                      <div
                        className="flex min-w-0 items-center gap-3 text-[10.5px] font-medium"
                        style={{ color: MUTED }}
                      >
                        <span className="inline-flex items-center gap-1">
                          <Footprints className="h-3 w-3" style={{ color: INK }} />
                          <strong className="font-semibold" style={{ color: INK }}>
                            Bali fleet
                          </strong>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Star
                            className="h-3 w-3"
                            style={{ color: STAR, fill: STAR }}
                          />
                          <strong className="font-semibold" style={{ color: INK }}>
                            4.9
                          </strong>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(car.name)}
                        aria-label={
                          isFavorite
                            ? `Remove ${car.name} from saved`
                            : `Save ${car.name}`
                        }
                        aria-pressed={isFavorite}
                        className="grid h-6 w-6 place-items-center rounded-full transition-colors hover:bg-[#f5f5f5]"
                        style={{ color: INK }}
                      >
                        <Heart
                          className="h-[16px] w-[16px]"
                          strokeWidth={1.8}
                          style={
                            isFavorite
                              ? { color: HEART, fill: HEART }
                              : undefined
                          }
                        />
                      </button>
                    </div>

                    {/* Car cutout */}
                    <div className="relative mt-2 flex h-32 lg:h-36 items-center justify-center">
                      <img
                        src={car.img}
                        alt={car.name}
                        className="absolute inset-0 h-full w-full object-contain"
                      />
                    </div>

                    {/* Spec strip */}
                    <div
                      className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]"
                      style={{ color: MUTED }}
                    >
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-3 w-3" /> {car.seats} Seats
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Cog className="h-3 w-3" /> {car.trans}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Gauge className="h-3 w-3" /> {car.cc}
                      </span>
                    </div>

                    {/* Name + price + CTA */}
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <h3
                          className="text-[15px] font-semibold leading-tight"
                          style={{ color: INK }}
                        >
                          {car.name}
                        </h3>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span
                            className="text-[22px] font-bold leading-none"
                            style={{ color: INK }}
                          >
                            ${car.price}
                          </span>
                          <span
                            className="text-[11px] font-medium"
                            style={{ color: MUTED }}
                          >
                            / day
                          </span>
                        </div>
                      </div>
                      <OutlineButton
                        type="button"
                        className="!h-[36px] !px-3 !text-[11.5px]"
                      >
                        View details
                      </OutlineButton>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Trust banner */}
            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 rounded-[8px] border bg-white p-5 lg:p-6"
              style={{ borderColor: BORDER }}
            >
              {[
                {
                  icon: CheckCircle,
                  title: "Well-maintained vehicles",
                  desc: "Clean, safe & reliable",
                },
                {
                  icon: Tag,
                  title: "Transparent pricing",
                  desc: "No hidden fees",
                },
                {
                  icon: MapPin,
                  title: "Island-wide support",
                  desc: "We're here for you",
                },
                {
                  icon: Users,
                  title: "Trusted by travelers",
                  desc: "10,000+ 5-star reviews",
                },
              ].map(({ icon: Icon, title, desc }, idx) => (
                <div
                  key={title}
                  className={`flex items-start gap-3 px-4 lg:px-6 ${
                    idx > 0 ? "lg:border-l" : ""
                  }`}
                  style={idx > 0 ? { borderColor: BORDER } : undefined}
                >
                  <IconTile icon={Icon} />
                  <div>
                    <div
                      className="text-[13px] font-semibold"
                      style={{ color: INK }}
                    >
                      {title}
                    </div>
                    <div
                      className="mt-0.5 text-[11.5px]"
                      style={{ color: MUTED }}
                    >
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. TOP DESTINATIONS ==================== */}
        <section id="destinations" className="px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <Eyebrow>Where to drive</Eyebrow>
                <div className="mt-2">
                  <SectionHeading>Top destinations in Bali</SectionHeading>
                </div>
              </div>
              <SectionLink href="#all-destinations">Explore more</SectionLink>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
              {DESTINATIONS.map((dest) => (
                <a
                  key={dest.name}
                  href={`#${dest.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group block"
                >
                  <div
                    className="relative aspect-[3/4] overflow-hidden rounded-[8px] border"
                    style={{ borderColor: BORDER }}
                  >
                    <img
                      src={dest.img}
                      alt={dest.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Bottom gradient + name overlay so the photography
                        keeps the visual lead while the label stays legible. */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 70%)",
                      }}
                    />
                    {/* Black square arrow chip — same square micro-button
                        treatment used by the dashboard's vehicle card. */}
                    <div
                      className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-[6px] border transition-transform group-hover:translate-x-0.5"
                      style={{
                        backgroundColor: "#ffffff",
                        borderColor: BORDER,
                        color: INK,
                      }}
                    >
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[14px] font-semibold leading-tight">
                        {dest.name}
                      </div>
                      <div className="mt-0.5 line-clamp-1 text-[10.5px] text-white/85">
                        {dest.desc}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 6. TESTIMONIALS ==================== */}
        <section id="reviews" className="px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>Reviews</Eyebrow>
                <div className="mt-2">
                  <SectionHeading>Loved by travelers</SectionHeading>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[12px]">
                <span className="font-bold" style={{ color: INK }}>
                  Excellent
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="grid h-5 w-5 place-items-center rounded-[3px]"
                      style={{ backgroundColor: INK }}
                    >
                      <Star
                        className="h-3 w-3"
                        style={{ color: STAR, fill: STAR }}
                      />
                    </span>
                  ))}
                </div>
                <span className="font-medium" style={{ color: TEXT }}>
                  4.9/5
                </span>
                <span style={{ color: MUTED }}>based on 2,000+ reviews</span>
              </div>
            </div>

            <div className="relative">
              {/* Carousel arrows — bordered black squares to fit the
                  dashboard's button treatment. */}
              <button
                type="button"
                aria-label="Previous"
                className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-[8px] border bg-white transition-colors hover:bg-[#f5f5f5] lg:grid"
                style={{ borderColor: BORDER }}
              >
                <ChevronLeft className="h-4 w-4" style={{ color: INK }} />
              </button>
              <button
                type="button"
                aria-label="Next"
                className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-[8px] border bg-white transition-colors hover:bg-[#f5f5f5] lg:grid"
                style={{ borderColor: BORDER }}
              >
                <ChevronRight className="h-4 w-4" style={{ color: INK }} />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {TESTIMONIALS.map((review) => (
                  <article
                    key={review.name}
                    className="rounded-[8px] border bg-white p-5 lg:p-6"
                    style={{ borderColor: BORDER }}
                  >
                    <Quote
                      className="mb-3 h-5 w-5"
                      style={{ color: INK, opacity: 0.4 }}
                    />
                    <p
                      className="mb-5 min-h-[80px] text-[12.5px] leading-relaxed"
                      style={{ color: TEXT }}
                    >
                      {review.text}
                    </p>
                    <div
                      className="flex items-center gap-3 border-t pt-4"
                      style={{ borderColor: BORDER }}
                    >
                      <img
                        src={review.img}
                        alt={review.name}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div>
                        <div
                          className="text-[12.5px] font-semibold"
                          style={{ color: INK }}
                        >
                          {review.name}
                        </div>
                        <div className="text-[10.5px]" style={{ color: MUTED }}>
                          {review.country}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination dots — black active, grey inactive. */}
              <div className="mt-6 flex justify-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: i === 0 ? INK : "#d1d5db" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 7. CTA BANNER ==================== */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div
            className="relative mx-auto max-w-7xl overflow-hidden rounded-[12px]"
            style={{ backgroundColor: INK }}
          >
            <div className="grid lg:grid-cols-[1fr_1fr]">
              <div className="relative z-10 p-8 lg:p-12">
                <div className="mb-3 inline-flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  <Star
                    className="h-3 w-3"
                    style={{ color: STAR, fill: STAR }}
                  />
                  Ready when you are
                </div>
                <h2
                  className="font-bold leading-tight text-white"
                  style={{
                    margin: "0 0 0.75rem 0",
                    fontSize: "clamp(1.875rem, 1.25rem + 1.5vw, 2.5rem)",
                    letterSpacing: "-0.02em",
                    fontWeight: 700,
                  }}
                >
                  Ready to explore Bali?
                </h2>
                <p className="mb-7 max-w-md text-[14px] text-white/75">
                  Book your ride in minutes and hit the road with confidence.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#book"
                    className="inline-flex h-[44px] items-center justify-center rounded-[6px] bg-white px-5 text-[12.5px] font-bold transition-colors hover:bg-white/90"
                    style={{ color: INK }}
                  >
                    Book now
                  </a>
                  <a
                    href="/vehicles"
                    className="inline-flex h-[44px] items-center justify-center rounded-[6px] border border-white/40 px-5 text-[12.5px] font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    View all vehicles
                  </a>
                </div>
              </div>

              {/* Right photo with dark gradient + 3 inline guarantees. */}
              <div className="relative min-h-[260px] lg:min-h-0">
                <img
                  src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80"
                  alt="Bali sunset"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, ${INK} 0%, ${INK}cc 25%, transparent 65%)`,
                  }}
                />
                <div className="relative z-10 flex h-full items-center px-8 py-8 lg:px-10">
                  <ul className="space-y-4 text-white">
                    {[
                      { icon: Tag, title: "Best price guarantee" },
                      { icon: Truck, title: "Free delivery anywhere in Bali" },
                      { icon: Clock, title: "24/7 local support" },
                    ].map(({ icon: Icon, title }) => (
                      <li key={title} className="flex items-center gap-3">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[6px] border border-white/25">
                          <Icon className="h-4 w-4 text-white" />
                        </span>
                        <span className="text-[13px] font-medium">{title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 8. FOOTER ==================== */}
        <Footer />
      </div>
    </>
  );
}
