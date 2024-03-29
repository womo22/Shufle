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

import { makeSomeCards } from './../assets/utils/APIService';


export default function EditScreen(props) {
  // query server for a certain number of cards
  // array of {"question": , "answer": }
  // const [cardArray, setCardArray] = React.useState([]);


  React.useEffect(() => {
    makeSomeCards();
  }, []);
  

    return (
        <View style={styles.container}>
            {/* <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}> */}
          <Text style={styles.getStartedText}>Edit page!</Text>
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
  
