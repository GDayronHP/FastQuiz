import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "../styles/components/mode.module.scss";

import upload from "../assets/icons/upload.svg";

const Modes = ({ showAdvise, enabled, data }) => {

  const [mode, setMode] = useState("file-mode");
  const [fileName, setFileName] = useState(null);

  function changeMode(newMode) {
    if (newMode !== mode) {
      setMode(newMode);
    }
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  }

  return (
    <React.Fragment>
      {enabled ? (
        <nav className={styles["modes-navBar"]}>
          <ul>
            <button
              className={
                mode === "file-mode"
                  ? styles["selected"]
                  : styles["non-selected"]
              }
              onClick={() => changeMode("file-mode")}
            >
              Por archivo
            </button>
            <button
              className={
                mode === "prompt-mode"
                  ? styles["selected"]
                  : styles["non-selected"]
              }
              onClick={() => changeMode("prompt-mode")}
            >
              Por prompt
            </button>
          </ul>
        </nav>
      ) : (
        ""
      )}
      {data ? (
        // Si hay datos presentes
        <AnimatePresence>
          {data.type === "file" ? (
            <motion.div
              className={styles["file-container"]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                accept=".pdf, .ppt, .doc, .docx, .txt"
                disabled
              />
              <img src={upload} alt="Upload icon" />
              <p>
                Archivo seleccionado: <span style={{ textAlign: "center" }}>{data.value}</span>
              </p>
            </motion.div>
          ) : (
            <motion.textarea
              className={styles["prompt-container"]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              placeholder="Escribe un prompt..."
              value={data.value}
              disabled
            />
          )}
        </AnimatePresence>
      ) : (
        // Si no hay datos presentes
        <AnimatePresence>
          {mode === "file-mode" && (
            <motion.div
              className={styles["file-container"]}
              onClick={showAdvise}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                accept=".pdf, .ppt, .doc, .docx, .txt"
                onChange={handleFileChange}
              />
              <img src={upload} alt="Upload icon" />
              <p>
                {fileName ? (
                  <span style={{ textAlign: "center" }}>{fileName}</span>
                ) : (
                  <>
                    <span>Sube</span> o <span>arrastra</span> un archivo .pdf,
                    .ppt, .doc, .docx, .txt
                  </>
                )}
              </p>
            </motion.div>
          )}

          {mode === "prompt-mode" && (
            <motion.textarea
              className={styles["prompt-container"]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              placeholder="Escribe un prompt..."
            />
          )}
        </AnimatePresence>
      )}
    </React.Fragment>
  );
};

export default Modes;
