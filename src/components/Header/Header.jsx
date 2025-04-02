import "./Header.css";
import logo from "../../assets/logo.svg"; 
import Navbar from "../Navbar/Navbar";
import Button from "../Button/Button";
import ButtonTransparent from "../ButtonTransparent/ButtonTransparent";

function Header() {
  return (
    <header className="header-container"> 
      <div className="menu-container"> 
        <div className="logo"> 
          <img src={logo} alt="Logo" /> 
        </div>
        <nav>
          <ul>
          <li><ButtonTransparent title={"Cadastrar"} /></li> 
          <li><Button title={"Login"} /></li>
          <li className="hamburguer"><Navbar /></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;