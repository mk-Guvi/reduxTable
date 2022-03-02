import { Provider } from "react-redux";
import "./App.css";
import ReduxTable from "./container/Table";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <ReduxTable />
    </Provider>
  );
}

export default App;
