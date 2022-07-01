import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

const checkRoot = document.getElementById("root");
if (checkRoot) {
    const root = ReactDOM.createRoot(checkRoot);
    root.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
}

reportWebVitals();
