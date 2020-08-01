import { StyleSheet } from "react-native";
import { useColorScheme } from "react-native-appearance";

/** Hook to get style objects that take into account the device appearance (dark or light mode).
 *
 * @param {} keys an array containing what styles are needed.
 */
export const useStyle = (...keys) => {
    const theme = useColorScheme();
    const isDark = theme === "dark";

    const styles = {};
    keys.forEach(styleKey => {
        const defaultStyles = allStyles[styleKey];

        if (isDark && allStyles[styleKey + "Dark"]) {
            styles[styleKey] = { ...defaultStyles, ...allStyles[styleKey + "Dark"] };
        } else {
            styles[styleKey] = allStyles[styleKey];
        }
    });

    const colorsDynamic = isDark ? colorsDark : colors;

    return { styles, colors: colorsDynamic, isDark };
};

const colors = {
    primarycolor: "#43a047",
    secondarycolor: "#a5d6a7",
    tertiarycolor: "#dcedc8",
    backgroundcolor: "#d1dbd0",
    secondarybackgroundcolor: "white",
    tertiarybackgroundcolor: "white",
    headercolor: "#444",
    textcolor: "black",
    secondarytextcolor: "grey",
    accentcolor: "#c8c7cc"
};

const colorsDark = {
    primarycolor: "#43a047",
    secondarycolor: "#a5d6a7",
    tertiarycolor: "#dcedc8",
    backgroundcolor: "black",
    secondarybackgroundcolor: "#1C1C1E",
    tertiarybackgroundcolor: "#393933",
    headercolor: "#CCC",
    textcolor: "white",
    secondarytextcolor: "grey",
    accentcolor: "#28282A"
};

const allStyles = StyleSheet.create({
    cardBox: {
        backgroundColor: "#E8E8E8",
        borderRadius: 10,
        borderWidth: 10,
        borderColor: "black",
        height: "80%",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
    },
});