import { Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed/Feed";
import Login from "./pages/Login/Login";
import RecuperarSenha from "./pages/RecoverPassword/RecuperarSenha";
import Perfil from "./pages/Profile/Perfil";
import Cursos from "./pages/CoursesManagment/Cursos";
import MeusEventos from "./pages/MyEvents/MeusEventos";
import EventosInscritos from "./pages/EnrolledEvents/EventosInscritos";
import GerenciamentoUsuarios from "./pages/UserManagment/GerenciamentoUsuarios";
import FeedOrganizador from "./pages/FeedManagment/FeedOrganizador";
import EventDetails from "./pages/EventDetails/EventDetails";
function MainRouter() {
    return (
      <Routes>
        <Route path="/" element={<Feed/>} index />
        <Route path="/profile" element={<Perfil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/meus-eventos" element={<MeusEventos />} />
        <Route path="/eventos-inscritos" element={<EventosInscritos />} />
        <Route path="/gerenciamento-usuarios" element={<GerenciamentoUsuarios />} />
        <Route path="/feed-organizador" element={<FeedOrganizador />} />
        <Route path="/event-details/:id" element={<EventDetails />} />
        </Routes>
    );
  }
  
  export default MainRouter;