import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";

//redux
import { createStore } from "redux";
import sessionStorage from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

function reducer(currentState: any, action: any) {
  if (currentState === undefined) {
    return {
      user: {},
      isLogin: false,
    };
  }

  const newState = { ...currentState };

  if (action.type === "login") {
    newState.user = action.userData;
    // console.log(newState.user, "store");
    newState.isLogin = true;
    return newState;
  }

  if (action.type === "logout") {
    newState.user = {};
    newState.isLogin = false;
    return newState;
  }
  if (action.type === "join") {
    newState.user = action.userData;
    newState.isLogin = true; //자동으로 로그인되게 해야 함
    return newState;
  }

  return newState;
}

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <CssBaseline />
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
