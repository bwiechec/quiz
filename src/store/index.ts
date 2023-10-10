import { configureStore } from "@reduxjs/toolkit";

import category from "./slices/category";
import quiz from "./slices/quiz";

const store = configureStore({
  reducer: { category, quiz },
});

export default store;