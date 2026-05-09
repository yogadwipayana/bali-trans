import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Car,
  CheckCircle,
  Clock,
  Cog,
  Gauge,
  Heart,
  MapPin,
  Phone,
  Shield,
  Users,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingDateTime } from "@/components/BookingDateTime";
import { BookingSelect } from "@/components/BookingSelect";
import { useFullScreenRoot } from "@/hooks/useFullScreenRoot";

const TEAL = "#1d4046";

const PICKUP_LOCATIONS = [
  "Ngurah Rai Airport (DPS)",
  "Ubud",
  "Seminyak",
  "Kuta",
  "Nusa Dua",
];

// Secondary filter dropdowns. Each list starts with an "All …" entry so the
// control reads cleanly when no filter is applied.
const VEHICLE_TYPE_OPTIONS = ["All types", "SUV", "MPV", "Hatchback", "Sedan"];
const PRICE_RANGE_OPTIONS = ["All prices", "Under $30", "$30 – $50", "$50 – $80", "Above $80"];
const TRANSMISSION_OPTIONS = ["All transmissions", "Automatic", "Manual"];
const SEATS_OPTIONS = ["All seats", "4 seats", "5 seats", "7 seats"];
const FUEL_OPTIONS = ["All fuel types", "Petrol", "Diesel", "Hybrid", "Electric"];
const SORT_OPTIONS = ["Popularity", "Price (low to high)", "Price (high to low)", "Newest"];

// Single-select chip filter. "All vehicles" is the default active state.
const FILTER_CHIPS = [
  "All vehicles",
  "SUV",
  "MPV",
  "Hatchback",
  "Automatic",
  "Family",
  "Budget",
  "Premium",
];

// Source of truth for the vehicle grid. `discountTone` drives the accent color
// on the discount pill; `showBookNow` controls whether the filled Book-now CTA
// appears next to View details (the mockup only shows both buttons on row 1).
const VEHICLES = [
  {
    id: "toyota-avanza",
    name: "Toyota Avanza",
    type: "MPV",
    seats: 7,
    trans: "Automatic",
    engine: "1.5L",
    bags: 2,
    price: 32,
    oldPrice: 38,
    discount: "15% OFF",
    discountTone: "green",
    showBookNow: true,
  },
  {
    id: "toyota-rush",
    name: "Toyota Rush",
    type: "SUV",
    seats: 7,
    trans: "Automatic",
    engine: "1.5L",
    bags: 2,
    price: 45,
    oldPrice: 50,
    discount: "10% OFF",
    discountTone: "orange",
    showBookNow: true,
  },
  {
    id: "honda-hrv",
    name: "Honda HR-V",
    type: "SUV",
    seats: 5,
    trans: "Automatic",
    engine: "1.8L",
    bags: 2,
    price: 55,
    showBookNow: true,
  },
  {
    id: "toyota-innova",
    name: "Toyota Innova",
    type: "MPV",
    seats: 7,
    trans: "Automatic",
    engine: "2.0L",
    bags: 3,
    price: 58,
  },
  {
    id: "suzuki-xl7",
    name: "Suzuki XL7",
    type: "MPV",
    seats: 7,
    trans: "Automatic",
    engine: "1.5L",
    bags: 2,
    price: 47,
  },
  {
    id: "daihatsu-terios",
    name: "Daihatsu Terios",
    type: "SUV",
    seats: 7,
    trans: "Automatic",
    engine: "1.5L",
    bags: 2,
    price: 40,
  },
  {
    id: "honda-brio",
    name: "Honda Brio",
    type: "Hatchback",
    seats: 5,
    trans: "Automatic",
    engine: "1.2L",
    bags: 1,
    price: 25,
    oldPrice: 28,
  },
  {
    id: "mitsubishi-xpander",
    name: "Mitsubishi Xpander",
    type: "MPV",
    seats: 7,
    trans: "Automatic",
    engine: "1.5L",
    bags: 2,
    price: 48,
  },
  {
    id: "hyundai-stargazer",
    name: "Hyundai Stargazer",
    type: "MPV",
    seats: 7,
    trans: "Automatic",
    engine: "1.5L",
    bags: 2,
    price: 50,
  },
];

// Small presentational pill used next to the car name (e.g. "MPV", "SUV").
function TypeBadge({ children }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-wide rounded-md bg-gray-100 text-gray-600 uppercase">
      {children}
    </span>
  );
}

