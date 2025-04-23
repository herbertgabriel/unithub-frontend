import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./EventDetails.css";
import Button from "../../components/Button/Button";
import Popup from "../../components/Popup/Popup"; // Importa o componente Popup
import Cookies from "js-cookie";

function EventDetails() {
    const { id } = useParams(); // Obtém o parâmetro 'id' da URL
    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [showPopup, setShowPopup] = useState(false); // Controla a exibição do Popup

    useEffect(() => {
        const fetchEventDetails = async () => {
            const apiUrl = import.meta.env.VITE_API_BASE_URL; // Obtém a URL base da API
            try {
                const response = await fetch(`${apiUrl}/events/${id}`);
                if (!response.ok) {
                    throw new Error("Erro ao buscar os detalhes do evento.");
                }
                const data = await response.json();
                setEventDetails(data);
            } catch (err) {
                setError(err.message);
                setShowPopup(true); // Exibe o Popup em caso de erro
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [id]);

    const handleSubscribe = async () => {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        try {
            const token = Cookies.get("jwtToken");
            if (!token) {
                throw new Error("Você não está logado.");
            }

            const response = await fetch(`${apiUrl}/events/subscribe/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao se inscrever no evento.");
            }

            setSuccessMessage("Inscrição realizada com sucesso!");
        } catch (err) {
            setError(err.message);
            setShowPopup(true); // Exibe o Popup em caso de erro
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setError(null);
    };

    if (loading) {
        return (
            <>
                <Header />
                <p>Carregando...</p>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <h1>Detalhes do Evento</h1>
            {eventDetails && (
                <div className="event-details">
                    <p><strong>ID:</strong> {eventDetails.eventId}</p>
                    <p><strong>Título:</strong> {eventDetails.title}</p>
                    <p><strong>Descrição:</strong> {eventDetails.description}</p>
                    <p><strong>Data e Hora:</strong> {new Date(eventDetails.dateTime).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}</p>
                    <p><strong>Local:</strong> {eventDetails.location}</p>
                    <p><strong>Categorias:</strong> {eventDetails.categories.join(", ")}</p>
                    <p><strong>Ativo:</strong> {eventDetails.active ? "Sim" : "Não"}</p>
                    <p><strong>Máximo de Participantes:</strong> {eventDetails.maxParticipants || "Sem limite"}</p>
                    
                    {/* Exibe as imagens do evento */}
                    {eventDetails.images && eventDetails.images.length > 0 && (
                        <div className="event-images">
                            {eventDetails.images.slice(0, 4).map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Imagem ${index + 1}`}
                                    className="event-image"
                                />
                            ))}
                        </div>
                    )}

                    {/* Exibe o botão apenas se maxParticipants for diferente de 0 */}
                    {eventDetails.maxParticipants !== 0 && (
                        <Button title="Inscrever-se" onClick={handleSubscribe} />
                    )}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </div>
            )}
            {showPopup && (
                <Popup
                    title="Erro"
                    message={error}
                    onClose={closePopup}
                />
            )}
            <Footer />
        </>
    );
}

export default EventDetails;