import React from "react";

import styles from '../styles/variables.module.css'

const Header = () => {
  return (
    <nav className={styles.navBar}>
      <ul>
        <li>
          <a className={styles.logo} href="#">
            Logo
          </a>
        </li>
        <li>
          <a className={styles.dashboard} href="#">
            Mi dashboard
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
