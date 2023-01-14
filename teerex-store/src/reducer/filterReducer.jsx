const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
        filter_Products: [...action.payload],
        all_products: [...action.payload],
      };

    case "GET_SORT_PRODUCT":
      return {
        ...state,
        sorting_value: action.payload,
      };

    case "SORTING_PRODUCT":
      let newSortData;
      // let tempSortProduct = [...action.payload];
      const { filter_Products } = state;
      let tempSortProduct = [...filter_Products];

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

    case "UPDATE_FILTER_VALUE":
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    
    case "FILTER_PRODUCT":
        let {all_products} = state;
        let tempFilterData = [...all_products]

        const {text, type,gender,color} = state.filters;
        
        if(text){
            tempFilterData= tempFilterData.filter((ele)=>{
                return ele.name.toLowerCase().includes(text) 
                || ele.color.toLowerCase().includes(text) 
                || ele.type.toLowerCase().includes(text) 
                || ele.gender.toLowerCase().includes(text)
            })
        }

        if(type!=='All'){
           
            
            tempFilterData = tempFilterData.filter((ele)=>{
                return ele.type===type
            })
        }
        if(gender!=='all'){
           tempFilterData = tempFilterData.filter((ele)=>{
               return ele.gender===gender
            })
            
        }
        if(color!=="All"){
            
           tempFilterData = tempFilterData.filter((ele)=>{
               return ele.color===color
            })
        
        }
        return {
            ...state,
            filter_Products: tempFilterData,
          };

    default:
      return state;
  }
};

export default filterReducer;
