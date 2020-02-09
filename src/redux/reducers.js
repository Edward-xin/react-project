/**
 * 用来根据prevState和action生成newState函数模块（存储的数据）
 */
import { combineReducers } from "redux";
import {
  SAVA_USER,
  REMOVE_USER,
  CHANGE_LANGUAGE,
  GET_CATEGORY_LIST,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  GET_ROLE_LIST,
  ADD_ROLE,
  UPDATE_ROLE
} from "./action-types";
import { getItem } from "../utils/storage";

// 读取用户数据和token：先从 localStorage 中读取，存在 redux 中，后面通过 redux 读取使用
const initUser = getItem("user") || {};

function user(prevState = initUser, action) {
  switch (action.type) {
    case SAVA_USER:
      // 直接返回接收的数据 就是要存储的数据
      return action.data;
    case REMOVE_USER:
      return {};
    default:
      return prevState;
  }
}
// 初始化语言 获取当前浏览器默认语言
const initLanguage = navigator.language || navigator.languages[0] || "zh-CN";

function language(prevState = initLanguage, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return action.data;
    default:
      return prevState;
  }
}

// 存储分类列表数据 添加分类
const initCategories = [];
function categories(prevState = initCategories, action) {
  switch (action.type) {
    case GET_CATEGORY_LIST:
      return action.data;
    case ADD_CATEGORY:
      return [...prevState, action.data];
    case UPDATE_CATEGORY:
      return prevState.map(category => {
        if (category._id === action.data._id) {
          return action.data;
        }
        return category;
      });
    case DELETE_CATEGORY:
      return prevState.filter(category => category._id !== action.data);
    default:
      return prevState;
  }
}

// 如果是新状态数据，就得创建一个新的reducer函数
const initRoles = [];
function roles(prevState = initRoles, action) {
  switch (action.type) {
    case GET_ROLE_LIST:
      return action.data;
    case ADD_ROLE:
      return [...prevState, action.data];
    case UPDATE_ROLE:
      return prevState.map((role)=>{
        if(role._id === action.data.id){
          return action.data
        }
        return role;
      });
    default:
      return prevState;
  }
}

export default combineReducers({
  user,
  language,
  categories,
  roles
});
