

### 项目介绍
* 硅谷后台管理系统

### 测试接口
    根据API文档 在postman软件上进行接口测试

### git操作
* 开发者
	* 获取仓库代码
		* https
			* 项目经理提供：仓库地址 和 用户名/密码
		* ssh
			* 项目经理提供：仓库地址
			* 开发者提供：ssh pub（公钥）
		* git clone 仓库地址
	* 选择分支
		* 项目经理帮你创建xxx分支
			* git fetch origin xxx:xxx 拉取远程分支xxx到本地分支xxx上
			* git checkout xxx 切换到xxx分支
			* 进行开发
		* 项目经理没有帮你创建
			* git checkout -b xxx 创建并切换到xxx分支（将当前分支内容复制到xxx分支上）
			* 进行开发
	* 进行开发
		* 本地版本控制
			* git add .
			* git commit -m 'xxx'
		* 提交到远程仓库
			* git push origin xxx
			* 有可能提交失败
				* 网络问题 （等等试试）
				* 本地没有进行版本控制 
				* 远程仓库有更新 git pull origin xxx 

### react基本配置
* https://ant.design/docs/react/use-with-create-react-app-cn
* create-react-app xxx文件   初始化脚手架
* yarn add react-app-rewired customize-cra babel-plugin-import less less-loader @babel/plugin-proposal-decorators --dev
* 修改package.json 命令配置 (start、build、test 配置为react-app-rewired xxx)
* 创建并修改config-overrides.js的配置
* 下载包 yarn add react-redux

### login页面

### 登录验证功能
* 使用高阶组件复用：用来检查登录
  * 返回一个新组件 ，给新(包装)组件命名
  * connect 获取redux的数据
  * 根据redux里数据 token (如果登录过,访问/login,跳转到/;如果没登录过,访问/,跳转到/login)
* 高阶组件应用在login、home组件

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