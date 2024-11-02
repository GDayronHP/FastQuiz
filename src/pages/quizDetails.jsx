import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import QuizStyle from "../components/quizStyle";

import styles from"../styles/quizDetails.module.css";

const QuizDetails = () => {
  return (
    <React.Fragment>
      {/* Animación del título al entrar */}
      <motion.h1
        initial={{
          opacity: 0,
          transform: "translateY(15px)",
        }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{
          duration: 0.8,
          type: "spring",
          delay: 0.1,
        }}
      >
        Describe las características de tu formulario
      </motion.h1>

      <section className={styles["question-forms"]}>
        <motion.div
          className={styles["questions-qty"]}
          initial={{
            opacity: 0,
            transform: "translateY(15px)",
          }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{
            duration: 0.8,
            type: "spring",
            delay: 0.2,
          }}
        >
          <label htmlFor="cantidad">Cantidad de preguntas</label>
          <motion.input
            type="number"
            id="cantidad"
            whileFocus={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        <motion.div
          className={styles["questions-type"]}
          initial={{
            opacity: 0,
            transform: "translateY(15px)",
          }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{
            duration: 0.8,
            type: "spring",
            delay: 0.3,
          }}
        >
          <label htmlFor="tipo">Tipo de preguntas</label>
          <motion.select
            id="tipo"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <option value="default">Por defecto</option>
            <option value="simple">Simple</option>
            <option value="multiple">Multiple</option>
            <option value="verdadero_falso">Verdadero/Falso</option>
            <option value="abierto">Abierta</option>
          </motion.select>
        </motion.div>
      </section>

      {/* Animación de entrada de las imágenes de QuizStyle */}
      <motion.div
        initial={{
          opacity: 0,
          transform: "translateY(15px)",
        }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{
          duration: 0.8,
          type: "spring",
          delay: 0.4,
        }}
      >
        <QuizStyle
          cantidad={2}
          srcs={[
            "https://info.netcommerce.mx/wp-content/uploads/2023/08/representaciones-experiencia-usuario-diseno-interfaz-edited-1-scaled.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsj1_A2D-DN9riSYKn_xbTGvjm-Y-KOlx_e3nWmoZTXdCu1KzyQa-PmOlhi8K_11HLPgM&usqp=CAU",
          ]}
        />
      </motion.div>
      <Link className={styles["continueBtn"]} to="/quizManagement">
        <button>Continuar</button>
      </Link>
    </React.Fragment>
  );
};

export default QuizDetails;
