import React, { ReactElement } from "react";
import ActiveOptions from "./illustrations/active-options.svg";
import styles from "./index.module.scss";

interface Props {
  name: "activeOptions";
}

function Undraw({ name }: Props): ReactElement | null {
  switch (name) {
    case "activeOptions":
      return <ActiveOptions className={styles.default} />;
    default:
      return null;
  }
}

export default Undraw;
