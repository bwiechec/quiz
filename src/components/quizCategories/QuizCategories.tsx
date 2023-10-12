import { useEffect, useState } from "react";
import PageLoading from "../pageLoading/PageLoading";
import { categoryListInterface } from "../../interfaces/interfaces";
import { categoryActions } from "../../store/slices/category";
import { useSelector, useDispatch } from "react-redux";
import ContentCard from "../contentCard/ContentCard";
import LinkBox from "../linkBox/LinkBox";
import { RootState } from "../../store";

export default function QuizCategories() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const categoryList = useSelector(
    (state: RootState) => state.category.categoryList
  );
  console.log("Control log");
  useEffect(() => {
    setIsError(false);
    console.log(categoryList);
    if (!categoryList || !categoryList.length)
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
        .catch((_e) => {
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
    <ContentCard headerText={"Categories"} linkTo={""} linkText={""}>
      {categoryList?.map(
        (category: categoryListInterface | null) =>
          category && (
            <LinkBox
              id={category.categoryId}
              name={category.categoryName}
              linkTo={"category"}
            />
          )
      )}
    </ContentCard>
  );
}
