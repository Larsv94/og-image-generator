import styles from "../styles/Home.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import LogoDark from "../public/Logo-light.png";
import LogoLight from "../public/Logo-dark.png";
import ProfilePic from "../public/profilePic.jpg";

export default function Home() {
  const router = useRouter();

  const {
    theme = "light",
    date,
    readTime,
    title,
    url,
  } = router.query as Record<string, string | undefined>;
  console.log({ query: router.query, theme });

  if (!["light", "dark"].includes(theme)) {
    return null;
  }

  return (
    <div className={`${styles.container} ${theme}`}>
      <svg
        className={styles.waves}
        viewBox="0 0 1200 324"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={styles.backwave}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 144L50 126C100 108 200 72 300 66C400 60 500 84 600 126C700 168 800 228 900 210C1000 192 1100 96 1150 48L1200 0V324H1150C1100 324 1000 324 900 324C800 324 700 324 600 324C500 324 400 324 300 324C200 324 100 324 50 324H0V144Z"
        />
        <path
          className={styles.frontwave}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 187.975L50 204.978C100 221.981 200 255.988 300 244.652C400 233.317 500 176.64 600 131.298C700 85.9565 800 51.9503 900 57.618C1000 63.2857 1100 108.627 1150 131.298L1200 153.969V324H1150C1100 324 1000 324 900 324C800 324 700 324 600 324C500 324 400 324 300 324C200 324 100 324 50 324H0V187.975Z"
        />
      </svg>
      <div>
        <div className={styles.infoContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.info}>
              {date && <span>{date}</span>}
              {date && readTime && " — "}
              {readTime && <span>{readTime}</span>}
            </div>
            <h1 className={styles.title}>{title}</h1>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={theme == "light" ? LogoLight : LogoDark}
              alt="Weekenddive logo"
            ></Image>
          </div>
        </div>
      </div>
      <div className={styles.personalConainer}>
        <div className={styles.twitterImage}>
          <Image src={ProfilePic} alt="profile picture"></Image>
        </div>
        <div className={styles.info}>
          <h2>Lars Volkers</h2>
          <span>twitter.com/Larsv94</span>
          <span>{url}</span>
        </div>
      </div>
    </div>
  );
}
