import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { FilterContextProvider } from "./context/filter_Context";
import { AppProvider } from "./context/product_Context";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <FilterContextProvider>
      <App />
    </FilterContextProvider>
  </AppProvider>
);
