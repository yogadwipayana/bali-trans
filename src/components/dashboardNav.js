import {
  BookmarkCheck,
  Car,
  Heart,
  Home,
  IdCard,
  LifeBuoy,
  LogOut,
  MessageCircle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Shared nav configuration for the dashboard sidebar. Kept in its own file
// (not in DashboardSidebar.jsx) so the component file stays
// component-only — required by the project's react-refresh lint rule.
//
// Items with an `href` are real routes; items without one just bubble their
// click up to the page via `onSelect` so page-local state can react (e.g.
// Favourites toggling the saved-only filter on /dashboard/vehicles).
// ---------------------------------------------------------------------------

export const NAV_PRIMARY = [
  { id: "home", icon: Home, label: "Home", href: "/dashboard" },
  { id: "vehicles", icon: Car, label: "Vehicles", href: "/dashboard/vehicles" },
  { id: "bookings", icon: BookmarkCheck, label: "Bookings", href: "/dashboard/bookings" },
  { id: "favourites", icon: Heart, label: "Favourites", href: "/dashboard/favourites" },
  { id: "chat", icon: MessageCircle, label: "Chat", href: "/dashboard/chat" },
];

export const NAV_SECONDARY = [];

export const NAV_FOOTER = [
  { id: "license", icon: IdCard, label: "License", href: "/dashboard/license" },
  { id: "support", icon: LifeBuoy, label: "Support", href: "/dashboard/support" },
  { id: "logout", icon: LogOut, label: "Logout" },
];

// Given a URL pathname, returns the id of the nav item with a matching
// `href`, or `null`. Pages use it to seed their active-nav state from the
// current route on first render.
export function getNavIdFromPath(
  path,
  groups = [NAV_PRIMARY, NAV_SECONDARY, NAV_FOOTER],
) {
  for (const group of groups) {
    const match = group.find((item) => item.href === path);
    if (match) return match.id;
  }
  return null;
}
