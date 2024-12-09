import React, { useState } from "react";
import styles from "../styles/components/qstReviewContainer.module.scss";
import { motion } from "framer-motion";

import normalAnimation from "./animation/normalAnimation.js";
import { useParams } from "react-router-dom";

/* Components */
import QstReviewContainer from "./qstReviewContainer.jsx";

function QuizConfig({ autosavedRef, questionnaireData, setQuestionnaireData }) {
  const { balotarioId } = useParams();

  const balotario = JSON.parse(localStorage.getItem("balotario")).filter(
    (bal) => bal.id === Number(balotarioId)
  )[0];

  // Estados locales para los inputs
  const [tema, setTema] = useState(balotario.tema || "");
  const [descripcion, setDescripcion] = useState(balotario.descripcion || "");

  // Controladores de eventos
  const handleTemaChange = (e) => {
    setTema(e.target.value);
    setQuestionnaireData({ ...questionnaireData, titulo: e.target.value });
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
    setQuestionnaireData({ ...questionnaireData, descripcion: e.target.value });
  };

  return (
    <motion.div {...normalAnimation(0.2)} className={styles["quiz-config"]}>
      <div className={styles["quiz-data-container"]}>
        <motion.div className={styles["title"]}>
          <h1>Tema del Quiz</h1>
          <input
            type="text"
            value={tema}
            onChange={handleTemaChange} // Controlador de cambio
          />
        </motion.div>
        <motion.div className={styles["description"]}>
          <h1>Descripción</h1>
          <input
            type="text"
            value={descripcion}
            onChange={handleDescripcionChange} // Controlador de cambio
          />
        </motion.div>
      </div>
      {/* Contenedor de preguntas y alternativas */}
      <QstReviewContainer
        autosavedRef={autosavedRef}
        questionnaireData={questionnaireData}
        setQuestionnaireData={setQuestionnaireData}
      />
    </motion.div>
  );
}

export default QuizConfig;
