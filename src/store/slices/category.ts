import { createSlice } from "@reduxjs/toolkit";
import { categoryListInterface } from "../../interfaces/interfaces";

interface ICategoryList {
  categoryList: Array<categoryListInterface | null>;
}

const initialCategoryState: ICategoryList = {
  categoryList: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialCategoryState,
  reducers: {
    addCategory(state, action) {
      state.categoryList = [...state.categoryList, action.payload.category];
    },
    setCategories(state, action) {
      state.categoryList = action.payload.categories;
    },
  },
});
export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;
