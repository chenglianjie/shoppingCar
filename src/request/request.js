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
    console.error(error);
  }
};
export { getProductData };
