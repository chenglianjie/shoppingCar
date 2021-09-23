const TestModal = {
  namespace: "test",
  state: {
    num: "test",
    name: "初始名字",
  },
  reducers: {
    test(state, { data }) {
      console.log("reducer data", data);
      return {
        ...state,
        name: data.name,
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
