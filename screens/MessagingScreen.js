import * as React from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { register } from './../assets/utils/APIService';
import { useStyle } from '../assets/styles/styles';
import { Feather } from '@expo/vector-icons';

export default function MessagingScreen(props) {
    const { styles } = useStyle("textBox");

    return (
        <View>
            <Feather
                name={'layers'}
                size={50}
                style={{ alignSelf: "center", marginTop: 8 }}
                color={"#cdcdcd"}
            />
            <Text>Welcome to the messaging screen</Text>
        </View>
    );
}