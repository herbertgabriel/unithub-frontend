import { useState } from "react";
import { sanitizeInput, validateRecoverPasswordForm } from "../../../utils/validations";
import {httpStatusMessagesLogin} from "../../../utils/httpStatusMessages";
import Popup from "../../Popup/Popup";

function RecoverPasswordForm({ apiUrl, setPopupData, setIsRecoverPassword, setError }) {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar o Popup
  const [popupMessage, setPopupMessage] = useState(""); // Mensagem do Popup

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
        setPopupMessage(httpStatusMessagesLogin[response.status] || "Erro ao recuperar senha.");
        setShowPopup(true); 
        return;
      }

      setPopupData({
        title: "Atenção",
        message: "Instruções para recuperação de senha enviadas para o email.",
        onClose: () => setIsRecoverPassword(false),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {showPopup && (
        <Popup
          title={"Erro"}
          message={popupMessage}
          onClose={() => setShowPopup(false)} 
        />
      )}
      <form onSubmit={handleRecoverPassword} className="recover-password-form">
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
        <button type="submit">Recuperar Senha</button>
      </form>
    </>
  );
}

export default RecoverPasswordForm;