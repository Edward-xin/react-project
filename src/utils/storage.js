/**
 * 封装localstorage工具函数库  localStorage
 * 有三个方法getItem setItem removeItem
 */
const localStorage = window.localStorage;

// 读取数据
export function getItem(key) {
  const value = localStorage.getItem(key);
  try {
    // 将读取的字符串转为对象
    return JSON.parse(value);
  } catch (error) {
    // 如果解析失败就返回原值
    return value;
  }
}

// 存储数据
export function setItem(key, value) {
  // 转化为json字符串
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
}

// 删除数据
export function removeItem(key) {
  localStorage.removeItem(key);
}
