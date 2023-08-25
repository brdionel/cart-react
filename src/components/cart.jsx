import { FormattedMessage } from "react-intl";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../hooks/useCart";
import CartItem from "./cartItem";
import "./cart.css";

const Cart = () => {
  const { cart, addToCart, decreaseFromCart, removeFromCart, getTotal } =
    useCart();
  
  return (
    <div className="cart">
      <div className={`cart-title-container ${cart.length === 0 ? 'cart-title-container-without-products': ''}`}>
        <h3 className="cart-title">
          <FormattedMessage id={"cart_title"} />
        </h3>
      </div>
      <div className={`product-listing-container ${cart.length === 0 ? 'product-listing-container-without-products': ''}`}>
        {cart.length > 0 ? (
          <ul className="product-listing-content">
            {cart.map((item) => {
              return (
                <CartItem
                  {...item}
                  handleAddToCart={() => addToCart(item)}
                  handleDecreaseFromCart={() => decreaseFromCart(item)}
                  removeFromCart={() => removeFromCart(item)}
                />
              );
            })}
          </ul>
        ) : (
          <div className="empty-cart-container">
            <AiOutlineShoppingCart />
            <p>
              <FormattedMessage id={"empty_cart_message"} />
            </p>
          </div>
        )}
      </div>
      <div className="cart-footer">
        {cart.length > 0 && (
          <>
            <div className="cart-footer-total">
              <span className="cart-footer-total_label">
                <FormattedMessage id={"total"} />
              </span>
              <span className="cart-footer-total_value">
                {`$ ${getTotal.toLocaleString()}`}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
