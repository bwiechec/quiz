export interface contentProps {
  currentAction: string;
  setCurrentAction: (action: string) => void;
}

export interface userInterface {
  user_id: number;
  user_name: string;
  is_super_user: boolean;
  email: string;
}

export interface categoryListInterface {
  categoryId: string;
  categoryName: string;
}

export interface quizListInterface {
  quizId: number;
  quizName: string;
  userName: string;
  quizDescription: string;
}

export interface quizAnswerInterface {
  questionId: number | null;
  text: string;
  is_correct: boolean;
}

export interface quizQuestionInterface {
  quiz_id: number | null;
  text: string;
  answers: quizAnswerInterface[];
}
