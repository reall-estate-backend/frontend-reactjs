import axios from "axios";

const PAYMENT_API_BASE_URL = "http://localhost:8222/api/v1/planSubscription";

class PaymentService {

    getAllPans(){
        return axios.get(PAYMENT_API_BASE_URL+"/allplans");
    }

    getAllSubscriptions(){
        return axios.get(PAYMENT_API_BASE_URL+"/allSubscriptions");
    }

    getPlanById(id) {
        return axios.get(PAYMENT_API_BASE_URL + "/exists/" + id);
    }

    getPlanById(planName) {
        return axios.get(PAYMENT_API_BASE_URL + "/planName/" + planName);
    }

    saveSubscription(subscription) {
        return axios.post(PAYMENT_API_BASE_URL + "/createSubscription", subscription, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    }

    getUserSubscription(idUser) {
        return axios.get(PAYMENT_API_BASE_URL + "/userSub/" + idUser);
    }

    updateSubscription(subscription) {
        return axios.put(PAYMENT_API_BASE_URL, subscription);
    }

    deleteSubscription(idUser) {
        return axios.delete(PAYMENT_API_BASE_URL + "/subscription/" + idUser);
    }

}

export default new PaymentService ();