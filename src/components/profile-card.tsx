"use client";

import Image from "next/image";
import { RotatingRole } from "@/components/rotating-role";
import { TrackedLink } from "@/components/tracked-link";
import { siteContent } from "@/content/site";
import { useIsMac } from "@/lib/platform";
import styles from "@/app/page.module.css";

export function ProfileCard() {
  const { profile } = siteContent;
  const isMac = useIsMac();
  const modKey = isMac ? "⌘" : "Ctrl";

  return (
    <section className={styles.profilePanel}>
      <div className={styles.portraitCard}>
        {profile.portrait.src ? (
          <>
            <Image
              alt={profile.portrait.alt}
              className={`${styles.portraitImage} ${styles.portraitBase}`}
              fill
              sizes="(max-width: 1100px) 100vw, 360px"
              src={profile.portrait.src}
            />
            <Image
              alt=""
              aria-hidden="true"
              className={`${styles.portraitImage} ${styles.portraitTearLayer} ${styles.portraitTearLayerOne}`}
              fill
              sizes="(max-width: 1100px) 100vw, 360px"
              src={profile.portrait.src}
            />
            <Image
              alt=""
              aria-hidden="true"
              className={`${styles.portraitImage} ${styles.portraitTearLayer} ${styles.portraitTearLayerTwo}`}
              fill
              sizes="(max-width: 1100px) 100vw, 360px"
              src={profile.portrait.src}
            />
          </>
        ) : (
          <div className={styles.portraitPlaceholder}>
            <span className={styles.placeholderLabel}>Photo</span>
            <span className={styles.placeholderInitials}>SK</span>
          </div>
        )}
      </div>

      <div className={styles.profileMeta}>
        <h2 className={styles.profileName}>{profile.name}</h2>
        <RotatingRole
          className={styles.profileRoleMobileWrap}
          itemClassName={styles.profileRoleMobile}
          roles={profile.rotatingTitles}
        />
      </div>

      <div className={styles.socialRow}>
        {profile.socialLinks.map((link) => (
          <TrackedLink
            key={link.label}
            className={styles.socialCircle}
            event={{
              category: link.category,
              label: link.label,
              href: link.href,
              location: "profile-card",
            }}
            href={link.href}
          >
            <span>{link.label}</span>
          </TrackedLink>
        ))}
      </div>

      <a className={styles.profileEmail} href="mailto:info@sametk4yhan.com">
        info@sametk4yhan.com
      </a>

      <p className={styles.profileShortcutHint}>
        Press <kbd className={styles.profileShortcutKbd}>{modKey}</kbd>
        <kbd className={styles.profileShortcutKbd}>K</kbd> for terminal
      </p>
    </section>
  );
}
