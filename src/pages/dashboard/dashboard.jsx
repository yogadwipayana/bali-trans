import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookmarkCheck,
  Calendar,
  Car,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Download,
  IdCard,
  LayoutGrid,
  LogOut,
  MoreVertical,
  Navigation,
  Plane,
  Settings,
  Sparkles,
  Star,
  User,
} from "lucide-react";

import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardTopBar from "@/components/DashboardTopBar";
import { getNavIdFromPath } from "@/components/dashboardNav";
import { useLockedViewport } from "@/hooks/useFullScreenRoot";

// ---------------------------------------------------------------------------
// /dashboard — the account home for the Bali Trans shell. Shares the same
// top header + sidebar nav + popover system as /dashboard/vehicles so both
// pages feel like one app, but the main content is dashboard widgets:
// welcome, KPI stats, upcoming trip, quick actions, recent bookings, and
// saved places. No vehicle catalog here — that lives at /dashboard/vehicles.
// ---------------------------------------------------------------------------

// =========================================================================
// MOCK DATA
// =========================================================================

// KPI tiles. Each carries an icon, current value, optional delta vs. last
// month, and a deep-link CTA so the row reads as a quick at-a-glance
// account snapshot.
const STATS = [
  {
    label: "Active bookings",
    value: "1",
    delta: "+1",
    deltaTone: "up",
    icon: Calendar,
    cta: "View details",
    href: "#upcoming",
  },
  {
    label: "Completed trips",
    value: "8",
    delta: "+2 this mo.",
    deltaTone: "up",
    icon: CheckCircle2,
    cta: "Trip history",
    href: "#history",
  },
  {
    label: "Reward points",
    value: "1,250",
    delta: "+185",
    deltaTone: "up",
    icon: Star,
    cta: "See rewards",
    href: "#rewards",
  },
  {
    label: "Saved places",
    value: "6",
    delta: "Updated 2d ago",
    deltaTone: "neutral",
    icon: BookmarkCheck,
    cta: "Manage",
    href: "#saved",
  },
];

// Quick-action shortcuts surfaced next to the upcoming-trip card.
const QUICK_ACTIONS = [
  { id: "new", icon: Car, title: "Book a new car", desc: "Find the perfect vehicle" },
  { id: "extend", icon: Clock, title: "Extend rental", desc: "Need more time?" },
  { id: "airport", icon: Plane, title: "Airport pickup", desc: "Hassle-free pickup" },
  { id: "invoice", icon: Download, title: "Download invoice", desc: "Get your invoice" },
];

// Status pill tones for the recent-bookings table — one source of truth so
// the row + summary chip always read in the same colour.
const STATUS_TONES = {
  Confirmed: { bg: "#ecfdf5", border: "#bbf7d0", text: "#16a34a" },
  Completed: { bg: "#eff6ff", border: "#bfdbfe", text: "#2563eb" },
  Cancelled: { bg: "#fef2f2", border: "#fecaca", text: "#dc2626" },
};

const RECENT_BOOKINGS = [
  {
    id: "AU-250518-7921",
    car: "Toyota Rush",
    seats: 7,
    dates: "May 18 — May 21, 2025",
    days: 3,
    location: "DPS Airport · Ngurah Rai",
    total: "$132.00",
    status: "Confirmed",
  },
  {
    id: "AU-250505-6620",
    car: "Toyota Avanza",
    seats: 7,
    dates: "May 5 — May 8, 2025",
    days: 3,
    location: "Canggu · Delivery",
    total: "$108.00",
    status: "Completed",
  },
  {
    id: "AU-250420-5521",
    car: "Honda HR-V",
    seats: 5,
    dates: "Apr 20 — Apr 23, 2025",
    days: 3,
    location: "Ubud · Hotel Delivery",
    total: "$141.00",
    status: "Completed",
  },
  {
    id: "AU-250315-3310",
    car: "Mitsubishi Xpander",
    seats: 7,
    dates: "Mar 15 — Mar 18, 2025",
    days: 3,
    location: "Seminyak · Delivery",
    total: "$117.00",
    status: "Cancelled",
  },
];

// Saved pickup spots surfaced at the bottom of the page so the user has a
// non-vehicle, account-flavoured row of cards down there.
const SAVED_PLACES = [
  {
    id: "home-villa",
    name: "Home villa",
    sub: "Seminyak, Bali",
    type: "Home",
  },
  {
    id: "ngurah-rai",
    name: "Ngurah Rai Airport",
    sub: "Terminal 2, Tuban",
    type: "Airport",
  },
  {
    id: "ubud-resort",
    name: "Bisma Eight Ubud",
    sub: "Jl. Bisma, Ubud",
    type: "Hotel",
  },
];

