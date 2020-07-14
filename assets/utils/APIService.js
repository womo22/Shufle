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
    } catch (error) {
        console.log("error: " + error);
        return { error: error };
    }
}

export async function login(username, password) {
    try {
        const user = await Parse.User.logIn(username, password);
        console.log(user);
        //if (user) {
        return true;
        //}
    } catch (error) {
        return false;
    }
}