/**
 * 用来创建action对象工厂函数模块
 * 同步action
 * 异步action
 */
import { requLogin,reqGetCategoryList,reqAddCategory,reqUpdateCategory} from "../api";
import { setItem } from "../utils/storage";
import {SAVA_USER,REMOVE_USER,CHANGE_LANGUAGE,GET_CATEGORY_LIST,ADD_CATEGORY,UPDATE_CATEGORY} from './action-types'


export const changeLanguage = (lang) =>({type:CHANGE_LANGUAGE,data:lang})

// 这个同步action 不需要数据 用来退出时清空redux的数据
export const removeUser = ()=>({type:REMOVE_USER})



// 定义的这个同步action是给下面异步操作中出触发更新时用
const savaUser =(user)=>({type:SAVA_USER,data:user})
// 发送请求相关的数据就是异步action
export const savaUserAsync = (username, password) => {
  return dispatch => {
    // 异步操作
    
    // 发送请求
    // 当前函数返回值，作为将来组件调用时的返回值 返回值是promise
    return requLogin(username, password)
      .then(response => {
        // 登录成功

        /*
        存储用户数据和token

        存在redux中（内存存储，一旦刷新就没了）
        还需要持久化存储：localStorage
          因为频繁操作 localStorage 性能不好，如果存储在redux，性能更好

        存储：localStorage 和 redux
        读取：先从 localStorage 中读取，存在 redux 中，后面通过 redux 读取使用
      */
        // 存储数据在localStorage中
        setItem("user", response);

        // 触发更新 存储数据在redux中
        dispatch(savaUser(response))

        
      })
    
  };
};

const getCategoryList=(categories)=>({
  type:GET_CATEGORY_LIST,
  data:categories
})

// 异步action 发送请求获取分类列表数据
export const getCategoryListAsync= ()=>{
  return dispatch=>{
     // 发送请求
     return reqGetCategoryList()
      .then(response=>{
        dispatch(getCategoryList(response))
      })
  }
}

const addCategory=category=>({type:ADD_CATEGORY,data:category})
// 异步action 发送请求获取分类数据
export const addCategoryAsync= (categoryName)=>{
  return dispatch=>{
     // 发送请求
     return reqAddCategory(categoryName)
      .then(response=>{
        dispatch(addCategory(response))
      })
  }
}

const updateCategory=category=>({type:UPDATE_CATEGORY,data:category})
// 异步action 发送请求获取分类数据
export const updateCategoryAsync= (categoryId,categoryName)=>{
  return dispatch=>{
     // 发送请求
     return reqUpdateCategory(categoryId,categoryName)
      .then(response=>{
        dispatch(updateCategory(response))
      })
  }
}

