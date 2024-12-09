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

  // Verifica si hay un token válido antes de continuar
  useEffect(() => {
    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      navigate("/");
    }
  }, [token, navigate]);

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
    if (!prompt) {
      alert("El prompt está vacío, ingrese información por favor");
      return;
    }

    try {
      setLoading(true);

      // Deshabilitar interacción con la UI mientras se procesa
      if (mainRef.current) {
        mainRef.current.style.filter = "blur(15px)";
        mainRef.current.style.pointerEvents = "none";
        mainRef.current.style.overflow = "hidden";
      }

      const response = await TeacherService.createPrompt(prompt, token);
      console.log("Respuesta completa:", response);

      if (localStorage.getItem("balotario")) {
        localStorage.removeItem("balotario");
      } else {
        localStorage.setItem("balotario", JSON.stringify(response));
      }
     
      // Verificar que la respuesta contiene datos antes de redirigir
      const balotarioData = JSON.parse(localStorage.getItem("balotario"));
      if (balotarioData && balotarioData.length > 0) {
        navigate(`/quizDetails/${balotarioData[0].id}`);
      } else {
        alert("No se encontraron datos válidos para redirigir.");
      }
    } catch (error) {
      console.error(
        "Error al crear el prompt:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Hubo un problema al crear el prompt. Por favor, inténtalo de nuevo."
      );
    } finally {
      // Restaurar la interfaz de usuario al finalizar
      setLoading(false);
      if (mainRef.current) {
        mainRef.current.style.filter = "blur(0px)";
        mainRef.current.style.pointerEvents = "auto";
        mainRef.current.style.overflow = "auto";
      }
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

          {/* Deshabilitar botón cuando está en loading */}
          <BackTo
            backTo={"/"}
            nextTo={null}
            action={handleSubmit}
            disabled={loading}
          />
        </motion.section>
      </main>
      {loading && <Loader />}

      {advise && <FileAlert hideAdvise={hideAdvise} />}
    </div>
  );
};

export default PrincPg;
