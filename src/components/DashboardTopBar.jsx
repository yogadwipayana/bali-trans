import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { LayoutGrid, LogOut, Settings, User } from "lucide-react";

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

export default function DashboardTopBar() {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useClickOutside(profileRef, () => setProfileOpen(false), profileOpen);

  return (
    <header className="relative z-30 flex h-[var(--header-h)] items-center border-b border-[#e6e6e6] bg-white">
      <div className="flex h-full w-auto shrink-0 items-center px-[14px] md:w-[56px] lg:w-[160px]">
        <BrandMark />
      </div>
      <div className="flex h-full flex-1 items-center justify-end border-l border-[#ececec] px-4 md:px-5">
        <div className="flex items-center gap-3">
          <div ref={profileRef} className="relative">
            <button
              type="button"
              aria-label="Profile menu"
              onClick={() => setProfileOpen((v) => !v)}
              className="inline-flex items-center gap-2 transition-shadow hover:opacity-90"
            >
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" alt="Profile" className="h-10 w-10 shrink-0 rounded-full border border-[#cfcfcf] object-cover" />
              <div className="hidden text-left md:block">
                <span className="block text-[14px] font-semibold leading-none text-[#0f0f0f]">yoga dwipayana</span>
                <span className="mt-0.5 block text-[12px] leading-none text-[#9a9a9a]">yogadwipayana2006@gmail.com</span>
              </div>
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full z-40 mt-2 w-[200px] overflow-hidden rounded-md border border-[#ececec] bg-white shadow-[0_8px_28px_rgba(0,0,0,0.12)]">
                <div className="border-b border-[#ececec] px-3 py-2">
                  <div className="text-[12px] font-semibold text-[#101010]">yoga dwipayana</div>
                  <div className="text-[10.5px] text-[#9a9a9a]">yogadwipayana2006@gmail.com</div>
                </div>
                <ul className="py-1 text-[12px] text-[#1a1a1a]">
                  {[
                    { label: "Profile", icon: User },
                    { label: "Settings", icon: Settings },
                    { label: "My bookings", icon: LayoutGrid },
                  ].map(({ label, icon: Icon }) => (
                    <li key={label}>
                      <button
                        type="button"
                        onClick={() => setProfileOpen(false)}
                        className="flex h-8 w-full items-center gap-2 px-3 hover:bg-[#f6f6f6]"
                      >
                        <Icon className="h-3.5 w-3.5 text-[#5e5e5e]" />
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-[#ececec]">
                  <button
                    type="button"
                    onClick={() => { setProfileOpen(false); navigate("/sign-in"); }}
                    className="flex h-8 w-full items-center gap-2 px-3 text-[12px] font-medium text-[#dc2626] hover:bg-[#fef2f2]"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
