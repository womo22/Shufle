const axios = require("axios").default;
const BASE_URL = "https://shufle.herokuapp.com/parse/functions/hello";

export async function getMessage(name) {    
    return axios.post(`${BASE_URL}`, {}, {
        headers: { "X-Parse-Application-Id": "shufle", "Content-Type": "application/json" },
            
    }).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error);
    });
}