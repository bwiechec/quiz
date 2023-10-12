import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material/";
import PageLoading from "../pageLoading/PageLoading";
import { quizListInterface } from "../../interfaces/interfaces";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { quizActions } from "../../store/slices/quiz";
import ContentCard from "../contentCard/ContentCard";
import LinkBox from "../linkBox/LinkBox";
import EmptyEndpoint from "../emptyEndpoint/EmptyEndpoint";
import { RootState } from "../../store";

export default function QuizList() {
  let { categoryId } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // const categoryList = useSelector(state => state.category.categoryList);
  const quizList: Array<quizListInterface> | null = useSelector(
    (state: RootState) => state.quiz.quizList
  );
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://quiz-6dc78-default-rtdb.europe-west1.firebasedatabase.app/quiz.json?orderBy="category_id"&equalTo="${categoryId}"`
    )
      .then((res) => res.json())
      .then((resJson) => {
        setIsLoading(false);
        let quizzes = [];
        for (const key in resJson) {
          quizzes.push({
            quizId: key,
            quizName: resJson[key].title,
            userName: resJson[key].created_at,
            quizDescription: resJson[key].description,
          });
        }
        dispatch(
          quizActions.setQuizzes({
            // TODO do przemyslenia czy jest sens ladowac do reduxa
            quizzes,
          })
        );
      });
  }, []);

  if (isLoading) {
    return <PageLoading />;
  } else if (
    quizList === undefined ||
    (quizList !== null && quizList?.length === 0)
  ) {
    return <EmptyEndpoint />;
  }

  return (
    <ContentCard
      headerText={"Questions"}
      linkTo={"/"}
      linkText={"Return to category list"}
    >
      {quizList &&
        quizList?.map(
          (quiz: quizListInterface) =>
            quiz.quizName &&
            quiz.quizId && (
              <LinkBox id={quiz.quizId} name={quiz.quizName} linkTo={"quiz"}>
                <Box sx={{ pr: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    {quiz.quizDescription}
                    <br />
                    {/*Creator: {quiz.userName}*/}
                  </Typography>
                </Box>
              </LinkBox>
            )
        )}
    </ContentCard>
  );
}
