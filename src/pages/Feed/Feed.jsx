import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Carousel from "../../components/Carousel/Carousel";
import FeedComponent from "../../components/Feed/FeedComponent";
import "./Feed.css";

function Feed() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  return (
    <>
      <Header />
      <main className="feed-container">
        <h1>Próximos eventos</h1>
        <Carousel />
        <FeedComponent
          apiUrl={apiUrl}
          fetchUrl="/events/feed?category=all"
          title="Próximos eventos"
        />
      </main>
      <Footer />
    </>
  );
}

export default Feed;