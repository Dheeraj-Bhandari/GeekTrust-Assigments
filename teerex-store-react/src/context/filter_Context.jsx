
import  { createContext, useContext, useReducer, useEffect } from 'react'
import {useProductContext} from '../context/product_Context'
import reducer from "../reducer/filterReducer"
const FilterContext = createContext();


//  -----Filter Context Initial State ----- 
const initialState ={

    filter_Products: [],
    all_products : [],
    sorting_value : "lowest",
    filters : {
        text : "",
        type:"All",
        color:"All",
        gender:"all",
        maxPrice:0,
        price:0,
        minPrice:0
    }
}



// ---------Filter Context Provider Funciton Start-------------
export const FilterContextProvider = ({children})=>{
    const {products} = useProductContext()
    const [state, dispatch] = useReducer(reducer, initialState)

   

    // ----Sort product After User Select a value Start----
    const sorting=(event)=>{
        let selected_Value = event.target.value;
        dispatch({type : "GET_SORT_PRODUCT", payload:selected_Value})
    }
    // ----Sort product After User Select a value End----



    //  -------Filter Fucntion Start-------
    const updateProductbyFilter= (event)=>{
        let name = event.target.name
        let value = event.target.value
        
        return dispatch({type:"UPDATE_FILTER_VALUE", payload :{name, value}})
    }
    //  ---------Filter Fucntion End--------


    // -----Clear Filter Function Start-----
    const clearFilters=()=>{
        dispatch({type:"CLEAR_FILTERS"})
    }
    // -------Clear Filter Function End------



    // -------Looding Product According To Filter Vlaue Start-----
    useEffect(() => {
        dispatch({type:"FILTER_PRODUCT"})
        dispatch({type:"SORTING_PRODUCT" , payload : products})
    }, [products, state.sorting_value, state.filters])
    
    useEffect(() => {
        dispatch({type: "LOAD_FILTER_PRODUCTS", payload:products})
    }, [products])
    // -------Looding Product According To Filter Vlaue End-----


    
    // --->Returning Filter Context
    return( <FilterContext.Provider value={{...state, sorting, updateProductbyFilter,clearFilters}}>
        {children}
    </FilterContext.Provider>)
}
// ---------Filter Context Provider Funciton End-------------
export const useFilterContext=()=>{
    return useContext(FilterContext)
}