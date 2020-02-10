/**
 * 用来创建action对象工厂函数模块
 * 同步action
 * 异步action
 */
import {
  CHANGE_LANGUAGE
} from "./action-types";

export const changeLanguage = lang => ({ type: CHANGE_LANGUAGE, data: lang });
