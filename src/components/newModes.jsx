import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "../styles/components/newModes.module.scss";

import normalAnimation from "./animation/normalAnimation.js";

const NewModes = ({ modeNames }) => {
  const [activeMode, setActiveMode] = useState(Object.keys(modeNames)[0]);

  function changeMode(newMode) {
    if (newMode !== activeMode) {
      setActiveMode(newMode);
    }
  }

  return (
    <motion.div className={styles.newModes}
    {...normalAnimation(0.1)}>
      {/* Barra de navegación para cambiar entre modos */}
      <nav className={styles["modes-navBar"]}>
        {Object.keys(modeNames).map((modeName) => (
          <button
            style={{ color: "white" }}
            key={modeName}
            className={
              activeMode === modeName
                ? styles["selected"]
                : styles["non-selected"]
            }
            onClick={() => changeMode(modeName)}
          >
            <p>{modeName}</p>
          </button>
        ))}
      </nav>

      {/* Renderización del modo activo */}
      <AnimatePresence>
        <motion.div
          key={activeMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {modeNames[activeMode]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default NewModes;
