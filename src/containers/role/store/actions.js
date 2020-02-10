import {
  reqRoleList,
  reqAddRole,
  reqUpdateRole
} from "$api";
import {
  GET_ROLE_LIST,
  ADD_ROLE,
  UPDATE_ROLE
} from "./action-types";

/**
 * 用来创建action对象工厂函数模块
 * 同步action
 * 异步action
 */


const getRoleList = roles => ({ type: GET_ROLE_LIST, data: roles });
// 异步action
export const getRoleListAsync = () => {
  return dispatch => {
    // 发送请求
    return reqRoleList().then(response => {
      dispatch(getRoleList(response));
    });
  };
};

const addRole = role => ({ type: ADD_ROLE, data: role });
// 异步action
export const addRoleAsync = name => {
  return dispatch => {
    // 发送请求
    return reqAddRole(name).then(response => {
      dispatch(addRole(response));
    });
  };
};

const updateRole = role => ({ type: UPDATE_ROLE, data: role });
// 异步action
export const updateRoleAsync = name => {
  return dispatch => {
    // 发送请求
    return reqUpdateRole(name).then(response => {
      dispatch(updateRole(response));
      // 将请求更新后的role返回出去
      return response;
    });
  };
};
