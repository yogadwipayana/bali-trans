import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import {
  formatDisplay,
  pad2,
  parseISOLocal,
  sameDay,
  startOfDay,
  toISOLocal,
} from "@/utils/date";

// Custom date + time picker that fully replaces <input type="datetime-local">.
// Renders a styled calendar grid, prev/next month nav, and zero-padded HH/MM
// number inputs — all keyboard-friendly and consistent with the rest of the form.
export function BookingDateTime({ id, label, icon: Icon, value, onChange, min }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const current = parseISOLocal(value);
  const minDate = min ? parseISOLocal(min) : null;

  const [view, setView] = useState({
    y: current.getFullYear(),
    m: current.getMonth(),
  });

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const openMenu = () => {
    setView({ y: current.getFullYear(), m: current.getMonth() });
    setOpen(true);
  };
  const toggleMenu = () => (open ? setOpen(false) : openMenu());

  const setDay = (d) => {
    const next = new Date(view.y, view.m, d, current.getHours(), current.getMinutes());
    if (minDate && next < startOfDay(minDate)) return;
    onChange(toISOLocal(next));
  };

  const setHour = (h) => {
    const next = new Date(current);
    next.setHours(Math.max(0, Math.min(23, Number.isFinite(h) ? h : 0)));
    onChange(toISOLocal(next));
  };

  const setMinute = (mi) => {
    const next = new Date(current);
    next.setMinutes(Math.max(0, Math.min(59, Number.isFinite(mi) ? mi : 0)));
    onChange(toISOLocal(next));
  };

  // Build the month grid (Monday-first, 6×7 max).
  const first = new Date(view.y, view.m, 1);
  const startDay = (first.getDay() + 6) % 7; // 0 = Mon
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const monthName = new Date(view.y, view.m, 1).toLocaleString("en-US", {
    month: "long",
  });
  const today = new Date();

  const isDisabled = (d) => {
    if (!minDate) return false;
    return new Date(view.y, view.m, d) < startOfDay(minDate);
  };

  const prevMonth = () =>
    setView(({ y, m }) => (m === 0 ? { y: y - 1, m: 11 } : { y, m: m - 1 }));
  const nextMonth = () =>
    setView(({ y, m }) => (m === 11 ? { y: y + 1, m: 0 } : { y, m: m + 1 }));

  return (
    <div className="min-w-0" ref={wrapRef}>
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold text-gray-500 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <button
          id={id}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={toggleMenu}
          className={`flex items-center gap-2 h-[46px] w-full px-3 bg-gray-50 rounded-lg border transition-colors text-left
            ${open ? "border-[#1d4046] bg-white" : "border-gray-200 hover:border-gray-300"}`}
        >
          <Icon className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="flex-1 min-w-0 truncate text-sm text-gray-800">
            {formatDisplay(current)}
          </span>
        </button>

        {open && (
          <div
            role="dialog"
            className="absolute z-30 left-0 mt-1.5 w-[300px] max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-3"
          >
            {/* Month nav */}
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={prevMonth}
                aria-label="Previous month"
                className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="text-sm font-semibold text-gray-800">
                {monthName} {view.y}
              </div>
              <button
                type="button"
                onClick={nextMonth}
                aria-label="Next month"
                className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                <div
                  key={d}
                  className="text-center text-[10px] font-semibold uppercase tracking-wide text-gray-400 py-1"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {cells.map((d, i) => {
                if (d === null) return <div key={`e${i}`} />;
                const cellDate = new Date(view.y, view.m, d);
                const selected = sameDay(cellDate, current);
                const isToday = sameDay(cellDate, today);
                const disabled = isDisabled(d);
                let cls =
                  "h-8 rounded-md text-sm transition-colors flex items-center justify-center";
                if (selected) cls += " bg-[#1d4046] text-white font-semibold";
                else if (isToday) cls += " border border-[#1d4046] text-[#1d4046] font-semibold";
                else if (disabled) cls += " text-gray-300 cursor-not-allowed";
                else cls += " text-gray-700 hover:bg-gray-100";
                return (
                  <button
                    key={d}
                    type="button"
                    disabled={disabled}
                    onClick={() => setDay(d)}
                    className={cls}
                  >
                    {d}
                  </button>
                );
              })}
            </div>

            {/* Time row */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-semibold text-gray-500">Time</span>
              <div className="ml-auto flex items-center gap-1">
                <input
                  type="number"
                  min={0}
                  max={23}
                  inputMode="numeric"
                  aria-label="Hours"
                  value={pad2(current.getHours())}
                  onChange={(e) => setHour(Number(e.target.value))}
                  className="bali-time w-12 h-8 text-center text-sm font-semibold text-gray-800 bg-gray-50 rounded-md border border-gray-200 focus:border-[#1d4046] focus:bg-white focus:outline-none"
                />
                <span className="text-gray-400 font-bold">:</span>
                <input
                  type="number"
                  min={0}
                  max={59}
                  inputMode="numeric"
                  aria-label="Minutes"
                  value={pad2(current.getMinutes())}
                  onChange={(e) => setMinute(Number(e.target.value))}
                  className="bali-time w-12 h-8 text-center text-sm font-semibold text-gray-800 bg-gray-50 rounded-md border border-gray-200 focus:border-[#1d4046] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-glass px-3 py-1.5 text-xs font-bold text-white rounded-md"
                style={{ backgroundColor: "#1d4046" }}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
