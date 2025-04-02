import "./Header.css";
import logo from "../../assets/logo.svg"; 
import Navbar from "../Navbar/Navbar";
import Button from "../Button/Button";
import ButtonTransparent from "../ButtonTransparent/ButtonTransparent";
import { Link } from "react-router-dom"; 

function Header() {
  return (
    <header className="header-container"> 
      <div className="menu-container"> 
        <div className="logo"> 
        <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>        </div>
        <nav>
          <ul>
          <li><Link to="/login?register=true">
                <ButtonTransparent title={"Cadastrar"} />
              </Link></li> 
          <li><Link to="/login">
                <Button title={"Login"} />
              </Link></li>
          <li className="hamburguer"><Navbar /></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;