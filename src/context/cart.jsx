import {
  createContext,
  useEffect,
  useReducer,
  useState
} from "react";
import { useDrawer } from "../hooks/useDrawer";

import { cartReducer, initialState, CART_ACTION_TYPES } from "../reducers/cart";

export const CartContext = createContext();

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { ADD_TO_CART, DECREASE_FROM_CART, REMOVE_FROM_CART, CLEAN_CART, MERGE_CART } =
    CART_ACTION_TYPES;

  const addToCart = (product) =>
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });

  const decreaseFromCart = (product) =>
    dispatch({
      type: DECREASE_FROM_CART,
      payload: product,
    });

  const removeFromCart = (product) =>
    dispatch({
      type: REMOVE_FROM_CART,
      payload: product,
    });

  const cleanCart = () =>
    dispatch({
      type: CLEAN_CART,
    });

  const mergeCart = (userCart) => 
    dispatch({
      type: MERGE_CART,
      payload: userCart
    })

  return {
    state,
    addToCart,
    decreaseFromCart,
    removeFromCart,
    cleanCart,
    mergeCart
  };
}

export const CartProvider = ({ children }) => {
  const { addToCart, cleanCart, removeFromCart, decreaseFromCart, mergeCart, state } =
    useCartReducer();

  const { isDrawerOpen, drawerRef, handleDrawerButtonClick, isDrawerClosing, handleDrawerClose } =
  useDrawer();

  const getTotal = state.reduce((accumulator, product) => {
      return accumulator + (product.price * product.quantity);
  }, 0);
  
  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        cleanCart,
        isDrawerOpen,
        drawerRef,
        handleDrawerButtonClick,
        decreaseFromCart,
        isDrawerClosing,
        handleDrawerClose,
        getTotal,
        mergeCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
