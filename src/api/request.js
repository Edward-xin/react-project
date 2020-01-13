/**
 * 封装axios模块
 */

import axios from "axios";

import errCode from "../config/error-code";

// 创建axios实例 配置axios拦截器
const axiosInstance = axios.create({
  baseURL: "/api", // 公共请求路径前缀
  timeout: 30000, //请求超时时间
  headers: {
    //公共请求头参数
  }
});

/**
 * 设置拦截器函数
 */

// 请求拦截器
axiosInstance.interceptors.request.use(config => {
  /**
   * 设置公共的参数
   */

  // 设置令牌 需要令牌登录后才能访问其他页面
  let token = "";
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  /**
   * 如果是POST请求 需要开发者检查请求头：application/json(默认)    application/x-www-form-urlencoded(需要做以下处理)
   */
  if (config.method === "post") {
    config.data = Object.keys(config.data)
      .reduce((p, c) => {
        // 由对象拼串成 'username=admin&password=admin'
        p += `&${c}=${config.data[c]}`;
        return p;
      }, "")
      .slice(1);
    config.headers["content-type"] = "application/x-www-form-urlencoded";
  }

  return config;
});

// 响应拦截器
axiosInstance.interceptors.response.use(
  // 响应成功 就返回数据  下面axiosInstance().then()接收的是这里的响应成功的数据
  response => {
    // 登录成功
    if (response.data.status === 0) {
      // 直接返回数据 就是一个成功的promise
      return response.data.data;
    } else {
      return Promise.reject(response.data.msg);
    }
  },
  // 响应失败 根据不同的错误原因 提示不同的错误
  err => {
    let errMessage = "";

    if (err.response) {
      // 接收到响应  但响应是失败的
      // 根据响应状态码判断错误
      errMessage = errCode[response.data.status];
    } else {
      // 没有接收到响应
      // 根据err的message（错误信息）来判断错误
      if (err.message.indexOf("Network Error") !== -1) {
        errMessage = "网络连接失败，请重连网络试试~";
      } else if (err.message.indexOf("timeout") !== -1) {
        errMessage = "网络超时，请连上wifi重试~";
      }
    }

    return Promise.reject(errMessage || "发生未知错误，请联系管理员");
  }
);

export default axiosInstance;
