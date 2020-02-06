/**
 * 封装请求功能函数（看api文档）
 */
import axiosInstance from "./request";

// 请求登录
export const requLogin = (username, password) => {
  return axiosInstance({
    url: "/login",
    method: "POST",
    data: {
      username,
      password
    }
  });
};

// 请求获取分类列表数据
export const reqGetCategoryList = () => {
  return axiosInstance({
    url: "/category/get",
    method: "GET"
  });
};

// 请求添加分类数据
export const reqAddCategory = categoryName => {
  return axiosInstance({
    url: "/category/add",
    method: "POST",
    data: {
      categoryName
    }
  });
};

// 请求修改分类数据
export const reqUpdateCategory = (categoryId, categoryName) => {
  return axiosInstance({
    url: "/category/update",
    method: "POST",
    data: {
      categoryName,
      categoryId
    }
  });
};

// 请求删除分类数据
export const reqDeleteCategory = categoryId => {
  return axiosInstance({
    url: "/category/delete",
    method: "POST",
    data: {
      categoryId
    }
  });
};

// 请求获取商品列表数据
export const reqGetProductList = (pageNum, pageSize) => {
  return axiosInstance({
    url: "/product/list",
    method: "GET",
    params: {
      pageNum,
      pageSize
    }
  });
};

// 请求添加商品数据
export const reqAddProduct = ({ name, desc, categoryId, price, datail }) => {
  return axiosInstance({
    url: "/product/add",
    method: "POST",
    data: {
      name,
      desc,
      categoryId,
      price,
      datail
    }
  });
};
