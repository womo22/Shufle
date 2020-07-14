const axios = require("axios").default;
//Get your favorite AsyncStorage handler with import (ES6) or require
import { AsyncStorage } from 'react-native'; 

//Before using the SDK...
const BASE_URL = "https://shufle.herokuapp.com/parse/functions/hello";
var Parse = require('parse/react-native.js');
Parse.initialize("shufle", "iLoveRemy911");
Parse.setAsyncStorage(AsyncStorage);
//javascriptKey is required only if you have it on server.

Parse.serverURL = 'http://shufle.herokuapp.com/parse'

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

export async function register(username, password, email, number){
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    // other fields can be set just like with Parse.Object
    user.set("phone", number);
    try {
        await user.signUp();
        // Hooray! Let them use the app now.
    } catch (error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
    }
}


export async function login(username, password){
    try {
        const user = await Parse.User.logIn(username, password);
    
        console.log("logged in");
        console.log(user);
        return true;
    }
    catch (error) {
        return false;
    }
}