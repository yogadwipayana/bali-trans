import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Bell,
  Calendar,
  Car,
  ChevronDown,
  Clock,
  Crown,
  Footprints,
  Fuel,
  Gauge,
  Heart,
  Home,
  IdCard,
  LogOut,
  Map,
  MessageCircle,
  Navigation,
  Search,
  SlidersHorizontal,
  Star,
  StickyNote,
  User,
  Users,
  X,
} from "lucide-react";

import { useFullScreenRoot } from "@/hooks/useFullScreenRoot";

const PRICE_MIN = 19;
const PRICE_MAX = 98.5;

const BODY_TYPES = ["Sedan", "Wagon", "Coupe", "Hatchback", "Pickup", "Sport coupe", "Crossover", "Van"];
const DEFAULT_BODY_TYPES = new Set(["Sedan", "Coupe", "Hatchback", "Crossover", "Van"]);
const FUEL_TYPES = ["Gasoline", "Flex Fuel (E85)", "Diesel", "Hybrid", "Electric", "Hydrogen", "Other"];
const DEFAULT_FUEL_TYPES = new Set(["Gasoline", "Flex Fuel (E85)", "Electric"]);
const SORT_OPTIONS = ["Closest to me", "Price low to high", "Price high to low", "Highest rated", "Most reviewed"];
const PRICE_BARS = [22, 26, 31, 36, 42, 50, 58, 65, 72, 78, 83, 87, 91, 88, 84, 79, 73, 68, 61, 55, 49, 43, 39, 45, 52, 58, 64, 69, 74, 79, 84, 88];

const BASE_VEHICLES = [
  {
    id: "audi-a4",
    name: "Audi A4",
    brand: "Audi",
    modelYear: "A4 2024",
    bodyType: "Sedan",
    transmission: "Automatic",
    fuelType: "Gasoline",
    seats: 5,
    spec: "2.0 TFSI Sport (249 hp, Quattro)",
    distanceMeters: 120,
    etaMinutes: 4,
    rating: 4.7,
    reviews: 109,
    price: 24.59,
    available: true,
    utilization: 72,
    image: "https://pngimg.com/uploads/audi/audi_PNG1714.png",
  },
  {
    id: "opel-insignia",
    name: "Opel Insignia",
    brand: "Opel",
    modelYear: "Insignia 2023",
    bodyType: "Sedan",
    transmission: "Automatic",
    fuelType: "Flex Fuel (E85)",
    seats: 5,
    spec: "2.0 Turbo Grand Sport (230 hp, AWD)",
    distanceMeters: 250,
    etaMinutes: 8,
    rating: 4.0,
    reviews: 87,
    price: 19.99,
    available: true,
    utilization: 64,
    image: "https://pngimg.com/uploads/opel/opel_PNG35.png",
  },
  {
    id: "mini-countryman",
    name: "Mini Countryman",
    brand: "Mini",
    modelYear: "Countryman 2024",
    bodyType: "Crossover",
    transmission: "Automatic",
    fuelType: "Gasoline",
    seats: 5,
    spec: "Cooper S ALL4 (189 hp, AWD)",
    distanceMeters: 180,
    etaMinutes: 5,
    rating: 4.9,
    reviews: 142,
    price: 28.5,
    available: true,
    utilization: 81,
    image: "https://pngimg.com/uploads/mini/mini_PNG11810.png",
  },
  {
    id: "mazda-6",
    name: "Mazda 6",
    brand: "Mazda",
    modelYear: "Mazda 6 2024",
    bodyType: "Sedan",
    transmission: "Automatic",
    fuelType: "Gasoline",
    seats: 5,
    spec: "2.5 Turbo Premium (250 hp, AWD)",
    distanceMeters: 90,
    etaMinutes: 3,
    rating: 5.0,
    reviews: 766,
    price: 22.99,
    available: true,
    favorite: true,
    utilization: 89,
    image: "https://pngimg.com/uploads/mazda/mazda_PNG46.png",
  },
  {
    id: "cadillac-escalade",
    name: "Cadillac Escalade",
    brand: "Cadillac",
    modelYear: "Escalade 2025",
    bodyType: "Van",
    transmission: "Automatic",
    fuelType: "Gasoline",
    seats: 7,
    spec: "6.2L V8 Platinum (420 hp, 4WD)",
    distanceMeters: 320,
    etaMinutes: 10,
    rating: 4.6,
    reviews: 64,
    price: 24,
    available: false,
    utilization: 58,
    image: "https://pngimg.com/uploads/cadillac/cadillac_PNG55.png",
  },
  {
    id: "ford-focus-st",
    name: "Ford Focus ST",
    brand: "Ford",
    modelYear: "Focus ST 2023",
    bodyType: "Hatchback",
    transmission: "Manual",
    fuelType: "Flex Fuel (E85)",
    seats: 5,
    spec: "2.3 EcoBoost (280 hp, FWD)",
    distanceMeters: 140,
    etaMinutes: 5,
    rating: 4.7,
    reviews: 156,
    price: 26.75,
    available: true,
    utilization: 76,
    image: "https://pngimg.com/uploads/ford/ford_PNG12251.png",
  },
  {
    id: "tesla-model-s",
    name: "Tesla Model S",
    brand: "Tesla",
    modelYear: "Model S 2025",
    bodyType: "Sedan",
    transmission: "Automatic",
    fuelType: "Electric",
    seats: 5,
    spec: "Long Range (670 hp, AWD)",
    distanceMeters: 200,
    etaMinutes: 6,
    rating: 4.1,
    reviews: 298,
    price: 45,
    available: true,
    utilization: 91,
    image: "https://pngimg.com/uploads/tesla_car/tesla_car_PNG52.png",
  },
  {
    id: "mazda-3",
    name: "Mazda 3 Hatchback",
    brand: "Mazda",
    modelYear: "Mazda 3 2024",
    bodyType: "Hatchback",
    transmission: "Automatic",
    fuelType: "Gasoline",
    seats: 5,
    spec: "2.5 Skyactiv-G Select (186 hp, FWD)",
    distanceMeters: 150,
    etaMinutes: 5,
    rating: 5.0,
    reviews: 987,
    price: 21.99,
    available: true,
    favorite: true,
    utilization: 94,
    image: "https://pngimg.com/uploads/mazda/mazda_PNG120.png",
  },
  {
    id: "vw-tiguan",
    name: "VW Tiguan",
    brand: "Volkswagen",
    modelYear: "Tiguan 2024",
    bodyType: "Crossover",
    transmission: "Automatic",
    fuelType: "Gasoline",
    seats: 5,
    spec: "2.0 TSI R-Line (184 hp, 4Motion)",
    distanceMeters: 280,
    etaMinutes: 9,
    rating: 4.6,
    reviews: 118,
    price: 31.5,
    available: false,
    utilization: 67,
    image: "https://pngimg.com/uploads/volkswagen/volkswagen_PNG1779.png",
  },
  {
    id: "honda-crv",
    name: "Honda CR-V",
    brand: "Honda",
    modelYear: "CR-V 2024",
    bodyType: "Crossover",
    transmission: "Automatic",
    fuelType: "Gasoline",
    seats: 5,
    spec: "1.5 Turbo Touring (190 hp, AWD)",
    distanceMeters: 110,
    etaMinutes: 4,
    rating: 4.7,
    reviews: 221,
    price: 27.25,
    available: true,
    utilization: 73,
    image: "https://pngimg.com/uploads/honda/honda_PNG102939.png",
  },
  {
    id: "vw-golf",
    name: "VW Golf",
    brand: "Volkswagen",
    modelYear: "Golf 2023",
    bodyType: "Hatchback",
    transmission: "Manual",
    fuelType: "Flex Fuel (E85)",
    seats: 5,
    spec: "2.0 TDI Comfortline (148 hp, FWD)",
    distanceMeters: 412,
    etaMinutes: 15,
    rating: 4.9,
    reviews: 189,
    price: 18.5,
    available: true,
    utilization: 69,
    image: "https://pngimg.com/uploads/volkswagen/volkswagen_PNG1824.png",
  },
  {
    id: "toyota-corolla",
    name: "Toyota Corolla",
    brand: "Toyota",
    modelYear: "Corolla 2024",
    bodyType: "Sedan",
    transmission: "Automatic",
    fuelType: "Electric",
    seats: 5,
    spec: "1.8 Hybrid LE (138 hp, FWD)",
    distanceMeters: 95,
    etaMinutes: 3,
    rating: 4.6,
    reviews: 134,
    price: 20.25,
    available: true,
    utilization: 78,
    image: "https://pngimg.com/uploads/toyota/toyota_PNG1949.png",
  },
];

