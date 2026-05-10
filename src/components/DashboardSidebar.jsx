import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";

import { NAV_FOOTER, NAV_PRIMARY, NAV_SECONDARY } from "./dashboardNav";

function SidebarItem({ icon: Icon, label, active = false, dot = false, onClick, collapsed = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      title={label}
      className={`group relative flex h-[36px] w-full items-center gap-[10px] rounded-[6px] text-left text-[13px] transition-all duration-200 ${
        collapsed ? "justify-center px-0" : "px-[10px]"
      } ${
        active
          ? "bg-[#0f0f0f] font-semibold text-white"
          : "font-medium text-[#3a3a3a] hover:bg-[#f3f4f4] hover:text-[#0f0f0f]"
      }`}
    >
      <span className="relative">
        <Icon className="h-[18px] w-[18px] stroke-[1.7]" />
        {dot && (
          <span className="absolute -right-0.5 -top-0.5 h-[6px] w-[6px] rounded-full bg-[#ff3344] ring-2 ring-white" />
        )}
      </span>
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  );
}

function MobileNavItem({ icon: Icon, label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1 rounded-[10px] px-3 py-2.5 transition-colors ${
        active ? "bg-[#0f0f0f] text-white" : "text-[#5e5e5e] hover:bg-[#f3f4f4] hover:text-[#0f0f0f]"
      }`}
    >
      <Icon className="h-[18px] w-[18px] stroke-[1.7]" />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

export default function DashboardSidebar({
  activeId,
  onSelect,
  primary = NAV_PRIMARY,
  secondary = NAV_SECONDARY,
  footer = NAV_FOOTER,
  notificationsDot = false,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (item) => {
    if (item.id === "logout") {
      navigate("/sign-in");
      onSelect?.(item);
      setMobileOpen(false);
      return;
    }
    if (item.href) {
      if (item.href !== location.pathname) navigate(item.href);
      onSelect?.(item);
      setMobileOpen(false);
      return;
    }
    onSelect?.(item);
    setMobileOpen(false);
  };

  const renderGroup = (items, collapsed = false) =>
    items.map((item) => (
      <SidebarItem
        key={item.id}
        icon={item.icon}
        label={item.label}
        active={activeId === item.id}
        dot={item.id === "notifications" && notificationsDot}
        collapsed={collapsed}
        onClick={() => handleClick(item)}
      />
    ));

  const allItems = [...primary, ...secondary, ...footer];

  return (
    <>
      {/* Mobile: bottom nav bar + expandable sheet */}
      <div className="md:hidden">
        {/* Fixed bottom bar */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e6e6e6] bg-white px-2 pb-[env(safe-area-inset-bottom)]">
          <div className="flex items-center justify-around py-1.5">
            {primary.slice(0, 4).map((item) => (
              <MobileNavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeId === item.id}
                onClick={() => handleClick(item)}
              />
            ))}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className={`flex flex-col items-center gap-1 rounded-[10px] px-3 py-2.5 transition-colors ${
                mobileOpen ? "bg-[#0f0f0f] text-white" : "text-[#5e5e5e] hover:bg-[#f3f4f4]"
              }`}
            >
              {mobileOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
              <span className="text-[10px] font-medium">More</span>
            </button>
          </div>
        </div>

        {/* Expandable sheet */}
        {mobileOpen && (
          <>
            <div className="fixed inset-0 z-30 bg-black/30" onClick={() => setMobileOpen(false)} />
            <div className="fixed inset-x-0 bottom-[72px] z-40 mx-3 mb-1 overflow-hidden rounded-[12px] border border-[#e6e6e6] bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.12)]">
              <div className="px-4 pb-2 pt-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a4a4a4]">All pages</div>
              </div>
              <div className="grid grid-cols-4 gap-1 px-3 pb-3">
                {allItems.map((item) => (
                  <MobileNavItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    active={activeId === item.id}
                    onClick={() => handleClick(item)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tablet (md): icon-only sidebar */}
      <aside className="hidden shrink-0 flex-col border-r border-[#e6e6e6] bg-white px-1 py-4 md:flex md:w-[56px] lg:w-[160px] lg:px-2">
        {/* md: icons only */}
        <nav className="space-y-0.5 lg:hidden">{renderGroup(primary, true)}</nav>
        <nav className="mt-6 space-y-0.5 lg:hidden">{renderGroup(secondary, true)}</nav>
        <nav className="mt-auto space-y-0.5 lg:hidden">{renderGroup(footer, true)}</nav>

        {/* lg: full labels */}
        <nav className="hidden space-y-0.5 lg:block">{renderGroup(primary, false)}</nav>
        <nav className="mt-6 hidden space-y-0.5 lg:block">{renderGroup(secondary, false)}</nav>
        <nav className="mt-auto hidden space-y-0.5 lg:block">{renderGroup(footer, false)}</nav>
      </aside>
    </>
  );
}
