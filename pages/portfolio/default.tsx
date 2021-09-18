import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import Undraw from "../../components/undraw";
import common from "../../styles/portfolio/common.module.scss";
import styles from "../../styles/portfolio/default.module.scss";

interface Props {}

function Default({}: Props): ReactElement {
  const router = useRouter();

  const {
    theme = "light",
    title,
    btn,
  } = router.query as Record<string, string | undefined>;
  return (
    <div className={`${common.container} ${theme} ${styles.container}`}>
      <svg
        className={styles.backgroundSVG}
        width="1200"
        height="630"
        viewBox="0 0 1200 630"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H1200V118.712L0 630V0Z" fill="#17B897" />
      </svg>
      <div className={`${common.content} ${styles.content}`}>
        <div className={styles.flexContainer}>
          <Undraw name="activeOptions" />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.btnContainer}>
            <button>{btn}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Default;
