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
        backgroundColor: "#faf9f4",
        borderTopRightRadius: 70,
        borderBottomLeftRadius: 70,
        borderWidth: 5,
        borderColor: "#cdcdcd",
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        height: "65%",
        width: "85%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    questionText: {
        textAlign: "center",
        fontSize: 24,
        marginTop: 12,
        marginLeft: 10,
        marginRight: 10,
        fontWeight: "bold",
    },
    answerText: {
        textAlign: "center",
        fontSize: 24,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,
    },
    textBox: {
        fontSize: 16,
        borderWidth: 3,
        borderRadius: 2,
        borderColor: "#cdcdcd",
        shadowRadius: 2,
        elevation: 1,
        marginHorizontal: 10,
        marginVertical: 15,
        padding: 10
    },
});