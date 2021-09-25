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
    *getListData({ payload }, { call, put }) {
      let data = yield call(getProductData);
      yield put({
        type: "add",
        data,
      });
    },
  },
};
export default TestModal;
