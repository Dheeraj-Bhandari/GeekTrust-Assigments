import { createContext, useContext,  useEffect, useReducer } from "react";
import  reducer from '../reducer/productReducer'
const AppContext = createContext();


const AppProvider = ({children})=>{
    const initialState ={
        isLoading : false,
        isError : false,
        products : []
        
    }
    const [state, dispatch] = useReducer(reducer, initialState)


    useEffect(() => {
        // Fecthing Product Data from API using IIFE function
        (async function fetchProduct() {
            dispatch({type : "SET_LOADING"})
          try {
            fetch(
              "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
            )
              .then((response) => response.json())
              .then((data) => {
               dispatch({type : "API_DATA", payload : data})
              });
          } catch (error) {
            dispatch({type : "API_ERROR"})
          }
        })();
      }, []);
    

    return <AppContext.Provider value={{...state}}>
        {children}
    </AppContext.Provider>

};

function useProductContext() {
    return useContext(AppContext);
}

export {AppProvider,AppContext,useProductContext}