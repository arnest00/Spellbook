const SelectInput = ({
  labelText,
  queryValue,
  inputName,
  options
}) => {
  return (
    <div className="cmp-select-input">
      <label className="cmp-select-input__label" htmlFor={queryValue}>
        {labelText}
      </label>
      <select
        id={queryValue}
        className="cmp-select-input__input"
        name={inputName}>
        {options.map((option) => (
          <option key={option.name} value={option.value}>{option.name}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
