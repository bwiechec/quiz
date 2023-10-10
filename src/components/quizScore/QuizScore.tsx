import ReplayIcon from "@mui/icons-material/Replay";
import "./quizScore.css";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

interface IQuizScore {
  score: number;
  questionCount: number;
  restartQuiz: () => void;
}

export default function QuizScore({
  score,
  questionCount,
  restartQuiz,
}: IQuizScore) {
  return (
    <div className={"score"}>
      <div className={"score-info"}>
        Your score: {score} / {questionCount}
      </div>

      <Button
        variant="contained"
        color="success"
        sx={{
          float: "right",
          backgroundColor: "rgba(100, 102, 245, 0.75);",
          margin: "1rem",
        }}
        className={"score-repeat"}
        onClick={() => restartQuiz()}
      >
        <span>Repeat</span>
        <ReplayIcon />
      </Button>

      <NavLink to={"/"} className={"score-return"}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgba(100, 102, 245, 0.75);",
          }}
        >
          Return to category list
        </Button>
      </NavLink>
    </div>
  );
}
