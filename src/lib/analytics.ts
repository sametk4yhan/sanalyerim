export type LinkEvent = {
  category: "social" | "web" | "mobile";
  label: string;
  href: string;
  location: string;
};

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

  if (process.env.NODE_ENV !== "production") {
    console.info("[sanalyerim analytics]", payload);
  }

  const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;

  if (!endpoint || typeof navigator.sendBeacon !== "function") {
    return;
  }

  navigator.sendBeacon(endpoint, JSON.stringify(payload));
}
