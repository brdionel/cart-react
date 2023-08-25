import { MdKeyboardArrowUp } from "react-icons/md";
import { FormattedMessage } from "react-intl";
import { useDropdownFlag } from "../hooks/useDropdownFlag";
import DropdownFlagOption from "./dropdownFlagOption";
import { useDrawer } from "../hooks/useDrawer";
import "./dropdownFlag.css";
import Button from "./button";

const DropdownFlag = () => {
  const {
    dropdownRef,
    isOpenDropdown,
    selectedOption,
    toggleDropdown,
    handleInnerOptionSelected,
    dropdownInnerRef,
    toggleInnerDropdown,
    isOpenInnerDropdown,
    languageOptions,
    handleClickOnSave,
    selectedLanguage,
  } = useDropdownFlag();

  const { isDrawerOpen } = useDrawer();

  if (isDrawerOpen) return <div className="flag_empty"></div>;

  return (
    <div
      className="dropdown-flag"
      ref={dropdownRef}
      style={{ display: isDrawerOpen ? "none" : "block" }}
    >
      <button
        className={`drowpdown-flag-button-flag ${isOpenDropdown ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        <img
          width={20}
          height={10}
          src={selectedLanguage.flag}
          alt="img-flag"
        />
      </button>
      {isOpenDropdown && (
        <div className="drowpdown-flag-content">
          <p className="drowpdown-flag-content-title">
            <FormattedMessage id={"flag_title"} />
          </p>
          <div className="dropdown-flag-inner" ref={dropdownInnerRef}>
            <button
              className={`dropdown-toggle-flag ${
                isOpenInnerDropdown ? "openDropArrow" : ""
              }`}
              onClick={toggleInnerDropdown}
            >
              <span className={`dropdown-flag-option-selected`}>
                <img src={selectedOption.flag} alt="" />
                <span>{selectedOption.label}</span>
              </span>
              <MdKeyboardArrowUp />
            </button>
            {isOpenInnerDropdown && (
              <ul
                className={`dropdown-menu-flag ${
                  isOpenInnerDropdown ? "open" : ""
                }`}
              >
                {languageOptions.map((option) => (
                  <DropdownFlagOption
                    handleInnerOptionSelected={handleInnerOptionSelected}
                    key={option.value}
                    option={option}
                    selectedOption={selectedOption}
                  />
                ))}
              </ul>
            )}
          </div>
          <Button 
            label_translation_id={"save"}
            handleClick={() => handleClickOnSave()}
          />
        </div>
      )}
    </div>
  );
};

export default DropdownFlag;
