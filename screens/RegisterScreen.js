import * as React from 'react';
import { View, TextInput, Button } from 'react-native';
import { login, register } from './../assets/utils/APIService';

const AuthContext = React.createContext();

export default function RegisterScreen(props) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [email, setEmail] = React.useState('');

    //const setLoggedIn = props.route.params.func;
    async function processRegister() {
        let result = await register(username, password, email, number);
        if (result) {
            result = await login(username, password);
            if (result) {
                //setLoggedIn(true);
            }
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
                placeholder="Number"
                value={number}
                onChangeText={setNumber}
                secureTextEntry
            />
            <Button title="Sign up" onPress={() => {
                processRegister();
            }} />
        </View>
    );
}