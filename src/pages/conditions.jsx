import React from "react";
import styles from "../styles/conditions.module.scss";

function Conditions() {
  return (
    <div className={styles.conditions}>
      <div className={styles["terms-container"]}>
        <p>
          Estos términos y condiciones rigen el uso de nuestra Inteligencia
          Artificial (IA) para la lectura y procesamiento de archivos. Al
          utilizar nuestros servicios, aceptas estar de acuerdo con los términos
          y condiciones detallados a continuación.
        </p>

        <h2>1. Permisos y Consentimiento del Usuario</h2>
        <p>
          El usuario debe otorgar consentimiento explícito antes de que
          cualquier archivo sea procesado por nuestra IA. Al subir un archivo,
          el usuario garantiza que tiene los derechos y permisos necesarios para
          que dicho archivo sea procesado.
        </p>
        <p>
          No recopilamos ni procesamos archivos sin el consentimiento del
          usuario, y este tiene la libertad de retirar su consentimiento en
          cualquier momento, excepto en los casos donde el procesamiento ya se
          haya completado.
        </p>

        <h2>2. Propiedad de los Archivos</h2>
        <p>
          El usuario conserva todos los derechos sobre los archivos que sube y
          procesa mediante nuestra IA. Nosotros no reclamamos derechos de
          propiedad ni de distribución sobre los archivos subidos.
        </p>
        <p>
          Sin embargo, el usuario concede a la plataforma una licencia limitada,
          temporal y no exclusiva para procesar los archivos mientras la IA esté
          ejecutando las operaciones solicitadas por el usuario.
        </p>

        <h2>3. Privacidad y Confidencialidad</h2>
        <p>
          Nos comprometemos a proteger la privacidad de los archivos subidos.
          Toda la información procesada a través de nuestra IA está sujeta a
          estrictas medidas de seguridad, incluyendo el uso de cifrado en
          tránsito y en reposo.
        </p>
        <p>
          No compartiremos ni divulgaremos los archivos o los datos resultantes
          del procesamiento sin el consentimiento explícito del usuario, a menos
          que sea requerido por ley.
        </p>

        <h2>4. Cumplimiento de Normativas</h2>
        <p>
          Cumplimos con las normativas de protección de datos vigentes,
          incluyendo el Reglamento General de Protección de Datos (GDPR) en
          Europa y la Ley de Privacidad del Consumidor de California (CCPA).
          Esto implica que el usuario tiene derecho a acceder, modificar o
          eliminar los archivos que ha subido, y tiene derecho a saber cómo se
          están procesando sus datos.
        </p>

        <h2>5. Uso Ético y Responsable</h2>
        <p>
          El usuario se compromete a no subir archivos que contengan material
          ilegal, difamatorio, fraudulento, malicioso, o que infrinja los
          derechos de propiedad intelectual de terceros. El uso de nuestra IA
          para procesar este tipo de archivos está estrictamente prohibido y
          puede resultar en la suspensión del servicio.
        </p>
        <p>
          No nos hacemos responsables del contenido de los archivos subidos por
          los usuarios. Cada usuario es responsable del contenido que decide
          cargar y procesar.
        </p>

        <h2>6. Limitaciones Técnicas</h2>
        <p>
          Aunque nos esforzamos por ofrecer un servicio de alta calidad, pueden
          existir limitaciones técnicas que afecten el tipo, tamaño o formato de
          los archivos que pueden ser procesados por nuestra IA. Se recomienda a
          los usuarios revisar las especificaciones de archivo antes de intentar
          subirlos.
        </p>
        <p>
          El servicio puede no estar disponible temporalmente debido a
          mantenimiento o actualizaciones. En tales casos, notificaremos a los
          usuarios cuando sea posible.
        </p>

        <h2>7. Responsabilidad Limitada</h2>
        <p>
          No seremos responsables de cualquier daño directo, indirecto,
          incidental o consecuente que resulte del uso de nuestra IA, incluyendo
          pero no limitándose a, la pérdida de archivos, la pérdida de ingresos
          o el daño a la reputación.
        </p>
        <p>
          El uso de nuestra IA es bajo el riesgo exclusivo del usuario.
          Proveemos el servicio "tal como está" y no garantizamos la precisión,
          disponibilidad ni resultados específicos derivados del uso de la IA.
        </p>

        <h2>8. Terminación del Servicio</h2>
        <p>
          Nos reservamos el derecho de terminar o suspender el acceso a nuestra
          IA en cualquier momento, sin previo aviso, si determinamos que se han
          violado estos términos y condiciones, o si el uso del servicio
          representa un riesgo para la plataforma o para otros usuarios.
        </p>

        <h2>9. Cambios en los Términos y Condiciones</h2>
        <p>
          Podemos actualizar estos términos y condiciones de vez en cuando para
          reflejar cambios en nuestras políticas o servicios. Los usuarios serán
          notificados sobre cambios importantes en los términos, y se espera que
          los revisen periódicamente.
        </p>
        <p>
          El uso continuo de nuestro servicio después de la publicación de los
          cambios constituirá la aceptación de los términos revisados.
        </p>

        <h2>10. Contacto</h2>
        <p>
          Si tienes alguna pregunta sobre estos términos y condiciones o sobre
          el uso de nuestra IA, puedes ponerte en contacto con nosotros a través
          de nuestro correo electrónico de soporte:{" "}
          <a href="joseph.huayra@tecsup.edu.pe">joseph.huayra@tecsup.edu.pe</a>.
        </p>
      </div>
    </div>
  );
}

export default Conditions;
