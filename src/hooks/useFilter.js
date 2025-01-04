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
        case "t-shirt":
          return formatMessage({ id: "filters_t-shirt" });
        case "hoodie":
          return formatMessage({ id: "filters_hoodie" });
        case "jacket":
          return formatMessage({ id: "filters_jacket" });
        case "sweatshirt":
          return formatMessage({ id: "filters_sweatshirt" });
        case "fanny-pack":
          return formatMessage({ id: "filters_fanny-pack" });
        case "socks":
          return formatMessage({ id: "filters_socks" });

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
