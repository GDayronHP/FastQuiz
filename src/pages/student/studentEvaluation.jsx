import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import nextRow from "../../assets/icons/nextRow.svg";
import Question from "../../components/question";
import normalAnimation from "../../components/animation/normalAnimation";
import styles from "../../styles/student/studentEvaluation.module.scss";
import QuestionnaireService from "../../services/questionnaireService";
import { useMyContext } from "../../components/store/ContextApi";

function StudentEvaluation() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [correctSelected, setCorrectSelected] = useState({});
  const [registro, setRegistro] = useState([]);
  const [timeEnded, setTimeEnded] = useState(0);
  const [examStarted, setExamStarted] = useState(false); // Nuevo estado
  const navigate = useNavigate();
  const { cuestionarioId } = useParams();
  const { token } = useMyContext();

  const loadQuestionnaire = async () => {
    try {
      const response = await QuestionnaireService.getQuestionnaireById(
        cuestionarioId,
        token
      );
      if (!response || !response.preguntasSeleccionadas.length) {
        console.error("Formato de datos inválido:", response);
        alert("Error: los datos no están en el formato esperado.");
        return;
      }

      setQuestions(response.preguntasSeleccionadas);
      setTimeLeft(response.preguntasSeleccionadas[0].tiempo);
      setTimerActive(true);
    } catch (error) {
      console.error("Error al obtener los datos del cuestionario:", error);
    }
  };

  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            handleContinue(true); // El tiempo se acaba
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
        setTimeEnded((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  const handleStartExam = () => {
    setExamStarted(true); // Activa el examen
    loadQuestionnaire(); // Carga las preguntas
  };

  const handleContinue = (timeEnded = false) => {
    const currentQuestion = questions[currentIndex];
    const selectedAnswer = timeEnded
      ? null
      : correctSelected[currentQuestion.id];

    setRegistro((prevRegistro) => [
      ...prevRegistro,
      {
        preguntaSeleccionadaId: currentQuestion.id,
        claveAlternativaSeleccionada: selectedAnswer,
      },
    ]);

    if (currentIndex < questions.length - 1) {
      const nextQuestion = questions[currentIndex + 1];
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(nextQuestion.tiempo);
      setCorrectSelected({});
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    try {
      await QuestionnaireService.registerAnswers(
        {
          cuestionarioId: cuestionarioId,
          preguntasRespuestas: registro,
        },
        token
      );
      localStorage.setItem("timeEnded", timeEnded);
      navigate(`/studentResults/${cuestionarioId}`);
    } catch (error) {
      console.error("Error al registrar las respuestas:", error);
    }
  };

  const handleAnswerSelect = (claveAlternativaSeleccionada) => {
    setCorrectSelected((prevSelected) => ({
      ...prevSelected,
      [questions[currentIndex].id]: claveAlternativaSeleccionada,
    }));
  };

  return (
    <div className={styles.studentEvaluation}>
      {!examStarted ? (
        <div className={styles.startContainer}>
          <button className={styles.startBtn} onClick={handleStartExam}>
            Iniciar
          </button>
        </div>
      ) : (
        <>
          <motion.div {...normalAnimation(0.1)} className={styles.progressContainer}>
            <progress value={currentIndex + 1} max={questions.length} />
            <p className={styles.progressValue}>
              {currentIndex + 1} / {questions.length}
            </p>
            <p>
              Tiempo <span>{timeLeft}</span> segundos
            </p>
          </motion.div>

          <motion.div {...normalAnimation(0.2)} className={styles["question-container"]}>
            {questions.length > 0 ? (
              <Question
                question={questions[currentIndex].textoPreguntaSeleccionada}
                alternatives={questions[currentIndex].alternativas.map(
                  ({ clave, texto }) => [clave, texto]
                )}
                correct={null}
                setCorrectSelected={handleAnswerSelect}
                preguntaSeleccionadaId={questions[currentIndex].id}
                resetSelection={correctSelected[questions[currentIndex].id] === undefined}
              />
            ) : (
              <p>Cargando...</p>
            )}
          </motion.div>
          <motion.div
            className={`${styles.continueContainer}`}
            {...normalAnimation(0.3)}
            onClick={() => handleContinue(false)}
          >
            <button className={styles.continueBtn} disabled={timeLeft === 0}>
              <p>Continuar</p>
              <img src={nextRow} alt="Next" />
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default StudentEvaluation;