const MOCK_VEHICLES = Array.from({ length: 48 }, (_, index) => {
  const base = BASE_VEHICLES[index % BASE_VEHICLES.length];
  const batch = Math.floor(index / BASE_VEHICLES.length);
  const priceOffset = batch * 3.25 + (index % 4) * 0.7;
  const distanceOffset = batch * 37 + (index % 3) * 12;
  const ratingOffset = ((index % 5) - 2) * 0.1;
  const nameSuffix = batch === 0 ? "" : ` ${["City", "Prime", "Reserve", "Touring"][batch - 1]}`;

  return {
    ...base,
    id: `${base.id}-${batch + 1}`,
    name: `${base.name}${nameSuffix}`,
    distanceMeters: base.distanceMeters + distanceOffset,
    etaMinutes: Math.max(2, base.etaMinutes + batch + (index % 2)),
    rating: Math.min(5, Math.max(3.8, Number((base.rating + ratingOffset).toFixed(1)))),
    reviews: base.reviews + batch * 43 + index * 2,
    price: Number(Math.min(PRICE_MAX - 1, base.price + priceOffset).toFixed(2)),
    available: base.available || index % 5 !== 0,
    favorite: base.favorite && batch === 0,
    rentalTypes: index % 4 === 0 ? ["Per hour", "Per day"] : ["Per hour"],
    plate: `BT-${String(2400 + index).padStart(4, "0")}`,
    location: ["Terminal A", "Downtown", "SoMa Garage", "Marina Depot"][index % 4],
    note: index % 6 === 0 ? "Needs interior inspection before next handoff." : "",
    nextBooking: ["Today 16:30", "Tomorrow 09:00", "May 12 13:15", "Open"][index % 4],
    mapX: 12 + ((index * 17) % 76),
    mapY: 15 + ((index * 23) % 68),
  };
});

