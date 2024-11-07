import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import nextRow from '../assets/icons/nextRow.svg';
import close from '../assets/icons/close.svg';

import styles from '../styles/principalPage.module.scss';

const FileAlert = ({ hideAdvise }) => {
  
  function handleFileInput() {
    let fileInput = document.querySelector('#fileInput');
    fileInput.click();
    hideAdvise();
  }

  return (
    <React.Fragment>
      <AnimatePresence>
        <motion.div
          className={styles["file-alert"]}
          initial={{ opacity: 0, scale: 0.5, transform: "translate(-50%,0%)" }}
          animate={{ opacity: 1, scale: 1, transform: "translate(-50%,-50%)" }}
          exit={{ opacity: 0, scale: 0.5, transform: "translateY(50%)"}}
          transition={{ type: "spring", duration: 0.2 }}
        >
          <p className={styles.infoTxt}>
            ¿Das tu consentimiento para el uso de nuestra IA?, te recomendamos
            revisar el archivo en caso de que tengas información sensible.
          </p>
          <p className={styles.moreInfo}>
            Si deseas más información puedes leer
            <Link to="/conditions"> Términos y condiciones</Link>
          </p>
          <button className={styles.continueBtn} onClick={ handleFileInput }>
            <p>Continuar</p>
            <img className={styles.nextRow} src={ nextRow } alt="Next" />
          </button>
          <img
            onClick={hideAdvise}
            className={styles.closeBtn}
            src= { close }
            alt="Close"
          />
        </motion.div>
      </AnimatePresence>
    </React.Fragment>
  );
};

export default FileAlert;
