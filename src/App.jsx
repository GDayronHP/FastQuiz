import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Index from "./pages/index";
import PrincPg from "./pages/principalPage";
import QuizDetails from "./pages/quizDetails";
import MainLayout from "./layouts/mainLayout";
import SecondLayout from "./layouts/secondLayout";
import ApproveQuestions from "./pages/approveQuestions";
import Conditions from "./pages/conditions";

import './styles/global.scss';

function App() {
  return (
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
          path="/quizDetails/:content"
          element={
            <MainLayout title="Detalles del Quiz">
              <QuizDetails />
            </MainLayout>
          }
        />
        <Route
          path="/quizManagement"
          element={
            <SecondLayout title="Gestión del quiz">
              <ApproveQuestions />
            </SecondLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
