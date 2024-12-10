import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/components/qstReviewContainer.module.scss";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

import normalAnimation from "./animation/normalAnimation.js";

import editBtn from "../assets/icons/editBtn.svg";
import closeBtn from "../assets/icons/dltBtn.svg";

import Toggle from "./functionalIcons/toggle.jsx";

function QstReviewContainer({
  autosavedRef,
  questionnaireData,
  setQuestionnaireData,
}) {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const refs = useRef({});
  const { balotarioId } = useParams();

  const date = new Date();
  const formattedDate = date.toLocaleTimeString("es-ES", {
    hour12: false,
  });

  const [questionNumbers, setQuestionNumbers] = useState([]);

  // Cargar las preguntas desde el localStorage
  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("approvedList"));

    if (storedQuestions) {
      // Obtenemos los datos del balotario
      const balotarioData = JSON.parse(
        localStorage.getItem("balotario")
      ).filter((bal) => bal.id === Number(balotarioId))[0];

      // Obtenemos los números de pregunta
      const questionNumbers = storedQuestions.map(({ question }) =>
        question.match(/^\d+/) ? question.match(/^\d+/)[0] : ""
      );

      setQuestionNumbers(questionNumbers);

      // Creamos el objeto para el cuestionario
      const questionnaireData = {
        titulo: balotarioData.tema,
        descripcion: balotarioData.descripcion,
        preguntaId: Number(balotarioId),
        clavesPreguntas: storedQuestions.map(
          (__, index) => `Pregunta ${questionNumbers[index]}`
        ),
        tiempos: storedQuestions.map((question) => Number(question.time)),
        requeridos: storedQuestions.map((question) => question.required),
      };

      // Llamamos a setQuestionnaireData para establecer la información del cuestionario
      setQuestionnaireData(questionnaireData);
      setQuestions(storedQuestions);
    }
  }, [balotarioId, setQuestionnaireData]);

  // Manejar cambio en la alternativa correcta
  const handleAlternativeChange = (questionKey, alternativeKey) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionKey].correct = alternativeKey;

      // Guardar de nuevo en el localStorage
      localStorage.setItem("approvedList", JSON.stringify(updatedQuestions));
      autosavedRef.current.textContent = `Autoguardado a las ${formattedDate}`;

      // Llamar a setQuestionnaireData con los datos actualizados
      setQuestionnaireData({
        ...questionnaireData,
        clavesPreguntas: updatedQuestions.map(
          (__, index) => `Pregunta ${questionNumbers[index]}`
        ), // Solo las claves
      });

      return updatedQuestions;
    });
  };

  // Manejar clic en la opción de editar
  const handleEditClick = (index) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
    console.log(questionnaireData);
  };

  // Manejar modificación del tiempo de la pregunta
  const handleTimeChange = (index, newTime) => {
    setQuestions((prevQuestions) => {
      // Crear una copia de las preguntas y actualizar el tiempo
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].time = newTime;

      // Guardar de nuevo en el localStorage
      localStorage.setItem("approvedList", JSON.stringify(updatedQuestions));

      // Llamar a setQuestionnaireData con los datos actualizados
      const updatedQuestionnaireData = {
        ...questionnaireData,
        tiempos: updatedQuestions.map((question) => Number(question.time)),
      };

      setQuestionnaireData(updatedQuestionnaireData);

      // Retornar las preguntas actualizadas para actualizar el estado
      return updatedQuestions;
    });
  };

  // Manejar modificación del campo "requerido"
  const handleRequiredChange = (index) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].required = !updatedQuestions[index].required;

      // Guardar de nuevo en el localStorage
      localStorage.setItem("approvedList", JSON.stringify(updatedQuestions));

      // Llamar a setQuestionnaireData con los datos actualizados
      setQuestionnaireData({
        ...questionnaireData,
        clavesPreguntas: updatedQuestions.map((question) => question.question), // Solo las claves
      });

      return updatedQuestions;
    });
  };

  // Manejar eliminación de la pregunta
  const handleDeleteQuestion = (index) => {
    // Maneja la eliminación desde el consentimiento del usuario
    if (!localStorage.getItem("approvedDeletes")) {
      const validateDelete = confirm(
        "¿Eliminar elemento?, si selecciona sí ya no se le volverá a preguntar"
      );

      if (!validateDelete) {
        return;
      }
      localStorage.setItem("approvedDeletes", true);
    }

    setQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.filter((_, i) => i !== index);

      // Guardar de nuevo en el localStorage
      localStorage.setItem("approvedList", JSON.stringify(updatedQuestions));

      // Llamar a setQuestionnaireData con los datos actualizados
      setQuestionnaireData({
        ...questionnaireData,
        clavesPreguntas: updatedQuestions.map((question) => question.question), // Solo las claves
      });

      return updatedQuestions;
    });
  };

  return (
    <div>
      {questions.map((actual, index) => {
        const actualQuestionN = index + 1;
        const questionDelay = 0.3 + index * 0.1;

        return (
          <motion.section
            className={styles["question-container"]}
            key={index}
            {...normalAnimation(questionDelay)}
          >
            <section className={styles.header}>
              <h1>Pregunta N° {actualQuestionN}</h1>
              <div className={styles["options-container"]}>
                <Toggle
                  text="Requerido"
                  checked={actual.required || false} // Asegurarse de que sea un valor booleano
                  onChange={() => handleRequiredChange(index)}
                />

                <button
                  className={`${styles["edit-btn"]} ${styles["button"]} ${
                    selectedQuestion === index ? styles.active : ""
                  }`}
                  onClick={() => handleEditClick(index)}
                >
                  <img src={editBtn} alt="editBtn" />
                </button>

                <button
                  className={`${styles["dlt-btn"]} ${styles["button"]}`}
                  onClick={() => handleDeleteQuestion(index)}
                >
                  <img src={closeBtn} alt="dltBtn" />
                </button>
              </div>
            </section>
            <section
              className={`${styles.body} ${
                selectedQuestion === index ? styles.active : ""
              }`}
            >
              <div className={styles["time-container"]}>
                <label htmlFor={`time${index}`}>Tiempo (en segundos):</label>
                <input
                  id={`time${index}`}
                  name="time"
                  type="number"
                  value={actual.time || ""}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                />
              </div>
              <div className={styles.question}>
                <h1>{actual.question}</h1>
                <div
                  className={`${styles.alternatives} ${
                    selectedQuestion === index ? styles.active : ""
                  }`}
                  ref={(el) => (refs.current[index] = el)}
                >
                  {actual.alternatives.map(([key, alternative]) => (
                    <div key={key}>
                      <div className={styles["input-container"]}>
                        <input
                          type="radio"
                          name={index}
                          value={key}
                          checked={key === actual.correct}
                          onChange={() => handleAlternativeChange(index, key)}
                        />
                      </div>
                      <label>{alternative}</label>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </motion.section>
        );
      })}
    </div>
  );
}

export default QstReviewContainer;
