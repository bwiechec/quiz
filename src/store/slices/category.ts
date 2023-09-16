import {createSlice} from "@reduxjs/toolkit";

const initialCategoryState = {categoryList: null};

const categorySlice = createSlice({
  name: 'category',
  initialState: initialCategoryState,
  reducers: {
    addCategory(state, action){
      state.categoryList = [...state.categoryList, action.payload.category];
    },
    setCategories(state, action){
      state.categoryList = action.payload.categories;
    }
  }
})
export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;