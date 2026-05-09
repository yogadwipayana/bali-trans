import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, ChevronDown, Menu, User, X } from "lucide-react";

// Brand ink — switched from the old teal `#1d4046` to the same monochrome
// black used by /dashboard-v2 and the redesigned home so every shared
// affordance (logo tile, active link, primary CTA) reads in the same voice.
const TEAL = "#0f0f0f";

// Authenticated areas (e.g. /dashboard) swap the "Sign in / Book now" CTAs for
// a notification bell and a small profile chip. Centralised here so the swap
// is automatic from any route under the prefix.
const AUTHED_PREFIXES = ["/dashboard"];

// Demo profile shown on authenticated routes. Replace with real user state
// (context / auth store) once the backend is wired up.
const DEMO_USER = {
  name: "Yoga Pratama",
  avatar: "https://i.pravatar.cc/96?img=12",
  notifications: 2,
};

// Canonical nav. "Vehicles" is a real route; the rest are in-page anchors on
// the home page. Using "/#…" lets the link work from any route (React Router
// navigates home, the browser scrolls to the hash).
const NAV_LINKS = [
  { label: "Home", href: "/", isRoute: true },
  { label: "Vehicles", href: "/vehicles", isRoute: true },
  { label: "Destinations", href: "/#destinations" },
  { label: "Services", href: "/#services" },
  { label: "Reviews", href: "/#reviews" },
  { label: "About us", href: "/#about-us" },
  { label: "Contact", href: "/#contact" },
];

// Map a pathname to the matching nav label so the underline lights up
// automatically. Pages can still override via the `activeNav` prop.
function navLabelFromPath(pathname) {
  if (pathname === "/") return "Home";
  const match = NAV_LINKS.find(
    (link) => link.isRoute && link.href !== "/" && pathname.startsWith(link.href)
  );
  return match?.label;
}

// Shared sticky navbar. The active link is auto-detected from the current
// route; pages can override by passing `activeNav` (matching a label above).
export function Header({ activeNav }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const currentNav = activeNav ?? navLabelFromPath(pathname);
  const isAuthed = AUTHED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  // Shared sliding underline. We measure the active link's position in the
  // desktop nav and animate a single indicator between links via CSS
  // transitions instead of teleporting per-link spans.
  const navRef = useRef(null);
  const linkRefs = useRef(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  // Skip the transition on the very first measurement so the indicator
  // doesn't slide in from (0, 0) on initial paint.
  const [animate, setAnimate] = useState(false);

  const setLinkRef = (label) => (node) => {
    if (node) linkRefs.current.set(label, node);
    else linkRefs.current.delete(label);
  };

  const measure = () => {
    const nav = navRef.current;
    const el = currentNav ? linkRefs.current.get(currentNav) : null;
    if (!nav || !el) {
      setIndicator((s) => ({ ...s, visible: false }));
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicator({
      left: elRect.left - navRect.left,
      width: elRect.width,
      visible: true,
    });
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNav]);

  useEffect(() => {
    if (!indicator.visible) return;
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, [indicator.visible]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNav]);

  const renderNavLink = (link, onClick) => {
    const isActive = link.label === currentNav;
    const className = `text-[13.5px] font-medium transition-colors duration-200 ${
      isActive ? "text-[#0f0f0f]" : "text-gray-600 hover:text-[#0f0f0f]"
    }`;
    if (link.isRoute) {
      return (
        <Link
          key={link.label}
          ref={setLinkRef(link.label)}
          to={link.href}
          className={className}
          onClick={onClick}
        >
          {link.label}
        </Link>
      );
    }
    return (
      <a
        key={link.label}
        ref={setLinkRef(link.label)}
        href={link.href}
        className={className}
        onClick={onClick}
      >
        {link.label}
      </a>
    );
  };

  const renderMobileNavLink = (link, onClick) => {
    const isActive = link.label === currentNav;
    const className = `block text-sm font-medium ${
      isActive ? "text-[#0f0f0f]" : "text-gray-700"
    }`;
    if (link.isRoute) {
      return (
        <Link key={link.label} to={link.href} className={className} onClick={onClick}>
          {link.label}
        </Link>
      );
    }
    return (
      <a key={link.label} href={link.href} className={className} onClick={onClick}>
        {link.label}
      </a>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 lg:h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ backgroundColor: TEAL }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 19l4-7 4 4 6-10" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="font-bold text-[15px] tracking-wide" style={{ color: TEAL }}>
                BALI TRANS
              </div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-gray-400 -mt-0.5">
                Bali Car Rental
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-7 relative">
            {NAV_LINKS.map((link) => renderNavLink(link))}
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-[19px] left-0 h-0.5 rounded-full"
              style={{
                backgroundColor: TEAL,
                width: `${indicator.width}px`,
                transform: `translateX(${indicator.left}px)`,
                opacity: indicator.visible ? 1 : 0,
                transition: animate
                  ? "transform 320ms cubic-bezier(0.4, 0, 0.2, 1), width 320ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease"
                  : "opacity 200ms ease",
              }}
            />
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 lg:gap-5">
            {isAuthed ? (
              <>
                {/* Notification bell with unread badge */}
                <button
                  type="button"
                  aria-label={`Notifications${DEMO_USER.notifications ? ` (${DEMO_USER.notifications} unread)` : ""}`}
                  className="relative w-9 h-9 rounded-full flex items-center justify-center text-gray-600 hover:text-[#0f0f0f] hover:bg-gray-50 transition-colors"
                >
                  <Bell className="w-[18px] h-[18px]" strokeWidth={1.75} />
                  {DEMO_USER.notifications > 0 && (
                    <span
                      className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white"
                      aria-hidden="true"
                    >
                      {DEMO_USER.notifications}
                    </span>
                  )}
                </button>
                {/* Profile chip */}
                <button
                  type="button"
                  aria-label="Open account menu"
                  className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={DEMO_USER.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                  <span className="hidden sm:inline text-[13.5px] font-semibold text-[#1a1a1a]">
                    {DEMO_USER.name}
                  </span>
                  <ChevronDown className="hidden sm:inline w-3.5 h-3.5 text-gray-500" strokeWidth={2.5} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="hidden sm:flex items-center gap-1.5 text-[13.5px] font-medium text-gray-700 hover:text-[#0f0f0f]"
                >
                  <User className="w-4 h-4" />
                  Sign in
                </Link>
                <a
                  href="#book"
                  className="btn-glass hidden sm:inline-flex items-center px-5 py-2.5 text-white text-[13px] font-semibold rounded-lg"
                  style={{ backgroundColor: TEAL }}
                >
                  Book now
                </a>
              </>
            )}
            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {NAV_LINKS.map((link) => renderMobileNavLink(link, () => setMobileOpen(false)))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
            {isAuthed ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={DEMO_USER.avatar}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div className="leading-tight">
                    <div className="text-sm font-semibold text-[#1a1a1a]">{DEMO_USER.name}</div>
                    <div className="text-[11px] text-gray-500">View account</div>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Notifications"
                  className="relative w-9 h-9 rounded-full flex items-center justify-center text-gray-600 bg-gray-50"
                >
                  <Bell className="w-[18px] h-[18px]" strokeWidth={1.75} />
                  {DEMO_USER.notifications > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                      {DEMO_USER.notifications}
                    </span>
                  )}
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="flex items-center gap-2 text-sm font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  <User className="w-4 h-4" /> Sign in
                </Link>
                <a
                  href="#book"
                  className="btn-glass inline-flex items-center justify-center px-5 py-2.5 text-white text-sm font-semibold rounded-lg"
                  style={{ backgroundColor: TEAL }}
                >
                  Book now
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
