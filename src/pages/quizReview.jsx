import React, { useRef, useEffect, useState } from "react";
import NewModes from "../components/newModes";
import QuizConfig from "../components/quizConfig";
import GeneralConfig from "../components/generalConfig";
import { motion } from "framer-motion";
import normalAnimation from "../components/animation/normalAnimation";
import { useMyContext } from "../components/store/ContextApi";
import { useNavigate, Link } from "react-router-dom";
import QuestionnaireService from "../services/questionnaireService";

import save from "../assets/icons/save.svg";
import publish from "../assets/icons/publishIcon.svg";
import styles from "../styles/quizReview.module.scss";

const QuizReview = () => {
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const autosavedRef = useRef("");

  const [loading, setLoading] = useState(false);
  const [questionnaireData, setQuestionnaireData] = useState({
    titulo: "",
    descripcion: "",
    preguntaId: null,
    clavesPreguntas: [],
    tiempos: [],
    requeridos: [],
  });

  const { token, currentUser } = useMyContext();
  const [dateTime, setDateTime] = useState(
    new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  );
  const [published, setPublished] = useState(false);
  const [cuestionarioId, setCuestionarioId] = useState();
  const publishedUrl = useRef();

  useEffect(() => {
    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      navigate("/");
    }
  }, [token, navigate]);

  const updateQuestionnaireData = () => {
    console.log("Datos actualizados:", questionnaireData);
  };

  const saveAndPublishQuestionnaire = async () => {
    try {
      setLoading(true);

      if (mainRef.current) {
        mainRef.current.style.filter = "blur(15px)";
        mainRef.current.style.pointerEvents = "none";
      }

      const response = await QuestionnaireService.createQuestionnaire(
        questionnaireData,
        token
      );

      console.log("Cuestionario creado:", response);

      const now = new Date();
      const fechaInicio = now.toISOString().slice(0, -1);
      const fechaFin = now.toISOString().slice(0, -1);
      const urlPublica = `http://localhost:8080/cuestionarios/cuestions/${response.id}`;

      const publicationData = {
        fechaInicio,
        fechaFin,
        urlPublica,
      };

      const publishedResponse = await QuestionnaireService.publishQuestionnaire(
        response.id,
        publicationData,
        token
      );

      console.log("Cuestionario publicado:", publishedResponse);
      alert("Cuestionario creado y publicado exitosamente.");

      setCuestionarioId(response.id);

      setTimeout(() => {
        setPublished(true);
      }, 1000);
    } catch (error) {
      console.error(
        "Error al guardar o publicar el cuestionario:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Hubo un problema al guardar o publicar el cuestionario. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
      if (mainRef.current) {
        mainRef.current.style.filter = "blur(0px)";
        mainRef.current.style.pointerEvents = "auto";
      }
    }
  };

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(publishedUrl.current.value);
    alert("URL copiada al portapapeles.");
  }

  return (
    <div className={styles.quizReview} ref={mainRef}>
      <NewModes
        modeNames={{
          QUIZ: (
            <QuizConfig
              autosavedRef={autosavedRef}
              questionnaireData={questionnaireData}
              setQuestionnaireData={setQuestionnaireData}
            />
          ),
          CONFIGURATION: <GeneralConfig />,
        }}
      />
      <motion.div {...normalAnimation(0.3)} className={styles.saveContainer}>
        <p ref={autosavedRef}>Autoguardado a las {dateTime} </p>
        <Link
          className={styles.saveBtn}
          to="#"
          onClick={(e) => {
            e.preventDefault();
            updateQuestionnaireData();
          }}
        >
          <p>Guardar</p>
          <img src={save} alt="Guardar" />
        </Link>
        <Link
          className={styles.publishBtn}
          to="#"
          onClick={(e) => {
            e.preventDefault();
            saveAndPublishQuestionnaire();
          }}
        >
          <p>Guardar y publicar</p>
          <img src={publish} alt="Guardar y publicar" />
        </Link>
        {published ? (
            <div onClick={copyUrlToClipboard}  className={styles.copyBtn}>
              <button title="Copiar" >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  style={{fill: 'rgba(255, 255, 255, 1)'}}
                >
                  <path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path>
                </svg>
              </button>
              <input className={styles.publishedUrlInput} type="text" hidden ref={publishedUrl} value={`http://localhost:5173/studentEvaluation/${cuestionarioId}`}/>
            </div>
          ) : (
            ""
          )}
      </motion.div>
    </div>
  );
};

export default QuizReview;
