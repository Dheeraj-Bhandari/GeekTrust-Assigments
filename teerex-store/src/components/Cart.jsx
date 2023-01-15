import React from "react";
import { useCartContext } from "../context/cart.Context";
import "./cartCss.css";
const Cart = () => {
  const { cart, removeProductFromCart, clearCart, increaseQty, decreaseQty ,total_amount } =
    useCartContext();
  
  // -------checking If Cart is empty then Showing Message------ Start
  if (cart.length == 0) {
    return (
      <div>
       
        <h1 style={{ textAlign: "center" }}>No Item in Cart</h1>
      </div>
    );
  }
  // -------checking If Cart is empty then Showing Message------ End

  // -------Else Showing Cart Item Start-------
  return (
    <>
     
      <div className="cart-Container">
        <table>
            <thead>

          <tr className="cart-titles">
            <th>PRODUCT</th>
            <th>QTY</th>
            <th>PRICE</th>
            <th>SUBTOTAL</th>
            <th>REMOVE</th>
          </tr>
            </thead>
        {/*  ------Cart Item Section Start-------*/}
          {cart?.map((ele, index) => {
            return (
              <tfoot key={index}>
                <div className="cart-card-item">
                  <img src={ele.image} alt={ele.name} />
                  <div>
                    {ele.name}
                    <button
                      type="button"
                      className="btnStyle"
                      style={{
                        backgroundColor: ele.color,
                        margin: "5px",
                        direction: "none",
                      }}
                    >
                      {ele.color}
                    </button>
                  </div>
                </div>

                <td>
                  <i
                    className="fa fa-minus"
                    aria-hidden="true"
                    onClick={() => decreaseQty(ele.id)}
                  ></i>
                  <span style={{ color: "blue" }}> {ele.qty} </span>
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    onClick={() => increaseQty(ele.id)}
                  ></i>
                </td>
                <td>{ele.price}</td>
                <td>{ele.price * ele.qty}</td>
                <td onClick={() => removeProductFromCart(ele.id)}>
                  <i class="fa-solid fa-trash-can"></i>
                </td>
              </tfoot>
            );
          })}
         {/*  ------Cart Item Section End-------*/}
        </table>

          {/* ----Cart Total Section Start */}
        <div className="cart-btns">
          <button className="btn btn-dark">CHECKOUT</button>
          <button className="btn btn-danger" onClick={clearCart}>
            CLEAR CART
          </button>
        </div>
        <div className="cart-totals">
          <div className="cart-total-value">
            <h4>SUBTOTAL- </h4>
            <h4>Rs {total_amount}</h4>
          </div>
          <div className="cart-total-value">
            <h4>Shipping- </h4>
            <h4>Rs 250</h4>
          </div>
          
          <div className="cart-total-value">
            <h4>TOTAL CART VALUE - </h4>
            <h4>Rs {total_amount+250}</h4>
          </div>
        </div>
          {/* ----Cart Total Section End */}

      </div>
    </>
  );
};
// -------Else Showing Cart Item End-------
export default Cart;
