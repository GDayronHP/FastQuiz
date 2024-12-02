import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "../styles/components/question.module.scss";

const Question = ({ key, question, alternatives }) => {
  const abcd = ["A", "B", "C", "D"];
  const [selectedIndex, setSelectedIndex] = useState(null);

  function handleContainerClick(index) {
    setSelectedIndex(index);
  }

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
          {alternatives.map((alternative, index) => (
            <motion.div
              key={index}
              className={`${styles.alternative}`}
              onClick={() => handleContainerClick(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: selectedIndex === index ? 1.01 : 1,
                boxShadow:
                  selectedIndex === index
                    ? "0px 4px 10px rgba(0, 128, 0, 0.3)"
                    : "none",
                backgroundImage:
                  selectedIndex === index
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
                id={index}
                name="alternative"
                style={{ visibility: "hidden", position: "absolute" }}
              />
              <label style={{ width: "100%" }} htmlFor={index}>
                <span>{abcd[index]}</span>
                {alternative}
              </label>
            </motion.div>
          ))}
        </div>
      </>
    </React.Fragment>
  );
};

export default Question;
