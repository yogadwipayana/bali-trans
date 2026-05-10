import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router";
import {
  Bell,
  Car,
  Check,
  ChevronDown,
  Clock,
  Heart,
  LayoutGrid,
  LogOut,
  Map as MapIcon,
  Navigation,
  Search,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Star,
  User,
} from "lucide-react";

import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardTopBar from "@/components/DashboardTopBar";
import { getNavIdFromPath } from "@/components/dashboardNav";
import { useLockedViewport } from "@/hooks/useFullScreenRoot";

// ---------------------------------------------------------------------------
// Pixel-faithful rebuild of docs/dashboard-vehicles.png with every visible
// control wired to local state so the page actually works against mock data:
// the filter rail narrows the grid, the price histogram is a draggable
// dual-thumb slider, the sort menu re-orders cards, the "show map" toggle
// reveals a placeholder map, sidebar nav swaps the active item, and the
// PRO/profile/notification chips open real popovers. Everything is local —
// no network calls — so the page is self-contained.
// ---------------------------------------------------------------------------

// =========================================================================
// MOCK DATA
// =========================================================================

// Filter option lists. The filter values themselves live in component state
// so they can be flipped on/off; these arrays just describe what's available.
const RENTAL_TYPES = ["Any", "Per day", "Per hour"];
const TRANSMISSIONS = ["Any", "Automatic", "Manual"];

const BODY_TYPE_OPTIONS = [
  "Sedan",
  "Wagon",
  "Coupe",
  "Hatchback",
  "Pickup",
  "Sport coupe",
  "Crossover",
  "Van",
];

const FUEL_TYPE_OPTIONS = [
  "Gasoline",
  "Flex Fuel (E85)",
  "Diesel",
  "Hybrid",
  "Electric",
  "Hydrogen",
  "Other",
];

// Histogram silhouette for the "Price range / hour" filter. 32 bars rising
// to a peak in the middle, mirroring the screenshot. Active bars (within
// the user's selected range) are drawn black; the rest are pale grey.
const PRICE_HISTOGRAM = [
  18, 22, 28, 34, 42, 52, 62, 70, 78, 84, 90, 94, 96, 92, 86, 80, 72, 64, 58,
  50, 44, 40, 44, 50, 58, 64, 70, 74, 78, 82, 86, 90,
];
const PRICE_MIN = 5;
const PRICE_MAX = 100;

const SORT_OPTIONS = [
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Highest rated" },
  { id: "reviews", label: "Most reviews" },
];

// Brand lookup — used both as filter options AND to populate the dependent
// "model" picker. Keeping models declared per brand means the model menu
// resets sensibly when the brand changes.
const BRAND_CATALOG = {
  Audi: ["A3", "A4", "A5", "A6", "Q3", "Q5"],
  Cadillac: ["CT4", "CT5", "Escalade", "XT4", "XT5"],
  Ford: ["Fiesta", "Focus", "Focus ST", "Mondeo", "Mustang"],
  Honda: ["Civic", "CR-V", "Fit", "Accord"],
  Mazda: ["Mazda 2", "Mazda 3", "Mazda 6", "CX-5", "MX-5"],
  Mini: ["Cooper", "Countryman", "Clubman"],
  Opel: ["Astra", "Corsa", "Insignia", "Mokka"],
  Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
  Toyota: ["Camry", "Corolla", "RAV4", "Yaris"],
  Volkswagen: ["Golf", "Passat", "Polo", "Tiguan"],
};
const BRAND_OPTIONS = Object.keys(BRAND_CATALOG);

