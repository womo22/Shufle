import * as React from "react";
import {
    Text,
    View,
} from "react-native";
import { SingleChip } from "./SingleChip";


export function ChipSelectorSingle({ options, setterFunction }) {
    const [currSelected, setCurrSelected] = React.useState(-1);

    function setFunc(id, newSelection) {
        setCurrSelected(id);
        setterFunction(newSelection);
    }

    return (
        <View>
            {options.map((name, index) => {
                return (
                <SingleChip
                        name={name}
                        id={index}
                        currSelected={currSelected}
                        setCurrSelected={setFunc}
                    />
                )
            })}
        </View>
    );
}
