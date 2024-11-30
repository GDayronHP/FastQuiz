import React from "react";
import { Link, useNavigate } from "react-router-dom";
import nextRow from "../assets/icons/nextRow.svg";

import styles from "../styles/components/backTo.module.scss";

const BackTo = ({ backTo, nextTo, action }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      if (action) {
        const result = action(); 
        if (result instanceof Promise) {
          await result;
        }
      }
      navigate(nextTo);
    } catch (error) {
      console.error("Error al ejecutar la acción:", error);
    }
  };

  return (
    <div className={styles["backToContainer"]}>
      <Link to={backTo} className={styles.atras}>
        Atrás
      </Link>

      <button className={styles["continueBtn"]} onClick={handleClick}>
        <span className={styles.continuar}>Continuar</span>
        <img src={nextRow} alt="Next Row" />
      </button>
    </div>
  );
};

export default BackTo;
