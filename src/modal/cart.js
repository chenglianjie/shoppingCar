// 初始initState
// const getDefaultState = () => {
//   let carData = localStorage.getItem("")
//     ? JSON.parse(localStorage.getItem(""))
//     : [];
//   return { carData };
// };
// 购物车model
const TestModal = {
  namespace: "cart",
  state: {
    carData: [],
  },
  reducers: {
    addCar(state, { action }) {
      return {
        ...state,
        carData: action?.newCarData,
      };
    },
  },
  effects: {
    *asyncAdd({ payload }, { call, put }) {
      // yield call(delay, 1000)
      yield put({
        type: "add",
        payload,
      });
    },
  },
};
export default TestModal;
