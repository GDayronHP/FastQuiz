import React, { useState, useRef } from "react";
import styles from "../styles/components/qstReviewContainer.module.scss";
import { motion } from "framer-motion";

import normalAnimation from "./animation/normalAnimation.js";

import editBtn from "../assets/icons/editBtn.svg";
import closeBtn from "../assets/icons/dltBtn.svg";

import Toggle from "./functionalIcons/toggle.jsx";

function QstReviewContainer({ data, autosavedRef }) {
  const [questions, setQuestions] = useState(data);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const refs = useRef({});

  const date = new Date();
  const formattedDate = date.toLocaleTimeString("es-ES", {
    hour12: false,
  });

  const handleAlternativeChange = (questionKey, alternativeKey) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = { ...prevQuestions };

      updatedQuestions[questionKey].alternatives = updatedQuestions[
        questionKey
      ].alternatives.map((alt) => ({
        ...alt,
        correct: alt.key === alternativeKey,
      }));

      autosavedRef.current.textContent = `Autoguardado a las ${formattedDate}`;

      return updatedQuestions;
    });
  };

  const handleEditClick = (index) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  return (
    <div>
      {Object.keys(questions).map((key, index) => {
        const actual = questions[key];
        const actualQuestionN = parseInt(key) + 1;

        const questionDelay = 0.3 + index * 0.1;

        return (
          <motion.main
            className={styles["question-container"]}
            key={key}
            {...normalAnimation(questionDelay)}
          >
            <section className={styles.header}>
              <h1>Pregunta N° {actualQuestionN}</h1>
              <div className={styles["options-container"]}>
                <Toggle text="Requerido" />

                <button
                  className={`${styles["edit-btn"]} ${styles["button"]} ${
                    selectedQuestion === index ? styles.active : ""
                  }`}
                  onClick={() => handleEditClick(index)}
                >
                  <img src={editBtn} alt="editBtn" />
                </button>

                <button
                  className={`${styles["dlt-btn"]} ${styles["button"]}`}
                  onClick={() => alert(`Eliminar pregunta ${actualQuestionN}`)}
                >
                  <img src={closeBtn} alt="dltBtn" />
                </button>
              </div>
            </section>
            <section className={`${styles.body} ${selectedQuestion === index ? styles.active : ""}`}>
              <div className={styles.question}>
                <h1>{actual.question}</h1>
                <div
                  className={`${styles.alternatives} ${
                    selectedQuestion === index ? styles.active : ""
                  }`}
                  ref={(el) => (refs.current[index] = el)}
                >
                  {actual.alternatives.map((alternative) => (
                    <div key={alternative.key}>
                      <div className={styles["input-container"]}>
                        <input
                          type="radio"
                          name={key}
                          value={alternative.key}
                          checked={alternative.correct === true}
                          onChange={() =>
                            handleAlternativeChange(key, alternative.key)
                          }
                        />
                      </div>
                      <label>{alternative.alternative}</label>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </motion.main>
        );
      })}
    </div>
  );
}

export default QstReviewContainer;
