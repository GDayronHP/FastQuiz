import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

/* Components */
import BackTo from "../components/backTo";
import QuizStyle from "../components/quizStyle";
import Modes from "../components/modes.jsx";
import { useMyContext } from "../components/store/ContextApi";
import { useNavigate, useParams } from "react-router-dom";
import TeacherService from "../services/teacherService.js";

/* ----------- */
import styles from "../styles/quizDetails.module.scss";

const QuizDetails = () => {
  // Balotario con todos los datos necesarios para la generación de cuestionarios: Preguntas, alternativas y respuestas correctas.
  const { token } = useMyContext();
  const { balotarioId } = useParams();
  const tema = useRef(null);
  const descripcion = useRef(null);
  const estilo = useRef(null);

  const balotario = JSON.parse(localStorage.getItem("balotario")).filter(
    (bal) => bal.id === Number(balotarioId)
  )[0];

  const [data, setData] = useState({
    preguntas: [],
    alternativas: [],
    correctas: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    console.log(
      "Balotario desde localStorage:",
      JSON.parse(localStorage.getItem("balotario"))
    );
  }, []);

  // Definir la función que se llama al cargar el componente
  const defineData = async () => {
    try {
      const storedBalotarios = JSON.parse(localStorage.getItem("balotario"));
      const selectedBalotario = storedBalotarios.find(
        (bal) => bal.id === parseInt(balotarioId)
      );

      if (!selectedBalotario) {
        throw new Error("No se encontró el balotario");
      }

      const data = await TeacherService.getQuestionData(
        selectedBalotario,
        balotarioId,
        token
      );
      setData(data);

      console.log("Datos combinados:", data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    defineData();
  }, [balotarioId, token]);

  const defineAdditionalData = () => {
    if (tema.current.value.length > 0 && descripcion.current.value.length > 0) {
      const data2 = {
        tema: tema.current.value,
        descripcion: descripcion.current.value,
        estilo: estilo.current,
        ...balotario,
      };

      const storedBalotarios =
        JSON.parse(localStorage.getItem("balotario")) || [];

      if (storedBalotarios.length > 0) {
        storedBalotarios[0] = { ...storedBalotarios[0], ...data2 };
      } else {
        storedBalotarios.push(data2);
      }

      // Guardar el array modificado de nuevo en localStorage
      localStorage.setItem("balotario", JSON.stringify(storedBalotarios));
      navigate(`/quizManagement/${balotarioId}`);
    } else {
      alert("Debes ingresar un tema y una descripción.");
    }
  };

  return (
    <div className={styles["quiz-details"]}>
      {/* {data.preguntas.length > 0 ? (
        data.preguntas.map((pregunta, index) => (
          <form key={index}>
            <label>{pregunta}</label>
            <div id={`question-${index}`}>
              {data.alternativas[index] &&
                Object.entries(data.alternativas[index]).map(
                  ([key, value], altIndex) => (
                    <div key={altIndex}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={value}
                        id={`option-${index}-${altIndex}`}
                        // Compara con el valor de la respuesta correcta
                        defaultChecked={
                          key === data.correctas[`Respuesta ${index + 1}`]
                        }
                      />
                      <label htmlFor={`option-${index}-${altIndex}`}>
                        {value}
                      </label>
                    </div>
                  )
                )}
            </div>
          </form>
        ))
      ) : (
        <p>No hay preguntas disponibles.</p>
      )} */}

      <div className={styles.forms}>
        <motion.div
          className={styles.title}
          initial={{ opacity: 0, transform: "translateY(15px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.8, type: "spring", delay: 0.1 }}
        >
          <h1>Describe las características de tu formulario</h1>
        </motion.div>
        <motion.p
          className={styles.description}
          initial={{ opacity: 0, transform: "translateY(15px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
        >
          Personaliza tu formulario con un tema y descripción únicos
        </motion.p>

        <section className={styles["question-forms"]}>
          <motion.div
            className={styles["form-topic"]}
            initial={{ opacity: 0, transform: "translateY(15px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.8, type: "spring", delay: 0.3 }}
          >
            <label htmlFor="tema">Tema del formulario</label>
            <motion.input
              type="text"
              id="tema"
              placeholder="Ingresa el tema"
              transition={{ duration: 0.2 }}
              ref={tema}
            />
          </motion.div>

          <motion.div
            className={styles["form-description"]}
            initial={{ opacity: 0, transform: "translateY(15px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.8, type: "spring", delay: 0.4 }}
          >
            <label htmlFor="descripcion">Descripción</label>
            <motion.textarea
              id="descripcion"
              placeholder="Escribe una breve descripción"
              rows="4"
              transition={{ duration: 0.2 }}
              ref={descripcion}
            />
          </motion.div>
        </section>
      </div>

      <motion.div
        className={styles["styles-container"]}
        initial={{ opacity: 0, transform: "translateY(15px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 0.8, type: "spring", delay: 0.6 }}
      >
        <QuizStyle
          srcs={[
            "https://png.pngtree.com/thumb_back/fh260/background/20210803/pngtree-modern-simple-elegant-dark-blue-landing-page-website-background-image_756950.jpg",
            "https://png.pngtree.com/thumb_back/fh260/background/20210803/pngtree-modern-simple-elegant-red-landing-page-website-background-image_756911.jpg",
            "https://plus.unsplash.com/premium_photo-1701590725747-ac131d4dcffd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bCVDMyVBRG5lYXMlMjBvbmR1bGFkYXN8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1710162734135-8dc148f53abe?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvbmRvJTIwZGVsJTIwc2l0aW8lMjB3ZWJ8ZW58MHx8MHx8fDA%3D",
          ]}
          estiloRef={estilo}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, translateY: 15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.8, type: "spring", delay: 0.7 }}
      >
        <BackTo
          backTo={"/principalPage"}
          nextTo={null}
          action={defineAdditionalData}
        />
      </motion.div>
    </div>
  );
};

export default QuizDetails;
