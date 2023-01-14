import React, { useEffect, useState } from "react";
import "./productListingCss.css";
import { useProductContext } from "../context/product_Context";
import { useFilterContext } from "../context/filter_Context";

const ProductListing = () => {
  const { isLoading, products } = useProductContext();
  const {
    filters: { type , color},
    filter_Products,
    sorting,
    all_products,
    updateProductbyFilter,
  } = useFilterContext();

  // TO GET THE UNIQUE DATA FOR EACH FIED DEFINED IN FILTER SECTION

  const getUniqueData = (data, property) => {
    let newVal = data.map((ele) => {
      return ele[property];
    });
    return (newVal = ["All", ...new Set(newVal)]);
  };

  // Common Function for Filtering Date from Sidebar (DRY)

  const filterByCategoryType = getUniqueData(all_products, "type");
  const filterByCategoryColor = getUniqueData(all_products, "color");
  

  if (isLoading) {
    return <div>...Loading Teerex</div>;
  }

  return (
    <>
      <div className="main">
        {/* SideFilter Start Here */}
        <div className="SideBar-Filter">
          {/* Filter by Sort*/}
          <div className="sort-selection">
            <form action="#">
              <label htmlFor="sort">
                <select
                  name="sort"
                  className="sort-selection--style"
                  onChange={sorting}
                >
                  <option value="lowest">Price - Low - High</option>
                  <option value="#" disabled></option>
                  <option value="highest">Price - High - Low</option>
                  <option value="#" disabled></option>
                  <option value="a-z">Product A-Z</option>
                  <option value="#" disabled></option>
                  <option value="z-a">Product Z-A</option>
                </select>
              </label>
            </form>
          </div>
          {/* Filter by Sort End*/}

          {/* Filter By Type start */}
          <div className="form-check">
            <h6>Filter By Type</h6>

            {filterByCategoryType.map((ele, index) => {
              return (
                <>
                  <input
                    className="form-check-input"
                    type="radio"
                    value={ele}
                    id="flexCheckDefault"
                    name="type"
                    key={index}
                    onChange={updateProductbyFilter}
                  />

                  <label className="form-check-label" htmlFor={ele}>
                    {ele}
                  </label>
                  <br />
                </>
              );
            })}
          </div>
            {/* Filter By Type End */}

            {/* Filter by Gender*/}
          <div className="gender-selection">
          <h6>Filter By Gender</h6>
            <form action="#">
              <label htmlFor="gender">
                <select
                  name="gender"
                  
                  className="sort-selection--style"
                  onChange={updateProductbyFilter}
                >
                  <option value="all">ALL</option>
                  <option value="#" disabled></option>
                  <option value="Men">MALE</option>
                  <option value="#" disabled></option>
                  <option value="Women">FEMALE</option>
                  
                 
                </select>
              </label>
            </form>
          </div>
          {/* Filter by Gender End*/}
          
          {/* Filter by  Color*/}
          <div className="color-selection">
          <h6>Filter By Color</h6>
          
           {filterByCategoryColor.map((ele, index)=>{
            if(ele==="All"){
              return (
                <i type="button" 
                value={ele} 
                key={index} 
                name="color"
                // style={{ margin:'5px'}} 
                onClick={updateProductbyFilter}
                 className="btnStyle" >
                 All
                </i>
              )
            }
           else return (
              <button type="button" 
              value={ele} 
              key={index} 
              name="color"
              style={{backgroundColor: ele, margin:'5px' }} 
              
              onClick={updateProductbyFilter}
               className={color===ele ? "btnStyle fa fa-check" : "btnStyle not-selected"  }>
                {color === ele ? "" : null}
              </button>
            )
           })}
          </div>
          {/* Filter by  Color End*/}


          {/* Filter by  Color*/}
           
          {/* Filter by  Color End*/}


        
        </div>
        {/* SideFilter End Here */}
        <div className="Products-Cards">
          {filter_Products?.map((ele) => {
            return (
              <div className="Product-Card" key={ele.id}>
                <img src={ele.imageURL} alt={ele.name} />
                <h3 className="card-title ">{ele.name}</h3>
                <p>Rs. {ele.price}</p>
                <button type="button" className="btn btn-success">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductListing;