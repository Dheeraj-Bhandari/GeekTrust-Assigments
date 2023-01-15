import React, { useState } from "react";
import "./productListingCss.css";
import { useProductContext } from "../context/product_Context";
import { useFilterContext } from "../context/filter_Context";
import { useCartContext } from "../context/cart.Context";

const ProductListing = () => {
  const { isLoading } = useProductContext();
  const { addToCart } = useCartContext();
  const [showMobileFilter, setshowMobileFilter] = useState(false)
 
  // Getting all Filter Context Value
  const {
    filters: { type, color, price, maxPrice, minPrice },
    filter_Products,
    sorting,
    all_products,
    updateProductbyFilter,
    clearFilters,
  } = useFilterContext();

  // FUNCITON TO GET THE UNIQUE DATA FOR EACH FIED DEFINED IN FILTER SECTION
  const getUniqueData = (data, property) => {
    let newVal = data.map((ele) => {
      return ele[property];
    });
    return (newVal = ["All", ...new Set(newVal)]);
  };

  // Common Function for Filtering Date from Sidebar (DRY)
  const filterByCategoryType = getUniqueData(all_products, "type");
  const filterByCategoryColor = getUniqueData(all_products, "color");

  // Showing Loading Until Data Fecthed From API
  if (isLoading) {
    return <div>...Loading Teerex</div>;
  }

  // Else Showing APi DATA
  return (
    <>
      <div className="main">
        {/* SideFilter Start Here */}

        <div className={showMobileFilter ? "SideBar-Filter-Mobile" : "SideBar-Filter"}>
          {/* ----------Filter by Sort start ---------*/}
          <div className="sort-selection">
            <form action="#">
              <label htmlFor="sort">
                <select
                  name={type}
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
          {/* ----------Filter by Sort End ---------*/}

          {/* -------------Filter By Type start--------- */}
          <div className="form-check filter-by-type-div">
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
                    key={index * new Date()}
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
          {/* -------------Filter By Type End--------- */}

          {/* ----------------Filter by Gender Start-----------*/}
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
          {/* ----------------Filter by Gender End-----------*/}

          {/* -------------Filter by  Color Start ---------*/}
          <div className="color-selection">
            <h6>Filter By Color</h6>

            {filterByCategoryColor.map((ele, index) => {
              // Checking if Element === ALL then adding Diifrent Section
              if (ele == "All") {
                return (
                  <button
                    type="button"
                    value={ele}
                    key={index * new Date()}
                    name="color"
                    // style={{ margin:'5px'}}
                    onClick={updateProductbyFilter}
                    className="btnStyle"
                  >
                    All
                  </button>
                );
              } else
                return (
                  <button
                    type="button"
                    value={ele}
                    key={index * new Date()}
                    name="color"
                    style={{
                      backgroundColor: ele,
                      margin: "5px",
                      padding: "5px",
                    }}
                    onClick={updateProductbyFilter}
                    className={
                      color === ele
                        ? "btnStyle fa fa-check"
                        : "btnStyle not-selected"
                    }
                  ></button>
                );
            })}
          </div>
          {/* -------------Filter by  Color End ---------*/}

          {/* ------------Filter by Price Start-----------*/}
          <div className="filter-price">
            <h6>Filter By Price</h6>
            <p>Price Rs{price}</p>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={price}
              name="price"
              onChange={updateProductbyFilter}
            />
          </div>
          {/* ------------Filter by Price End-----------*/}

          {/* ---------Clear Filter Button Start----- */}
          <button
            className="btn btn-danger clear-filter-btn"
            onClick={clearFilters}
          >
            Clear Filter
          </button>
          {/* ---------Clear Filter Button End---------- */}
        </div>
        {/* SideFilter End Here */}

          {/* Mobile Flter Start */}
          <div className="mobile-filter">
            <i class="fa-solid fa-filter" onClick={(prev)=>setshowMobileFilter(!prev)} > <span style={{"padding":"10px"}}>Filter</span></i>
          </div>
          {/* Mobile Filter End */}


        {/* -----------Product Card Section Start-------- */}

        <div className="Products-Cards">

          {/* Adding Filter_Product using map Function */}
          {filter_Products?.map((ele) => {
            return (
              <div className="Product-Card" key={ele.id}>
                <img src={ele.imageURL} alt={ele.name} />
                <h3 className="card-title ">{ele.name}</h3>
                <p>Rs. {ele.price}</p>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => addToCart(ele.id, ele.color, ele.price, ele)}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
        {/* -----------Product Card Section End-------- */}
      </div>
    </>
  );
};

export default ProductListing;