// 12 mock vehicles so the grid fills four rows of three. Each entry carries
// every attribute the filters and sort menu need (priceNum, distanceM,
// rating, bodyType, transmission, fuelType, available).
const VEHICLES = [
  {
    id: "audi-a4",
    name: "Audi A4",
    brand: "Audi",
    model: "A4",
    spec: "2.0 TFSI Sport (249 hp, Quattro)",
    distance: "120m",
    distanceM: 120,
    eta: "4 min",
    rating: 4.7,
    reviews: 109,
    price: "24.59",
    priceNum: 24.59,
    bodyType: "Sedan",
    transmission: "Automatic",
    fuelType: "Gasoline",
    available: true,
    image: "https://pngimg.com/uploads/audi/audi_PNG1714.png",
  },
  {
    id: "opel-insignia",
    name: "Opel Insignia",
    brand: "Opel",
    model: "Insignia",
    spec: "2.0 Turbo Grand Sport (230 hp, AWD)",
    distance: "250m",
    distanceM: 250,
    eta: "8 min",
    rating: 4.0,
    reviews: 87,
    price: "19.99",
    priceNum: 19.99,
    bodyType: "Sedan",
    transmission: "Automatic",
    fuelType: "Gasoline",
    available: true,
    image: "https://pngimg.com/uploads/opel/opel_PNG35.png",
  },
  {
    id: "mini-countryman",
    name: "Mini Countryman",
    brand: "Mini",
    model: "Countryman",
    spec: "Cooper S ALL4 (189 hp, AWD)",
    distance: "180m",
    distanceM: 180,
    eta: "5 min",
    rating: 4.9,
    reviews: 142,
    price: "28.50",
    priceNum: 28.5,
    bodyType: "Crossover",
    transmission: "Automatic",
    fuelType: "Gasoline",
    available: true,
    image: "https://pngimg.com/uploads/mini/mini_PNG11810.png",
  },
  {
    id: "mazda-6",
    name: "Mazda 6",
    brand: "Mazda",
    model: "Mazda 6",
    spec: "2.5 Turbo Premium (250 hp, AWD)",
    distance: "90m",
    distanceM: 90,
    eta: "3 min",
    rating: 5.0,
    reviews: 766,
    price: "22.99",
    priceNum: 22.99,
    bodyType: "Sedan",
    transmission: "Automatic",
    fuelType: "Gasoline",
    available: false,
    favorite: true,
    image: "https://pngimg.com/uploads/mazda/mazda_PNG46.png",
  },
  {
    id: "cadillac-escalade",
    name: "Cadillac Escalade",
    brand: "Cadillac",
    model: "Escalade",
    spec: "6.2L V8 Platinum (420 hp, 4WD)",
    distance: "320m",
    distanceM: 320,
    eta: "10 min",
    rating: 4.6,
    reviews: 64,
    price: "24.00",
    priceNum: 24.0,
    bodyType: "Crossover",
    transmission: "Automatic",
    fuelType: "Flex Fuel (E85)",
    available: true,
    image: "https://pngimg.com/uploads/cadillac/cadillac_PNG55.png",
  },
  {
    id: "ford-focus-st",
    name: "Ford Focus ST",
    brand: "Ford",
    model: "Focus ST",
    spec: "2.3 EcoBoost (280 hp, FWD)",
    distance: "140m",
    distanceM: 140,
    eta: "5 min",
    rating: 4.7,
    reviews: 156,
    price: "26.75",
    priceNum: 26.75,
    bodyType: "Hatchback",
    transmission: "Manual",
    fuelType: "Gasoline",
    available: true,
    image: "https://pngimg.com/uploads/ford/ford_PNG12251.png",
  },
  {
    id: "tesla-model-s",
    name: "Tesla Model S",
    brand: "Tesla",
    model: "Model S",
    spec: "Long Range (670 hp, AWD)",
    distance: "200m",
    distanceM: 200,
    eta: "6 min",
    rating: 4.1,
    reviews: 298,
    price: "45.00",
    priceNum: 45.0,
    bodyType: "Sedan",
    transmission: "Automatic",
    fuelType: "Electric",
    available: true,
    image: "https://pngimg.com/uploads/tesla_car/tesla_car_PNG52.png",
  },
  {
    id: "mazda-3",
    name: "Mazda 3 Hatchback",
    brand: "Mazda",
    model: "Mazda 3",
    spec: "2.5 Skyactiv-G Select (186 hp, FWD)",
    distance: "150m",
    distanceM: 150,
    eta: "5 min",
    rating: 5.0,
    reviews: 987,
    price: "21.99",
    priceNum: 21.99,
    bodyType: "Hatchback",
    transmission: "Automatic",
    fuelType: "Gasoline",
    available: true,
    favorite: true,
    image: "https://pngimg.com/uploads/mazda/mazda_PNG120.png",
  },
  {
    id: "vw-tiguan",
    name: "VW Tiguan",
    brand: "Volkswagen",
    model: "Tiguan",
    spec: "2.0 TSI R-Line (184 hp, 4Motion)",
    distance: "280m",
    distanceM: 280,
    eta: "9 min",
    rating: 4.6,
    reviews: 118,
    price: "31.50",
    priceNum: 31.5,
    bodyType: "Crossover",
    transmission: "Automatic",
    fuelType: "Gasoline",
    available: true,
    image: "https://pngimg.com/uploads/volkswagen/volkswagen_PNG1779.png",
  },
  {
    id: "honda-crv",
    name: "Honda CR-V",
    brand: "Honda",
    model: "CR-V",
    spec: "1.5 Turbo Touring (190 hp, AWD)",
    distance: "110m",
    distanceM: 110,
    eta: "4 min",
    rating: 4.7,
    reviews: 221,
    price: "27.25",
    priceNum: 27.25,
    bodyType: "Crossover",
    transmission: "Automatic",
    fuelType: "Gasoline",
    available: true,
    image: "https://pngimg.com/uploads/honda/honda_PNG102939.png",
  },
  {
    id: "vw-golf",
    name: "VW Golf",
    brand: "Volkswagen",
    model: "Golf",
    spec: "2.0 TDI Comfortline (148 hp, FWD)",
    distance: "412m",
    distanceM: 412,
    eta: "15 min",
    rating: 4.9,
    reviews: 189,
    price: "18.50",
    priceNum: 18.5,
    bodyType: "Hatchback",
    transmission: "Manual",
    fuelType: "Gasoline",
    available: true,
    image: "https://pngimg.com/uploads/volkswagen/volkswagen_PNG1824.png",
  },
  {
    id: "toyota-corolla",
    name: "Toyota Corolla",
    brand: "Toyota",
    model: "Corolla",
    spec: "1.8 Hybrid LE (138 hp, FWD)",
    distance: "95m",
    distanceM: 95,
    eta: "3 min",
    rating: 4.6,
    reviews: 134,
    price: "20.25",
    priceNum: 20.25,
    bodyType: "Sedan",
    transmission: "Automatic",
    fuelType: "Gasoline",
    available: true,
    image: "https://pngimg.com/uploads/toyota/toyota_PNG1949.png",
  },
];

