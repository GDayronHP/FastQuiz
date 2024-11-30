import React from "react";
import { motion } from "framer-motion";

/* Components */

import BackTo from "../components/backTo";
import QuizStyle from "../components/quizStyle";
import Modes from "../components/modes.jsx";

/* ----------- */

import styles from "../styles/quizDetails.module.scss";

const QuizDetails = () => {
  return (
    <div className={styles["quiz-details"]}>
      <div className={styles.forms}>
        {/* Animación del título al entrar */}
        <motion.div
          className={styles.title}
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
          <h1>Describe las características de tu formulario</h1>
        </motion.div>
        <p className={styles.description}>
          Personaliza tu formulario con un tema y descripción únicos
        </p>

        <section className={styles["question-forms"]}>
          {/* Campo para el tema */}
          <motion.div
            className={styles["form-topic"]}
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
            <label htmlFor="tema">Tema del formulario</label>
            <motion.input
              type="text"
              id="tema"
              placeholder="Ingresa el tema"
              transition={{ duration: 0.2 }}
            />
          </motion.div>

          {/* Campo para la descripción */}
          <motion.div
            className={styles["form-description"]}
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
            <label htmlFor="descripcion">Descripción</label>
            <motion.textarea
              id="descripcion"
              placeholder="Escribe una breve descripción"
              rows="4"
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        </section>
      </div>

      {/* Modos deshabilitados */}
      {/* <motion.div
        className={styles.slideContainer}
        initial={{
          opacity: 0,
          transform: "translateY(15px)",
        }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{
          duration: 0.8,
          type: "spring",
          delay: 0.5,
        }}
      >
        <Modes enabled={false} data={{ type: "file", value: "Ejemplo123" }} />
      </motion.div> */}

      {/* Animación de entrada de las imágenes de QuizStyle */}
      <motion.div
        className={styles["styles-container"]}
        initial={{
          opacity: 0,
          transform: "translateY(15px)",
        }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{
          duration: 0.8,
          type: "spring",
          delay: 0.6,
        }}
      >
        <QuizStyle
          srcs={[
            "https://png.pngtree.com/thumb_back/fh260/background/20210803/pngtree-modern-simple-elegant-dark-blue-landing-page-website-background-image_756950.jpg",
            "https://png.pngtree.com/thumb_back/fh260/background/20210803/pngtree-modern-simple-elegant-red-landing-page-website-background-image_756911.jpg",
            "https://plus.unsplash.com/premium_photo-1701590725747-ac131d4dcffd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bCVDMyVBRG5lYXMlMjBvbmR1bGFkYXN8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1710162734135-8dc148f53abe?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvbmRvJTIwZGVsJTIwc2l0aW8lMjB3ZWJ8ZW58MHx8MHx8fDA%3D",
          ]}
        />
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          translateY: 15,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        transition={{
          duration: 0.8,
          type: "spring",
          delay: 0.7,
        }}
      >
        <BackTo backTo={"/principalPage"} nextTo={"/quizManagement"} />
      </motion.div>
    </div>
  );
};

export default QuizDetails;
