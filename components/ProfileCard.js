import * as React from "react";
import { Feather } from '@expo/vector-icons';
import {
    Text,
    View,
} from "react-native";
import { useStyle } from "../assets/styles/styles"
import Dash from 'react-native-dash';
import { TextInput, TouchableOpacity, ScrollView } from "react-native-gesture-handler";


export function ProfileCard({ question, answer }) {
    const { styles } = useStyle("cardBox", "questionText", "answerText");
    return (
        <View style={styles.cardBox}>
            <Feather
                name={'layers'}
                size={40}
                style={{ alignSelf: "center", marginTop: 8 }}
                color={"#cdcdcd"}
            />
            <Text style={styles.questionText}>{question}</Text>
            <Dash
                dashThickness={8}
                dashGap={5}
                dashColor={"#cdcdcd"}
                style={{ marginTop: 15, alignSelf: "center", width: "90%", flexDirection: 'row' }} />
            <ScrollView>
                <Text style={styles.answerText}>{answer}</Text>
            </ScrollView>
        </View>
    );
}
