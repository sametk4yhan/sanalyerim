"use client";

import Image from "next/image";
import { RotatingRole } from "@/components/rotating-role";
import { TrackedLink } from "@/components/tracked-link";
import { siteContent } from "@/content/site";
import styles from "@/app/page.module.css";

export type DesktopView = "work" | "tech" | "interests" | "now" | "blog";

type HeroPanelProps = {
  activeView: DesktopView;
};

function formatHref(href: string) {
  try {
    const url = new URL(href);
    return `${url.hostname}${url.pathname === "/" ? "" : url.pathname}`;
  } catch {
    return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

function WorkContent() {
  const { work } = siteContent;

  return (
    <div className={styles.desktopStageStack}>
      <div className={styles.desktopStageMeta}>
        <span className={styles.desktopStageEyebrow}>Selected work</span>
        <p className={styles.desktopStageNote}>Live links, shipping focus, and product surfaces that matter right now.</p>
      </div>

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
    </div>
  );
}

function TechContent() {
  return (
    <div className={styles.desktopStageStack}>
      <div className={styles.desktopStageMeta}>
        <span className={styles.desktopStageEyebrow}>Technical skills</span>
        <p className={styles.desktopStageNote}>The stack, systems, and product tools I use to ship interfaces with speed and structure.</p>
      </div>

      <article className={styles.desktopSingleBlock}>
        <div className={`${styles.tokenList} ${styles.desktopTokenGridWide}`}>
          {siteContent.technicalSkills.map((item) => (
            <span key={item.label} className={styles.token}>
              <img alt="" aria-hidden="true" className={styles.tokenIcon} src={item.iconSrc} />
              <span>{item.label}</span>
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}

function InterestsContent() {
  return (
    <div className={styles.desktopStageStack}>
      <div className={styles.desktopStageMeta}>
        <span className={styles.desktopStageEyebrow}>Interests</span>
        <p className={styles.desktopStageNote}>The spaces I keep returning to when shaping products, positioning, and long-term direction.</p>
      </div>

      <article className={styles.desktopSingleBlock}>
        <div className={`${styles.tokenList} ${styles.desktopTokenGridWide}`}>
          {siteContent.interests.map((item) => (
            <span key={item.label} className={styles.token}>
              <img alt="" aria-hidden="true" className={styles.tokenIcon} src={item.iconSrc} />
              <span>{item.label}</span>
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}

function NowContent() {
  return (
    <div className={styles.desktopStageStack}>
      <div className={styles.desktopStageMeta}>
        <span className={styles.desktopStageEyebrow}>Now</span>
        <p className={styles.desktopStageNote}>What is active in the background right now, with the least amount of noise possible.</p>
      </div>

      <article className={styles.desktopNowPanel}>
        {siteContent.now.map((item) => (
          <span key={item} className={styles.desktopNowItem}>{item}</span>
        ))}
      </article>
    </div>
  );
}

function BlogContent() {
  const { blog } = siteContent;

  return (
    <div className={styles.desktopStageStack}>
      <div className={styles.desktopStageMeta}>
        <span className={styles.desktopStageEyebrow}>Field notes</span>
        <p className={styles.desktopStageNote}>Short writing, product notes, and ideas moving in the background.</p>
      </div>

      <div className={styles.blogGrid}>
        {blog.map((post) => (
          <article key={post.title} className={styles.blogCard}>
            <div className={styles.blogCardTop}>
              <span className={styles.blogCardMeta}>{post.meta}</span>
              <span className={styles.blogCardStatus}>{post.status}</span>
            </div>
            <h3 className={styles.blogCardTitle}>{post.title}</h3>
            <p className={styles.blogCardExcerpt}>{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function HeroPanel({ activeView }: HeroPanelProps) {
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

      <section className={styles.desktopStage}>
        <div key={activeView} className={styles.desktopStageSurface}>
          {activeView === "work" ? <WorkContent /> : null}
          {activeView === "tech" ? <TechContent /> : null}
          {activeView === "interests" ? <InterestsContent /> : null}
          {activeView === "now" ? <NowContent /> : null}
          {activeView === "blog" ? <BlogContent /> : null}
        </div>
      </section>

      <section className={styles.workPanel}>
        <div className={styles.workColumns}>
          <article className={styles.workColumn} id="web-mobile">
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

          <article className={styles.workColumn} id="mobile-panel">
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
