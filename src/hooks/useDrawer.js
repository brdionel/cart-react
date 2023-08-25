import { useContext } from "react";
import { DrawerContext } from "../context/drawer";

export function useDrawer() {
  const context = useContext(DrawerContext);

  if (context === undefined) {
    throw new Error("useDrawer must be used within a CartProvider");
  }

  return context;
}
