"use client";

import { trackLinkEvent, type LinkEvent } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  className?: string;
  event: LinkEvent;
  children: React.ReactNode;
};

export function TrackedLink({
  href,
  className,
  event,
  children,
}: TrackedLinkProps) {
  const isExternal = href.startsWith("http");

  return (
    <a
      className={className}
      href={href}
      onClick={() => trackLinkEvent(event)}
      rel={isExternal ? "noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}
