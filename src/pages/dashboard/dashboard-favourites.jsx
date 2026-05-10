import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router";
import {
  Bell,
  Clock,
  Heart,
  LogOut,
  Navigation,
  Settings,
  LayoutGrid,
  User,
} from "lucide-react";

import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardTopBar from "@/components/DashboardTopBar";
import { getNavIdFromPath } from "@/components/dashboardNav";
import { useLockedViewport } from "@/hooks/useFullScreenRoot";

const FAVOURITES = [
  { id: "rush", name: "Toyota Rush", seats: 7, transmission: "Automatic", price: "$44/day", image: "/images/mercy.png" },
  { id: "avanza", name: "Toyota Avanza", seats: 7, transmission: "Automatic", price: "$36/day", image: "/images/mercy.png" },
  { id: "hrv", name: "Honda HR-V", seats: 5, transmission: "Automatic", price: "$47/day", image: "/images/mercy.png" },
  { id: "xpander", name: "Mitsubishi Xpander", seats: 7, transmission: "Automatic", price: "$39/day", image: "/images/mercy.png" },
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

export default function DashboardFavourites() {
  useLockedViewport();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeNav, setActiveNav] = useState(() => getNavIdFromPath(location.pathname) ?? "favourites");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  useClickOutside(notificationsRef, () => setNotificationsOpen(false), notificationsOpen);
  useClickOutside(profileRef, () => setProfileOpen(false), profileOpen);

  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Makassar" });

  return (
    <div className="h-screen overflow-hidden bg-[#f3f4f4] font-sans text-[#111111] [color-scheme:light]">
      <Helmet>
        <title>Favourites · Bali Trans</title>
      </Helmet>

      {/* Top bar */}
      <DashboardTopBar />

      {/* Body */}
      <div className="flex h-[calc(100vh-var(--header-h))] overflow-hidden">
        <DashboardSidebar activeId={activeNav} onSelect={(item) => setActiveNav(item.id)} />

        <main className="min-w-0 flex-1 overflow-y-auto bg-[#f3f4f4]">
          <div className="mx-auto max-w-[1200px] px-4 py-4 pb-20 md:px-6 md:py-6 md:pb-6 lg:px-8 lg:py-8">
            <div className="mb-6">
              <h1 className="m-0 text-[22px] font-bold tracking-tight text-[#0f0f0f]">Favourites</h1>
              <p className="mt-1 text-[13px] text-[#7c7c7c]">{FAVOURITES.length} saved vehicles</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {FAVOURITES.map((vehicle) => (
                <article key={vehicle.id} className="rounded-[8px] border border-[#e6e6e6] bg-white p-4">
                  <div className="relative mb-3 h-[120px] overflow-hidden rounded-[6px] bg-[#f3f4f4]">
                    <img src={vehicle.image} alt={vehicle.name} className="h-full w-full object-contain" />
                    <button type="button" className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white shadow-sm">
                      <Heart className="h-3.5 w-3.5 fill-[#dc2626] text-[#dc2626]" />
                    </button>
                  </div>
                  <h3 className="m-0 truncate text-[13px] font-semibold text-[#0f0f0f]">{vehicle.name}</h3>
                  <div className="mt-1 text-[11px] text-[#7c7c7c]">{vehicle.seats} Seats · {vehicle.transmission}</div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#0f0f0f]">{vehicle.price}</span>
                    <button type="button" onClick={() => navigate("/dashboard/vehicles")} className="rounded-[5px] bg-[#0f0f0f] px-2.5 py-1 text-[10.5px] font-semibold text-white hover:bg-[#1f1f1f]">Book</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
