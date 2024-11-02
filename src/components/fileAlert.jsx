import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import nextRow from '../assets/icons/nextRow.svg';
import close from '../assets/icons/close.svg';

import styles from '../styles/principalPage.module.css';

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
          className={styles['file-alert']} 
          initial={{ opacity: 0, scale: 0.5, transform: "translate(-50%,0%)" }}
          animate={{ opacity: 1, scale: 1, transform: "translate(-50%,-50%)" }}
          exit={{ opacity: 0, scale: 0.5, transform: "translateY(50%)"}}
          transition={{ type: "spring", duration: 0.2 }}
        >
          <p className={styles['info-txt']}>
            ¿Das tu consentimiento para el uso de nuestra IA? Te recomendamos
            revisar el archivo en caso de que tengas información sensible.
          </p>
          <p className={styles['more-info']}>
            Si deseas más información puedes leer
            <Link to="/conditions"> Términos y condiciones</Link>
          </p>
          <button className={styles['continue-btn']} onClick={handleFileInput}>
            <p>Continuar</p>
            <img className={styles['next-row']} src={nextRow} alt="Next" />
          </button>
          <img
            onClick={hideAdvise}
            className={styles['close-btn']}
            src={close}
            alt="Close"
          />
        </motion.div>
      </AnimatePresence>
    </React.Fragment>
  );
};

export default FileAlert;