const DEFAULT_FILTERS = {
  rentalType: "Per hour",
  availableOnly: false,
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
  brands: new Set(),
  models: new Set(),
  bodyTypes: DEFAULT_BODY_TYPES,
  transmission: "Any",
  fuelTypes: DEFAULT_FUEL_TYPES,
  search: "",
};

const NAV_TOP = [
  { icon: Home, label: "Home" },
  { icon: Car, label: "Vehicles" },
  { icon: StickyNote, label: "Notes" },
  { icon: Heart, label: "Favourites" },
  { icon: Clock, label: "Recents" },
];

const NAV_BOTTOM = [
  { icon: Bell, label: "Notifications" },
  { icon: MessageCircle, label: "Chat" },
  { icon: IdCard, label: "License" },
  { icon: User, label: "Support" },
  { icon: LogOut, label: "Logout" },
];

function cloneFilters(filters = DEFAULT_FILTERS) {
  return {
    ...filters,
    brands: new Set(filters.brands),
    models: new Set(filters.models),
    bodyTypes: new Set(filters.bodyTypes),
    fuelTypes: new Set(filters.fuelTypes),
  };
}

function AppLogo() {
  return (
    <div className="flex items-center gap-2 px-3">
      <div className="grid h-7 w-7 place-items-center rounded-[7px] bg-[#141414]">
        <div className="h-4 w-4 rounded-tl-[10px] rounded-br-[10px] bg-white" />
      </div>
      <div className="leading-[0.9] text-[11px] font-black tracking-[0.02em] text-[#161616]">
        <div>BALI</div>
        <div>TRANS</div>
      </div>
    </div>
  );
}

function AdminNavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-8 w-full items-center gap-2 px-3 text-left text-[11px] transition-colors ${
        active ? "bg-[#f5f5f5] font-semibold text-[#111111]" : "font-medium text-[#171717] hover:bg-[#f6f6f6]"
      }`}
    >
      <Icon className="h-[17px] w-[17px] shrink-0 stroke-[1.8]" />
      <span className="truncate">{label}</span>
    </button>
  );
}

function FilterSection({ title, expanded, onToggle, children }) {
  return (
    <section className="border-t border-[#ececec] py-5">
      <button type="button" onClick={onToggle} className="mb-3 flex w-full items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-normal text-[#9b9b9b]">
          {title}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-[#b5b5b5] transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && children}
    </section>
  );
}

function Chip({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-7 rounded-[5px] border px-3 text-[12px] font-medium transition-colors ${
        active
          ? "border-[#121212] bg-white text-[#121212]"
          : "border-[#e7e7e7] bg-white text-[#151515] hover:border-[#c9c9c9]"
      }`}
    >
      {children}
    </button>
  );
}

function Toggle({ active, onClick, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`relative h-5 w-9 rounded-full transition-colors ${active ? "bg-[#111111]" : "bg-[#e1e1e3]"}`}
    >
      <span
        className={`absolute left-0 top-[2px] h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
          active ? "translate-x-[18px]" : "translate-x-[2px]"
        }`}
      />
    </button>
  );
}

