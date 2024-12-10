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

      const cuestionarioId = response.id;

      setTimeout(()=> {
        navigate(`/studentEvaluation/${cuestionarioId}`)
      },1000)

    } catch (error) {
      console.error(
        "Error al guardar o publicar el cuestionario:",
        error.response ? error.response.data : error.message
      );
      alert("Hubo un problema al guardar o publicar el cuestionario. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
      if (mainRef.current) {
        mainRef.current.style.filter = "blur(0px)";
        mainRef.current.style.pointerEvents = "auto";
      }
    }
  };

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
        <p ref={autosavedRef}>Autoguardado</p>
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
          className={styles.saveBtn}
          to="#"
          onClick={(e) => {
            e.preventDefault();
            saveAndPublishQuestionnaire();
          }}
        >
          <p>Guardar y publicar</p>
          <img src={save} alt="Guardar y publicar" />
        </Link>
      </motion.div> 
    </div>
  );
};

export default QuizReview;
