import { useContext, useCallback } from "react";
import { useIntl } from "react-intl";
import { FilterContext } from "../context/filters";

export const useFilter = () => {
  const { formatMessage } = useIntl();

  const {
    setFilters,
    filters,
    orderByOptions,
    categoryOptions,
    handleCategorySelected,
    handleOrderByOptionSelected,
    orderBy,
  } = useContext(FilterContext);

  const filterProducts = (products) => {
    const p =
      products &&
      products.filter((product) => {
        return (
          product.price >= filters.minPrice &&
          product.price <= filters.maxPrice &&
          (filters.category === "all" || product.category === filters.category)
        );
      });

    switch (orderBy) {
      case "relevance":
        return p;

      case "min-price":
        return p.sort((a, b) => a.price - b.price);

      case "max-price":
        return p.sort((a, b) => b.price - a.price);

      default:
        break;
    }

    return p;
  };

  const getCategoryNameByOption = useCallback(
    (category) => {
      switch (category) {
        case "all":
          return formatMessage({ id: "all" });
        case "home-decoration":
          return formatMessage({ id: "filters_homeDecoration" });
        case "laptops":
          return formatMessage({ id: "filters_laptops" });
        case "smartphones":
          return formatMessage({ id: "filters_smartphones" });
        case "fragrances":
          return formatMessage({ id: "filters_fragrances" });
        case "skincare":
          return formatMessage({ id: "filters_skincare" });
        case "groceries":
          return formatMessage({ id: "filters_groceries" });

        default:
          return category;
      }
    },
    [formatMessage]
  );

  const getOrderNameByOption = useCallback(
    (order) => {
      switch (order) {
        case "relevance":
          return formatMessage({ id: "filters_moreRelevants" });
        case "min-price":
          return formatMessage({ id: "filters_lowerPrice" });
        case "max-price":
          return formatMessage({ id: "filters_higherPrice" });

        default:
          return order;
      }
    },
    [formatMessage]
  );

  return {
    setFilters,
    filters,
    filterProducts,
    orderByOptions,
    categoryOptions,
    handleCategorySelected,
    getCategoryNameByOption,
    getOrderNameByOption,
    handleOrderByOptionSelected,
  };
};
