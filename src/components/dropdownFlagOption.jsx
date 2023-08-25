import "./dropdownFlagOption.css";

const DropdownFlagOption = ({ handleInnerOptionSelected, option, selectedOption }) => {

    const { value, flag, label } = option;
  
    return (
      <li
        onClick={() => handleInnerOptionSelected(option)}
        className={`dropdown-flag-option ${selectedOption.value === value ? "selected" : ""}`}
      >
        <span>
            <img className="dropdown-flag-option-img" src={flag} alt="flag" />
            {label}
        </span>
      </li>
    );
  };
  
  export default DropdownFlagOption;