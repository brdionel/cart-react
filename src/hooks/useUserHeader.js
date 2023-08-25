import { useUser } from "./useUser";
import { useApp } from "./useApp";
import { useEffect, useRef, useState } from "react";

export const useUserHeader = () => {
  const { isLogged, currentUser, logout } = useUser();
  const { handleShowModal, handleSetVariantOpenLogin } = useApp();

  const handleClickLogin = () => {
    handleSetVariantOpenLogin("LOGIN");
    handleShowModal();
  };

  const toggleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  useEffect(() => {
    if (!isLogged) setIsOpenDropdown(false);
  }, [isLogged]);

  const dropdownRef = useRef();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isOpenDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpenDropdown]);

  return {
    isLogged,
    logout,
    handleClickLogin,
    toggleDropdown,
    isOpenDropdown,
    dropdownRef,
    currentUser,
  };
};
