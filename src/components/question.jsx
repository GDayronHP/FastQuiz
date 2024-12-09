import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../styles/components/question.module.scss";

const Question = ({ key, question, alternatives, correct }) => {
  const abcd = ["A", "B", "C"];
  const [selectedIndex, setSelectedIndex] = useState(null);
  const refValue = useRef(key);

  function handleContainerClick(index) {
    setSelectedIndex(index);
  }

  // Se asegura de que la respuesta correcta se seleccione al cargar
  useEffect(() => {
    // Aquí asignamos el valor de la respuesta correcta
    const defaultSelectedIndex = alternatives.findIndex(
      ([key, value]) => key === correct
    );
    setSelectedIndex(defaultSelectedIndex); // Establecemos la respuesta correcta
  }, [alternatives, correct]);

  return (
    <React.Fragment>
      <>
        <motion.div
          key={key}
          className={styles.question}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <h1>{question}</h1>
        </motion.div>
        <div className={styles["alternatives-container"]}>
          {alternatives.map(([keyVal, value], altIndex) => (
            <motion.div
              key={altIndex}
              className={`${styles.alternative}`}
              onClick={() => handleContainerClick(altIndex)}
              ref={refValue}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: selectedIndex === altIndex ? 1.01 : 1,
                boxShadow:
                  selectedIndex === altIndex
                    ? "0px 4px 10px rgba(0, 128, 0, 0.3)"
                    : "none",
                backgroundImage:
                  selectedIndex === altIndex
                    ? "var(--correct-answer)"
                    : "var(--normal-answer)",
              }}
              transition={{
                duration: 0.2,
                ease: "easeIn",
              }}
              whileHover={{ filter: "brightness(90%)" }}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <input
                type="radio"
                id={altIndex}
                name="alternative"
                style={{ visibility: "hidden", position: "absolute" }}
                defaultChecked={keyVal === correct}
              />

              <label style={{ width: "100%" }} htmlFor={altIndex}>
                <span>{abcd[altIndex]}</span>
                {value}
              </label>
            </motion.div>
          ))}
        </div>
      </>
    </React.Fragment>
  );
};

export default Question;
