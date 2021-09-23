import { useDispatch, useSelector } from "dva";
function App() {
  const app = useSelector((store) => {
    return store.test;
  });
  const dispatch = useDispatch();
  const click = () => {
    dispatch({ type: "test/test", data: { name: "jimmy" } });
  };
  return (
    <div className="App">
      hello react
      <button
        onClick={() => {
          click();
        }}
      >
        点击
      </button>
      <div>名字：{app?.name}</div>
    </div>
  );
}
export default App;