// Mock notifications — surfaced from the bell popover so the icon does
// something more than display a red dot.
const NOTIFICATIONS = [
  {
    id: 1,
    title: "Booking confirmed",
    body: "Your Audi A4 reservation is ready for pickup.",
    time: "2 min ago",
  },
  {
    id: 2,
    title: "New PRO perk unlocked",
    body: "Free upgrade on weekend rentals all of June.",
    time: "1 h ago",
  },
  {
    id: 3,
    title: "Driver license expiring",
    body: "Your stored license expires in 14 days.",
    time: "Yesterday",
  },
];

// =========================================================================
// SHARED HOOKS
// =========================================================================

// Closes the popover whenever the user clicks/taps outside the wrapping
// element. Used by every dropdown on the page (sort, brand, model, PRO,
// profile, notifications) so they all behave consistently.
function useClickOutside(ref, onOutside, isActive) {
  useEffect(() => {
    if (!isActive) return undefined;
    const handler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onOutside();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [ref, onOutside, isActive]);
}

// =========================================================================
// SMALL PRESENTATIONAL PIECES
// =========================================================================

// "Bali Trans" wordmark — a black tile with a half-disc cutout next to
// the stacked text, recreated here in pure HTML so we don't ship an SVG
// asset for one logo.
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

// Sidebar item. Becomes the visually active row when its `id` matches the
// current sidebar selection. The bell variant carries an unread dot. All
// dimensions are absolute pixels (not rem) so the layout doesn't squeeze
// at the project's >1024px-viewport 18px root font size.
// The sidebar rail itself now lives in `@/components/DashboardSidebar` so
// /dashboard and /dashboard/vehicles render the exact same rail.

// Pill button used by the Rental type and Transmission segmented controls.
function SegmentedPill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-8 flex-1 rounded-[6px] text-[11px] font-semibold transition-all ${
        active
          ? "bg-[#0f0f0f] text-white shadow-sm"
          : "text-[#5e5e5e] hover:text-[#0f0f0f]"
      }`}
    >
      {label}
    </button>
  );
}

// Square-tick checkbox row. Calling onChange flips the underlying filter.
function FilterCheckbox({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-[11.5px] font-medium text-[#1a1a1a] select-none">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <span
        aria-hidden="true"
        className={`grid h-[14px] w-[14px] place-items-center rounded-[3px] border ${
          checked ? "border-[#0f0f0f] bg-[#0f0f0f]" : "border-[#d6d6d6] bg-white"
        }`}
      >
        {checked && (
          <span className="block h-[7px] w-[3.5px] -translate-y-[1px] rotate-45 border-b-[1.5px] border-r-[1.5px] border-white" />
        )}
      </span>
      <span className="truncate">{label}</span>
    </label>
  );
}

// Re-usable filter section header — clicking the header toggles the
// expanded/collapsed state of its children.
function FilterGroup({ title, expanded, onToggle, children }) {
  return (
    <section className="border-t border-[#ededed] py-4">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#a4a4a4]">
          {title}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-[#bdbdbd] transition-transform ${expanded ? "" : "-rotate-90"}`}
        />
      </button>
      {expanded && children ? <div className="mt-3">{children}</div> : null}
    </section>
  );
}

