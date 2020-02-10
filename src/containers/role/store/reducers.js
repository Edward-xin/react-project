/**
 * 用来根据prevState和action生成newState函数模块（存储的数据）
 */

import {
  GET_ROLE_LIST,
  ADD_ROLE,
  UPDATE_ROLE
} from "./action-types";


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

export default roles;