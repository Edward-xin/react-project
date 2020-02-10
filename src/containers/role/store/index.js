/*
  引入外面要使用actions和reducer
  统一暴露出去
*/

import roleReducer from "./reducers";

import { getRoleListAsync, addRoleAsync, updateRoleAsync } from "./actions";

export { roleReducer,getRoleListAsync, addRoleAsync, updateRoleAsync };
