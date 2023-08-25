import { createContext, useState } from "react";
import initialOrderByOptions from "../mocks/orderByOptions.json";
import initialCategoryOtions from "../mocks/categoryOptions.json";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [orderByOptions] = useState(initialOrderByOptions.options);
  const [categoryOptions] = useState(initialCategoryOtions.options);

  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
    maxPrice: 1750,
  });

  const [orderBy, setOrderBy] = useState(initialOrderByOptions.options[0].value)

  const handleCategorySelected = ( category ) => {
    setFilters((prevState) => ({
      ...prevState,
      category
    }))
  }

  const handleOrderByOptionSelected = (option) => {
    setOrderBy(option)
  }

  return (
    <FilterContext.Provider
      value={{
        setFilters,
        filters,
        orderByOptions,
        categoryOptions,
        handleCategorySelected,
        handleOrderByOptionSelected,
        orderBy
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
