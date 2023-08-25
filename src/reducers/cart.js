export const initialState = JSON.parse(localStorage.getItem("cart")) || [];

export const CART_ACTION_TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAN_CART: "CLEAN_CART",
  DECREASE_FROM_CART: "DECREASE_FROM_CART",
  MERGE_CART: "MERGE_CART",
};

const updateLocalStorage = (newState) => {
  localStorage.setItem("cart", JSON.stringify(newState));
  const currentUserLocal = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUserLocal) {
    currentUserLocal.cart = newState;
    localStorage.setItem("currentUser", JSON.stringify(currentUserLocal));
    const usersLocal = JSON.parse(localStorage.getItem("users"));
    if (usersLocal) {
      // Save the current user with cart in users
      const currentUserInUsersIndex = usersLocal.findIndex(
        (item) => item.email === currentUserLocal.email
      );
      usersLocal[currentUserInUsersIndex].cart = newState;
      localStorage.setItem("users", JSON.stringify(usersLocal));
    }
  }
};

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const { id } = actionPayload;
      // check if the product is already in the cart
      const productInCartIndex = state.findIndex((item) => item.id === id);

      // if the prodcut is in the cart
      if (productInCartIndex >= 0) {
        // new cart using structure clone
        const newState = structuredClone(state);
        newState[productInCartIndex].quantity += 1;
        updateLocalStorage(newState);
        return newState;
      }

      // if the product isn't in the cart
      const newState = [
        ...state,
        {
          ...actionPayload, //product
          quantity: 1,
        },
      ];
      updateLocalStorage(newState);
      return newState;
    }

    case CART_ACTION_TYPES.DECREASE_FROM_CART: {
      const { id } = actionPayload;
      // check if the product is already in the cart
      const productInCartIndex = state.findIndex((item) => item.id === id);
      // if the product is in the cart
      if (productInCartIndex >= 0) {
        const newState = structuredClone(state);
        if (newState[productInCartIndex].quantity > 0) {
          newState[productInCartIndex].quantity -= 1;
          updateLocalStorage(newState);
          return newState;
        }
      }
      return state;
    }

    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const { id } = actionPayload;
      const newState = state.filter((item) => item.id !== id);
      updateLocalStorage(newState);
      return newState;
    }

    case CART_ACTION_TYPES.CLEAN_CART: {
      updateLocalStorage([]);
      return [];
    }

    case CART_ACTION_TYPES.MERGE_CART: {
      if (state.length === 0) {
        updateLocalStorage(actionPayload);
        return actionPayload;
      }

      const newState = structuredClone(actionPayload);

      for (const item of state) {
        const existingItemIndex = actionPayload.findIndex(
          (userItem) => userItem.id === item.id
        );

        if (existingItemIndex >= 0) {
          newState[existingItemIndex].quantity += item.quantity;
        } else {
          newState.push(item);
        }
      }

      return newState;
    }

    default: {
      return state;
    }
  }
};
