// ---------- Date helpers (local time, no UTC drift) ----------
export const pad2 = (n) => String(n).padStart(2, "0");

// Parse "YYYY-MM-DDTHH:MM" as a local Date.
export function parseISOLocal(s) {
  if (!s) return new Date();
  const [d, t = "00:00"] = s.split("T");
  const [y, mo, da] = d.split("-").map(Number);
  const [h, mi] = t.split(":").map(Number);
  return new Date(y, mo - 1, da, h, mi);
}

// Serialize a Date back to "YYYY-MM-DDTHH:MM" in local time.
export function toISOLocal(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

// "DD/MM/YYYY HH:MM" for display in the trigger button.
export function formatDisplay(d) {
  return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

export const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
