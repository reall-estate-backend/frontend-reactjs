import axios from "axios";

const OFFRE_API_BASE_URL = "http://localhost:8222/api/v1/offres";
const OFFRE_API_BASE_URL_SERVICE = "http://localhost:8050/api/v1/offres";

class OffreService {
  saveOffer(offer) {
    return axios.post(OFFRE_API_BASE_URL_SERVICE, offer, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getAllOffres() {
    return axios.get(OFFRE_API_BASE_URL + "/allOffers");
  }

  getOffersByUser(userId) {
    return axios.get(OFFRE_API_BASE_URL + "/allOffers/" + userId);
  }

  updateOffer(offer, offerId) {



    return axios.put(OFFRE_API_BASE_URL_SERVICE + "/" + offerId, offer, {
        headers: {
            'Content-Type': 'application/json',
        },//here the problem doesn't work with port 8222

    });
  }

  deleteOffer(id) {

    //return axios.delete(OFFRE_API_BASE_URL + "/" + id);

    return axios.delete(`${OFFRE_API_BASE_URL_SERVICE}/${id}`);

  }

  getOfferById(offerId) {
    return axios.get(OFFRE_API_BASE_URL + "/" + offerId);
  }

  getFilteredOffres(filters) {
    const queryString = new URLSearchParams(filters).toString();

    return axios.get(`${OFFRE_API_BASE_URL}/search?${queryString}`);
  }
  
}


export default new OffreService ();

