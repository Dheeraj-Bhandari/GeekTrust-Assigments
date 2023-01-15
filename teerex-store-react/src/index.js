import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { FilterContextProvider } from "./context/filter_Context";
import { AppProvider } from "./context/product_Context";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/cart.Context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <AppProvider>
    <FilterContextProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FilterContextProvider>
  </AppProvider>
</BrowserRouter>
);

