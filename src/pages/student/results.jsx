import React from "react";
import styles from "../../styles/student/results.module.scss";

import normalAnimation from "../../components/animation/normalAnimation.js";

import { motion } from "framer-motion";
function Results() {
  // Datos de ejemplo
  const score = 40; // Puntaje
  const streak = 6; // Racha
  const correct = 10; // Preguntas correctas
  const incorrect = 0; // Preguntas incorrectas
  const tema = "Diseño web"; // Tema de la prueba
  const time = "01:30"; // Tiempo transcurrido

  console.log({ ...normalAnimation });

  // Lógica para el mensaje basado en el puntaje
  const message =
    score > 80 ? "¡FELICIDADES!" : score > 50 ? "¡BIEN HECHO!" : "SIGUE ASÍ";

  return (
    <div className={styles.container}>
      <motion.header {...normalAnimation(0.1)} className={styles.header}>
        <h1>Evaluación del estudiante</h1>
        <h2>Tema: {tema}</h2>
      </motion.header>
      <main>
        <motion.h1
          initial={{
            opacity: 0,
            y: -150,
            scale: 1.2,
            textShadow: "0 0 150px #ffe100",
            letterSpacing: "20px",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            textShadow: [
              "0 0 150px #ffe100",
              "0 0 250px #ffe100",
              "0 0 40px rgba(255, 225, 0, 0.75)",
            ],
            letterSpacing: "5px",
          }}
          transition={{
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0,
          }}
          className={styles.message}
        >
          {message}
        </motion.h1>
        <motion.p
          initial={{
            opacity: 0,
            y: 100,
            scale: 1.2,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.5,
          }}
          className={styles.streak}
        >
          ¡Racha de {streak} preguntas!
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
            scale: 3,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 1.5,
          }}
          className={styles.resultsBox}
        >
          <table className={styles.resultsTable}>
            <tbody>
              <tr>
                <th>Puntaje Final</th>
                <td>{score}%</td>
              </tr>
              <tr>
                <th>Tiempo transcurrido</th>
                <td>{time}</td>
              </tr>
              <tr>
                <th>Preguntas correctas</th>
                <td>{correct}</td>
              </tr>
              <tr>
                <th>Preguntas incorrectas</th>
                <td>{incorrect}</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </main>
      <motion.div {...normalAnimation(0.2)} className={styles.actions}>
        <div className={styles.showAnswersButton}>
          <button>Mostrar respuestas</button>
          <svg
            width="22"
            height="43"
            viewBox="0 0 22 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.6212 22.7739L8.25005 32.9093L5.65771 30.3759L14.7327 21.5072L5.65771 12.6384L8.25005 10.105L18.6212 20.2405C18.9649 20.5765 19.158 21.0321 19.158 21.5072C19.158 21.9823 18.9649 22.4379 18.6212 22.7739Z"
              fill="black"
            />
          </svg>
        </div>
        <div className={styles.feedbackButton}>
          <button>Crear feedback con IA</button>
          <svg
            width="22"
            height="43"
            viewBox="0 0 22 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.6212 22.7739L8.25005 32.9093L5.65771 30.3759L14.7327 21.5072L5.65771 12.6384L8.25005 10.105L18.6212 20.2405C18.9649 20.5765 19.158 21.0321 19.158 21.5072C19.158 21.9823 18.9649 22.4379 18.6212 22.7739Z"
              fill="white"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

export default Results;
