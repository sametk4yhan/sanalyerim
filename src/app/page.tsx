import { HeroPanel } from "@/components/hero-panel";
import { ProfileCard } from "@/components/profile-card";
import { siteContent } from "@/content/site";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.backdrop} aria-hidden="true">
        <video autoPlay className={styles.backdropVideo} loop muted playsInline preload="auto">
          <source src="/background-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.shell}>
        <ProfileCard />
        <HeroPanel />

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
        </footer>
      </div>
    </main>
  );
}
