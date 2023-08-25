import { useState } from "react";

export const useFavsHedaer = () => {
  const [showFavorites, setShowFavorites] = useState(false);

  setTimeout(() => {
    setShowFavorites(true);
  }, 4000);

  return {
    showFavorites,
  };
};
