import React, { useState, useRef } from "react";
import TeacherService from "../services/teacherService.js";

/* Components */
import Modes from "../components/modes";
import FileAlert from "../components/fileAlert";
import BackTo from "../components/backTo";
import Loader from "../components/loader";

/* Animation */
import normalAnimation from "../components/animation/normalAnimation";

/* ----------- */
import { motion } from "framer-motion";
import styles from "../styles/principalPage.module.scss";

const PrincPg = () => {
  const mainRef = useRef(null);
  const [advise, setAdvise] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  /* Función para crear prompt utilizando la API de FastQuiz */
  const crearPrompt = async (prompt) => {
    if (prompt !== "") {
      try {
        /* Manejar carga */
        setLoading(true);
        mainRef.current.style.filter = "blur(15px)";
        mainRef.current.style.pointerEvents = "none";
        mainRef.current.style.overflow = "hidden";
        const response = await TeacherService.createPrompt(prompt);
        console.log("Respuesta completa:", response);
        console.log("Respuesta recibida:", response.data);
      } catch (error) {
        console.error(
          "Error al crear el prompt:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
        mainRef.current.style.filter = "blur(0px)";
        mainRef.current.style.pointerEvents = "auto";
        mainRef.current.style.overflow = "auto";
      }
    } else {
      alert("El prompt esta vacio, ingrese información por favor");
    }
  };

  /* Mostrar/ocultar aviso para subida de archivos */
  const showAdvise = () => {
    setAdvise(true);
    mainRef.current.style.filter = "blur(15px)";
    mainRef.current.style.pointerEvents = "none";
    mainRef.current.style.overflow = "hidden";
  };

  const hideAdvise = () => {
    setAdvise(false);
    mainRef.current.style.filter = "blur(0px)";
    mainRef.current.style.pointerEvents = "auto";
    mainRef.current.style.overflow = "auto";
  };

  return (
    <div className={`${styles.princPg} ${advise ? styles["blurred"] : ""}`}>
      <main className={styles["main-page"]} ref={mainRef}>
        <motion.h1 className={styles.title} {...normalAnimation(0.1)}>
          Aprende o enseña, no importa, lo importante es{" "}
          <span>ahorrar tiempo</span>
        </motion.h1>
        <motion.h3 className={styles.phrase} {...normalAnimation(0.2)}>
          Pregunta cualquier cosa, nuestra IA entrenada te dará la mejor
          respuesta o quiz personalizado
        </motion.h3>

        <motion.section
          className={styles["slide-modes"]}
          {...normalAnimation(0.3)}
        >
          <Modes
            showAdvise={showAdvise}
            enabled={true}
            action={prompt}
            setAction={setPrompt}
          />

          <BackTo
            backTo={"/"}
            nextTo={prompt ? "/quizDetails/hola" : "#"}
            action={() => crearPrompt(prompt)}
          />
        </motion.section>
      </main>
      {loading ? <Loader /> : ""}

      {advise && <FileAlert hideAdvise={hideAdvise} />}
    </div>
  );
};

export default PrincPg;
