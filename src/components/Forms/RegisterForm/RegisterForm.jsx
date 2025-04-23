import { useState, useEffect } from "react";
import { sanitizeInput, validateRegisterForm } from "../../../utils/validations";
import {httpStatusMessagesLogin} from "../../../utils/httpStatusMessages";
import Popup from "../../Popup/Popup";

function RegisterForm({ apiUrl, setPopupData, setIsRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [name, setName] = useState(""); 
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupDataLocal] = useState({ title: "", message: "" });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${apiUrl}/courses`);
        if (!response.ok) {
          throw new Error(httpStatusMessagesLogin[response.status] || "Erro ao buscar cursos.");
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setPopupDataLocal({ title: "Erro", message: err.message });
        setShowPopup(true);
      }
    };

    fetchCourses();
  }, [apiUrl]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    const sanitizedConfirmPassword = sanitizeInput(confirmPassword);
    const sanitizedTelephone = sanitizeInput(telephone);
    const sanitizedName = sanitizeInput(name); 

    const errorMessage = validateRegisterForm(
      sanitizedName, 
      sanitizedEmail,
      sanitizedPassword,
      sanitizedConfirmPassword,
      courseId,
      sanitizedTelephone
    );
    if (errorMessage) {
      setPopupDataLocal({ title: "Erro", message: errorMessage });
      setShowPopup(true);
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
        throw new Error(httpStatusMessagesLogin[response.status] || "Erro ao realizar cadastro.");
      }

      setPopupData({
        title: "Bem-vindo!",
        message: "Seu cadastro foi realizado com sucesso!",
        onClose: () => setIsRegister(false),
      });
    } catch (err) {
      setPopupDataLocal({ title: "Erro", message: err.message });
      setShowPopup(true);
    }
  };

  return (
    <>
      {showPopup && (
        <Popup
          title={popupData.title}
          message={popupData.message}
          onClose={() => setShowPopup(false)}
        />
      )}
      <form onSubmit={handleRegister} className="register-form">
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
        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
}

export default RegisterForm;