// Discount pill positioned at the top-left corner of each car image.
// The color hierarchy matches the mockup: green for the deeper discount (15%),
// orange for 10%.
function DiscountBadge({ label, tone }) {
  const styles =
    tone === "green"
      ? "bg-[#e6f5ea] text-[#2f855a]"
      : "bg-[#fff1e0] text-[#b75c11]";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-md ${styles}`}
    >
      {label}
    </span>
  );
}

function VehicleCard({ car, favorited, onToggleFavorite }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 lg:p-5 flex flex-col hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow">
      {/* Header row: discount badge (if any) + favorite heart */}
      <div className="flex items-start justify-between mb-2">
        <div>
          {car.discount ? (
            <DiscountBadge label={car.discount} tone={car.discountTone} />
          ) : (
            <span className="block h-[18px]" aria-hidden />
          )}
        </div>
        <button
          type="button"
          aria-label={
            favorited ? `Remove ${car.name} from favorites` : `Save ${car.name} to favorites`
          }
          aria-pressed={favorited}
          onClick={() => onToggleFavorite(car.id)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1d4046] hover:bg-gray-50 transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${favorited ? "fill-[#1d4046] text-[#1d4046]" : ""}`}
          />
        </button>
      </div>

      {/* Car image */}
      <div className="relative h-28 sm:h-32 lg:h-36 -mx-2 mb-3">
        <img
          src="/images/mercy.png"
          alt={car.name}
          className="absolute inset-0 w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Name + type chip */}
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-bold text-[#1a1a1a] text-base">{car.name}</h3>
        <TypeBadge>{car.type}</TypeBadge>
      </div>

      {/* Specs row */}
      <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" /> {car.seats} Seats
        </span>
        <span className="flex items-center gap-1">
          <Cog className="w-3.5 h-3.5" /> {car.trans}
        </span>
        <span className="flex items-center gap-1">
          <Gauge className="w-3.5 h-3.5" /> {car.engine}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="w-3.5 h-3.5" /> {car.bags} {car.bags === 1 ? "Bag" : "Bags"}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-2xl font-bold text-[#1a1a1a] leading-none">
          ${car.price}
        </span>
        <span className="text-xs text-gray-500">/day</span>
        {car.oldPrice && (
          <span className="text-xs text-gray-400 line-through ml-auto">
            ${car.oldPrice}
          </span>
        )}
      </div>

      {/* CTA row */}
      <div className={`mt-auto grid gap-2 ${car.showBookNow ? "grid-cols-2" : "grid-cols-1"}`}>
        <button
          type="button"
          className="btn-glass-fill h-9 text-xs font-semibold rounded-md border-2 border-[#1d4046] text-[#1d4046]"
        >
          View details
        </button>
        {car.showBookNow && (
          <button
            type="button"
            className="btn-glass h-9 text-xs font-semibold rounded-md text-white"
            style={{ backgroundColor: TEAL }}
          >
            Book now
          </button>
        )}
      </div>
    </div>
  );
}

