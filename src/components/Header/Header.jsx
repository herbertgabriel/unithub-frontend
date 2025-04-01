import "./Header.css";
import logo from "../../assets/logo.svg"; 
import Button from "../Button/Button";
import ButtonTransparent from "../ButtonTransparent/ButtonTransparent";

function Header() {
  return (
    <header> 
      <div className="menu-container"> 
        <div className="logo"> 
          <img src={logo} alt="Logo" /> 
        </div>
        <nav>
          <ul>
          <li><ButtonTransparent title={"Cadastrar"} /></li> 
            <li><Button title={"Login"} /></li>

          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;