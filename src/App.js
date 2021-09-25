import { useDispatch, useSelector } from "dva";
import "./app.css";
import Size from "./component/size";
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
      <Size />
    </div>
  );
}
export default App;
