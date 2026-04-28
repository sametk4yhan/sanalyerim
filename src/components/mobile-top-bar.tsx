"use client";

import { useState } from "react";
import { RotatingRole } from "@/components/rotating-role";
import { TrackedLink } from "@/components/tracked-link";
import { siteContent } from "@/content/site";
import styles from "@/app/page.module.css";

export function MobileTopBar() {
  const [open, setOpen] = useState(false);
  const { profile, work } = siteContent;

  const promptdexMobile = work.mobile[0];
  const promptdexAppHref = promptdexMobile.storeLinks?.find((item) => item.href)?.href ?? promptdexMobile.href;
  const forktMobile = work.mobile[1];
  const forktAppHref = forktMobile?.storeLinks?.find((item) => item.href)?.href ?? forktMobile?.href;

  const quickLinks = [
    {
      title: "Promptdex App",
      note: "App Store",
      href: promptdexAppHref,
      category: "mobile" as const,
      label: "Promptdex App Store",
      tone: "primary",
    },
    ...(forktMobile && forktAppHref
      ? [
          {
            title: "Forkt App",
            note: "App Store",
            href: forktAppHref,
            category: "mobile" as const,
            label: "Forkt App Store",
            tone: "primary",
          },
        ]
      : []),
    {
      title: "Promptdex Web",
      note: "Website",
      href: work.web[0].href,
      category: "web" as const,
      label: work.web[0].title,
      tone: "primary",
    },
    {
      title: "GitHub",
      note: "Profile",
      href: profile.socialLinks[0].href,
      category: "social" as const,
      label: profile.socialLinks[0].label,
      tone: "default",
    },
    {
      title: "Instagram",
      note: "Social",
      href: profile.socialLinks[2].href,
      category: "social" as const,
      label: profile.socialLinks[2].label,
      tone: "default",
    },
    {
      title: "X",
      note: "Updates",
      href: profile.socialLinks[1].href,
      category: "social" as const,
      label: profile.socialLinks[1].label,
      tone: "default",
    },
    {
      title: "Email",
      note: "Contact",
      href: "mailto:info@sametk4yhan.com",
      category: "social" as const,
      label: "Email",
      tone: "default",
    },
  ];

  return (
    <div className={`${styles.mobileTopBar} ${open ? styles.mobileTopBarOpen : ""}`}>
      <div className={styles.mobileTopBarShell}>
        <div className={styles.mobileTopBarCopy}>
          <span className={styles.mobileTopBarName}>{profile.name}</span>
          <RotatingRole
            className={styles.mobileTopBarRoleWrap}
            itemClassName={styles.mobileTopBarRole}
            roles={profile.rotatingTitles}
          />
        </div>

        <button
          aria-expanded={open}
          aria-label={open ? "Close quick links" : "Open quick links"}
          className={styles.mobileTopBarToggle}
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <span className={styles.mobileTopBarToggleGrid}>
            <span />
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {open ? (
        <div className={styles.mobileQuickPanel}>
          {quickLinks.map((item) => (
            <TrackedLink
              key={item.title}
              className={`${styles.mobileQuickLink} ${item.tone === "primary" ? styles.mobileQuickLinkPrimary : ""}`}
              event={{
                category: item.category,
                label: item.label,
                href: item.href,
                location: "mobile-top-bar",
              }}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              <span className={styles.mobileQuickLinkTitle}>{item.title}</span>
              <span className={styles.mobileQuickLinkNote}>{item.note}</span>
            </TrackedLink>
          ))}
        </div>
      ) : null}
    </div>
  );
}
