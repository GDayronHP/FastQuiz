import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { motion } from "framer-motion";


import nextRow from "../../assets/icons/nextRow.svg";
import Question from "../../components/question";
import normalAnimation from "../../components/animation/normalAnimation";
import styles from "../../styles/student/studentEvaluation.module.scss";


function StudentEvaluation() {
  const total = 10;
  /* Esto de aqui será una función que se inicializará aplicando una lógica que dependera de la cantidad de preguntas */
  const [progressValue, setProgressValue] = useState(1);
  const navigate = useNavigate();

  const nextQuestion = () => {
    setProgressValue((prev) => {
      if (prev === total) {
        navigate("/studentResults")
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  return (
    <div className={styles.studentEvaluation}>

      <motion.div {...normalAnimation(0.1)} className={styles.progressContainer}>
        <p>x</p>
        <progress value={progressValue} max={10} />
        <p className={styles.progressValue}>
          {progressValue} / {total}
        </p>
      </motion.div>
      <motion.div {...normalAnimation(0.2)} className={styles["question-container"]}>
        <Question
          question="¿Cuál es la primera fase de SCRUM?"
          alternatives={[
            "Inicio",
            "Planificación y estimación",
            "Implementación",
            "Lanzamiento",
          ]}
        />
      </motion.div>
      <motion.div className={`${styles.continueContainer}`} {...normalAnimation(0.3)} onClick={nextQuestion}>
        <button className={styles.continueBtn}>
          <p>Continuar</p>
          <img src={nextRow} alt="Close" />
        </button>
      </motion.div>
    </div>
  );
}

export default StudentEvaluation;
