import React from "react";
import { useCartContext } from "../context/cart.Context";
import { useFilterContext } from "../context/filter_Context";
import { Link } from "react-router-dom";
import HomePage from "./HomePage";

const NavBar = () => {
  const {
    filters: { text },
    updateProductbyFilter,
  } = useFilterContext();
  const { total_item } = useCartContext();

  return (
    <>
      {/* NavBar Button Start */}
      <nav className="navbar bg-body-tertiary" style={{ marginBottom: "10px" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              style={{ width: "80px" }}
              src="https://media.istockphoto.com/id/874045548/vector/shirt-icon.jpg?s=612x612&w=0&k=20&c=ZJCxsCczemu1XhYRMDCByrYdwotBESuFdC5tkGf1a6g="
              alt="tshirt logo"
            />
            TEEREX STORE
          </Link>
          <Link className="navbar-brand" to="/products">
            PRODUCTS
          </Link>
          {/* NavBar Button End */}

          {/* Navbar Search Form Start */}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="text"
              name="text"
              value={text}
              onChange={updateProductbyFilter}
              placeholder="Search"
              aria-label="Search"
            />
            <p className="btn btn-outline-success" type="submit">
              Search
            </p>
            {/* Cart Icon Start   */}
            <Link to="/cart">
              <i className="fa-solid fa-2x fa-cart-shopping">
                {total_item > 0 ? total_item : null}
              </i>
            </Link>
            {/* Cart Icon End */}
          </form>
          {/* Navbar Search Form End */}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
