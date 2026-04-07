import Image from "next/image";
import { TrackedLink } from "@/components/tracked-link";
import { siteContent } from "@/content/site";
import styles from "@/app/page.module.css";

export function ProfileCard() {
  const { profile } = siteContent;

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
              className={`${styles.portraitImage} ${styles.portraitBandOne}`}
              fill
              sizes="(max-width: 1100px) 100vw, 360px"
              src={profile.portrait.src}
            />
            <Image
              alt=""
              aria-hidden="true"
              className={`${styles.portraitImage} ${styles.portraitBandTwo}`}
              fill
              sizes="(max-width: 1100px) 100vw, 360px"
              src={profile.portrait.src}
            />
            <Image
              alt=""
              aria-hidden="true"
              className={`${styles.portraitImage} ${styles.portraitBandThree}`}
              fill
              sizes="(max-width: 1100px) 100vw, 360px"
              src={profile.portrait.src}
            />
            <Image
              alt=""
              aria-hidden="true"
              className={`${styles.portraitImage} ${styles.portraitBandFour}`}
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

    </section>
  );
}
