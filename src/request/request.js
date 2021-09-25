import axios from "axios";
// 获取商品列表数据
const getProductData = async () => {
  const {
    data: { data },
  } = await axios.get("http://127.0.0.1:3030/shoppingCat");
  return data?.products;
};
export { getProductData };
