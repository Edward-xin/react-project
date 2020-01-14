

### home页面
### 左侧导航功能
* 在config文件里定义菜单项文件，方便将来过滤展示
* 在组件中遍历菜单项文件创建菜单
* 选择菜单项时地址栏相对应变化(Link组件)
* 刷新时默认选中菜单项  
  * location.pathname(根据withRouter高阶组件提供路由组件三大属性)
  * 将key设置为pathname，关联起来(不需要在遍历)
* 刷新时选中的子菜单会展开

### 头部静态组件

### 切换全屏功能
* yarn add screenfull
* 需检测全屏变化 切换图标

### 退出功能
* 清空数据(redux和localStorage 都要清空)
* 跳转到login页面(connect高级组件获得history)