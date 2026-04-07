export type LinkEvent = {
  category: "social" | "web" | "mobile";
  label: string;
  href: string;
  location: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function normalizeEventFragment(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 32);
}

function buildSpecificEventName(event: LinkEvent) {
  const normalizedLabel = normalizeEventFragment(event.label);
  return `click_${normalizedLabel || event.category}`;
}

export function trackLinkEvent(event: LinkEvent) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    ...event,
    eventName: buildSpecificEventName(event),
    path: window.location.pathname,
    ts: new Date().toISOString(),
  };

  window.dispatchEvent(
    new CustomEvent("sanalyerim:link-click", {
      detail: payload,
    }),
  );

  window.gtag?.("event", "link_click", {
    link_category: event.category,
    link_label: event.label,
    link_url: event.href,
    ui_location: event.location,
    page_path: payload.path,
  });

  window.gtag?.("event", payload.eventName, {
    link_category: event.category,
    link_label: event.label,
    link_url: event.href,
    ui_location: event.location,
    page_path: payload.path,
  });

  if (process.env.NODE_ENV !== "production") {
    console.info("[sanalyerim analytics]", payload);
  }

  const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;

  if (!endpoint || typeof navigator.sendBeacon !== "function") {
    return;
  }

  navigator.sendBeacon(endpoint, JSON.stringify(payload));
}
