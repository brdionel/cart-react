import { AiOutlineShopping } from "react-icons/ai";
import { useCart } from "../hooks/useCart";
import { useDrawer } from "../hooks/useDrawer";
import "./iconCart.css";

const IconCart = () => {
  const { cart } = useCart();
  const { handleDrawerButtonClick } = useDrawer();
 
  const cartQuantity = cart.reduce((acumulador, valorActual) => {
    return acumulador + valorActual.quantity;
  }, 0);

  return (
    <>
      <button onClick={handleDrawerButtonClick} className="button-cart">
        {
          cartQuantity > 0 &&
          <span className="cart-count">{cartQuantity}</span>
        }
        <AiOutlineShopping />
      </button>
    </>
  );
};

export default IconCart;
