import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Publicacao from "../../components/Publication/Publicacao";
import Pagination from "../../components/Pagination/Pagination";
import "./FeedOrganizador.css";
import Cookies from "js-cookie";

function FeedRepresentante() {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFeed = async () => {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const token = Cookies.get("jwtToken");

      if (!token) {
        console.error("Token JWT não encontrado. Usuário não autenticado.");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/events/feed-by-course-creator?isActive=false&page=${page}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do feed.");
        }

        const data = await response.json();

        setFeedItems(data.feedItems || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Erro ao buscar o feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleAccept = async (eventId) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const token = Cookies.get("jwtToken");

    try {
      const response = await fetch(`${apiUrl}/management/${eventId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao aceitar o evento.");
      }

      setFeedItems((prevItems) =>
        prevItems.filter((item) => item.eventId !== eventId)
      );
    } catch (error) {
      console.error("Erro ao aceitar o evento:", error);
    }
  };

  const handleReject = async (eventId) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const token = Cookies.get("jwtToken");

    try {
      const response = await fetch(`${apiUrl}/management/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao recusar o evento.");
      }

      setFeedItems((prevItems) =>
        prevItems.filter((item) => item.eventId !== eventId)
      );
    } catch (error) {
      console.error("Erro ao recusar o evento:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="feed-organizador-container">
        <h1>Gestão de Eventos</h1>
        <div className="feed-container">
          {loading ? (
            <div className="container-carregar-mais">
              <p>Carregando...</p>
            </div>
          ) : feedItems.length === 0 ? (
            <div className="container-carregar-mais">
              <p>Nenhuma publicação encontrada.</p>
            </div>
          ) : (
            feedItems.map((item) => (
              <Publicacao
                key={item.eventId}
                eventId={item.eventId}
                title={item.title}
                categorias={`${item.category.join(" | ")} | ${
                  item.isOfficial ? "Oficial" : "Não oficial"
                }`}
                imagens={item.images}
                content={item.description}
                onManagment={true}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            ))
          )}
        </div>
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default FeedRepresentante;