import { Link } from "react-router-dom";
import "./cardMyOffre.scss";

function CardMyOffre({ item }) {
  // Extraire les données depuis immobilierResponse
  const immobilier = item.immobilierResponse;

  // Vérifiez que immobilierResponse existe pour éviter une erreur
  if (!immobilier) {
    return <div className="error">Données de l'immobilier introuvables</div>;
  }

  const { title, images, bedroom, bathroom, price, address, city } = immobilier;
  const firstImage = images[0];

  return (
    <div className="card">
      <Link to={`/MyOffre/${item.id}`} className="imageContainer">
        <img 
          src={firstImage}
          alt={title} 
          style={{
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            borderRadius: '10px'
          }} 
        />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/MyOffre/${item.id}`}>{title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="location pin" />
          <span>{address}, {city}</span>
        </p>
        <p className="price">$ {price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="bed icon" />
              <span>{bedroom} bedroom{bedroom > 1 && "s"}</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="bath icon" />
              <span>{bathroom} bathroom{bathroom > 1 && "s"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardMyOffre;
