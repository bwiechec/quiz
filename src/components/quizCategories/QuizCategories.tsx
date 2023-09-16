import React, {useEffect, useState} from 'react';
import {CircularProgress, Grid, Skeleton, Box, Button} from '@mui/material/';
import {NavLink} from "react-router-dom";
import {getAccessToken} from '../../utils/token';
import {categoryListInterface} from "../../interfaces/interfaces";
import category, { categoryActions } from '../../store/slices/category';
import { useSelector, useDispatch } from 'react-redux';

export default function QuizCategories(){

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const categoryList = useSelector(state => state.category.categoryList);
  console.warn(categoryList);

  useEffect(() => {
    fetch('https://quiz-6dc78-default-rtdb.europe-west1.firebasedatabase.app/category.json')
      .then(res => res.json())
      .then(resJson => {
        setIsLoading(false);
        let categories = [];
        for (const key in resJson){
          categories.push({
            categoryId: key,
            categoryName: resJson[key].name
          })
        }
        dispatch(categoryActions.setCategories({
          categories
        }))
        console.log(resJson);
      });
  }, [])

  console.log('categoryList')
  console.log(categoryList)
  if(isError){
    return <p>ERROR</p>
  }
  else if(isLoading || categoryList === undefined || categoryList?.length === 0){
    return <CircularProgress />
  }

  return(
    <Grid
      container
      xs={12}
      //columnSpacing={{ xs: 0, md: 2 }}
      rowSpacing={{ xs: 2, xl: 10}}
      columns={{ xs: 5, md: 10, xl: 15 }}
      alignItems="center"
      justifyContent={{xs: "center", xl: 'flex-start'}}
      direction={{xs: "row"}}
      style={{border: "2px solid black", marginInline: 'auto', marginTop: "1%"}}
    >
      {categoryList?.map((category: categoryListInterface) =>
        category ?
          (
            <Grid item spacing={2} xs={5}>
              <NavLink to={`/category/${category.categoryId}`}
                style={{
                  maxWidth: '25rem',
                  //width: '25rem',
                  height: '15rem',
                  textAlign: 'center',
                  justifyContent: 'space-evenly',
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px rgb(100,102,255) solid',
                  // margin: '2.5rem',
                  borderRadius: '1rem',
                  backgroundColor: 'rgba(100,102,245,0.74)',
                  textDecoration: 'none',
                  boxShadow: '0.3rem 0.3rem 0.7rem rgba(100,102,245,0.5)',
                  marginInline: 'auto'
                }}
              >
                <Box
                  key={category.categoryName}
                  alignItems="center"
                  justifyContent="center"
                  minWidth={{xs: '15rem', md: '20rem', xl: '25rem'}}
                >
                  <h4 style={{
                    color: 'white',
                    fontWeight: '300',
                    fontSize: '3rem'
                  }}>
                    {category.categoryName}
                  </h4>
                </Box>
              </NavLink>
            </Grid>
          )
          :
          (<Skeleton/>)
        )
      }
    </Grid>
  )
}