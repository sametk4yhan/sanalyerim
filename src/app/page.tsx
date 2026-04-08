import { DesktopShell } from "@/components/desktop-shell";
import { MobileTopBar } from "@/components/mobile-top-bar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.backdrop} aria-hidden="true">
        <video autoPlay className={styles.backdropVideo} loop muted playsInline preload="auto">
          <source src="/background-video.mp4" type="video/mp4" />
        </video>
      </div>
      <MobileTopBar />
      <DesktopShell />
    </main>
  );
}
