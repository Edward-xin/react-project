/**
 * 用来根据prevState和action生成newState函数模块
 */
import { combineReducers } from "redux";
import {SAVA_USER} from './action-types';
import {getItem} from '../utils/storage'

// 读取用户数据和token：先从 localStorage 中读取，存在 redux 中，后面通过 redux 读取使用
const initUser=getItem('user') || {};

function user(prevState = initUser, action) {
  switch (action.type) {
    case SAVA_USER:
      // 直接返回接收的数据 就是要存储的数据
      return action.data;
    default:
      return prevState;
  }
}

function bbb(prevState = 222, action) {
  switch (action.type) {
    default:
      return prevState;
  }
}

export default combineReducers({
  user,
  bbb
});
