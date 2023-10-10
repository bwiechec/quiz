import "./App.css";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import QuizCreate from "./components/quizCreate/QuizCreate";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizList from "./components/quizList/QuizList";
import Quiz from "./components/quiz/Quiz";
import QuizCategories from "./components/quizCategories/QuizCategories";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes key={"Routes"}>
          <Route key={"main_route"} path="/" element={<QuizCategories />} />
          <Route
            key={"category"}
            path="/category/:categoryId"
            element={<QuizList />}
          />
          <Route key={"login_rote"} path="/login" element={<LoginPage />} />
          <Route
            key={"quiz_create_route"}
            path="/quiz/create"
            element={<QuizCreate />}
          />
          <Route key={"quiz"} path="/quiz/:quizId" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
