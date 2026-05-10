import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router";
import {
  ArrowRight,
  Bell,
  Clock,
  LogOut,
  MoreVertical,
  Navigation,
  Settings,
  LayoutGrid,
  User,
} from "lucide-react";

import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardTopBar from "@/components/DashboardTopBar";
import { getNavIdFromPath } from "@/components/dashboardNav";
import { useLockedViewport } from "@/hooks/useFullScreenRoot";

const STATUS_TONES = {
  Confirmed: { bg: "#ecfdf5", border: "#bbf7d0", text: "#16a34a" },
  Completed: { bg: "#eff6ff", border: "#bfdbfe", text: "#2563eb" },
  Cancelled: { bg: "#fef2f2", border: "#fecaca", text: "#dc2626" },
};

const BOOKINGS = [
  { id: "AU-250518-7921", car: "Toyota Rush", seats: 7, dates: "May 18 — May 21, 2025", days: 3, location: "DPS Airport · Ngurah Rai", total: "$132.00", status: "Confirmed" },
  { id: "AU-250505-6620", car: "Toyota Avanza", seats: 7, dates: "May 5 — May 8, 2025", days: 3, location: "Canggu · Delivery", total: "$108.00", status: "Completed" },
  { id: "AU-250420-5521", car: "Honda HR-V", seats: 5, dates: "Apr 20 — Apr 23, 2025", days: 3, location: "Ubud · Hotel Delivery", total: "$141.00", status: "Completed" },
  { id: "AU-250315-3310", car: "Mitsubishi Xpander", seats: 7, dates: "Mar 15 — Mar 18, 2025", days: 3, location: "Seminyak · Delivery", total: "$117.00", status: "Cancelled" },
  { id: "AU-250228-2201", car: "Toyota Innova", seats: 7, dates: "Feb 28 — Mar 3, 2025", days: 3, location: "Sanur · Hotel Delivery", total: "$156.00", status: "Completed" },
  { id: "AU-250210-1105", car: "Suzuki Ertiga", seats: 7, dates: "Feb 10 — Feb 12, 2025", days: 2, location: "Kuta · Delivery", total: "$78.00", status: "Completed" },
];

const NOTIFICATIONS = [
  { id: 1, title: "Booking confirmed", body: "Your Toyota Rush reservation is ready for pickup.", time: "2 min ago" },
  { id: 2, title: "Driver license expiring", body: "Your stored license expires in 14 days.", time: "Yesterday" },
];

function useClickOutside(ref, onOutside, isActive) {
  useEffect(() => {
    if (!isActive) return undefined;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onOutside(); };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => { document.removeEventListener("mousedown", handler); document.removeEventListener("touchstart", handler); };
  }, [ref, onOutside, isActive]);
}

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

export default function DashboardBookings() {
  useLockedViewport();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeNav, setActiveNav] = useState(() => getNavIdFromPath(location.pathname) ?? "bookings");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  useClickOutside(notificationsRef, () => setNotificationsOpen(false), notificationsOpen);
  useClickOutside(profileRef, () => setProfileOpen(false), profileOpen);

  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Makassar" });

  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? BOOKINGS : BOOKINGS.filter((b) => b.status === filter);

  return (
    <div className="h-screen overflow-hidden bg-[#f3f4f4] font-sans text-[#111111] [color-scheme:light]">
      <Helmet>
        <title>Bookings · Bali Trans</title>
      </Helmet>

      <DashboardTopBar />

      {/* Body */}
      <div className="flex h-[calc(100vh-var(--header-h))] overflow-hidden">
        <DashboardSidebar activeId={activeNav} onSelect={(item) => setActiveNav(item.id)} />

        <main className="min-w-0 flex-1 overflow-y-auto bg-[#f3f4f4]">
          <div className="mx-auto max-w-[1200px] px-4 py-4 pb-20 md:px-6 md:py-6 md:pb-6 lg:px-8 lg:py-8">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="m-0 text-[22px] font-bold tracking-tight text-[#0f0f0f]">My Bookings</h1>
                <p className="mt-1 text-[13px] text-[#7c7c7c]">{BOOKINGS.length} total bookings</p>
              </div>
              <button type="button" onClick={() => navigate("/dashboard/vehicles")} className="inline-flex h-9 items-center gap-1.5 rounded-[6px] bg-[#0f0f0f] px-4 text-[12px] font-bold text-white hover:bg-[#1f1f1f]">
                New booking <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Filter tabs */}
            <div className="mb-4 flex gap-2">
              {["All", "Confirmed", "Completed", "Cancelled"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`rounded-[6px] border px-3 py-1.5 text-[11.5px] font-semibold transition-colors ${filter === tab ? "border-[#0f0f0f] bg-[#0f0f0f] text-white" : "border-[#e6e6e6] bg-white text-[#3a3a3a] hover:bg-[#f5f5f5]"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Table */}
            <section className="rounded-[8px] border border-[#e6e6e6] bg-white p-5 lg:p-6">
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
                    {filtered.map((booking) => {
                      const tone = STATUS_TONES[booking.status];
                      return (
                        <tr key={booking.id} className="border-t border-[#ededed] transition-colors hover:bg-[#fafafa]">
                          <td className="whitespace-nowrap py-3 pr-4 font-mono text-[11.5px] text-[#5e5e5e]">{booking.id}</td>
                          <td className="py-3 pr-4">
                            <div className="font-semibold text-[#0f0f0f]">{booking.car}</div>
                            <div className="mt-0.5 text-[10.5px] text-[#7c7c7c]">{booking.seats} Seats</div>
                          </td>
                          <td className="py-3 pr-4">
                            <div className="whitespace-nowrap text-[#0f0f0f]">{booking.dates}</div>
                            <div className="mt-0.5 text-[10.5px] text-[#7c7c7c]">{booking.days} days</div>
                          </td>
                          <td className="py-3 pr-4 text-[#0f0f0f]">{booking.location}</td>
                          <td className="whitespace-nowrap py-3 pr-4 font-semibold text-[#0f0f0f]">{booking.total}</td>
                          <td className="py-3 pr-4">
                            <span className="inline-block rounded-[4px] border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em]" style={{ backgroundColor: tone.bg, borderColor: tone.border, color: tone.text }}>{booking.status}</span>
                          </td>
                          <td className="py-3 pl-2 text-right">
                            <button type="button" aria-label={`Actions for ${booking.id}`} className="inline-flex h-7 w-7 items-center justify-center rounded-[4px] text-[#a4a4a4] transition-colors hover:bg-[#f5f5f5] hover:text-[#0f0f0f]">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div className="py-12 text-center text-[13px] text-[#7c7c7c]">No bookings found.</div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
