import React from "react";

import { useFilterContext  } from "../context/filter_Context";

const NavBar = () => {
    
    const {filters: {text},updateProductbyFilter} = useFilterContext()
    
  return (
    <>
    <nav className="navbar bg-body-tertiary" style={{"marginBottom":"10px"}}>
    <div className="container-fluid">
      <a className="navbar-brand">TEEREX STORE</a>
      <a className="navbar-brand" >PRODUCTS</a>
      
      <form className="d-flex" role="search">
        
        <input className="form-control me-2" type="text" name="text" value={text} onChange={updateProductbyFilter} placeholder="Search" aria-label="Search" />
        <p className="btn btn-outline-success" type="submit" >Search</p>
       <i className="fa-solid fa-2x fa-cart-shopping"></i>
      </form>
    </div>
  </nav>
 
  </>
  );
};

export default NavBar;
