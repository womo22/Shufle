import * as React from 'react';
import { View, TextInput, Button } from 'react-native';

const AuthContext = React.createContext();

export default function LoginScreen(props) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    //const { signIn } = React.useContext(AuthContext);
    console.log(props.route.params.func);
    const setLoggedIn = props.route.params.func;
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
            <Button title="Sign in" onPress={() => setLoggedIn(true)} />
        </View>
    );
}