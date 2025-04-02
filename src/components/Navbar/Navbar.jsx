import { useState } from "react";
import { Link } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi2";
import { HiAcademicCap } from "react-icons/hi2";
import { HiMiniDocumentText } from "react-icons/hi2";
import { HiUsers } from "react-icons/hi2";
import { HiTicket } from "react-icons/hi2";
import { HiPencilSquare } from "react-icons/hi2";
import { HiRectangleGroup } from "react-icons/hi2";



import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-container">
      {/* Botão do menu hambúrguer */}
      <button
        className={`hamburger-menu ${isMenuOpen ? "hidden" : ""}`}
        onClick={toggleMenu}
      >
        ☰
      </button>

      {/* Navbar lateral */}
      <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMenu}>
          ✖
        </button>
        <nav className="nav-links">
          <ul>
            <li><Link to="/profile" onClick={toggleMenu}><HiUserCircle /> Meu Perfil</Link></li>
            <li><Link to="/meus-eventos" onClick={toggleMenu}><HiRectangleGroup /> Meus Eventos</Link></li>
            <li><Link to="/eventos-inscritos" onClick={toggleMenu}><HiTicket /> Eventos Inscritos</Link></li>
            <li><Link to="/eventos-inscritos" onClick={toggleMenu}><HiPencilSquare /> Criar Publicação</Link></li>
            {/* Adimin e Organizador */}
            <li><Link to="/feed-organizador" onClick={toggleMenu}><HiMiniDocumentText /> Solicitações de Publicações</Link></li>
            <li><Link to="/cursos" onClick={toggleMenu}><HiAcademicCap /> Gerenciar Cursos</Link></li>
            <li><Link to="/gerenciamento-usuarios" onClick={toggleMenu}><HiUsers /> Gerenciamento de Usuários</Link></li>

          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;