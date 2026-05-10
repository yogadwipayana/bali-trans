import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router";
import {
  Bell,
  Clock,
  LogOut,
  Navigation,
  Send,
  Settings,
  LayoutGrid,
  User,
} from "lucide-react";

import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardTopBar from "@/components/DashboardTopBar";
import { getNavIdFromPath } from "@/components/dashboardNav";
import { useLockedViewport } from "@/hooks/useFullScreenRoot";

const MESSAGES = [
  { id: 1, from: "support", text: "Hi Yoga! How can we help you today?", time: "10:00 AM" },
  { id: 2, from: "user", text: "I'd like to know if I can extend my Toyota Rush booking by one day.", time: "10:02 AM" },
  { id: 3, from: "support", text: "Of course! Your current booking ends May 21. I can extend it to May 22 for an additional $44. Would you like me to proceed?", time: "10:03 AM" },
  { id: 4, from: "user", text: "Yes please, go ahead.", time: "10:05 AM" },
  { id: 5, from: "support", text: "Done! Your booking has been extended to May 22, 2025. The additional charge of $44 has been applied to your Visa ending in 4242. Is there anything else I can help with?", time: "10:06 AM" },
];

const NOTIFICATIONS = [
  { id: 1, title: "Booking confirmed", body: "Your Toyota Rush reservation is ready for pickup.", time: "2 min ago" },
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

export default function DashboardChat() {
  useLockedViewport();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeNav, setActiveNav] = useState(() => getNavIdFromPath(location.pathname) ?? "chat");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  useClickOutside(notificationsRef, () => setNotificationsOpen(false), notificationsOpen);
  useClickOutside(profileRef, () => setProfileOpen(false), profileOpen);

  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Makassar" });

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(MESSAGES);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text: input.trim(), time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Makassar" }) }]);
    setInput("");
  };

  return (
    <div className="h-screen overflow-hidden bg-[#f3f4f4] font-sans text-[#111111] [color-scheme:light]">
      <Helmet>
        <title>Chat · Bali Trans</title>
      </Helmet>

      <DashboardTopBar />

      {/* Body */}
      <div className="flex h-[calc(100vh-var(--header-h))] overflow-hidden">
        <DashboardSidebar activeId={activeNav} onSelect={(item) => setActiveNav(item.id)} />

        <main className="flex min-w-0 flex-1 flex-col bg-[#f3f4f4]">
          {/* Chat header */}
          <div className="border-b border-[#e6e6e6] bg-white px-6 py-3">
            <h1 className="text-[15px] font-bold text-[#0f0f0f]">Support Chat</h1>
            <p className="mt-0.5 text-[11px] text-[#7c7c7c]">Bali Trans customer support · Usually replies in minutes</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="mx-auto max-w-[700px] space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-[8px] px-3.5 py-2.5 ${msg.from === "user" ? "bg-[#0f0f0f] text-white" : "border border-[#e6e6e6] bg-white text-[#0f0f0f]"}`}>
                    <p className="m-0 text-[13px] leading-relaxed">{msg.text}</p>
                    <span className={`mt-1 block text-[10px] ${msg.from === "user" ? "text-[#a0a0a0]" : "text-[#9a9a9a]"}`}>{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-[#e6e6e6] bg-white px-6 py-3">
            <div className="mx-auto flex max-w-[700px] items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                placeholder="Type a message..."
                className="flex-1 rounded-[6px] border border-[#e6e6e6] px-3 py-2 text-[13px] text-[#0f0f0f] outline-none placeholder:text-[#a4a4a4] focus:border-[#0f0f0f]"
              />
              <button type="button" onClick={handleSend} className="grid h-9 w-9 place-items-center rounded-[6px] bg-[#0f0f0f] text-white hover:bg-[#1f1f1f]">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
