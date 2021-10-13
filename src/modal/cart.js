import { cloneDeep } from "loadsh";
// 购物车model
const CartModal = {
  namespace: "cart",
  state: {
    carData: [], // 购物车数据数组
  },
  reducers: {
    // 加入购物车
    addCar(state, { action }) {
      // 深拷贝商品列表和购物车数据
      let newCarData = cloneDeep(state?.carData);
      let newListDta = cloneDeep(action?.listData ?? []);
      // 判断商品在购物车中是否存在，如果存在数量加1
      let flag = true;
      newCarData.forEach((item) => {
        if (item.id === action?.id) {
          item.number += 1;
          flag = false;
        }
      });
      if (flag) {
        let arr = newListDta.filter((item) => {
          return item?.id === action?.id;
        });
        newCarData = [...newCarData, ...arr];
      }
      return {
        ...state,
        carData: newCarData,
      };
    },
    // 删除购物车
    decreaseCar(state, { action }) {
      let newCarData = cloneDeep(state?.carData);
      newCarData = newCarData.filter((item) => item.id !== action?.id);
      return {
        ...state,
        carData: newCarData,
      };
    },
  },
  effects: {},
};
export default CartModal;
