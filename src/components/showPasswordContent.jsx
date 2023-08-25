import { FormattedMessage } from "react-intl";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./showPasswordContent.css";

const ShowPasswordContent = ({handleShowPasswordClick, showPassword }) => {
  return (
    <span onClick={handleShowPasswordClick} className="show-password-content">
      {showPassword ? (
        <>
          <AiOutlineEyeInvisible className="show-password-icon" />
          <span>
            <FormattedMessage id={"hide"} />
          </span>
        </>
      ) : (
        <>
          <AiOutlineEye className="show-password-icon" />
          <span>
            <FormattedMessage id={"show"} />
          </span>
        </>
      )}
    </span>
  );
};

export default ShowPasswordContent;
