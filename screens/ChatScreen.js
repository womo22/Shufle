import * as React from 'react';
import { View, TextInput, Button } from 'react-native';
import { register, get_conversations, get_messages, send_message } from './../assets/utils/APIService';
import { useStyle } from '../assets/styles/styles';
import { Feather } from '@expo/vector-icons';
import { MatchBanner } from '../components/MatchBanner';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default function ChatScreen(props) {
    const [matches, setMatches] = React.useState([]);

    const { styles } = useStyle();

    React.useEffect(() => {
        get_conversations().then(matchList => {
            console.log('__convos__:', matchList);
        
            get_messages(matchList[0]).then((msgs) => {
                console.log("messages:", msgs);
                send_message(matchList[0], `hey stranger, the convo has ${msgs.length+1} messages now`);
            });
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