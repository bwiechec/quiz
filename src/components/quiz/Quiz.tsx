import { useParams } from "react-router";
import { useEffect, useState } from "react";
import PageLoading from "../pageLoading/PageLoading";
import ContentCard from "../contentCard/ContentCard";
import QuestionCard from "../questionCard/QuestionCard";
import QuizScore from "../quizScore/QuizScore";

export default function Quiz() {
  const [questionList, setQuestionList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [questionId, setQuestionId] = useState<number>(-1);
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([]);
  const [quizScore, setQuizScore] = useState(0);

  const searchParams = useParams();

  console.log(searchParams);

  const currentQuestion = questionList[questionId];

  let { quizId } = useParams();

  const questionCount = questionList.length - 1;

  const proceedQuizFinish = () => {
    let correctCount = 0;
    selectedAnswers.forEach((answer) => answer.is_correct && correctCount++);

    setQuizScore(correctCount);
    setIsFinished(true);
  };

  const proceedSubmitQuestion = () => {
    if (questionCount > questionId) {
      setQuestionId((prevId) => prevId + 1);
    } else proceedQuizFinish();
  };

  const proceedChoseAnswer = (key: any, is_correct: any) => {
    const tempAnswers = [...selectedAnswers];
    tempAnswers[questionId] = { key, is_correct };
    setSelectedAnswers(tempAnswers);
  };

  const restartQuiz = () => {
    setQuestionId(0);
    setIsFinished(false);
    setSelectedAnswers([]);
  };

  useEffect(() => {
    fetch(
      `https://quiz-6dc78-default-rtdb.europe-west1.firebasedatabase.app/question.json?orderBy="quiz_id"&equalTo="${quizId}"`
    )
      .then((res) => res.json())
      .then((resJson) => {
        setIsLoading(false);
        let questions = [];
        for (const key in resJson) {
          questions.push({
            quizId: quizId,
            text: resJson[key].text,
            answers: resJson[key].answers,
          });
        }
        setQuestionList(questions);
        setQuestionId(0);
      });
  }, []);

  if (isLoading) return <PageLoading />;

  return (
    <ContentCard headerText={"Question"} linkTo={""} linkText={""}>
      {!isFinished && (
        <QuestionCard
          // key={{ questionId }}
          text={currentQuestion.text}
          answers={currentQuestion.answers}
          proceedSubmitQuestion={proceedSubmitQuestion}
          questionCount={questionCount}
          questionId={questionId}
          proceedChoseAnswer={proceedChoseAnswer}
          selectedAnswer={selectedAnswers[questionId]?.key}
        />
      )}
      {isFinished && (
        <QuizScore
          score={quizScore}
          questionCount={questionCount + 1}
          restartQuiz={restartQuiz}
        />
      )}
    </ContentCard>
  );
}
