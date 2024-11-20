import React from "react";

import { motion } from "framer-motion";

import Question from "../../components/question";
import normalAnimation from "../../components/animation/normalAnimation";
import styles from "../../styles/student/studentEvaluation.module.scss";

function StudentEvaluation() {
  return (
    <motion.div {...normalAnimation}
    className={styles.studentEvaluation}>
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
  );
}

export default StudentEvaluation;
