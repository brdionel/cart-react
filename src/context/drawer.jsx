import { createContext, useState, useRef, useEffect, useCallback } from "react";

export const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const drawerRef = useRef(null);
    const [isDrawerClosing, setIsDrawerClosing] = useState(false);
  
    const handleDrawerButtonClick = useCallback(() => {
      setIsDrawerOpen(!isDrawerOpen);
    }, [isDrawerOpen]);
  
    const handleDrawerClose = useCallback(() => {
      setIsDrawerClosing(true);
      setTimeout(() => {
          setIsDrawerClosing(false);
          handleDrawerButtonClick();
      }, 500);
    }, [handleDrawerButtonClick]);
  
    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (
          isDrawerOpen &&
          drawerRef.current &&
          !drawerRef.current.contains(event.target)
        ) {
          handleDrawerClose();
        }
      };
  
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [isDrawerOpen, handleDrawerClose]);
  
    useEffect(() => {
      if (isDrawerOpen) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    }, [isDrawerOpen]);

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        drawerRef,
        handleDrawerButtonClick,
        isDrawerClosing,
        handleDrawerClose,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
