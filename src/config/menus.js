/**
 * 定义菜单项 将来不一定要展示所有的菜单项
 */

const menus = [
  {
    title: "首页",
    icon: "home",
    path: "/"
  },
  {
    title: "商品",
    icon: "appstore",
    path: "/products",
    children: [
      {
        title: "分类管理",
        icon: "bars",
        path: "/category"
      },
      {
        title: "商品管理",
        icon: "tool",
        path: "/product"
      }
    ]
  },
  {
    title: "用户管理",
    icon: "user",
    path: "/user"
  },
  {
    title: "权限管理",
    icon: "safety-certificate",
    path: "/role"
  },
  {
    title: "图形图表",
    icon: "area-chart",
    path: "/charts",
    children: [
      {
        title: "柱状图",
        icon: "bar-chart",
        path: "/charts/bar"
      },
      {
        title: "饼状图",
        icon: "pie-chart",
        path: "/charts/pie"
      },
      {
        title: "折线图",
        icon: "line-chart",
        path: "/charts/line"
      }
    ]
  }
];

export default menus;