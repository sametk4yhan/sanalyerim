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

export function trackLinkEvent(event: LinkEvent) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    ...event,
    path: window.location.pathname,
    ts: new Date().toISOString(),
  };

  window.dispatchEvent(
    new CustomEvent("sanalyerim:link-click", {
      detail: payload,
    }),
  );

  window.gtag?.("event", "select_content", {
    content_type: event.category,
    item_id: event.label,
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
