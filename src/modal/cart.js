// 购物车model
const CartModal = {
  namespace: "cart",
  state: {
    carData: [], // 购物车数据数组
  },
  reducers: {
    // 加入购物车
    addCar(state, { action }) {
      return {
        ...state,
        carData: action?.newCarData,
      };
    },
    // 加入购物车
    changeCar(state, { action }) {
      return {
        ...state,
        carData: action?.newCarData,
      };
    },
    // 删除购物车
    decreaseCar(state, { action }) {
      return {
        ...state,
        carData: action?.newCarData,
      };
    },
  },
  effects: {},
};
export default CartModal;
