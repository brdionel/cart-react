export const useProducts = () => {
  const getProductRegular = (product) => {
    const { discountPercentage, price } = product;
    const rounderRegularPrice = price / (1 - discountPercentage / 100);
    return parseFloat(rounderRegularPrice.toFixed(3));
  };

  return {
    getProductRegular,
  };
};
