import "./questionCard.css";
import AnswerBox from "../answerBox/AnswerBox";
import Button from "@mui/material/Button";

interface IQuestion {
  is_correct: boolean;
  text: string;
}

interface IQuestionCard {
  text: string;
  answers: Array<IQuestion>;
  proceedSubmitQuestion: () => void;
  questionCount: number;
  questionId: number;
  proceedChoseAnswer: (number, boolean) => void;
  selectedAnswer: number;
}

export default function QuestionCard({
  text,
  answers,
  proceedSubmitQuestion,
  questionCount,
  questionId,
  proceedChoseAnswer,
  selectedAnswer,
}: IQuestionCard) {
  console.log(selectedAnswer);

  const handleChoseAnswer = (key) => {
    console.log(key);
    if (selectedAnswer !== key) {
      proceedChoseAnswer(key, answers[key]?.is_correct);
    } else {
      proceedChoseAnswer(null, null);
    }
  };

  return (
    <div className={"question"}>
      <div className={"question-title"}>{text}</div>
      {answers.map((answer, key) => {
        return (
          <AnswerBox
            number={key}
            text={answer.text}
            handleChoseAnswer={handleChoseAnswer}
            selectedNumber={selectedAnswer}
          />
        );
      })}
      <Button
        variant="contained"
        color="success"
        sx={{
          float: "right",
          backgroundColor: "rgba(100, 102, 245, 0.75)",
        }}
        disabled={selectedAnswer === null}
        onClick={() => proceedSubmitQuestion()}
      >
        {questionCount > questionId && "Submit"}
        {questionCount <= questionId && "Finish"}
      </Button>
    </div>
  );
}
