import {
  createContext,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useUser } from "../hooks/useUser";
import initialProducts from "../mocks/products.json";
import ptTranslation from "../locales/pt.json";
import esTranslation from "../locales/es.json";
import usTranslation from "../locales/us.json";
import AR from "../ar.svg";
import BR from "../br.svg";
import US from "../us.svg";
import { STORAGE_PREFIX } from "../constants";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [languageOptions, setLanguageOptions] = useState([
    { value: "es", label: "ES", flag: AR },
    { value: "pt", label: "PT", flag: BR },
    { value: "us", label: "EN", flag: US },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [variantLogin, setVariantLogin] = useState(null);
  const [favAfterLogin, setFavAfterLogin] = useState(null);

  const initialLanguageFromLS = JSON.parse(
    localStorage.getItem(`${STORAGE_PREFIX}language`)
  );
  let initialLanguage;
  if (!initialLanguageFromLS) {
    initialLanguage = languageOptions[0];
    localStorage.setItem(
      `${STORAGE_PREFIX}language`,
      JSON.stringify(initialLanguage)
    );
  } else {
    initialLanguage = initialLanguageFromLS;
  }

  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

  const { isLogged } = useUser();

  useEffect(() => {
    setProducts(initialProducts);
  }, [isLogged]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleFavAfterLogin = (value) => {
    setFavAfterLogin(value);
  };

  const reorderLanguages = useCallback(() => {
    if (selectedLanguage.value === languageOptions[0].value) return;
    const sortedLanguages = JSON.parse(JSON.stringify(languageOptions));

    const selectedIndex = sortedLanguages.findIndex(
      (lang) => lang.value === selectedLanguage.value
    );
    sortedLanguages.splice(selectedIndex, 1);
    sortedLanguages.unshift(selectedLanguage);

    setLanguageOptions(sortedLanguages);
  }, [languageOptions, selectedLanguage]);

  useEffect(() => {
    reorderLanguages();
  }, [selectedLanguage, reorderLanguages, initialLanguage]);

  const messages = useMemo(() => {
    return {
      pt: ptTranslation,
      es: esTranslation,
      us: usTranslation,
    };
  }, []);

  const handleSelectLanguage = (option) => {
    setSelectedLanguage(option);
  };

  const handleIsLoading = (option) => {
    setIsLoading(option);
  };

  const handleSetVariantOpenLogin = (variant, id) => {
    setVariantLogin(variant);
    handleFavAfterLogin(id);
  };

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        modalRef,
        handleCloseModal,
        handleShowModal,
        products,
        setProducts,
        selectedLanguage,
        handleSelectLanguage,
        messages,
        isLoading,
        handleIsLoading,
        languageOptions,
        variantLogin,
        handleSetVariantOpenLogin,
        favAfterLogin,
        handleFavAfterLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
