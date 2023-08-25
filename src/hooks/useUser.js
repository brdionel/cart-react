import { useContext, useCallback } from "react";
import { UserContext } from "../context/user";
import { useCart } from "./useCart";

export const useUser = (props) => {
  const { users, setUsers, setCurrentUser, currentUser, favs, setFavs } =
    useContext(UserContext);

  const { cart, cleanCart, mergeCart } = useCart();

  const register = (data) => {
    const newUser = {
      cart: [],
      favs: [],
      email: data.email,
      name: data.name,
      last_name: data.last_name,
      password: data.password,
      date_of_birth: `${data.birthdate_day}/${data.birthdate_month}/${data.birthdate_year}`,
    };
    if (props?.favAfterLogin) newUser.favs.push(props.favAfterLogin);
    const listOfUsers = users;
    listOfUsers.push(newUser);
    setUsers(listOfUsers);
    localStorage.setItem("users", JSON.stringify(listOfUsers));
    const { email, password } = data;
    const rta = login({ email, password });
    return rta;
  };

  const login = useCallback(
    ({ email, password }) => {
      const existUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (existUser) {
        // Here I set fav product before login
        if (props?.favAfterLogin) {
          if (!existUser.favs.find((item) => item === props.favAfterLogin))
            existUser.favs.push(props.favAfterLogin);
          props?.handleFavAfterLogin(null);
        }

        // Here I would might merge user cart with non user cart.
        if (Array.isArray(existUser.cart) && existUser.cart.length > 0) {
          mergeCart(existUser.cart);
          localStorage.setItem("cart", JSON.stringify(existUser.cart));
        }
        setCurrentUser(existUser);
        localStorage.setItem("currentUser", JSON.stringify(existUser));
        return true;
      }
      return false;
    },
    [setCurrentUser, users]
  );

  const logout = useCallback(() => {
    setCurrentUser({
      ...currentUser,
      cart,
    });

    setCurrentUser({
      ...currentUser,
      favs,
    });

    // Save the current user with cart in users
    const currentUserInUsersIndex = users.findIndex(
      (item) => item.email === currentUser.email
    );
    const newUsersState = structuredClone(users);
    newUsersState[currentUserInUsersIndex].cart = cart;
    setUsers(newUsersState);
    localStorage.setItem("users", JSON.stringify(newUsersState));
    cleanCart();
    setCurrentUser(null);
    localStorage.setItem("currentUser", null);
  }, [setCurrentUser, cart, currentUser, setUsers, users, cleanCart, favs]);

  const validateEmail = useCallback(
    ({ email }) => {
      const existEmail = users.some((user) => user.email === email);
      return existEmail;
    },
    [users]
  );

  const isFaved = (id) => {
    if (!Boolean(currentUser)) {
      return;
    }
    return (
      currentUser.favs &&
      Array.isArray(currentUser.favs) &&
      currentUser.favs.some((favId) => favId === id)
    );
  };

  const handleFav = (id) => {
    if (!isFaved(id)) {
      addFav(id);
    } else {
      deleteFav(id);
    }
  };

  const addFav = useCallback(
    (id) => {
      const userFavs = favs;
      userFavs.push(id);
      setFavs(userFavs);
      setCurrentUser({
        ...currentUser,
        favs: userFavs,
      });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...currentUser,
          favs: userFavs,
        })
      );
    },
    [currentUser, setCurrentUser, favs, setFavs]
  );

  const deleteFav = useCallback(
    (id) => {
      const newFavs = favs.filter((favId) => favId !== id);
      setFavs(newFavs);
      setCurrentUser({
        ...currentUser,
        favs: newFavs,
      });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...currentUser,
          favs: newFavs,
        })
      );
    },
    [currentUser, setCurrentUser, favs, setFavs]
  );

  return {
    handleFav,
    logout,
    login,
    register,
    isFaved,
    isLogged: Boolean(currentUser),
    currentUser,
    validateEmail,
    setCurrentUser,
    users,
    setUsers,
    setFavs,
  };
};
