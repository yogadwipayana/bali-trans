import { useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Car,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cog,
  Gauge,
  Heart,
  MapPin,
  Phone,
  Shield,
  Users,
} from "lucide-react";

import { Footer } from "@/components/Footer";
import { BookingDateTime } from "@/components/BookingDateTime";
import { BookingSelect } from "@/components/BookingSelect";
import { useFullScreenRoot } from "@/hooks/useFullScreenRoot";

// ---------------------------------------------------------------------------
// Vehicles browse — restyled to share /dashboard-v2's monochrome system:
// black/white/grey, thin 1px borders instead of soft shadows, small 4–10px
// radii, and ink-pill CTAs in place of the previous teal treatment. The
// search form, filter dropdowns, chip row, results header, view toggle,
// pagination, trust strip, CTA banner, and every vehicle's data are
// preserved verbatim — only the chrome changes.
//
// Note: this page used to render its own local `VehiclesHistoryHeader`
// alongside the global `<Header />` from App.jsx (visible double-stacked
// nav). The local header is dropped here so the global ink-themed header
// is the single source of nav.
// ---------------------------------------------------------------------------
const INK = "#0f0f0f"; // primary action / brand text
const TEXT = "#1a1a1a"; // body text
const MUTED = "#7c7c7c"; // secondary text
const FAINT = "#a4a4a4"; // ultra-muted (uppercase labels, captions)
const BORDER = "#e6e6e6"; // panel borders
const SOFT = "#f3f4f4"; // page surface
const HEART = "#ff3a5e"; // saved hearts

const PICKUP_LOCATIONS = ["Ngurah Rai Airport (DPS)"];

// Secondary filter dropdowns. Each list starts with an "All …" entry so the
// control reads cleanly when no filter is applied.
const VEHICLE_TYPE_OPTIONS = ["All types", "SUV", "MPV", "Hatchback", "Sedan"];
const PRICE_RANGE_OPTIONS = [
  "All prices",
  "Under $30",
  "$30 – $50",
  "$50 – $80",
  "Above $80",
];
const TRANSMISSION_OPTIONS = ["All transmissions", "Automatic", "Manual"];
const SEATS_OPTIONS = ["All seats", "4 seats", "5 seats", "7 seats"];
const FUEL_OPTIONS = ["All fuel types", "Petrol", "Diesel", "Hybrid", "Electric"];
const SORT_OPTIONS = [
  "Popularity",
  "Price (low to high)",
  "Price (high to low)",
  "Newest",
];

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

// Source of truth for the vehicle grid. `discount` flags promotional
// pricing; the redesign renders all discount tones with the same ink-on-
// white treatment so the page reads in one voice.
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
  {
    id: "toyota-fortuner",
    name: "Toyota Fortuner",
    type: "SUV",
    seats: 7,
    trans: "Automatic",
    engine: "2.7L",
    bags: 3,
    price: 85,
    oldPrice: 95,
    discount: "10% OFF",
  },
  {
    id: "toyota-yaris",
    name: "Toyota Yaris",
    type: "Hatchback",
    seats: 5,
    trans: "Automatic",
    engine: "1.5L",
    bags: 2,
    price: 35,
  },
  {
    id: "honda-jazz",
    name: "Honda Jazz",
    type: "Hatchback",
    seats: 5,
    trans: "Automatic",
    engine: "1.5L",
    bags: 2,
    price: 33,
    oldPrice: 38,
    discount: "13% OFF",
  },
  {
    id: "suzuki-ertiga",
    name: "Suzuki Ertiga",
    type: "MPV",
    seats: 7,
    trans: "Automatic",
    engine: "1.5L",
    bags: 2,
    price: 38,
  },
  {
    id: "daihatsu-sigra",
    name: "Daihatsu Sigra",
    type: "MPV",
    seats: 7,
    trans: "Manual",
    engine: "1.2L",
    bags: 2,
    price: 22,
  },
  {
    id: "toyota-vios",
    name: "Toyota Vios",
    type: "Sedan",
    seats: 5,
    trans: "Automatic",
    engine: "1.5L",
    bags: 2,
    price: 42,
  },
  {
    id: "honda-city",
    name: "Honda City",
    type: "Sedan",
    seats: 5,
    trans: "Automatic",
    engine: "1.5L",
    bags: 2,
    price: 44,
    oldPrice: 49,
    discount: "10% OFF",
  },
  {
    id: "toyota-calya",
    name: "Toyota Calya",
    type: "MPV",
    seats: 7,
    trans: "Manual",
    engine: "1.2L",
    bags: 2,
    price: 24,
  },
  {
    id: "suzuki-jimny",
    name: "Suzuki Jimny",
    type: "SUV",
    seats: 4,
    trans: "Automatic",
    engine: "1.5L",
    bags: 1,
    price: 60,
    oldPrice: 70,
    discount: "14% OFF",
  },
  {
    id: "mazda-cx5",
    name: "Mazda CX-5",
    type: "SUV",
    seats: 5,
    trans: "Automatic",
    engine: "2.0L",
    bags: 3,
    price: 78,
  },
  {
    id: "toyota-camry",
    name: "Toyota Camry",
    type: "Sedan",
    seats: 5,
    trans: "Automatic",
    engine: "2.5L",
    bags: 3,
    price: 92,
  },
  {
    id: "wuling-confero",
    name: "Wuling Confero",
    type: "MPV",
    seats: 7,
    trans: "Manual",
    engine: "1.5L",
    bags: 2,
    price: 28,
  },
  {
    id: "daihatsu-ayla",
    name: "Daihatsu Ayla",
    type: "Hatchback",
    seats: 5,
    trans: "Manual",
    engine: "1.0L",
    bags: 1,
    price: 20,
    oldPrice: 24,
    discount: "16% OFF",
  },
  {
    id: "nissan-xtrail",
    name: "Nissan X-Trail",
    type: "SUV",
    seats: 7,
    trans: "Automatic",
    engine: "2.5L",
    bags: 3,
    price: 72,
  },
  {
    id: "honda-brv",
    name: "Honda BR-V",
    type: "SUV",
    seats: 7,
    trans: "Automatic",
    engine: "1.5L",
    bags: 2,
    price: 52,
  },
];

