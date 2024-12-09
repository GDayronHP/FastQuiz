import axios from "axios";

const TEACHER_BASE_REST_API_URL = `${import.meta.env.VITE_API_URL}/gpt`;

class TeacherService {
  // Obtener todas las preguntas de un ID
  async getAllQuestions(id, token) {
    let csrfToken = localStorage.getItem("CSRF_TOKEN");
    if (!csrfToken) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/csrf-token`,
          { withCredentials: true }
        );
        csrfToken = response.data.token;
        localStorage.setItem("CSRF_TOKEN", csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
        throw new Error("Unable to fetch CSRF token");
      }
    }

    try {
      const response = await axios.get(
        `${TEACHER_BASE_REST_API_URL}/preguntas/${id}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  }

  // Obtener las alternativas de una pregunta de un ID y número de pregunta
  async getAlternatives(id, numeroPregunta, token) {
    let csrfToken = localStorage.getItem("CSRF_TOKEN");
    if (!csrfToken) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/csrf-token`,
          { withCredentials: true }
        );
        csrfToken = response.data.token;
        localStorage.setItem("CSRF_TOKEN", csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
        throw new Error("Unable to fetch CSRF token");
      }
    }

    try {
      const response = await axios.get(
        `${TEACHER_BASE_REST_API_URL}/alternativas/${id}/${numeroPregunta}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching alternatives:", error);
      throw error;
    }
  }

  // Obtener la respuesta correcta de una pregunta de un ID y número de pregunta
  async getCorrectAnswer(id, numeroPregunta, token) {
    let csrfToken = localStorage.getItem("CSRF_TOKEN");
    if (!csrfToken) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/csrf-token`,
          { withCredentials: true }
        );
        csrfToken = response.data.token;
        localStorage.setItem("CSRF_TOKEN", csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
        throw new Error("Unable to fetch CSRF token");
      }
    }

    try {
      const response = await axios.get(
        `${TEACHER_BASE_REST_API_URL}/respuesta/${id}/${numeroPregunta}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching correct answer:", error);
      throw error;
    }
  }

  // Obtener todas las respuestas correctas para un ID
  async getAllCorrectAnswers(id, token) {
    let csrfToken = localStorage.getItem("CSRF_TOKEN");
    if (!csrfToken) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/csrf-token`,
          { withCredentials: true }
        );
        csrfToken = response.data.token;
        localStorage.setItem("CSRF_TOKEN", csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
        throw new Error("Unable to fetch CSRF token");
      }
    }

    try {
      const response = await axios.get(
        `${TEACHER_BASE_REST_API_URL}/respuestas-correctas/${id}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching correct answers:", error);
      throw error;
    }
  }

  // Validar el token de autenticación
  async validateToken(token) {
    if (!token) {
      throw new Error("Token is missing");
    }

    try {
      const payloadBase64 = token.split(".")[1];
      const payloadDecoded = JSON.parse(atob(payloadBase64));
      const expirationTime = payloadDecoded.exp * 1000;

      if (Date.now() > expirationTime) {
        throw new Error("Token has expired");
      }

      console.log("Token is valid");
      return true;
    } catch (error) {
      console.error("Invalid token:", error);
      throw new Error("Invalid token");
    }
  }

  // Crear un nuevo 'prompt' y realizar la solicitud POST
  async createPrompt(prompt, token) {
    const promptBase = { prompt };

    await this.validateToken(token);

    let csrfToken = localStorage.getItem("CSRF_TOKEN");
    if (!csrfToken) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/csrf-token`,
          { withCredentials: true }
        );
        csrfToken = response.data.token;
        localStorage.setItem("CSRF_TOKEN", csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
        throw new Error("Unable to fetch CSRF token");
      }
    }

    try {
      const response = await axios.post(
        `${TEACHER_BASE_REST_API_URL}/prompt`,
        promptBase,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-XSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating prompt:", error);
      throw error;
    }
  }

  async getQuestionData(balotario, balotarioId, token) {
    try {
      // Obtener preguntas, alternativas y respuestas correctas
      const preguntas = await this.getAllQuestions(balotarioId, token);
      const alternativas = JSON.parse(
        balotario.alternativas[0].alternativasJson
      );
      const correctas = await this.getAllCorrectAnswers(balotarioId, token);

      // Retornar los datos combinados
      return { preguntas, alternativas, correctas };
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      throw error;
    }
  }
}

export default new TeacherService();
