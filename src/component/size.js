import { useState } from "react";
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
import "./style/index.css";
const plainOptions = ["XS", "S", "M", "ML", "L", "XL", "XXL"];

const Size = () => {
  const [visible, setVisible] = useState(false);
  const { Option } = Select;
  const checkboxOnchange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };
  const selecthOnchange = (value) => {
    console.log(`selected ${value}`);
  };
  const numberOnChange = (value) => {
    console.log(`number ${value}`);
  };
  // 关闭购物车
  const onClose = () => {
    setVisible(false);
  };
  // 打开购物车
  const openShopingCar = () => {
    setVisible(true);
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
          <div className="filter-header-title">商品被找到</div>
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
          <div className="goods-item">
            <div>
              <img
                className="goods-list-img"
                src={require(`./img/100_1.jpg`).default}
                alt=""
              />
            </div>
            <div className="goods-list-tite">
              <Tooltip title="标题">Cat Tee Black T-Shirt</Tooltip>
            </div>
            <div>型号：s，m </div>
            <div>库存：10</div>
            <div>价格：10 </div>
            <div>
              <Button type="primary">加入购物车</Button>
            </div>
          </div>
          <div className="goods-item"></div>
          <div className="goods-item"></div>
          <div className="goods-item"></div>
          <div className="goods-item"></div>
          <div className="goods-item"></div>
          <div className="goods-item"></div>
          <div className="goods-item"></div>
        </div>
      </div>
      {/* 购物车 */}
      <div className="right">
        <div>
          <Badge count={5} size="small" offset={[-301, 15]}>
            <div className="carts" onClick={openShopingCar}>
              <ShoppingCartOutlined />
              购物车
            </div>
          </Badge>
          <Drawer
            width={530}
            mask={false}
            title="购物车"
            placement="right"
            onClose={onClose}
            visible={visible}
          >
            <div className="shop-cart-item-box test-5">
              <div className="shop-cart-item">
                <div>
                  <img
                    className="cart-img"
                    src={require("./img/100_1.jpg")}
                    alt=""
                  />
                </div>
                <div>
                  <div className="goods-tite">
                    <Tooltip title="标题">Cat Tee Black T-Shirt</Tooltip>
                  </div>
                  <div className="goods-sizes">型号：S,XS</div>
                  <div className="goods-privce">
                    <span className="privace">价格：10</span>
                    库存：10
                  </div>
                  数量:
                  <InputNumber
                    style={{ width: 80, height: 30 }}
                    size="small"
                    min={1}
                    max={10}
                    defaultValue={3}
                    onChange={numberOnChange}
                  />
                </div>
                <div className="del-button">
                  <Button type="primary">删除</Button>
                </div>
              </div>
              <div className="shop-cart-item">
                <div>
                  <img
                    className="cart-img"
                    src={require("./img/100_1.jpg")}
                    alt=""
                  />
                </div>
                <div>
                  <div className="goods-tite">
                    <Tooltip title="标题">Cat Tee Black T-Shirt</Tooltip>
                  </div>
                  <div className="goods-sizes">型号：S,XS</div>
                  <div className="goods-privce">
                    <span className="privace">价格：10</span>
                    库存：10
                  </div>
                  数量:
                  <InputNumber
                    style={{ width: 80, height: 30 }}
                    size="small"
                    min={1}
                    max={10}
                    defaultValue={3}
                    onChange={numberOnChange}
                  />
                </div>
                <div className="del-button">
                  <Button type="primary">删除</Button>
                </div>
              </div>
              <div className="shop-cart-item">
                <div>
                  <img
                    className="cart-img"
                    src={require("./img/100_1.jpg")}
                    alt=""
                  />
                </div>
                <div>
                  <div className="goods-tite">
                    <Tooltip title="标题">Cat Tee Black T-Shirt</Tooltip>
                  </div>
                  <div className="goods-sizes">型号：S,XS</div>
                  <div className="goods-privce">
                    <span className="privace">价格：10</span>
                    库存：10
                  </div>
                  数量:
                  <InputNumber
                    style={{ width: 80, height: 30 }}
                    size="small"
                    min={1}
                    max={10}
                    defaultValue={3}
                    onChange={numberOnChange}
                  />
                </div>
                <div className="del-button">
                  <Button type="primary">删除</Button>
                </div>
              </div>
              <div className="shop-cart-item">
                <div>
                  <img
                    className="cart-img"
                    src={require("./img/100_1.jpg")}
                    alt=""
                  />
                </div>
                <div>
                  <div className="goods-tite">
                    <Tooltip title="标题">Cat Tee Black T-Shirt</Tooltip>
                  </div>
                  <div className="goods-sizes">型号：S,XS</div>
                  <div className="goods-privce">
                    <span className="privace">价格：10</span>
                    库存：10
                  </div>
                  数量:
                  <InputNumber
                    style={{ width: 80, height: 30 }}
                    size="small"
                    min={1}
                    max={10}
                    defaultValue={3}
                    onChange={numberOnChange}
                  />
                </div>
                <div className="del-button">
                  <Button type="primary">删除</Button>
                </div>
              </div>
              <div className="shop-cart-item">
                <div>
                  <img
                    className="cart-img"
                    src={require("./img/100_1.jpg")}
                    alt=""
                  />
                </div>
                <div>
                  <div className="goods-tite">
                    <Tooltip title="标题">Cat Tee Black T-Shirt</Tooltip>
                  </div>
                  <div className="goods-sizes">型号：S,XS</div>
                  <div className="goods-privce">
                    <span className="privace">价格：10</span>
                    库存：10
                  </div>
                  数量:
                  <InputNumber
                    style={{ width: 80, height: 30 }}
                    size="small"
                    min={1}
                    max={10}
                    defaultValue={3}
                    onChange={numberOnChange}
                  />
                </div>
                <div className="del-button">
                  <Button type="primary">删除</Button>
                </div>
              </div>
            </div>
            <div className="total">
              <div> 合计：100</div>
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
export default Size;
