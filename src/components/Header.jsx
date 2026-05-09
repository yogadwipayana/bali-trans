import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User, X } from "lucide-react";

const TEAL = "#1d4046";

// Canonical nav. "Vehicles" is a real route; the rest are in-page anchors on
// the home page. Using "/#…" lets the link work from any route (React Router
// navigates home, the browser scrolls to the hash).
const NAV_LINKS = [
  { label: "Vehicles", href: "/vehicles", isRoute: true },
  { label: "Deals", href: "/#deals" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Services", href: "/#services" },
  { label: "Reviews", href: "/#reviews" },
  { label: "About us", href: "/#about-us" },
  { label: "Contact", href: "/#contact" },
];

// Shared sticky navbar. Pages pass `activeNav` (matching one of the labels
// above) to highlight the current section with a teal underline.
export function Header({ activeNav }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderNavLink = (link, onClick) => {
    const isActive = link.label === activeNav;
    const className = `relative text-[13.5px] font-medium transition-colors ${
      isActive ? "text-[#1d4046]" : "text-gray-600 hover:text-[#1d4046]"
    }`;
    const inner = (
      <>
        {link.label}
        {isActive && (
          <span
            aria-hidden
            className="absolute -bottom-[19px] left-0 right-0 h-0.5 rounded-full"
            style={{ backgroundColor: TEAL }}
          />
        )}
      </>
    );
    if (link.isRoute) {
      return (
        <Link key={link.label} to={link.href} className={className} onClick={onClick}>
          {inner}
        </Link>
      );
    }
    return (
      <a key={link.label} href={link.href} className={className} onClick={onClick}>
        {inner}
      </a>
    );
  };

  const renderMobileNavLink = (link, onClick) => {
    const isActive = link.label === activeNav;
    const className = `block text-sm font-medium ${
      isActive ? "text-[#1d4046]" : "text-gray-700"
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
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => renderNavLink(link))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 lg:gap-5">
            <Link
              to="/sign-in"
              className="hidden sm:flex items-center gap-1.5 text-[13.5px] font-medium text-gray-700 hover:text-[#1d4046]"
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
          </div>
        </div>
      )}
    </header>
  );
}
