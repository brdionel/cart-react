import { FormattedMessage } from "react-intl";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./button.css";

const Button = ({ label_translation_id, handleClick, disabled, type }) => {
  
  return (
    <button 
        className="button_component"
        disabled={disabled}
        onClick={handleClick}
        type={type ? type : "button"}
    >
      <span>
        <FormattedMessage id={label_translation_id} />
      </span>
      <FaLongArrowAltRight />
    </button>
  );
};

export default Button;
