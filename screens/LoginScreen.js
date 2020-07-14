import * as React from 'react';
import { View, TextInput, Button } from 'react-native';
import { login } from './../assets/utils/APIService';

const AuthContext = React.createContext();

export default function LoginScreen(props) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    //const { signIn } = React.useContext(AuthContext);
    const setLoggedIn = props.route.params.func;
    console.log("this is logged in");
    console.log(setLoggedIn);
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
                if (login(username, password)) {
                    console.log("yay!");
                    setLoggedIn(true);
                }
            }} />
        </View>
    );
}