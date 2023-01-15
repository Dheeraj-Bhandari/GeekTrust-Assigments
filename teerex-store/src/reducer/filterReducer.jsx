const filterReducer = (state, action) => {
  switch (action.type) {
    // -----Returning Filter Data To make All filter work together  Reducer Start-------
    case "LOAD_FILTER_PRODUCTS":
      let priceArr = action.payload.map((ele) => ele.price);
      let maxPrice = Math.max(...priceArr);

      return {
        ...state,
        filter_Products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, maxPrice: maxPrice, price: maxPrice },
      };
    // -----Returning Filter Data To make All filter work together  Reducer End-------

    // Returning Sorted Filter Data Reducer Start
    case "GET_SORT_PRODUCT":
      return {
        ...state,
        sorting_value: action.payload,
      };
    // Returning Sorted Filter Data Reducer End

    // -------Sorting Product of Base of Price and Name Reducer Start-------------
    case "SORTING_PRODUCT":
      let newSortData;
      // let tempSortProduct = [...action.payload];
      const { filter_Products } = state;
      let tempSortProduct = [...filter_Products];

      // Writing All Condition in one funciton only (DRY)

      newSortData = tempSortProduct.sort((a, b) => {
        if (state.sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        } else if (state.sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        } else if (state.sorting_value === "highest") {
          return b.price - a.price;
        } else if (state.sorting_value === "lowest") {
          return a.price - b.price;
        }
      });

      return {
        ...state,
        filter_Products: newSortData,
      };
    // -------Sorting Product of Base of Price and Name Reducer End-------------

    // Updating Filter Value reducer Start
    case "UPDATE_FILTER_VALUE":
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    // Updating Filter Value reducer End

    // -------Filter Product on Basis of Search, Type, Gender, Color, Price Reducer Start-----
    case "FILTER_PRODUCT":
      let { all_products } = state;
      let tempFilterData = [...all_products];

      const { text, type, gender, color, price } = state.filters;

      // Filter Product of Basis of Search
      if (text) {
        tempFilterData = tempFilterData.filter((ele) => {
          return (
            ele.name.toLowerCase().includes(text) ||
            ele.color.toLowerCase().includes(text) ||
            ele.type.toLowerCase().includes(text) ||
            ele.gender.toLowerCase().includes(text)
          );
        });
      }

      //  Filter Product of Basis of Type
      if (type !== "All") {
        tempFilterData = tempFilterData.filter((ele) => {
          return ele.type === type;
        });
      }

      //  Filter Product of Basis of Gender
      if (gender !== "all") {
        tempFilterData = tempFilterData.filter((ele) => {
          return ele.gender === gender;
        });
      }

      //  Filter Product of Basis of Color
      if (color !== "All") {
        tempFilterData = tempFilterData.filter((ele) => {
          return ele.color === color;
        });
      }

      //  Filter Product of Basis of Price
      if (price) {
        tempFilterData = tempFilterData.filter((ele) => {
          return ele.price <= price;
        });
      }
      return {
        ...state,
        filter_Products: tempFilterData,
      };
    // -------Filter Product on Basis of Search, Type, Gender, Color, Price Reducer End-----

    // --------Clear All Filter Reducer  Start-----
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          type: "All",
          color: "All",
          gender: "all",
          maxPrice: 0,
          price: state.filters.maxPrice,
          minPrice: state.filters.maxPrice,
        },
      };
    // --------Clear All Filter Reducer  End-----

    default:
      return state;
  }
};

export default filterReducer;
