import * as React from "react";
import {
    Text,
    View,
} from "react-native";
import { useStyle } from "../assets/styles/styles"
import { TextInput, TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Chip } from "react-native-paper";


export function SingleChip({ name, id, currSelected, setCurrSelected }) {
    const { styles } = useStyle("chip");
    return (
            <Chip
                mode='outlined'
                children={name}
                selected={currSelected === id}
            onPress={() => setCurrSelected(id, name)}
            style={styles.chip}
            />
    );
}