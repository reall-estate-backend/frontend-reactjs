import './Mylist.scss'
import { useState, useEffect } from "react";
import CardMyOffre from "../cardMyOffre/cardMyOffre";
import OffreService from "../../services/OffreService";
import "./MyList.scss";
import {listData} from "../../lib/dummydata"

function MyList(){
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = "67477a5a7e8cf83850b79b91";//à remplacer par user ID authentified
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await OffreService.getOffersByUser(userId);
        setOffers(response.data); // Met à jour les offres avec les données récupérées
      } catch (err) {
        setError("Erreur lors de la récupération des offres");
        console.error(err);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };
    fetchOffers(); // Appel de la fonction pour récupérer les données
  }, [userId]);

  if (loading) {
    return <p>Offers Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }




  return (
    <div className='list'>
      {offers.length > 0 ? (
        offers.map((item) => <CardMyOffre key={item.id} item={item} />)
      ) : (
        <p>Aucune offre disponible.</p>
      )}
    </div>
  ) 
}

export default MyList