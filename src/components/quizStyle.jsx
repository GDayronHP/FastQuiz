import React, { useState, useRef, useEffect } from "react";
import { easeOut, motion } from "framer-motion";

import "react-multi-carousel/lib/styles.css";

import styles from "../styles/quizDetails.module.scss";



const QuizStyle = ({ srcs, estiloRef }) => {
  // const styleSelected = useRef(null);
  const [selectedStyle, setSelectedStyle] = useState({'index': 0, 'src': 'https://png.pngtree.com/thumb_back/fh260/background/20210803/pngtree-modern-simple-elegant-dark-blue-landing-page-website-background-image_756950.jpg'});

  // const styleSelectedP = (index) => {
  //   styleSelected.current.textContent = ` Estilo ${index + 1} seleccionado `;
  // };

  const handleSelectStyle = (e, index) => {
    setSelectedStyle({'index': index, 'src': e.target.src});
    estiloRef.current = selectedStyle.src;

  };

  return (
    <React.Fragment>
      <div className={styles.textContainer}>
        <div className={styles.title}>
          <h2>Selecciona un estilo</h2>
        </div>
        <p>Elige un tema que se adapte a tu presentación</p>
      </div>
      <div className={styles.styles}>
        {/* <div className={styles["selected-style-p"]}>
          <p ref={styleSelected}></p>
        </div> */}

        {srcs.map((_, index) => (
          <div key={index} className={styles.style}>
            <img
              className={selectedStyle.index == index ? styles["image-selected"] : ""}
              src={srcs[index]}
              alt={`Estilo ${index + 1}`}
              onClick={(e) => handleSelectStyle(e, index)}
            />
            {selectedStyle.index == index ? (
              <div className={styles["image-selected-p"]}>
                <p>Seleccionado</p>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};
export default QuizStyle;