// How many cars to show per page in the results grid. 8 fills two rows of
// the xl 4-col grid; on narrower breakpoints it produces 4 / 4 (lg) or 4 / 4
// (sm) which still reads naturally.
const PAGE_SIZE = 8;

// ---------------------------------------------------------------------------
// Small presentational helpers — same rhythm as the redesigned home and
// auth pages so every dashboard-v2-themed page shares its building blocks.
// ---------------------------------------------------------------------------

// Section heading — bold, tight tracking, fluid clamp().
function SectionHeading({ children, as: Tag = "h2" }) {
  return (
    <Tag
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
    </Tag>
  );
}

// 36×36 thin-bordered icon container — used by the trust strip.
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

// Small presentational pill used next to the car name (e.g. "MPV", "SUV").
function TypeBadge({ children }) {
  return (
    <span
      className="inline-flex items-center rounded-[4px] border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em]"
      style={{ borderColor: BORDER, color: MUTED }}
    >
      {children}
    </span>
  );
}

// Discount pill positioned at the top-left corner of each card. Solid ink
// matches the dashboard's PRO-features chip and the special-offer cards
// on the redesigned home page.
function DiscountBadge({ label }) {
  return (
    <span
      className="inline-flex items-center rounded-[4px] px-2 py-0.5 text-[10px] font-bold tracking-[0.04em] text-white"
      style={{ backgroundColor: INK }}
    >
      {label}
    </span>
  );
}

