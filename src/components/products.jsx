import { FormattedMessage } from "react-intl";
import { useFilter } from "../hooks/useFilter";
import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";
import { useDrawer } from "../hooks/useDrawer";
import { useApp } from "../hooks/useApp";
import Fav from "./fav";
import Carousel from "./carousel";
import Button from "./button";
import "./products.css";


export function Products() {
  const { addToCart } = useCart();
  const { handleDrawerButtonClick } = useDrawer();
  const { getProductRegular } = useProducts();
  const { filterProducts } = useFilter();
  const { products } = useApp();
  const filteredProducts = filterProducts(products.products);
  const handleAddToCart = (product) => {
    addToCart(product);
    handleDrawerButtonClick();
  };

  return (
    <main className="products">
      {filteredProducts.length > 0 ? (
        <ul className="products_list">
          {filteredProducts.map((product) => {
            return (
              <li key={product.id} className="product-item-container">
                <Fav id={product.id} />
                <Carousel images={product.images} />
                <div className="product-details-container">
                  <div>
                    <span className="product-item-money-amount-previous">
                      ${getProductRegular(product)}
                    </span>
                    <span className="product-item-money-amount">
                      ${product.price}
                      <small className="product-item-money-amount-discount">
                        {Math.ceil(product.discountPercentage)}% OFF
                      </small>
                    </span>
                  </div>
                  <div>
                    <span className="product-item-title">{product.title}</span>
                    <span className="promotion-item-seller">
                      <FormattedMessage id={"by"} />
                      {' '}{product.brand}
                    </span>
                  </div>
                </div>
                  <div className="product-item-button-container">
                    <Button 
                      label_translation_id={"add"}
                      handleClick={() => handleAddToCart(product)}
                    />
                  </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <h3 className="products-none">
          <FormattedMessage id={"empty_product_list"} />
        </h3>
      )}
    </main>
  );
}
