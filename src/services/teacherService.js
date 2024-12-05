import axios from "axios";

const TEACHER_BASE_REST_API_URL = `${import.meta.env.VITE_API_URL}/gpt`;
class TeacherService {
  getAllQuestions() {
    return axios.get(TEACHER_BASE_REST_API_URL + "/preguntas");
  }

  getAllAlternatives() {
    return axios.post(TEACHER_BASE_REST_API_URL + "/alternativas");
  }

  createPrompt(prompt, token) {
    const promptBase = {
      prompt: prompt,
    };

    console.log(token);

    return axios.post(`${TEACHER_BASE_REST_API_URL}/prompt`, promptBase, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new TeacherService();
