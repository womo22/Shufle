/*
 * The stream page contains the decks of cards that the user flips through
 *
 * This page has navigation buttons to go to "edit profile" and "conversations"
 * There is also a switch at the top to switch between this page and the
 * "see matches" page
 *
 */

import * as React from 'react';
import { View, Platform, StyleSheet, Text, Animated, Button } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ProfileCard } from '../components/ProfileCard';
import Swiper from 'react-native-deck-swiper';

import { createCardBatch, saveResults } from './../assets/utils/APIService';

import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

const axios = require("axios").default;
const BASE_URL = "https://shufle.herokuapp.com/parse/functions/create_card_batch";


export default function StreamScreen(props) {
  const [cards, setCards] = React.useState([]);
  const [retCards, setRetCards] = React.useState([]);

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
      setCards(cards);
    });
  }, []);

  function swipeRight(index) {
    console.log("swiped right");
    if (cards[index]) {
      const question = cards[index].question;
      const answer = cards[index].answer;
      const retObj = {
        'question': question,
        'answer': answer,
        'swipe': true,
      };
      setRetCards(retCards => [...retCards, retObj]);
      console.log(retCards);
    }
  }

  function swipeLeft(index) {
    if (cards[index]) {
      const question = cards[index].question;
      const answer = cards[index].answer;
      const retObj = {
        'question': question,
        'answer': answer,
        'swipe': false,
      };
      setRetCards(retCards => [...retCards, retObj]);
      console.log(retCards);
    }
  }

  function sendResults() {
    saveResults(retCards);
  }

    return (
        <View style={styles.container}>
          {cards.length > 0 &&
          <View>
          <Swiper
            cards={cards}
            renderCard={(card) => {
              return (
                <ProfileCard question={card.question} answer={card.answer} />
              )
            }}
            onSwiped={(cardIndex) => { console.log(cardIndex) }}
            onSwipedLeft={(cardIndex) => { swipeLeft(cardIndex) }}
            onSwipedRight={(cardIndex) => { swipeRight(cardIndex) }}
            onSwipedAll={sendResults}
            cardIndex={0}
            backgroundColor={'#4FD0E9'}
            stackSize={cards.length}>
          </Swiper>
          </View>
          }
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });
  
