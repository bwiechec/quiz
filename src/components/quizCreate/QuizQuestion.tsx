import { useParams } from "react-router";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  categoryListInterface,
  quizAnswerInterface,
  quizQuestionInterface,
} from "../../interfaces/interfaces";
import { Fab, TextField } from "@mui/material";
import QuizAnswer from "./QuizAnswer";
import AddIcon from "@mui/icons-material/Add";

interface quizQuestionProps {
  quizQuestion: quizQuestionInterface;
  questionIndex: number;
  updateQuestion: (index: number, question: quizQuestionInterface) => void;
}

export default function QuizQuestion({
  quizQuestion,
  questionIndex,
  updateQuestion,
}: quizQuestionProps) {
  const updateAnswerText = (index: number, text: string) => {
    if (!quizQuestion) return;
    if (!quizQuestion.answers[index]) return;

    quizQuestion.answers[index].text = text;

    updateQuestion(questionIndex, quizQuestion);
  };

  const updateAnswerCorrect = (index: number, is_correct: boolean) => {
    if (!quizQuestion) return;
    if (!quizQuestion.answers[index]) return;

    quizQuestion.answers[index].is_correct = is_correct;

    quizQuestion.answers.forEach((answer, answerIndex) => {
      answerIndex === index
        ? (answer.is_correct = true)
        : (answer.is_correct = false);
    });

    updateQuestion(questionIndex, quizQuestion);

    console.log(quizQuestion.answers);
  };

  const callUpdateQuestion = (event: ChangeEvent<HTMLInputElement>) => {
    //setUserName();

    quizQuestion.text = event.target.value;

    updateQuestion(questionIndex, quizQuestion);
  };

  return (
    <div>
      <TextField
        required
        // error={userNameError}
        id="title-input"
        label={`Question ${questionIndex + 1}`}
        variant="standard"
        margin="normal"
        style={{ width: "75%" }}
        onChange={callUpdateQuestion}
      />
      {quizQuestion?.answers?.map((answer: quizAnswerInterface, index) => {
        return (
          <QuizAnswer
            answer={answer}
            index={index}
            updateAnswerText={updateAnswerText}
            updateAnswerCorrect={updateAnswerCorrect}
          />
        );
      })}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Fab
          color="primary"
          aria-label="add"
          style={{ float: "left", marginBottom: "2rem" }}
          variant="extended"
          onClick={() => {
            let answer = {
              text: "",
              questionId: questionIndex,
              is_correct: false,
            } as quizAnswerInterface;

            quizQuestion.answers = [...quizQuestion.answers, answer];

            updateQuestion(questionIndex, quizQuestion);
          }}
        >
          <AddIcon />
          Add answer
        </Fab>
      </div>
    </div>
  );
}
