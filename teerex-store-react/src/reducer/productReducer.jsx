const ProductReducer = (state, action) => {
  switch (action.type) {
    // Reducer for Showing Loading To UI until product fecthed from API
    case "SET_LOADING":

      return {
        ...state,
        isLoading: true,
      };

      
    // Reducer for API Data
    case "API_DATA":
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };

    // Reducer for Handling Error While Fecthing Data From API
    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};

export default ProductReducer;