// Small icon-only toggle for the Grid / List view switcher above the results.
function ViewToggleButton({ active, onClick, ariaLabel, children }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={active}
      onClick={onClick}
      className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
        active
          ? "bg-white text-[#1d4046] shadow-sm border border-gray-200"
          : "text-gray-400 hover:text-gray-600"
      }`}
    >
      {children}
    </button>
  );
}

export default function Vehicles() {
  const [booking, setBooking] = useState({
    pickup: PICKUP_LOCATIONS[0],
    pickupAt: "2026-05-18T10:00",
    returnAt: "2026-05-21T10:00",
  });
  const updateBooking = (key, value) =>
    setBooking((prev) => ({ ...prev, [key]: value }));

  const [filters, setFilters] = useState({
    vehicleType: VEHICLE_TYPE_OPTIONS[0],
    price: PRICE_RANGE_OPTIONS[0],
    transmission: TRANSMISSION_OPTIONS[0],
    seats: SEATS_OPTIONS[0],
    fuel: FUEL_OPTIONS[0],
    sort: SORT_OPTIONS[0],
  });
  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const [activeChip, setActiveChip] = useState(FILTER_CHIPS[0]);
  const [view, setView] = useState("grid");
  const [favorites, setFavorites] = useState(new Set());
  const toggleFavorite = (id) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search vehicles", { booking, filters, activeChip });
  };

  useFullScreenRoot();

  return (
    <>
      <Helmet>
        <title>Vehicles · Bali Trans · Bali Car Rental</title>
        <meta
          name="description"
          content="Browse our full fleet of reliable cars for self-drive and with-driver rentals across Bali. Transparent prices, flexible booking, island-wide support."
        />
      </Helmet>

      <div
        className="min-h-screen bg-white font-sans text-[#1a1a1a] antialiased"
        style={{
          // Override the dark-mode CSS variables from index.css — see home.jsx.
          "--text": "#6b7280",
          "--text-h": "#1a1a1a",
          "--bg": "#ffffff",
          "--border": "#e5e7eb",
          colorScheme: "light",
          color: "#1a1a1a",
        }}
      >
        <Header activeNav="Vehicles" />

        {/* ==================== 1. HERO ==================== */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 pb-6 lg:pb-10">
            <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-6 lg:gap-10 items-center">
              <div className="order-2 lg:order-1">
                <h1
                  className="font-bold leading-[1.05] tracking-[-0.02em] mb-3 lg:mb-5"
                  style={{
                    color: "#0a0a0a",
                    margin: "0 0 1rem 0",
                    fontSize: "clamp(2rem, 1.25rem + 2vw, 3rem)",
                    letterSpacing: "-0.02em",
                    fontWeight: 700,
                  }}
                >
                  Choose your perfect<br className="hidden lg:inline" /> vehicle in Bali
                </h1>
                <p className="text-gray-500 text-sm lg:text-base leading-relaxed max-w-lg">
                  Browse our wide range of reliable cars for self-drive or with-driver
                  rentals. Quality vehicles, transparent prices, and friendly service.
                </p>
              </div>

              <div className="order-1 lg:order-2 relative w-full">
                <div className="relative w-full h-[200px] sm:h-[280px] lg:h-[360px]">
                  <img
                    src="/images/hero.png"
                    alt="Modern SUVs on a Bali beach with palm trees"
                    className="absolute inset-0 w-full h-full object-contain"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 2. SEARCH + FILTERS ==================== */}
        <section className="px-4 sm:px-6 lg:px-8 pb-8 lg:pb-10">
          <form
            onSubmit={handleSubmit}
            className="max-w-7xl mx-auto bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-gray-100 p-5 lg:p-6 space-y-5"
          >
            {/* Top row: pickup + dates + search */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto] gap-4 lg:gap-3 items-end">
              <BookingSelect
                id="v-pickup"
                label="Pickup location"
                icon={MapPin}
                value={booking.pickup}
                onChange={(v) => updateBooking("pickup", v)}
                options={PICKUP_LOCATIONS}
              />
              <BookingDateTime
                id="v-pickup-at"
                label="Pick-up date & time"
                icon={Calendar}
                value={booking.pickupAt}
                onChange={(v) => updateBooking("pickupAt", v)}
              />
              <BookingDateTime
                id="v-return-at"
                label="Return date & time"
                icon={Calendar}
                value={booking.returnAt}
                min={booking.pickupAt}
                onChange={(v) => updateBooking("returnAt", v)}
              />
              <button
                type="submit"
                className="btn-glass inline-flex items-center justify-center gap-2 h-[46px] px-5 text-white text-sm font-bold rounded-lg w-full lg:w-auto sm:col-span-2 lg:col-span-1"
                style={{ backgroundColor: TEAL }}
              >
                Search vehicles <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Middle row: 6 filter dropdowns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-3">
              <BookingSelect
                id="v-type"
                label="Vehicle type"
                icon={Car}
                value={filters.vehicleType}
                onChange={(v) => updateFilter("vehicleType", v)}
                options={VEHICLE_TYPE_OPTIONS}
              />
              <BookingSelect
                id="v-price"
                label="Price range"
                value={filters.price}
                onChange={(v) => updateFilter("price", v)}
                options={PRICE_RANGE_OPTIONS}
              />
              <BookingSelect
                id="v-trans"
                label="Transmission"
                value={filters.transmission}
                onChange={(v) => updateFilter("transmission", v)}
                options={TRANSMISSION_OPTIONS}
              />
              <BookingSelect
                id="v-seats"
                label="Seats"
                value={filters.seats}
                onChange={(v) => updateFilter("seats", v)}
                options={SEATS_OPTIONS}
              />
              <BookingSelect
                id="v-fuel"
                label="Fuel type"
                value={filters.fuel}
                onChange={(v) => updateFilter("fuel", v)}
                options={FUEL_OPTIONS}
              />
              <BookingSelect
                id="v-sort"
                label="Sort by"
                value={filters.sort}
                onChange={(v) => updateFilter("sort", v)}
                options={SORT_OPTIONS}
              />
            </div>

            {/* Bottom row: quick-filter chips */}
            <div className="flex flex-wrap gap-2">
              {FILTER_CHIPS.map((chip) => {
                const active = chip === activeChip;
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setActiveChip(chip)}
                    aria-pressed={active}
                    className={`px-4 py-2 text-xs font-semibold rounded-full border transition-colors ${
                      active
                        ? "bg-[#1d4046] text-white border-[#1d4046]"
                        : "bg-white text-gray-700 border-gray-200 hover:border-[#1d4046] hover:text-[#1d4046]"
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </form>

          <style>{`
            .bali-time::-webkit-outer-spin-button,
            .bali-time::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            .bali-time { -moz-appearance: textfield; }
          `}</style>
        </section>

        {/* ==================== 3. RESULTS HEADER ==================== */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 mb-5">
            <div className="font-bold text-[#1a1a1a] text-base lg:text-lg">
              {VEHICLES.length} vehicles available
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs">
                <span className="text-gray-500">Sort by:</span>
                <span className="font-semibold text-[#1a1a1a]">{filters.sort}</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg p-1">
                <ViewToggleButton
                  active={view === "grid"}
                  onClick={() => setView("grid")}
                  ariaLabel="Grid view"
                >
                  <GridIcon />
                </ViewToggleButton>
                <ViewToggleButton
                  active={view === "list"}
                  onClick={() => setView("list")}
                  ariaLabel="List view"
                >
                  <ListIcon />
                </ViewToggleButton>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 4. VEHICLE GRID ==================== */}
        <section className="px-4 sm:px-6 lg:px-8 pb-10 lg:pb-12">
          <div className="max-w-7xl mx-auto">
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
                  : "grid grid-cols-1 gap-4"
              }
            >
              {VEHICLES.map((car) => (
                <VehicleCard
                  key={car.id}
                  car={car}
                  favorited={favorites.has(car.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. TRUST STRIP ==================== */}
        <section className="px-4 sm:px-6 lg:px-8 pb-10 lg:pb-12">
          <div className="max-w-7xl mx-auto bg-white border border-gray-100 rounded-2xl p-5 lg:p-6 grid grid-cols-2 lg:grid-cols-4 gap-y-5">
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
              {
                icon: Shield,
                title: "Full insurance",
                desc: "Peace of mind covered",
              },
              {
                icon: Phone,
                title: "Island-wide support",
                desc: "We're here for you 24/7",
              },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <div
                key={title}
                className={`flex items-start gap-3 px-4 lg:px-6 ${
                  idx > 0 ? "lg:border-l lg:border-gray-100" : ""
                }`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#f0f5f5" }}
                >
                  <Icon className="w-4 h-4" style={{ color: TEAL }} />
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#1a1a1a]">{title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== 6. CTA BANNER ==================== */}
        <section className="px-4 sm:px-6 lg:px-8 pb-10 lg:pb-12">
          <div
            className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative"
            style={{ backgroundColor: TEAL }}
          >
            <div className="grid lg:grid-cols-[1.1fr_1fr]">
              <div className="p-8 lg:p-10 z-10 relative">
                <h2
                  className="font-bold leading-tight"
                  style={{
                    color: "#ffffff",
                    margin: "0 0 0.75rem 0",
                    fontSize: "clamp(1.5rem, 1rem + 1.25vw, 2rem)",
                    letterSpacing: "-0.01em",
                    fontWeight: 700,
                  }}
                >
                  Need help choosing a car?
                </h2>
                <p className="text-white/80 text-sm lg:text-base mb-6 max-w-md">
                  Our team is ready to help you find the perfect vehicle for your Bali
                  adventure.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#1d4046] font-bold rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" /> Contact us
                  </a>
                  <Link
                    to="/#book"
                    className="btn-glass inline-flex items-center gap-2 px-5 py-2.5 font-semibold rounded-lg text-sm text-white border border-white/40"
                    style={{ backgroundColor: TEAL }}
                  >
                    Book now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[220px] lg:min-h-0">
                <img
                  src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80"
                  alt="Bali sunset with beach gazebo"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, ${TEAL} 0%, ${TEAL}cc 15%, transparent 55%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

// Inline SVG icons for the Grid/List view toggle. lucide-react v1.14 doesn't
// ship LayoutGrid / List consistently, so we draw them here to stay
// self-contained.
function GridIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <circle cx="4" cy="6" r="1" />
      <circle cx="4" cy="12" r="1" />
      <circle cx="4" cy="18" r="1" />
    </svg>
  );
}
