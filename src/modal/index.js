const TestModal = {
  namespace: "home",
  state: {
    num: 0,
  },
  reducers: {
    add(state, { payload }) {
      return {
        ...state,
        num: state.num + payload.num,
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
