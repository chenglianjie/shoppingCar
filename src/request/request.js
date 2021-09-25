import axios from "axios";
// 获取商品列表数据
const getProductData = async (obj) => {
  console.log("参数", obj);
  const {
    data: { data },
  } = await axios.get("http://127.0.0.1:3030/shoppingCat", { params: obj });
  return data;
};
export { getProductData };