// Histogram + dual-thumb track for "Price range / hour". The thumbs respond
// to pointer drags and emit the new [from, to] pair via onChange. Bars
// render dark when their bucket sits inside the active window.
function PriceHistogram({ value, onChange }) {
  const trackRef = useRef(null);
  const [from, to] = value;

  // Map a clientX to a clamped value along [PRICE_MIN, PRICE_MAX].
  const positionToValue = useCallback((clientX) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return PRICE_MIN;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return PRICE_MIN + ratio * (PRICE_MAX - PRICE_MIN);
  }, []);

  // Returns a pointer-handler factory for either thumb. We attach the
  // pointer listeners to window instead of the thumb so the drag survives
  // the cursor leaving the element.
  const beginDrag = (which) => (event) => {
    event.preventDefault();

    const handleMove = (ev) => {
      const next = positionToValue(ev.clientX);
      if (which === "from") {
        onChange([Math.min(next, to - 1), to]);
      } else {
        onChange([from, Math.max(next, from + 1)]);
      }
    };
    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  // Pre-compute percentages so the active bars and thumbs stay in sync.
  const fromPct = ((from - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const toPct = ((to - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <div>
      <div ref={trackRef} className="relative h-[68px] touch-none select-none">
        {/* Bars. */}
        <div className="absolute inset-x-0 bottom-3 flex h-12 items-end gap-[2px]">
          {PRICE_HISTOGRAM.map((height, index) => {
            const bucketStart = (index / PRICE_HISTOGRAM.length) * 100;
            const bucketEnd = ((index + 1) / PRICE_HISTOGRAM.length) * 100;
            const inRange = bucketEnd > fromPct && bucketStart < toPct;
            return (
              <span
                key={`bar-${index}`}
                className={`flex-1 rounded-t-[2px] ${inRange ? "bg-[#1a1a1a]" : "bg-[#ececec]"}`}
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>

        {/* Track + active range. */}
        <div className="absolute inset-x-0 bottom-[10px] h-[2px] bg-[#ededed]">
          <div
            className="absolute inset-y-0 bg-[#111111]"
            style={{ left: `${fromPct}%`, right: `${100 - toPct}%` }}
          />
        </div>

        {/* Thumbs. The 5px offset centers each 10px circle on its value. */}
        <button
          type="button"
          aria-label="Minimum price"
          onPointerDown={beginDrag("from")}
          className="absolute bottom-[5px] grid h-[10px] w-[10px] place-items-center rounded-full border-[2px] border-[#111111] bg-white shadow-sm cursor-ew-resize"
          style={{ left: `calc(${fromPct}% - 5px)` }}
        />
        <button
          type="button"
          aria-label="Maximum price"
          onPointerDown={beginDrag("to")}
          className="absolute bottom-[5px] grid h-[10px] w-[10px] place-items-center rounded-full border-[2px] border-[#111111] bg-white shadow-sm cursor-ew-resize"
          style={{ left: `calc(${toPct}% - 5px)` }}
        />
      </div>

      <div className="mt-2 flex items-center gap-2">
        <div className="flex-1 rounded-[6px] border border-[#e6e6e6] bg-white px-3 py-2">
          <div className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#a4a4a4]">Min</div>
          <div className="text-[12px] font-bold text-[#0f0f0f]">${from.toFixed(2)}</div>
        </div>
        <span className="text-[10px] text-[#a4a4a4]">—</span>
        <div className="flex-1 rounded-[6px] border border-[#e6e6e6] bg-white px-3 py-2">
          <div className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#a4a4a4]">Max</div>
          <div className="text-[12px] font-bold text-[#0f0f0f]">${to.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

// Inline picker shown inside the "Car brand" filter group. Behaves like a
// search-and-pick combo: the matching options render below the search box
// and the selected brand sits as a removable pill on top.
function CarBrandPicker({ selected, onSelect }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return BRAND_OPTIONS;
    return BRAND_OPTIONS.filter((brand) => brand.toLowerCase().includes(needle));
  }, [query]);

  return (
    <div>
      {selected && (
        <div className="mb-2 flex items-center justify-between rounded-[5px] bg-[#0f0f0f] px-2.5 py-1.5 text-[11px] font-semibold text-white">
          <span>{selected}</span>
          <button
            type="button"
            aria-label={`Clear ${selected}`}
            onClick={() => onSelect(null)}
            className="text-white/60 hover:text-white"
          >
            ×
          </button>
        </div>
      )}
      <div className="relative">
        <Search className="pointer-events-none absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[#9a9a9a]" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search brand"
          className="h-7 w-full rounded-[5px] border border-[#ececec] bg-white pl-7 pr-2 text-[11.5px] font-medium text-[#1a1a1a] placeholder:text-[#9a9a9a] focus:border-[#111111] focus:outline-none"
        />
      </div>
      <ul className="mt-2 max-h-[140px] overflow-y-auto pr-1">
        {filtered.map((brand) => {
          const isActive = brand === selected;
          return (
            <li key={brand}>
              <button
                type="button"
                onClick={() => onSelect(isActive ? null : brand)}
                className={`flex h-7 w-full items-center justify-between rounded-[4px] px-2 text-[11.5px] font-medium transition-colors ${
                  isActive
                    ? "bg-[#f1f1f1] text-[#0f0f0f]"
                    : "text-[#1a1a1a] hover:bg-[#f6f6f6]"
                }`}
              >
                <span>{brand}</span>
                {isActive && <Check className="h-3 w-3" />}
              </button>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="px-2 py-2 text-[11px] text-[#9a9a9a]">No matches</li>
        )}
      </ul>
    </div>
  );
}

// Inline picker shown inside the "Car model & year" filter group. The
// model list comes from the currently selected brand; if no brand is
// chosen it shows a hint so the dependency is obvious.
function CarModelPicker({ brand, selected, onSelect }) {
  const models = brand ? BRAND_CATALOG[brand] : null;
  if (!brand) {
    return (
      <p className="rounded-[4px] bg-[#fafafa] px-2.5 py-2 text-[11px] text-[#9a9a9a]">
        Pick a brand first to see models.
      </p>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-1">
      {models.map((model) => {
        const isActive = model === selected;
        return (
          <li key={model}>
            <button
              type="button"
              onClick={() => onSelect(isActive ? null : model)}
              className={`flex h-7 w-full items-center justify-between rounded-[4px] border px-2 text-[11px] font-medium transition-colors ${
                isActive
                  ? "border-[#111111] bg-white text-[#0f0f0f]"
                  : "border-[#ececec] bg-white text-[#1a1a1a] hover:border-[#bcbcbc]"
              }`}
            >
              <span className="truncate">{model}</span>
              {isActive && <Check className="h-3 w-3" />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

// One vehicle tile. Heart toggles favorite; nothing else is interactive
// since the screenshot doesn't show any other affordances on the card.
function VehicleCard({ vehicle, isFavorite, onToggleFavorite }) {
  return (
    <article className="flex h-[200px] flex-col justify-between border border-[#e9e9e9] bg-white px-3 py-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3 text-[10.5px] font-medium text-[#7c7c7c]">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3 w-3 fill-[#ffc933] text-[#ffc933]" />
            <strong className="font-semibold text-[#1a1a1a]">
              {vehicle.rating.toFixed(1)}
            </strong>
            <span className="text-[#9c9c9c]">({vehicle.reviews})</span>
          </span>
        </div>
        <button
          type="button"
          aria-label={isFavorite ? `Remove ${vehicle.name} from favourites` : `Save ${vehicle.name}`}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(vehicle.id)}
          className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[#1a1a1a] transition-colors hover:bg-[#f5f5f5]"
        >
          <Heart
            className={`h-[16px] w-[16px] stroke-[1.8] ${
              isFavorite ? "fill-[#ff3a5e] text-[#ff3a5e]" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center px-2">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          loading="lazy"
          className="max-h-[96px] w-full scale-[1.12] object-contain"
        />
      </div>

      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-[14px] font-semibold leading-tight text-[#121212]">
            {vehicle.name}
          </div>
          <div className="mt-0.5 truncate text-[10px] font-medium text-[#7d7d7d]">
            {vehicle.spec}
          </div>
        </div>
        <div className="shrink-0 text-right whitespace-nowrap">
          <span className="text-[14px] font-bold leading-none text-[#0e0e0e]">
            ${vehicle.price}
          </span>
          <span className="ml-1 text-[10px] font-medium text-[#9a9a9a]">/ hour</span>
        </div>
      </div>
    </article>
  );
}

// Lightweight placeholder for the "Show map" mode. Renders a faked tile
// grid + a few pin markers so the panel feels real without pulling in a
// mapping library.
function MapPlaceholder({ vehicles }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#e9efee]">
      {/* Tile-style grid lines. */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(#d6dedd 1px, transparent 1px), linear-gradient(90deg, #d6dedd 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(133,170,200,0.35), transparent 60%), radial-gradient(circle at 70% 60%, rgba(160,200,160,0.35), transparent 60%)",
        }}
      />

      {/* Pins for up to 8 vehicles, placed pseudo-randomly but stably. */}
      {vehicles.slice(0, 8).map((vehicle, index) => {
        const left = ((index * 137) % 80) + 10;
        const top = ((index * 91) % 70) + 12;
        return (
          <div
            key={vehicle.id}
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <div className="rounded-full bg-[#0f0f0f] px-2 py-0.5 text-[10px] font-bold text-white shadow-[0_3px_10px_rgba(0,0,0,0.18)]">
              ${vehicle.price}
            </div>
            <div className="mx-auto h-1.5 w-1.5 -translate-y-[1px] rotate-45 bg-[#0f0f0f]" />
          </div>
        );
      })}

      {/* Bottom-left chip so the placeholder owns up to being a placeholder. */}
      <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold text-[#3a3a3a] shadow">
        <MapIcon className="h-3 w-3" />
        Mock map view
      </div>
    </div>
  );
}

// =========================================================================
// MAIN PAGE
// =========================================================================

// Default filter values — used both for the initial render and for the
// "Reset all" button so the two stay in sync.
const DEFAULT_FILTERS = {
  rentalType: "Per hour",
  availableNow: false,
  priceRange: [19, 98.5],
  brand: null,
  model: null,
  bodyTypes: {
    Sedan: true,
    Wagon: false,
    Coupe: true,
    Hatchback: true,
    Pickup: false,
    "Sport coupe": false,
    Crossover: true,
    Van: true,
  },
  transmission: "Any",
  fuelTypes: {
    Gasoline: true,
    "Flex Fuel (E85)": true,
    Diesel: false,
    Hybrid: false,
    Electric: true,
    Hydrogen: false,
    Other: false,
  },
};

export default function DashboardVehicles() {
  // This page owns its own scroll on internal panels, so lock the document
  // to a single viewport and strip the starter template's #root chrome.
  useLockedViewport();

  const navigate = useNavigate();
  const location = useLocation();

  // ----- Live clock (UTC +8) ------------------------------------------------
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Makassar" });

  // ----- Sidebar nav --------------------------------------------------------
  // Active item is derived from the current URL where possible (so /dashboard
  // lights up "Home" and /dashboard/vehicles lights up "Vehicles") and falls
  // back to local state for items without a route — Favourites toggling the
  // saved-only filter, for example.
  const [activeNav, setActiveNav] = useState(
    () => getNavIdFromPath(location.pathname) ?? "vehicles",
  );

  // ----- Filters ------------------------------------------------------------
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // Bulk + single-field updaters. Wrapping setFilters in stable helpers keeps
  // the JSX further down readable.
  const updateFilter = useCallback((patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);
  const toggleBodyType = (key) => {
    setFilters((prev) => ({
      ...prev,
      bodyTypes: { ...prev.bodyTypes, [key]: !prev.bodyTypes[key] },
    }));
  };
  const toggleFuelType = (key) => {
    setFilters((prev) => ({
      ...prev,
      fuelTypes: { ...prev.fuelTypes, [key]: !prev.fuelTypes[key] },
    }));
  };
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  // ----- Filter section expand/collapse ------------------------------------
  // Initial state mirrors the screenshot: price/body/transmission/fuel
  // expanded, the two car selectors collapsed.
  const [expandedSections, setExpandedSections] = useState({
    priceRange: true,
    carBrand: false,
    carModel: false,
    bodyType: true,
    transmission: true,
    fuelType: true,
  });
  const toggleSection = (key) =>
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));

  // ----- Sort & view --------------------------------------------------------
  const [sortId, setSortId] = useState("price-asc");
  const sortLabel =
    SORT_OPTIONS.find((option) => option.id === sortId)?.label ?? "Sort";

  // ----- Favourites --------------------------------------------------------
  const initialFavorites = useMemo(
    () => new Set(VEHICLES.filter((v) => v.favorite).map((v) => v.id)),
    [],
  );
  const [favorites, setFavorites] = useState(initialFavorites);
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ----- Filter & sort pipeline -------------------------------------------
  // The "Favourites" sidebar destination filters down to saved cars; every
  // other destination keeps the full grid (this is mock data after all).
  const filteredVehicles = useMemo(() => {
    const activeBodyTypes = Object.entries(filters.bodyTypes)
      .filter(([, on]) => on)
      .map(([key]) => key);
    const activeFuelTypes = Object.entries(filters.fuelTypes)
      .filter(([, on]) => on)
      .map(([key]) => key);

    return VEHICLES.filter((v) => {
      if (activeNav === "favourites" && !favorites.has(v.id)) return false;
      if (filters.availableNow && !v.available) return false;
      if (v.priceNum < filters.priceRange[0] || v.priceNum > filters.priceRange[1]) {
        return false;
      }
      if (filters.brand && v.brand !== filters.brand) return false;
      if (filters.model && v.model !== filters.model) return false;
      if (activeBodyTypes.length && !activeBodyTypes.includes(v.bodyType)) {
        return false;
      }
      if (filters.transmission !== "Any" && v.transmission !== filters.transmission) {
        return false;
      }
      if (activeFuelTypes.length && !activeFuelTypes.includes(v.fuelType)) {
        return false;
      }
      return true;
    });
  }, [filters, favorites, activeNav]);

  const sortedVehicles = useMemo(() => {
    const list = [...filteredVehicles];
    switch (sortId) {
      case "distance":
        return list.sort((a, b) => a.distanceM - b.distanceM);
      case "price-asc":
        return list.sort((a, b) => a.priceNum - b.priceNum);
      case "price-desc":
        return list.sort((a, b) => b.priceNum - a.priceNum);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "reviews":
        return list.sort((a, b) => b.reviews - a.reviews);
      default:
        return list;
    }
  }, [filteredVehicles, sortId]);

  // ----- Header popovers ---------------------------------------------------
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const sortRef = useRef(null);

  useClickOutside(profileRef, () => setProfileOpen(false), profileOpen);
  useClickOutside(
    notificationsRef,
    () => setNotificationsOpen(false),
    notificationsOpen,
  );
  useClickOutside(sortRef, () => setSortOpen(false), sortOpen);

  // ----- Render ------------------------------------------------------------
  return (
    <div className="h-screen overflow-hidden bg-[#f3f4f4] font-sans text-[13px] text-[#111111] [color-scheme:light]">
      <Helmet>
        <title>Dashboard v2 · Bali Trans</title>
        <meta
          name="description"
          content="Vehicle catalog dashboard rebuilt to match the Bali Trans rental layout."
        />
      </Helmet>

      {/* ============================================================
          TOP BAR
          ------------------------------------------------------------
          Heights and widths are absolute pixels (not rem) so they
          stay accurate against the global 18px-root font without
          knocking the page over its 100vh budget — `h-12` would
          render at 54px on this project and break the calc below.
          ============================================================ */}
      <DashboardTopBar />

      {/* ============================================================
          BODY
          ============================================================ */}
      <div className="flex h-[calc(100vh-var(--header-h))] overflow-hidden">
        {/* --- Sidebar nav rail -------------------------------------
            Width matches the brand cell above so the vertical rule
            between cell and content lines up perfectly. */}
        <DashboardSidebar
          activeId={activeNav}
          onSelect={(item) => setActiveNav(item.id)}
        />

        {/* --- Filter panel ----------------------------------------- */}
        <div className="relative shrink-0">
          <aside className={`overflow-y-auto border-r border-[#e6e6e6] bg-white transition-all duration-200 ${filterPanelOpen ? "w-[224px] px-4 py-5" : "w-0 overflow-hidden border-r-0 px-0 py-0"}`}>
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[14px] font-semibold text-[#111111]">Filter by</div>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-[10px] font-medium text-[#a8a8a8] hover:text-[#1a1a1a]"
            >
              Reset all <span className="text-[#bcbcbc]">×</span>
            </button>
          </div>

          {/* Rental type — first group sits flush, no top border. */}
          <section className="pb-4">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#a4a4a4]">
              Rental type
            </div>
            <div className="flex gap-1 rounded-[8px] bg-[#f3f4f4] p-1">
              {RENTAL_TYPES.map((type) => (
                <SegmentedPill
                  key={type}
                  label={type}
                  active={filters.rentalType === type}
                  onClick={() => updateFilter({ rentalType: type })}
                />
              ))}
            </div>
          </section>

          {/* Available now toggle. */}
          <section className="border-t border-[#ededed] py-4">
            <div className="flex items-center justify-between">
              <div
                className={`text-[10px] font-semibold uppercase tracking-[0.06em] ${
                  filters.availableNow ? "text-[#1a1a1a]" : "text-[#bfbfbf]"
                }`}
              >
                Available now only
              </div>
              <button
                type="button"
                aria-label="Available now only"
                aria-pressed={filters.availableNow}
                onClick={() => updateFilter({ availableNow: !filters.availableNow })}
                className={`relative h-5 w-9 rounded-full transition-colors ${
                  filters.availableNow ? "bg-[#0f0f0f]" : "bg-[#e4e4e6]"
                }`}
              >
                <span
                  className={`absolute top-[2px] h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.18)] transition-[left]`}
                  style={{ left: filters.availableNow ? "18px" : "2px" }}
                />
              </button>
            </div>
          </section>

          <FilterGroup
            title="Price range / hour"
            expanded={expandedSections.priceRange}
            onToggle={() => toggleSection("priceRange")}
          >
            <PriceHistogram
              value={filters.priceRange}
              onChange={(next) => updateFilter({ priceRange: next })}
            />
          </FilterGroup>

          <FilterGroup
            title="Car brand"
            expanded={expandedSections.carBrand}
            onToggle={() => toggleSection("carBrand")}
          >
            <CarBrandPicker
              selected={filters.brand}
              onSelect={(brand) =>
                updateFilter({
                  brand,
                  // Reset model whenever brand changes so the dropdown
                  // can't end up with a stale Audi model under a Tesla
                  // brand.
                  model: brand === filters.brand ? filters.model : null,
                })
              }
            />
          </FilterGroup>

          <FilterGroup
            title="Car model & year"
            expanded={expandedSections.carModel}
            onToggle={() => toggleSection("carModel")}
          >
            <CarModelPicker
              brand={filters.brand}
              selected={filters.model}
              onSelect={(model) => updateFilter({ model })}
            />
          </FilterGroup>

          <FilterGroup
            title="Body type"
            expanded={expandedSections.bodyType}
            onToggle={() => toggleSection("bodyType")}
          >
            <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
              {BODY_TYPE_OPTIONS.map((label) => (
                <FilterCheckbox
                  key={label}
                  label={label}
                  checked={filters.bodyTypes[label]}
                  onChange={() => toggleBodyType(label)}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup
            title="Transmission"
            expanded={expandedSections.transmission}
            onToggle={() => toggleSection("transmission")}
          >
            <div className="flex gap-1.5">
              {TRANSMISSIONS.map((option) => (
                <SegmentedPill
                  key={option}
                  label={option}
                  active={filters.transmission === option}
                  onClick={() => updateFilter({ transmission: option })}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup
            title="Fuel type"
            expanded={expandedSections.fuelType}
            onToggle={() => toggleSection("fuelType")}
          >
            <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
              {FUEL_TYPE_OPTIONS.map((label) => (
                <FilterCheckbox
                  key={label}
                  label={label}
                  checked={filters.fuelTypes[label]}
                  onChange={() => toggleFuelType(label)}
                />
              ))}
            </div>
          </FilterGroup>
          </aside>
        </div>

        {/* --- Main content ----------------------------------------- */}
        <main className="min-w-0 flex-1 overflow-y-auto bg-[#f3f4f4]">
          <div className="flex h-[56px] items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFilterPanelOpen((v) => !v)}
                className={`inline-flex h-8 items-center gap-1.5 rounded-[6px] border px-2.5 text-[11px] font-semibold transition-colors ${filterPanelOpen ? "border-[#0f0f0f] bg-[#0f0f0f] text-white" : "border-[#e6e6e6] bg-white text-[#3a3a3a] hover:bg-[#f5f5f5]"}`}
                aria-pressed={filterPanelOpen}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
              </button>
              <h1 className="text-[22px] font-semibold leading-none text-[#101010]">
                {sortedVehicles.length} vehicle{sortedVehicles.length === 1 ? "" : "s"}{" "}
                to rent
              </h1>
            </div>
            <div className="flex items-center gap-6 text-[11.5px] font-medium text-[#1a1a1a]">
              {/* Sort dropdown */}
              <div ref={sortRef} className="relative">
                <button
                  type="button"
                  onClick={() => setSortOpen((v) => !v)}
                  aria-expanded={sortOpen}
                  className="inline-flex items-center gap-1"
                >
                  {sortLabel}
                  <ChevronDown className="h-3 w-3" />
                </button>
                {sortOpen && (
                  <ul className="absolute right-0 top-full z-30 mt-2 w-[180px] overflow-hidden rounded-md border border-[#ececec] bg-white py-1 shadow-[0_8px_28px_rgba(0,0,0,0.12)]">
                    {SORT_OPTIONS.map((option) => {
                      const isActive = option.id === sortId;
                      return (
                        <li key={option.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setSortId(option.id);
                              setSortOpen(false);
                            }}
                            className={`flex h-8 w-full items-center justify-between px-3 text-left text-[11.5px] ${
                              isActive
                                ? "bg-[#f6f6f6] font-semibold text-[#0f0f0f]"
                                : "text-[#1a1a1a] hover:bg-[#f6f6f6]"
                            }`}
                          >
                            {option.label}
                            {isActive && <Check className="h-3 w-3" />}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-3 pb-4">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(248px,1fr))] gap-[10px]">
              {sortedVehicles.length > 0 ? (
                sortedVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    isFavorite={favorites.has(vehicle.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))
              ) : (
                <EmptyState onReset={resetFilters} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Empty-state surface when filters knock the list down to zero. Spans the
// full grid because parent uses `grid-cols-[repeat(auto-fill,...)]`.
function EmptyState({ onReset }) {
  return (
    <div className="col-span-full mx-auto mt-10 flex max-w-md flex-col items-center text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#7c7c7c] shadow-sm">
        <Car className="h-5 w-5" />
      </div>
      <div className="mt-3 text-[14px] font-semibold text-[#111111]">
        No vehicles match those filters
      </div>
      <p className="mt-1 text-[12px] text-[#6e6e6e]">
        Try widening the price range, picking another body type, or clearing
        the brand & model filters.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 inline-flex h-8 items-center rounded-[6px] bg-[#101010] px-3 text-[11.5px] font-bold text-white"
      >
        Reset filters
      </button>
    </div>
  );
}
