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
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { cloneDeep } from "loadsh";
import "./style/index.css";
const { Option } = Select;
// 型号数组
const plainOptions = ["XS", "S", "M", "ML", "L", "XL", "XXL"];
// 购物车组件
const ShoppingCart = () => {
  const dispatch = useDispatch();
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
    dispatch({ type: "product/getListData" });
  }, []);
  useUpdateEffect(() => {
    console.log("我执行了");
    getTotalPrice(carData);
  }, [carData]);
  const checkboxOnchange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };
  const selecthOnchange = (value) => {
    console.log(`selected ${value}`);
  };
  // 商品数量改变 onchange
  const numberOnChange = (value) => {
    console.log(`number ${value}`);
  };
  // 删除购物车中的商品
  const delProducts = (id) => {
    let newCarData = cloneDeep(carData);
    newCarData = newCarData.filter((item) => item.id !== id);
    localStorage.setItem("carData", JSON.stringify(newCarData));
    dispatch({ type: "cart/addCar", action: { newCarData } });
  };
  // 关闭购物车
  const onClose = () => {
    setVisible(false);
  };
  // 打开购物车
  const openShopingCar = () => {
    // 打开购物车是计算购物车中商品的价格
    getTotalPrice(carData);
    setVisible(true);
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
  };
  // 计算购物车商品总价格
  const getTotalPrice = (arr) => {
    let totalPrice = 0;
    for (var i in arr) {
      totalPrice = totalPrice + arr[i].price * arr[i].number;
    }
    setTotalPrice(totalPrice.toFixed(2));
  };
  return (
    <div className="box">
      <div className="left">
        <Checkbox.Group
          options={plainOptions}
          defaultValue={plainOptions}
          onChange={checkboxOnchange}
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
              defaultValue="lower"
              style={{ width: 120 }}
              onChange={selecthOnchange}
            >
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
                openShopingCar();
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
            onClose={onClose}
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
              <div> 合计：{totalPrice}</div>
              <div>
                <Button type="primary">结算</Button>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCart;
