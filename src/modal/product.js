import { getProductData } from "../request/request";
// 商品列表model
const TestModal = {
  namespace: "product",
  state: {
    listData: [],
  },
  reducers: {
    add(state, { data }) {
      return {
        ...state,
        listData: data,
      };
    },
  },
  effects: {
    *getListData({ action }, { call, put }) {
      let data = yield call(getProductData, action);
      yield put({
        type: "add",
        data,
      });
    },
  },
};
export default TestModal;
