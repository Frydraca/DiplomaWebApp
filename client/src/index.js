import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import history from "./store/applicationHistory";
import { store } from "./store";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
