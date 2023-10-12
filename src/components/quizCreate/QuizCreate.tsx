import {
  Button,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Fab,
  SelectChangeEvent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  categoryListInterface,
  quizAnswerInterface,
  quizQuestionInterface,
} from "../../interfaces/interfaces";
import QuizQuestion from "./QuizQuestion";
import { useSelector } from "react-redux";
import ContentCard from "../contentCard/ContentCard";
import { useNavigate } from "react-router";
import { RootState } from "../../store/index";

export default function QuizCreate() {
  const categoryList = useSelector(
    (state: RootState) => state.category.categoryList
  );

  const [questionList, setQuestionList] =
    useState<Array<quizQuestionInterface>>();
  const [categorySelected, setCategorySelected] = useState<string>(
    categoryList[0]?.categoryId ?? ""
  );
  const [titleSelected, setTitleSelected] = useState<string>();
  const [descriptionSelected, setDescriptionSelected] = useState<string>();

  const navigate = useNavigate();

  const getCurrentTimestamp = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();
    return (
      "" +
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (day < 10 ? "0" + day : day) +
      " " +
      (hh < 10 ? "0" + hh : hh) +
      ":" +
      (mm < 10 ? "0" + mm : mm) +
      ":" +
      (ss < 10 ? "0" + ss : ss)
    );
  };

  const getNewQuestion = () => {
    return {
      quiz_id: null,
      text: "",
      answers: [
        {
          text: "",
          questionId: questionList?.length ?? 0,
          is_correct: true,
        } as quizAnswerInterface,
        {
          text: "",
          questionId: questionList?.length ?? 0,
          is_correct: false,
        } as quizAnswerInterface,
        {
          text: "",
          questionId: questionList?.length ?? 0,
          is_correct: false,
        } as quizAnswerInterface,
      ],
    } as quizQuestionInterface;
  };

  const handleChangeCategory = (event: SelectChangeEvent<number>) => {
    //setPassword(value);
    if (typeof event.target.value === "string")
      setCategorySelected(event.target.value);
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    //setPassword(value);
    if (typeof event.target.value === "string")
      setTitleSelected(event.target.value);
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    //setPassword(value);
    if (typeof event.target.value === "string")
      setDescriptionSelected(event.target.value);
  };

  const updateQuestion = (index: number, question: quizQuestionInterface) => {
    if (!questionList) return;

    questionList[index] = question;

    setQuestionList([...questionList]);
  };

  const saveQuiz = async (event: FormEvent<EventTarget>) => {
    event.preventDefault();

    const question = {
      category_id: categorySelected,
      created_at: getCurrentTimestamp(),
      description: descriptionSelected,
      title: titleSelected,
    };

    const res = await fetch(
      "https://quiz-6dc78-default-rtdb.europe-west1.firebasedatabase.app/quiz.json",
      {
        method: "POST",
        body: JSON.stringify(question),
      }
    );
    const resJson = await res.json();

    let tempQuestionList: Array<quizQuestionInterface> = [...questionList!];

    tempQuestionList.forEach(async (question) => {
      question.quiz_id = resJson?.name ?? "";
      await fetch(
        "https://quiz-6dc78-default-rtdb.europe-west1.firebasedatabase.app/question.json",
        {
          method: "POST",
          body: JSON.stringify(question),
        }
      );
    });

    navigate("/");
  };

  return (
    <ContentCard headerText={"New question"} linkTo={""} linkText={""}>
      <form
        style={{ maxWidth: "35rem", marginInline: "auto" }}
        onSubmit={saveQuiz}
      >
        <TextField
          required
          id="login-input"
          label="Quiz name"
          variant="standard"
          margin="normal"
          onChange={handleChangeTitle}
        />
        <FormControl fullWidth variant="standard" required>
          <InputLabel id="quiz-category-select-label">Quiz category</InputLabel>
          <Select
            labelId="quiz-category-select-label"
            id="quiz-category-select"
            // defaultValue={categorySelected ?? categoryList[0].categoryId}
            // value={categorySelected ?? categoryList[0].categoryId}
            label="Quiz category"
            onChange={handleChangeCategory}
          >
            {categoryList?.map((category: categoryListInterface | null) => (
              <MenuItem
                value={category?.categoryId}
                selected={categorySelected == category?.categoryId}
              >
                {category?.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          required
          // error={userNameError}
          id="description-input"
          label="Quiz description"
          variant="standard"
          margin="normal"
          onChange={handleChangeDescription}
        />

        <>
          {questionList
            ? questionList.map((question: quizQuestionInterface, index) => {
                return (
                  <QuizQuestion
                    quizQuestion={question}
                    questionIndex={index}
                    updateQuestion={updateQuestion}
                  />
                );
              })
            : ""}
        </>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Fab
            color="primary"
            aria-label="add"
            style={{ float: "left", marginBottom: "2rem" }}
            variant="extended"
            onClick={() => {
              setQuestionList(
                questionList
                  ? [...questionList, getNewQuestion()]
                  : [getNewQuestion()]
              );
            }}
          >
            <AddIcon />
            Add question
          </Fab>
        </div>

        <span
          style={{
            color: "red",
          }}
        >
          {/*{loginMessage}*/}
        </span>
        <Button
          variant="contained"
          color="primary"
          sx={{ maxWidth: "50%", marginBottom: "2rem" }}
          type="submit"
        >
          Add quiz
        </Button>
      </form>
    </ContentCard>
  );
}
