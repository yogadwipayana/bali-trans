import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  LogOut,
  Navigation,
  Settings,
  LayoutGrid,
  Upload,
  User,
} from "lucide-react";

import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardTopBar from "@/components/DashboardTopBar";
import { getNavIdFromPath } from "@/components/dashboardNav";
import { useLockedViewport } from "@/hooks/useFullScreenRoot";

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

export default function DashboardLicense() {
  useLockedViewport();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeNav, setActiveNav] = useState(() => getNavIdFromPath(location.pathname) ?? "license");
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
        <title>License · Bali Trans</title>
      </Helmet>

      <DashboardTopBar />

      <div className="flex h-[calc(100vh-var(--header-h))] overflow-hidden">
        <DashboardSidebar activeId={activeNav} onSelect={(item) => setActiveNav(item.id)} />

        <main className="min-w-0 flex-1 overflow-y-auto bg-[#f3f4f4]">
          <div className="mx-auto max-w-[1200px] px-4 py-4 pb-20 md:px-6 md:py-6 md:pb-6 lg:px-8 lg:py-8">
            <div className="mb-6">
              <h1 className="text-[22px] font-bold tracking-tight text-[#0f0f0f]">Driver License</h1>
              <p className="mt-1 text-[13px] text-[#7c7c7c]">Manage your driver license for vehicle rentals</p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Current license */}
              <article className="rounded-[8px] border border-[#e6e6e6] bg-white p-5 lg:p-6">
                <h2 className="text-[15px] font-bold text-[#0f0f0f]">Current License</h2>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#7c7c7c]">License Number</span>
                    <span className="text-[12.5px] font-semibold text-[#0f0f0f]">SIM A 1234-5678-90</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#7c7c7c]">Full Name</span>
                    <span className="text-[12.5px] font-semibold text-[#0f0f0f]">Yoga Pratama</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#7c7c7c]">Type</span>
                    <span className="text-[12.5px] font-semibold text-[#0f0f0f]">SIM A (Car)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#7c7c7c]">Issued</span>
                    <span className="text-[12.5px] font-semibold text-[#0f0f0f]">Jan 15, 2021</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#7c7c7c]">Expires</span>
                    <span className="text-[12.5px] font-semibold text-[#0f0f0f]">May 24, 2026</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-[6px] border border-[#fde68a] bg-[#fef3c7] px-3 py-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-[#a16207]" />
                  <span className="text-[11.5px] font-medium text-[#a16207]">Expires in 14 days — please renew soon</span>
                </div>
              </article>

              {/* Upload / Status */}
              <article className="rounded-[8px] border border-[#e6e6e6] bg-white p-5 lg:p-6">
                <h2 className="text-[15px] font-bold text-[#0f0f0f]">Upload New License</h2>
                <p className="mt-1 text-[11.5px] text-[#7c7c7c]">Upload a photo of your renewed license to update your records.</p>

                <div className="mt-4 flex flex-col items-center justify-center rounded-[8px] border-2 border-dashed border-[#e6e6e6] px-6 py-10 text-center transition-colors hover:border-[#0f0f0f]">
                  <Upload className="mb-3 h-8 w-8 text-[#a4a4a4]" />
                  <p className="text-[12.5px] font-semibold text-[#0f0f0f]">Drop file here or click to upload</p>
                  <p className="mt-1 text-[11px] text-[#7c7c7c]">JPG, PNG or PDF · Max 5MB</p>
                </div>

                <div className="mt-5">
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#a4a4a4]">Verification Status</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
                    <span className="text-[12.5px] font-medium text-[#0f0f0f]">Current license verified</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
