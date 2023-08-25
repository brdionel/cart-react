import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useUser } from "../hooks/useUser";
import { useApp } from "../hooks/useApp";
import "./fav.css";

const Fav = ({ id }) => {
    const { handleFav, isFaved, isLogged } = useUser()
    const { handleShowModal, handleSetVariantOpenLogin } = useApp()

    const handleClick = () => {
        if(!isLogged) {
            handleSetVariantOpenLogin("FAV", id)
            handleShowModal();
        } else {
            handleFav(id);
        }
    }

    const favIconToShow = isFaved(id)
    ? <AiFillHeart style={{color: "#EFC131"}}onClick={handleClick} />
    : <AiOutlineHeart onClick={handleClick} />

    return (
        <span className="fav-heart-icon">
            {
                !isLogged 
                    ? <AiOutlineHeart onClick={handleClick} />
                    : <>{favIconToShow}</>
            }
        </span>
    )
}

export default Fav;