// Mock notifications — same shape as /dashboard/vehicles for the bell popover.
const NOTIFICATIONS = [
  {
    id: 1,
    title: "Booking confirmed",
    body: "Your Toyota Rush reservation is ready for pickup.",
    time: "2 min ago",
  },
  {
    id: 2,
    title: "New PRO perk unlocked",
    body: "Free upgrade on weekend rentals all of June.",
    time: "1 h ago",
  },
  {
    id: 3,
    title: "Driver license expiring",
    body: "Your stored license expires in 14 days.",
    time: "Yesterday",
  },
];

// =========================================================================
// SHARED HOOKS
// =========================================================================

// Closes the popover whenever the user clicks/taps outside the wrapping
// element. Same hook /dashboard/vehicles uses.
function useClickOutside(ref, onOutside, isActive) {
  useEffect(() => {
    if (!isActive) return undefined;
    const handler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onOutside();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [ref, onOutside, isActive]);
}

// =========================================================================
// SMALL PRESENTATIONAL PIECES
// =========================================================================

// "Bali Trans" wordmark — same mark as /dashboard/vehicles so the brand
// stays consistent across every authed page.
function BrandMark() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-[8px] bg-[#0d0d0d]">
        <span className="block h-[18px] w-[18px] rotate-[20deg] rounded-tl-[16px] rounded-br-[16px] bg-white" />
      </div>
      <div className="leading-[0.95] text-[10.5px] font-black tracking-[0.04em] text-[#0f0f0f]">
        <div>BALI</div>
        <div>TRANS</div>
      </div>
    </div>
  );
}

// Sidebar item — identical to /dashboard/vehicles so both rails render
// pixel-for-pixel the same.
// The sidebar rail itself now lives in `@/components/DashboardSidebar` so
// /dashboard and /dashboard/vehicles render the exact same rail.

// 36-pixel thin-bordered icon container used by the stat cards and quick-
// action rows. Matches the IconTile used by the redesigned home page.
function IconTile({ icon: Icon, size = 36, tone = "ink" }) {
  const styles =
    tone === "ink"
      ? { width: size, height: size, borderColor: "#e6e6e6", color: "#0f0f0f" }
      : {
          width: size,
          height: size,
          borderColor: "transparent",
          backgroundColor: "#0f0f0f",
          color: "#ffffff",
        };
  return (
    <div
      className="grid shrink-0 place-items-center rounded-[8px] border"
      style={styles}
    >
      <Icon className="h-[16px] w-[16px]" strokeWidth={1.8} />
    </div>
  );
}

// Inline delta chip used inside the stat cards. Up = green, down = red,
// neutral = grey. Tiny and quiet so it doesn't fight the big stat number.
function DeltaChip({ tone, children }) {
  const map = {
    up: { color: "#16a34a", bg: "#ecfdf5" },
    down: { color: "#dc2626", bg: "#fef2f2" },
    neutral: { color: "#7c7c7c", bg: "#f3f4f4" },
  };
  const palette = map[tone] ?? map.neutral;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-[4px] px-1.5 py-0.5 text-[10px] font-semibold"
      style={{ color: palette.color, backgroundColor: palette.bg }}
    >
      {tone === "up" && <ArrowUpRight className="h-3 w-3" strokeWidth={2.4} />}
      {children}
    </span>
  );
}

// =========================================================================
// MAIN PAGE
// =========================================================================

