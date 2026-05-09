import { useEffect } from "react";

// `src/index.css` styles `#root` for the Vite starter look:
//   • #root is constrained to 1126px and has a left/right border.
//   • `:root` and `body` switch to a near-black `#16171d` background under
//     `prefers-color-scheme: dark`.
//
// `useFullScreenRoot` opts into a true edge-to-edge layout: stretch #root to
// 100% width, drop the centering border, and force a light background on
// the document so dark-mode chrome doesn't bleed through. The page can
// still scroll normally — for layouts that want a locked 100vh viewport
// (no document scroll), use `useLockedViewport` instead.
export function useFullScreenRoot() {
  useEffect(() => {
    const root = document.getElementById("root");
    const html = document.documentElement;
    const body = document.body;
    if (!root) return undefined;

    const prev = {
      rootWidth: root.style.width,
      rootMaxWidth: root.style.maxWidth,
      rootBorderInline: root.style.borderInline,
      rootTextAlign: root.style.textAlign,
      rootBackground: root.style.background,
      htmlBackground: html.style.background,
      htmlColorScheme: html.style.colorScheme,
      bodyBackground: body.style.background,
    };

    root.style.width = "100%";
    root.style.maxWidth = "100%";
    root.style.borderInline = "none";
    root.style.textAlign = "left";
    root.style.background = "#ffffff";
    html.style.background = "#ffffff";
    html.style.colorScheme = "light";
    body.style.background = "#ffffff";

    return () => {
      root.style.width = prev.rootWidth;
      root.style.maxWidth = prev.rootMaxWidth;
      root.style.borderInline = prev.rootBorderInline;
      root.style.textAlign = prev.rootTextAlign;
      root.style.background = prev.rootBackground;
      html.style.background = prev.htmlBackground;
      html.style.colorScheme = prev.htmlColorScheme;
      body.style.background = prev.bodyBackground;
    };
  }, []);
}

// `useLockedViewport` builds on the same edge-to-edge reset but additionally
// pins the page to a single viewport (no document scroll, exact 100vh
// height). Use this on admin-style layouts where the page itself owns
// scroll on its inner panels — e.g. /dashboard-v2 and /admin/vehicles —
// so the rem-based `:root { font-size: 18px }` declared in index.css can't
// inflate header heights past 100vh and produce a stray document scrollbar.
export function useLockedViewport() {
  useEffect(() => {
    const root = document.getElementById("root");
    const html = document.documentElement;
    const body = document.body;
    if (!root) return undefined;

    const prev = {
      rootWidth: root.style.width,
      rootMaxWidth: root.style.maxWidth,
      rootBorderInline: root.style.borderInline,
      rootTextAlign: root.style.textAlign,
      rootMinHeight: root.style.minHeight,
      rootHeight: root.style.height,
      rootDisplay: root.style.display,
      rootPadding: root.style.padding,
      rootMargin: root.style.margin,
      rootBackground: root.style.background,

      htmlOverflow: html.style.overflow,
      htmlBackground: html.style.background,
      htmlColorScheme: html.style.colorScheme,
      bodyOverflow: body.style.overflow,
      bodyBackground: body.style.background,
      bodyMargin: body.style.margin,
    };

    // #root: drop the starter chrome AND its `display: flex; min-height:
    // 100svh` so the page child can lay out as a fixed-height viewport.
    root.style.width = "100%";
    root.style.maxWidth = "100%";
    root.style.borderInline = "none";
    root.style.textAlign = "left";
    root.style.minHeight = "0";
    root.style.height = "100vh";
    root.style.display = "block";
    root.style.padding = "0";
    root.style.margin = "0";
    root.style.background = "#ffffff";

    // Document-level: lock scroll, pin a light backdrop and force the
    // light color scheme so dark-mode browsers don't bleed dark UA chrome.
    html.style.overflow = "hidden";
    html.style.background = "#ffffff";
    html.style.colorScheme = "light";
    body.style.overflow = "hidden";
    body.style.background = "#ffffff";
    body.style.margin = "0";

    return () => {
      root.style.width = prev.rootWidth;
      root.style.maxWidth = prev.rootMaxWidth;
      root.style.borderInline = prev.rootBorderInline;
      root.style.textAlign = prev.rootTextAlign;
      root.style.minHeight = prev.rootMinHeight;
      root.style.height = prev.rootHeight;
      root.style.display = prev.rootDisplay;
      root.style.padding = prev.rootPadding;
      root.style.margin = prev.rootMargin;
      root.style.background = prev.rootBackground;

      html.style.overflow = prev.htmlOverflow;
      html.style.background = prev.htmlBackground;
      html.style.colorScheme = prev.htmlColorScheme;
      body.style.overflow = prev.bodyOverflow;
      body.style.background = prev.bodyBackground;
      body.style.margin = prev.bodyMargin;
    };
  }, []);
}
