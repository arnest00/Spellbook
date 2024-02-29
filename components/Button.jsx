const Button = ({ type = "button", buttonText }) => {
  return (
    <button className="cmp-button" type={type}>{buttonText}</button>
  );
}

export default Button;
