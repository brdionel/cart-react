import { FormattedMessage } from "react-intl";
import { MdKeyboardArrowUp } from "react-icons/md";
import Wrapper from "./wrapper";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Wrapper>
        <div className="footer-content">
          <span
            className="footer-content-button"
            onClick={() => {
              window.scrollTo({
                left: 0,
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <MdKeyboardArrowUp />
            <small className="footer-back-to">
              <FormattedMessage id={"go_up"} />
            </small>
          </span>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
