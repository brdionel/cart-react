import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useUser } from "../hooks/useUser";
import { useFavsHedaer } from "../hooks/useFavsHeader";
import "./favsHeader.css";

const FavsHeader = () => {
  const { currentUser } = useUser();
  const favsQuantity = currentUser?.favs?.length || 0;
  const {showFavorites } = useFavsHedaer();

  return (
    <>
      <button className="button-favs">
        {
          favsQuantity > 0 && showFavorites &&
          <span className="favs-count">{favsQuantity}</span>
        }
        {
          favsQuantity > 0
          ? <AiFillHeart />
          : <AiOutlineHeart />
        }
      </button>
    </>
  );
};

export default FavsHeader;
