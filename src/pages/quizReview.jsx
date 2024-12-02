import React, { useRef } from "react";
import NewModes from "../components/newModes";
import QuizConfig from "../components/quizConfig";
import GeneralConfig from "../components/generalConfig";
import BackTo from "../components/backTo";
import { motion } from 'framer-motion';
import normalAnimation from "../components/animation/normalAnimation";

import save from "../assets/icons/save.svg";

import { Link } from "react-router-dom";

import styles from "../styles/quizReview.module.scss";

const QuizReview = () => {
  const autosavedRef = useRef("");

  /* Hora|minutos|segundos actuales */
  const date = new Date();
  const formattedDate = date.toLocaleTimeString("es-ES", {
    hour12: false,
  });

  return (
    <div className={styles.quizReview}>
      <NewModes
        modeNames={{
          QUIZ: <QuizConfig autosavedRef={autosavedRef} />,
          CONFIGURATION: <GeneralConfig />,
        }}
      />
      <motion.div {...normalAnimation(0.3)} className={styles.saveContainer}>
        <p ref={autosavedRef}> Autoguardado a las {formattedDate} </p>
        <Link  className={styles.saveBtn} to="/studentEvaluation">
          <p>Guardar</p>
          <img src={save} />
        </Link>
      </motion.div>
    </div>
  );
};

export default QuizReview;
