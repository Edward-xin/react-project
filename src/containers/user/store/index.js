/*
  引入外面要使用actions和reducer
  统一暴露出去
*/

import userReducer from "./reducers";

import { savaUserAsync,removeUser} from "./actions";

export { userReducer,savaUserAsync,removeUser };
