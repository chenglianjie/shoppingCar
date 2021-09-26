import { useState, useEffect } from "react";
import { useUpdateEffect } from "ahooks";
import { useDispatch, useSelector } from "dva";
import {
  Checkbox,
  Select,
  Button,
  Badge,
  InputNumber,
  Tooltip,
  Drawer,
  message,
  Modal,
} from "antd";
import {
  ShoppingCartOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { cloneDeep } from "loadsh";
import "./style/index.css";
const { Option } = Select;
const { confirm } = Modal;
// 型号数组
const plainOptions = ["XS", "S", "M", "ML", "L", "XL", "XXL"];
// 购物车组件
const ShoppingCart = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("normal"); // 价格筛选
  const [size, setSize] = useState(plainOptions); // 筛选的型号
  const [visible, setVisible] = useState(false); // 购物车是否弹出
  const [totalPrice, setTotalPrice] = useState(0); // 购物车商品总价格
  // 拿到商品列表数组和购物车数组
  const { product, cart } = useSelector((store) => {
    return store;
  });
  const { listData = [] } = product;
  const { carData = [] } = cart;
  useEffect(() => {
    // 判断是否有购物车数据缓存
    let carData = JSON.parse(localStorage.getItem("carData"));
    if (carData) {
      dispatch({ type: "cart/addCar", action: { newCarData: carData } });
    }
    // 获得商品列表数据
    dispatch({ type: "product/getListData", action: { size, filter } });
  }, []);
  useUpdateEffect(() => {
    getTotalPrice(carData);
  }, [carData]);
  useUpdateEffect(() => {
    dispatch({ type: "product/getListData", action: { size, filter } });
  }, [size, filter]);
  // 商品数量改变 onchange
  const numberOnChange = (value) => {
    console.log(`number ${value}`);
  };
  // 删除购物车中的商品
  const delProducts = (id) => {
    confirm({
      title: "你确定要删除此件商品嘛？",
      icon: <ExclamationCircleOutlined />,
      content: "小主要不再考虑一下吧",
      okText: "删除",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        let newCarData = cloneDeep(carData);
        newCarData = newCarData.filter((item) => item.id !== id);
        localStorage.setItem("carData", JSON.stringify(newCarData));
        dispatch({ type: "cart/addCar", action: { newCarData } });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  // 打开或关闭购物车
  const openOrCloseShoppingCar = (value, open) => {
    if (open) {
      // 打开购物车是计算购物车中商品的价格
      getTotalPrice(carData);
    }
    setVisible(value);
  };
  // 加入购物车
  const addShopingCar = (id) => {
    // 深拷贝商品列表和购物车数据
    let newCarData = cloneDeep(carData);
    let newListDta = cloneDeep(listData);
    // 判断商品在购物车中是否存在，如果存在数量加1
    let flag = true;
    newCarData.forEach((item) => {
      if (item.id === id) {
        item.number += 1;
        flag = false;
      }
    });
    if (flag) {
      let arr = newListDta.filter((item) => {
        return item?.id === id;
      });
      newCarData = [...newCarData, ...arr];
    }
    localStorage.setItem("carData", JSON.stringify(newCarData));
    dispatch({ type: "cart/addCar", action: { newCarData } });
    message.success("加入购物车成功");
  };

  // 计算购物车商品总价格
  const getTotalPrice = (arr) => {
    let totalPrice = 0;
    for (var i in arr) {
      totalPrice = totalPrice + arr[i].price * arr[i].number;
    }
    setTotalPrice(totalPrice.toFixed(2));
  };
  // 结算
  const settlement = () => {
    confirm({
      title: "你确定要结算购物车中的商品嘛？",
      icon: <ExclamationCircleOutlined />,
      content: `合计价格${totalPrice}`,
      okText: "确定结算",
      cancelText: "取消",
      onOk() {
        localStorage.clear("carData");
        dispatch({ type: "cart/addCar", action: { newCarData: [] } });
        setVisible(false);
        message.success("购买成功，商品正在路上");
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };
  return (
    <div className="box">
      <div className="left">
        <Checkbox.Group
          options={plainOptions}
          value={size}
          onChange={(value) => setSize(value)}
        />
      </div>
      <div className="center">
        <div className="filter-header">
          <div className="filter-header-title">
            <span className="product-number">{listData?.length}</span>{" "}
            件商品被找到
          </div>
          <div className="selects">
            <span>价格排序：</span>
            <Select
              value={filter}
              style={{ width: 120 }}
              onChange={(value) => {
                setFilter(value);
              }}
            >
              <Option value="normal">normal</Option>
              <Option value="lower">lowestprice</Option>
              <Option value="high">highestprice</Option>
            </Select>
          </div>
        </div>
        <div className="goodsList">
          {/* 渲染商品列表 */}
          {listData.map((item) => {
            return (
              <div className="goods-item" key={item?.id}>
                <div>
                  <img
                    className="goods-list-img"
                    src={require(`./img/${item?.sku}_1.jpg`).default}
                    alt=""
                  />
                </div>
                <div className="goods-list-tite">
                  <Tooltip title="标题">{item?.title}</Tooltip>
                </div>
                <div>
                  型号：
                  {item?.availableSizes.map((item, index, arr) => {
                    let length = arr.length;
                    if (length === 1 || index + 1 === length) {
                      return <span key={index}>{item}</span>;
                    }
                    return <span key={index}>{item}，</span>;
                  })}
                </div>
                <div>价格：${item?.price}</div>
                <div>
                  <Button
                    type="primary"
                    onClick={() => {
                      addShopingCar(item?.id);
                    }}
                  >
                    加入购物车
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* 购物车 */}
      <div className="right">
        <div>
          <Badge count={carData?.length} size="small" offset={[-301, 15]}>
            <div
              className="carts"
              onClick={() => {
                openOrCloseShoppingCar(true, "open");
              }}
            >
              <ShoppingCartOutlined />
              购物车
            </div>
          </Badge>
          <Drawer
            destroyOnClose={true}
            width={530}
            mask={false}
            title="购物车"
            placement="right"
            onClose={() => {
              openOrCloseShoppingCar(false);
            }}
            visible={visible}
          >
            <div className="shop-cart-item-box test-5">
              {carData.map((item) => {
                return (
                  <div className="shop-cart-item" key={item?.id}>
                    <div>
                      <img
                        className="cart-img"
                        src={require(`./img/${item.sku}_1.jpg`).default}
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="goods-tite">
                        <Tooltip title="标题">{item?.title}</Tooltip>
                      </div>
                      <div className="goods-sizes">
                        型号：
                        {item?.availableSizes.map((item, index, arr) => {
                          let length = arr.length;
                          if (length === 1 || index + 1 === length) {
                            return <span key={index}>{item}</span>;
                          }
                          return <span key={index}>{item}，</span>;
                        })}
                      </div>
                      <div className="goods-privce">
                        <span className="privace">价格：${item?.price}</span>
                      </div>
                      数量：
                      <InputNumber
                        style={{ width: 80 }}
                        size="small"
                        min={1}
                        max={10}
                        defaultValue={item?.number}
                        onChange={() => {
                          numberOnChange(item?.id);
                        }}
                      />
                    </div>
                    <div className="del-button">
                      <Button
                        type="primary"
                        onClick={() => {
                          delProducts(item?.id);
                        }}
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="total">
              <div> 合计：${totalPrice}</div>
              <div>
                <Button
                  type="primary"
                  onClick={() => {
                    settlement();
                  }}
                >
                  结算
                </Button>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCart;