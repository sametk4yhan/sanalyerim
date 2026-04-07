import Image from "next/image";
import { RotatingRole } from "@/components/rotating-role";
import { TrackedLink } from "@/components/tracked-link";
import { siteContent } from "@/content/site";
import styles from "@/app/page.module.css";

function formatHref(href: string) {
  try {
    const url = new URL(href);
    return `${url.hostname}${url.pathname === "/" ? "" : url.pathname}`;
  } catch {
    return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

export function HeroPanel() {
  const { hero, work } = siteContent;

  return (
    <div className={styles.rightColumn}>
      <section className={styles.heroPanel}>
        <div className={styles.heroHeader}>
          <div className={styles.heroTextBox}>
            <div className={styles.heroGreeting}>
              <span>{hero.greeting}</span>
              <RotatingRole
                className={styles.heroGreetingRole}
                itemClassName={styles.heroGreetingRoleText}
                roles={hero.rotatingTitles}
              />
            </div>

            <h1 className={styles.heroHeadline}>
              {hero.headline.before} <span>{hero.headline.highlight}</span> {hero.headline.after}
            </h1>

            <p className={styles.heroDescription}>{hero.description}</p>
          </div>
        </div>
      </section>

      <section className={styles.workPanel}>
        <div className={styles.workColumns}>
          <article className={styles.workColumn} id="web">
            <div className={styles.columnHeader}>
              <h2>WEB</h2>
            </div>

            <div className={styles.workListCompact}>
              {work.web.map((item) => (
                <TrackedLink
                  key={item.title}
                  className={styles.workLine}
                  event={{
                    category: item.category,
                    label: item.title,
                    href: item.href,
                    location: "web-list",
                  }}
                  href={item.href}
                >
                  <span className={styles.workLineLead}>
                    {item.iconSrc ? (
                      <Image
                        alt={`${item.title} icon`}
                        className={styles.workFavicon}
                        height={18}
                        src={item.iconSrc}
                        unoptimized
                        width={18}
                      />
                    ) : item.iconLabel ? (
                      <span className={styles.workMonogram}>{item.iconLabel}</span>
                    ) : null}
                    <span className={styles.workLineText}>
                      <span className={styles.workLineTitle}>{item.title}</span>
                      <span className={styles.workLineHref}>{formatHref(item.href)}</span>
                    </span>
                  </span>
                </TrackedLink>
              ))}
            </div>
          </article>

          <article className={styles.workColumn} id="mobile">
            <div className={styles.columnHeader}>
              <h2>MOBILE</h2>
            </div>

            <div className={styles.workListCompact}>
              {work.mobile.map((item) => (
                <div key={item.title} className={styles.workLineStores}>
                  <span className={styles.workLineLead}>
                    {item.iconSrc ? (
                      <Image
                        alt={`${item.title} icon`}
                        className={styles.workFavicon}
                        height={18}
                        src={item.iconSrc}
                        unoptimized
                        width={18}
                      />
                    ) : null}
                    <span className={styles.workLineTitle}>{item.title}</span>
                  </span>
                  <div className={styles.storeIcons}>
                    {item.storeLinks?.map((store) =>
                      store.href ? (
                        <TrackedLink
                          key={store.label}
                          className={styles.storeIconLink}
                          event={{
                            category: item.category,
                            label: `${item.title} ${store.label}`,
                            href: store.href,
                            location: "mobile-store-icons",
                          }}
                          href={store.href}
                        >
                          <span className={styles.storeBadgeText}>{store.label}</span>
                        </TrackedLink>
                      ) : (
                        <span key={store.label} aria-disabled="true" className={styles.storeIconDisabled}>
                          <span className={styles.storeBadgeText}>{store.label}</span>
                        </span>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
