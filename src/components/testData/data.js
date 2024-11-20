const data = [
  {
    key: 1,
    question: "¿Cuál es la función de Scrum?",
    alternatives: [
      {
        key: 1,
        alternative: "Gestionar el progreso del proyecto",
        correct: true,
      },
      { key: 2, alternative: "Gestionar el tiempo de trabajo", correct: false },
      {
        key: 3,
        alternative: "Gestionar el estado del proyecto",
        correct: false,
      },
      {
        key: 4,
        alternative: "Gestionar la comunicación del proyecto",
        correct: false,
      },
    ],
  },
  {
    key: 2,
    question: "¿Qué significa OOP en programación?",
    alternatives: [
      { key: 1, alternative: "Object-Oriented Programming", correct: true },
      { key: 2, alternative: "Open Online Programming", correct: false },
      { key: 3, alternative: "Operational Object Programming", correct: false },
      { key: 4, alternative: "Open Object Programming", correct: false },
    ],
  },
  {
    key: 3,
    question: "¿Cuál es el propósito de la función 'push()' en JavaScript?",
    alternatives: [
      {
        key: 1,
        alternative: "Añadir un elemento al final de un array",
        correct: false,
      },
      {
        key: 2,
        alternative: "Eliminar el último elemento de un array",
        correct: false,
      },
      {
        key: 3,
        alternative: "Añadir un elemento al principio de un array",
        correct: true,
      },
      {
        key: 4,
        alternative: "Reemplazar un elemento en un array",
        correct: false,
      },
    ],
  },
  {
    key: 4,
    question: "¿Qué es el DOM en JavaScript?",
    alternatives: [
      { key: 1, alternative: "Document Object Model", correct: true },
      { key: 2, alternative: "Data Object Management", correct: false },
      { key: 3, alternative: "Dynamic Online Manipulation", correct: false },
      { key: 4, alternative: "Document Optimization Method", correct: false },
    ],
  },
  {
    key: 5,
    question: "¿Qué se entiende por 'responsive design' en desarrollo web?",
    alternatives: [
      {
        key: 1,
        alternative: "Diseño que se adapta a diferentes tamaños de pantalla",
        correct: true,
      },
      {
        key: 2,
        alternative: "Diseño que solo se ve bien en pantallas grandes",
        correct: false,
      },
      {
        key: 3,
        alternative: "Diseño que no se adapta a dispositivos móviles",
        correct: false,
      },
      { key: 4, alternative: "Diseño con imágenes fijas", correct: false },
    ],
  },
];

export default data;
