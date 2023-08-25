import { useEffect, useRef, useState } from "react";
import { useApp } from "./useApp";

export function useDropdownFlag() {
  const {
    handleSelectLanguage,
    handleIsLoading,
    languageOptions,
    selectedLanguage,
  } = useApp();
  const dropdownRef = useRef();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropdownInnerRef = useRef();
  const [isOpenInnerDropdown, setIsOpenInnerDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(languageOptions[0]);

  const handleInnerOptionSelected = (option) => {
    setSelectedOption(option);
    setIsOpenInnerDropdown(false);
  };

  const toggleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const toggleInnerDropdown = () => {
    setIsOpenInnerDropdown(!isOpenInnerDropdown);
  };

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

  const handleClickOnSave = () => {
    handleIsLoading(true);
    setTimeout(() => {
      handleSelectLanguage(selectedOption);
      localStorage.setItem("language", JSON.stringify(selectedOption));
      setIsOpenDropdown(false);
      handleIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    const selectedOptionLS = JSON.parse(localStorage.getItem("language"));
    if (selectedOptionLS) {
      setSelectedOption(selectedOptionLS);
    }
  }, []);

  return {
    dropdownRef,
    isOpenDropdown,
    selectedOption,
    toggleDropdown,
    handleInnerOptionSelected,
    dropdownInnerRef,
    toggleInnerDropdown,
    isOpenInnerDropdown,
    languageOptions,
    handleClickOnSave,
    selectedLanguage,
  };
}
