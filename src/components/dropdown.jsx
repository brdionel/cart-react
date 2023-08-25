import { FormattedMessage } from "react-intl";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useDropdown } from "../hooks/useDropdown";
import DropdownOption from "./dropdownOption";

const Dropdown = ({ label_id, options, handleOptionSelected, getNameByOption }) => {
  
  const {
    dropdownRef,
    isOpenDropdown,
    toggleDropdown,
    selectedOption,
    handleInnerOptionSelected
  } = useDropdown({
    handleOptionSelected,
    options 
  });

  return (
    <div>
      <div className="dropdown" ref={dropdownRef}>
        <button
          className={`dropdown-toggle-order ${
            isOpenDropdown ? "openDropArrow" : ""
          }`}
          onClick={toggleDropdown}
        >
          <span className={`dropdown-toggle-order-text`}>
            <FormattedMessage id={label_id} />{" "}
            <span className={`dropdown-toggle-order-text-option`}>{`${getNameByOption ? getNameByOption(selectedOption): selectedOption}`}</span>
          </span>
          <MdKeyboardArrowUp />
        </button>
        {isOpenDropdown && (
          <ul className={`dropdown-menu ${isOpenDropdown ? "open" : ""}`}>
            {options.map((option) => (
              <DropdownOption
                handleInnerOptionSelected={handleInnerOptionSelected}
                key={option.value}
                labelOption={getNameByOption ? getNameByOption(option.value) : option.value}
                option={option}
                selectedOption={selectedOption}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
