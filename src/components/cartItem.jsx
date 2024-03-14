import { AiTwotoneDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { truncateString } from "../hooks/helper";
import "./cartItem.css";

function CartItem({
  id,
  thumbnail,
  title,
  price,
  quantity,
  handleAddToCart,
  handleDecreaseFromCart,
  description,
  removeFromCart,
}) {
  if (quantity === 0) return removeFromCart();
  return (
    <li key={id} className="cart-item-container">
      <img src={thumbnail} alt={title} />
      <div className="qty-and-description">
        <h6 className="product-title">{title}</h6>
        <p className="product-description">{truncateString(description, 50)}</p>
        <div className="button-qty-container">
          <button onClick={handleDecreaseFromCart} className="button-qty-left">
            <AiOutlineMinus />
          </button>
          <small className="qty-label">{quantity}</small>
          <button className="button-qty-right" onClick={handleAddToCart}>
            <AiOutlinePlus />
          </button>
        </div>
      </div>
      <div className="price-container">
        <button className="product-delete-icon" onClick={removeFromCart}>
          <AiTwotoneDelete />
        </button>
        <small className="price">${(price * quantity).toLocaleString()}</small>
      </div>
    </li>
  );
}

export default CartItem;
