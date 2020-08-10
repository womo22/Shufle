/*
 * The stream page contains the decks of cards that the user flips through
 *
 * This page has navigation buttons to go to "edit profile" and "conversations"
 * There is also a switch at the top to switch between this page and the
 * "see matches" page
 *
 */

import * as React from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ProfileCard } from '../components/ProfileCard';

import { createCardBatch } from './../assets/utils/APIService';

const axios = require("axios").default;


//const BASE_URL = "https://shufle.herokuapp.com/parse/functions/hello";
const BASE_URL = "https://shufle.herokuapp.com/parse/functions/create_card_batch";


export default function StreamScreen(props) {
  // query server for a certain number of cards
  // array of {"question": , "answer": }
  // const [cardArray, setCardArray] = React.useState([]);

  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");


  /*
   * cards list returned from query:
   * cards= [
   *   {
   *     question: "what is ..",
   *     answer: "my faov...",
   *   },
   *   {
   *     ...
   *   }
   *   ...
   * ]
   * 
   * after swiping, need to call saveResults with updated cards list as argument
   * 
   * updated cards list would look like this:
   * cards= [
   *   {
   *     question: "what is ..",
   *     answer: "my faov...",
   *     swipe: true/false (right/left)
   *   },
   *   {
   *     ...
   *   }
   *   ...
   * ]
   */
  React.useEffect(() => {
    createCardBatch().then(cards => {
      setQuestion(cards[0].question);
      setAnswer(cards[0].answer);
    });
  }, []);
  

  // React.useEffect(() => {
  //   async function getCards() {
  //     // let result = await getCards(username, password);
  //     // if (result) {
  //     //   setCardArray(true);
  //     // }
  //     setCardArray([
  //       {
  //         'question': 'What is your favorite food?',
  //         'answer': 'Pineapple pizza',
  //       },
  //       {
  //         'question': 'What is your favorite animal?',
  //         'answer': 'Elephant',
  //       },
  //     ]);
  //     console.log("here2");
  //   }
  //   getCards();
  // })

  // function advanceCards() {
  //   const newArr = cardArray;
  //   newArr.shift();
  //   console.log("here");
  //   setCardArray(newArr);
  // }
    return (
        <View style={styles.container}>
            {/* <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}> */}
          <Text style={styles.getStartedText}>Swipe page!</Text>
          {/* {cardArray.length > 0 && */
            <ProfileCard question={question} answer={answer} />
          }
            {/* </ScrollView> */}
        </View>
        );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    developmentModeText: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.4)',
      fontSize: 14,
      lineHeight: 19,
      textAlign: 'center',
    },
    contentContainer: {
      paddingTop: 30,
      height: "100%"
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    homeScreenFilename: {
      marginVertical: 7,
    },
    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    getStartedText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center',
    },
    navigationFilename: {
      marginTop: 5,
    },
    helpContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
    submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
    },
  });
  
