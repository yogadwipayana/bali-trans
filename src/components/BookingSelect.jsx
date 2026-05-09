import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Pencil, X } from "lucide-react";

// Sentinel label used as the last menu item when `allowCustom` is true.
// Picking it switches the field into a free-text input mode so users can
// type a pickup location that isn't in the preset list.
const CUSTOM_OPTION = "Custom location…";

// Fully custom dropdown — replaces native <select> so the open menu can
// be styled to match the rest of the design. Supports click-outside to
// close, Escape to close, and arrow / Enter / Home / End keyboard nav.
//
// When `allowCustom` is true, an extra "Custom location…" entry is
// appended; selecting it flips the trigger into a text input the user
// can type into. The X button reverts back to the preset dropdown.
export function BookingSelect({ id, label, icon: Icon, value, onChange, options, allowCustom = false }) {
  // Custom mode is "sticky": once the user explicitly enters it (or the
  // initial value is something not in `options`), we stay there until
  // they click the X to go back to the preset list. We don't sync on
  // value changes so that typing a string that happens to match a preset
  // doesn't yank them out of the input.
  const [customMode, setCustomMode] = useState(
    () => allowCustom && typeof value === "string" && value !== "" && !options.includes(value),
  );

  const menuOptions = allowCustom ? [...options, CUSTOM_OPTION] : options;

  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(() =>
    Math.max(0, menuOptions.indexOf(value)),
  );
  const wrapRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);

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

  const enterCustomMode = () => {
    setCustomMode(true);
    setOpen(false);
    onChange("");
    // Focus the input on the next frame, after it mounts.
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const exitCustomMode = () => {
    setCustomMode(false);
    onChange(options[0]);
  };

  const openMenu = () => {
    setActiveIdx(Math.max(0, menuOptions.indexOf(value)));
    setOpen(true);
  };
  const toggleMenu = () => (open ? setOpen(false) : openMenu());

  const select = (idx) => {
    const opt = menuOptions[idx];
    if (allowCustom && opt === CUSTOM_OPTION) {
      enterCustomMode();
      return;
    }
    onChange(opt);
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
        setActiveIdx((i) => (i + 1) % menuOptions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIdx((i) => (i - 1 + menuOptions.length) % menuOptions.length);
        break;
      case "Home":
        e.preventDefault();
        setActiveIdx(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIdx(menuOptions.length - 1);
        break;
      case "Enter":
        e.preventDefault();
        select(activeIdx);
        break;
      default:
    }
  };

  // ---- Custom (free-text) mode ----
  if (customMode) {
    return (
      <div className="min-w-0" ref={wrapRef}>
        <label
          htmlFor={id}
          className="block text-[11px] font-semibold text-gray-500 mb-2"
        >
          {label}
        </label>
        <div
          className="flex items-center gap-2 h-[46px] w-full px-3 rounded-lg border border-[#0f0f0f] bg-white transition-colors focus-within:border-[#0f0f0f]"
        >
          {Icon && <Icon className="w-4 h-4 text-gray-400 shrink-0" />}
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your pickup location"
            className="flex-1 min-w-0 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={exitCustomMode}
            aria-label="Use preset locations"
            title="Use preset locations"
            className="text-gray-400 hover:text-gray-600 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ---- Standard dropdown mode ----
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
            ${open ? "border-[#0f0f0f] bg-white" : "border-gray-200 hover:border-gray-300"}`}
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
            {menuOptions.map((opt, idx) => {
              const isCustomEntry = allowCustom && opt === CUSTOM_OPTION;
              const selected = !isCustomEntry && opt === value;
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
                    ${selected ? "text-[#0f0f0f] font-semibold" : isCustomEntry ? "text-[#0f0f0f] border-t border-gray-100 mt-1 pt-2" : "text-gray-700"}`}
                >
                  {isCustomEntry && <Pencil className="w-3.5 h-3.5 shrink-0" />}
                  <span className="flex-1 truncate">{opt}</span>
                  {selected && <Check className="w-4 h-4 text-[#0f0f0f] shrink-0" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
