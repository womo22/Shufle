import * as React from "react";
import { Feather } from '@expo/vector-icons';
import {
    Text,
    View,
} from "react-native";
import { useStyle } from "../assets/styles/styles"
import Dash from 'react-native-dash';
import { TextInput, TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { SingleChip } from "./SingleChip";
import { Chip } from "react-native-paper";


export function ChipSelectorMultiple({ options, setterFunction }) {
    const [currSelected, setCurrSelected] = React.useState([]);
    const { styles } = useStyle("chip");

    function toggleSelected(name) {
        let copy = [...currSelected];
        const indArr = copy.indexOf(name);
        if (indArr > -1) {
            copy.splice(indArr, 1);
        }
        else {
            copy.push(name);
        }
        setCurrSelected(copy);
        setterFunction(copy);
    }

    return (
        <View>
            {options.map((name) => {
                return (
                    <Chip
                        mode='outlined'
                        children={name}
                        selected={currSelected.includes(name)}
                        onPress={() => toggleSelected(name)}
                        style={styles.chip}
                    />
                )
            })}
        </View>
    );
}
