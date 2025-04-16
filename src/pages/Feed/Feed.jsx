import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Carousel from "../../components/Carousel/Carousel";
import Publicacao from "../../components/Publication/Publicacao";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import fakeFeedData from "../../data/fakeFeedData.json"; // Importa o JSON fake
import "./Feed.css";

function Feed() {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      try {
        // Simula a busca de dados do JSON fake
        const data = fakeFeedData;
        const filteredItems =
          selectedCategory === "all"
            ? data.feedItems
            : data.feedItems.filter((item) =>
                item.category
                  .toLowerCase()
                  .includes(selectedCategory.toLowerCase())
              );

        setFeedItems(filteredItems.slice(page * 5, (page + 1) * 5)); // Paginação
        setTotalPages(Math.ceil(filteredItems.length / 5));
      } catch (error) {
        console.error("Erro ao buscar o feed:", error);
      } finally {
        setLoading(false);
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
        <h1>Próximos eventos</h1>  {alert("ola")}
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
                key={item.PublicationId}
                title={item.title}
                categorias={capitalizeWords(item.category || "")}
                imagens={[
                  item.imageUrl1,
                  item.imageUrl2,
                  item.imageUrl3,
                  item.imageUrl4,
                ]}
                content={item.content}
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