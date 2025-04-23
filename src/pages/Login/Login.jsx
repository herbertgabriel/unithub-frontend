import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Importa o AuthContext
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Popup from "../../components/Popup/Popup";
import "./Login.css";
import {
  sanitizeInput,
  validateLoginForm,
  validateRegisterForm,
  validateRecoverPasswordForm,
} from "../../util/validation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [name, setName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isRecoverPassword, setIsRecoverPassword] = useState(false);
  const [popupData, setPopupData] = useState(null); // Estado para gerenciar os Popups

  const { isAuthenticated, login } = useAuth(); // Usa o estado de autenticação e a função de login do AuthContext
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Redireciona se o usuário já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      setPopupData({
        title: "Login já efetuado",
        message: "Você já está logado.",
        onClose: () => {
          setPopupData(null);
          navigate("/");
        },
      });
    }
  }, [isAuthenticated]);

  // Define o estado inicial com base no parâmetro da URL
  useEffect(() => {
    if (searchParams.get("register") === "true") {
      setIsRegister(true);
    }
  }, [searchParams]);

  // Busca os cursos do endpoint /courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${apiUrl}/courses`);
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error("Erro ao buscar cursos:", err);
      }
    };

    if (isRegister) {
      fetchCourses();
    }
  }, [isRegister]);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
  
    const errorMessage = validateLoginForm(sanitizedEmail, sanitizedPassword);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
  
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: sanitizedEmail, password: sanitizedPassword }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro na resposta do login:", errorData);
        throw new Error(errorData.message || "Erro ao fazer login.");
      }
  
      const data = await response.json();
      console.log("Dados recebidos no login:", data); // Depuração
  
      // Verifica se os dados necessários estão presentes
      if (!data.accessToken || !data.role || !data.expiresIn) {
        throw new Error("Dados incompletos retornados pelo servidor.");
      }
  
      // Define os dados no AuthContext
      login(data.accessToken, data.role, data.expiresIn);
  
      setPopupData({
        title: "Sucesso",
        message: "Login realizado com sucesso!",
        onClose: () => {
          setPopupData(null);
          navigate("/");
        },
      });
    } catch (err) {
      console.error("Erro ao fazer login:", err.message);
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    const sanitizedConfirmPassword = sanitizeInput(confirmPassword);
    const sanitizedTelephone = sanitizeInput(telephone);
    const sanitizedName = sanitizeInput(name);

    const errorMessage = validateRegisterForm(
      sanitizedEmail,
      sanitizedPassword,
      sanitizedConfirmPassword,
      courseId
    );
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: sanitizedEmail,
          password: sanitizedPassword,
          confirmPassword: sanitizedConfirmPassword,
          telephone: sanitizedTelephone,
          name: sanitizedName,
          courseId: parseInt(courseId),
        }),
      });

      if (!response.ok) {
        const data = response.json();
        console.log(data.message)
        throw new Error("Erro ao realizar cadastro.");
      }

      setPopupData({
        title: "Bem-vindo!",
        message: "Seu cadastro foi realizado com sucesso!",
        onClose: () => {
          setPopupData(null);
          setIsRegister(false); // Volta para o formulário de login
        },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRecoverPassword = async (e) => {
    e.preventDefault();

    const sanitizedEmail = sanitizeInput(email);

    const errorMessage = validateRecoverPasswordForm(sanitizedEmail);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/recover-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: sanitizedEmail }),
      });

      if (!response.ok) {
        const data = response.json();
        console.log(data.message)
        throw new Error("Erro ao recuperar senha.");
        
      }

      setPopupData({
        title: "Atenção",
        message: "Instruções para recuperação de senha enviadas para o email.",
        onClose: () => {
          setPopupData(null);
          setIsRecoverPassword(false); // Volta para o formulário de login
        },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Header />
      <main className="login-container">
        {popupData && (
          <Popup
            title={popupData.title}
            message={popupData.message}
            onClose={popupData.onClose}
          />
        )}
        <h1>{isRecoverPassword ? "Recuperar Senha" : isRegister ? "Cadastro" : "Login"}</h1>
        <form
          onSubmit={
            isRecoverPassword
              ? handleRecoverPassword
              : isRegister
              ? handleRegister
              : handleLogin
          }
          className="login-form"
        >
          {isRegister && (
            <>
              <div>
                <label htmlFor="name">Nome:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="telephone">Telefone:</label>
                <input
                  type="text"
                  id="telephone"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Senha:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirmar Senha:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="course">Curso:</label>
                <select
                  id="course"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  required
                >
                  <option value="">Selecione um curso</option>
                  {courses.map((course) => (
                    <option key={course.cursoId} value={course.cursoId}>
                      {course.nome}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          {!isRegister && !isRecoverPassword && (
            <>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Senha:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          {isRecoverPassword && (
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
          <button type="submit">
            {isRecoverPassword
              ? "Recuperar Senha"
              : isRegister
              ? "Cadastrar"
              : "Entrar"}
          </button>
        </form>
        {!isRecoverPassword && (
          <button
            className="toggle-form-button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
          >
            {isRegister ? "Já tem conta? Clique aqui" : "Não tem conta? Clique aqui"}
          </button>
        )}
        {!isRegister && (
          <button
            className="toggle-form-button"
            onClick={() => {
              setIsRecoverPassword(!isRecoverPassword);
              setError("");
            }}
          >
            {isRecoverPassword ? "Voltar ao Login" : "Esqueci minha senha"}
          </button>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Login;