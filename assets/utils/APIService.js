const axios = require("axios").default;
//Get your favorite AsyncStorage handler with import (ES6) or require
import { AsyncStorage } from 'react-native'; 

import * as Location from 'expo-location';
import { CardStyleInterpolators } from '@react-navigation/stack';

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

export async function currentlyLoggedIn() {
    // TODO: check to make sure this also validates the session (i.e. won't give a user back
    // from an expired session)
    //const user = await Parse.User.currentAsync();
    return false;//user != 0;
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
        console.log("try user login");
        const user = await Parse.User.logIn(username, password);
        
        Location.requestPermissionsAsync().then(({ status }) => {
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            Location.getCurrentPositionAsync({}).then((location) => {
                console.log(location);

                var point = new Parse.GeoPoint({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                });

                user.set("location", point);
                user.save();
            });
        });

        return true;
    }
    catch (error) {
        return false;
    }
}

export async function save_profile_information(profile_obj) {
    const user = await Parse.User.currentAsync();
    
    const ProfileInformationClass = Parse.Object.extend("ProfileInformation");
    let profileInfo = new ProfileInformationClass();

    for (const q in profile_obj) {
        profileInfo.set(q, profile_obj[q]);
    }

    profileInfo.save();
}


export async function createCardBatch() {
    return await Parse.Cloud.run("create_card_batch", {});
}

// TODO put this somewhere in frontend
export function saveResults(cardListWithAnswers) {
    Parse.Cloud.run("send_answers", cardListWithAnswers);
}


export async function getQuestions() {
    return Parse.Cloud.run("get_questions", {});
}

export async function uploadCard(card) {
    let user = await Parse.User.current();

    const CardClass = Parse.Object.extend("Card");

    let cards = user.get("cards");
    if (cards === undefined) {
        cards = [];
    }
    else {
        cards = cards.filter((c) => c.question !== cards.question);
    }
    cards.push(card);
    user.set("cards", cards);
    user.save().then(() => {}, (err) => {
        console.log("failed to save user object, reason: " + err.message);
    });
}


// DEBUG ONLY
export async function makeSomeCards() {
    const user = await Parse.User.currentAsync();
    console.log(user);

    const CardClass = Parse.Object.extend("Card");

    let card1 = new CardClass();
    card1.set("question", 1);
    card1.set("answer", "Remy");
    card1.set("owner", user);
    card1.setACL(new Parse.ACL(user));

    // delete all previous cards
    const query = new Parse.Query(CardClass);
    query.equalTo("owner", user);
    const cards = await query.find();

    console.log("cards", cards);

    cards.forEach((card) => {
        card.destroy().then((card) => {
            console.log("Successfully destroyed card", card);
        }, (error) => {
            console.log("Error! could not destroy card because ", error);
        });
    });

    card1.save();
}

