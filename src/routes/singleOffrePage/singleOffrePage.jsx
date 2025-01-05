import "./singleOffrePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { userData } from "../../lib/dummydata"; // Supposé que 'userData' est fourni quelque part
import Chat from "../../components/chat/Chat";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../helpers/apiService"; 


function SingleOffrePage() {
  // État pour les détails de l'offre, le chargement et l'erreur
  const [offre, setOffre] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seller, setSeller] = useState(null);


  const { id } = useParams();

  const getOffreDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      response = await request("GET", `/api/v1/users/getOffre/${id}`);
      setOffre(response.data);
      console.log(offre);
    } catch (err) {
      setError(err.message);
    } finally {    
      setLoading(false);
    }
  };





  useEffect(() => {
    getOffreDetails();
    console.log("Offre loaded:", offre);  

  }, [id]);

    useEffect(() => {
      console.log("Offre loaded:", offre);  
    }, [offre]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (!offre) return <div>Offer not found</div>;

  const immobilierResponse = offre?.immobilierResponse || {};

  return (
    <div className="singlePage" >
      <div className="details">
        <div className="wrapper">
          {/* Slider */}
          {immobilierResponse?.images?.length > 0 ? (
            <Slider images={immobilierResponse.images} />
          ) : (
            <div>No images available</div>
          )}

          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{immobilierResponse?.title || 'No Title Available'}</h1>
                <div className="address">
                  <img src="/pin.png" alt="Pin" />
                  <span>{immobilierResponse?.address || 'No Address Available'}</span>
                </div>
                <div className="price">${immobilierResponse?.price || 'No Price Available'}</div>
              </div>
            </div>
            <div className="bottom">{immobilierResponse?.description || 'No Description Available'}</div>
            <div className="chatContainer">
              <div className="wrapper">
                <Chat sellerId={offre.userId} />
              </div>
            </div>
          </div>
        </div> 
      </div>
   
      

        {/* Chat 
        <div className="chatContainer">
          <div className="wrapper">
            <Chat />
          </div>
        </div>*/}
     

      {/* Informations supplémentaires */}
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
  
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>{immobilierResponse?.utilities || "Renter is responsible"}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>{immobilierResponse?.petPolicy || "Pets Allowed"}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>{immobilierResponse?.incomePolicy || "Pets Allowed"}</p>
              </div>
            </div>
          </div>



          <p className="title">Sizes</p>
  
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{immobilierResponse?.size || "80 sqft"}</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span> {immobilierResponse?.bedroom} {immobilierResponse?.bedroom == 1 ? "bedroom" : "bedrooms" } </span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span> {immobilierResponse?.bathroom } {immobilierResponse?.bathroom  == 1 ? "bedroom" : "bedrooms" } </span>
            </div>
          </div>

          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{immobilierResponse?.schoolDistance || "250m away"}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{immobilierResponse?.busDistance || "100m away"}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{immobilierResponse?.restaurantDistance || "200m away"}</p>
              </div>
            </div>
          </div>

          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[immobilierResponse]} />
          </div>

          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button>
              <img src="/save.png" alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>   
  );
}

export default SingleOffrePage;
