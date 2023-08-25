const DropdownOption = ({ handleInnerOptionSelected, option, selectedOption, labelOption }) => {

  const { value } = option;

  return (
    <li
      onClick={() => handleInnerOptionSelected(value)}
      className={selectedOption === value ? "selected" : ""}
    >
      <span>{labelOption}</span>
    </li>
  );
};

export default DropdownOption;
