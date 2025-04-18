import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./EventDetails.css";

function EventDetails() {
    const { id } = useParams(); // Obtém o parâmetro 'id' da URL
    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [id]);

    if (loading) {
        return (
            <>
                <Header />
                <p>Carregando...</p>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <p>Erro: {error}</p>
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
                </div>
            )}
            <Footer />
        </>
    );
}

export default EventDetails;