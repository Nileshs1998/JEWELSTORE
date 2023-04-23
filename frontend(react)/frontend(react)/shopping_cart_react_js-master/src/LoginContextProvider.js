import React,{ createContext, useContext, useReducer } from "react";

//creating the  cart context...
let LoginContext = createContext();

//initial state of cart
export const loginState = {
    user:[]
}

//for Login adding and updating...
export const reducer=(state,action)=>{
    switch(action.type){
        case "addtocontext":
        return {user:[...action.data]}
        break;
        case "logout":
        break;
        default:
            return state;
    }
}

//login context provider 
export const LoginContextProvider=({loginState,reducer,children})=>{
    return (
      <LoginContext.Provider value={useReducer(reducer,loginState)}>
      {children}
  </LoginContext.Provider>
    )
   
  }
  //accssing the cart context inside the components..
  export const LoginContextValue =()=> useContext(LoginContext);