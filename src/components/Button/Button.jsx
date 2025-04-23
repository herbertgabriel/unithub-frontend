import "./Button.css";

function Button({ title, onClick, color }) {
  return (
    <button
      className="button-template"
      onClick={onClick}
      style={{ backgroundColor: color || "#0C4DA2", borderColor: color || "#0C4DA2" }}
    >
      {title}
    </button>
  );
}

export default Button;