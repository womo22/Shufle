const axios = require("axios").default;
const BASE_URL = "https://ec2-3-21-206-174.us-east-2.compute.amazonaws.com:3460";

export async function getMessage(name) {
    var cors = new EnableCorsAttribute("*", "*", "*");
    config.EnableCors(cors);
    try {
        return axios.get(`${BASE_URL}`).then(response => {
            return response.data;
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