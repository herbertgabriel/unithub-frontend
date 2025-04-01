import "./Carousel.css";

function CarouselItem({ date, title, description }) {
  return (
    <div className="slide">
      <div className="box-date">
        {date} <hr className="line" />
      </div>
      <div className="box-conteudo">
        <h3 className="box-title">{title}</h3>
        <p className="box-description">{description}</p>
      </div>
    </div>
  );
}

export default CarouselItem;