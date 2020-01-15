/**
 * 封装请求功能函数（看api文档）
 */
import axiosInstance from './request'

// 请求登录
export const requLogin=(username,password)=>{
  return axiosInstance({
    url:'/login',
    method:'POST',
    data:{
      username,
      password
    }
  })
}

// 请求获取分类列表数据
export const reGetCategoryList=()=>{
  return axiosInstance({
    url:'category/get',
    method:'GET'
  })
}