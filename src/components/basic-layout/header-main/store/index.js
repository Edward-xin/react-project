/*
  引入外面要使用actions和reducer
  统一暴露出去
*/

import languageReducer from "./reducers";

import { changeLanguage} from "./actions";

export { languageReducer,changeLanguage };
