import React from "react";
import { useCartContext } from "../context/cart.Context";
import { useFilterContext  } from "../context/filter_Context";

import { Link } from "react-router-dom";
const NavBar = () => {
    
    const {filters: {text},updateProductbyFilter} = useFilterContext()
    const { total_item } = useCartContext();
  return (
    <>

    <nav className="navbar bg-body-tertiary" style={{"marginBottom":"10px"}}>
    <div className="container-fluid">
      <a className="navbar-brand">TEEREX STORE</a>
      <Link className="navbar-brand" to="/products">PRODUCTS</Link>
      
      <form className="d-flex" role="search">
        
        <input className="form-control me-2" type="text" name="text" value={text} onChange={updateProductbyFilter} placeholder="Search" aria-label="Search" />
        <p className="btn btn-outline-success" type="submit" >Search</p>
        <Link to="/cart"><i className="fa-solid fa-2x fa-cart-shopping">{total_item>0 ? total_item : null}</i></Link>
       
      </form>
    </div>
  </nav>


 
  </>
  );
};

export default NavBar;
