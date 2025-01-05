import './Mylist.scss';
import { useState, useEffect } from "react";
import CardMyOffre from "../cardMyOffre/cardMyOffre";
import { getAuthUser } from "../../helpers/apiService"; 
import { request } from "../../helpers/apiService"; 

function MyList() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authUser = getAuthUser();
    if (authUser) {
      setUser(authUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const fetchOffers = async () => {
        try {
          const response = await request("GET", `/api/v1/users/allOffers/${user.id}`);
          setOffers(response.data); 
        } catch (err) {
          setError("");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchOffers(); 
    }
  }, [user]); 

  if (loading) {
    return <p>Offers Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='list'  style={{ paddingTop: "40px" }} >
      {offers.length > 0 ? (
        offers.map((item) => <CardMyOffre key={item.id} item={item} />)
      ) : (
        <p>Aucune offre disponible.</p>
      )}
    </div>
  ); 
}

export default MyList;
