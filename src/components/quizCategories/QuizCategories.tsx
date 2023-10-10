import React, { useEffect, useState } from "react";
import { Grid, Skeleton, Box, Button } from "@mui/material/";
import PageLoading from "../pageLoading/PageLoading";
import { categoryListInterface } from "../../interfaces/interfaces";
import { categoryActions } from "../../store/slices/category";
import { useSelector, useDispatch } from "react-redux";
import ContentCard from "../contentCard/ContentCard";
import LinkBox from "../linkBox/LinkBox";

export default function QuizCategories() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.category.categoryList);

  useEffect(() => {
    setIsError(false);
    if (!categoryList)
      fetch(
        "https://quiz-6dc78-default-rtdb.europe-west1.firebasedatabase.app/category.json"
      )
        .then((res) => res.json())
        .then((resJson) => {
          setIsLoading(false);
          let categories = [];
          for (const key in resJson) {
            categories.push({
              categoryId: key,
              categoryName: resJson[key].name,
            });
          }
          dispatch(
            categoryActions.setCategories({
              categories,
            })
          );
        })
        .catch((e) => {
          setIsError(true);
        });
    else setIsLoading(false);
  }, []);

  if (isError) {
    return <p>ERROR</p>;
  }

  if (isLoading || categoryList === undefined || categoryList?.length === 0) {
    return <PageLoading />;
  }

  return (
    <ContentCard headerText={"Categories"}>
      {categoryList?.map((category: categoryListInterface) => (
        <LinkBox
          id={category.categoryId}
          name={category.categoryName}
          linkTo={"category"}
        />
      ))}
    </ContentCard>
  );
}