function CheckboxRow({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-[12px] font-medium text-[#171717]">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span
        className={`grid h-[13px] w-[13px] place-items-center rounded-[3px] border ${
          checked ? "border-[#101010] bg-[#101010]" : "border-[#d7d7d7] bg-white"
        }`}
      >
        {checked && (
          <span className="h-[6px] w-[3px] rotate-45 border-b border-r border-white" />
        )}
      </span>
      <span className="truncate">{label}</span>
    </label>
  );
}

function PriceRange({ minPrice, maxPrice, onChange }) {
  const left = ((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const right = 100 - ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  const updateMin = (value) => {
    onChange(Math.min(Number(value), maxPrice - 1), maxPrice);
  };

  const updateMax = (value) => {
    onChange(minPrice, Math.max(Number(value), minPrice + 1));
  };

  return (
    <div>
      <div className="relative mt-1 h-16">
        <div className="absolute inset-x-1 bottom-2 flex h-12 items-end gap-[2px]">
          {PRICE_BARS.map((height, index) => {
            const position = (index / (PRICE_BARS.length - 1)) * 100;
            const active = position >= left && position <= 100 - right;
            return (
              <span
                key={`${height}-${index}`}
                className={`w-full rounded-t-[2px] ${active ? "bg-[#1d1d1d]" : "bg-[#eeeeee]"}`}
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>
        <div className="absolute bottom-[7px] h-[2px] bg-[#111111]" style={{ left: `${left}%`, right: `${right}%` }} />
        <div className="absolute bottom-1 h-[10px] w-[10px] -translate-x-1/2 rounded-full border-2 border-[#111111] bg-white" style={{ left: `${left}%` }} />
        <div className="absolute bottom-1 h-[10px] w-[10px] -translate-x-1/2 rounded-full border-2 border-[#111111] bg-white" style={{ left: `${100 - right}%` }} />
        <input
          aria-label="Minimum price"
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step="0.5"
          value={minPrice}
          onChange={(event) => updateMin(event.target.value)}
          className="absolute inset-x-0 bottom-0 h-8 cursor-pointer opacity-0"
        />
        <input
          aria-label="Maximum price"
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step="0.5"
          value={maxPrice}
          onChange={(event) => updateMax(event.target.value)}
          className="absolute inset-x-0 bottom-0 h-8 cursor-pointer opacity-0"
        />
      </div>
      <div className="grid grid-cols-2 gap-1">
        <label className="rounded-[3px] bg-[#f8f8f8] px-3 py-2">
          <span className="block text-[9px] font-semibold uppercase text-[#acacac]">From</span>
          <input
            type="text"
            value={`$${minPrice.toFixed(2)}`}
            onChange={(event) => updateMin(event.target.value.replace(/[^\d.]/g, ""))}
            className="mt-1 w-full bg-transparent text-right text-[11px] font-bold text-[#181818] outline-none"
          />
        </label>
        <label className="rounded-[3px] bg-[#f8f8f8] px-3 py-2">
          <span className="block text-[9px] font-semibold uppercase text-[#acacac]">To</span>
          <input
            type="text"
            value={`$${maxPrice.toFixed(2)}`}
            onChange={(event) => updateMax(event.target.value.replace(/[^\d.]/g, ""))}
            className="mt-1 w-full bg-transparent text-right text-[11px] font-bold text-[#181818] outline-none"
          />
        </label>
      </div>
    </div>
  );
}

function FilterPanel({ filters, onFiltersChange, brands, models, openSections, onToggleSection, resultCount }) {
  const setFilter = (patch) => onFiltersChange({ ...filters, ...patch });

  const toggleSetValue = (key, value) => {
    const next = new Set(filters[key]);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setFilter({ [key]: next });
  };

  return (
    <aside className="w-[224px] shrink-0 overflow-y-auto border-r border-[#e8e8e8] bg-white px-4 py-5 max-[920px]:hidden">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-[15px] font-semibold text-[#151515]">Filter by</div>
          <div className="mt-1 text-[10px] font-medium text-[#9b9b9b]">{resultCount} matching</div>
        </div>
        <button
          type="button"
          onClick={() => onFiltersChange(cloneFilters())}
          className="text-[10px] font-medium text-[#b0b0b0] hover:text-[#111111]"
        >
          Reset all <span className="ml-1 text-[#c3c3c3]">x</span>
        </button>
      </div>

      <label className="mb-5 flex h-8 items-center gap-2 rounded-[5px] border border-[#ececec] px-2">
        <Search className="h-3.5 w-3.5 text-[#9a9a9a]" />
        <input
          value={filters.search}
          onChange={(event) => setFilter({ search: event.target.value })}
          placeholder="Search inventory"
          className="min-w-0 flex-1 bg-transparent text-[12px] font-medium text-[#151515] outline-none placeholder:text-[#ababab]"
        />
      </label>

      <div className="pb-5">
        <div className="mb-3 text-[10px] font-semibold uppercase tracking-normal text-[#9b9b9b]">
          Rental type
        </div>
        <div className="flex gap-2">
          {["Any", "Per day", "Per hour"].map((type) => (
            <Chip
              key={type}
              active={filters.rentalType === type}
              onClick={() => setFilter({ rentalType: type })}
            >
              {type}
            </Chip>
          ))}
        </div>
      </div>

      <section className="border-t border-[#ececec] py-5">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-semibold uppercase tracking-normal text-[#9b9b9b]">
            Available now only
          </div>
          <Toggle
            label="Available now only"
            active={filters.availableOnly}
            onClick={() => setFilter({ availableOnly: !filters.availableOnly })}
          />
        </div>
      </section>

      <FilterSection
        title="Price range / hour"
        expanded={openSections.price}
        onToggle={() => onToggleSection("price")}
      >
        <PriceRange
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onChange={(minPrice, maxPrice) => setFilter({ minPrice, maxPrice })}
        />
      </FilterSection>

      <FilterSection
        title="Car brand"
        expanded={openSections.brand}
        onToggle={() => onToggleSection("brand")}
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {brands.map((brand) => (
            <CheckboxRow
              key={brand}
              label={brand}
              checked={filters.brands.has(brand)}
              onChange={() => toggleSetValue("brands", brand)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Car model & year"
        expanded={openSections.model}
        onToggle={() => onToggleSection("model")}
      >
        <div className="grid gap-3">
          {models.slice(0, 9).map((model) => (
            <CheckboxRow
              key={model}
              label={model}
              checked={filters.models.has(model)}
              onChange={() => toggleSetValue("models", model)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Body type"
        expanded={openSections.body}
        onToggle={() => onToggleSection("body")}
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {BODY_TYPES.map((bodyType) => (
            <CheckboxRow
              key={bodyType}
              label={bodyType}
              checked={filters.bodyTypes.has(bodyType)}
              onChange={() => toggleSetValue("bodyTypes", bodyType)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Transmission"
        expanded={openSections.transmission}
        onToggle={() => onToggleSection("transmission")}
      >
        <div className="flex gap-2">
          {["Any", "Automatic", "Manual"].map((transmission) => (
            <Chip
              key={transmission}
              active={filters.transmission === transmission}
              onClick={() => setFilter({ transmission })}
            >
              {transmission}
            </Chip>
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Fuel type"
        expanded={openSections.fuel}
        onToggle={() => onToggleSection("fuel")}
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {FUEL_TYPES.map((fuelType) => (
            <CheckboxRow
              key={fuelType}
              label={fuelType}
              checked={filters.fuelTypes.has(fuelType)}
              onChange={() => toggleSetValue("fuelTypes", fuelType)}
            />
          ))}
        </div>
      </FilterSection>
    </aside>
  );
}

function VehicleCard({ vehicle, favorite, onToggleFavorite, onSelect }) {
  return (
    <article
      className="min-h-[190px] border border-[#e9e9e9] bg-white px-3 py-3 transition-colors hover:border-[#d1d1d1]"
      onClick={() => onSelect(vehicle)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3 text-[10px] font-medium text-[#717171]">
          <span className="inline-flex items-center gap-1">
            <Footprints className="h-3 w-3 text-[#303030]" />
            <strong className="font-semibold text-[#1d1d1d]">{vehicle.distanceMeters}m</strong> ({vehicle.etaMinutes} min)
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3 w-3 fill-[#ffd31d] text-[#ffd31d]" />
            <strong className="font-semibold text-[#1d1d1d]">{vehicle.rating.toFixed(1)}</strong> ({vehicle.reviews})
          </span>
        </div>
        <button
          type="button"
          aria-label={favorite ? `Remove ${vehicle.name} from favourites` : `Save ${vehicle.name}`}
          aria-pressed={favorite}
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite(vehicle.id);
          }}
          className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[#171717] transition-colors hover:bg-[#f5f5f5]"
        >
          <Heart
            className={`h-[17px] w-[17px] stroke-[1.8] ${
              favorite ? "fill-[#ff5576] text-[#ff5576]" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex h-[102px] items-center justify-center overflow-hidden px-3">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="max-h-[94px] w-full object-contain"
          style={{ transform: `scale(${vehicle.imageScale ?? 1.12})` }}
          loading="lazy"
        />
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="truncate text-[14px] font-semibold leading-tight text-[#151515]">
              {vehicle.name}
            </div>
            {!vehicle.available && (
              <span className="rounded-[3px] bg-[#f0f0f0] px-1.5 py-0.5 text-[9px] font-bold text-[#777777]">
                Busy
              </span>
            )}
          </div>
          <div className="mt-1 truncate text-[10px] font-medium text-[#7a7a7a]">
            {vehicle.spec}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <span className="text-[14px] font-bold leading-none text-[#111111]">${vehicle.price.toFixed(2)}</span>
          <span className="ml-1 text-[10px] font-medium text-[#8a8a8a]">/ hour</span>
        </div>
      </div>
    </article>
  );
}

function SortMenu({ sort, open, onToggle, onSelect }) {
  return (
    <div className="relative">
      <button type="button" onClick={onToggle} className="inline-flex items-center gap-1">
        {sort} <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <div className="absolute right-0 top-6 z-20 w-40 border border-[#e2e2e2] bg-white py-1 shadow-sm">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={`block w-full px-3 py-2 text-left text-[11px] hover:bg-[#f6f6f6] ${
                sort === option ? "font-bold text-[#111111]" : "font-medium text-[#555555]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MapPanel({ vehicles, selectedId, onSelect }) {
  return (
    <aside className="hidden w-[318px] shrink-0 border-l border-[#e1e1e1] bg-white p-3 min-[1120px]:block">
      <div className="relative h-[300px] overflow-hidden bg-[#f1f1ef]">
        <div className="absolute left-[-20%] top-[42%] h-8 w-[140%] rotate-[-17deg] bg-white/80" />
        <div className="absolute left-[16%] top-[-20%] h-[145%] w-7 rotate-[12deg] bg-white/70" />
        <div className="absolute left-[58%] top-[-18%] h-[140%] w-5 rotate-[-8deg] bg-white/70" />
        {vehicles.slice(0, 24).map((vehicle) => (
          <button
            key={vehicle.id}
            type="button"
            aria-label={`Select ${vehicle.name}`}
            onClick={() => onSelect(vehicle)}
            className={`absolute grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-[9px] font-black shadow-sm ${
              selectedId === vehicle.id
                ? "border-[#111111] bg-[#111111] text-white"
                : "border-white bg-[#ff5576] text-white"
            }`}
            style={{ left: `${vehicle.mapX}%`, top: `${vehicle.mapY}%` }}
          >
            ${Math.round(vehicle.price)}
          </button>
        ))}
      </div>
      <div className="mt-3 text-[11px] font-bold text-[#161616]">Nearest vehicles</div>
      <div className="mt-2 grid gap-2">
        {vehicles.slice(0, 4).map((vehicle) => (
          <button
            key={vehicle.id}
            type="button"
            onClick={() => onSelect(vehicle)}
            className="flex items-center justify-between border border-[#eeeeee] px-2 py-2 text-left"
          >
            <span className="min-w-0">
              <span className="block truncate text-[11px] font-semibold text-[#151515]">{vehicle.name}</span>
              <span className="block text-[10px] font-medium text-[#8a8a8a]">{vehicle.distanceMeters}m away</span>
            </span>
            <span className="text-[11px] font-bold text-[#111111]">${vehicle.price.toFixed(2)}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function DetailPanel({ vehicle, favorite, onClose, onFavorite, onToggleAvailable, onDelete, onToast }) {
  if (!vehicle) return null;

  return (
    <aside className="fixed right-0 top-12 z-30 h-[calc(100vh-48px)] w-[360px] border-l border-[#dedede] bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.08)] max-[760px]:w-full">
      <div className="flex h-12 items-center justify-between border-b border-[#eeeeee] px-4">
        <div className="text-[14px] font-bold text-[#111111]">Vehicle detail</div>
        <button type="button" onClick={onClose} className="grid h-7 w-7 place-items-center rounded-full hover:bg-[#f5f5f5]">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="h-[calc(100%-48px)] overflow-y-auto p-4">
        <div className="flex h-32 items-center justify-center overflow-hidden bg-[#f7f7f7]">
          <img src={vehicle.image} alt={vehicle.name} className="max-h-28 w-full object-contain" />
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[20px] font-bold leading-tight text-[#111111]">{vehicle.name}</div>
            <div className="mt-1 text-[11px] font-medium text-[#777777]">{vehicle.spec}</div>
          </div>
          <button
            type="button"
            onClick={() => onFavorite(vehicle.id)}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#eeeeee]"
          >
            <Heart className={`h-4 w-4 ${favorite ? "fill-[#ff5576] text-[#ff5576]" : ""}`} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {[
            [Gauge, `${vehicle.utilization}%`, "Utilization"],
            [Users, `${vehicle.seats} seats`, "Capacity"],
            [Fuel, vehicle.fuelType, "Fuel"],
            [Calendar, vehicle.nextBooking, "Next booking"],
          ].map(([Icon, value, label]) => (
            <div key={label} className="border border-[#eeeeee] p-3">
              <Icon className="mb-2 h-4 w-4 text-[#444444]" />
              <div className="truncate text-[12px] font-bold text-[#111111]">{value}</div>
              <div className="mt-1 text-[10px] font-medium text-[#8a8a8a]">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 border border-[#eeeeee] p-3">
          <div className="text-[11px] font-bold uppercase text-[#999999]">Mock admin data</div>
          <dl className="mt-3 grid gap-2 text-[12px]">
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-[#777777]">Plate</dt>
              <dd className="font-bold text-[#111111]">{vehicle.plate}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-[#777777]">Location</dt>
              <dd className="font-bold text-[#111111]">{vehicle.location}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-[#777777]">Transmission</dt>
              <dd className="font-bold text-[#111111]">{vehicle.transmission}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-[#777777]">Hourly price</dt>
              <dd className="font-bold text-[#111111]">${vehicle.price.toFixed(2)}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-3 border border-[#eeeeee] p-3 text-[12px] font-medium text-[#555555]">
          {vehicle.note || "No open notes for this vehicle."}
        </div>

        <div className="mt-5 grid gap-2">
          <button
            type="button"
            onClick={() => onToggleAvailable(vehicle.id)}
            className="h-9 rounded-[5px] bg-[#111111] text-[12px] font-bold text-white"
          >
            Mark {vehicle.available ? "unavailable" : "available"}
          </button>
          <button
            type="button"
            onClick={() => onToast(`${vehicle.name} edit draft created`)}
            className="h-9 rounded-[5px] border border-[#dcdcdc] text-[12px] font-bold text-[#111111]"
          >
            Edit mock listing
          </button>
          <button
            type="button"
            onClick={() => onDelete(vehicle.id)}
            className="h-9 rounded-[5px] border border-[#f0c8c8] text-[12px] font-bold text-[#c33434]"
          >
            Delete from mock data
          </button>
        </div>
      </div>
    </aside>
  );
}

function UtilityPanel({ panel, onClose }) {
  if (!panel) return null;

  return (
    <div className="fixed right-4 top-16 z-40 w-[300px] border border-[#dedede] bg-white p-4 shadow-[0_18px_45px_rgba(0,0,0,0.14)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[14px] font-bold text-[#111111]">{panel.title}</div>
          <div className="mt-1 text-[11px] font-medium text-[#777777]">{panel.subtitle}</div>
        </div>
        <button type="button" onClick={onClose} className="grid h-6 w-6 place-items-center rounded-full hover:bg-[#f5f5f5]">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-4 grid gap-2">
        {panel.items.map((item) => (
          <div key={item} className="border border-[#eeeeee] px-3 py-2 text-[12px] font-medium text-[#333333]">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <button
      type="button"
      onClick={onClose}
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#111111] px-4 py-2 text-[12px] font-semibold text-white shadow-lg"
    >
      {message}
    </button>
  );
}

function sortVehicles(vehicles, sort) {
  const sorted = [...vehicles];
  if (sort === "Price low to high") sorted.sort((a, b) => a.price - b.price);
  if (sort === "Price high to low") sorted.sort((a, b) => b.price - a.price);
  if (sort === "Highest rated") sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  if (sort === "Most reviewed") sorted.sort((a, b) => b.reviews - a.reviews);
  if (sort === "Closest to me") sorted.sort((a, b) => a.distanceMeters - b.distanceMeters);
  return sorted;
}

function panelFor(label) {
  const panels = {
    Home: {
      title: "Fleet summary",
      subtitle: "Dummy admin snapshot",
      items: ["48 total listings", "41 available for hourly rental", "$30.20 average hourly rate"],
    },
    Notifications: {
      title: "Notifications",
      subtitle: "Mock alerts",
      items: ["Mazda 6 handoff starts in 28 minutes", "3 vehicles need cleaning review", "Tesla Model S battery check completed"],
    },
    Chat: {
      title: "Chat",
      subtitle: "Mock support inbox",
      items: ["Ari: Can I extend the Audi A4?", "Maya: Pickup moved to Terminal A", "Ops: Escalade inspection done"],
    },
    License: {
      title: "License checks",
      subtitle: "Mock verification queue",
      items: ["2 driver licenses pending", "14 verified this week", "1 expired permit reminder"],
    },
    Support: {
      title: "Support",
      subtitle: "Mock help queue",
      items: ["Roadside case #1932 open", "Airport pickup SLA: 96%", "Two refund requests waiting"],
    },
    Logout: {
      title: "Logout",
      subtitle: "Demo action only",
      items: ["This is mock data, so no session was closed."],
    },
    Pro: {
      title: "PRO features",
      subtitle: "Mock upgrade controls",
      items: ["Smart price optimizer", "Live utilization heatmap", "Automated damage reports"],
    },
    Account: {
      title: "Account",
      subtitle: "Bali Trans admin",
      items: ["Role: Fleet manager", "Workspace: San Francisco demo", "Data source: local mock records"],
    },
  };
  return panels[label];
}

export default function AdminVehicles() {
  useFullScreenRoot();

  const [vehicles, setVehicles] = useState(MOCK_VEHICLES);
  const [filters, setFilters] = useState(() => cloneFilters());
  const [favorites, setFavorites] = useState(
    () => new Set(MOCK_VEHICLES.filter((vehicle) => vehicle.favorite).map((vehicle) => vehicle.id)),
  );
  const [recentIds, setRecentIds] = useState(() => MOCK_VEHICLES.slice(0, 6).map((vehicle) => vehicle.id));
  const [activeNav, setActiveNav] = useState("Vehicles");
  const [sort, setSort] = useState("Closest to me");
  const [sortOpen, setSortOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [utilityPanel, setUtilityPanel] = useState(null);
  const [toast, setToast] = useState("");
  const [openSections, setOpenSections] = useState({
    price: true,
    brand: false,
    model: false,
    body: true,
    transmission: true,
    fuel: true,
  });

  const brands = useMemo(() => [...new Set(vehicles.map((vehicle) => vehicle.brand))].sort(), [vehicles]);
  const models = useMemo(() => [...new Set(vehicles.map((vehicle) => vehicle.modelYear))].sort(), [vehicles]);

  const filteredVehicles = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    const list = vehicles.filter((vehicle) => {
      const matchesWorkspace =
        activeNav === "Vehicles" ||
        activeNav === "Home" ||
        (activeNav === "Favourites" && favorites.has(vehicle.id)) ||
        (activeNav === "Recents" && recentIds.includes(vehicle.id)) ||
        (activeNav === "Notes" && vehicle.note);
      const matchesSearch =
        !search ||
        `${vehicle.name} ${vehicle.brand} ${vehicle.spec} ${vehicle.plate}`.toLowerCase().includes(search);
      const matchesRental =
        filters.rentalType === "Any" || vehicle.rentalTypes.includes(filters.rentalType);
      const matchesAvailability = !filters.availableOnly || vehicle.available;
      const matchesPrice = vehicle.price >= filters.minPrice && vehicle.price <= filters.maxPrice;
      const matchesBrand = filters.brands.size === 0 || filters.brands.has(vehicle.brand);
      const matchesModel = filters.models.size === 0 || filters.models.has(vehicle.modelYear);
      const matchesBody = filters.bodyTypes.size === 0 || filters.bodyTypes.has(vehicle.bodyType);
      const matchesTransmission =
        filters.transmission === "Any" || vehicle.transmission === filters.transmission;
      const matchesFuel = filters.fuelTypes.size === 0 || filters.fuelTypes.has(vehicle.fuelType);

      return (
        matchesWorkspace &&
        matchesSearch &&
        matchesRental &&
        matchesAvailability &&
        matchesPrice &&
        matchesBrand &&
        matchesModel &&
        matchesBody &&
        matchesTransmission &&
        matchesFuel
      );
    });

    return sortVehicles(list, sort);
  }, [activeNav, favorites, filters, recentIds, sort, vehicles]);

  const toggleFavorite = (id) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setRecentIds((current) => [vehicle.id, ...current.filter((id) => id !== vehicle.id)].slice(0, 10));
  };

  const toggleAvailability = (id) => {
    setVehicles((current) =>
      current.map((vehicle) =>
        vehicle.id === id ? { ...vehicle, available: !vehicle.available } : vehicle,
      ),
    );
    setSelectedVehicle((current) =>
      current && current.id === id ? { ...current, available: !current.available } : current,
    );
    setToast("Mock availability updated");
  };

  const deleteVehicle = (id) => {
    setVehicles((current) => current.filter((vehicle) => vehicle.id !== id));
    setFavorites((current) => {
      const next = new Set(current);
      next.delete(id);
      return next;
    });
    setRecentIds((current) => current.filter((recentId) => recentId !== id));
    setSelectedVehicle(null);
    setToast("Vehicle removed from mock inventory");
  };

  const handleNav = (label) => {
    setActiveNav(label);
    if (["Home", "Notifications", "Chat", "License", "Support", "Logout"].includes(label)) {
      setUtilityPanel(panelFor(label));
    }
  };

  const headline =
    activeNav === "Favourites"
      ? `${filteredVehicles.length} favourite vehicles`
      : activeNav === "Recents"
        ? `${filteredVehicles.length} recently viewed`
        : activeNav === "Notes"
          ? `${filteredVehicles.length} vehicles with notes`
          : `${filteredVehicles.length} vehicles to rent`;

  return (
    <div className="h-screen overflow-hidden bg-[#f3f4f4] text-[#111111] [color-scheme:light]">
      <Helmet>
        <title>Admin Vehicles | Bali Trans</title>
        <meta
          name="description"
          content="Admin vehicle inventory view for Bali Trans rentals."
        />
      </Helmet>

      <header className="flex h-12 items-center border-b border-[#e8e8e8] bg-white">
        <div className="flex h-full w-[112px] shrink-0 items-center border-r border-[#e8e8e8]">
          <AppLogo />
        </div>
        <div className="flex flex-1 items-center justify-between px-4">
          <div className="flex items-center gap-7 text-[12px] font-medium text-[#2d2d2d] max-[720px]:hidden">
            <span className="inline-flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              01:48 PM (UTC -7)
            </span>
            <span className="inline-flex items-center gap-2">
              <Navigation className="h-3.5 w-3.5" />
              San Francisco, US
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() => setUtilityPanel(panelFor("Pro"))}
              className="inline-flex h-7 items-center gap-1.5 rounded-[5px] bg-[#121212] px-3 text-[10px] font-bold text-white shadow-sm"
            >
              <Crown className="h-3 w-3 fill-white" />
              PRO features
            </button>
            <button
              type="button"
              onClick={() => setUtilityPanel(panelFor("Account"))}
              className="grid h-7 w-7 place-items-center rounded-full border border-[#c8c8c8] bg-[linear-gradient(135deg,#b28b67,#efe0c7)] text-[11px] font-black text-[#4f3725]"
            >
              BT
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-48px)] overflow-hidden">
        <aside className="flex w-[112px] shrink-0 flex-col border-r border-[#e8e8e8] bg-white py-4">
          <nav className="space-y-1">
            {NAV_TOP.map((item) => (
              <AdminNavItem
                key={item.label}
                {...item}
                active={activeNav === item.label}
                onClick={() => handleNav(item.label)}
              />
            ))}
          </nav>
          <nav className="mt-auto space-y-1">
            {NAV_BOTTOM.map((item) => (
              <AdminNavItem
                key={item.label}
                {...item}
                active={activeNav === item.label}
                onClick={() => handleNav(item.label)}
              />
            ))}
          </nav>
        </aside>

        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          brands={brands}
          models={models}
          openSections={openSections}
          onToggleSection={(key) => setOpenSections((current) => ({ ...current, [key]: !current[key] }))}
          resultCount={filteredVehicles.length}
        />

        <main className="min-w-0 flex-1 overflow-y-auto bg-[#f4f4f4]">
          <div className="flex h-14 items-center justify-between gap-3 px-4">
            <div className="truncate text-[22px] font-semibold leading-none text-[#151515]">
              {headline}
            </div>
            <div className="flex shrink-0 items-center gap-5 text-[11px] font-medium text-[#151515]">
              <SortMenu
                sort={sort}
                open={sortOpen}
                onToggle={() => setSortOpen((current) => !current)}
                onSelect={(option) => {
                  setSort(option);
                  setSortOpen(false);
                }}
              />
              <button
                type="button"
                onClick={() => setShowMap((current) => !current)}
                className="inline-flex items-center gap-1"
              >
                {showMap ? "Hide map" : "Show map"} <Map className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex px-3 pb-4">
            <div className="min-w-0 flex-1">
              {filteredVehicles.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[10px]">
                  {filteredVehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      favorite={favorites.has(vehicle.id)}
                      onToggleFavorite={toggleFavorite}
                      onSelect={selectVehicle}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid h-[420px] place-items-center border border-[#e6e6e6] bg-white text-center">
                  <div>
                    <div className="text-[18px] font-bold text-[#111111]">No vehicles match</div>
                    <button
                      type="button"
                      onClick={() => setFilters(cloneFilters())}
                      className="mt-3 h-8 rounded-[5px] border border-[#dcdcdc] px-4 text-[12px] font-bold text-[#111111]"
                    >
                      Reset filters
                    </button>
                  </div>
                </div>
              )}
            </div>
            {showMap && (
              <MapPanel
                vehicles={filteredVehicles}
                selectedId={selectedVehicle?.id}
                onSelect={selectVehicle}
              />
            )}
          </div>
        </main>
      </div>

      <button
        type="button"
        onClick={() => setOpenSections((current) => ({ ...current, body: true, fuel: true }))}
        className="fixed bottom-4 right-4 hidden rounded-full border border-[#dfdfdf] bg-white px-3 py-2 text-[11px] font-semibold text-[#202020] shadow-sm max-[920px]:block"
      >
        <SlidersHorizontal className="mr-1 inline h-3.5 w-3.5" />
        Filters
      </button>

      <DetailPanel
        vehicle={selectedVehicle}
        favorite={selectedVehicle ? favorites.has(selectedVehicle.id) : false}
        onClose={() => setSelectedVehicle(null)}
        onFavorite={toggleFavorite}
        onToggleAvailable={toggleAvailability}
        onDelete={deleteVehicle}
        onToast={setToast}
      />
      <UtilityPanel panel={utilityPanel} onClose={() => setUtilityPanel(null)} />
      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}
