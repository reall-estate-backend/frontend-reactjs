import { useState, useEffect } from "react";
import "./searchBar.scss";
import axios from "axios"; // Pour récupérer les villes depuis le backend

const types = ["buy", "rent"];



function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const [cities, setCities] = useState([]); // Stocke les villes disponibles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cities depuis le backend
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("/api/v1/offre/search"); // Adaptez l'URL selon votre backend
        setCities(response.data); // Assurez-vous que le backend renvoie un tableau de villes
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des villes :", err);
        setError("Impossible de charger les villes.");
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Recherche envoyée :", query);

    try {
      const response = await axios.get("/api/v1/offre/search", {
        params: {
          city: query.location,
         // minPrice: query.minPrice,
          //maxPrice: query.maxPrice,
          //type: query.type,
        },
      });

      setResults(response.data); // Mettez à jour les résultats avec la réponse du backend
    } catch (err) {
      console.error("Erreur lors de la recherche :", err);
      setResults([]); // Vide les résultats en cas d'erreur
    }}

  if (loading) return <p>Chargement des villes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <select
          name="location"
          value={query.location}
          onChange={handleInputChange}
        >
          <option value="">Sélectionnez une ville</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          value={query.minPrice}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          value={query.maxPrice}
          onChange={handleInputChange}
        />
        <button type="submit">
          <img src="/search.png" alt="Search" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
