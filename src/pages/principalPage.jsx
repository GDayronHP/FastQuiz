import React, { useState, useRef, useEffect } from "react";
import TeacherService from "../services/teacherService.js";
import { useMyContext } from "../components/store/ContextApi";
import { useNavigate } from "react-router-dom";
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
  const { token } = useMyContext();

  const navigate = useNavigate();

  const mainRef = useRef(null);
  const [advise, setAdvise] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    cantidadPreguntas: "",
    dificultad: "",
    tema: "",
    alternativas: "",
  });

  const handleSubmit = () => {
    const { cantidadPreguntas, dificultad, tema, alternativas } = inputs;

    if (!cantidadPreguntas || !dificultad || !tema || !alternativas) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const promptValue = `Por favor, deme ${cantidadPreguntas} preguntas ${dificultad} sobre ${tema} con ${alternativas} alternativas de cada pregunta y su respuesta correcta intercalada.`;

    setTimeout(() => enviarPrompt(promptValue), 100);
  };

  const enviarPrompt = async (prompt) => {
    if (prompt !== "") {
      try {
        setLoading(true);
        if (mainRef.current) {
          mainRef.current.style.filter = "blur(15px)";
          mainRef.current.style.pointerEvents = "none";
          mainRef.current.style.overflow = "hidden";
        }

        const response = await TeacherService.createPrompt(prompt, token);
        console.log("Respuesta completa:", response);
        console.log("Respuesta recibida:", response.data);
      } catch (error) {
        console.error(
          "Error al crear el prompt:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
        if (mainRef.current) {
          mainRef.current.style.filter = "blur(0px)";
          mainRef.current.style.pointerEvents = "auto";
          mainRef.current.style.overflow = "auto";
        }
        navigate("/quizDetails/hola");
      }
    } else {
      alert("El prompt está vacío, ingrese información por favor");
    }
  };

  const showAdvise = () => {
    setAdvise(true);
    if (mainRef.current) {
      mainRef.current.style.filter = "blur(15px)";
      mainRef.current.style.pointerEvents = "none";
      mainRef.current.style.overflow = "hidden";
    }
  };

  const hideAdvise = () => {
    setAdvise(false);
    if (mainRef.current) {
      mainRef.current.style.filter = "blur(0px)";
      mainRef.current.style.pointerEvents = "auto";
      mainRef.current.style.overflow = "auto";
    }
  };

  return (
    <div className={`${styles.princPg} ${advise ? styles.blurred : ""}`}>
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
            action={null}
            setAction={() => {}}
            data={null}
            inputs={inputs}
            setInputs={setInputs}
          />

          <BackTo backTo={"/"} nextTo={null} action={() => handleSubmit()} />
        </motion.section>
      </main>
      {loading && <Loader />}

      {advise && <FileAlert hideAdvise={hideAdvise} />}
    </div>
  );
};

export default PrincPg;
