## git 操作

- 项目经理（技术总监）

  - 创建仓库
  - 创建初始化项目
  - 初始化项目提交到仓库中保管

- 开发者
  - 获取仓库代码
    - https
      - 项目经理提供：仓库地址 和 用户名/密码
    - ssh
      - 项目经理提供：仓库地址
      - 开发者提供：ssh pub（公钥）
    - git clone 仓库地址
  - 选择分支
    - 项目经理帮你创建 xxx 分支
      - git fetch origin xxx:xxx 拉取远程分支 xxx 到本地分支 xxx 上
      - git checkout xxx 切换到 xxx 分支
      - 进行开发
    - 项目经理没有帮你创建
      - git checkout -b xxx 创建并切换到 xxx 分支（将当前分支内容复制到 xxx 分支上）
      - 进行开发
  - 进行开发
    - 本地版本控制
      - git add .
      - git commit -m 'xxx'
    - 提交到远程仓库
      - git push origin xxx
      - 有可能提交失败
        - 网络问题 （等等试试）
        - 本地没有进行版本控制
        - 远程仓库有更新 git pull origin xxx

## Login组件
* 静态组件
* 动态组件
	* 表单校验
		* 首先组件需要得到form属性： 
			* Form.create()(Login)
			* 高阶组件：给被包装组件传递form属性	
			* form: getFieldDecorator/resetFields/validateFields...			
		* getFieldDecorator('username', { rules: [ { required: true, message: 'xxx' } ] })( Input组件 ) 一般用于简单表单校验规则（只有一条规则）
		* getFieldDecorator('username', { rules: [ { validator: this.validator } ] })( Input组件 )  一般用于复杂表单校验规则（有多条校验规则）
	* 登录功能
		* 解决跨域：服务器代理
			* 工作原理：
				* 客户端发送请求到代理服务器(3000),由代理服务器转发请求到目标服务器上
				* 目标服务器将响应给代理服务器，代理服务器将响应内容转发给客户端
				* 客户端和代理服务器符合同源策略，没有跨域问题。 代理服务器和目标服务器又不存在跨域问题。		
			* 使用
				* 在 package.json 加上 proxy: "目标服务器地址"	
				* 修改package.json, 要重启项目

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