export default function Dashboard() {
  // Shared shell: locked viewport so the header + sidebar stay pinned and
  // only the main content area scrolls. Same hook /dashboard/vehicles uses.
  useLockedViewport();

  const navigate = useNavigate();
  const location = useLocation();

  // ----- Live clock (UTC +8) ------------------------------------------------
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Makassar",
  });

  // ----- Sidebar nav --------------------------------------------------------
  const [activeNav, setActiveNav] = useState(
    () => getNavIdFromPath(location.pathname) ?? "home",
  );

  // ----- Header popovers ---------------------------------------------------
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  useClickOutside(profileRef, () => setProfileOpen(false), profileOpen);
  useClickOutside(
    notificationsRef,
    () => setNotificationsOpen(false),
    notificationsOpen,
  );

  // ----- Render ------------------------------------------------------------
  return (
    <div className="h-screen overflow-hidden bg-[#f3f4f4] font-sans text-[#111111] [color-scheme:light]">
      <Helmet>
        <title>Dashboard · Bali Trans</title>
        <meta
          name="description"
          content="Your Bali Trans account at a glance — upcoming trips, recent bookings, rewards, and quick actions."
        />
      </Helmet>

      {/* ============================================================
          TOP BAR — same as /dashboard/vehicles for visual continuity.
          ============================================================ */}
      <DashboardTopBar />

      {/* ============================================================
          BODY — sidebar (left) + dashboard widgets (right).
          ============================================================ */}
      <div className="flex h-[calc(100vh-var(--header-h))] overflow-hidden">
        {/* --- Sidebar nav rail ---------------------------------- */}
        <DashboardSidebar
          activeId={activeNav}
          onSelect={(item) => setActiveNav(item.id)}
        />

        {/* --- Main content ------------------------------------------
            Scrolls within its own panel so the header + sidebar stay
            pinned while the user moves through the widget stack. */}
        <main className="min-w-0 flex-1 overflow-y-auto bg-[#f3f4f4]">
          <div className="mx-auto max-w-[1200px] px-4 py-4 pb-20 md:px-6 md:py-6 md:pb-6 lg:px-8 lg:py-8">
            {/* ---- Welcome strip ---- */}
            <header className="mb-6">
              <span className="inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#7c7c7c]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0f0f0f]" />
                Member · 1,250 points
              </span>
              <h1
                className="font-bold tracking-tight"
                style={{
                  color: "#0f0f0f",
                  margin: "6px 0 4px 0",
                  fontSize: "clamp(1.375rem, 0.95rem + 1vw, 1.75rem)",
                  letterSpacing: "-0.02em",
                  fontWeight: 700,
                  lineHeight: 1.15,
                }}
              >
                Welcome back, Yoga{" "}
                <span aria-hidden="true">👋</span>
              </h1>
              <p className="text-[13px] text-[#7c7c7c]">
                Here&apos;s what&apos;s happening with your trips today.
              </p>
            </header>

            {/* ---- Stats row ---- */}
            <section
              aria-label="Account snapshot"
              className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
            >
              {STATS.map(({ label, value, delta, deltaTone, icon: Icon, cta, href }) => (
                <article
                  key={label}
                  className="rounded-[8px] border border-[#e6e6e6] bg-white p-4 lg:p-5"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <IconTile icon={Icon} />
                    <DeltaChip tone={deltaTone}>{delta}</DeltaChip>
                  </div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#a4a4a4]">
                    {label}
                  </div>
                  <div
                    className="mt-1 text-[26px] font-bold leading-none lg:text-[28px]"
                    style={{ color: "#0f0f0f", letterSpacing: "-0.02em" }}
                  >
                    {value}
                  </div>
                  <a
                    href={href}
                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold transition-opacity hover:opacity-70"
                    style={{ color: "#0f0f0f" }}
                  >
                    {cta} <ArrowRight className="h-3 w-3" />
                  </a>
                </article>
              ))}
            </section>

            {/* ---- Upcoming trip + Quick actions ---- */}
            <section
              aria-label="Upcoming trip and quick actions"
              className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
            >
              {/* Upcoming Trip — large card */}
              <article className="rounded-[8px] border border-[#e6e6e6] bg-white p-5 lg:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2
                    className="font-bold"
                    style={{ color: "#0f0f0f", fontSize: "16px", margin: 0, letterSpacing: "-0.01em" }}
                  >
                    Upcoming trip
                  </h2>
                  <span
                    className="rounded-[4px] border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em]"
                    style={{
                      backgroundColor: STATUS_TONES.Confirmed.bg,
                      borderColor: STATUS_TONES.Confirmed.border,
                      color: STATUS_TONES.Confirmed.text,
                    }}
                  >
                    Confirmed
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-[auto_minmax(0,1fr)]">
                  {/* Visual: gradient frame + studio cutout */}
                  <div
                    className="relative h-[120px] w-[180px] overflow-hidden rounded-[6px] border border-[#e6e6e6]"
                    style={{ backgroundColor: "#f3f4f4" }}
                  >
                    <img
                      src="/images/mercy.png"
                      alt="Toyota Rush"
                      className="absolute inset-0 h-full w-full scale-[1.18] object-contain"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-[16px] font-semibold leading-tight text-[#0f0f0f]">
                      Toyota Rush
                    </h3>
                    <div className="mt-1 text-[11.5px] text-[#7c7c7c]">
                      7 Seats · Automatic · 1.5L
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-3 text-[11.5px]">
                      <div>
                        <div className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#a4a4a4]">
                          Pick-up
                        </div>
                        <div className="mt-0.5 font-semibold text-[#0f0f0f]">
                          May 18, 2025 · 10:00
                        </div>
                        <div className="text-[#7c7c7c]">
                          Ngurah Rai Airport (DPS)
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#a4a4a4]">
                          Return
                        </div>
                        <div className="mt-0.5 font-semibold text-[#0f0f0f]">
                          May 21, 2025 · 10:00
                        </div>
                        <div className="text-[#7c7c7c]">
                          Ngurah Rai Airport (DPS)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-[#e6e6e6] pt-4">
                  <div>
                    <div className="text-[10.5px] font-medium uppercase tracking-[0.08em] text-[#a4a4a4]">
                      Total
                    </div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <div className="text-[20px] font-bold text-[#0f0f0f]">
                        $132.00
                      </div>
                      <span
                        className="rounded-[4px] border px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.08em]"
                        style={{
                          backgroundColor: STATUS_TONES.Confirmed.bg,
                          borderColor: STATUS_TONES.Confirmed.border,
                          color: STATUS_TONES.Confirmed.text,
                        }}
                      >
                        Paid
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[6px] border px-3 text-[11.5px] font-semibold transition-colors hover:bg-[#f5f5f5]"
                      style={{ borderColor: "#e6e6e6", color: "#0f0f0f" }}
                    >
                      Contact support
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[6px] px-3 text-[11.5px] font-bold text-white transition-colors hover:bg-[#1f1f1f]"
                      style={{ backgroundColor: "#0f0f0f" }}
                    >
                      View booking <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>

              {/* Quick actions */}
              <article className="rounded-[8px] border border-[#e6e6e6] bg-white p-5 lg:p-6">
                <h2
                  className="mb-3 font-bold"
                  style={{ color: "#0f0f0f", fontSize: "16px", margin: 0, letterSpacing: "-0.01em" }}
                >
                  Quick actions
                </h2>
                <div className="mt-4 flex flex-col">
                  {QUICK_ACTIONS.map(({ id, icon: Icon, title, desc }) => (
                    <button
                      key={id}
                      type="button"
                      className="group -mx-2 flex items-center gap-3 rounded-[6px] px-2 py-2.5 transition-colors hover:bg-[#f5f5f5]"
                      onClick={() => {
                        if (id === "new") navigate("/dashboard/vehicles");
                      }}
                    >
                      <IconTile icon={Icon} />
                      <div className="min-w-0 flex-1 text-left">
                        <div className="truncate text-[13px] font-semibold text-[#0f0f0f]">
                          {title}
                        </div>
                        <div className="truncate text-[11px] text-[#7c7c7c]">
                          {desc}
                        </div>
                      </div>
                      <ChevronRight
                        className="h-3.5 w-3.5 shrink-0 text-[#a4a4a4] transition-transform group-hover:translate-x-0.5"
                      />
                    </button>
                  ))}
                </div>
              </article>
            </section>

            {/* ---- Recent bookings ---- */}
            <section
              aria-label="Recent bookings"
              className="mt-6 rounded-[8px] border border-[#e6e6e6] bg-white p-5 lg:p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2
                  className="font-bold"
                  style={{ color: "#0f0f0f", fontSize: "16px", margin: 0, letterSpacing: "-0.01em" }}
                >
                  Recent bookings
                </h2>
                <a
                  href="#history"
                  className="inline-flex items-center gap-1 text-[11.5px] font-semibold transition-opacity hover:opacity-70"
                  style={{ color: "#0f0f0f" }}
                >
                  View all <ArrowRight className="h-3 w-3" />
                </a>
              </div>

              <div className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0">
                <table className="w-full text-left text-[12.5px]" style={{ minWidth: 720 }}>
                  <thead>
                    <tr className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a4a4a4]">
                      <th className="py-2 pr-4 font-semibold">Booking ID</th>
                      <th className="py-2 pr-4 font-semibold">Vehicle</th>
                      <th className="py-2 pr-4 font-semibold">Dates</th>
                      <th className="py-2 pr-4 font-semibold">Location</th>
                      <th className="py-2 pr-4 font-semibold">Total</th>
                      <th className="py-2 pr-4 font-semibold">Status</th>
                      <th className="py-2 pl-2 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_BOOKINGS.map((booking) => {
                      const tone = STATUS_TONES[booking.status];
                      return (
                        <tr
                          key={booking.id}
                          className="border-t border-[#ededed] transition-colors hover:bg-[#fafafa]"
                        >
                          <td className="whitespace-nowrap py-3 pr-4 font-mono text-[11.5px] text-[#5e5e5e]">
                            {booking.id}
                          </td>
                          <td className="py-3 pr-4">
                            <div className="font-semibold text-[#0f0f0f]">
                              {booking.car}
                            </div>
                            <div className="mt-0.5 text-[10.5px] text-[#7c7c7c]">
                              {booking.seats} Seats
                            </div>
                          </td>
                          <td className="py-3 pr-4">
                            <div className="whitespace-nowrap text-[#0f0f0f]">
                              {booking.dates}
                            </div>
                            <div className="mt-0.5 text-[10.5px] text-[#7c7c7c]">
                              {booking.days} days
                            </div>
                          </td>
                          <td className="py-3 pr-4 text-[#0f0f0f]">
                            {booking.location}
                          </td>
                          <td className="whitespace-nowrap py-3 pr-4 font-semibold text-[#0f0f0f]">
                            {booking.total}
                          </td>
                          <td className="py-3 pr-4">
                            <span
                              className="inline-block rounded-[4px] border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em]"
                              style={{
                                backgroundColor: tone.bg,
                                borderColor: tone.border,
                                color: tone.text,
                              }}
                            >
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-3 pl-2 text-right">
                            <button
                              type="button"
                              aria-label={`Actions for ${booking.id}`}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-[4px] text-[#a4a4a4] transition-colors hover:bg-[#f5f5f5] hover:text-[#0f0f0f]"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ---- Saved places + Account snapshot ---- */}
            <section
              aria-label="Saved places and account"
              className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
            >
              {/* Saved pickup places */}
              <article className="rounded-[8px] border border-[#e6e6e6] bg-white p-5 lg:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2
                    className="font-bold"
                    style={{ color: "#0f0f0f", fontSize: "16px", margin: 0, letterSpacing: "-0.01em" }}
                  >
                    Saved places
                  </h2>
                  <a
                    href="#saved"
                    className="inline-flex items-center gap-1 text-[11.5px] font-semibold transition-opacity hover:opacity-70"
                    style={{ color: "#0f0f0f" }}
                  >
                    Manage <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {SAVED_PLACES.map((place) => (
                    <li
                      key={place.id}
                      className="flex items-center gap-3 rounded-[6px] border p-3 transition-colors hover:bg-[#fafafa]"
                      style={{ borderColor: "#e6e6e6" }}
                    >
                      <IconTile icon={Navigation} />
                      <div className="min-w-0">
                        <div className="truncate text-[12.5px] font-semibold text-[#0f0f0f]">
                          {place.name}
                        </div>
                        <div className="truncate text-[10.5px] text-[#7c7c7c]">
                          {place.sub}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>

              {/* Account at a glance */}
              <article className="rounded-[8px] border border-[#e6e6e6] bg-white p-5 lg:p-6">
                <h2
                  className="mb-4 font-bold"
                  style={{ color: "#0f0f0f", fontSize: "16px", margin: 0, letterSpacing: "-0.01em" }}
                >
                  Account
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <IconTile icon={CreditCard} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] font-semibold text-[#0f0f0f]">
                        Visa •••• 4242
                      </div>
                      <div className="text-[10.5px] text-[#7c7c7c]">
                        Default · Expires 12/27
                      </div>
                    </div>
                    <span
                      className="rounded-[4px] border px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.08em]"
                      style={{
                        backgroundColor: STATUS_TONES.Completed.bg,
                        borderColor: STATUS_TONES.Completed.border,
                        color: STATUS_TONES.Completed.text,
                      }}
                    >
                      Active
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <IconTile icon={IdCard} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] font-semibold text-[#0f0f0f]">
                        Driver license
                      </div>
                      <div className="text-[10.5px] text-[#7c7c7c]">
                        Expires in 14 days
                      </div>
                    </div>
                    <span
                      className="rounded-[4px] border bg-[#fef3c7] px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.08em] text-[#a16207]"
                      style={{ borderColor: "#fde68a" }}
                    >
                      Renew
                    </span>
                  </li>
                </ul>
              </article>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
