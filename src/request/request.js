import { message } from "antd";
import axios from "axios";
import api from "./api";
// 获取商品列表数据
const getProductData = async (obj) => {
  try {
    const {
      data: { data },
    } = await axios.get(api?.shoppingcarList, { params: obj });
    return data;
  } catch (error) {
    const msg = error?.response?.data?.message ?? "接口错误";
    message.error(msg);
  }
};
export { getProductData };
