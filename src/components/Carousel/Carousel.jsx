import "./Carousel.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselItem from "./CarouselItem";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Tempo em segundos
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const carouselData = [
    {
      date: "12 de Novembro de 2024",
      title: "Workshop de Pintura e Escultura",
      description: "Participe e aprenda com artistas locais a criar suas próprias obras!",
    },
    {
      date: "32 de Novembro de 2024",
      title: "Mercado de Artesanato",
      description: "Explore uma variedade de estandes com produtos artesanais, de joias a tecidos feitos à mão.",
    },
    {
      date: "22 de Novembro de 2024",
      title: "Exposição de Arte Contemporânea",
      description: "Admire seleção de obras inspiradoras de novos talentos, com peças que exploram temas culturais e sociais.",
    },
    {
        date: "22 de Novembro de 2024",
        title: "Exposição de Arte Contemporânea",
        description: "Admire seleção de obras inspiradoras de novos talentos, com peças que exploram temas culturais e sociais.",
      },
      {
        date: "22 de Novembro de 2024",
        title: "Exposição de Arte Contemporânea",
        description: "Admire seleção de obras inspiradoras de novos talentos, com peças que exploram temas culturais e sociais.",
      },
      {
        date: "22 de Novembro de 2024",
        title: "Exposição de Arte Contemporânea",
        description: "Admire seleção de obras inspiradoras de novos talentos, com peças que exploram temas culturais e sociais.",
      },
      
  ];

  return (
    <Slider {...settings}>
      {carouselData.map((item, index) => (
        <CarouselItem
          key={index}
          date={item.date}
          title={item.title}
          description={item.description}
        />
      ))}
    </Slider>
  );
}

export default Carousel;