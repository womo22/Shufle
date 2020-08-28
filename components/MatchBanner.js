import * as React from "react";
import {
    Text,
    View,
} from "react-native";
import { useStyle } from "../assets/styles/styles"
import { TextInput, TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Chip } from "react-native-paper";
import { Feather } from '@expo/vector-icons';


export function MatchBanner({ name, lastMessage }) {
    const { styles } = useStyle("basicText", "matchBanner", "roundedImage");
    console.log(name);
    return (
        <View style={styles.matchBanner}>
            <View style={{ marginLeft: 10, marginRight: 10, marginTop: 5 }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={styles.roundedImage}
                    >
                        <Feather
                            name={'layers'}
                            size={40}
                            color={"#cdcdcd"}
                        />
                    </TouchableOpacity>
                    <View style={{display: 'flex', flexDirection:'column'}}>
                        <Text style={[styles.basicText, {marginTop: 5}]} numberOfLines={1}>{name}</Text>
                        <Text numberOfLines={1} style={{marginTop: 8}}>{lastMessage}</Text>
                    </View>
                </View>
                
            </View>
        </View>
    );
}