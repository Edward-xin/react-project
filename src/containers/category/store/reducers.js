/**
 * 用来根据prevState和action生成newState函数模块（存储的数据）
 */

import {
  GET_CATEGORY_LIST,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from "./action-types";

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

export default categories;
