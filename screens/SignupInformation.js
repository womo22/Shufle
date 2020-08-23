import * as React from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { save_profile_information } from './../assets/utils/APIService';
import { useStyle } from '../assets/styles/styles';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ChipSelectorSingle } from '../components/ChipSelectorSingle';
import { ChipSelectorMultiple } from '../components/ChipSelectorMultiple';

export default function SignupInformation(props) {
    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState(0);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [genderIdentity, setGenderIdentity] = React.useState([]);
    const [genderPreferences, setGenderPreferences] = React.useState([]);
    const [pageNum, setPageNum] = React.useState(0);

    const { styles } = useStyle("textBox", "questionText", "button", "buttonText");

    const setLoggedIn = props.route.params.func;
    const options = ['Male', 'Female'];

    async function processMetadataSignup() {
        const profileObj = {
            name: name,
            age: age,
            phoneNumber: phoneNumber,
            genderIdentity: genderIdentity,
            genderPreferences: genderPreferences,
        }
        let result = await save_profile_information(profileObj);
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
            {pageNum === 0 && 
                <View>
                    <Text style={styles.questionText}>Tell us your first name.</Text>
                    <TextInput
                        placeholder="First name"
                        value={name}
                        onChangeText={setName}
                        style={styles.textBox}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setPageNum(pageNum + 1)}
                    >
                    <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            }
            {pageNum === 1 &&
                <View>
                    <Text style={styles.questionText}>How old are you? (Be honest now!)</Text>
                    <TextInput
                        placeholder="Age"
                        value={age}
                        onChangeText={setAge}
                        style={styles.textBox}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setPageNum(pageNum + 1)}
                    >
                    <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            }
            {pageNum === 2 &&
                <View>
                    <Text style={styles.questionText}>Give us your digits.</Text>
                    <TextInput
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        style={styles.textBox}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setPageNum(pageNum + 1)}
                    >
                    <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            }
            {pageNum === 3 &&
                <View>
                    <Text style={styles.questionText}>Select your gender identity.</Text>
                    <ChipSelectorSingle
                        options={options}
                        setterFunction={setGenderIdentity}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setPageNum(pageNum + 1)}
                    >
                    <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            }
            {pageNum === 4 &&
                <View>
                    <Text style={styles.questionText}>Select the gender identities you would like to date.</Text>
                    <ChipSelectorMultiple
                        options={options}
                        setterFunction={setGenderPreferences}
                    />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        processMetadataSignup();
                    }}
                    >
                    <Text style={styles.buttonText}>Finish Sign Up</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
}