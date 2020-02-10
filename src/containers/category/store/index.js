/*
  引入外面要使用actions和reducer
  统一暴露出去
*/

import categoriesReducer from "./reducers";

import { getCategoryListAsync,addCategoryAsync,updateCategoryAsync,deleteCategoryAsync} from "./actions";

export { categoriesReducer,getCategoryListAsync,addCategoryAsync,updateCategoryAsync,deleteCategoryAsync };
