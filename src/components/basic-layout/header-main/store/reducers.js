/**
 * 用来根据prevState和action生成newState函数模块（存储的数据）
 */

import { CHANGE_LANGUAGE } from "./action-types";

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

export default language;
