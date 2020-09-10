import * as React from "react"
import { Animated, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function OuterTab(props) {
    return (
        <Ionicons
            name={props.name}
            size={30}
            style={{marginBottom:-3}}
            color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
    );
}


// export default function OuterTab({ focusAnim, title, onPress }) {
//     return (
//         <TouchableOpacity onPress={onPress}>
//             <Animated.View
//                 style={{
//                     padding: 10,
//                     borderRadius: 10,
//                     backgroundColor: focusAnim.interpolate({
//                         inputRange: [0, 1],
//                         outputRange: ["transparent", "tomato"]
//                     })
//                 }}
//             >
//                 <Animated.Text
//                     style={{
//                         color: focusAnim.interpolate({
//                             inputRange: [0, 1],
//                             outputRange: ["#444", "#fff"]
//                         })
//                     }}
//                 >{title}</Animated.Text>
//             </Animated.View>
//         </TouchableOpacity>
//     )
// }
