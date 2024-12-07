import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8222/api/v1/users";

class UserService {

    saveUser(user){
        return axios.post(USER_API_BASE_URL+"/create", user);
    }

    getUsers() {
        return axios.get(USER_API_BASE_URL);
      }
    
    getUserById(id) {
        return axios.get(USER_API_BASE_URL + "/" + id);
    }

    updateUser(user) {
        return axios.put(USER_API_BASE_URL, user);
    }

    deleteUser(id) {
        return axios.delete(USER_API_BASE_URL + "/" + id);
    }

}

export default new UserService ();