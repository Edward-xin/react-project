/**
 * 用来根据prevState和action生成newState函数模块（存储的数据）
 */
import { combineReducers } from "redux";

import { roleReducer } from "$cont/role/store";
import { categoriesReducer } from "$cont/category/store";
import {userReducer} from "$cont/user/store"
import {languageReducer} from '$comp/basic-layout/header-main/store'



export default combineReducers({
  user:userReducer,
  language:languageReducer,
  categories: categoriesReducer,
  roles: roleReducer
});
