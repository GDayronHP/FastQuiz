import React, { UseState } from "react";

import styles from"../styles/quizDetails.module.css";

const QuizStyle = ({ cantidad, srcs }) => {
  return (
    <React.Fragment>
      <div>
        <h2>Selecciona un estilo</h2>
        <p>Elige un tema que se adapte a tu presentación</p>
      </div>
      <div className={styles["styles-container"]}>
        <div>
          {Array.from({ length: cantidad }, (_, index) => (
            <img
              key={index}
              src={srcs[index]}
              alt={`Estilo ${index + 1}`}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};
export default QuizStyle;
