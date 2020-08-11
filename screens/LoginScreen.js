import * as React from 'react';
import { View, TextInput, Button } from 'react-native';
import { login, currentlyLoggedIn } from './../assets/utils/APIService';
import { useStyle } from '../assets/styles/styles';
import { Feather } from '@expo/vector-icons';

const AuthContext = React.createContext();

export default function LoginScreen(props) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { styles } = useStyle("textBox");

    const setLoggedIn = props.route.params.func;
    async function processLogin() {
        let result = await login(username, password);
        if (result) {
            setLoggedIn(true);
        }
    }

    React.useEffect(() => {
        currentlyLoggedIn().then((loggedIn) => {
            if (loggedIn) {
                setLoggedIn(true);
            }
        });
    }, []);
    
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
            <Button title="Sign in" onPress={() => {
                processLogin();
            }} />
            <Button title="No account? Sign up" onPress={() => {
                props.navigation.navigate('Signup');
            }} />
        </View>
    );
}