import React, { useEffect, useState } from "react";
import Card from "../../components/cardOffre/Card";
import Map from "../../components/map/Map";
import "./listPage.scss";
import { getAuthUser } from "../../helpers/apiService"; 
import { request } from "../../helpers/apiService"; 


const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Francisco",
  "Miami",
  "Seattle",
  "Las Vegas",
  "Atlanta",
  "Boston",
  "Washington, D.C.",
  "Denver",
  "Orlando",
  "Detroit",
  "Austin",
  "Nashville",
  "Portland",
  "Baltimore",
  "Salt Lake City",
  "Charlotte",
];

const ListPage = () => {
  const [user, setUser] = useState(null);
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ city: "" }); 

  const fetchOffres = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (filters.city) {
        const queryString = new URLSearchParams(filters).toString();
        response = await request("GET", `/api/v1/users/search?${queryString}`);
        console.log("Réponse après filtre city:", response); 
        setOffres(response.data);
      } else {
        response = await request("GET", "/api/v1/users/allOffers");
        setOffres(response.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const authUser = getAuthUser();
    if (authUser) {
      setUser(authUser);
      console.log(user);
    }
  }, []);


  useEffect(() => {
    fetchOffres();
  }, [filters]); 

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); 
  };

  if (loading) return <p>Chargement des offres...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="listPage"  style={{ paddingTop: "20px" }}>
      <div className="listContainer">
        <div className="wrapper">
          {/* Section des filtres */}
          <div className="filter"> 
          <h1 style={{fontSize: "40px", paddingTop: "20px" }}>
            Search Filters
          </h1>
    
            <div className="top">
              <div className="item">
                <label htmlFor="city" style={{fontSize: "18px", padding: "17px" }}>Location</label>
                <select
                    id="city"
                    name="city"
                    value={filters.city}
                    onChange={(e) => handleFilterChange({ city: e.target.value })}
                    style={{
                      padding: "5px",
                      fontSize: "16px",
                      color: "#333",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="">Select a City</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>

              </div>
            </div>
          </div>
        <hr/>
          {/* Affichage des offres */}
          {offres && offres.length > 0 ? (
            offres.map((offre) => {
              const { immobilierResponse } = offre;
              console.log(immobilierResponse, "je suis immobiler response");
              const { title, address, price, bedroom, bathroom, images } =
                immobilierResponse || {};

              const imageUrl =
                images?.length > 0
                  ? images[0]
                  : "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

              return (
                <Card
                  key={offre.id}
                  item={{
                    id: offre.id,
                    img: imageUrl,
                    title: title || " Beautiful Modern House",
                    address: address || " 123 Main St, Cityville",
                    price: price || "$350,000",
                    bedroom: bedroom || 3,
                    bathroom: bathroom || 1,
                  }}
                />
              );
            })
          ) : (
            <p>Aucune offre disponible</p>
          )}
        </div>
      </div>

      {/* Section de la carte */}
      <div className="mapContainer" >
        <Map />
      </div>
    </div>
  );
};

export default ListPage;
