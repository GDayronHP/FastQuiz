import React from "react";
import { Link } from "react-router-dom";

import styles from "../styles/login.module.scss";

const Login = ({ src, alt, text, to }) => {
  return (
    <React.Fragment>
      <Link to={to} className={styles.linkTo}>
        <div className={styles["auth-container"]}>
          <img src={src} alt={alt} />
          <p>{text}</p>
        </div>
      </Link>
    </React.Fragment>
  );
};

export default Login;
