import React, { Component } from "react";
import { Card, Select, Input, Button, Icon, Table, message } from "antd";

import { reqGetProductList, reqSearchProduct ,reqUpdateProductStatus} from "$api";

export default class Product extends Component {
  state = {
    productList: [],
    total: 0,
    isLoading: false,
    // 收集表单数据
    searchType: "productName",
    searchValue: ""
  };
  // 实例对象的属性
  currentSearchValue = "";

  columns = [
    {
      title: "商品名称",
      dataIndex: "name"
    },
    {
      title: "商品描述",
      dataIndex: "desc"
    },
    {
      title: "商品价格",
      dataIndex: "price",
      // 如果要显示的内容除了数据本身还有一些其他东西，使用render方法
      render: price => {
        return `￥ ${price}`;
      }
    },
    {
      title: "商品状态",
      // dataIndex: "status",
      render: ({ _id, status }) => {
        /*
          status：
            1 已下架
            2 已上架
        */
       if (status === 1) {
        return (
          <div>
            <Button
              type='primary'
              onClick={this.updateProductStatus(_id, status)}
            >
              上架
            </Button>
            <span>已下架</span>
          </div>
        );
      }
        return (
          <div>
            <Button
              type='primary'
              onClick={this.updateProductStatus(_id, status)}
            >
              下架
            </Button>
            <span>已上架</span>
          </div>
        );
      }
    },
    {
      title: "操作",
      // dataIndex: "xxx",
      render: product => {
        /*
          如果dataIndex: '_id', 那么render方法中 product 就是 product._id。就是id
          如果没有 dataIndex，那么render方法中 product 就是整个商品数据
        */
        return (
          <div>
            <Button type="link">详情</Button>
            <Button type="link" onClick={this.showUpdateProduct(product)}>
              修改
            </Button>
          </div>
        );
      }
    }
  ];

  // 更新商品状态
  updateProductStatus = (productId, status) => {
    return () => {
      /*
        状态要传入修改后的值
          1 --> 2
          2 --> 1
      */
     const newStatus = 3 - status;
      reqUpdateProductStatus(productId, newStatus)
        .then(res => {
          // 请求成功： 更新state中的数据
          this.setState({
            productList: this.state.productList.map((product) => {
              if (product._id === productId) {
                return {
                  // 展开对象：包含对象的所有属性
                  ...product,
                  // 添加一个新属性，覆盖掉旧属性
                  status: newStatus
                }
              }
              return product;
            })
          })
          message.success('更新商品状态成功~');
        })
        .catch(err => {
          message.error(err);
        });
    };
  };

  // 显示更新商品页面
  // 高阶函数：通过闭包来使用传入的值
  showUpdateProduct = product => {
    return () => {
      // 获取当前点击商品的id
      const id = product._id;
      // 跳转地址
      // history.push(路径, 传递数据) 他们不是父子组件 是兄弟组件
      // 怎么获取路由传递的数据呢？ location.state
      this.props.history.push("/product/update/" + id, product);
    };
  };

  getProductList = (pageNum, pageSize) => {
    // 在请求之前 isLoading = true
    // 在请求结束 isLoading = false

    this.setState({
      isLoading: true
    });
    /*
      区分两种请求： 1. 普通获取商品数据  2. 搜索商品数据
        解决：
          1. 看是否有searchValue？
            问题：如果没有点击搜索按钮，此时输入searchValue。请问：要不要搜索。不要搜索
          2. 传入第三个参数
            isSearch: true/false --> true代表搜索 false代表没有搜索
            问题：第一次点击了搜索按钮，第二次点击页面换成第二页。此时触发分页器的onChange事件
              事件回调函数只会传入两个参数，isSearch是undefined。导致搜索失效
          3. 定义属性 currentSearchValue： 保证只有点击搜索按钮才会有值
            注意：不能定义成state，因为state是异步更新的
            解决：没有点过搜索按钮就是普通查询，点过了搜索才是搜索
    */

    // setState是异步更新的 拿不到  作为属性更新是同步的才能获取
    const { currentSearchValue } = this;
    reqGetProductList(pageNum, pageSize);
    const { searchType } = this.state;

    let promise = null;

    // 点击搜索按钮 currentSearchValue才会有值
    if (currentSearchValue) {
      // console.log('搜索商品');
      /*
        搜索的值是 searchValue 还是 currentSearchValue？ currentSearchValue
        因为当改变了searchValue的值(input里的值)但是没点击搜索 点击下面的分页器应是之前的searchValue所搜索的内容
      */
      promise = reqSearchProduct({
        pageNum,
        pageSize,
        searchValue: currentSearchValue,
        searchType
      });
    } else {
      // console.log('普通获取商品');
      promise = reqGetProductList(pageNum, pageSize);
    }

    promise
      .then(response => {
        // console.log(response);
        this.setState({
          productList: response.list,
          total: response.total,
          // 当修改了searchValue的值(input里的值)但是没点击搜索 还是按照之前的搜索 需要将searchValue值改回来
          // 同时input和状态中的searchValue值绑定在一起
          searchValue: currentSearchValue
        });
        message.success(
          `${currentSearchValue ? "搜索" : "获取"}商品列表数据成功~`
        );
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => {
        // 多次setState调用会合并成最后一次。
        this.setState({
          isLoading: false
        });
      });
  };

  componentDidMount() {
    this.getProductList(1, 3);
  }

  // 显示添加商品组件
  showAddProduct = () => {
    // 切换地址栏
    this.props.history.push("/product/add");
  };

  // 收集数据
  /*
      正常的DOM(Input)的change事件的参数 是 event  --> e.target.value
      但是，现在是给Select组件绑定change事件，它的参数是value
    */
  handleSelect = value => {
    // console.log(value);
    this.setState({
      searchType: value
    });
  };
  handleInput = e => {
    this.setState({
      searchValue: e.target.value.trim()
    });
  };
  // 搜索产品
  search = () => {
    const { searchValue } = this.state;

    // currentSearchValue什么时候有值？ 只有点击搜索按钮才有值。
    this.currentSearchValue = searchValue;

    this.getProductList(1, 3);
  };

  render() {
    const {
      productList,
      total,
      isLoading,
      searchType,
      searchValue
    } = this.state;
    return (
      <Card
        title={
          <div>
            <Select defaultValue={searchType} onChange={this.handleSelect}>
              <Select.Option value="productName">根据商品名称</Select.Option>
              <Select.Option value="productDesc">根据商品描述</Select.Option>
            </Select>
            <Input
              placeholder="关键字"
              style={{ width: 200, margin: "0 10px" }}
              onChange={this.handleInput}
              value={searchValue}
            />
            <Button type="primary" onClick={this.search}>
              搜索
            </Button>
          </div>
        }
        extra={
          <Button type="primary" onClick={this.showAddProduct}>
            <Icon type="plus" />
            添加商品
          </Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={productList}
          bordered
          pagination={{
            pageSizeOptions: ["3", "6", "9", "12"],
            defaultPageSize: 3,
            showSizeChanger: true,
            showQuickJumper: true,
            total,
            // 页码发生变化触发的函数
            onChange: this.getProductList,
            // pageSize 变化的回调
            onShowSizeChange: this.getProductList
          }}
          rowKey="_id"
          // 是否在加载中
          loading={isLoading}
        />
      </Card>
    );
  }
}
