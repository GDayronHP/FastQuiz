import React from "react";
import styles from "../styles/components/loader.module.scss";

function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loader;
