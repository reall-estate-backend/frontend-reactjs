
import React, { useState } from "react";
import "./filter.scss";

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
  "Charlotte"
];

function Filter({ onFilterChange }) {
  const [localFilters, setLocalFilters] = useState({
    city: "",

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...localFilters, [name]: value };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters); // Transmettre les nouveaux filtres à ListPage
  };

  const handleSearch = () => {
    onFilterChange(localFilters); // Appliquer les filtres actuels lors du clic sur le bouton
  };

  return (
    <div className="filter">
      <h1>Search Filters</h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <select
            id="city"
            name="city"
            value={localFilters.city}
            onChange={handleInputChange}
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
  );
}

export default Filter;
