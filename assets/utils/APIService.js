const axios = require("axios").default;
const BASE_URL = "https://shufle.herokuapp.com/parse/functions/hello";

export async function getMessage(name) {
    
    try {
        return axios.post(`${BASE_URL}`, {}, {
            headers: {"X-Parse-Application-Id": "shufle", "Content-Type": "application/json"},
            
        }).then(response => {
            console.log(response.data.result);
            return response.data.result;
        })
        // const request = await axios.get(`${BASE_URL}`);
        // return request.resolve();
        // return request
        //     .then(result => { return result; })
        //     .catch(error => { console.log(error); });
        // const response = (await axios.get(`${BASE_URL}/`))
        // return response;
    } catch (error) {
        console.log("error: " + error);
        return { error: error };
    }
}