// Vehicle card. Mirrors the dashboard-v2 vehicle card rhythm: meta strip on
// top with type badge + heart toggle, transparent PNG centred, name +
// specs, price + dual CTAs.
function VehicleCard({ car, favorited, onToggleFavorite }) {
  return (
    <article
      className="flex flex-col rounded-[8px] border bg-white p-4 lg:p-5 transition-colors"
      style={{ borderColor: BORDER }}
    >
      {/* Top row — discount on left, heart on right. */}
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          {car.discount ? (
            <DiscountBadge label={car.discount} />
          ) : (
            <span className="block h-[18px]" aria-hidden />
          )}
        </div>
        <button
          type="button"
          aria-label={
            favorited
              ? `Remove ${car.name} from favorites`
              : `Save ${car.name} to favorites`
          }
          aria-pressed={favorited}
          onClick={() => onToggleFavorite(car.id)}
          className="grid h-7 w-7 place-items-center rounded-full transition-colors hover:bg-[#f5f5f5]"
          style={{ color: INK }}
        >
          <Heart
            className="h-[16px] w-[16px]"
            strokeWidth={1.8}
            style={favorited ? { color: HEART, fill: HEART } : undefined}
          />
        </button>
      </div>

      {/* Car cutout */}
      <div className="relative -mx-2 mb-3 h-28 sm:h-32 lg:h-36">
        <img
          src="/images/mercy.png"
          alt={car.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>

      {/* Name + type chip */}
      <div className="mb-2 flex items-center gap-2">
        <h3
          className="text-[15px] font-semibold leading-tight"
          style={{ color: INK }}
        >
          {car.name}
        </h3>
        <TypeBadge>{car.type}</TypeBadge>
      </div>

      {/* Specs row */}
      <div
        className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]"
        style={{ color: MUTED }}
      >
        <span className="inline-flex items-center gap-1">
          <Users className="h-3 w-3" /> {car.seats} Seats
        </span>
        <span className="inline-flex items-center gap-1">
          <Cog className="h-3 w-3" /> {car.trans}
        </span>
        <span className="inline-flex items-center gap-1">
          <Gauge className="h-3 w-3" /> {car.engine}
        </span>
        <span className="inline-flex items-center gap-1">
          <Briefcase className="h-3 w-3" /> {car.bags}{" "}
          {car.bags === 1 ? "Bag" : "Bags"}
        </span>
      </div>

      {/* Price */}
      <div className="mb-4 flex items-baseline gap-2">
        <span
          className="text-[22px] font-bold leading-none"
          style={{ color: INK }}
        >
          ${car.price}
        </span>
        <span className="text-[11px]" style={{ color: MUTED }}>
          / day
        </span>
        {car.oldPrice && (
          <span
            className="ml-auto text-[11px] line-through"
            style={{ color: FAINT }}
          >
            ${car.oldPrice}
          </span>
        )}
      </div>

      {/* CTAs — outlined "View details" + solid ink "Book now". */}
      <div className="mt-auto grid grid-cols-2 gap-2">
        <button
          type="button"
          className="inline-flex h-[36px] items-center justify-center rounded-[6px] border text-[11.5px] font-semibold transition-colors hover:bg-[#f5f5f5]"
          style={{ borderColor: INK, color: INK }}
        >
          View details
        </button>
        <button
          type="button"
          className="inline-flex h-[36px] items-center justify-center rounded-[6px] text-[11.5px] font-bold text-white transition-colors hover:bg-[#1f1f1f]"
          style={{ backgroundColor: INK }}
        >
          Book now
        </button>
      </div>
    </article>
  );
}

// Build the array of page tokens to render: numbers and "…" placeholders.
// For 5-or-fewer pages we just list them; otherwise we always pin first/last
// and show a 1-page window around the active page, inserting "…" wherever a
// gap > 1 falls between adjacent shown pages.
function buildPageList(current, total) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const wanted = new Set([1, total, current - 1, current, current + 1]);
  const pages = [...wanted]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);
  const out = [];
  pages.forEach((page, index) => {
    if (index > 0 && page - pages[index - 1] > 1) out.push("…");
    out.push(page);
  });
  return out;
}

