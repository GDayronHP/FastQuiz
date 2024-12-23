import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../components/loginForm";
import { useMyContext } from "../components/store/ContextApi";
import styles from "../styles/login.module.scss";
import wave1 from "../assets/images/wave1.svg";
import wave2 from "../assets/images/wave2.svg";
import wave3 from "../assets/images/wave3.svg";
import logRegImage from "../assets/images/Login-Register-Image.webp";
import nextBtn from "../assets/icons/nextBtn.png";
import googleIcon from "../assets/icons/Login-Register-Form/google.svg";
import emailIcon from "../assets/icons/Login-Register-Form/email.svg";
import facebookIcon from "../assets/icons/Login-Register-Form/facebook.svg";

const apiUrl = import.meta.env.VITE_API_URL;

const Index = () => {

  const [hide, setHide] = useState(false); // Estado para ocultar o mostrar formularios

  const handleClick = () => {
    setHide(!hide); // Alterna entre mostrar/ocultar el formulario de inicio y registro
  };

  return (
    <div className={styles.login}>
      {/* Fondo con imágenes de olas */}
      <div className={styles["bg-images"]}>
        <img src={wave1} alt="" />
        <img src={wave2} alt="" />
        <img src={wave3} alt="" />
      </div>

      {/* Formulario de inicio de sesión */}
      <section
        className={`${styles["login-card"]} ${
          hide ? styles.hideForm : styles.showForm
        }`}
      >
        <div className={styles["login-information"]}>
          <h1>INICIAR SESIÓN</h1>
          <h2>Iniciar Sesión en FastQuiz</h2>
          <Login
            src={googleIcon}
            alt={"google"}
            text={"Continuar con Google"}
            to={`${apiUrl}/oauth2/authorization/google`}
          />
          <Login src={emailIcon} alt={"email"} text={"Continuar con Email"} />
          <Login
            src={facebookIcon}
            alt={"facebook"}
            text={"Continuar con Facebook"}
            to={""}
          />
          <p>¿No posees una cuenta?</p>
          <div className={styles.toRegister} onClick={handleClick}>
            <img className={styles.icon} src={nextBtn} alt="nextBtn" />
            <p>Registrarse</p>
          </div>
        </div>
        <div className={styles["login-image"]}>
          <img src={logRegImage} alt="LoginImage" />
        </div>
      </section>

      {/* Formulario de registro */}
      <section
        className={`${styles["register-card"]} ${
          hide ? styles.showForm : styles.hideForm
        }`}
      >
        <div className={styles["register-information"]}>
          <h1>REGISTRARSE</h1>
          <h2>Bienvenido a Fastquiz</h2>
          <h3>Crea una cuenta gratis en un solo paso</h3>
          <Login
            src={googleIcon}
            alt={"google"}
            text={"Continuar con Google"}
            to={`${apiUrl}/oauth2/authorization/google`}
          />
          <Login src={emailIcon} alt={"email"} text={"Continuar con Email"} />
          <Login
            src={facebookIcon}
            alt={"facebook"}
            text={"Continuar con Facebook"}
            to={""}
          />
          <p>¿Ya posees una cuenta?</p>
          <div className={styles.toLogin} onClick={handleClick}>
            <img className={styles.icon} src={nextBtn} alt="nextBtn" />
            <pattern>Iniciar Sesión</pattern>
          </div>
        </div>
        <div className={styles["register-image"]}>
          <img src={logRegImage} alt="LoginImage" />
        </div>
      </section>
    </div>
  );
};

export default Index;
