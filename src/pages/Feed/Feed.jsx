import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Carousel from "../../components/Carousel/Carousel";
import Publicacao from "../../components/Publication/Publicacao";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import "./Feed.css";

function Feed() {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  

  useEffect(() => {
    const fetchFeed = async () => {
      const apiUrl = import.meta.env.VITE_API_BASE_URL; // Obtém a URL da API
      console.log(apiUrl); // Deve exibir a URL da API no console
  
      setLoading(true); // Inicia o estado de carregamento
      try {
        const response = await fetch(
          `${apiUrl}/events/feed?page=${page}&category=${selectedCategory}`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do feed.");
        }
        const data = await response.json();
  
        const filteredItems = data.feedItems || [];
        setFeedItems(filteredItems);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Erro ao buscar o feed:", error);
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };
  
    fetchFeed();
  }, [page, selectedCategory]);

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

  function capitalizeWords(str) {
    return str
      .split("|")
      .map((word) =>
        word.trim().toLowerCase().replace(/^\w/, (char) => char.toUpperCase())
      )
      .join(" | ");
  }

  return (
    <>
      <Header />
      <main className="feed-container">
        <h1>Próximos eventos</h1>
        <Carousel />
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
                title={item.title}
                categorias={`${capitalizeWords(item.category.join(" | ") || "")} | ${
                  item.isOfficial ? "Oficial" : "Não oficial"
                }`}
                imagens={item.images}
                content={item.description}
              />
            ))
          )}
        </div>
        <div className="container-carregar-mais">
          <button onClick={handlePreviousPage} disabled={page === 0}>
            <SlArrowLeft />
          </button>
          <span>
            Página {page + 1} de {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={page >= totalPages - 1}>
            <SlArrowRight />
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Feed;