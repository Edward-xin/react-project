/**
 * 定义主页所有的路由 方便管理多个路由
 */

import Home from "../components/home";
import Category from "../components/category";

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
  
];

export default routes;
