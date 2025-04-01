import "./Publicacao.css";
import Button from "../Button/Button";


function Publicacao({ title, categorias, content, imagens }) {
    const validImages = imagens.filter(imagem => imagem !== null);
    const imageCount = validImages.length;
    let containerClass = "";

    if (imageCount === 1) {
        containerClass = "one";
    } else if (imageCount === 2) {
        containerClass = "two";
    } else if (imageCount === 3) {
        containerClass = "three";
    } else if (imageCount >= 4) {
        containerClass = "four";
    }

    return (
        <article className="container-publication">
            <div className="publicacao-header">
                <div className="container-titulo">
                    <div>
                        <h2>{title}</h2>
                        <p>{categorias}</p>
                    </div>
                   

                </div>
                <Button title={"Ver mais"}/>
            </div>
            <div className="container-content"><p>{content}</p></div>
            <div className={`container-imagens ${containerClass}`}>
                {validImages.map((imagem, index) => (
                    <img key={index} src={imagem} alt={`Imagem ${index + 1}`} />
                ))}
            </div>
        </article>
    );
}

export default Publicacao;