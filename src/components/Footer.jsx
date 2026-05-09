import { Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  TripadvisorIcon,
  WhatsappIcon,
} from "@/components/SocialIcons";

// Brand ink — switched from the old teal `#1d4046` to the same monochrome
// black used by /dashboard-v2 and the redesigned home so the footer stays
// in sync with the rest of the site.
const TEAL = "#0f0f0f";

// Shared site footer: 3 columns on desktop (brand / CONTACT / STAY UPDATED).
// Collapses responsively on mobile.
export function Footer() {
  return (
    <footer className="py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1.2fr)_minmax(0,1.6fr)] gap-8 lg:gap-6 pb-10 mb-6 border-b border-gray-100">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
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
                <div className="font-bold text-[15px]" style={{ color: TEAL }}>
                  BALI TRANS
                </div>
                <div className="text-[10px] tracking-[0.15em] uppercase text-gray-400 -mt-0.5">
                  Bali Car Rental
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed max-w-xs">
              Your trusted car rental partner in Bali. Quality vehicles, fair prices, and
              exceptional service.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: InstagramIcon, label: "Instagram" },
                { Icon: FacebookIcon, label: "Facebook" },
                { Icon: WhatsappIcon, label: "WhatsApp" },
                { Icon: TripadvisorIcon, label: "TripAdvisor" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#social"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = TEAL;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <h4 className="font-bold text-[11px] tracking-[0.2em] uppercase text-gray-700 mb-4">
              CONTACT
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap">
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: TEAL }} /> +62 812 3456 7890
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500 min-w-0">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: TEAL }} />{" "}
                <span className="truncate">hello@balitrans.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-500 leading-snug">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: TEAL }} /> Ngurah
                Rai Airport, Bali, Indonesia
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[11px] tracking-[0.2em] uppercase text-gray-700 mb-2">
              STAY UPDATED
            </h4>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">
              Subscribe for exclusive deals and travel inspiration.
            </p>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0f0f0f] mb-2"
            />
            <button
              className="btn-glass w-full py-2.5 text-white text-sm font-semibold rounded-lg"
              style={{ backgroundColor: TEAL }}
            >
              Subscribe
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Bali Trans Car Rental. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
