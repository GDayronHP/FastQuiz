import React, { useState, useRef, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import styles from "../styles/quizDetails.module.scss";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const QuizStyle = ({ srcs }) => {
  // const styleSelected = useRef(null);
  const [selectedStyle, setSelectedStyle] = useState(null);

  useEffect(() => {
    setSelectedStyle(1);
    // styleSelectedP(1);
  }, []);

  // const styleSelectedP = (index) => {
  //   styleSelected.current.textContent = ` Estilo ${index + 1} seleccionado `;
  // };

  const handleSelectStyle = (index) => {
    setSelectedStyle(index);

    // setTimeout(() => {
    //   styleSelectedP(index);
    // }, 500);
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
        <Carousel responsive={responsive}>
          {srcs.map((_, index) => (
            <div key={index} className={styles.style}>
              <img
                className={
                  selectedStyle == index ? styles["image-selected"] : ""
                }
                src={srcs[index]}
                alt={`Estilo ${index + 1}`}
                onClick={() => handleSelectStyle(index)}
              />
              {selectedStyle == index ? (
                <div className={styles["image-selected-p"]}>
                  <p>Seleccionado</p>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </Carousel>
      </div>
    </React.Fragment>
  );
};
export default QuizStyle;
