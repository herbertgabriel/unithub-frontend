import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./EventDetails.css";

function EventDetails() {
    const { id } = useParams(); // Obtém o parâmetro 'id' da URL
    return (
        <>
        <Header />
            <h1>Detalhes do Evento</h1>
            <p>ID do evento: {id}</p>
        <Footer />
        </>
    );
}
export default EventDetails;