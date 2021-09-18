import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import common from "../../styles/portfolio/common.module.scss";
import styles from "../../styles/portfolio/post.module.scss";
import Text from "../../components/dummy/Text.svg";

interface Props {}

function Post({}: Props): ReactElement {
  const router = useRouter();

  const { theme = "light", title } = router.query as Record<
    string,
    string | undefined
  >;
  return (
    <div className={`${common.container} ${theme} ${styles.container}`}>
      <div className={styles.tab1}></div>
      <div className={styles.tab2}></div>
      <div className={styles.page}>
        <div className={styles.nav}>
          <div className={styles.navLogo}></div>
          <div className={styles.navText}></div>
          <div className={styles.navButton}></div>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subtitle}>By Lars Volkers</h2>
        <Text />
      </div>
    </div>
  );
}

export default Post;
