/**
 * 定义主页所有的路由 方便管理多个路由
 */

import Home from "../components/home";
import Category from '../containers/category';
import Product from '../containers/product'
import ProductForm from '../containers/product/product-form'
import Role from '../containers/role'
import User from '../containers/user'

const routes = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/category",
    component: Category,
    exact: true
  },
  {
    path: "/product",
    component: Product,
    exact: true
  },
  {
    path: "/product/add",
    component: ProductForm,
    exact: true
  },
  {
    // 因为有很多商品 所以是一对多的关系
    path: "/product/update/:id",
    component: ProductForm,
    exact: true
  },
  {
    path: "/role",
    component: Role,
    exact: true
  },
  {
    path: "/user",
    component: User,
    exact: true
  },

];

export default routes;
