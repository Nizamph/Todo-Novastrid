import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoContainer from "./components/TodoContainer";
import { Provider } from "react-redux";
import store from "./store/store";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Provider store={store}>
        <TodoContainer />
      </Provider>
    </div>
  );
}

export default App;
