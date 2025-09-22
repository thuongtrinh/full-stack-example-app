import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./styles/styles.scss";

import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";

import { Provider } from "react-redux";
import reduxStore, { persistor } from "./redux";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";

const renderApp = () => {
  const root = createRoot(document.getElementById("root"));

  root.render(
    <React.StrictMode>
      <Provider store={reduxStore}>
        <BrowserRouter>
          <IntlProviderWrapper>
            <App persistor={persistor} />
          </IntlProviderWrapper>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
