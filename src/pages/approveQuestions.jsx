import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Question from "../components/question.jsx";
import { Link } from "react-router-dom";

import styles from "../styles/approveQuestions.module.scss";

import backRow from "../assets/icons/nextRow.svg";
import nextRow from "../assets/icons/nextRow.svg";
import bigBack from "../assets/icons/bigBack.svg";
import approved from "../assets/icons/approved.svg";

import backRow2 from "../assets/icons/backRow.svg";
import loading from "../assets/icons/loading.svg";
import plus from "../assets/icons/plus.svg";
import bigNext from "../assets/icons/bigNext.svg";

const ApproveQuestions = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1000);
  const isSideBarResponsive = window.innerWidth < 700;
  const toggleBtn = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const questionsContainer = useRef(null);

  const toggleSidebar = () => {
    toggleBtn.current.style.transform =
      isSideBarResponsive && !isSidebarOpen
        ? "translateX(250px)"
        : "translateX(0px)";

    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <motion.div
      className={styles.quizManagement}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ display: "flex", minHeight: "100vh" }}
    >
      <motion.section
        className={styles["side-bar"]}
        initial={{ width: "250px" }}
        animate={{ width: isSidebarOpen ? "250px" : "0px" }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        style={{
          backgroundColor: "#2C3E50",
          color: "#ECF0F1",
          overflow: "hidden",
        }}
      >
        {isSidebarOpen && (
          <motion.aside
            className={styles["config-container"]}
            initial={{ opacity: 0, x: -250 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              delay: 0.2,
              duration: 0.1,
            }}
          >
            <div className={styles["config-options"]}>
              <button className={styles["backBtn"]}>
                <Link to="/quizDetails/:data">
                  <img src={backRow} alt="backIcon" />
                  Volver
                </Link>
              </button>
              <div className={styles["infoContainer"]}>
                <div>
                  <h2>Tema</h2>
                  <h1>SCRUM</h1>
                </div>
              </div>
              <hr />
              <div className={styles["approved-container"]}>
                <div className={styles["approved-count"]}>
                  <img src={approved} alt="" />
                  <p>Preguntas aprobadas: 2</p>
                </div>
                <div className={styles["approved"]}>
                  <div>
                    <p>¿Por qué es importante SCRUM?</p>
                  </div>
                  <div>
                    <p>¿Cuántas fases de SCRUM existen?</p>
                  </div>
                </div>
              </div>
              <div
                className={styles["questionsContainer"]}
                ref={questionsContainer}
              ></div>
              <button className={styles["finishQuiz"]}>
                <a href="#">Finalizar Cuestionario</a>
              </button>
            </div>
            <button className={styles["refuseQuiz"]}>
              <a href="#">Rechazar Cuestionario</a>
            </button>
          </motion.aside>
        )}
      </motion.section>

      <motion.button
        className={styles["toggleBtn"]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={toggleSidebar}
        transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
        ref={toggleBtn}
      >
        <motion.img
          src={backRow2}
          alt={isSidebarOpen ? "hideBtn" : "showBtn"}
          animate={{ rotate: isSidebarOpen ? 0 : -180 }}
          transition={{ duration: 0.2, ease: "easeInOut", delay: 0.2 }}
        />
      </motion.button>
      <motion.section
        className={styles["main-content"]}
        style={{ flex: 1 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <header className={styles.header}>
          <div className={styles.preview} style={{ color: "white" }}>
            <p>Vista previa</p>
          </div>
          <div className={styles["action"]}>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Pregunta a evaluar
            </motion.h1>
          </div>
        </header>
        <Question
          question="¿Cuál es la primera fase de SCRUM?"
          alternatives={[
            "Inicio",
            "Planificación y estimación",
            "Implementación",
            "Lanzamiento",
          ]}
        />
        <motion.div
          className={styles["question-actions"]}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <img className={styles.bigBack} src={bigBack} alt="" />
          <motion.button
            className={styles["refuseQuestion"]}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.3,
              type: "spring",
              stiffness: 150,
            }}
          >
            <a href="">Rechazar</a>
            <img src={loading} alt="loading" />
          </motion.button>
          <motion.button
            className={styles["acceptQuestion"]}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.9,
              duration: 0.3,
              type: "spring",
              stiffness: 150,
            }}
          >
            <Link to="/quizReview">Aceptar</Link>
            <img src={plus} alt="plus" />
          </motion.button>
          <img className={styles.bigNext} src={bigNext} alt="" />
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default ApproveQuestions;
