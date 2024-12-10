import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../styles/components/question.module.scss";

const Question = ({ 
  question, 
  alternatives, 
  correct, 
  preguntaSeleccionadaId, 
  setCorrectSelected,
  resetSelection // Nueva prop para resetear la selección
}) => {
  const abcd = ["A", "B", "C", "D"];
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleContainerClick = (index) => {
    setSelectedIndex(index);
  };

  const handleSelected = (index, target) => {
    const selectedLetter = target
      .querySelector("span")
      .textContent.toLowerCase();
    setCorrectSelected(selectedLetter);  // Actualizar respuesta
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (correct) {
      const defaultSelectedIndex = alternatives.findIndex(
        ([key, value]) => key === correct
      );
      setSelectedIndex(defaultSelectedIndex);
    }
  }, [alternatives, correct]);

  // Resetear la selección si la prop resetSelection es true
  useEffect(() => {
    if (resetSelection) {
      setSelectedIndex(null); // Deseleccionamos la opción
    }
  }, [resetSelection]);

  return (
    <React.Fragment>
      <motion.div
        className={styles.question}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>{question}</h1>
      </motion.div>
      <div className={styles["alternatives-container"]}>
        {alternatives.map(([keyVal, value], altIndex) => (
          <motion.div
            key={altIndex}
            className={styles.alternative}
            onClick={
              setCorrectSelected
                ? (e) => handleSelected(altIndex, e.target)
                : () => handleContainerClick(altIndex)
            }
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
            transition={{ duration: 0.2, ease: "easeIn" }}
            whileHover={{ filter: "brightness(90%)" }}
            style={{ position: "relative", cursor: "pointer" }}
          >
            {correct && (
              <input
                type="radio"
                id={altIndex}
                name="alternative"
                style={{
                  visibility: "hidden",
                  position: "absolute",
                }}
                defaultChecked={keyVal === correct}
              />
            )}

            <label htmlFor={altIndex} style={{ width: "100%" }}>
              <span>{abcd[altIndex]}</span>
              {value}
            </label>
          </motion.div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Question;
