import React, { useState } from "react";
import styles from "../styles/components/promptGenerator.module.scss";
import listPlus from "../assets/icons/listPlus.svg";

const PromptGenerator = ({ inputs, setInputs }) => {
  const [promptTemplates, setPromptTemplates] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(
    "Por favor, deme {cantidadPreguntas} preguntas {dificultad} sobre {tema} con {alternativas} alternativas de cada pregunta y su respuesta correcta intercalada."
  );
  const [currentSelectedPrompt, setCurrentSelectedPrompt] = useState(selectedPrompt);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleTemplates = () => {
    setPromptTemplates(!promptTemplates);
  };

  const handleCloseTemplates = () => {
    setPromptTemplates(false);
  };

  const handleSelectPrompt = (prompt) => {
    if (prompt === selectedPrompt) {
      alert("Por favor, seleccione otro prompt.");
      return;
    }
    
    setSelectedPrompt(prompt);
    setCurrentSelectedPrompt(prompt);

    // Añade la clase de destello
    const createPromptDiv = document.getElementById("createPrompt");
    if (createPromptDiv) {
      createPromptDiv.classList.add(styles.flash);

      // Remueve la clase de destello después de la animación
      setTimeout(() => {
        createPromptDiv.classList.remove(styles.flash);
      }, 1000);
    }
  };

  const prompts = [
    "Por favor, cree {cantidadPreguntas} preguntas {dificultad} sobre {tema} con {alternativas} alternativas de respuesta intercaladas.",
    "Genera {cantidadPreguntas} preguntas {dificultad} sobre {tema} con {alternativas} alternativas por pregunta, asegurando que la respuesta correcta sea aleatoria.",
    "Diseña un cuestionario con {cantidadPreguntas} preguntas {dificultad} sobre {tema}, cada una con {alternativas} alternativas.",
    "Crea {cantidadPreguntas} preguntas {dificultad} sobre {tema} con {alternativas} alternativas por pregunta y las respuestas correctas distribuidas.",
    "Proporciona {cantidadPreguntas} preguntas {dificultad} sobre {tema} con {alternativas} alternativas de respuesta, asegurando una correcta aleatoria.",
  ];

  const renderPrompt = () => {
    const parts = selectedPrompt.split(/(\{cantidadPreguntas\}|\{dificultad\}|\{tema\}|\{alternativas\})/);

    return (
      <p className={styles.promptText}>
        {parts.map((part, index) => {
          switch (part) {
            case "{cantidadPreguntas}":
              return (
                <input
                  key={index}
                  type="number"
                  name="cantidadPreguntas"
                  placeholder="10"
                  value={inputs.cantidadPreguntas}
                  onChange={handleChange}
                  className={styles.input}
                  required
                  min="1"
                />
              );
            case "{dificultad}":
              return (
                <select
                  key={index}
                  name="dificultad"
                  value={inputs.dificultad}
                  onChange={handleChange}
                  className={styles.select}
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="sencillas">sencillas</option>
                  <option value="medias">medias</option>
                  <option value="difíciles">difíciles</option>
                </select>
              );
            case "{tema}":
              return (
                <input
                  key={index}
                  type="text"
                  name="tema"
                  placeholder="Arduino"
                  value={inputs.tema}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              );
            case "{alternativas}":
              return (
                <select
                  key={index}
                  name="alternativas"
                  value={inputs.alternativas}
                  onChange={handleChange}
                  className={styles.selectNumber}
                  required
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              );
            default:
              return part;
          }
        })}
      </p>
    );
  };

  return (
    <>
      <div className={styles.createPrompt} id="createPrompt">
        {renderPrompt()}
        <button
          className={styles.moreTemplatesBtn}
          title="Más plantillas"
          onClick={handleToggleTemplates}
        >
          <img src={listPlus} alt="Más plantillas" />
        </button>
      </div>
      <aside
        className={`${styles.promptTemplates} ${
          promptTemplates
            ? styles.showPromptTemplates
            : styles.hidePromptTemplates
        }`}
      >
        {prompts.map((prompt, index) => (
          <div
            key={index}
            className={`${styles.prompt} ${currentSelectedPrompt === prompt ? styles.selectedPrompt : ''}`}
            onClick={() => handleSelectPrompt(prompt)}
          >
            <p>{prompt}</p>
            {currentSelectedPrompt === prompt && (
              <span className={styles.selectedLabel}>Selected</span>
            )}
          </div>
        ))}
        <button
          className={styles.closeTemplatesBtn}
          onClick={handleCloseTemplates}
        >
          Cerrar
        </button>
      </aside>
    </>
  );
};

export default PromptGenerator;
