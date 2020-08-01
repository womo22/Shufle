import * as React from 'react';
import { View, TextInput, Button } from 'react-native';
import { login } from './../assets/utils/APIService';

const AuthContext = React.createContext();

export default function LoginScreen(props) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const setLoggedIn = props.route.params.func;
    async function processLogin() {
        let result = await login(username, password);
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
            <Button title="Sign in" onPress={() => {
                processLogin();
            }} />
            <Button title="No account? Sign up" onPress={() => {
                props.navigation.navigate('Signup');
            }} />
        </View>
    );
}