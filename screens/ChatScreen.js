import * as React from 'react';
import { View, TextInput, Button } from 'react-native';
import { register, get_conversations } from './../assets/utils/APIService';
import { useStyle } from '../assets/styles/styles';
import { Feather } from '@expo/vector-icons';
import { MatchBanner } from '../components/MatchBanner';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default function ChatScreen(props) {
    const [matches, setMatches] = React.useState([]);

    const { styles } = useStyle();

    React.useEffect(() => {
        get_conversations().then(matchList => {
            setMatches(matchList);
            console.log(matchList);
        });
    }, []);

    console.log(props.navigation);

    return (
        <ScrollView>
        <View>
            <Feather
                name={'layers'}
                size={50}
                style={{ alignSelf: "center", marginTop: 8 }}
                color={"#cdcdcd"}
            />
            {matches.map((matchObj) => {
                return (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('MessagingScreen')}
                    >
                        <MatchBanner
                            name={matchObj.user_name}
                            lastMessage={matchObj.last_message}
                        />
                    </TouchableOpacity>
                )
            })}
        </View>
        </ScrollView>
    );
}