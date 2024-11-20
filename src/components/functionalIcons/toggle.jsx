import React, { useState } from "react";
import styles from "../../styles/functionalIcons/toggleBtn.module.scss";

function Toogle({ text }) {
  const [toggleState, setToggleState] = useState(false);

  function handleToggleState() {
    setToggleState(!toggleState);
  }
  return (
    <div className={styles.toggleBtnContainer} onClick={handleToggleState}>
      <svg
        width="32"
        height="17"
        viewBox="0 0 32 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={styles.toggleBtn}>
          <path
            className={`${styles.rectangle} ${
              toggleState ? styles.rectangleActive : styles.rectangleInactive
            }`}
            d="M0 8.5C0 3.80558 4.12441 0 9.21212 0H22.7879C27.8756 0 32 3.80558 32 8.5C32 13.1944 27.8756 17 22.7879 17H9.21212C4.12441 17 0 13.1944 0 8.5Z"
            fill="white"
          />
          <path
            className={`${styles.circle} ${
              toggleState ? styles.circleActive : styles.circleInactive
            }`}
            d="M16 8.5C16 12.0899 13.0899 15 9.5 15C5.91015 15 3 12.0899 3 8.5C3 4.91015 5.91015 2 9.5 2C13.0899 2 16 4.91015 16 8.5Z"
            fill="black"
          />
        </g>
      </svg>
      {text !== "" ? <p> {text} </p> : ""}
    </div>
  );
}

export default Toogle;
