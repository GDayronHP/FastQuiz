import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Question from "../components/question.jsx";
import { Link, useParams } from "react-router-dom";
import { useMyContext } from "../components/store/ContextApi";
import { useNavigate } from "react-router-dom";

import styles from "../styles/approveQuestions.module.scss";

import backRow from "../assets/icons/nextRow.svg";
import nextRow from "../assets/icons/nextRow.svg";
import bigBack from "../assets/icons/bigBack.svg";
import approved from "../assets/icons/approved.svg";
import backRow2 from "../assets/icons/backRow.svg";
import loading from "../assets/icons/loading.svg";
import plus from "../assets/icons/plus.svg";
import bigNext from "../assets/icons/bigNext.svg";

import TeacherService from "../services/teacherService.js";

const ApproveQuestions = () => {
  const { token } = useMyContext();
  const { balotarioId } = useParams();
  const navigate = useNavigate();

  const balotario = JSON.parse(localStorage.getItem("balotario")).filter(
    (bal) => bal.id === Number(balotarioId)
  )[0];

  const [data, setData] = useState({
    preguntas: [],
    alternativas: [],
    correctas: [],
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1000);
  const isSideBarResponsive = window.innerWidth < 700;
  const toggleBtn = useRef(null);

  const [approvedList, setApprovedList] = useState([]);
  const [indexData, setIndexData] = useState(0);
  const [preparedData, setPreparedData] = useState(null);

  useEffect(() => {
    // Recupera la lista de preguntas aprobadas desde localStorage si ya existe
    const storedApprovedList = JSON.parse(localStorage.getItem("approvedList"));
    if (storedApprovedList) {
      setApprovedList(storedApprovedList);
    }
    console.log(balotario);
  }, []);

  useEffect(() => {
    const updatedApprovedList = approvedList.map((item) => ({
      ...item,
      required: true,
      time: 30,
    }));

    localStorage.setItem("approvedList", JSON.stringify(updatedApprovedList));

    console.log(localStorage.getItem("approvedList"));
  }, [approvedList]);

  useEffect(() => {
    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      navigate("/");
    } else {
      defineData();
    }
  }, [balotarioId, token, navigate]);

  const defineData = async () => {
    try {
      const response = await TeacherService.getQuestionData(
        balotario,
        balotarioId,
        token
      );

      if (
        !response ||
        !Array.isArray(response.preguntas) ||
        !Array.isArray(response.alternativas)
      ) {
        console.error("Formato de datos inválido:", response);
        alert("Error: los datos no están en el formato esperado.");
        return;
      }

      setData({
        preguntas: response.preguntas,
        alternativas: response.alternativas,
        correctas: response.correctas,
      });

      // Configura la primera pregunta como inicial
      setPreparedData({
        question: response.preguntas[0],
        alternatives: Object.entries(response.alternativas[0]),
        correct: response.correctas["Respuesta 1"],
      });
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const anotherData = (accept) => {
    if (accept) {
      setApprovedList((prevApprovedList) => [
        ...prevApprovedList,
        {
          question: preparedData.question,
          alternatives: preparedData.alternatives,
          correct: preparedData.correct,
        },
      ]);
    }

    setIndexData((prevIndexData) => {
      const newIndex = prevIndexData + 1;

      if (data.preguntas[newIndex]) {
        setPreparedData({
          question: data.preguntas[newIndex],
          alternatives: Object.entries(data.alternativas[newIndex]),
          correct: data.correctas[`Respuesta ${newIndex + 1}`],
        });
      } else {
        setPreparedData(null);
      }

      return newIndex;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
                <Link to={`/quizDetails/${balotarioId}`}>
                  <img src={backRow} alt="backIcon" />
                  Volver
                </Link>
              </button>
              <div className={styles["infoContainer"]}>
                <div>
                  <h2>Tema</h2>
                  <h1>{balotario.tema}</h1>
                </div>
              </div>
              <hr />
              <div className={styles["approved-container"]}>
                <div className={styles["approved-count"]}>
                  <img src={approved} alt="" />
                  <p>Preguntas aprobadas: {approvedList.length}</p>
                </div>
                <div className={styles["approved"]}>
                  {approvedList.map((approved, index) => (
                    <div key={index}>
                      <p>{approved.question}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button className={styles["finishQuiz"]}>
                <Link to={`/quizReview/${balotarioId}`} href="#">
                  Finalizar Cuestionario
                </Link>
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

        {preparedData ? (
          <>
            <div className={styles["question-container"]}>
              <Question
                key={indexData}
                question={preparedData.question}
                alternatives={preparedData.alternatives}
                correct={preparedData.correct}
              />
            </div>
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
                onClick={() => anotherData(false)}
              >
                <button href="">Rechazar</button>
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
                onClick={() => anotherData(true)}
              >
                <button className={styles.accept}>Aceptar</button>
                <img src={plus} alt="plusIcon" />
              </motion.button>
              <img className={styles.bigNext} src={bigNext} alt="" />
            </motion.div>
          </>
        ) : (
          <p className={styles["no-more-questions"]}>
            Ya no hay más preguntas :( <br /><br />
            Puedes darle a finalizar cuestionario para continuar al siguiente
            paso
          </p>
        )}
      </motion.section>
    </motion.div>
  );
};

export default ApproveQuestions;
