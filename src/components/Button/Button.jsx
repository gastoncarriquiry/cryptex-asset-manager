import "./Button.css";

const Button = ({ children, onClick, type, disabled }) => {
  return (
    <>
      {disabled ? (
        <button disabled className={`btn ${type}`} onClick={onClick}>
          {children}
        </button>
      ) : (
        <button className={`btn ${type}`} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
