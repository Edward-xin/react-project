

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

### antd基本配置
* https://ant.design/docs/react/use-with-create-react-app-cn
* create-react-app xxx文件   初始化脚手架
* yarn add antd
* yarn add react-app-rewired customize-cra babel-plugin-import less less-loader @babel/plugin-proposal-decorators --dev
* 修改package.json 命令配置 (start、build、test 配置为react-app-rewired xxx)
* 创建并修改config-overrides.js的配置

### react-router基本配置
* yarn add react-router-dom
* 应用BrowserRouter as Router, Route, Switch,Redirect

### redux基本配置
* yarn add redux react-redux redux-thunk
* yarn add redux-devtools-extension --dev
* redux文件的基本配置(actions、action-types、reducers、store)

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

### 国际化功能
* 设置自己文字的国际化
	* yarn add react-intl 
	* IntlProvider组件要包裹App组件 提供语言包
	* 定义语言包文件locals
	* FormattedMessage 接收语言包 
* 设置antd组件的国际化
	* ConfigProvider （需引入antd的语言包）
* 对话框国际化处理(对话框不在root,没有被渲染到)
	* 通过高阶组件 injectIntl 获得intl属性
	* intl.formatMessage({id:'xxx'})

### HeaderMain头部标题的国际化和切换

### HeaderMain头部日期功能
* yarn add dayjs

### 路由处理
* 在config文件中定义页路由文件，方便管理多个路由
* 切换语言这个状态要存在redux里 
* 点击事件 点击按钮切换语言
* 因为多个路由需要检测登录 所以在只要在basic-layout组件使用高阶组件即可
* 同时修改检测登录的高阶组件(防止没登录过的也可以直接访问路由)

### Category静态组件
* Card组件
* Table组件

### Category组件数据动态展示
* 根据api文档 请求获取分类列表数据
* 要将分类列表数据存在redux里 方便将来其他组件使用
* 获取redux里的数据应用在Table组件里

### Category组件添加分类功能
* 引入Modal对话框组件 实现基本功能
* Modal组件中引入form表单组件
	* 每个组件的form属性只能收集到自己的数据 要用子组件收集的数据就用官方提供的方法wrappedComponentRef获取子组件的form实例
	* https://ant.design/components/form-cn/#components-form-demo-validate-other
	* 通过子组件收集的form实例获取validateFields方法 校验表单并收集表单数据
* 发送请求  在api定义（根据api文档）
* 在redux中存储分类数据 (更新后端数据)
* 请求成功，就会更新前端数据（成功后清空表单数据和隐藏对话框）

### Category组件修改分类功能

### Category组件删除分类功能

### Product静态组件及数据动态展示

### 分页管理
* 前台分页
	* 分类管理
	* 一次性将所有数据全部请求回来，再进行分页展示
	* 问题：如果数据比较多，那么速度就很慢
* 后台分页
	* 商品管理
	* 每次请求只请求当前一页的数据
	* 优点：请求的数据少，速度快~
	* 缺点：切换分页时，需要频繁的发送请求

* 问题：401错误，你没权限访问。
	* 一定是token出错了~
	* 解决：
		* 通过检查network看相应请求的request headers中有没有authorization，以及值是否正确
		* 如果没有，那就去请求拦截器中检查原因
		* 如果有还是报错，说明token过期了（服务器token7天过期的）
			* 在响应拦截器失败回调中完成
			* 清除本地的用户数据，重新登录一次。

### 添加商品静态组件
* 绑定点击事件 点击切换地址
* 路由表添加路由
* 地址栏的pathname(此时是/product/add 应改为product)和国际化功能相冲突  header-main组件 二级菜单 pathname要修改判断
* left-nav组件也要修改默认展开和默认选择 同样pathname要加判断
* 写product静态组件

### 完成添加商品功能
* 获取分类数据功能 前面的分类管理已经写好了redux了 可以直接使用 要注意同一个数据只需要请求一次(两个组件发送请求都要加判断)
* 添加商品功能(提交) 这个添加商品数据不受redux管理 不需要写redux流程 直接发请求
* 添加商品回退功能 Link组件

### 完成修改商品功能
* 表单初始化
	* 点击修改跳转到product地址 (复用组件)
	* 获取路由传来的数据(product --> product-form)  发送:push的第二个参数  接收:location.state
	* 标识  判断给修改商品表单初始化
	* 处理分类id的问题
	* 富文本编辑器初始化
* 发送修改商品数据的请求(封装函数 复用代码)

### 添加loading状态图 table组价的loading属性

### 完成搜索商品功能
* 受控组件收集表单数据
	* 定义状态 绑定change事件收集下拉列表表单数据 
	* 收集input表单数据
* 请求搜索商品数据(封装函数 复用代码)
* 封装函数利用定义一个属性区分普通获取商品数据和搜索商品数据
* 当修改了searchValue的值(input里的值)但是没点击搜索 点击下面的分页器应是之前的searchValue所搜索的内，即currentSearchValue
* 当修改了searchValue的值(input里的值)但是没点击搜索 还是按照之前的搜索 需要将searchValue值改回来
	* 请求成功时更新searchValue值 
	* input和状态中的searchValue值绑定在一起