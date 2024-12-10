import axios from "axios";

const QUESTIONNAIRE_BASE_API_URL = `${
  import.meta.env.VITE_API_URL
}/cuestionarios`;

class QuestionnaireService {
  constructor() {
    this.csrfToken = null;
  }

  // Método para obtener el token CSRF
  async fetchCSRFToken() {
    let csrfToken = localStorage.getItem("CSRF_TOKEN");
    if (!csrfToken) {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/csrf-token`,
        { withCredentials: true }
      );
      csrfToken = response.data.csrfToken;
      localStorage.setItem("CSRF_TOKEN", csrfToken);
    }
    return csrfToken;
  }

  // Crear un cuestionario
  async createQuestionnaire(data, token) {
    const csrfToken = await this.fetchCSRFToken();
    try {
      const response = await axios.post(
        `${QUESTIONNAIRE_BASE_API_URL}/crear`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al crear el cuestionario:", error);
      throw error;
    }
  }

  // Obtener cuestionario por ID
  async getQuestionnaireById(id, token) {
    const csrfToken = await this.fetchCSRFToken();
    try {
      const response = await axios.get(
        `${QUESTIONNAIRE_BASE_API_URL}/cuestions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener el cuestionario:", error);
      throw error;
    }
  }

  // Editar un cuestionario
  async editQuestionnaire(id, data, token) {
    const csrfToken = await this.fetchCSRFToken();
    try {
      const response = await axios.put(
        `${QUESTIONNAIRE_BASE_API_URL}/editCuestion/${id}/editar`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al editar el cuestionario:", error);
      throw error;
    }
  }

  // Eliminar un cuestionario
  async deleteQuestionnaire(id, token) {
    const csrfToken = await this.fetchCSRFToken();
    try {
      await axios.delete(
        `${QUESTIONNAIRE_BASE_API_URL}/deletCuestion/${id}/eliminar`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error al eliminar el cuestionario:", error);
      throw error;
    }
  }

  // Eliminar una pregunta seleccionada
  async deleteQuestion(id, token) {
    const csrfToken = await this.fetchCSRFToken();
    try {
      await axios.delete(
        `${QUESTIONNAIRE_BASE_API_URL}/pregunta/${id}/eliminar`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error al eliminar la pregunta:", error);
      throw error;
    }
  }

  async publishQuestionnaire(id, data, token) {
    const csrfToken = await this.fetchCSRFToken();
    const publicationData = {
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin,
      urlPublica: `http://localhost:8080/cuestionarios/cuestions/${id}`,
    };

    try {
      // Aquí añadimos una llamada para obtener la URL pública con los headers necesarios.
      await axios.get(publicationData.urlPublica, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-XSRF-TOKEN": csrfToken,
        },
        withCredentials: true,
      });

      const response = await axios.post(
        `${QUESTIONNAIRE_BASE_API_URL}/publicar/${id}`,
        publicationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error al publicar el cuestionario:",
        error.response || error
      );
      throw error;
    }
  }

  // Registrar respuestas
  async registerAnswers(data, token) {
    const csrfToken = await this.fetchCSRFToken();
    try {
      await axios.post(`${QUESTIONNAIRE_BASE_API_URL}/registrar`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-XSRF-TOKEN": csrfToken,
        },
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error al registrar respuestas:", error);
      throw error;
    }
  }
  // Método para obtener los resultados de la comparación del cuestionario
  async compareQuestionnaireResults(cuestionarioId, token) {
    const csrfToken = await this.fetchCSRFToken();
    try {
      // Realizamos la solicitud GET a la ruta comparativa de respuestas
      const response = await axios.get(
        `${QUESTIONNAIRE_BASE_API_URL}/comparar-cuestionario/${cuestionarioId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );
      // Retornamos los resultados de la comparación
      return response.data;
    } catch (error) {
      console.error(
        "Error al obtener los resultados de la comparación:",
        error
      );
      throw error;
    }
  }
}

export default new QuestionnaireService();
