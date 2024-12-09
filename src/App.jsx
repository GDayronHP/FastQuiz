import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./components/store/ContextApi";

import Index from "./pages/index";
import PrincPg from "./pages/principalPage";
import QuizDetails from "./pages/quizDetails";
import MainLayout from "./layouts/mainLayout";
import SecondLayout from "./layouts/secondLayout";
import ApproveQuestions from "./pages/approveQuestions";
import Conditions from "./pages/conditions";
import QuizReview from "./pages/quizReview";
import OAuth2RedirectHandler from "./components/Auth/OAuth2RedirectHandler.jsx";

import "./styles/global.scss";
import StudentEvaluation from "./pages/student/studentEvaluation.jsx";
import Results from "./pages/student/results.jsx";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <SecondLayout title="Home">
                <Index />
              </SecondLayout>
            }
          />
          <Route
            path="/principalPage"
            element={
              <MainLayout title="Página de inicio">
                <PrincPg />
              </MainLayout>
            }
          />
          <Route
            path="/conditions"
            element={
              <MainLayout title="Términos y condiciones">
                <Conditions />
              </MainLayout>
            }
          />
          <Route
            path="/quizDetails/:balotarioId"
            element={
              <MainLayout title="Detalles del Quiz">
                <QuizDetails />
              </MainLayout>
            }
          />
          <Route
            path="/quizManagement/:balotarioId"
            element={
              <SecondLayout title="Gestión del quiz">
                <ApproveQuestions />
              </SecondLayout>
            }
          />
          <Route
            path="/quizReview/:balotarioId"
            element={
              <SecondLayout title="Confirmacion del cuestionario">
                <QuizReview />
              </SecondLayout>
            }
          />
          <Route
            path="/studentEvaluation"
            element={
              <SecondLayout title="Evaluación">
                <StudentEvaluation />
              </SecondLayout>
            }
          />
          <Route
            path="/studentResults"
            element={
              <SecondLayout title="Evaluación">
                <Results />
              </SecondLayout>
            }
          />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
