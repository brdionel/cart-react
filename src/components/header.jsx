import { FormattedMessage } from "react-intl";
import Logo from "../logo.svg";
import SliderHeader from "./sliderHeader";
import Wrapper from "./wrapper";
import IconCart from "./iconCart";
import DropdownFlag from "./dropdownFlag";
import FavsHeader from "./favsHeader";
import { useHeader } from "../hooks/useHeader";
import { useDrawer } from "../hooks/useDrawer";
import UserHeader from "./userHeader";
import "./header.css";

const Header = () => {
  const { isDrawerOpen } = useDrawer();
  const { isVisible } = useHeader();

  return (
    <>
      <header
        className={`header ${!isDrawerOpen ? "header-fixed" : ""} ${
          isVisible ? "" : "hide"
        }`}
      >
        <SliderHeader />
        <Wrapper>
          <div className="headerContainer">
            <div className="header-logoContainer">
              <img className="logo" src={Logo} alt="logo tienda" />
              <h1 className="header-logo-text">
                <FormattedMessage id={"header_title"} />
              </h1>
            </div>
            <div className="header-iconsContainer">
              <UserHeader />
              <FavsHeader />
              <IconCart />
              <DropdownFlag />
            </div>
          </div>
        </Wrapper>
      </header>
      {!isDrawerOpen && <div className="headerMenuShadow"></div>}
    </>
  );
};

export default Header;
