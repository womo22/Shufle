import * as React from "react";
import {
    Text,
    View,
} from "react-native";
import { useStyle } from "../assets/styles/styles"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";


export function ProfileCard({ question, answer }) {
    const { styles } = useStyle("cardBox");
    // console.log(advanceFunction);
    // advanceFunction();
    return (
        // <TouchableOpacity onPress={() => {
        //     advanceFunction();
        // }}>
        <View style={styles.cardBox}>
                <Text>{question}</Text>
                <Text>{answer}</Text>
        </View>
        // </TouchableOpacity >
    );
}
