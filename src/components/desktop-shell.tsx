"use client";

import React, { useState, type SVGProps } from "react";
import { HeroPanel, type DesktopView } from "@/components/hero-panel";
import { ProfileCard } from "@/components/profile-card";
import { siteContent } from "@/content/site";
import styles from "@/app/page.module.css";

type NavItem = {
  view: DesktopView;
  label: string;
  Icon: (props: SVGProps<SVGSVGElement>) => React.ReactNode;
};

function WorkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </svg>
  );
}

function TechIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 8l-3 4 3 4" />
      <path d="M16 8l3 4-3 4" />
      <path d="M13.5 5l-3 14" />
    </svg>
  );
}

function InterestsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3l1.8 3.9L18 8.7l-3.8 1.8L12 14.4l-2.2-3.9L6 8.7l4.2-1.8L12 3z" />
      <path d="M5 18h14" />
      <path d="M8 21h8" />
    </svg>
  );
}

function NowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 7v5l3 3" />
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

function BlogIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 4.5h8.5a3.5 3.5 0 013.5 3.5v10.5H9.5A2.5 2.5 0 007 21V4.5z" />
      <path d="M7 4.5H6A3 3 0 003 7.5V18a3 3 0 003 3h1" />
      <path d="M10 9h6" />
      <path d="M10 13h6" />
    </svg>
  );
}

const navItems: NavItem[] = [
  { view: "work", label: "Work", Icon: WorkIcon },
  { view: "tech", label: "Tech", Icon: TechIcon },
  { view: "interests", label: "Interests", Icon: InterestsIcon },
  { view: "now", label: "Now", Icon: NowIcon },
  { view: "blog", label: "Blog", Icon: BlogIcon },
];

export function DesktopShell() {
  const [activeView, setActiveView] = useState<DesktopView>("work");

  return (
    <div className={styles.shell}>
      <aside className={styles.desktopRail} aria-label="Desktop navigation">
        <div className={styles.desktopRailInner}>
          {navItems.map(({ view, label, Icon }) => {
            const active = activeView === view;

            return (
              <button
                key={view}
                aria-label={label}
                aria-pressed={active}
                className={`${styles.desktopRailButton} ${active ? styles.desktopRailButtonActive : ""}`}
                onClick={() => setActiveView(view)}
                title={label}
                type="button"
              >
                <Icon className={styles.desktopRailIcon} />
              </button>
            );
          })}
        </div>
      </aside>

      <ProfileCard />
      <HeroPanel activeView={activeView} />

      <footer className={styles.footer}>
        <div className={styles.footerBlock}>
          <p>Technical Skills</p>
          <div className={`${styles.tokenList} ${styles.skillsList}`}>
            {siteContent.technicalSkills.map((item) => (
              <span key={item.label} className={styles.token}>
                <img alt="" aria-hidden="true" className={styles.tokenIcon} src={item.iconSrc} />
                <span>{item.label}</span>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.footerBlock}>
          <p>Interests</p>
          <div className={`${styles.tokenList} ${styles.interestsList}`}>
            {siteContent.interests.map((item) => (
              <span key={item.label} className={styles.token}>
                <img alt="" aria-hidden="true" className={styles.tokenIcon} src={item.iconSrc} />
                <span>{item.label}</span>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.footerBlock}>
          <p>Now</p>
          <div className={styles.nowList}>
            {siteContent.now.map((item) => (
              <span key={item} className={styles.nowItem}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
