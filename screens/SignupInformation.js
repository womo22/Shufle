import * as React from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { save_profile_information, getQuestions, uploadCard } from './../assets/utils/APIService';
import { useStyle } from '../assets/styles/styles';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ChipSelectorSingle } from '../components/ChipSelectorSingle';
import { ChipSelectorMultiple } from '../components/ChipSelectorMultiple';
import RNPickerSelect from 'react-native-picker-select';
import DropDownPicker from 'react-native-dropdown-picker';

export default function SignupInformation(props) {
    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState(0);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [genderIdentity, setGenderIdentity] = React.useState([]);
    const [genderPreferences, setGenderPreferences] = React.useState([]);
    const [pageNum, setPageNum] = React.useState(0);
    const [questionList, setQuestionList] = React.useState([]);
    const [selectedQuestion, setSelectedQuestion] = React.useState('');
    const [questionAnswer, setQuestionAnswer] = React.useState('');
    const [items, setItems] = React.useState([]);
    const [origList, setOrigList] = React.useState([]);

    const { styles } = useStyle("textBox", "questionText", "button", "buttonText");

    const setLoggedIn = props.route.params.func;
    const options = ['Male', 'Female'];

    React.useEffect(() => {
        getQuestions().then(qs => {
            setQuestionList(qs);
            mapFirst(qs);
            setSelectedQuestion(items[0]);
        });
    }, []);

    function mapFirst(qs) {
        const ret = [];
        for (const questionObj of qs) {
            let obj = {
                label: '',
                value: '',
            };
            obj.label = questionObj.question;
            obj.value = questionObj.question;
            ret.push(obj);
        }
        setItems(ret);
        setOrigList(ret);
    }

    function mapQuestionsList(qs) {
        const ret = [];
        for (const questionObj of qs) {
            let obj = {
                label: '',
                value: '',
            };
            obj.label = questionObj.question;
            obj.value = questionObj.question;
            ret.push(obj);
        }
        setItems(ret);
    }

    async function sendAnswer() {
        let copy = [...questionList];
        const indArr = items.indexOf(selectedQuestion);
        if (indArr > -1) {
            copy.splice(indArr, 1);
        }
        setQuestionList(copy);
        mapQuestionsList(copy);
        console.log(origList);
        console.log('selected', selectedQuestion);
        let ind = 0;
        for (let i = 0; i < origList.length; i++) {
            if (origList[i].label === selectedQuestion.label) {
                ind = i;
                break;
            }
        }
        const retObj = {
            question: ind,
            answer: questionAnswer,
        }
        console.log(retObj);
        setQuestionAnswer('');
        setSelectedQuestion(items[0]);
        let result = await uploadCard(retObj);
    }

    async function processMetadataSignup() {
        const profileObj = {
            name: name,
            age: age,
            phoneNumber: phoneNumber,
            genderIdentity: genderIdentity,
            genderPreferences: genderPreferences,
        }
        let result = await save_profile_information(profileObj);
        // if (result) {
        //     setLoggedIn(true);
        // }
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
                <Button title="Next"
                    onPress={() => {
                        setPageNum(pageNum + 1)
                    }}
                />
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
                <Button title="Next"
                    onPress={() => {
                        setPageNum(pageNum + 1)
                    }}
                />
                <Button title="Back"
                    onPress={() => {
                        setPageNum(pageNum - 1)
                    }}
                />
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
                <Button title="Next"
                    onPress={() => {
                        setPageNum(pageNum + 1)
                    }}
                />
                <Button title="Back"
                    onPress={() => {
                        setPageNum(pageNum - 1)
                    }}
                />
                </View>
            }
            {pageNum === 3 &&
                <View>
                    <Text style={styles.questionText}>Select your gender identity.</Text>
                    <ChipSelectorSingle
                        options={options}
                        setterFunction={setGenderIdentity}
                    />
                <Button title="Next"
                    onPress={() => {
                        setPageNum(pageNum + 1)
                    }}
                />
                <Button title="Back"
                    onPress={() => {
                        setPageNum(pageNum - 1)
                    }}
                />
                </View>
            }
            {pageNum === 4 &&
                <View>
                    <Text style={styles.questionText}>Select the gender identities you would like to date.</Text>
                    <ChipSelectorMultiple
                        options={options}
                        setterFunction={setGenderPreferences}
                    />
                <Button title="Next"
                    onPress={() => {
                        setPageNum(pageNum + 1);
                        processMetadataSignup();
                    }}
                />
                <Button title="Back"
                    onPress={() => {
                        setPageNum(pageNum - 1)
                    }}
                />
                </View>
            }
            {pageNum === 5 && 
                <View>
                <Text style={styles.questionText}>Now it's time to get to know you! Select a question to begin.</Text>
                <DropDownPicker
                    items={items}
                    defaultValue={items[0].value}
                    containerStyle={{ height: 40, marginLeft: 10, marginRight: 10, marginTop: 10 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => setSelectedQuestion(item)}
                    max={20}
                />
                    <TextInput
                        placeholder="Your answer"
                        value={questionAnswer}
                        onChangeText={setQuestionAnswer}
                        style={styles.textBox}
                />
                <Button title="Next"
                    onPress={() => {
                        sendAnswer().then(() => {
                            setPageNum(pageNum + 1);
                        });
                    }}
                />
                </View>
            }
            {pageNum === 6 &&
                <View>
                    <Text style={styles.questionText}>One down, four to go!</Text>
                    <DropDownPicker
                        items={items}
                        defaultValue={items[0].value}
                        containerStyle={{ height: 40, marginLeft: 10, marginRight: 10, marginTop: 10 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => {
                            setSelectedQuestion(item);
                        }}
                    />
                    <TextInput
                        placeholder="Your answer"
                        value={questionAnswer}
                        onChangeText={setQuestionAnswer}
                        style={styles.textBox}
                />
                
                <Button title="Next"
                    onPress={() => {
                        sendAnswer().then(() => {
                            setPageNum(pageNum + 1);
                        });
                    }}
                />
                </View>
            }
            {pageNum === 7 &&
                <View>
                    <Text style={styles.questionText}>Select your third prompt.</Text>
                    <DropDownPicker
                        items={items}
                        defaultValue={items[0].value}
                        containerStyle={{ height: 40, marginLeft: 10, marginRight: 10, marginTop: 10 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => {
                            setSelectedQuestion(item);
                        }}
                    />
                    <TextInput
                        placeholder="Your answer"
                        value={questionAnswer}
                        onChangeText={setQuestionAnswer}
                        style={styles.textBox}
                    />
                <Button title="Next"
                    onPress={() => {
                        sendAnswer().then(() => {
                            setPageNum(pageNum + 1);
                        });
                    }}
                />
                </View>
            }
            {pageNum === 8 &&
                <View>
                    <Text style={styles.questionText}>Almost there!</Text>
                    <DropDownPicker
                        items={items}
                        defaultValue={items[0].value}
                        containerStyle={{ height: 40, marginLeft: 10, marginRight: 10, marginTop: 10 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => {
                            setSelectedQuestion(item);
                        }}
                    />
                    <TextInput
                        placeholder="Your answer"
                        value={questionAnswer}
                        onChangeText={setQuestionAnswer}
                        style={styles.textBox}
                    />
                <Button title="Next"
                    onPress={() => {
                        sendAnswer().then(() => {
                            setPageNum(pageNum + 1);
                        });
                    }}
                />
                </View>
            }
            {pageNum === 9 &&
                <View>
                    <Text style={styles.questionText}>Build your last card.</Text>
                    <DropDownPicker
                        items={items}
                        defaultValue={items[0].value}
                        containerStyle={{ height: 40, marginLeft: 10, marginRight: 10, marginTop: 10 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => {
                            setSelectedQuestion(item);
                        }}
                    />
                    <TextInput
                        placeholder="Your answer"
                        value={questionAnswer}
                        onChangeText={setQuestionAnswer}
                        style={styles.textBox}
                    />
                <Button title="Next"
                    onPress={() => {
                        sendAnswer().then(() => {
                            setPageNum(pageNum + 1);
                            setLoggedIn(true);
                        });
                    }}
                />
                </View>
            }
        </View>
    );
}