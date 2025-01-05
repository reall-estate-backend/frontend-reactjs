// apiService.js
import axios from 'axios';


  
export const getAuthUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
        try {
            return JSON.parse(user);
        } catch (error) {
            console.error("Error parsing user data:", error);
            return null;
        }
    }
    return null;
};



export const setAuthUser = (user) => {
    if (user !== null) {
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        window.localStorage.removeItem("user");
    }
};


export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    if (token !== null) {
        window.localStorage.setItem("auth_token", token);
    } else {
        window.localStorage.removeItem("auth_token");
    }
};

axios.defaults.baseURL = 'http://afdf1cdf63654449dbc39270b4b63577-580563448.eu-north-1.elb.amazonaws.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data = {}) => {
    let headers = {};
    const token = getAuthToken();
    if (token) {
        headers = { 'Authorization': `Bearer ${token}` };
    }

    return axios({
        method,
        url,
        headers,
        data,
    });
};