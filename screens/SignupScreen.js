import * as React from 'react';
import { View, TextInput, Button } from 'react-native';
import { register } from './../assets/utils/APIService';
import { useStyle } from '../assets/styles/styles';
import { Feather } from '@expo/vector-icons';

export default function SignupScreen(props) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const { styles } = useStyle("textBox");

    const setLoggedIn = props.route.params.func;

    async function processSignup() {
        let result = await register(username, password, email, phone);
        if (result) {
            setLoggedIn(true);
        }
    }

    return (
        <View>
            <Feather
                name={'layers'}
                size={50}
                style={{ alignSelf: "center", marginTop: 8 }}
                color={"#cdcdcd"}
            />
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.textBox}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.textBox}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.textBox}
            />
            <TextInput
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                style={styles.textBox}
            />
            <Button title="Sign up" onPress={() => {
                processSignup();
            }} />
        </View>
    );
}