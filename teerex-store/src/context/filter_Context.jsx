
import  { createContext, useContext, useReducer, useEffect } from 'react'
import {useProductContext} from '../context/product_Context'
import reducer from "../reducer/filterReducer"
const FilterContext = createContext();
const initialState ={

    filter_Products: [],
    all_products : [],
    sorting_value : "lowest",
    filters : {
        text : "",
        type:"all",
        color:"All",
        gender:"all",

    }
}

export const FilterContextProvider = ({children})=>{
    const {products} = useProductContext()
    
    const [state, dispatch] = useReducer(reducer, initialState)

   

    // Sort product After USer Select a value
    const sorting=(event)=>{
        let selected_Value = event.target.value;
        dispatch({type : "GET_SORT_PRODUCT", payload:selected_Value})
    }



    // Search Filter Fucntion Start
    
    const updateProductbyFilter= (event)=>{
        let name = event.target.name
        let value = event.target.value
        
        return dispatch({type:"UPDATE_FILTER_VALUE", payload :{name, value}})
    }

    // Search Filter Fucntion End


    useEffect(() => {
        dispatch({type:"FILTER_PRODUCT"})
        dispatch({type:"SORTING_PRODUCT" , payload : products})
    }, [products, state.sorting_value, state.filters])

    useEffect(() => {
        dispatch({type: "LOAD_FILTER_PRODUCTS", payload:products})
    }, [products])

    return( <FilterContext.Provider value={{...state, sorting, updateProductbyFilter}}>
        {children}
    </FilterContext.Provider>)
}

export const useFilterContext=()=>{
    return useContext(FilterContext)
}