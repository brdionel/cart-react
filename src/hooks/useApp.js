import { useContext } from "react";
import { AppContext } from "../context/app";

export const useApp = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context
};
