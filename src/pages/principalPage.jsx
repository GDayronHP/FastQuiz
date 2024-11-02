import React, { useState, useRef } from "react";
import Modes from "../components/modes";
import FileAlert from "../components/fileAlert";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import styles from "../styles/principalPage.module.css";

const PrincPg = () => {
  const mainRef = useRef(null);
  const [advise, setAdvise] = useState(false);

  function showAdvise() {
    setAdvise(true);
    mainRef.current.style.filter = "blur(15px)";
    mainRef.current.style.pointerEvents = "none";
    mainRef.current.style.overflow = "hidden";
  }

  function hideAdvise() {
    setAdvise(false);
    mainRef.current.style.filter = "blur(0px)";
    mainRef.current.style.pointerEvents = "auto";
    mainRef.current.style.overflow = "auto";
  }

  return (
    <React.Fragment>
      <main className={styles["main-page"]} ref={mainRef}>
        <motion.h1
          className={styles.title}
          initial={{
            opacity: 0,
            transform: "translateY(15px)",
          }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{
            duration: 0.7,
            type: "spring",
            delay: 0.1,
          }}
        >
          Aprende o enseña, no importa, lo importante es{" "}
          <span>ahorrar tiempo</span>
        </motion.h1>
        <motion.h3
          className={styles.phrase}
          initial={{
            opacity: 0,
            transform: "translateY(15px)",
          }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{
            duration: 0.7,
            type: "spring",
            delay: 0.2,
          }}
        >
          Pregunta cualquier cosa, nuestra IA entrenada te dará la mejor
          respuesta o quiz personalizado
        </motion.h3>

        <motion.section
          className={styles["slide-modes"]}
          initial={{
            opacity: 0,
            transform: "translateY(15px)",
          }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{
            duration: 0.7,
            type: "spring",
            delay: 0.3,
          }}
        >
          <Modes showAdvise={showAdvise} />

          <Link className={styles.continueBtn} to="/quizDetails">
            <button>Continuar</button>
          </Link>
        </motion.section>
      </main>

      {advise && <FileAlert hideAdvise={hideAdvise} />}
    </React.Fragment>
  );
};

export default PrincPg;
