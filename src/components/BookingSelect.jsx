import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

// Fully custom dropdown — replaces native <select> so the open menu can
// be styled to match the rest of the design. Supports click-outside to
// close, Escape to close, and arrow / Enter / Home / End keyboard nav.
export function BookingSelect({ id, label, icon: Icon, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(() =>
    Math.max(0, options.indexOf(value)),
  );
  const wrapRef = useRef(null);
  const listRef = useRef(null);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Keep the active option in view while navigating with the keyboard.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [open, activeIdx]);

  const openMenu = () => {
    setActiveIdx(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };
  const toggleMenu = () => (open ? setOpen(false) : openMenu());

  const select = (idx) => {
    onChange(options[idx]);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault();
      openMenu();
      return;
    }
    if (!open) return;
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIdx((i) => (i + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIdx((i) => (i - 1 + options.length) % options.length);
        break;
      case "Home":
        e.preventDefault();
        setActiveIdx(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIdx(options.length - 1);
        break;
      case "Enter":
        e.preventDefault();
        select(activeIdx);
        break;
      default:
    }
  };

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
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={toggleMenu}
          onKeyDown={onKeyDown}
          className={`flex items-center gap-2 h-[46px] w-full px-3 bg-gray-50 rounded-lg border transition-colors text-left
            ${open ? "border-[#1d4046] bg-white" : "border-gray-200 hover:border-gray-300"}`}
        >
          {Icon && <Icon className="w-4 h-4 text-gray-400 shrink-0" />}
          <span className="flex-1 min-w-0 truncate text-sm text-gray-800">{value}</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <ul
            ref={listRef}
            role="listbox"
            tabIndex={-1}
            className="absolute z-20 left-0 right-0 mt-1.5 max-h-64 overflow-auto rounded-lg border border-gray-200 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] py-1"
          >
            {options.map((opt, idx) => {
              const selected = opt === value;
              const active = idx === activeIdx;
              return (
                <li
                  key={opt}
                  data-idx={idx}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onMouseDown={(e) => e.preventDefault() /* keep focus on button */}
                  onClick={() => select(idx)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer
                    ${active ? "bg-gray-50" : ""}
                    ${selected ? "text-[#1d4046] font-semibold" : "text-gray-700"}`}
                >
                  <span className="flex-1 truncate">{opt}</span>
                  {selected && <Check className="w-4 h-4 text-[#1d4046] shrink-0" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
