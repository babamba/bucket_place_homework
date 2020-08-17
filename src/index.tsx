import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "mobx-react";
import "mobx-react-lite/batchingForReactDom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import RootStore from "./stores/index";

const rootStore = new RootStore(); // *** 루트 스토어 생성

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider {...rootStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
