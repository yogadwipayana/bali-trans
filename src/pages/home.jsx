import { useEffect, useRef, useState } from "react";
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
  Search,
  Tag,
  Truck,
  Shield,
  Clock,
  Wallet,
  CheckCircle,
  Check,
  User,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

// Custom social icons (since lucide may not have all)
const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const WhatsappIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
  </svg>
);

const TripadvisorIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.006 4.295c-2.67 0-5.34.784-7.635 2.353H0l1.928 2.2a5.4 5.4 0 003.949 9.108c1.6 0 3.058-.7 4.058-1.811L12 18.342l2.065-2.197a5.398 5.398 0 008.005-7.297L24 6.648h-4.358a13.594 13.594 0 00-7.636-2.353zm-.42 2.838a11.5 11.5 0 015.65 1.418A6.196 6.196 0 0012 13.62a6.197 6.197 0 00-5.235-5.07c1.677-.92 3.65-1.418 5.821-1.418z" />
  </svg>
);

const navLinks = ["Vehicles", "Deals", "Destinations", "Services", "Reviews", "About us", "Contact"];

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

const TEAL = "#1d4046";
const TEAL_DARK = "#173238";
const CREAM = "#fff5e6";

const PICKUP_LOCATIONS = [
  "Ngurah Rai Airport (DPS)",
  "Ubud",
  "Seminyak",
  "Kuta",
  "Nusa Dua",
];

const VEHICLE_TYPES = [
  "All vehicle types",
  "SUV",
  "MPV",
  "Sedan",
  "Convertible",
];

// ---------- Date helpers (local time, no UTC drift) ----------
const pad2 = (n) => String(n).padStart(2, "0");

// Parse "YYYY-MM-DDTHH:MM" as a local Date.
function parseISOLocal(s) {
  if (!s) return new Date();
  const [d, t = "00:00"] = s.split("T");
  const [y, mo, da] = d.split("-").map(Number);
  const [h, mi] = t.split(":").map(Number);
  return new Date(y, mo - 1, da, h, mi);
}

