import { AiOutlineUser } from "react-icons/ai";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FormattedMessage } from "react-intl";
import { useUserHeader } from "../hooks/useUserHeader";
import "./userHeader.css";
import { isMobile } from "../hooks/helper";

const UserHeader = () => {
  const {
    isLogged,
    handleClickLogin,
    logout,
    toggleDropdown,
    isOpenDropdown,
    dropdownRef,
    currentUser,
  } = useUserHeader();

  return (
    <>
      {!isLogged ? (
        <span className="button-user" onClick={handleClickLogin}>
          <AiOutlineUser />
        </span>
      ) : (
        <div className="button-user-logged-container" ref={dropdownRef}>
          <button
            className={`icon-user-logged-container ${isOpenDropdown ? 'open' : ''}`} 
            onClick={() => toggleDropdown()}
          >
            <AiOutlineUser />
            <span
              className={`icon-arrow-user-logged ${
                isOpenDropdown ? "openDropArrow" : ""
              }`}
            >
              <MdKeyboardArrowUp />
            </span>
          </button>

          {isOpenDropdown && (
            <ul className="drowpdown-user-content">
              <li className="drowpdown-user-header-list-item">
                <span className="drowpdown-user-header-title icon-user-logged-container">
                  <AiOutlineUser />
                  <span className="drowpdown-user-header-title-welcome">
                    <FormattedMessage id={"user-logged-hi"} />{" "}
                    {currentUser.name ? currentUser.name : ""}
                  </span>
                  
                  {!isMobile() && <>
                    <span>{", "}</span>
                    <span className="drowpdown-user-header-title-welcome-label">
                      <FormattedMessage id={"user-logged-welcome"} />
                    </span>
                  </>}
                </span>
              </li>
              <li
                className="drowpdown-user-header-title-logout"
                onClick={logout}
              >
                <span>
                  <FormattedMessage id={"logout"} />
                </span>
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default UserHeader;
