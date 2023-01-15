import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/cartReducer";
const CartContext = createContext();

// ---- Funciton For Retainig Data or Cart from localStorage Start-----
const getLocalCartDataFromLC = () => {
  let newCartData = JSON.parse(localStorage.getItem("teerexShop"));
  if (!newCartData) return [];
  else return newCartData;
};
// ---- Funciton For Retainig Data or Cart from localStorage End-----

//  -----Cart Context Initial State ----- 
const initialState = {
  cart: getLocalCartDataFromLC(),
  total_item: "",
  total_amount: "",
};



// ---------Cart Context Provider Funciton Start-------------
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);



  // ----Add To Cart Function Start----
  const addToCart = (id, color, price, ele) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, price, ele } });
  };
  // ----Add To Cart Function End----



  // -----Increase Qty in Cart function Start----
  const increaseQty = (id) => {
    dispatch({ type: "INCREASE_QTY", payload: id });
  };
  // -----Increase Qty in Cart function End-----



  // ------Decrease Qty in Cart function Start-----
  const decreaseQty = (id) => {
    dispatch({ type: "DECREASE_QTY", payload: id });
  };
  // -----Decrease Qty in Cart function End-----


  // -----Remove Item Form Cart Function Stat-----
  const removeProductFromCart = (id) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: id });
  };
  // -----Remove Item Form Cart Function End-----



  // ------Clear All Item From Cart Function Start----
  const clearCart = () => {
    dispatch({ type: "CLEAR_ALL_CART" });
  };
  // ------Clear All Item From Cart Function End-------



  //   ------Total Item in Cart Function  with useEffect Start------
  useEffect(() => {
    localStorage.setItem("teerexShop", JSON.stringify(state.cart));
    dispatch({ type: "CART_SUBTOTAL_AND_ITEM_QTY" });
  }, [state.cart]);
  //   ---------Total Item in Cart Function with useEffect End------


  // --->Returning cart Context
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeProductFromCart,
        clearCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// ---------Cart Context Provider Funciton End-------------

const useCartContext = () => {
  return useContext(CartContext);
};
export { CartProvider, useCartContext };
