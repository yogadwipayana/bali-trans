import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router";
import {
  Bell,
  Clock,
  FileText,
  HelpCircle,
  LayoutGrid,
  LogOut,
  Mail,
  MessageCircle,
  Navigation,
  Phone,
  Settings,
  User,
} from "lucide-react";

import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardTopBar from "@/components/DashboardTopBar";
import { getNavIdFromPath } from "@/components/dashboardNav";
import { useLockedViewport } from "@/hooks/useFullScreenRoot";

const FAQ = [
  { q: "How do I cancel a booking?", a: "Go to My Bookings, select the booking, and click Cancel. Cancellations made 24h+ before pickup are fully refunded." },
  { q: "What documents do I need?", a: "A valid driver license (SIM A for Indonesian, or International Driving Permit for foreigners) and a government-issued ID." },
  { q: "Can I extend my rental?", a: "Yes! Use the Chat feature or contact support to extend. Additional days are charged at the daily rate." },
  { q: "Where can I pick up the car?", a: "We offer airport pickup at Ngurah Rai (DPS) and free delivery to hotels in Seminyak, Canggu, Ubud, and Sanur." },
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

export default function DashboardSupport() {
  useLockedViewport();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeNav, setActiveNav] = useState(() => getNavIdFromPath(location.pathname) ?? "support");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  useClickOutside(notificationsRef, () => setNotificationsOpen(false), notificationsOpen);
  useClickOutside(profileRef, () => setProfileOpen(false), profileOpen);

  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Makassar" });

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="h-screen overflow-hidden bg-[#f3f4f4] font-sans text-[#111111] [color-scheme:light]">
      <Helmet>
        <title>Support · Bali Trans</title>
      </Helmet>

      <DashboardTopBar />

      <div className="flex h-[calc(100vh-var(--header-h))] overflow-hidden">
        <DashboardSidebar activeId={activeNav} onSelect={(item) => setActiveNav(item.id)} />

        <main className="min-w-0 flex-1 overflow-y-auto bg-[#f3f4f4]">
          <div className="mx-auto max-w-[1200px] px-4 py-4 pb-20 md:px-6 md:py-6 md:pb-6 lg:px-8 lg:py-8">
            <div className="mb-6">
              <h1 className="text-[22px] font-bold tracking-tight text-[#0f0f0f]">Support</h1>
              <p className="mt-1 text-[13px] text-[#7c7c7c]">Get help with your bookings and account</p>
            </div>

            {/* Contact options */}
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: MessageCircle, title: "Live Chat", desc: "Chat with our team", action: () => navigate("/dashboard/chat") },
                { icon: Mail, title: "Email", desc: "support@balitrans.app", action: null },
                { icon: Phone, title: "Phone", desc: "+62 361 123 456", action: null },
              ].map(({ icon: Icon, title, desc, action }) => (
                <button key={title} type="button" onClick={action} className="flex items-center gap-3 rounded-[8px] border border-[#e6e6e6] bg-white p-4 text-left transition-colors hover:bg-[#fafafa]">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] border border-[#e6e6e6]">
                    <Icon className="h-4 w-4 text-[#0f0f0f]" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-[#0f0f0f]">{title}</div>
                    <div className="text-[11px] text-[#7c7c7c]">{desc}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* FAQ */}
            <section className="rounded-[8px] border border-[#e6e6e6] bg-white p-5 lg:p-6">
              <div className="mb-4 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-[#0f0f0f]" />
                <h2 className="text-[15px] font-bold text-[#0f0f0f]">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-2">
                {FAQ.map((item, i) => (
                  <div key={i} className="rounded-[6px] border border-[#e6e6e6]">
                    <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between px-4 py-3 text-left">
                      <span className="text-[13px] font-semibold text-[#0f0f0f]">{item.q}</span>
                      <span className="text-[12px] text-[#a4a4a4]">{openFaq === i ? "−" : "+"}</span>
                    </button>
                    {openFaq === i && (
                      <div className="border-t border-[#e6e6e6] px-4 py-3 text-[12.5px] leading-relaxed text-[#5e5e5e]">{item.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
