const axios = require("axios").default;
//Get your favorite AsyncStorage handler with import (ES6) or require
import { AsyncStorage } from 'react-native'; 

//Before using the SDK...
const BASE_URL = "https://shufle.herokuapp.com/parse/functions/hello";
export const Parse = require('parse/react-native.js');
Parse.initialize("shufle", "iLoveRemy911");
Parse.setAsyncStorage(AsyncStorage);
//javascriptKey is required only if you have it on server.

Parse.serverURL = 'http://shufle.herokuapp.com/parse'

export async function getMessage(name) {
    
    try {
        return axios.post(`${BASE_URL}`, {}, {
            headers: {"X-Parse-Application-Id": "shufle", "Content-Type": "application/json"},
            
        }).then(response => {
            return response.data.result;
        })
    } catch (error) {
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
        return true;
        // Hooray! Let them use the app now.
    } catch (error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
        return false;
    }
}


export async function login(username, password){
    try {
        const user = await Parse.User.logIn(username, password);

        // let CardClass = Parse.Object.extend("Card");

        // let card1 = new CardClass();
        // card1.set("question", "who is the best dog?");
        // card1.set("answer", "remy");
        // card1.set("owner", user);
        // card1.setACL(new Parse.ACL(user));

        // user.set("cards", [card1]);
        // user.save();
        return true;
    }
    catch (error) {
        return false;
    }
}


export async function createCardBatch() {
    return Parse.Cloud.run("create_card_batch", {});
}

