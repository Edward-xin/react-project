

/**
 * 用来创建action对象工厂函数模块
 * 同步action
 * 异步action
 */

import {
  reqGetCategoryList,
  reqAddCategory,
  reqUpdateCategory,
  reqDeleteCategory,
} from "$api";
import {
  GET_CATEGORY_LIST,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "./action-types";

const getCategoryList = categories => ({
  type: GET_CATEGORY_LIST,
  data: categories
});

// 异步action 发送请求获取分类列表数据
export const getCategoryListAsync = () => {
  return dispatch => {
    // 发送请求
    return reqGetCategoryList().then(response => {
      dispatch(getCategoryList(response));
    });
  };
};

const addCategory = category => ({ type: ADD_CATEGORY, data: category });
// 异步action 发送请求获取分类数据
export const addCategoryAsync = categoryName => {
  return dispatch => {
    // 发送请求
    return reqAddCategory(categoryName).then(response => {
      dispatch(addCategory(response));
    });
  };
};

const updateCategory = category => ({ type: UPDATE_CATEGORY, data: category });
// 异步action
export const updateCategoryAsync = (categoryId, categoryName) => {
  return dispatch => {
    // 发送请求
    return reqUpdateCategory(categoryId, categoryName).then(response => {
      dispatch(updateCategory(response));
    });
  };
};

const deleteCategory = id => ({ type: DELETE_CATEGORY, data: id });
// 异步action
export const deleteCategoryAsync = categoryId => {
  return dispatch => {
    // 发送请求
    return reqDeleteCategory(categoryId).then(response => {
      dispatch(deleteCategory(response));
    });
  };
};