// Pagination control under the results grid. Renders Prev / numbered / Next
// row with disabled boundaries and an ink active-page pill.
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = buildPageList(currentPage, totalPages);

  const navBtn =
    "inline-flex h-9 w-9 items-center justify-center rounded-[6px] border bg-white transition-colors hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white";

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={navBtn}
        style={{ borderColor: BORDER, color: INK }}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <ul className="flex items-center gap-1">
        {pages.map((page, index) =>
          page === "…" ? (
            <li
              key={`gap-${index}`}
              className="select-none px-1 text-[12px]"
              style={{ color: FAINT }}
            >
              …
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                aria-current={page === currentPage ? "page" : undefined}
                aria-label={`Page ${page}`}
                onClick={() => onPageChange(page)}
                className={`inline-flex h-9 min-w-9 items-center justify-center rounded-[6px] border px-3 text-[12.5px] font-semibold transition-colors ${
                  page === currentPage ? "" : "hover:bg-[#f5f5f5]"
                }`}
                style={
                  page === currentPage
                    ? { backgroundColor: INK, borderColor: INK, color: "#ffffff" }
                    : { borderColor: BORDER, color: TEXT }
                }
              >
                {page}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={navBtn}
        style={{ borderColor: BORDER, color: INK }}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
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
      className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] transition-colors"
      style={
        active
          ? { backgroundColor: "#ffffff", border: `1px solid ${BORDER}`, color: INK }
          : { color: FAINT }
      }
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Vehicles() {
  const [booking, setBooking] = useState({
    pickup: PICKUP_LOCATIONS[0],
    pickupAt: "2026-05-18T10:00",
    returnAt: "2026-05-21T10:00",
  });
  const updateBooking = (key, value) =>
    setBooking((prev) => ({ ...prev, [key]: value }));

  // Pagination state. The grid renders only the slice for `currentPage`.
  // `gridSectionRef` lets us scroll the user back up to the results header
  // when they jump pages so they aren't stranded mid-list.
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(VEHICLES.length / PAGE_SIZE));
  const pageStartIndex = (currentPage - 1) * PAGE_SIZE;
  const pageEndIndex = Math.min(pageStartIndex + PAGE_SIZE, VEHICLES.length);
  const visibleVehicles = useMemo(
    () => VEHICLES.slice(pageStartIndex, pageEndIndex),
    [pageStartIndex, pageEndIndex],
  );
  const gridSectionRef = useRef(null);

  const [filters, setFilters] = useState({
    vehicleType: VEHICLE_TYPE_OPTIONS[0],
    price: PRICE_RANGE_OPTIONS[0],
    transmission: TRANSMISSION_OPTIONS[0],
    seats: SEATS_OPTIONS[0],
    fuel: FUEL_OPTIONS[0],
    sort: SORT_OPTIONS[0],
  });
  // Filter / chip changes both reset pagination back to page 1 — handled
  // directly in the setters here so we don't rely on a setState-in-effect
  // pattern (which lints and causes a redundant render).
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const [activeChip, setActiveChipState] = useState(FILTER_CHIPS[0]);
  const setActiveChip = (chip) => {
    setActiveChipState(chip);
    setCurrentPage(1);
  };
  const [view, setView] = useState("grid");
  const [favorites, setFavorites] = useState(new Set());
  const toggleFavorite = (id) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const handlePageChange = (next) => {
    if (next < 1 || next > totalPages || next === currentPage) return;
    setCurrentPage(next);
    gridSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
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
        className="min-h-screen font-sans antialiased"
        style={{
          backgroundColor: SOFT,
          color: TEXT,
          // Force light values for the global dark-mode CSS variables.
          "--text": MUTED,
          "--text-h": INK,
          "--bg": SOFT,
          "--border": BORDER,
          colorScheme: "light",
        }}
      >
        {/* ==================== 1. SEARCH + FILTERS ==================== */}
        <section className="px-4 pb-8 pt-8 sm:px-6 lg:px-8 lg:pb-10 lg:pt-10">
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-7xl space-y-5 rounded-[10px] border bg-white p-5 lg:p-6"
            style={{ borderColor: BORDER }}
          >
            {/* Top row: pickup + dates + search */}
            <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto] lg:gap-3">
              <BookingSelect
                id="v-pickup"
                label="Pickup location"
                icon={MapPin}
                value={booking.pickup}
                onChange={(value) => updateBooking("pickup", value)}
                options={PICKUP_LOCATIONS}
                allowCustom
              />
              <BookingDateTime
                id="v-pickup-at"
                label="Pick-up date & time"
                icon={Calendar}
                value={booking.pickupAt}
                onChange={(value) => updateBooking("pickupAt", value)}
              />
              <BookingDateTime
                id="v-return-at"
                label="Return date & time"
                icon={Calendar}
                value={booking.returnAt}
                min={booking.pickupAt}
                onChange={(value) => updateBooking("returnAt", value)}
              />
              <button
                type="submit"
                className="inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-[6px] px-5 text-[12.5px] font-bold tracking-[0.01em] text-white transition-colors hover:bg-[#1f1f1f] sm:col-span-2 lg:w-auto lg:col-span-1"
                style={{ backgroundColor: INK }}
              >
                Search vehicles <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Middle row: 6 filter dropdowns */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              <BookingSelect
                id="v-type"
                label="Vehicle type"
                icon={Car}
                value={filters.vehicleType}
                onChange={(value) => updateFilter("vehicleType", value)}
                options={VEHICLE_TYPE_OPTIONS}
              />
              <BookingSelect
                id="v-price"
                label="Price range"
                value={filters.price}
                onChange={(value) => updateFilter("price", value)}
                options={PRICE_RANGE_OPTIONS}
              />
              <BookingSelect
                id="v-trans"
                label="Transmission"
                value={filters.transmission}
                onChange={(value) => updateFilter("transmission", value)}
                options={TRANSMISSION_OPTIONS}
              />
              <BookingSelect
                id="v-seats"
                label="Seats"
                value={filters.seats}
                onChange={(value) => updateFilter("seats", value)}
                options={SEATS_OPTIONS}
              />
              <BookingSelect
                id="v-fuel"
                label="Fuel type"
                value={filters.fuel}
                onChange={(value) => updateFilter("fuel", value)}
                options={FUEL_OPTIONS}
              />
              <BookingSelect
                id="v-sort"
                label="Sort by"
                value={filters.sort}
                onChange={(value) => updateFilter("sort", value)}
                options={SORT_OPTIONS}
              />
            </div>

            {/* Bottom row: quick-filter chips. Active = solid ink, idle =
                outlined to match the dashboard's filter pills. */}
            <div className="flex flex-wrap gap-2">
              {FILTER_CHIPS.map((chip) => {
                const active = chip === activeChip;
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setActiveChip(chip)}
                    aria-pressed={active}
                    className="rounded-[20px] border px-4 py-1.5 text-[11.5px] font-semibold transition-colors"
                    style={
                      active
                        ? {
                            backgroundColor: INK,
                            borderColor: INK,
                            color: "#ffffff",
                          }
                        : {
                            backgroundColor: "#ffffff",
                            borderColor: BORDER,
                            color: TEXT,
                          }
                    }
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

        {/* ==================== 2. RESULTS HEADER ==================== */}
        <section
          ref={gridSectionRef}
          className="scroll-mt-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="mx-auto mb-5 flex max-w-7xl items-center justify-between gap-4">
            <div className="text-[14px] font-bold lg:text-[15px]" style={{ color: INK }}>
              Showing{" "}
              <span style={{ color: INK }}>
                {pageStartIndex + 1}–{pageEndIndex}
              </span>{" "}
              of {VEHICLES.length} vehicles
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 text-[11.5px] sm:flex">
                <span style={{ color: MUTED }}>Sort by:</span>
                <span className="font-semibold" style={{ color: INK }}>
                  {filters.sort}
                </span>
              </div>
              <div
                className="flex items-center gap-1 rounded-[8px] border p-1"
                style={{ borderColor: BORDER, backgroundColor: SOFT }}
              >
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

        {/* ==================== 3. VEHICLE GRID ==================== */}
        <section className="px-4 pb-10 sm:px-6 lg:px-8 lg:pb-12">
          <div className="mx-auto max-w-7xl">
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4"
                  : "grid grid-cols-1 gap-3"
              }
            >
              {visibleVehicles.map((car) => (
                <VehicleCard
                  key={car.id}
                  car={car}
                  favorited={favorites.has(car.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </section>

        {/* ==================== 4. TRUST STRIP ==================== */}
        <section className="px-4 pb-10 sm:px-6 lg:px-8 lg:pb-12">
          <div
            className="mx-auto grid max-w-7xl grid-cols-2 gap-y-5 rounded-[8px] border bg-white p-5 lg:grid-cols-4 lg:p-6"
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
                  idx > 0 ? "lg:border-l" : ""
                }`}
                style={idx > 0 ? { borderColor: BORDER } : undefined}
              >
                <IconTile icon={Icon} />
                <div>
                  <div className="text-[13px] font-semibold" style={{ color: INK }}>
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
        </section>

        {/* ==================== 5. CTA BANNER ==================== */}
        <section className="px-4 pb-10 sm:px-6 lg:px-8 lg:pb-12">
          <div
            className="relative mx-auto max-w-7xl overflow-hidden rounded-[12px]"
            style={{ backgroundColor: INK }}
          >
            <div className="grid lg:grid-cols-[1.1fr_1fr]">
              <div className="relative z-10 p-8 lg:p-10">
                <div className="mb-3 inline-flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  <Clock className="h-3 w-3" />
                  Always available
                </div>
                <SectionHeading>
                  <span className="text-white">Need help choosing a car?</span>
                </SectionHeading>
                <p className="mb-6 mt-3 max-w-md text-[14px] text-white/75">
                  Our team is ready to help you find the perfect vehicle for
                  your Bali adventure.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[6px] bg-white px-5 text-[12.5px] font-bold transition-colors hover:bg-white/90"
                    style={{ color: INK }}
                  >
                    <Phone className="h-4 w-4" /> Contact us
                  </a>
                  <Link
                    to="/#book"
                    className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[6px] border border-white/40 px-5 text-[12.5px] font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Book now <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[220px] lg:min-h-0">
                <img
                  src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80"
                  alt="Bali sunset with beach gazebo"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, ${INK} 0%, ${INK}cc 25%, transparent 65%)`,
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

// Inline SVG icons for the Grid/List view toggle. lucide-react doesn't
// always ship LayoutGrid / List consistently, so we draw them here to
// stay self-contained.
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
