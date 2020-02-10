/**
 * 定义主页所有的路由 方便管理多个路由
 */
import { lazy } from 'react';

/* import Home from "../components/home";
import Category from '../containers/category';
import Product from '../containers/product'
import ProductForm from '../containers/product/product-form'
import Role from '../containers/role'
import User from '../containers/user'
import Bar from '../components/charts/bar';
import Map from '../components/charts/map'; */

const routes = [
  {
    path: "/",
    // component: Home,
    // webpack4:webpackChunkName 构建后的名字 webpack5已经自带不需要
    component: lazy(() => import(/* webpackChunkName: 'home' */'../components/home')),
    exact: true
  },
  {
    path: "/category",
    // component: Category,
    component: lazy(() => import(/* webpackChunkName: 'category' */'../containers/category')),
    exact: true
  },
  {
    path: "/product",
    // component: Product,
    component: lazy(() => import(/* webpackChunkName: 'product' */'../containers/product')),
    exact: true
  },
  {
    path: "/product/add",
    // component: ProductForm,
    component: lazy(() => import(/* webpackChunkName: 'productForm' */'../containers/product/product-form')),
    exact: true
  },
  {
    // 因为有很多商品 所以是一对多的关系
    path: "/product/update/:id",
    // component: ProductForm,
    component: lazy(() => import(/* webpackChunkName: 'productForm' */'../containers/product/product-form')),
    exact: true
  },
  {
    path: "/role",
    // component: Role,
    component: lazy(() => import(/* webpackChunkName: 'role' */'../containers/role')),
    exact: true
  },
  {
    path: "/user",
    // component: User,
    component: lazy(() => import(/* webpackChunkName: 'user' */'../containers/user')),
    exact: true
  },
  {
    path: "/charts/bar",
    // component: Bar,
    component: lazy(() => import(/* webpackChunkName: 'bar' */'../components/charts/bar')),
    exact: true
  },
  {
    path: "/charts/line",
    // component: Map,
    component: lazy(() => import(/* webpackChunkName: 'map' */'../components/charts/map')),
    exact: true
  },

];

export default routes;
