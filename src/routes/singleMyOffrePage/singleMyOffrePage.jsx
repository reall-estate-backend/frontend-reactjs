import "./singleMyOffrePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import OffreService from "../../services/OffreService";


function SingleMyOffrePage() {
  const [offerdata, setOfferdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [erreurDelete, setErreurDelete] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOfferDetails = async () => {
      try{
        const response = await OffreService.getOfferById(id);
        setOfferdata(response.data);
        setLoading(false);
      }
      catch (erreur) {
        setErreur(erreur);
        setLoading(false);

      }
    };
    fetchOfferDetails();
  }, [id]);
  const deleteOffer = async () => {
    try {
      await OffreService.deleteOffer(id);  // Call the delete service method
      navigate('/Myspace');  // Redirect to Myspace
    } catch (erreurDelete) {
      console.error("Error deleting offer:", erreurDelete);
      setErreurDelete("Failed to delete offer.");
    }
  };
  if(loading) return <div>Loading...</div>
  if(erreur) return <div>Erreur Loading offer details</div>
  if(!offerdata) return <div>No Offer Found</div>
  // Extraire les données depuis immobilierResponse
  const immobilier = offerdata.immobilierResponse;
  // Vérifiez que immobilierResponse existe
  if (!immobilier) {
    return <div className="error">Real Estate Not Found</div>;
  }

  const { title, images, description,bedroom, bathroom, price, address, city, size, schoolDistance, busDistance, restaurantDistance, type, property, utilities, petPolicy, incomePolicy } = immobilier;
  return (
    <div className="singlePage">
       {/* Details offre */}
      <div className="details">
        <div className="wrapper">
          <Slider images={images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{address}</span>
                </div>
                <div className="price">$ {price}</div>
              </div>

              <div className="buttons">
                <Link to={`/UpdateOffre/${offerdata.id}`}>
                  <button>Update Your Post</button>
                </Link>
                <button onClick={deleteOffer}>Delete</button>
              </div>

            </div>
            <div className="bottom">{description}</div>
          </div>
        </div>

    
      </div>

      {/* Part General */}
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>{utilities}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>{petPolicy}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>{incomePolicy}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span> {bedroom} {bedroom == 1 ? "bedroom" : "bedrooms" } </span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{bathroom} {bedroom == 1 ? "bathroom" : "bathrooms" }</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p> {schoolDistance}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{busDistance}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{restaurantDistance}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[immobilier]} />
          </div>
          <div className="buttons">
         
          </div>
        </div>
      </div>

    </div>
  );
}

export default SingleMyOffrePage;
