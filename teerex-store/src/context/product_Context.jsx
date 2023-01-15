import { createContext, useContext,  useEffect, useReducer } from "react";
import  reducer from '../reducer/productReducer'
import { Getapi } from "../api";
const AppContext = createContext();

// Creating Product Context To Show Data to UI 
const AppProvider = ({children})=>{
    const initialState ={
        isLoading : false,
        isError : false,
        products : []
        
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    // Fecthing API Data With UseEeffect 
    useEffect(() => {
        // Fecthing Product Data from API using IIFE function
        (async function fetchProduct() {
            dispatch({type : "SET_LOADING"})
          try {
            fetch(Getapi)
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