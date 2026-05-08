import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const navLinks = ["VEHICLES", "DEALS", "DESTINATIONS", "SERVICES", "REVIEWS", "ABOUT", "CONTACT"];

function useFullScreenRoot() {
  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;
    const prev = {
      width: root.style.width,
      maxWidth: root.style.maxWidth,
      borderInline: root.style.borderInline,
      textAlign: root.style.textAlign,
    };
    root.style.width = "100%";
    root.style.maxWidth = "100%";
    root.style.borderInline = "none";
    root.style.textAlign = "left";
    return () => {
      root.style.width = prev.width;
      root.style.maxWidth = prev.maxWidth;
      root.style.borderInline = prev.borderInline;
      root.style.textAlign = prev.textAlign;
    };
  }, []);
}

const RULE = "═════════════════════════════════════════════════════════════════════════════";
const DIV_DASH = "─────────────────────────────────────────────────────────────────────────────";
const DIV_PLUS = "+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +";

const Section = ({ id, num, label, title, children, inverted = false }) => (
  <section
    id={id}
    className={`border-t-[3px] border-black ${inverted ? "bg-black text-white" : "bg-white text-black"}`}
  >
    {/* Section header bar */}
    <div className={`border-b-[3px] ${inverted ? "border-white" : "border-black"} px-4 sm:px-6 lg:px-8 py-3`}>
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <span>§ {num}</span>
          <span>/</span>
          <span>{label}</span>
        </div>
        <div className="opacity-60">SCROLL ↓</div>
      </div>
    </div>

    <div className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="max-w-[1600px] mx-auto">
        {title && (
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight mb-12 lg:mb-16">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  </section>
);

export default function V10() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useFullScreenRoot();

  return (
    <>
      <Helmet>
        <title>AUTO ULTIMATE — RAW BALI RENTAL</title>
        <meta name="description" content="Bali car rental. No fluff. No bullshit. Just cars and roads." />
      </Helmet>

      <div className="min-h-screen bg-white text-black antialiased font-sans">
        {/* Top status / weather bar */}
        <div className="bg-black text-white border-b-[3px] border-black px-4 sm:px-6 lg:px-8 py-2">
          <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-widest">
            <div className="flex items-center gap-4">
              <span className="bg-[#ff0033] text-white px-2 py-0.5">LIVE</span>
              <span>BALI / DENPASAR / 28°C / SUNNY</span>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline">100+ UNITS · 12 LOCATIONS</span>
            </div>
            <div className="hidden lg:flex items-center gap-3 opacity-70">
              <span>EST. 2013</span>
              <span>·</span>
              <span>VERSION 10.0</span>
              <span>·</span>
              <span>NO COOKIES</span>
            </div>
          </div>
        </div>

        {/* ==================== 1. NAVBAR — raw brutal ==================== */}
        <header className="sticky top-0 z-50 bg-white border-b-[3px] border-black">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-baseline gap-3">
                <a href="/" className="font-serif text-2xl lg:text-3xl font-black tracking-tight underline decoration-2 underline-offset-4 hover:text-[#ff0033] hover:decoration-[#ff0033]">
                  AUTO ULTIMATE
                </a>
                <span className="hidden md:inline font-mono text-[11px] uppercase tracking-widest">[BALI / RENTAL]</span>
              </div>

              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((l, i) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase()}`}
                    className="font-mono text-[11px] tracking-[0.2em] uppercase px-3 py-1.5 border-2 border-transparent hover:border-black hover:bg-[#ff0033] hover:text-white transition-colors"
                  >
                    [{String(i + 1).padStart(2, "0")}] {l}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <a href="#signin" className="hidden sm:inline-block font-mono text-[11px] tracking-[0.2em] uppercase underline decoration-2 underline-offset-4 hover:text-[#ff0033] px-2">
                  SIGN&nbsp;IN
                </a>
                <a href="#book" className="hidden sm:inline-flex items-center gap-1.5 px-5 py-3 bg-black text-white font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-[#ff0033] transition-colors border-2 border-black">
                  → BOOK NOW
                </a>
                <button className="lg:hidden p-2 border-2 border-black" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
                  <span className="font-mono text-xs">{mobileOpen ? "[X]" : "[≡]"}</span>
                </button>
              </div>
            </div>
          </div>
          {mobileOpen && (
            <div className="lg:hidden border-t-[3px] border-black bg-white px-4 py-5 space-y-3">
              {navLinks.map((l, i) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block font-mono text-sm tracking-[0.2em] uppercase border-b-2 border-black pb-2" onClick={() => setMobileOpen(false)}>
                  [{String(i + 1).padStart(2, "0")}] {l}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <a href="#signin" className="font-mono text-sm tracking-[0.2em] uppercase underline">SIGN IN →</a>
                <a href="#book" className="inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-black text-white font-mono text-sm tracking-[0.2em] uppercase">
                  → BOOK NOW
                </a>
              </div>
            </div>
          )}
        </header>

        {/* ==================== 2. HERO — raw asymmetric ==================== */}
        <section className="relative border-b-[3px] border-black overflow-hidden">
          <div className="max-w-[1600px] mx-auto">
            {/* ASCII rule */}
            <div className="font-mono text-[10px] leading-[10px] tracking-tighter overflow-hidden border-b-2 border-black px-4 sm:px-6 lg:px-8 py-1 truncate">
              {RULE}
            </div>

            {/* Hero grid */}
            <div className="grid grid-cols-12 border-b-[3px] border-black">
              {/* Left meta column */}
              <div className="col-span-12 lg:col-span-3 border-b-2 lg:border-b-0 lg:border-r-[3px] border-black p-6 lg:p-8 font-mono text-[11px] uppercase tracking-widest">
                <div className="mb-8">
                  <div className="opacity-60">FILE_NAME</div>
                  <div className="text-base font-black mt-1">AUTO_ULTIMATE.HTML</div>
                </div>
                <div className="mb-8">
                  <div className="opacity-60">TYPE</div>
                  <div className="text-base font-black mt-1">CAR_RENTAL</div>
                </div>
                <div className="mb-8">
                  <div className="opacity-60">LOCATION</div>
                  <div className="text-base font-black mt-1">BALI / ID</div>
                </div>
                <div className="mb-8">
                  <div className="opacity-60">YEARS_OPERATING</div>
                  <div className="text-base font-black mt-1">12+</div>
                </div>
                <div>
                  <div className="opacity-60">STATUS</div>
                  <div className="mt-1 inline-block bg-[#ff0033] text-white text-base font-black px-2 py-0.5">● OPERATIONAL</div>
                </div>
              </div>

              {/* Center massive headline */}
              <div className="col-span-12 lg:col-span-9 p-6 lg:p-12 relative">
                <div className="font-mono text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                  <span className="bg-black text-white px-2 py-1">PRIMARY HEADLINE</span>
                  <span className="opacity-60">/ RELIABLE / FLEXIBLE / ISLAND-WIDE</span>
                </div>
                <h1 className="font-serif font-black uppercase text-[48px] sm:text-[72px] lg:text-[110px] xl:text-[180px] leading-[0.85] tracking-[-0.04em]">
                  DRIVE<br />
                  BALI.<br />
                  <span className="bg-[#ff0033] text-white px-2 inline-block">MAKE IT</span><br />
                  UNFORGET-<br />
                  <span className="underline decoration-[8px] lg:decoration-[12px] underline-offset-[12px] lg:underline-offset-[20px]">TABLE.</span>
                </h1>
              </div>
            </div>

            {/* Hero photo + sidebar */}
            <div className="grid grid-cols-12 border-b-[3px] border-black">
              <div className="col-span-12 lg:col-span-8 border-b-2 lg:border-b-0 lg:border-r-[3px] border-black">
                <div className="aspect-[16/8] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80"
                    alt="Bali"
                    className="w-full h-full object-cover grayscale contrast-125"
                  />
                </div>
                <div className="border-t-2 border-black p-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-widest">
                  <div>FIG_01 / BALI / SUBAK / RICE TERRACE / MAY 2026</div>
                  <div>PHOTO BY UNSPLASH ©</div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 p-6 lg:p-8 flex flex-col">
                <div className="font-mono text-[11px] uppercase tracking-widest opacity-60 mb-3">DESCRIPTION</div>
                <p className="font-serif text-xl lg:text-2xl leading-snug mb-8">
                  We rent cars in Bali. We deliver them to your door. We don't waste your time.
                  Our prices are fair. Our cars are clean. Our cancellation is free.
                </p>

                <div className="font-mono text-[11px] uppercase tracking-widest opacity-60 mb-3">PRIMARY ACTIONS</div>
                <div className="flex flex-col gap-2 mb-8">
                  <a href="#book" className="inline-flex items-center justify-between px-5 py-4 bg-black text-white font-mono text-sm uppercase tracking-widest hover:bg-[#ff0033] transition-colors border-2 border-black">
                    [01] BOOK A CAR <span>→</span>
                  </a>
                  <a href="#vehicles" className="inline-flex items-center justify-between px-5 py-4 bg-white text-black font-mono text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors border-2 border-black">
                    [02] BROWSE FLEET <span>→</span>
                  </a>
                </div>

                <div className="mt-auto font-mono text-[10px] uppercase tracking-widest opacity-60 truncate">{DIV_DASH}</div>
                <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
                  <span>RATING</span>
                  <span className="font-black">4.9 / 5.0 ★★★★★</span>
                </div>
                <div className="mt-1 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
                  <span>REVIEWS</span>
                  <span className="font-black">2,000+</span>
                </div>
                <div className="mt-1 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
                  <span>CUSTOMERS</span>
                  <span className="font-black">10,000+</span>
                </div>
              </div>
            </div>

            {/* Feature strip — 4 cells */}
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {[
                { num: "01", label: "NO HIDDEN FEES", desc: "ALL-IN PRICING" },
                { num: "02", label: "FREE DELIVERY", desc: "ANYWHERE IN BALI" },
                { num: "03", label: "24/7 SUPPORT", desc: "REAL HUMANS" },
                { num: "04", label: "FULL INSURANCE", desc: "ZERO STRESS" },
              ].map((f, i) => (
                <div key={f.num} className={`p-6 lg:p-8 ${i < 3 ? "border-r-2 border-black" : ""} ${i < 2 ? "border-b-2 lg:border-b-0 border-black" : ""}`}>
                  <div className="font-serif text-7xl lg:text-8xl font-black leading-none">{f.num}</div>
                  <div className="font-mono text-[11px] uppercase tracking-widest mt-3 font-black">{f.label}</div>
                  <div className="font-mono text-[11px] uppercase tracking-widest opacity-60 mt-1">/ {f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 3. BOOKING — raw form ==================== */}
        <Section id="book" num="01" label="BOOKING / RESERVATION FORM" title="RESERVE.">
          <div className="grid grid-cols-12 gap-0 border-[3px] border-black">
            {[
              { label: "PICKUP LOCATION", type: "select", options: ["NGURAH RAI AIRPORT", "UBUD", "SEMINYAK", "KUTA", "NUSA DUA"] },
              { label: "PICK-UP DATE/TIME", type: "datetime-local", value: "2026-05-10T10:00" },
              { label: "RETURN DATE/TIME", type: "datetime-local", value: "2026-05-15T10:00" },
              { label: "VEHICLE TYPE", type: "select", options: ["ALL", "SUV", "MPV", "SEDAN", "CONVERTIBLE"] },
            ].map((f, i) => (
              <div key={f.label} className={`col-span-12 sm:col-span-6 lg:col-span-3 p-5 ${i < 3 ? "border-r-0 lg:border-r-2 border-black" : ""} ${i < 2 ? "border-b-2 sm:border-b-2 lg:border-b-0 border-black" : "border-b-2 sm:border-b-0 border-black"}`}>
                <label className="block font-mono text-[10px] uppercase tracking-[0.2em] mb-2 font-black">[{String(i + 1).padStart(2, "0")}] {f.label}</label>
                {f.type === "select" ? (
                  <select className="w-full bg-transparent text-base font-black outline-none cursor-pointer border-b-2 border-black pb-2">
                    {f.options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={f.type} defaultValue={f.value} className="w-full bg-transparent text-base font-black outline-none border-b-2 border-black pb-2" />
                )}
              </div>
            ))}
          </div>

          {/* Submit row */}
          <div className="border-x-[3px] border-b-[3px] border-black bg-black text-white p-5 flex flex-wrap items-center justify-between gap-3">
            <div className="font-mono text-xs uppercase tracking-widest">
              FORM_STATUS: <span className="text-[#ff0033]">READY</span> / SUBMIT WITH BUTTON →
            </div>
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-[#ff0033] text-white font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors border-2 border-[#ff0033] hover:border-white">
              ► SEARCH VEHICLES
            </button>
          </div>

          {/* Trust strip */}
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 border-2 border-black">
            {[
              { t: "FREE CANCELLATION" },
              { t: "UNLIMITED MILEAGE" },
              { t: "FULL INSURANCE" },
              { t: "FLEXIBLE RENTALS" },
            ].map(({ t }, i) => (
              <div key={t} className={`p-4 font-mono text-[11px] uppercase tracking-widest ${i < 3 ? "border-r-0 lg:border-r-2 border-black" : ""} ${i < 2 ? "border-b-2 lg:border-b-0 border-black" : ""}`}>
                ✓ {t}
              </div>
            ))}
          </div>
        </Section>

        {/* ==================== 4. SPECIAL OFFERS — raw deal table ==================== */}
        <Section id="deals" num="02" label="DEALS / PROMOTIONS / 04 ACTIVE">
          <div className="grid grid-cols-12 gap-8 mb-12 items-end">
            <h2 className="col-span-12 lg:col-span-7 font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight uppercase">
              DEALS.<br />
              <span className="bg-[#ff0033] text-white px-2">CURRENTLY ACTIVE.</span>
            </h2>
            <div className="col-span-12 lg:col-span-5">
              <p className="font-serif text-lg leading-snug mb-4">
                Four promotions running this season. Stack them with annual rates. No code needed.
              </p>
              <a href="#all-deals" className="inline-block font-mono text-sm uppercase tracking-widest underline decoration-2 underline-offset-4 hover:text-[#ff0033]">
                → VIEW ALL DEALS
              </a>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-0 border-[3px] border-black">
            {[
              { num: "I", title: "EARLY BIRD SAVER", desc: "Book 30 days ahead.", off: "15", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db9?auto=format&fit=crop&w=400&q=80" },
              { num: "II", title: "WEEKEND ESCAPE", desc: "Friday → Monday.", off: "10", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80" },
              { num: "III", title: "LONG STAY VALUE", desc: "Seven days or more.", off: "20", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80" },
              { num: "IV", title: "FAMILY ADVENTURE", desc: "Spacious & all ages.", off: "12", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80" },
            ].map((deal, i) => (
              <article
                key={deal.title}
                className={`col-span-12 sm:col-span-6 lg:col-span-3 group cursor-pointer hover:bg-black hover:text-white transition-colors ${i < 3 ? "border-b-2 sm:border-b-0 lg:border-b-0 sm:border-r-2 lg:border-r-2 border-black" : ""} ${i === 0 ? "sm:border-b-2 lg:border-b-0" : ""} ${i === 1 ? "sm:border-r-0 lg:border-r-2" : ""} ${i === 2 ? "sm:border-b-0" : ""}`}
              >
                <div className="aspect-[4/3] overflow-hidden border-b-2 border-black grayscale contrast-125 group-hover:grayscale-0 transition-all">
                  <img src={deal.img} alt={deal.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-serif text-2xl font-black">N° {deal.num}</span>
                    <span className="font-serif text-3xl font-black">-{deal.off}%</span>
                  </div>
                  <h3 className="font-serif text-xl font-black uppercase mb-2">{deal.title}</h3>
                  <p className="font-mono text-xs uppercase tracking-widest opacity-70">{deal.desc}</p>
                  <div className="mt-5 pt-3 border-t-2 border-current font-mono text-[11px] uppercase tracking-widest flex items-center justify-between">
                    <span>RESERVE</span>
                    <span>→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* ==================== 5. FEATURED FLEET — raw table ==================== */}
        <Section id="vehicles" num="03" label="FLEET / 03 FEATURED VEHICLES" inverted={true}>
          <div className="grid grid-cols-12 gap-8 mb-12 items-end">
            <h2 className="col-span-12 lg:col-span-7 font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight uppercase">
              THE FLEET.<br />
              <span className="bg-[#ff0033] text-white px-2">100+ UNITS.</span>
            </h2>
            <div className="col-span-12 lg:col-span-5">
              <p className="font-serif text-lg leading-snug mb-4">
                Every car is inspected before delivery. We don't rent things we wouldn't drive ourselves.
              </p>
              <a href="#all-vehicles" className="inline-block font-mono text-sm uppercase tracking-widest underline decoration-2 underline-offset-4 hover:text-[#ff0033]">
                → VIEW ALL 100+ VEHICLES
              </a>
            </div>
          </div>

          {/* Table-like fleet rows */}
          <div className="border-2 border-white">
            {/* Header row */}
            <div className="grid grid-cols-12 gap-0 border-b-2 border-white bg-white text-black font-mono text-[10px] uppercase tracking-widest font-black">
              <div className="col-span-1 p-3 border-r-2 border-black">№</div>
              <div className="col-span-3 p-3 border-r-2 border-black">PHOTO</div>
              <div className="col-span-3 p-3 border-r-2 border-black">NAME / TAG</div>
              <div className="col-span-3 p-3 border-r-2 border-black">SPECS</div>
              <div className="col-span-2 p-3">RATE / ACTION</div>
            </div>

            {[
              { name: "TOYOTA AVANZA", id: "AVZ-001", tag: "FAMILY MPV", seats: 7, trans: "AUTO", cc: "1.3L", price: "450", img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=600&q=80" },
              { name: "TOYOTA RUSH", id: "RSH-002", tag: "ADVENTURE SUV", seats: 7, trans: "AUTO", cc: "1.5L", price: "550", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80" },
              { name: "HONDA HR-V", id: "HRV-003", tag: "PREMIUM SUV", seats: 5, trans: "AUTO", cc: "1.8L", price: "600", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" },
            ].map((car, idx) => (
              <div key={car.id} className={`grid grid-cols-12 gap-0 ${idx < 2 ? "border-b-2 border-white" : ""} hover:bg-[#ff0033] transition-colors`}>
                <div className="col-span-1 p-4 border-r-2 border-white font-serif text-3xl lg:text-4xl font-black">0{idx + 1}</div>
                <div className="col-span-11 sm:col-span-3 p-2 border-r-0 sm:border-r-2 border-white">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={car.img} alt={car.name} className="w-full h-full object-cover grayscale contrast-125" />
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-3 p-4 border-r-0 sm:border-r-2 border-white">
                  <div className="font-mono text-[10px] uppercase tracking-widest opacity-60">#{car.id}</div>
                  <div className="font-serif text-2xl lg:text-3xl font-black mt-1 leading-tight">{car.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest mt-2 inline-block bg-white text-black px-2 py-0.5">{car.tag}</div>
                </div>
                <div className="col-span-12 sm:col-span-3 p-4 border-r-0 sm:border-r-2 border-white space-y-1 font-mono text-xs uppercase tracking-widest">
                  <div>SEATS: <span className="font-black">{car.seats}</span></div>
                  <div>TRANS: <span className="font-black">{car.trans}</span></div>
                  <div>ENGINE: <span className="font-black">{car.cc}</span></div>
                  <div>FUEL: <span className="font-black">PETROL</span></div>
                </div>
                <div className="col-span-12 sm:col-span-2 p-4 flex flex-col justify-between gap-2">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest opacity-60">RATE / DAY</div>
                    <div className="font-serif text-2xl lg:text-3xl font-black">RP {car.price}K</div>
                  </div>
                  <button className="inline-flex items-center justify-between px-3 py-2 bg-white text-black font-mono text-[11px] uppercase tracking-widest hover:bg-black hover:text-white border-2 border-white transition-colors">
                    BOOK <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Trust */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 border-2 border-white">
            {[
              { t: "FLEET INSPECTED", n: "5/5" },
              { t: "PRICING TRANSPARENT", n: "100%" },
              { t: "ISLAND COVERAGE", n: "98%" },
              { t: "AVG. PICKUP TIME", n: "<5MIN" },
            ].map((s, i) => (
              <div key={s.t} className={`p-5 ${i < 3 ? "border-r-0 lg:border-r-2 border-white" : ""} ${i < 2 ? "border-b-2 lg:border-b-0 border-white" : ""}`}>
                <div className="font-serif text-3xl lg:text-4xl font-black">{s.n}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest opacity-60 mt-1">{s.t}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ==================== 6. DESTINATIONS — raw map list ==================== */}
        <Section id="destinations" num="04" label="DESTINATIONS / 06 ROUTES">
          <div className="grid grid-cols-12 gap-8 mb-12 items-end">
            <h2 className="col-span-12 lg:col-span-7 font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight uppercase">
              ROUTES.<br />
              <span className="bg-[#ff0033] text-white px-2">FROM AIRPORT.</span>
            </h2>
            <div className="col-span-12 lg:col-span-5">
              <p className="font-serif text-lg leading-snug mb-4">
                Six routes, distance and travel time included. Real numbers, not marketing.
              </p>
              <a href="#all-destinations" className="inline-block font-mono text-sm uppercase tracking-widest underline decoration-2 underline-offset-4 hover:text-[#ff0033]">
                → VIEW ALL DESTINATIONS
              </a>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-0 border-[3px] border-black">
            {[
              { name: "UBUD", desc: "RICE TERRACES & ART", km: "37 KM", time: "1H 15M", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80" },
              { name: "ULUWATU", desc: "CLIFF TEMPLE & SURF", km: "24 KM", time: "45M", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=700&q=80" },
              { name: "SEMINYAK", desc: "BEACH CLUBS / SUNSET", km: "12 KM", time: "30M", img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=700&q=80" },
              { name: "NUSA PENIDA", desc: "CRYSTAL WATERS", km: "85 KM", time: "3H", img: "https://images.unsplash.com/photo-1589817864531-ef00b149c23a?auto=format&fit=crop&w=700&q=80" },
              { name: "MUNDUK", desc: "WATERFALLS / COFFEE", km: "78 KM", time: "2H 20M", img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=700&q=80" },
              { name: "AMED", desc: "BLACK SAND / DIVING", km: "85 KM", time: "2H 30M", img: "https://images.unsplash.com/photo-1531259736519-9a17795bbcce?auto=format&fit=crop&w=700&q=80" },
            ].map((d, i) => (
              <div
                key={d.name}
                className={`col-span-12 sm:col-span-6 lg:col-span-4 group cursor-pointer hover:bg-black hover:text-white transition-colors ${i % 3 < 2 ? "lg:border-r-2 border-black" : ""} ${i % 2 === 0 ? "sm:border-r-2 lg:border-r-2" : "sm:border-r-0"} ${i < 3 ? "lg:border-b-2 border-black" : ""} ${i < 4 ? "border-b-2 sm:border-b-2 border-black" : ""}`}
              >
                <div className="aspect-[16/10] overflow-hidden border-b-2 border-current grayscale contrast-125 group-hover:grayscale-0 transition-all">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="font-mono text-[11px] uppercase tracking-widest opacity-60 mb-2">[{String(i + 1).padStart(2, "0")}] / FROM AIRPORT</div>
                  <h3 className="font-serif text-3xl font-black uppercase mb-2">{d.name}</h3>
                  <p className="font-mono text-[11px] uppercase tracking-widest mb-4 opacity-70">{d.desc}</p>
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest border-t-2 border-current pt-3">
                    <span>{d.km}</span>
                    <span>{d.time}</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ==================== 7. TESTIMONIALS — raw guestbook ==================== */}
        <Section id="reviews" num="05" label="REVIEWS / GUESTBOOK / 2,000+ ENTRIES" inverted={true}>
          <div className="grid grid-cols-12 gap-8 mb-12 items-end">
            <h2 className="col-span-12 lg:col-span-7 font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight uppercase">
              4.9 / 5.0<br />
              <span className="bg-[#ff0033] text-white px-2">★★★★★</span>
            </h2>
            <div className="col-span-12 lg:col-span-5 font-mono text-xs uppercase tracking-widest space-y-2">
              <div className="flex justify-between border-b border-white/30 pb-2"><span>TOTAL REVIEWS</span><span className="font-black">2,031</span></div>
              <div className="flex justify-between border-b border-white/30 pb-2"><span>5-STAR RATIO</span><span className="font-black">94.2%</span></div>
              <div className="flex justify-between border-b border-white/30 pb-2"><span>AVG. RESPONSE</span><span className="font-black">UNDER 1HR</span></div>
              <div className="flex justify-between border-b border-white/30 pb-2"><span>VERIFIED</span><span className="font-black">100%</span></div>
            </div>
          </div>

          {/* Featured review */}
          <div className="border-2 border-white p-6 lg:p-10 mb-6">
            <div className="font-mono text-[10px] uppercase tracking-widest mb-6 flex flex-wrap items-center gap-2">
              <span className="bg-[#ff0033] text-white px-2 py-0.5">FEATURED</span>
              <span>★★★★★</span>
              <span>·</span>
              <span>VERIFIED CUSTOMER</span>
              <span>·</span>
              <span>MAY 2026</span>
            </div>
            <blockquote className="font-serif text-3xl lg:text-4xl xl:text-5xl font-black uppercase leading-[1.05] tracking-tight mb-8">
              "WE WERE WELCOMED LIKE FAMILY. THE CAR WAS IMMACULATE.<br />
              THIS IS HOW CAR RENTAL SHOULD WORK."
            </blockquote>
            <div className="font-mono text-xs uppercase tracking-widest border-t border-white/30 pt-4 flex flex-wrap gap-3">
              <span>— SARAH MITCHELL</span>
              <span>·</span>
              <span>SYDNEY / AUSTRALIA</span>
              <span>·</span>
              <span>BOOKED: TOYOTA RUSH</span>
              <span>·</span>
              <span>REVIEW_ID: #001834</span>
            </div>
          </div>

          {/* Reviews grid */}
          <div className="grid grid-cols-12 gap-0 border-2 border-white">
            {[
              { text: "Best car rental in Bali. Transparent pricing, no hidden fees.", name: "MARCUS CHEN", country: "SG", car: "TOYOTA AVANZA", date: "APR 2026" },
              { text: "Free delivery to Ubud was huge. Spotless car.", name: "EMMA LARSSON", country: "SE", car: "HONDA HR-V", date: "APR 2026" },
              { text: "Super professional. Delivered to villa exactly on time.", name: "JAMES WILSON", country: "UK", car: "TOYOTA RUSH", date: "MAR 2026" },
              { text: "Real WhatsApp support saved us twice. Recommended.", name: "AISHA RAHMAN", country: "MY", car: "TOYOTA AVANZA", date: "MAR 2026" },
            ].map((r, i) => (
              <div key={r.name} className={`col-span-12 sm:col-span-6 lg:col-span-3 p-5 ${i < 3 ? "border-r-0 lg:border-r-2 border-white" : ""} ${i % 2 === 0 ? "sm:border-r-2 lg:border-r-2" : ""} ${i < 2 ? "border-b-2 lg:border-b-0 border-white" : ""}`}>
                <div className="font-mono text-[10px] uppercase tracking-widest mb-3">★★★★★ / VERIFIED</div>
                <p className="font-serif text-lg leading-snug mb-5">"{r.text}"</p>
                <div className="font-mono text-[10px] uppercase tracking-widest border-t border-white/30 pt-3">
                  <div className="font-black">— {r.name}</div>
                  <div className="opacity-60">{r.country} · {r.car}</div>
                  <div className="opacity-60">{r.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ==================== 8. CTA — raw block statement ==================== */}
        <section className="border-t-[3px] border-black bg-[#ff0033] text-white">
          <div className="border-b-[3px] border-black px-4 sm:px-6 lg:px-8 py-3">
            <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-widest">
              <div className="flex items-center gap-4">
                <span>§ 06</span><span>/</span><span>FINAL / CTA / BOOK NOW</span>
              </div>
              <div className="opacity-80">END OF PAGE ↓</div>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="max-w-[1600px] mx-auto">
              <div className="grid grid-cols-12 gap-8 items-end">
                <div className="col-span-12 lg:col-span-8">
                  <h2 className="font-serif text-6xl sm:text-7xl lg:text-8xl xl:text-[160px] font-black leading-[0.85] tracking-[-0.04em] uppercase">
                    READY?<br />
                    <span className="bg-white text-[#ff0033] px-3 inline-block">BOOK NOW.</span>
                  </h2>
                  <p className="font-serif text-2xl lg:text-3xl mt-8 max-w-2xl">
                    Stop reading. Start driving. Confirmation in under 30 seconds.
                  </p>
                </div>
                <div className="col-span-12 lg:col-span-4 space-y-2">
                  <a href="#book" className="flex items-center justify-between px-6 py-5 bg-black text-white font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors border-2 border-black">
                    <span>[01] BOOK NOW</span> <span>→</span>
                  </a>
                  <a href="#vehicles" className="flex items-center justify-between px-6 py-5 bg-white text-black font-mono text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors border-2 border-white">
                    <span>[02] VIEW FLEET</span> <span>→</span>
                  </a>
                  <a href={`tel:+6281234567890`} className="flex items-center justify-between px-6 py-5 bg-transparent text-white font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-[#ff0033] transition-colors border-2 border-white">
                    <span>[03] CALL US</span> <span>→</span>
                  </a>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t-2 border-white grid grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-white">
                {[
                  { t: "BEST PRICE GUARANTEE", desc: "/ MATCH ANY COMPETITOR" },
                  { t: "FREE DELIVERY", desc: "/ ANYWHERE IN BALI" },
                  { t: "24/7 SUPPORT", desc: "/ REAL HUMANS" },
                ].map((f, i) => (
                  <div key={f.t} className={`p-5 ${i < 2 ? "border-r-0 lg:border-r-2 border-white" : ""} ${i < 1 ? "border-b-2 lg:border-b-0 border-white" : ""} ${i === 1 ? "border-b-2 lg:border-b-0 border-white" : ""}`}>
                    <div className="font-serif text-2xl lg:text-3xl font-black uppercase">{f.t}</div>
                    <div className="font-mono text-[11px] uppercase tracking-widest opacity-80 mt-1">{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 9. FOOTER — raw colophon ==================== */}
        <footer className="bg-black text-white border-t-[3px] border-black">
          <div className="border-b-[3px] border-white px-4 sm:px-6 lg:px-8 py-3">
            <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-widest">
              <span>§ 07 / FOOTER / SITE INDEX</span>
              <span className="opacity-60 truncate">{DIV_PLUS}</span>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-[1600px] mx-auto">
              <div className="grid grid-cols-12 gap-8 pb-12 border-b-2 border-white">
                <div className="col-span-12 lg:col-span-4">
                  <div className="font-serif text-5xl lg:text-6xl font-black uppercase leading-none">AUTO ULTIMATE</div>
                  <div className="font-mono text-xs uppercase tracking-widest opacity-60 mt-2">/ BALI · CAR RENTAL · v.10</div>

                  <p className="font-serif text-lg mt-6 leading-snug max-w-sm">
                    A car rental company in Bali. Operating since 2013. No fluff.
                  </p>

                  <div className="mt-6 font-mono text-[11px] uppercase tracking-widest space-y-1.5">
                    <div className="flex"><span className="w-24 opacity-60">PHONE:</span><span><a href="tel:+6281234567890" className="underline">+62 812 3456 7890</a></span></div>
                    <div className="flex"><span className="w-24 opacity-60">EMAIL:</span><span><a href="mailto:hello@autoultimate.id" className="underline">hello@autoultimate.id</a></span></div>
                    <div className="flex"><span className="w-24 opacity-60">ADDRESS:</span><span>JL. NGURAH RAI 88, BALI, ID</span></div>
                    <div className="flex"><span className="w-24 opacity-60">HOURS:</span><span>24 / 7 / 365</span></div>
                  </div>
                </div>

                {[
                  { head: "[A] COMPANY", items: ["About us", "Careers", "Press", "Story"] },
                  { head: "[B] SERVICES", items: ["Car rental", "Chauffeur", "Airport", "Long-term"] },
                  { head: "[C] LEGAL", items: ["Terms", "Privacy", "Cookies", "Refund policy"] },
                  { head: "[D] CONNECT", items: ["Whatsapp", "Instagram", "Email list", "RSS feed"] },
                ].map((col) => (
                  <div key={col.head} className="col-span-6 lg:col-span-2">
                    <h4 className="font-mono text-[11px] uppercase tracking-widest mb-4 underline decoration-2 underline-offset-4">{col.head}</h4>
                    <ul className="space-y-2">
                      {col.items.map((i) => (
                        <li key={i}>
                          <a href="#" className="font-serif text-base hover:text-[#ff0033] hover:underline">→ {i}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Newsletter row */}
              <div className="grid grid-cols-12 gap-8 py-8 border-b-2 border-white items-center">
                <div className="col-span-12 lg:col-span-4">
                  <div className="font-mono text-[11px] uppercase tracking-widest mb-2 opacity-60">[E] NEWSLETTER</div>
                  <div className="font-serif text-2xl">Monthly note. No spam.</div>
                </div>
                <div className="col-span-12 lg:col-span-8 flex flex-col sm:flex-row gap-2">
                  <input type="email" placeholder="YOUR@EMAIL.COM" className="flex-1 bg-transparent border-2 border-white px-4 py-3 font-mono text-sm uppercase tracking-widest outline-none focus:border-[#ff0033] placeholder:text-white/40" />
                  <button className="px-6 py-3 bg-[#ff0033] text-white font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors border-2 border-[#ff0033] hover:border-white">
                    ► SUBSCRIBE
                  </button>
                </div>
              </div>

              {/* ASCII rule */}
              <div className="font-mono text-[10px] leading-[10px] tracking-tighter overflow-hidden py-4 truncate opacity-40">
                {RULE}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-widest">
                <span>© {new Date().getFullYear()} AUTO ULTIMATE / ALL RIGHTS RESERVED.</span>
                <span className="opacity-60">BUILT IN BALI / NO COOKIES / NO TRACKING / RAW HTML</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
