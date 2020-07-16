import * as React from 'react';
import { View, TextInput, Button } from 'react-native';
import { register } from './../assets/utils/APIService';

export default function SignupScreen(props) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const setLoggedIn = props.route.params.func;

    async function processSignup() {
        let result = await register(username, password, email, phone);
        if (result) {
            setLoggedIn(true);
        }
    }

    return (
        <View>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
            />
            <Button title="Sign up" onPress={() => {
                processSignup();
            }} />
        </View>
    );
}