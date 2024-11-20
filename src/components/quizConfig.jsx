import React from "react";
import styles from "../styles/components/qstReviewContainer.module.scss";
import { motion } from "framer-motion";

import normalAnimation from "./animation/normalAnimation.js";

/* Components */
import QstReviewContainer from "./qstReviewContainer.jsx";

/* Data */
import data from "./testData/data.js";
function QuizConfig({ autosavedRef }) {
  return (
    <motion.div {...normalAnimation(0.2)} className={styles["quiz-config"]}>
      <div className={styles["quiz-data-container"]}>
        <motion.div className={styles["title"]}>
          <h1>Tema del Quiz</h1>
          <p>Scrum</p>
        </motion.div>
        <motion.div className={styles["questions-type"]}>
          <h1>Tipo de preguntas</h1>
          <p>Opción múltiple</p>
        </motion.div>
      </div>
      {/* Contenedor de preguntas y alternativas */}
      <QstReviewContainer data={data} autosavedRef={autosavedRef} />
    </motion.div>
  );
}

export default QuizConfig;