// Serialize a Date back to "YYYY-MM-DDTHH:MM" in local time.
function toISOLocal(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

// "DD/MM/YYYY HH:MM" for display in the trigger button.
function formatDisplay(d) {
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

// Custom date + time picker that fully replaces <input type="datetime-local">.
// Renders a styled calendar grid, prev/next month nav, and zero-padded HH/MM
// number inputs — all keyboard-friendly and consistent with the rest of the form.
function BookingDateTime({ id, label, icon: Icon, value, onChange, min }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const current = parseISOLocal(value);
  const minDate = min ? parseISOLocal(min) : null;

  const [view, setView] = useState({
    y: current.getFullYear(),
    m: current.getMonth(),
  });

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const openMenu = () => {
    setView({ y: current.getFullYear(), m: current.getMonth() });
    setOpen(true);
  };
  const toggleMenu = () => (open ? setOpen(false) : openMenu());

  const setDay = (d) => {
    const next = new Date(view.y, view.m, d, current.getHours(), current.getMinutes());
    if (minDate && next < startOfDay(minDate)) return;
    onChange(toISOLocal(next));
  };

  const setHour = (h) => {
    const next = new Date(current);
    next.setHours(Math.max(0, Math.min(23, Number.isFinite(h) ? h : 0)));
    onChange(toISOLocal(next));
  };

  const setMinute = (mi) => {
    const next = new Date(current);
    next.setMinutes(Math.max(0, Math.min(59, Number.isFinite(mi) ? mi : 0)));
    onChange(toISOLocal(next));
  };

  // Build the month grid (Monday-first, 6×7 max).
  const first = new Date(view.y, view.m, 1);
  const startDay = (first.getDay() + 6) % 7; // 0 = Mon
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const monthName = new Date(view.y, view.m, 1).toLocaleString("en-US", {
    month: "long",
  });
  const today = new Date();

  const isDisabled = (d) => {
    if (!minDate) return false;
    return new Date(view.y, view.m, d) < startOfDay(minDate);
  };

  const prevMonth = () =>
    setView(({ y, m }) => (m === 0 ? { y: y - 1, m: 11 } : { y, m: m - 1 }));
  const nextMonth = () =>
    setView(({ y, m }) => (m === 11 ? { y: y + 1, m: 0 } : { y, m: m + 1 }));

  return (
    <div className="min-w-0" ref={wrapRef}>
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold text-gray-500 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <button
          id={id}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={toggleMenu}
          className={`flex items-center gap-2 h-[46px] w-full px-3 bg-gray-50 rounded-lg border transition-colors text-left
            ${open ? "border-[#1d4046] bg-white" : "border-gray-200 hover:border-gray-300"}`}
        >
          <Icon className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="flex-1 min-w-0 truncate text-sm text-gray-800">
            {formatDisplay(current)}
          </span>
        </button>

        {open && (
          <div
            role="dialog"
            className="absolute z-30 left-0 mt-1.5 w-[300px] max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-3"
          >
            {/* Month nav */}
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={prevMonth}
                aria-label="Previous month"
                className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="text-sm font-semibold text-gray-800">
                {monthName} {view.y}
              </div>
              <button
                type="button"
                onClick={nextMonth}
                aria-label="Next month"
                className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                <div
                  key={d}
                  className="text-center text-[10px] font-semibold uppercase tracking-wide text-gray-400 py-1"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {cells.map((d, i) => {
                if (d === null) return <div key={`e${i}`} />;
                const cellDate = new Date(view.y, view.m, d);
                const selected = sameDay(cellDate, current);
                const isToday = sameDay(cellDate, today);
                const disabled = isDisabled(d);
                let cls =
                  "h-8 rounded-md text-sm transition-colors flex items-center justify-center";
                if (selected) cls += " bg-[#1d4046] text-white font-semibold";
                else if (isToday) cls += " border border-[#1d4046] text-[#1d4046] font-semibold";
                else if (disabled) cls += " text-gray-300 cursor-not-allowed";
                else cls += " text-gray-700 hover:bg-gray-100";
                return (
                  <button
                    key={d}
                    type="button"
                    disabled={disabled}
                    onClick={() => setDay(d)}
                    className={cls}
                  >
                    {d}
                  </button>
                );
              })}
            </div>

            {/* Time row */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-semibold text-gray-500">Time</span>
              <div className="ml-auto flex items-center gap-1">
                <input
                  type="number"
                  min={0}
                  max={23}
                  inputMode="numeric"
                  aria-label="Hours"
                  value={pad2(current.getHours())}
                  onChange={(e) => setHour(Number(e.target.value))}
                  className="bali-time w-12 h-8 text-center text-sm font-semibold text-gray-800 bg-gray-50 rounded-md border border-gray-200 focus:border-[#1d4046] focus:bg-white focus:outline-none"
                />
                <span className="text-gray-400 font-bold">:</span>
                <input
                  type="number"
                  min={0}
                  max={59}
                  inputMode="numeric"
                  aria-label="Minutes"
                  value={pad2(current.getMinutes())}
                  onChange={(e) => setMinute(Number(e.target.value))}
                  className="bali-time w-12 h-8 text-center text-sm font-semibold text-gray-800 bg-gray-50 rounded-md border border-gray-200 focus:border-[#1d4046] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-glass px-3 py-1.5 text-xs font-bold text-white rounded-md"
                style={{ backgroundColor: "#1d4046" }}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Fully custom dropdown — replaces native <select> so the open menu can
// be styled to match the rest of the design. Supports click-outside to
// close, Escape to close, and arrow / Enter / Home / End keyboard nav.
function BookingSelect({ id, label, icon: Icon, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(() =>
    Math.max(0, options.indexOf(value)),
  );
  const wrapRef = useRef(null);
  const listRef = useRef(null);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Keep the active option in view while navigating with the keyboard.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [open, activeIdx]);

  const openMenu = () => {
    setActiveIdx(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };
  const toggleMenu = () => (open ? setOpen(false) : openMenu());

  const select = (idx) => {
    onChange(options[idx]);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault();
      openMenu();
      return;
    }
    if (!open) return;
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIdx((i) => (i + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIdx((i) => (i - 1 + options.length) % options.length);
        break;
      case "Home":
        e.preventDefault();
        setActiveIdx(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIdx(options.length - 1);
        break;
      case "Enter":
        e.preventDefault();
        select(activeIdx);
        break;
      default:
    }
  };

  return (
    <div className="min-w-0" ref={wrapRef}>
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold text-gray-500 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <button
          id={id}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={toggleMenu}
          onKeyDown={onKeyDown}
          className={`flex items-center gap-2 h-[46px] w-full px-3 bg-gray-50 rounded-lg border transition-colors text-left
            ${open ? "border-[#1d4046] bg-white" : "border-gray-200 hover:border-gray-300"}`}
        >
          <Icon className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="flex-1 min-w-0 truncate text-sm text-gray-800">{value}</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <ul
            ref={listRef}
            role="listbox"
            tabIndex={-1}
            className="absolute z-20 left-0 right-0 mt-1.5 max-h-64 overflow-auto rounded-lg border border-gray-200 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] py-1"
          >
            {options.map((opt, idx) => {
              const selected = opt === value;
              const active = idx === activeIdx;
              return (
                <li
                  key={opt}
                  data-idx={idx}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onMouseDown={(e) => e.preventDefault() /* keep focus on button */}
                  onClick={() => select(idx)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer
                    ${active ? "bg-gray-50" : ""}
                    ${selected ? "text-[#1d4046] font-semibold" : "text-gray-700"}`}
                >
                  <span className="flex-1 truncate">{opt}</span>
                  {selected && <Check className="w-4 h-4 text-[#1d4046] shrink-0" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12 lg:h-14">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2.5 shrink-0">
                <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ backgroundColor: TEAL }}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 19l4-7 4 4 6-10" />
                  </svg>
                </div>
                <div className="leading-tight">
                  <div className="font-bold text-[15px] tracking-wide" style={{ color: TEAL }}>BALI TRANS</div>
                  <div className="text-[10px] tracking-[0.15em] uppercase text-gray-400 -mt-0.5">Bali Car Rental</div>
                </div>
              </a>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-7">
                {navLinks.map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-[13.5px] font-medium text-gray-600 hover:text-[#1d4046] transition-colors"
                  >
                    {l}
                  </a>
                ))}
              </nav>

              {/* Right Actions */}
              <div className="flex items-center gap-3 lg:gap-5">
                <a href="#signin" className="hidden sm:flex items-center gap-1.5 text-[13.5px] font-medium text-gray-700 hover:text-[#1d4046]">
                  <User className="w-4 h-4" />
                  Sign in
                </a>
                <a
                  href="#book"
                  className="btn-glass hidden sm:inline-flex items-center px-5 py-2.5 text-white text-[13px] font-semibold rounded-lg"
                  style={{ backgroundColor: TEAL }}
                >
                  Book now
                </a>
                <button className="lg:hidden p-2 text-gray-700" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
          {mobileOpen && (
            <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
              {navLinks.map((l) => (
                <a key={l} href={`#${l.toLowerCase().replace(/\s/g, "-")}`} className="block text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>
                  {l}
                </a>
              ))}
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
                <a href="#signin" className="flex items-center gap-2 text-sm font-medium"><User className="w-4 h-4" /> Sign in</a>
                <a href="#book" className="btn-glass inline-flex items-center justify-center px-5 py-2.5 text-white text-sm font-semibold rounded-lg" style={{ backgroundColor: TEAL }}>
                  Book now
                </a>
              </div>
            </div>
          )}
        </header>

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
                Drive Bali. Make it<br className="hidden lg:inline" /> unforgettable.
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
              <a href="#all-vehicles" className="hidden sm:flex items-center gap-1 text-sm font-semibold transition-colors" style={{ color: TEAL }}>
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
                  <a href="#vehicles" className="inline-flex items-center px-6 py-3 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm">
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
        <footer className="py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[26.5fr_15fr_15fr_17fr_26.5fr] gap-8 lg:gap-6 pb-10 mb-6 border-b border-gray-100">
              {/* Brand */}
              <div className="col-span-2 md:col-span-3 lg:col-span-1">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ backgroundColor: TEAL }}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 19l4-7 4 4 6-10" />
                    </svg>
                  </div>
                  <div className="leading-tight">
                    <div className="font-bold text-[15px]" style={{ color: TEAL }}>BALI TRANS</div>
                    <div className="text-[10px] tracking-[0.15em] uppercase text-gray-400 -mt-0.5">Bali Car Rental</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed max-w-xs">
                  Your trusted car rental partner in Bali. Quality vehicles, fair prices, and exceptional service.
                </p>
                <div className="flex gap-2">
                  {[
                    { Icon: InstagramIcon, label: "Instagram" },
                    { Icon: FacebookIcon, label: "Facebook" },
                    { Icon: WhatsappIcon, label: "WhatsApp" },
                    { Icon: TripadvisorIcon, label: "TripAdvisor" },
                  ].map(({ Icon, label }) => (
                    <a key={label} href="#social" aria-label={label} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-white transition-colors" style={{ "--hover-bg": TEAL }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = TEAL; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#f3f4f6"; }}>
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {[
                {
                  head: "COMPANY",
                  items: ["About us", "Careers", "Blog", "Terms & conditions", "Privacy policy"],
                },
                {
                  head: "RESOURCES",
                  items: ["Destinations", "Bali travel tips", "Events in Bali", "Guide & articles", "Sitemap"],
                },
              ].map((col) => (
                <div key={col.head}>
                  <h4 className="font-bold text-[11px] tracking-[0.2em] uppercase text-gray-700 mb-4">{col.head}</h4>
                  <ul className="space-y-2.5">
                    {col.items.map((item) => (
                      <li key={item}>
                        <a href={`#${item.toLowerCase().replace(/\s/g, "-")}`} className="text-sm text-gray-500 hover:text-[#1d4046] transition-colors">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="min-w-0">
                <h4 className="font-bold text-[11px] tracking-[0.2em] uppercase text-gray-700 mb-4">CONTACT</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap"><Phone className="w-3.5 h-3.5 shrink-0" style={{ color: TEAL }} /> +62 812 3456 7890</li>
                  <li className="flex items-center gap-2 text-sm text-gray-500 min-w-0"><Mail className="w-3.5 h-3.5 shrink-0" style={{ color: TEAL }} /> <span className="truncate">hello@balitrans.com</span></li>
                  <li className="flex items-start gap-2 text-sm text-gray-500 leading-snug"><MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: TEAL }} /> Ngurah Rai Airport, Bali, Indonesia</li>
                </ul>
              </div>

              <div className="col-span-2 md:col-span-3 lg:col-span-1">
                <h4 className="font-bold text-[11px] tracking-[0.2em] uppercase text-gray-700 mb-2">STAY UPDATED</h4>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">Subscribe for exclusive deals and travel inspiration.</p>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1d4046] mb-2"
                />
                <button
                  className="btn-glass w-full py-2.5 text-white text-sm font-semibold rounded-lg"
                  style={{ backgroundColor: TEAL }}
                >
                  Subscribe
                </button>
              </div>
            </div>

            <p className="text-center text-xs text-gray-400">
              © {new Date().getFullYear()} Bali Trans Car Rental. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
