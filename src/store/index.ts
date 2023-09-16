import { configureStore } from "@reduxjs/toolkit";

import category from "./slices/category";

const store = configureStore({
  reducer: { category },
});

export default store;