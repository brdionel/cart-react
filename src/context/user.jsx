import { createContext, useEffect, useState } from "react";
import { STORAGE_PREFIX } from "../constants";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  // Users
  const initialUsers = JSON.parse(
    localStorage.getItem(`${STORAGE_PREFIX}users`)
  ) || [
    {
      email: "bruno@dionel.com",
      password: "bruno123",
      date_of_birth: "14/10/1990",
      name: "Bruno",
      cart: [
        {
          id: 30,
          title: "Key Holder",
          description:
            "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
          price: 30,
          discountPercentage: 2.92,
          rating: 4.92,
          stock: 54,
          brand: "Golden",
          category: "home-decoration",
          thumbnail: "https://i.dummyjson.com/data/products/30/thumbnail.jpg",
          images: [
            "https://i.dummyjson.com/data/products/30/1.jpg",
            "https://i.dummyjson.com/data/products/30/2.jpg",
            "https://i.dummyjson.com/data/products/30/3.jpg",
            "https://i.dummyjson.com/data/products/30/thumbnail.jpg",
          ],
          quantity: 1,
        },
      ],
      favs: [],
    },
  ];
  localStorage.setItem(`${STORAGE_PREFIX}users`, JSON.stringify(initialUsers));
  const [users, setUsers] = useState(initialUsers);

  // Current User
  const [currentUser, setCurrentUser] = useState(
    () =>
      JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}currentUser`)) || null
  );

  // Favs
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    if (!Boolean(currentUser)) return setFavs([]);
    const currentFavs = currentUser.favs;
    setFavs(currentFavs);
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isLogged: Boolean(currentUser),
        users,
        setUsers,
        setCurrentUser,
        setFavs,
        favs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
