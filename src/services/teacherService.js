import axios from "axios";

const TEACHER_BASE_REST_API_URL = "http://localhost:8080/gpt";

class TeacherService {
  getAllQuestions() {
    return axios.get(TEACHER_BASE_REST_API_URL + "/preguntas");
  }

  getAllAlternatives() {
    return axios.post(TEACHER_BASE_REST_API_URL + "/alternativas");
  }

  createPrompt(prompt) {
    const promptBase = {
      prompt: prompt,
    };

    return axios.post(
      `${TEACHER_BASE_REST_API_URL}/prompt`, 
      promptBase, 
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  
}

export default new TeacherService();
